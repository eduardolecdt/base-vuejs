import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
import generateFile from 'vite-plugin-generate-file'
import * as uuid from 'uuid'
import * as Manifest from './src/manifest'
import packageJson from './package.json'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: null,
      workbox: { maximumFileSizeToCacheInBytes: 5 * 1024 * 1024 },
      manifest: Manifest.json()
    }),
    generateFile([
      {
        type: 'json',
        output: './app.json',
        data: {
          build: `${packageJson.version}-${uuid.v4()}`
        }
      }
    ])
  ],
  build: {
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      output: {
        chunkFileNames: `assets/js/[name]-[hash]-${Date.now()}.js`,
        entryFileNames: `assets/js/[name]-[hash]-${Date.now()}.js`,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) return `assets/css/[name]-[hash]-${Date.now()}.css`
          return `assets/[name]-[hash]-${Date.now()}.[ext]`
        },
        manualChunks(id) {
          if (id.includes('/node_modules/')) return 'vendor'
          if (id.includes('/components/')) return 'pages'
        }
      }
    }
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      {
        find: '@svgs',
        replacement: path.resolve(__dirname, './src/components/global/svgs/Svgs.vue')
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, './src/components')
      },
      {
        find: '@helpers',
        replacement: path.resolve(__dirname, './src/helpers')
      },
      { find: '@stores', replacement: path.resolve(__dirname, './src/stores') }
    ]
  },
  css: {
    postcss: {
      plugins: [require('autoprefixer')()]
    }
  }
})
