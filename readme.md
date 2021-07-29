Create new Node Project:

```shell
npm init -y
```

Playwright Installation:

Playwright has its own test runner for end-to-end tests, we call it Playwright Test.

```shell
npm i -D @playwright/test
```

Unlike Playwright Library, Playwright Test does not bundle browsers by default, so you need to install them explicitly:

```shell
npx playwright install
```

Create tests in the tests directory

To run tests simply type:

```shell
npx playwright test
```

Run headed:

```shell
npx playwright test --headed
```

Run in specific browser:

```shell
npx playwright test --browser=firefox
```

Run on all browsers:

```shell
npx playwright test --browser=all
```

Run a single test file:

```shell
npx playwright test tests/first.test.ts
```

Run a set of test files:

```shell
npx playwright test tests/first.test.ts tests/two.test.ts
```

Run a test with specific title:

```shell
npx playwright test -g "basic test"
```

Run tests in parallel (by default in parallel):

```shell
npx playwright test
```

Disable parallelization:

```shell
npx playwright test --workers=1
```

Choose a reporter:

```shell
npx playwright test --reporter=dot
npx playwright test --reporter=list
npx playwright test --reporter=json
PLAYWRIGHT_JUNIT_OUTPUT_NAME=results.xml npx playwright test --reporter=junit
```

Set reporter in config file like so:

---------------------------------------------------------------

// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reporter: [ ['junit', { outputFile: 'results.xml' }] ],
};
export default config;

---------------------------------------------------------------

Run in debug mode with Playwright Inspector:

```shell
# Linux/macOS
PWDEBUG=1 npx playwright test
```

Retry tests (flaky yo):

```shell
npx playwright test --retries=3
```

Visual testing example:

// example.spec.ts
import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('https://playwright.dev');
  expect(await page.screenshot()).toMatchSnapshot('landing.png');
});

Note: first run creates baseline snapshot image.

You can also set a threshold when matching images:

expect(await page.screenshot()).toMatchSnapshot('home.png', { threshold: 0.2 });

Set config at runtime:

```shell
npx playwright test --config=tests/my.config.js
```

How to launch playwright codegen

npx playwright codegen https://www.bestbuy.ca/en-ca