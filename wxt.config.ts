import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Google Maps Scraper',
    description: '',
    version: '0.0.1',
    action: {},
    host_permissions: ['<all_urls>'],
    web_accessible_resources: [
      {
        resources: ['inspector.html'],
        matches: ['<all_urls>'],
      },
    ],
    permissions: [
      'tabs',
      'activeTab',
      'scripting',
      'storage',
      'webNavigation',
      'notifications',
      'debugger',
    ],
  },
});
