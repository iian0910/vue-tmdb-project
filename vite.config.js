import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      vueDevTools(),
      vuetify({
        // 自動載入 Vuetify 元件與樣式
        autoImport: true
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/api/tmdb': {
          target: 'https://api.themoviedb.org/3',
          changeOrigin: true,
          // 將 /api/tmdb/movie/popular 轉成 /movie/popular
          rewrite: (path) => path.replace(/^\/api\/tmdb/, ''),
          headers: {
            Authorization: `Bearer ${env.TMDB_READ_ACCESS_TOKEN}`,
            Accept: 'application/json'
          }
        }
      }
    }
  }
})
