// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const lightCodeTheme = require('prism-react-renderer/themes/github');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'sls-mentor',
  tagline: 'AWS Serverless Audit',
  url: 'http://pchol.fr',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.json'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/sls-mentor/sls-mentor/tree/master/apps/documentation',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        ...(process.env.STAGE === 'prod' && {
          gtag: {
            trackingID: 'G-FNPC8EWL38',
            anonymizeIP: true,
          },
        }),
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'sls-mentor',
        logo: {
          alt: 'sls-mentor logo',
          src: 'img/sls-mentor.svg',
        },
        items: [
          {
            to: 'gettingStarted',
            position: 'right',
            label: 'Quick start',
          },
          {
            type: 'doc',
            docId: 'intro',
            position: 'right',
            label: 'Docs',
          },
          {
            to: 'howToContribute',
            position: 'right',
            label: 'How to contribute ?',
          },
          {
            href: 'https://github.com/sls-mentor/sls-mentor',
            className: 'header-github-link',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        logo: {
          src: '/img/sls-mentor.svg',
          alt: 'Logo sls-mentor copyright',
          height: '40px',
        },
        copyright: `Copyright ${new Date().getFullYear()} © sls-mentor`,
        links: [
          {
            title: 'Contribute ❤️',
            items: [
              {
                label: 'Github',
                href: 'https://github.com/sls-mentor/sls-mentor',
              },
              {
                label: 'Npm',
                href: 'https://www.npmjs.com/package/sls-mentor',
              },
            ],
          },
          {
            title: 'Powered by 🚀',
            items: [
              {
                label: 'Kumo',
                href: 'https://twitter.com/kumoserverless',
              },
              {
                label: 'Aleios',
                href: 'https://www.aleios.com/',
              },
              {
                label: 'Theodo',
                href: 'https://www.theodo.fr/',
              },
            ],
          },
          {
            title: 'Our friends 🤝',
            items: [
              {
                label: 'Swarmion',
                href: 'https://www.swarmion.dev/',
              },
              {
                label: 'Castore',
                href: 'https://github.com/castore-dev/castore',
              },
            ],
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
