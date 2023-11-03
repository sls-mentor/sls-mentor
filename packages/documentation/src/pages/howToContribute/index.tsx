import useBaseUrl from '@docusaurus/useBaseUrl';
import { UilArrowDown } from '@iconscout/react-unicons';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import React from 'react';

import {
  Block,
  CodeBlock,
  OwnArnClassBlock,
  YoutubeEmbed,
} from '../../components';
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
            files :
            <li>
              <span className={styles.file}>doc.md</span> with the documentation
              of the rule
            </li>
            <li>
              <span className={styles.file}>index.ts</span> with the actual code
              of the rule
            </li>
            <li>
              <span className={styles.file}>test.ts</span> with the end-to-end
              test for the rule
            </li>
          </p>
        </>
      </Block>

      <Block title="Write the code of your rule">
        <div className={styles.newRuleBlock}>
          <table>
            <tr>
              <th style={{ width: '50%' }}>
                <span className={styles.file}>Configuration</span>
              </th>
              <th>
                <span className={styles.file}>Source code</span>
              </th>
            </tr>
            <tr>
              <td>
                <ul>
                  <li>Find a name and an error message for your rule</li>
                  <li>Set the categories and the AWS service related to it</li>
                  <li>
                    Fix a level for the rule, it should reflect the importance
                    and the effort it takes to be solved. (You can ask for help
                    from the sls-mentor team to find the right level)
                  </li>
                </ul>
              </td>
              <td>
                <ul>
                  <li>
                    Fetch the configuration of the ressources concerned by the
                    rule
                  </li>
                  <li>
                    Check the configuration of the ressources (you might need to
                    read the sdk documentation to find the right method to do
                    so)
                  </li>
                  <li>
                    Return an array composed of the ressources with their ARN
                    and if they verify the rule
                  </li>
                </ul>
              </td>
            </tr>
          </table>
          <div className={styles.newRuleInsideBlock}>
            <ThemedImage
              sources={{
                light: useBaseUrl('/img/newRuleIndexLight.svg'),
                dark: useBaseUrl('/img/newRuleIndexDark.svg'),
              }}
            />
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
      <Block title='(Optional) Write the end to end test of your rule in the "test.ts" file'>
        <div>
          <p>
            First of all, you should test that your rule works as expected on
            your stack.
            <br />
            Then you can write an end to end test that will check that your rule
            works on a specially crafted stack. The passing and failing created
            ressources will be tagged so they can be easily checked. ( You might
            need to create a new default construct for your specific resource.)
            <br />
            ⚠️ Some rules should not be tested:
            <ul>
              <li>
                If testing the rule requires provisioning a non-serverless
                resource (for example a RDS or a Lambda with provisioned
                concurrency) don’t test it. We care about the planet (and our
                costs 🤡). We don’t want to allocate compute or storage units
                only for our test stack.
              </li>
              <li>
                CloudFormation does not support tags on some resources: SES
                resources like ConfigurationSet and Identity for example. As you
                need to tag the created resource to be able to check if the rule
                works, rules that concern these types of resources cannot be
                tested.
              </li>
            </ul>
            In these cases, you can remove the test file.
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

      <OwnArnClassBlock />
      <h4>Watch our youtube tutorial for a live example</h4>
      <YoutubeEmbed embedId="ijeb5gaU1sQ" />
    </main>
  </Layout>
);

export default HowToContribute;
