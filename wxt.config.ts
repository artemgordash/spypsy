import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  manifestVersion: 3,
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
      'cookies',
      'tabs',
      'activeTab',
      'scripting',
      'storage',
      'webRequest',
      'webNavigation',
      'notifications',
      'debugger',
      'declarativeWebRequest',
    ],
  },
});
