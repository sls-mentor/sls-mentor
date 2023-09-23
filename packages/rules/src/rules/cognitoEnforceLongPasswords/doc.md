# User Pools should enforce passwords of at least 10 characters

## Why is this important?

By default, Cognito User Pools enforce passwords of at least 8 characters. This is a weak password policy and should be changed to at least 10 characters. Passwords of 8 characters are quite easy to guess and brute force.

## How to fix

To comply, set the `MinimumPasswordLength` property of your userPools to `10` or higher. For example, in the console, you can change this in the sign-up experience section of the user pool.

### AWS CDK example

```typescript
new UserPool(this, 'myuserpool', {
  // ...
  passwordPolicy: {
    minLength: 10,
  },
});
```

### AWS CloudFormation example

```yaml
Resources:
  MyUserPool:
    Type: AWS::Cognito::UserPool
    Properties:
      # ...
      Policies:
        PasswordPolicy:
          MinimumLength: 10
```

### Terraform example

```hcl
resource "aws_cognito_user_pool" "myuserpool" {
  # ...
  password_policy {
    minimum_length = 10
  }
}
```
