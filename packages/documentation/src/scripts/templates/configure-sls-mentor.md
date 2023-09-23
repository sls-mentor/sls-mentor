# Configure sls-mentor

sls-mentor runs out of the box with no necessary configuration.
However you might want to add configuration for it to fit your needs the best.

First you need to create a configuration file.
At the root of the project, create a `sls-mentor.json` file. sls-mentor will look for this file in the directory it's launched.

## Ignore resources

You can ask sls-mentor to ignore some resources when running a rule. To do so add the following in `sls-mentor.json`

```[json]
{
    rules: {
        RULE_NAME: {
            ignoredResources: [reqex patterns to ignore...]
        }
    }
}
```

ignoredResources accepts an array of regex that you wish to ignore. You can either add your resource full ARN or pattern matching the resources you wish to ignore.

The rule name should be one of the following list:

<!-- Rule table will appear here -->

For example you can add the following:

```[json]
{
    rules: {
        noSharedIamRoles: {
            ignoredResources: [
                'arn:aws:lambda:us-west-2:123456789012:function:my-function',
                'arn:aws:lambda:us-west-1:.*'
             ]
        }
    }
}
```
