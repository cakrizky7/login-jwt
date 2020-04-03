import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
// import Cookies from 'js-cookie';
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    host: 'http://localhost:8080',
    _:'',
    username: '',
    token: '',
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ],
  mutations: {
    throw(state, value){
      state._=value
    },
    login_username(state, value){
      state.username = value
    },
    login_token(state, value){
      state.token = value
    },
    logout(state){
      state.username = ''
      state.token = ''
    }
  },
  actions: {
  },
  modules: {
  }
})
