import { defineConfig } from 'cypress';
// @ts-ignore
import mochawesomeWriter from 'cypress-mochawesome-reporter';

export default defineConfig({
  e2e: {
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporterOptions.json',
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    baseUrl: 'https://tourmalinecore.github.io/React-Admin-Template',
    defaultCommandTimeout: 30000,
    video: false,
    setupNodeEvents(on, config) {

    },
    env: { MAILSLURP_API_KEY: 'd4297d96dcba82391396d35f1816ea1a84d1bf2b76bafec682756611cf383d00' },
  },

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
