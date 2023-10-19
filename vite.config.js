import vue from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'
import { resolve } from 'path'
import RadixVueResolver from 'radix-vue/resolver'
// import Component from 'unplugin-vue-components/vite'

export default {
  plugins: [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-preset-jsx
    }),
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
