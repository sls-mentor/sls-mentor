# Cognito: use case insensitivity on the username

If you create resources with the AWS Command Line Interface (AWS CLI) and API operations such as CreateUserPool, you must set the Boolean CaseSensitive parameter to false. This setting creates a case-insensitive user pool. If you do not specify a value, CaseSensitive defaults to true. This default is the opposite of the default behavior for user pools that you create in the AWS Management Console. Before February 12, 2020, user pools defaulted to case sensitive regardless of platform.

_Source: [AWS Documentation](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-case-sensitivity.html)_

## How to fix the issue

Because of potential conflicts between user profiles, you can't change an Amazon Cognito user pool from case-sensitive to case-insensitive. Instead, migrate your users to a new user pool.
