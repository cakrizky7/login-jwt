import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import store from '../store'

Vue.use(VueRouter)

var isAuthenticated = store.state.token;
console.log("isAuthenticated : ",isAuthenticated)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated) {next('/login')}
      else {next()}
    }
  },
  {
    path: '/',
    name: 'HomeDefault',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated) {next('/login')}
      else {next()}
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
