// Importing vue-router environment
import { createRouter, createWebHistory } from 'vue-router'

// Importing status pages
import _404 from "@/views/status-pages/404.vue";
import _403 from "@/views/status-pages/403.vue";

// Importing route-pages
import Search from "@/views/route-pages/Search/Search.vue";
import SearchResults from "@/views/route-pages/Search/SearchResults.vue";
import SearchEntity from "@/views/route-pages/Search/SearchEntity.vue";


const routes = [
  {
    path: '/',
    name: 'Search',
    component: Search
  },
  {
    path: "/403",
    name: '_403',
    component: _403,
  },
  {
    path: "/search",
    name: 'SearchResults',
    component: SearchResults,
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
