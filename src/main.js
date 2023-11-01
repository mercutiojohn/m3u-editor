import Vue from 'vue'
import App from './App.vue'

// Styles
import '@/style.scss'
import "@/assets/el-reset.scss"

// Fonts
import '@fontsource/inter'

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

