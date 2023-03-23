import './extendExpect'
import './extendSelectors'


export { expect } from '@playwright/test'
export { test } from './extendTest'

export type { ExtendedTestArgs, ExtendedTestFixture } from './extendTest'
