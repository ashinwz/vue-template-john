import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/About',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/SDPK',
    name: 'SDPK',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "demo" */ '../views/SDPKView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
