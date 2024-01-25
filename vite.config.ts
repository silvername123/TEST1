import { fileURLToPath, URL } from 'node:url'

import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv) => {
  const env = loadEnv(mode.mode, process.cwd())
  return {
    plugins: [vue(), vueJsx()],
    // resolve: {
    //   alias: {
    //     '@': fileURLToPath(new URL('./src', import.meta.url))
    //   }
    // },
    server: {
      open: true
    },
    base: env.VITE_BASE_URL,
    // base:'./',
    // base: './',
    resolve: {
      alias: {
        '@': join(__dirname, 'src')
      }
    }
  }
})
