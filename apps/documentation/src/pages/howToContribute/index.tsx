import Layout from '@theme/Layout';
import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import ThemedImage from '@theme/ThemedImage';
import { UilArrowDown } from '@iconscout/react-unicons';
import { Block, CodeBlock } from '../../components';

import styles from './index.module.css';

const HowToContribute = (): JSX.Element => (
  <Layout title="How to contribute?" description="How to contribute?">
    <main>
      <h2>How to contribute ? A step by step tutorial</h2>
      <h4>Create a new rule</h4>
      <CodeBlock
        label="Clone the github repository"
        command="git clone "
        commandSecondary="git@github.com:sls-mentor/sls-mentor.git"
        tip={
          <a href="https://github.com/sls-mentor/sls-mentor">
            https://github.com/sls-mentor/sls-mentor
          </a>
        }
      />
      <CodeBlock
        label="In your CLI, go to the core folder"
        command="cd "
        commandSecondary="sls-mentor/packages/core"
      />
      <CodeBlock
        label="Use the following command to create the files needed for a new rule"
        command="pnpm "
        commandSecondary="create-rule"
        tip={<p>Then you have to enter the name of your rule</p>}
      />

      <Block
        title="It will automaticaly
          create the new files needed for your rule according to the following
          tree structure:"
      >
        <>
          <ThemedImage
            sources={{
              light: useBaseUrl('/img/newRuleTreeLight.svg'),
              dark: useBaseUrl('/img/newRuleTreeDark.svg'),
            }}
          />
          <p className={styles.subtext}>
            It will update the <span className={styles.file}>index.ts</span>{' '}
            files to correctly export the new files. And it will create 3 new
            files :{' '}
            <li>
              <span className={styles.file}>doc.md</span> with the documentation
              of the rule
            </li>{' '}
            <li>
              <span className={styles.file}>index.ts</span> with the actual code
              of the rule
            </li>{' '}
            <li>
              <span className={styles.file}>test.ts</span> with the end-to-end
              test for the rule
            </li>{' '}
          </p>
        </>
      </Block>

      <Block title="Write the code of your rule">
        <div className={styles.newRuleBlock}>
          <div className={styles.newRuleInsideBlock}>
            <ThemedImage
              sources={{
                light: useBaseUrl('/img/newRuleIndexLight.svg'),
                dark: useBaseUrl('/img/newRuleIndexDark.svg'),
              }}
            />
            <p>Yoooo</p>
          </div>
          <UilArrowDown size={75} />
          <ThemedImage
            sources={{
              light: useBaseUrl('/img/useArmRuleLight.svg'),
              dark: useBaseUrl('/img/useArmRuleDark.svg'),
            }}
          />
        </div>
      </Block>
      <Block title='Write the documentation of your rule in the "doc.md" file'>
        <p>
          The documentation of your rule will be displayed on the website.{' '}
          <br />
          Document your rule for others to understand{' '}
          <span className={styles.file}>why it's important </span>
          and <span className={styles.file}>how to fix it</span>. Additionnaly
          you can add links to ressources to help the user understand the rule.
        </p>
      </Block>
      <Block title='Write the end to end test of your rule in the "test.ts" file'>
        <div>
          <p>
            Test that your rule works as expected against your stack. <br />
            Then you can write an end to end test that will check that your rule
            works on a specially crafted stack. The passing and failing created
            ressources will be tagged so they can be easily checked.
            <br />
            You might need to create a new default construct for your specific
            resource.
          </p>
          <ThemedImage
            sources={{
              light: useBaseUrl('/img/testRuleLight.svg'),
              dark: useBaseUrl('/img/testRuleDark.svg'),
            }}
          />
        </div>
      </Block>
      <Block title="Finally, you can open a pull-request 🌟">
        <p>
          Create a branch with your new rule and open a pull-request with the
          main branch. The sls-mentor maintainer team will review it and publish
          it in the next version.
        </p>
      </Block>

      <h4>
        If your rule needs resources from a service that is not supported:
      </h4>
      <Block title="Create your own ARN class">
        <ol>
          <li>
            Create a new ARN class extending CustomARN (copy{' '}
            <a href="https://github.com/sls-mentor/sls-mentor/blob/master/packages/core/src/types/arn/lambda/LambdaFunctionARN.ts">
              LambdaFunctionARN
            </a>{' '}
            for example)
          </li>
          <li>
            Adapt the logic of this class to be able to be generated from a
            CloudFormation resourceId, and from any information returned by the
            sdk (example: fromFunctionName for Lambdas)
          </li>
          <li>
            Add a case to the big switch case in{' '}
            <a href="https://github.com/sls-mentor/sls-mentor/blob/master/packages/cli/src/init/fetchCloudFormationResourceArns.ts">
              fetchCloudFormationResourceArns.
            </a>{' '}
            This will allow sls-mentor to turn resources from cloudformation
            into your new ARN class.
          </li>
          <li>
            Create a `list&lt;YourReource&gt;.ts` file in the{' '}
            <a href="https://github.com/sls-mentor/sls-mentor/tree/master/packages/cli/src/init/listResources">
              listResources
            </a>{' '}
            folder
          </li>
          <li>
            In this file, use the AWS SDK to list all the needed resources from
            the user's account (don't forget pagination), and then use your new
            ARN class methods to turn the sdk data into your new ARN class
          </li>
          <li>
            Invoke this function in the{' '}
            <a href="https://github.com/sls-mentor/sls-mentor/blob/master/packages/cli/src/init/listResources/listAllResources.ts">
              listAllResources
            </a>
          </li>
        </ol>
      </Block>
    </main>
  </Layout>
);

export default HowToContribute;
