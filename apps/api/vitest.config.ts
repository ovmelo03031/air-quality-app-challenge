import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./test/setup-e2e.ts'],
    include: ['**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    deps: {
      inline: [/@nestjs\/testing/],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@helpers': resolve(__dirname, './src/helpers'),
      '@models': resolve(__dirname, './src/models'),
      '@air-quality': resolve(__dirname, './src/modules/air-quality'),
    },
  },
})