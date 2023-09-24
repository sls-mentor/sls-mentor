# SES Identities should have a default configuration set

## Why ?

You should assign a default configuration set to your AWS SES identity if you want to:

Ensure consistency: A default configuration set ensures that all emails sent from your AWS SES identity use the same set of email sending rules and metrics tracking. This helps to maintain a consistent email sending experience for your recipients.

Track important metrics: A default configuration set allows you to track important email metrics, such as email opens, clicks, bounces, and complaints. This can provide valuable insights into the performance of your email campaigns and help you make data-driven decisions to improve your email marketing strategy.

Maintain compliance: Some email regulations, such as GDPR and CAN-SPAM, require you to include certain information in your emails, such as an unsubscribe link or your physical mailing address. A default configuration set can ensure that these requirements are met for all emails sent from your AWS SES identity, helping you to stay compliant with email regulations.

Simplify the email sending process: By assigning a default configuration set to your AWS SES identity, you can simplify the process of sending emails by avoiding the need to manually configure each email with the same settings. This can save time and reduce the risk of errors.

## How to fix ?

Go to your SES identity and select the "Configuration Sets" tab. Then, if you already have a configuration set click on edit and assign it. Otherwise click on the "Manage configuration set" button and create a new one then assign it.

## Useful links

- https://dev.to/kumo/from-zero-to-hero-send-aws-ses-emails-like-a-pro-4nei (part 2)

- [Amazon Documentation](https://docs.aws.amazon.com/ses/latest/dg/using-configuration-sets.html)
