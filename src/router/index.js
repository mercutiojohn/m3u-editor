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
    component: () => import('@/views/Crud/index.vue')
  },
  {
    path: '/grid',
    name: 'Grid',
    component: () => import('@/views/Grid.vue')
  },
  {
    path: '/generate-m3u',
    name: 'GenerateM3U',
    component: () => import('@/views/GenerateM3U/index.vue')
  },
  {
    path: '/ical-to-epg',
    name: 'iCalToEPG',
    component: () => import('@/views/iCalToEPG/index.vue')
  },
  {
    path: '/geojson-combine',
    name: 'GeoJSONCombine',
    component: () => import('@/views/GeoJSONCombine/index.vue')
  },
  {
    path: '/edit-ical',
    name: 'EditiCal',
    component: () => import('@/views/EditiCal/index.vue')
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