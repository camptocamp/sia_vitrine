/*
 * This file is part of SIA 62.
 * SIA 62 is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * SIA 62 is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with SIA 62. If not, see <https://www.gnu.org/licenses/>.
 */

import { setupPinia } from '@/tests/setup'
import HomeView from '@/views/HomeView.vue'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const routerPushMock = vi.fn()

vi.mock('vue-router', async () => ({
  // @ts-ignore
  ...(await vi.importActual('vue-router')),
  useRouter: () => ({
    push: routerPushMock
  })
}))

vi.mock('vue3-zoomer/dist/vue3-zoomer.es.js', () => ({
  default: {}
}))

describe('Home View', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    const testPinia = setupPinia()

    wrapper = shallowMount(HomeView, {
      global: {
        plugins: [testPinia],
        stubs: ['router-link', 'router-view'] // Stubs for router-link and router-view in case they're rendered in
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should mount', () => {
    const content = wrapper.find('.content')
    expect(content.exists()).toBe(true)
  })
})
