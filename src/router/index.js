import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/panel',
    name: 'Panel',
    component: () => import('@/views/Panel.vue')
  },
  {
    path: '/crud',
    name: 'Crud',
    component: () => import('@/views/Crud.vue')
  },
  {
    path: '/grid',
    name: 'Grid',
    component: () => import('@/views/Grid.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router