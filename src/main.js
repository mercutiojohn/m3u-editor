import Vue from 'vue'
import App from './App.vue'

// Styles
import '@/style.scss'
import 'virtual:uno.css'

import 'uno.css'
import 'virtual:unocss-devtools'

// Fonts
import '@fontsource/inter'
import '@fontsource-variable/noto-sans-sc'
import '@fontsource-variable/fira-code'

// Vuex
import store from "@/store"

// VueRouter
import router from '@/router'

// plugins
import '@/plugins'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

