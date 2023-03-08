import * as core from '@actions/core';
import * as github from '@actions/github';
import * as glob from '@actions/glob';
// webhooks-types doesn't have a valid `main` property, so eslint can't tell
// it's type-only
// eslint-disable-next-line import/no-unresolved
import type {PullRequestEvent} from '@octokit/webhooks-types';
import {isAxiosError} from 'axios';

// this is a little weird: we're loading by path instead of by package because
// we need main to point at src during dev but dist during release.

import {submit} from '../../../src';
import {split} from '../../../src/commands/split';
import {makeClient} from '../../../src/lib/axios';
import {Context} from '../../../src/lib/types';

const logger = {
  debug: core.debug.bind(core),
  error: core.error.bind(core),
  group: core.startGroup.bind(core),
  groupEnd: core.endGroup.bind(core),
  info: core.info.bind(core),
  warn: core.warning.bind(core),
};

/**
 * Detmerins the value to send as "root".
 */
export function determineRoot(): string {
  core.startGroup('Determining "root" path');
  let root = core.getInput('root');
  if (!root) {
    core.info('"root" not set, trying environment variable');
    const gw = process.env.GITHUB_WORKSPACE;
    if (gw) {
      root = gw;
    }
  }
  if (!root) {
    core.info('"root" not set, trying pwd');
    root = process.cwd();
  }
  core.endGroup();
  return root;
}

/**
 * Determines the SHA according the the action that triggered this workflow
 */
export function determineSha(): string {
  core.startGroup('Determing SHA');
  if (github.context.eventName === 'pull_request') {
    core.info(
      `Workflow triggered by "pull_request" event, reading SHA from webhook payload`
    );
    const pullRequestPayload = github.context.payload as PullRequestEvent;
    const {sha} = pullRequestPayload.pull_request.head;
    core.endGroup();
    return sha;
  }
  core.info(
    `Workflow triggered by "${github.context.eventName}" event, assuming default SHA is valid`
  );
  const {sha} = github.context;
  core.endGroup();
  return sha;
}

/**
 * Finds all reports according to the workflow-specified glob.
 */
export async function findReports(): Promise<string[]> {
  core.startGroup('Locating files');

  const report = core.getInput('report');

  const globber = await glob.create(report);
  const files = await globber.glob();

  core.info(`found ${files.length} reports`);

  if (files.length === 0) {
    throw new Error(`Could not find any report files matching glob ${report}`);
  }

  core.endGroup();

  return files;
}

interface DoSplitInput {
  readonly label: string;
  readonly tests: string;
  readonly token: string;
}

/**
 * Wrapper around split to adapt it for github actions
 */
async function doSplit({label, tests, token}: DoSplitInput, {client}: Context) {
  const nodeCount = core.getInput('nodeCount');
  const nodeIndex = core.getInput('nodeIndex');

  if (!nodeCount) {
    core.setFailed('Cannot split tests without specifying the nodeCount input');
  }

  if (!nodeIndex) {
    core.setFailed('Cannot split tests without specifying the nodeIndex input');
  }

  try {
    const {filenames} = await split(
      {
        label,
        nodeCount: Number(nodeCount),
        nodeIndex: Number(nodeIndex),
        tests: [tests],
        token,
      },
      {client, logger}
    );

    core.info(
      `This host should run the following ${
        filenames.length
      } test files:\n${filenames.join('\n')}`
    );

    core.setOutput('tests', filenames.join(' '));
  } catch (err) {
    if (isAxiosError(err)) {
      console.error(`Check Run Reporter return a ${err.response?.status}`);
      if (err.response?.data?.message?.details?.[0]?.message) {
        console.error(err.response.data.message.details[0].message);
      }
    } else {
      console.error(err);
    }
  }
}

/**
 * Main entrypoint
 */
async function main() {
  // For lack of a better pattern, we'll default to the same pattern that GitHub
  // uses for checks at the bottom of the PR.
  const label =
    core.getInput('label') ||
    `${github.context.workflow} / ${github.context.job}`;

  const hostname = core.getInput('hostname');
  const token = core.getInput('token');

  const client = makeClient({hostname});

  const tests = core.getInput('tests');
  if (tests) {
    return await doSplit(
      {
        label,
        tests,
        token,
      },
      {
        client,
        logger,
      }
    );
  }

  const root = determineRoot();
  const files = await findReports();

  const sha = determineSha();

  await submit(
    {
      label,
      report: files,
      root,
      sha,
      token,
    },
    {
      client,
      logger,
    }
  );
}

if (require.main === module) {
  main().catch((err) => {
    if (isAxiosError(err)) {
      core.setFailed(err);

      core.error(`Check Run Reporter returned a ${err.response?.status}`);
      if (err.response?.data?.message?.details?.[0]?.message) {
        core.error(err.response.data.message.details[0].message);
      }
    }

    core.error(err.stack);
  });
}
