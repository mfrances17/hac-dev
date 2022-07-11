const { resolve } = require('path');
const packageInfo = require('../package.json');

module.exports = {
  pluginMetadata: {
    name: packageInfo.name,
    version: packageInfo.version,
    exposedModules: {
      Applications: resolve(__dirname, '../src/pages/ApplicationsPage'),
      Import: resolve(__dirname, '../src/pages/ImportPage'),
      ComponentSettings: resolve(__dirname, '../src/pages/ComponentSettingsPage'),
      PipelineRuns: resolve(__dirname, '../src/hacbs/pages/PipelineRunPage'),
    },
  },
  extensions: [
    {
      type: 'console.page/route',
      properties: {
        path: '/app-studio',
        exact: true,
        component: {
          $codeRef: 'Applications',
        },
      },
    },
    {
      type: 'core.page/route',
      properties: {
        path: '/app-studio',
        exact: true,
        component: {
          $codeRef: 'Applications',
        },
      },
    },
    {
      type: 'console.page/route',
      properties: {
        path: '/app-studio/applications',
        exact: true,
        component: {
          $codeRef: 'Applications',
        },
      },
    },
    {
      type: 'core.page/route',
      properties: {
        path: '/app-studio/applications',
        exact: true,
        component: {
          $codeRef: 'Applications',
        },
      },
    },
    {
      type: 'console.page/route',
      properties: {
        path: '/app-studio/import',
        exact: true,
        component: {
          $codeRef: 'Import',
        },
      },
    },
    {
      type: 'core.page/route',
      properties: {
        path: '/app-studio/import',
        exact: true,
        component: {
          $codeRef: 'Import',
        },
      },
    },
    {
      type: 'console.page/route',
      properties: {
        path: '/app-studio/component-settings',
        exact: true,
        component: {
          $codeRef: 'ComponentSettings',
        },
      },
    },
    {
      type: 'core.page/route',
      properties: {
        path: '/app-studio/component-settings',
        exact: true,
        component: {
          $codeRef: 'ComponentSettings',
        },
      },
    },
    {
      type: 'console.navigation/href',
      properties: {
        href: '/app-studio',
        name: 'Applications',
      },
    },
    {
      type: 'core.navigation/href',
      properties: {
        href: '/app-studio',
        name: 'Applications',
      },
    },
    // Remove comments below and re-run 'npm run start:prod:beta'
    // to view Pipeline Runs in the left-hand nav
    // TODO change this when feature flags become available
    {
      type: 'console.navigation/href',
      properties: {
        href: '/app-studio/pipelineruns',
        name: 'PipelineRuns',
      },
    },
    {
      type: 'core.navigation/href',
      properties: {
        href: '/app-studio/pipelineruns',
        name: 'PipelineRuns',
      },
    },
    {
      type: 'console.page/route',
      properties: {
        path: '/app-studio/pipelineruns',
        exact: true,
        component: {
          $codeRef: 'PipelineRuns',
        },
      },
    },
    {
      type: 'core.page/route',
      properties: {
        path: '/app-studio/pipelineruns',
        exact: true,
        component: {
          $codeRef: 'PipelineRuns',
        },
      },
    },
  ],
  sharedModules: {
    'react-router-dom': { singleton: true },
    'react-redux': { singleton: true, import: false },
    '@openshift/dynamic-plugin-sdk-utils': { singleton: true, import: false },
    '@scalprum/react-core': { singleton: true, import: false },
    '@patternfly/quickstarts': { singleton: true, eager: true },
    '@openshift/dynamic-plugin-sdk': { singleton: true, import: false },
  },
};
