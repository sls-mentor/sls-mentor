# `RDS Instances: enable autoscaling`

With RDS Storage AutoScaling feature enabled, when Amazon RDS detects that your database is running short of disk space it automatically scales up your database instance storage. This helps ensure long-lasting set up of your relation databases.

## How to fix the issue

Go in your database instance and click "Modify". Increase the Maximum Allocated Storage to a value at least 1.26 times the current Allocated Storage.
The Max Allocated Storage options is not available for: SQLServer and Aurora database engines. SLS Mentor will not check the rule for those instances.
SLS Mentor does not check the rule for multi AZ databases.

Reference:

https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIOPS.StorageTypes.html#USER_PIOPS.Autoscaling
