# Api Gateway V2: Use Authorized Routes

Amazon API Gateway V2 is an AWS service for creating, publishing, maintaining, monitoring, and securing HTTP and WebSocket APIs at any scale.

# Suggested Actions

Secure your API Routes that should not be publicly accessible by adding an authorizer to them. [The AWS Documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-access-control.html) shows how set up the different types of authorizers.

You can disable this rule for an API Gateway with public routes in the `sls-mentor.json` configuration file:

```
{
  "rules": {
    "useAuthorizedRoutes": {
      "ignoredResources": ["<API_GATEWAY_ID>"]
    }
  }
}
```
