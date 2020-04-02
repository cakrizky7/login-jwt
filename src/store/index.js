import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    host: 'http://localhost:8080',
    _:'',
  },
  mutations: {
    throw(state, value){
      state._=value
    }
  },
  actions: {
  },
  modules: {
  }
})
