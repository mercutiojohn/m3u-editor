import vue from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'
// import svgLoader from 'vite-svg-loader';
// https://github.com/jpkleemans/vite-svg-loader/issues/76
import { createSvgPlugin as svgLoader } from "@kingyue/vite-plugin-vue2-svg";

import { resolve } from 'path'
// import Component from 'unplugin-vue-components/vite'

export default {
  plugins: [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-preset-jsx
    }),
    svgLoader()
    // Component({
    //   dts: true,
    //   resolvers: [
    //     RadixVueResolver()
    //   ]
    // })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  }
}
