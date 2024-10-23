import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import cart from './modules/cart'

Vue.use(Vuex)
Vue.config.devtools = true

export default new Vuex.Store({
  state: {
  },
  getters: {
    token (store) {
      return store.user.userInfo.token
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    cart
  }
})
