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
      // 生产环境ElTable不显示，https://github.com/ElemeFE/element/issues/21968#issuecomment-1537071209
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  server: {
    // https: true
  },
}
