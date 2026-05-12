import { fileURLToPath, URL } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              test: /node_modules\/@mdi\//,
              name: 'icons',
            },
            {
              test: /node_modules\/(vue\/|@vue\/|vue-i18n|@vueuse\/)/,
              name: 'vue-vendors',
            },
            {
              test: /node_modules\/(dexie|howler)/,
              name: 'vendors',
            },
          ],
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.names.some(n => /\.(woff2?)$/i.test(n))) {
            return 'assets/fonts/[name][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    Vuetify({
      autoImport: true,
    }),
    {
      name: 'generate-version',
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: `version`,
          source: `${Date.now()}`,
        })
      },
    },
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
  server: {
    port: 1579,
    open: true,
    strictPort: true,
  },
})
