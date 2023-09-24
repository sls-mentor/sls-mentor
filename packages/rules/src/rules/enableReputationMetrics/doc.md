# Configuration sets should have reputation metrics enabled

## Why ?

Reputation metrics allow to monitor the reputation of a configuration set, and to detect when reputation is going down, in order to fix it before being prevented form sending emails by AWS.

## How to fix ?

Go to your Configuration Sets settings, select the concerned configuration set.
On the "Overview" tab choose to edit the "Reputation options". Then click on the checkbox to enable reputation metrics.

## Useful links

- https://dev.to/kumo/from-zero-to-hero-send-aws-ses-emails-like-a-pro-4nei (part 1)
- [AWS Documentation](https://docs.aws.amazon.com/ses/latest/dg/configuration-sets-export-metrics.html)
