# CloudFront: use SecurityHeadersPolicy on the default cache behavior of your distributions

A **cache behavior** lets you configure how your users will access your files (more on
[CloudFront cache behaviors][cloudfront-cache-behaviors]).

You should configure **security headers** because they prevent common attacks. You can find more details about these [on the Mozilla Developer Network website][security-headers].

## Suggested Action

### If no response headers policy is applied to your default behavior yet

AWS provides a **managed response headers policy**: _SecurityHeadersPolicy_, that is ready to use.

Head over to your console, `CloudFront > Distributions > Behaviors`. Then edit the behaviors: select `SecurityHeadersPolicy` in the _Response headers policy - optional_ section.

### If you already have a response headers policy applied to your default behavior

Head over to your console, `CloudFront > Policies > Response headers`. Then select your custom policy
and add security headers to it.

## FAQ

### I have set up security headers with a Lambda function or Lambda@Edge, but sls-mentor still raises an issue, what should I do?

Unfortunately, sls-mentor cannot handle all situations. Our recommendation is to use managed policies on CloudFront, because this is simpler to manage.

Response headers are a relatively new feature. Note that you can add response headers policies without
immediately updating your current setup.

[cloudfront-cache-behaviors]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesCacheBehavior
[security-headers]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#security
