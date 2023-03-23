import { devices } from '@playwright/test'
import type { PlaywrightTestConfig } from '@playwright/test'


const config: PlaywrightTestConfig = {
  testDir: './tests',
  workers: 1,
  retries: 2,
  use: {
    baseURL: 'http://localhost:3000',
    headless: false,
    ignoreHTTPSErrors: true,
    bypassCSP: true,
    launchOptions: {
      // devtools: true,
      // logger: {
      //   isEnabled: (name, severity) => true,
      //   log: (name, severity, message, args) => console.log(`${name} ${message}`),
      // },
    },
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: devices['Desktop Chrome'],
    },
    {
      name: 'Mobile Chrome',
      use: {
        browserName: 'chromium',
        ...devices['iPhone XR'],
      },
    },
  ],
  reporter: [
    [ 'line' ],
    [ 'json', { outputFile: 'report.json' } ],
  ],
}


export default config
