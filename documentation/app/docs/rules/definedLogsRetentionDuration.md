# CloudWatch Log Groups: Defined Logs Retention Duration

By default, log retention is infinite on Cloudwatch. You certainly don't need to keep logs for an indefinite period, especially on your dev and staging environments. 😉  
Avoid unnecessary data storage by setting a log retention duration! ⏰

---

## Suggested Actions:

- Look into your function in your Cloudwatch service, open a Log Group, click the Actions button and `Edit retention setting`

- If you use the serverless framework:

  The serverless plugin [serverless-plugin-log-retention](https://www.serverless.com/plugins/serverless-plugin-log-retention) allows you to configure logs retention of your lambdas.

  This retention period of the Cloudwatch logs can be defined globally, by adding the parameter `logRetentionInDays` to the provider of the serverless.ts, or lambda by lambda.

  The value of `logRetentionInDays` must be an element of the following list:

  ```
  [1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, 2192, 2557, 2922, 3288, 3653]
  ```
