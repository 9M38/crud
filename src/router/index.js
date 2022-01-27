import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/create'
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import(/* webpackChunkName: "about" */ '../views/Create.vue')
  },
  {
    path: '/read',
    name: 'Read',
    component: () => import(/* webpackChunkName: "about" */ '../views/Read.vue')
  },
  {
    path: '/update',
    name: 'Update',
    component: () => import(/* webpackChunkName: "about" */ '../views/Update.vue')
  },
  {
    path: '/delete',
    name: 'Delete',
    component: () => import(/* webpackChunkName: "about" */ '../views/Delete.vue')
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
