import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/ur/docs',
    component: ComponentCreator('/ur/docs', '847'),
    routes: [
      {
        path: '/ur/docs',
        component: ComponentCreator('/ur/docs', '002'),
        routes: [
          {
            path: '/ur/docs',
            component: ComponentCreator('/ur/docs', 'c43'),
            routes: [
              {
                path: '/ur/docs/advanced-ai-control/module-5-advanced-ai',
                component: ComponentCreator('/ur/docs/advanced-ai-control/module-5-advanced-ai', 'cf6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/appendix/glossary',
                component: ComponentCreator('/ur/docs/appendix/glossary', 'c55'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/appendix/references',
                component: ComponentCreator('/ur/docs/appendix/references', '98f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/appendix/resources',
                component: ComponentCreator('/ur/docs/appendix/resources', '487'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/hardware-basics/module-3-hardware',
                component: ComponentCreator('/ur/docs/hardware-basics/module-3-hardware', '7df'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/humanoid-design/module-6-humanoid-design',
                component: ComponentCreator('/ur/docs/humanoid-design/module-6-humanoid-design', '255'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/intro',
                component: ComponentCreator('/ur/docs/intro', '793'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/introduction/intro',
                component: ComponentCreator('/ur/docs/introduction/intro', '23d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/ros2-foundations/module-1-ros2',
                component: ComponentCreator('/ur/docs/ros2-foundations/module-1-ros2', '8ba'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/ros2-foundations/ros2-hands-on',
                component: ComponentCreator('/ur/docs/ros2-foundations/ros2-hands-on', 'e66'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/simulation/digital-twins',
                component: ComponentCreator('/ur/docs/simulation/digital-twins', '77e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/simulation/gazebo-unity',
                component: ComponentCreator('/ur/docs/simulation/gazebo-unity', '467'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/simulation/module-2-simulation',
                component: ComponentCreator('/ur/docs/simulation/module-2-simulation', '6df'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/vla-systems/module-4-vla-foundations',
                component: ComponentCreator('/ur/docs/vla-systems/module-4-vla-foundations', '98b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/vla-systems/vla-action',
                component: ComponentCreator('/ur/docs/vla-systems/vla-action', '755'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/vla-systems/vla-hands-on-basic',
                component: ComponentCreator('/ur/docs/vla-systems/vla-hands-on-basic', '1d4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/vla-systems/vla-language',
                component: ComponentCreator('/ur/docs/vla-systems/vla-language', 'e25'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/vla-systems/vla-vision',
                component: ComponentCreator('/ur/docs/vla-systems/vla-vision', '601'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/ur/',
    component: ComponentCreator('/ur/', '3b1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
