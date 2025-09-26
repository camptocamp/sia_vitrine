/*
 * This file is part of SIA 62.
 * SIA 62 is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * SIA 62 is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with SIA 62. If not, see <https://www.gnu.org/licenses/>.
 */

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
