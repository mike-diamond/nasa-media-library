import { selectors } from '@playwright/test'


(async () => {
  await selectors.register('tid', () => {
    /*
      initial selector value contains value that's going after tid=
      for
      await page.click('tid=changeFrequencyModal tid=selectableListItem:nth-child(1)')
      selector's value will be
      changeFrequencyModal tid=selectableListItem:nth-child(1)
      so to replace all tid= this ductape exists
    */
    const modifySelector = (selector) => {
      return selector.replace(/(^|tid=)([\w-_]+)/g, '[data-testid=$2]')
    }

    return {
      query(root, selector) {
        return root.querySelector(modifySelector(selector))
      },
      queryAll(root, selector) {
        return Array.from(root.querySelectorAll(modifySelector(selector)))
      },
    }
  })
})()
