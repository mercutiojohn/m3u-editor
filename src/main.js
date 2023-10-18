import Vue from 'vue'
import App from './App.vue'

import './style.css'

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

