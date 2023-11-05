import vue from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'
import UnoCSS from 'unocss/vite'
// import basicSsl from '@vitejs/plugin-basic-ssl'
import { createSvgPlugin as svgLoader } from "@kingyue/vite-plugin-vue2-svg";

import { resolve } from 'path'

export default {
  plugins: [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-preset-jsx
    }),
    svgLoader(),
    UnoCSS(),
    // basicSsl(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    // https: true
  },
}
