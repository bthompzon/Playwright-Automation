import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 60000,
  use: {
      headless: false,
    baseURL: 'https://www.saucedemo.com/'
  }
};
export default config;