# All Functions Have Supported Runtime (no-deprecated-runtime)

Lambda invokes your function in an execution environment. The execution environment provides a secure and isolated runtime environment that manages the resources required to run your function. Lambda re-uses the execution environment from a previous invocation if one is available, or it can create a new execution environment. When security updates are no longer available for a component of a runtime, Lambda deprecates the runtime.[Source](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html#runtime-support-policy)

It is recommended that you avoid running Lambdas on deprecated runtimes in order to increase stability and security of your application.

---

## Suggested Actions:

- Update your function's configuration to upgrade to a supported runtime environment ([instructions here](https://docs.aws.amazon.com/lambda/latest/dg/configuration-function-zip.html#configuration-function-runtime)).
