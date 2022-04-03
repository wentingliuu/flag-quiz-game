import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main.vue'
import Entry from '../views/Entry.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'entry',
    component: Entry
  },
  {
    path: '/level',
    name: 'level',
    component: () => import('../views/Level.vue')
  },
  {
    path: '/flag/:id',
    name: 'main',
    component: Main
  },
  {
    path: '*',
    name: 'not-found',
    redirect: '/'
  }
]

const router = new Router({
  routes
})

export default router