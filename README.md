# GitHub Actions for Check Run Reporter _(check-run-reporter/action)_

> A GitHub action for uploading structured test reports to
> [check-run-reporter.com](https://www.check-run-reporter.com).

## V2

The first version of `check-run-reporter/action` was thrown together pretty
early on as far as GitHub Action are concerned. All actions had to be written as
Docker images. Windows support was difficult, if not impossible. Configuration
was driven by environment variables. Workflows were configured with HCL instead
of Yaml.

Times have changed. V2 is completely rewritten in TypeScript. Rather than doing
everyting with bash and curl, we now get the control flow of a modern language
and we can rely on actions.yml to typecheck our configuration instead of just
hoping environment variables have been set.

### Breaking Change

Since we're using inputs instead of environment variables, you'll need to

1. Use `with` instead of `env` to configure this action.
2. Remove the `CHECK_RUN_REPORTER_` prefix.
3. Make the variables lowerase.

## Usage

First, get your Check Run Reporter repo token from
[check-run-reporter.com](https://check-run-reporter.com/repos) and set it as a
[secret in your GitHub repo](https://developer.github.com/actions/managing-workflows/storing-secrets/).

At a minimum, you must specify the `report` and `token` inputs in your workflow.

The example below shows how you might configure a JavaScript project to upload
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
            - run: npm ci
            - run: npm test
              # Please replace "master" with the latest git tag
            - uses: check-run-reporter/action@v2.0.0-rc4
              # always run, otherwise you'll only see results for passing builds
              if: ${{ always() }}
              with:
                token: ${{ secrets.CHECK_RUN_REPORTER_TOKEN }}
                report: 'reports/junit/**/*.xml'
```

You can declare the action multiple times if you'd like to do separate
submissions with different labels (for example, you want separate style report
and test report submissions).

Note the `if: ${{ always() }}`. By default, GitHub actions exit as soon as step
fails. You'll need to tell GitHub to run even in event of failure to ensure your
reports are submitted.

> See [action.yml](action.yml) for full configuration options.

## Maintainers

[Ian Remmel](https://github.com/ianwremmel)

## Contributing

We welcome pull requests, but for anything more than a minor tweak, please
create an issue for so we can discuss whether the change is the right direction
for the project.

## License

[MIT](LICENSE) &copy; Ian Remmel, LLC 2019-202
