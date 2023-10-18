import vue from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'
import { resolve } from 'path'

export default {
  plugins: [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-preset-jsx
    })
  ],

  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  }
}
