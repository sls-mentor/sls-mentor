# SES : Configuration set -> enable suppression list

## Why ?

Amazon Simple Email Service (SES) is a cloud-based email service that enables businesses and developers to send and receive email. One of the features that SES provides is the ability to set up a configuration set, which is a group of rules that can be applied to all the emails sent through SES. One important rule that should be enabled in the configuration set is the suppression list.

The suppression list is a list of email addresses or domains that have been identified as invalid or problematic, such as emails that have bounced back or recipients who have marked emails as spam. By enabling the suppression list rule, SES will automatically exclude these email addresses from any future email campaigns, which helps improve the deliverability of emails and reduces the risk of being marked as spam.

## How to fix ?

In your AWS console go to SES service, then to Configuration Sets tab and select the concerned configuration set. On the "Overview" tab choose to edit the "Suppression list" options. Then click on the checkbox to overide account level settings and enable the suppression list. Finally specify the supression reasons that you want to use.

## Useful links

- [AWS Documentation](https://docs.aws.amazon.com/ses/latest/dg/sending-email-suppression-list-config-level.html)
- https://dev.to/slsbytheodo/from-zero-to-hero-send-aws-ses-emails-like-a-pro-4nei (part 1)
