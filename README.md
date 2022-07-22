<div align="center">
  <h1>
    <br/>
    <br/>
    🛡
    <br />
    Guardian
    <br />
    <br />
  </h1>
  <sup>
    <br />
    <a href="https://www.npmjs.com/package/@kumo-by-theodo/guardian">
       <img src="https://img.shields.io/npm/v/@kumo-by-theodo/guardian.svg" alt="npm package" />
    </a>
    <a href="https://www.npmjs.com/package/@kumo-by-theodo/guardian">
      <img src="https://img.shields.io/npm/dm/@kumo-by-theodo/guardian.svg" alt="npm downloads" />
    </a>
  </sup>
  <br />
  <br />
  <pre>npm i <a href="https://www.npmjs.com/package/@kumo-by-theodo/guardian">@kumo-by-theodo/guardian</a></pre>
  <br />
  <br />
</div>

<p align="center">
  <a href="./docs/running-locally.md"><strong>Local Development</strong></a> &mdash; How to run Guardian on your local machine.
  <br />
  <a href="./docs/running-in-ci.md"><strong>CI/CD</strong></a> &mdash; How to integrate Guardian to your CI/CD pipeline.
  <br />
</p>
<br />
<br />

- **Rules**
  - AWS Lambda:
    - [`Lambda: Use ARM64 architecture`](./docs/rules/use-arm.md): checks that you're using ARM64 architectures for your Lambda functions.
    - [`Lambda: No shared IAM roles`](./docs/rules/no-shared-iam-roles.md): checks that each one of your Lambda functions has its own IAM role.
    - [`Lambda: Limited amount of versions`](./docs/rules/limited-amount-of-versions.md): checks that you do not store all previous deployment versions for your Lambda functions.
    - [`Lambda: Specify failure destination to async functions`](./docs/rules/async-specify-failure-destination.md): checks that each one of your async Lambda functions has a failure destination.
    - [`Lambda: No identical code`](./docs/rules/no-identical-code.md): checks that each one of your Lambda functions has different code.
    - [`Lambda: Light bundle`](./docs/rules/light-bundle.md): checks that each one of your Lambda functions' bundles is reasonably small.
    - [`Lambda: No default memory`](./docs/rules/no-default-memory.md): checks that you have consciously configured your Lambda functions' memory size.
    - [`Lambda: Under maximum memory`](./docs/rules/under-max-memory.md): checks that each one of your Lambda functions' memory size is reasonably small.
    - [`Lambda: No maximum timeout`](./docs/rules/no-max-timeout.md): checks that your Lambda functions' timeout is not set at the maximum available.
  - AWS S3:
    - [`S3: Use intelligent tiering`](./docs/rules/use-intelligent-tiering.md): checks that each one of S3 buckets has intelligent tiering enabled.

<div align="center">
  <br />
  <br />
  <br />
  <h2>Contributors</h2>
  <br />
  <br />
  <a href="https://github.com/kumo-by-theodo/guardian/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=kumo-by-theodo/guardian" />
  </a>
  <br />
  <br />
</div>
