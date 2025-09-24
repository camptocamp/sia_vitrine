import { createTestingPinia, type TestingPinia } from '@pinia/testing'
import { setActivePinia } from 'pinia'
import { vi } from 'vitest'

global.ResizeObserver = require('resize-observer-polyfill')

export const setupPinia = (stubActionsWithSpies: boolean = false): TestingPinia => {
  const testPinia = createTestingPinia({
    createSpy: vi.fn, // spy with vitest
    stubActions: stubActionsWithSpies
  })
  setActivePinia(testPinia)

  return testPinia
}

const fetch = vi.fn()
global.fetch = fetch

export const mockFetch = () => ({
  fetch,
  createFetchResponse: (data: any, ok: boolean = true, status: number = 200) => ({
    ok,
    status,
    json: () => new Promise((resolve) => resolve(data))
  })
})
