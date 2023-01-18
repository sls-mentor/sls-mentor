# Lambda: All Functions have a Light Bundle

Lambda functions are deployed to AWS with their dependencies in a bundle. The size of this bundle impacts
the cold start of your function. **The lighter the bundle, the faster the cold start**.

Needless to say, smaller bundles will help you respect [AWS Quotas](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html).

## Suggestion Actions

### 1. Refactor your code to depend on fewer or lighter dependencies

If you use the Serverless Framework, the [Serverless Analyze Bundle Plugin](https://github.com/adriencaccia/serverless-analyze-bundle-plugin) will help you find heavy dependencies.

### 2. Configure your bundler

If you use the Serverless Framework and the plugin `serverless-esbuild`, this is the configuration that we recommend:

```typescript
// serverless.ts
const serverlessConfiguration: AWS = {
  ...
  custom: {
    ...
    esbuild: {
      ...
      /**
       * Reduce the size of the bundle.
       */
      minify: true,
      /**
       * Keep the names of functions and classes (useful for libraries like `typeorm`).
       */
      keepNames: true,
      /**
       * If you don't care about immutable infrastructure, do not include the AWS SDK in your bundle.
       * The execution environment of your Lambda function has a built-in AWS SDK that you can require at runtime.
       */
      exclude: ['aws-sdk'],
      /**
       * Helps choosing tree-shakable code.
       */
      mainFields: ['module', 'main'],
    },
  },
};
```

# Useful links

- In-depth study: [Lumigo's study on 'Performance Impact of Deployment Artifact Size'](https://lumigo.io/blog/this-is-all-you-need-to-know-about-lambda-cold-starts)
- To better understand the cold start: [AWS Compute Blog: Operating Lambda: Performance optimization](https://aws.amazon.com/blogs/compute/operating-lambda-performance-optimization-part-1/)
- [Should you include the AWS SDK in your bundle?](https://theburningmonk.com/2019/09/should-you-pack-the-aws-sdk-in-your-deployment-artefact/)
