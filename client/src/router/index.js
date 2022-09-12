// Importing vue-router environment
import { createRouter, createWebHistory } from 'vue-router'
import helpers from '@/store/helpers';

// Importing status pages
import _404 from "@/views/status-pages/404.vue";
import _403 from "@/views/status-pages/403.vue";

// Importing route-pages
import Search from "@/views/route-pages/Search/Search.vue";
import SearchResults from "@/views/route-pages/Search/SearchResults.vue";
import SearchEntity from "@/views/route-pages/Search/SearchEntity.vue";
import Login from "@/views/route-pages/LoginView.vue";
import Admin from "@/views/route-pages/AdminView.vue";
import axios from 'axios';


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
    path: '/mazeratti',
    name: 'Login',
    component: Login
  },
  {
    path: '/london',
    name: 'Admin',
    meta: {auth: true},
    component: Admin
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
router.beforeEach(async (to, from) => {
  // const url = helpers.createUrl('/verify')
  const url = helpers.createUrl('https://www.screeningpartners.net:9999/verify')
  

  if(to.name === 'Admin'){
    const access = await axios.get(url, {withCredentials: true})
    if(!access?.data?.verified) router.push({name: 'Login'})
  }
})
export default router


// // Importing vue-router environment
// import { createRouter, createWebHistory } from 'vue-router'
// import helpers from '@/store/helpers';

// // Importing status pages
// import _404 from "@/views/status-pages/404.vue";
// import _403 from "@/views/status-pages/403.vue";

// // Importing route-pages
// import Search from "@/views/route-pages/Search/Search.vue";
// import SearchResults from "@/views/route-pages/Search/SearchResults.vue";
// import SearchEntity from "@/views/route-pages/Search/SearchEntity.vue";
// import Login from "@/views/route-pages/LoginView.vue";
// import Admin from "@/views/route-pages/AdminView.vue";
// import axios from 'axios';


// const routes = [
//   {
//     path: '/',
//     name: 'Search',
//     component: Search
//   },
//   {
//     path: "/403",
//     name: '_403',
//     component: _403,
//   },
//   {
//     path: "/search",
//     name: 'SearchResults',
//     component: SearchResults,
//   },
//   {
//     path: '/mazeratti',
//     name: 'Login',
//     component: Login
//   },
//   {
//     path: '/london',
//     name: 'Admin',
//     meta: {auth: true},
//     component: Admin
//   },
//   {
//     path: "/:catchAll(.*)",
//     name: '_404',
//     component: _404,
//   },
  
// ]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })
// router.beforeEach(async (to, from) => {
//   const url = 'https://screeningpartners.net:9999/verify'

//   if(to.name === 'Admin'){
//     const access = await axios.get(url, {withCredentials: true})
//     if(!access?.data?.verified) router.push({name: 'Login'})
//   }
// })
// export default router