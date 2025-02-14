import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.e2e-spec.ts'],
    exclude: [...configDefaults.exclude],
    root: './',
    globals: true,
    environment: 'node',
    setupFiles: ['test/setup-e2e.ts'],
  },
  resolve: {
    alias: {
      '@src': './src',
    },
  },
});
