import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/views/home/Home.vue')
const KeyboardPlayground = () => import('@/views/playground/KeyboardPlayground.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/playground', component: KeyboardPlayground },
  // { path: '/about', component: AboutView },
] satisfies RouteRecordRaw[]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
