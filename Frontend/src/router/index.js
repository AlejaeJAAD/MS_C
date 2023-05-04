import Vue from 'vue'
import VueRouter from 'vue-router'
import Signup from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ConfirmForgotPassword from '../views/ConfirmForgotPassword.vue'
import Home from '../views/Home.vue'
import Element from '../components/Element.vue'
import Employee from '../components/Employee.vue'
import Track from '../components/Track.vue'
import SongDetails from '@/views/SongDetails.vue'
import Dashboard from '@/views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {requiresGuest: true}
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword,
  },
  {
    path: '/confirm-forgot-password/:token',
    name: 'confirm-forgot-password',
    component: ConfirmForgotPassword,
  },
  {
    path: '/element',
    name: 'element',
    component: Element
  },
  {
    path: '/employees',
    name: 'employees',
    component: Employee
  },
  {
    path: '/tracks',
    name: 'tracks',
    component: Track,
    meta: 
      { 
        title: 'MSTORE - TRACKS',
        requiresAuth: true
      }
  },
  {
    path: '/tracks/:id',
    name: 'song-details',
    component: SongDetails,
    props: true
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: 
      { 
        title: 'MSTORE - DASHBOARD',
        requiresAuth: true
      }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = window.localStorage.getItem('isUserLoggedIn') === 'true'
  const DEFAULT_TITLE = 'MSTORE';

  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  })

  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next('login')
    } else {
      next()
    }
  } else if (to.matched.some(route => route.meta.requiresGuest) && isLoggedIn) {
    next('dashboard')
  } else {
    next()
  }
})


export default router
