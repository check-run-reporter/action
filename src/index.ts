import * as core from '@actions/core';
import * as glob from '@actions/glob';
import * as github from '@actions/github';

/**
 * Detmerins the value to send as "root".
 */
export function determineRoot(): string {
  core.startGroup('Determining "root" path');
  let root = core.getInput('root');
  if (!root) {
    core.debug('"root" not set, trying environment variable');
    const gw = process.env.GITHUB_WORKSPACE;
    if (gw) {
      root = gw;
    }
  }
  if (!root) {
    core.debug('"root" not set, trying pwd');
    root = process.cwd();
  }
  core.endGroup();
  return root;
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

/**
 * Main entrypoint
 */
async function main() {
  console.log(github.context);

  // For lack of a better pattern, we'll default to the same pattern that GitHub
  // uses for checks at the bottom of the PR.
  const label =
    core.getInput('label') ||
    `${github.context.workflow} / ${github.context.job}`;

  const token = core.getInput('token');
  const url = core.getInput('url');

  const root = determineRoot();
  const files = await findReports();

  const {sha} = github.context;

  console.log({
    files,
    label,
    root,
    sha,
    token,
    url,
  });
}

if (require.main === module) {
  main().catch((err) => {
    core.error(err);
    core.setFailed(err.message);
  });
}
