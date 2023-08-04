import { Tags } from 'aws-cdk-lib';
import {
  AttributeType,
  BillingMode,
  CfnTable,
  Table,
  TableProps,
} from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { DefaultBackupPlan } from './defaultBackupPlan';
import { RULE_TAG_KEY, Tagger } from './tags';
import { Rule } from '../../src/types';

export class DefaultDynamoDBTable extends Table implements Tagger {
  constructor(
    scope: Construct,
    id: string,
    props: Partial<TableProps> | undefined = {},
    backup?: boolean,
  ) {
    super(
      scope,
      id,
      Object.assign<TableProps, Partial<TableProps>>(
        {
          partitionKey: { name: 'id', type: AttributeType.STRING },
          billingMode: BillingMode.PAY_PER_REQUEST,
          deletionProtection: true,
        },
        props,
      ),
    );
    if (backup === false) return;
    //do not put anything in the db otherwise backup costs may be incurred
    new DefaultBackupPlan(this, 'BackupPlan', {
      backedupResourceArn: this.tableArn,
    });
  }

  tagRule(rule: Rule): void {
    Tags.of(this.node.defaultChild as CfnTable).add(
      RULE_TAG_KEY,
      rule.ruleName,
    );
  }
}
