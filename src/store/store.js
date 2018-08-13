import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isLogin: false,
        token: ''
    },
    mutations: {
        changeStatus (state, token) {
            state.isLogin = true;
            state.token = token;
        }
    }
})

export default store;