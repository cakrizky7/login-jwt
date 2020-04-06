import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import store from '../store'

Vue.use(VueRouter)

var isAuthenticated = store.state.token;
if(isAuthenticated==''){
  isAuthenticated=false
}else{
  isAuthenticated=true
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated) {next('/home')}
      else {
        console.log(to)
        if(from.path=='/'){
          next()
        } else {
          next('/login')
        }
      }
    }
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
