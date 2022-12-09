# Running guardian in Your CI

## Installation

First, read the installation instruction [here](./running-locally.md).

## Usage in a CI/CD pipeline

The command you want to run in your pipeline is:

```sh
 yarn guardian -p {YOUR_AWS_PROFILE} -c {OPTIONAL_CLOUDFORMATION_STACKS_NAMES} -t {OPTIONAL_TAGS}
```

⚠️ To make sure it properly works when executed by a pipeline runner:

- Ensure that the CI/CD runner has an AWS profile configured, with `ReadOnlyAccess` privileges.
- If the region is not configured for that profile, make sure to specify it using the `-r <region>` flag in the command.

## CI snippets

Here you can find some CI snippets we are using daily in our projects. We will try to keep this list updated to cover more potential cases.

### Circle CI

This snippet will run Guardian at 01:00 on Sundays.

```yml
jobs:
  guardian-checks:
    docker:
      - image: cimg/node:16.17.0
    steps:
      - checkout # checkout your code
      - setup-aws-cli # setup AWS CLI (export environment variables)
      - install # install your dependencies
      - run: yarn guardian -p my-aws-profile -c my-stack-1 my-stack-2
workflows:
  weekly-guardian-checks:
    triggers:
      - schedule:
          cron: '0 1 * * 0' # run at 01:00 on Sundays
          filters:
            branches:
              only:
                - main
    jobs:
      - guardian-checks
```

### Gitlab CI

This snippet will run Guardian after merge.

```yml
guardian:
  image: node:16.17.0
  stage:
    - post-deploy-test # the stage after your deployment
  extends:
    - .setup-cli # setup AWS CLI (export environment variables)
  needs:
    - install # the job that installs your dependencies
  script:
    - yarn guardian -r eu-west-1 -c <stacks> # fill in the stacks you want to check
  allow_failure: true # allow the job to fail, when you want to run subsequent tests
```
