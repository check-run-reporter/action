# GitHub Actions for Check Run Reporter _(check-run-reporter/action)_

> A GitHub action for uploading structured test reports to
> [check-run-reporter.com](https://www.check-run-reporter.com).

## Usage

First, get your `CHECK_RUN_REPORTER_REPO_TOKEN` from
[check-run-reporter.com](https://check-run-reporter.com/repos) and set it as a
[secret in your GitHub repo](https://developer.github.com/actions/managing-workflows/storing-secrets/).

Use `CHECK_RUN_REPORTER_LABEL` and `CHECK_RUN_REPORTER_REPORT_GLOB` to tell the
action where your report(s) are and how to label them when they're uploaded. The
example below shows how you might configure a JavaScript project to upload
multiple JUnit reports.

```hcl
workflow "Test" {
    on = "push"
    resolves = "Report"
}

action "Install" {
    uses = "actions/npm@master"

    args = "ci"
}

action "Test" {
    needs "Install"
    uses "actions/npm@master"
    args = "test"

    env = {
        REPORT_DIR = "reports/junit"
    }
}

action "Report" {
    uses = "check-run-reporter/actions"

    secrets = ["CHECK_RUN_REPORTER_REPO_TOKEN"]

    env = {
        CHECK_RUN_REPORTER_LABEL = "Unit Tests"
        CHECK_RUN_REPORTER_REPORT_GLOB = "reports/junit/**/*.xml"
    }
}
```

> You can declare the action multiple times if you'd like to do separate
> submissions with different labels (for example, you want separate style report
> and test report submissions).

## API

`CHECK_RUN_REPORTER_REPO_TOKEN`: (required, secret) The token used to
authenticate the report submission to check-run-reporter.com.
`CHECK_RUN_REPORTER_LABEL`: (optional, environment) The label used for the
submitted reports `CHECK_RUN_REPORTER_REPORT_GLOB`: (required, environment) A
bash-style (`shopt -s globstar`) shell glob for identifying all of the reports
to submit.

## Maintainers

[Ian Remmel](https://github.com/ianwremmel)

## Contributing

We welcome pull requests, but for anything more than a minor tweak, please
create an issue for so we can discuss whether the change is the right direction
for the project.

## License

[MIT](LICENSE) &copy; Ian Remmel, LLC 2019
