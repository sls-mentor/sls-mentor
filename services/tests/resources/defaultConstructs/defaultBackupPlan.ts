import { Duration, Tags } from 'aws-cdk-lib';
import {
  BackupPlan,
  BackupPlanRule,
  BackupResource,
} from 'aws-cdk-lib/aws-backup';
import { CfnTable } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

import { Rule } from '../rule';
import { RULE_TAG_KEY, Tagger } from '../tags';

export class DefaultBackupPlan extends BackupPlan implements Tagger {
  constructor(
    scope: Construct,
    id: string,
    props: { backedupResourceArn: string },
  ) {
    super(scope, id, { backupPlanName: id });
    this.addRule(
      new BackupPlanRule({
        deleteAfter: Duration.days(1),
      }),
    );
    this.addSelection(id, {
      resources: [BackupResource.fromArn(props.backedupResourceArn)],
    });
  }

  tagRule(rule: Rule): void {
    Tags.of(this.node.defaultChild as CfnTable).add(
      RULE_TAG_KEY,
      rule.ruleName,
    );
  }
}
