import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

import Unocss from 'unocss/vite'

export default defineConfig({
  plugins: [vue(), , Unocss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
