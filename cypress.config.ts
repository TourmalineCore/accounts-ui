import { defineConfig } from 'cypress';
// @ts-ignore
import mochawesomeWriter from 'cypress-mochawesome-reporter';

export default defineConfig({
  e2e: {
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporterOptions.json',
    },
    viewportWidth: 1200,
    viewportHeight: 660,
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    baseUrl: 'https://tourmalinecore.github.io/React-Admin-Template',
    video: false,
    setupNodeEvents(on, config) {
      mochawesomeWriter(on, config);
    },
  },

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
