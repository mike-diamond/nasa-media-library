import { expect } from '@playwright/test'
import type { Page } from '@playwright/test'
import type expectType from 'expect'


declare global {
  namespace PlaywrightTest {
    interface Matchers<R> extends expectType.Matchers<R> {
      toBeOnPage(page: Page): Promise<R>;
    }
  }
}

expect.extend({
  /*

    Add "toBeOnePage" sugar method to easy check that elements exist on Playwright page.
    If element doesn't exist correct error message will be shown (not just timeout).

    await expect('text=Brand page').toBeOnPage()

    await expect('text=Brand page').not.toBeOnPage()

  */
  async toBeOnPage(selector, page) {
    const element = await page.$(selector)

    if (!element) {
      return {
        message: () => `the element "${selector}" doesn't exist on page.`,
        pass: false,
      }
    }

    return {
      message: () => `the element "${selector}" shouldn't exist on page.`,
      pass: true,
    }
  },
})
