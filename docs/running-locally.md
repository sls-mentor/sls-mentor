## Installation

- `yarn add -D @kumo-by-theodo/guardian`

## Usage

If you already have a default aws profile configured specifying a default region, simply look for the name of the Cloud Formation stack you wish to audit. To find stack names, log on to AWS cloudformation. It is shown in the overview section of stack info. It may not be what you expected e.g. it might have `-dev` on the end, so worth checking if the tool is not working.

Then, simply run:

- `yarn guardian -c {YOUR_AWS_STACK_NAME}`

If you want to specify your AWS profile and region manually, then run:

- `yarn guardian -p {YOUR_AWS_PROFILE} -c {YOUR_AWS_STACK_NAME} -r {YOUR_AWS_REGION}`

---

## Other CLI options

Here is the full list of available options:

```
  -c, --cloudformation <stackName>  manually set AWS stack name
  -r, --aws-region <region>         manually set AWS region
  -p, --aws-profile <profile>       aws profile name to use
  -t, --tags <key_value...>       aws tags to filter resources
  -s, --short       avoid displaying the detailed output by resource
```
