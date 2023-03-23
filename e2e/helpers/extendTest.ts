import { test as base } from '@playwright/test'
import type { Page, TestFixture } from '@playwright/test'


type ExtendedTest = {
  goTo: (pathname: string) => Promise<any>
  routeAbort: (opName: string) => Promise<() => Promise<any>>
  waitForSelector: (selector: string) => Promise<any>
  waitForResponse: (opname: string, opts?: Record<string, any>) => Promise<any>
}

export type ExtendedTestArgs = ExtendedTest & {
  page: Page
}

export type ExtendedTestFixture<Fixture = () => Promise<void>, AdditionalArgs = {}> = TestFixture<Fixture, ExtendedTestArgs & AdditionalArgs>

export const test = base.extend<ExtendedTest>({
  goTo: async ({ page }, use) => {
    await use((pathname: string) => {
      let searchString = 'test=1'

      const finalPathname = `${pathname}${/\?/.test(pathname) ? '&' : '?'}${searchString}`

      return page.goto(finalPathname, { timeout: 20 * 1000 })
    })
  },
  routeAbort: async ({ page }, use) => {
    await use(async (url) => {
      const isOpname = /^[\w]+$/.test(url)
      const match = isOpname ? new RegExp(`opname=${url}\\b`) : url

      const handler = (route) => route.abort()

      await page.route(match, handler)

      return () => page.unroute(match, handler)
    })
  },
  waitForSelector: async ({ page }, use) => {
    await use((selector) => {
      return page.waitForSelector(selector)
        .catch((err) => {
          if (/TimeoutError/.test(err)) {
            return Promise.reject(`Timeout while waiting for the element "${selector}".`)
          }
          else {
            return Promise.reject(err)
          }
        })
    })
  },
  waitForResponse: async ({ page }, use) => {
    await use((url, opts = {}) => {
      const isOpname = /^[\w]+$/.test(url)
      const match = isOpname ? new RegExp(`opname=${url}\\b`) : new RegExp(url)

      return page.waitForResponse((res) => match.test(res.url()), {
        ...opts,
        timeout: 16 * 1000,
      })
        .catch((err) => {
          if (/TimeoutError/.test(err)) {
            return Promise.reject(`Timeout while waiting for event "response", requested ${isOpname ? `/graphql?opname=${url}` : url}.`)
          }
          else {
            return Promise.reject(err)
          }
        })
    })
  },
})
