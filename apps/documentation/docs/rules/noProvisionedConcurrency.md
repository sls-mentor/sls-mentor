# No Lambda function has provisioned concurrency (no-provisioned-concurrency)

Provisioned concurrency makes a lambda function run faster by removing the cold start. But it required to have an instance of the function to run all the time which is costly (12$/ per instance / per month) and not environmentally friendly. Therefore provisioned concurrency should be avoided.

## Suggested actions

If the cold start of the lambda is not a problem, simply remove the provisioned concurrency.
Otherwise reducing the size of the lambda also improves the cold start.

If the lambda function is critical and above measures are not enough. Whitelist the lambda not to check it again (Not implemented yet)
