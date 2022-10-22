import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0801ec00 = () => interopDefault(import('../pages/admin.vue' /* webpackChunkName: "pages/admin" */))
const _0d7007f6 = () => interopDefault(import('../pages/inspect.vue' /* webpackChunkName: "pages/inspect" */))
const _d7914dcc = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _2a6c26c4 = () => interopDefault(import('../pages/pro.vue' /* webpackChunkName: "pages/pro" */))
const _6ae093fa = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _0801ec00,
    name: "admin"
  }, {
    path: "/inspect",
    component: _0d7007f6,
    name: "inspect"
  }, {
    path: "/login",
    component: _d7914dcc,
    name: "login"
  }, {
    path: "/pro",
    component: _2a6c26c4,
    name: "pro"
  }, {
    path: "/",
    component: _6ae093fa,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
