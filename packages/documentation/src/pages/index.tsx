import useBaseUrl from '@docusaurus/useBaseUrl';
import { UilCopy } from '@iconscout/react-unicons';
import Layout from '@theme/Layout';
import React from 'react';

import {
  Buttons,
  Card,
  Contributors,
  SponsoredByTheodo,
  Title,
} from '../components';
import commandStyles from '../components/gettingStarted/codeBlock/codeBlock.module.css';
import styles from './index.module.css';

const Home = (): JSX.Element => {
  const [v3ModalOpen, setV3ModalOpen] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setV3ModalOpen(true);
    }, 2000);
  }, [setV3ModalOpen]);

  return (
    <Layout title="Homepage" description="sls-mentor Homepage">
      {v3ModalOpen && (
        <div
          className={styles.modalContainer}
          onClick={() => setV3ModalOpen(false)}
        >
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h1>✨ sls-mentor v3 is in alpha ✨</h1>
            <h4>Your AWS serverless app like you've never seen it before</h4>
            <img
              src={useBaseUrl('/img/3.0.0.gif')}
              style={{ width: '100%', borderRadius: '.5em' }}
            />
            <div
              className={commandStyles.outerBlock}
              style={{ textAlign: 'left', width: '100%' }}
            >
              <h6>In your CLI:</h6>
              <div className={commandStyles.innerBlock}>
                <p className={commandStyles.command}>
                  npx sls-mentor@alpha{' '}
                  <a className={commandStyles.secondary}>
                    -p &lt;AWS_CLI_PROFILE&gt;
                  </a>
                </p>
                <UilCopy
                  className={commandStyles.copy}
                  size="2em"
                  onClick={() =>
                    void navigator.clipboard.writeText(
                      'npx sls-mentor@alpha -p <AWS_CLI_PROFILE>',
                    )
                  }
                />
              </div>
            </div>
            <h5 style={{ marginTop: '1em' }}>
              Weekly releases, we are open to contributions and feature
              requests!
            </h5>
          </div>
        </div>
      )}
      <main className={styles.mainContainer}>
        <section className={styles.mainSection}>
          <div className={styles.leftSection}>
            <div>
              <Title />
            </div>
            <h1 className={styles.title}>
              Open-source serverless infrastructure audit
            </h1>
            <h3 className={styles.subtitle}>
              Discover and enforce new best practices!
            </h3>
            <Buttons />
          </div>
          <div className={styles.rightSection}>
            <img src={useBaseUrl('/img/sls-mentor.svg')} />
          </div>
        </section>
        <section>
          <div className={styles.cardsContainer}>
            <Card
              title="Built for AWS"
              message="We support AWS serverless services such as Lambda, S3, EventBridge and many more!"
            ></Card>
            <Card
              title="Framework agnostic"
              message="Built on AWS SDK. We check your resources online and support every deployment method."
            ></Card>
            <Card
              title="Easy to implement"
              message="Start from the most important, improve your app step-by-step by climbing difficulty levels"
            ></Card>
            <Card
              title="Free and open-source"
              message="We are open to contributions! Feel free to implement new rules and give some feedback!"
            ></Card>
          </div>
        </section>
        <section>
          <Contributors />
        </section>
        <SponsoredByTheodo />
      </main>
    </Layout>
  );
};

export default Home;
