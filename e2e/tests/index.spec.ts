import { test, expect } from '../helpers'


test.describe('NASA Media Library', () => {

  test('opens search page', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    await expect('tid=search').toBeOnPage(page)
    await expect('tid=yearEnd').toBeOnPage(page)
    await expect('tid=yearStart').toBeOnPage(page)
    await expect('tid=searchButton').toBeOnPage(page)
  })

  test('types search request', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    await page.fill('tid=search', 'test')
    await page.click('tid=searchButton')
    await page.waitForSelector('tid=totalHits')
  })

  test('opens asset page', async ({ page }) => {
    await page.goto('http://localhost:3000/MSFC-1501283')
    await expect('tid=backButton').toBeOnPage(page)
  })
})
