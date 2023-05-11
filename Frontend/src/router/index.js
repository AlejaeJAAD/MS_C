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
import Account from '@/views/Account.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: 
      { 
        title: 'MSTORE - HOME',
        requiresAuth: true
      }
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: {requiresGuest: true}
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {requiresGuest: true}
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
    meta: 
      { 
        title: 'MSTORE - ACCOUNT',
        requiresAuth: true
      }
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
    path: '/employees',
    name: 'employees',
    component: Employee,
    meta: 
      { 
        title: 'MSTORE - EMPLOYEES',
        requiresAuth: true
      }
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
    props: true,
    meta: 
      { 
        title: 'MSTORE - SONG DETAILS',
        requiresAuth: true
      }
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
  const isLoggedIn = store.getters.isUserLoggedIn
  const DEFAULT_TITLE = 'MSTORE';

  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  })

  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next('login')
    } else {
      try {
          store.dispatch('refreshToken');
          next();
      } catch (error) {
        next('login');
      }
    }
  } else if (to.matched.some(route => route.meta.requiresGuest) && isLoggedIn) {
    next('dashboard')
  } else {
      next()
  }
})


export default router
