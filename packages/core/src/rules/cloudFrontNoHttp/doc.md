# Don't allow HTTP access to CloudFront

You can configure one or more cache behaviors in your CloudFront distribution to require HTTPS for communication with CloudFront.
There are three policies for the viewer protocol : `https and https`, `redirect http to https`, and `only https`.
The first one allows HTTP, which is not recommended for security reasons. Thus you should select the second or third option to always have safe communication. Be aware that they might be additional cache behaviors other than the default one.

## Useful links

_Source: [AWS Documentation](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-viewers-to-cloudfront.html)_
