## Installation

First, read the installation instruction [here](./running-locally.md).

## Usage in a CI/CD pipeline

The command you want to run in your pipeline is:

```
 yarn guardian -p {YOUR_AWS_PROFILE} -c {YOUR_AWS_STACK_NAME} -r {YOUR_AWS_REGION}
```

⚠️ To make sure it properly works when executed by a pipeline runner:

- Ensure that the CI/CD runner has an AWS profile configured, with AdministratorAccess privileges.
- If the region is not configured for that profile, make sure to specify it using the -r flag in the command.
