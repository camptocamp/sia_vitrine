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
