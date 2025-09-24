import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        provider: 'v8',
        // More infos about reporters: https://github.com/davelosert/vitest-coverage-report-action
        reporter: ['text', 'json-summary', 'json'],
        // We want a coverage reports even if our tests are failing
        reportOnFailure: true
      },
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      transformMode: {
        web: [/\.[jt]sx$/]
      },
      mockReset: true,
      globals: true,
      server: {
        deps: {
          inline: ['vuetify']
        }
      }
    }
  })
)
