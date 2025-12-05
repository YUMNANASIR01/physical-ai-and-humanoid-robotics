import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Human-Inspired Robotics & Intelligence Guide',
  tagline: 'Learning Physical AI and Robotics',
  favicon: 'img/favicon.ico',

  url: 'https://YUMNANASIR01.github.io',
  baseUrl: '/',

  organizationName: 'yumnanasir',
  projectName: 'Human-Inspired Robotics & Intelligence Guide',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ur'],
    localeConfigs: {
      ur: {
        label: 'اردو',
        direction: 'rtl',
      },
    },
  },

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig: ({
    image: 'img/ph-ai-logo.png',

    navbar: {
      title: 'Human-Inspired Robotics & Intelligence Guide',
      logo: {
        alt: 'My Site Logo',
        src: 'img/ph-ai-logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Textbook',
        },
        {
          href: 'https://github.com/YUMNANASIR01/Human-Inspired-Robotics-Intelligence-.git',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },

    // ✅ FIXED FOOTER (valid multi-column)
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/introduction/intro',
            },
          ],
        },
        {
          title: 'Social Profiles',
          items: [
            {
              label: 'Instagram',
              href: 'https://instagram.com/',
            },
            {
              label: 'LinkedIn',
              href: 'https://linkedin.com/',
            },
            {
              label: 'Twitter (X)',
              href: 'https://twitter.com/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/YUMNANASIR01',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Human-Inspired Robotics & Intelligence Guide — Built with ❤️ by Yumna Nasir.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  }),
};

export default config;





