# CloudFront: use SecurityHeadersPolicy on the cache behaviors of your distributions

A **cache behavior** lets you configure how your users will access your files (more on
[CloudFront cache behaviors][cloudfront-cache-behaviors]).

In particular, you can configure which **HTTP headers** will be used in CloudFront responses.

You should add **security headers** to your CloudFront distributions to protect your users.
Security headers either prevent basic attacks or add a layer of security-in-depth.

AWS provides a managed policy _SecurityHeadersPolicy_ that you can use easily. Head over to your console, `CloudFront > Distributions > Behaviors`. Then edit the behaviors: select `SecurityHeadersPolicy` in the _Response headers policy - optional_ section.

[cloudfront-cache-behaviors]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesCacheBehavior
