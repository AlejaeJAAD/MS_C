import Vue from 'vue'
import Vuex from 'vuex'
import session from './modules/session'
import employees from './modules/employees'
import tracks from './modules/tracks'

Vue.use(Vuex)

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
  }
})
