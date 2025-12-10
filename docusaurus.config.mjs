import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Physical AI and Humanoid Robotics',
  tagline: 'Learning Physical AI and Robotics',
  favicon: 'img/favicon.ico',

  // ✅ Vercel settings
  url: 'https://human-inspired-robotics-intelligence.vercel.app',
  baseUrl: '/',

  organizationName: 'YUMNANASIR01',
  projectName: 'Physical AI and Humanoid Robotics',

  onBrokenLinks: 'ignore',
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
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/', // ✅ Serve docs at root URL
          // Remove editUrl or update it
        },
        blog: false, // ✅ Disable blog if not using
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/ph-ai-logo.png',

      navbar: {
        title: 'Physical AI and Humanoid Robotics',
        logo: {
          alt: 'Human-Inspired Robotics Logo',
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
            href: 'https://github.com/YUMNANASIR01/Human-Inspired-Robotics-Intelligence',
            label: 'GitHub',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            type: 'custom-NavbarItems',
            position: 'right',
          },
        ],
      },

      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/intro',
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
        copyright: `© ${new Date().getFullYear()} Physical AI and Humanoid Robotics — Built with ❤️ by Yumna Nasir.`,
      },

      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),

  // Add global remark plugins to make components available in MDX files
  plugins: [
    async function myPlugin(context, options) {
      return {
        name: 'docusaurus-auth-plugin',
        configureWebpack(config, isServer, utils) {
          return {
            resolve: {
              alias: {
                '@site/src/components': require('path').join(__dirname, 'src/components'),
              },
            },
          };
        },
      };
    },
  ],
};

export default config;