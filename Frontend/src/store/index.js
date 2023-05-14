import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import session from './modules/session'
import employees from './modules/employees'
import tracks from './modules/tracks'

Vue.use(Vuex)

const persistedStateConfig = {
  key: 'MS_C_JAAD',
  storage: window.localStorage,
  paths: ['session.user', 'session.isUserLoggedIn', 'session.isCustomer', 'session.isEmployee', 'employees', 'tracks']
}

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    session,
    employees,
    tracks
  },
  plugins: [createPersistedState(persistedStateConfig)]
})
