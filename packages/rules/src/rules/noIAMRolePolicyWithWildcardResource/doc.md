# IAM: no IAM Role Policy with wildcard Resource

## Why ?

This rule checks that none of your IAM roles contains inline policies authorising (`ALLOW` Statement) actions on all the resources in your account (`*`).
Indeed, to respect the principle of least privilege, it is recommended to create roles with policies that specify authorised actions on **identified resources**.

## How to fix ?

Ask yourself the following questions:

- Who (/what resources) use this IAM role ?
- On which resources will the action be perform ?
  Update the list of resources accordingly.
