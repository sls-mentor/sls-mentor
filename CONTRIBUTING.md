# Contributing

Guardian is an open-source project. Feel free to contribute by opening issues, suggesting improvements, or open pull-request.

## Installing the project

First clone the repository

```
git clone git@github.com:Kumo-by-Theodo/guardian.git
```

Install the dependencies:

```
npm install
```

You are ready to start developing on Guardian 🏃

## Testing your changes

If you have a default AWS profile defined in your configuration, you can launch:

```
npm run dev
```

This will test guardian rules against your default stack.
You can also add profile, credentials or region options to test against a different stack.

```
npm run dev -- -p my-profile
```

Check out documentation to learn about [CLI options](./README.md)

## Adding a new rule

If you wish to contribute by sharing your learnings, you can add a new rule to Guardian.

To do so:

1. Copy one of the [rules directory](./src/rules).
1. Modify the index to implement your rule logic as well as configuration
1. Export your rule in the [rules index](./src/rules/index.ts)
1. Add you rule to [Guardian engine](./src/index.ts) in the method `runGuardianChecks`
1. Rename the rule documentation
1. Document your rule for others to understand why it's important and how to fix it.
1. Test that your rule works as expected against your stack
1. Open a pull-request. The Guardian maintainer team will review it and publish it in the next version.
