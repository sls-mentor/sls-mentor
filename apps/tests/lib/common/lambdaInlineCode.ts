import { InlineCode } from 'aws-cdk-lib/aws-lambda';

export const lambdaInlineCode = InlineCode.fromInline(
  'exports.handler = async () => { return "hello world" }',
);
