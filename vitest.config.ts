import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [path.resolve(__dirname, './src/test/setup.ts')],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: [
      'src/lib/env.test.ts',
      'src/lib/calcom.test.ts',
      'src/lib/faq.test.ts',
      'src/lib/microcms.test.ts',
      'src/lib/news-detail.test.ts',
      'src/lib/news-list-query.test.ts',
      'src/lib/top-news.test.ts',
      'src/lib/web3forms.test.ts',
      'node_modules',
    ],
    css: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
