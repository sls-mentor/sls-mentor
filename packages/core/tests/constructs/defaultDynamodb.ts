import { Tags } from 'aws-cdk-lib';
import {
  AttributeType,
  BillingMode,
  CfnTable,
  Table,
} from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { Rule } from '../../src/types/Rule';
import { DefaultBackupPlan } from './defaultBackupPlan';
import { RULE_TAG_KEY, Tagger } from './tags';

export class DefaultDynamodb extends Table implements Tagger {
  constructor(
    scope: Construct,
    id: string,
    tableName?: string,
    backup?: boolean,
  ) {
    super(scope, id, {
      partitionKey: { name: 'id', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      tableName: tableName ?? id,
    });
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