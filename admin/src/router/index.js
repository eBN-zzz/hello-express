import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: 'categories/create',
        name: 'CategoryEdit',
        component: () => import('../views/CategoryEdit.vue')
      },
      {
        path: 'categories/edit/:id',
        props: true,
        name: 'CategoryEdit',
        component: () => import('../views/CategoryEdit.vue')
      },
      {
        path: 'categories/list',
        name: 'CategoryList',
        component: () => import('../views/CategoryList.vue')
      },
      {
        path: 'items/create',
        name: 'ItemEdit',
        component: () => import('../views/ItemEdit.vue')
      },
      {
        path: 'items/edit/:id',
        props: true,
        name: 'ItemEdit',
        component: () => import('../views/ItemEdit.vue')
      },
      {
        path: 'items/list',
        name: 'ItemList',
        component: () => import('../views/ItemList.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
