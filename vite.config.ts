import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import CodeSourcePlugin from './code-source-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    CodeSourcePlugin(),
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  base: process.env.NODE_ENV === 'production' ? '/react-course/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
