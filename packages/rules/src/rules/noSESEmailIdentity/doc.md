# SES: No identity is of type email in production environment

Simple Email Service (SES) is an AWS integrated service that allows to send emails at scale for transactional or marketing purposes. To prevent those emails from ending in the spam folder of your recipients' mailbox, it is important to make sure the sender is trustworthy.
Using a verified domain name is a clue that the sender is an entity that is also holding an internet domain name. It is thus a criterion of trust for the spam detection classifiers. Hence, it is important that your SES emails originate from verified domain names and not from a personal email if you want people to _actually_ receive them.
SES has two environments. The Sandbox environment is an early stage one available right away, e.g. for development purposes. If you want to use a production environment, you have to fill in a request and AWS will conduct some checks on your service to ensure the safety and reputation of the emails originating from SES with respect to spam detection algorithms. You can only use a personal email in the development stage (i.e. in the sandbox), hence the rule will automatically not apply if your account is in the sandbox, and the resource will pass the check.

## Suggested actions

- Create your own domain name if you do not already have one;
- In SES Verified Identities, create a new verified identity with that domain name.
