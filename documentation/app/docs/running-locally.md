## Installation

```[sh]
yarn add -D sls-mentor
```

## Usage

If you already have a default aws profile configured specifying a default region, simply look for the name of the Cloud Formation stack you wish to audit. To find stack names, log on to AWS cloudformation. It is shown in the overview section of stack info. It may not be what you expected e.g. it might have `-dev` on the end, so worth checking if the tool is not working.

## Other CLI options

Here is the full list of available options:

| Option                                            | Effect                                                          |
| ------------------------------------------------- | --------------------------------------------------------------- |
| -p, --aws-profile \<profile\>                     | Aws profile name to use                                         |
| -r, --aws-region \<region\>                       | Manually set AWS region                                         |
| -c, --cloudformation-stacks \<stack1 stack2 ...\> | Filter checked account resources by cloudformation stacks names |
| -t, --tags \<Key=...,Value=... Ke...\>            | Filter checked account resources by tags                        |
| -s, --short                                       | Short output: only display checks results overview              |
| --noFail                                          | Exit with success status, even if some checks failed            |
