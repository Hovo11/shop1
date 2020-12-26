import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    userInfo: null
  },
  mutations: {
    setUser(state,user){
      state.user = user;
    },
    setUserInfo(state,userInfo){
      state.userInfo = userInfo;
    }

  },
  getters:{
   user:(state) => {
     return state.user
   },
    userInfo:(state => {
     return state.userInfo
    })

  }
})

export default store
