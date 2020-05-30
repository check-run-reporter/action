# GitHub Actions for Check Run Reporter _(check-run-reporter/action)_

> A GitHub action for uploading structured test reports to
> [check-run-reporter.com](https://www.check-run-reporter.com).

## Usage

First, get your `CHECK_RUN_REPORTER_TOKEN` from
[check-run-reporter.com](https://check-run-reporter.com/repos) and set it as a
[secret in your GitHub repo](https://developer.github.com/actions/managing-workflows/storing-secrets/).

Use `CHECK_RUN_REPORTER_LABEL` and `CHECK_RUN_REPORTER_REPORT` to tell the
action where your report(s) are and how to label them when they're uploaded. The
example below shows how you might configure a JavaScript project to upload
multiple JUnit reports.

```yml
on: push
name: Test
jobs:
    test:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@master
            - uses: actions/setup-node@v1
            with:
                node-version: '12.x'
            - run: npm install
            - run: npm test
              # Please replace "master" with the latest git tag
            - uses: check-run-reporter/action@master
              if: ${{ always() }}
              env:
                  CHECK_RUN_REPORTER_LABEL: 'Unit Tests'
                  CHECK_RUN_REPORTER_REPORT: 'reports/junit/**/*.xml'
                  CHECK_RUN_REPORTER_TOKEN: ${{ secrets.CHECK_RUN_REPORTER_TOKEN }}
```

> You can declare the action multiple times if you'd like to do separate
> submissions with different labels (for example, you want separate style report
> and test report submissions).

> Note the `if: ${{ always() }}`. By default, GitHub actions exit as soon as
> step fails. You'll need to tell GitHub to run even in event of failure to
> ensure your reports are submitted.

## API

### `CHECK_RUN_REPORTER_REPORT` (Required, string)

Path or bash-compatible glob to the job's report files.

### `CHECK_RUN_REPORTER_LABEL` (Optional, string)

Label that should appear in the GitHub check. Defaults to the step's name.

### `CHECK_RUN_REPORTER_ROOT` (Optional, string)

Defaults to `$(pwd)`. If you run your tests via a `uses` step, the default
should be fine, but if you run your tests via a `run` step, you may need to
speriment a bit to determine what working directory was set during your tests.

### `CHECK_RUN_REPORTER_TOKEN` (Required, string)

Repo token to authenticate the upload. You can get your tokens from
[https://www.check-run-reporter.com/repos](https://www.check-run-reporter.com/repos).

## Maintainers

[Ian Remmel](https://github.com/ianwremmel)

## Contributing

We welcome pull requests, but for anything more than a minor tweak, please
create an issue for so we can discuss whether the change is the right direction
for the project.

## License

[MIT](LICENSE) &copy; Ian Remmel, LLC 2019
