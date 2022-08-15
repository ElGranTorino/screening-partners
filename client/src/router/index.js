// Importing vue-router environment
import { createRouter, createWebHistory } from 'vue-router'

// Importing status pages
import _404 from "@/views/status-pages/404.vue"
import _403 from "@/views/status-pages/403.vue"

// Importing route-pages
import HomeView from "@/views/route-pages/HomeView.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/403",
    name: '_403',
    component: _403,
  },
  {
    path: "/:catchAll(.*)",
    name: '_404',
    component: _404,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
