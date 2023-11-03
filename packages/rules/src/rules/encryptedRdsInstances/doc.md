# Documentation of encryptedRdsInstances

## Why ?

Encryption helps prevent unauthorized access to database contents if the underlying storage were to be compromised or accessed without permission. It provides an additional safeguard for sensitive data stored in databases.

## How to fix ?

When creating a new DB instance, select the "Enable encryption" option (it is the default). You cannot encrypt an existing unencrypted DB instance, but you can encrypt a copy of it by encrypting a snapshot.

## Useful links

https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html
