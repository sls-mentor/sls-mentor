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
    - [`ARM64 architecture`](./docs/rules/use-arm.md): checks that you're using ARM64 architectures for your lambda functions.
    - [`No default memory`](./docs/rules/no-default-memory.md): checks that you have consciously configured your lambda functions' memory size.
    - [`No maximum timeout`](./docs/rules/no-max-timeout.md): checks that your lambda functions' timeout is not set at the maximum available.
    - [`No default timeout`](./docs/rules/no-default-timeout.md): checks that you have consciously configured your lambda functions' timeout.
    - [`No shared IAM roles`](./docs/rules/no-shared-roles.md): checks that each one of your lambdas has it own IAM role.
    - Limited number of lambda versions: checks that you do not store all previous deployment versions for your lambda functions.
    - Light bundles: checks that each one of your lambda bundles is reasonably small.

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
