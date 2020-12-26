import Vue from 'vue'
import axios from "axios";

export default Vue.mixin({
  methods: {
    storeUser() {
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/auth/me', null, {
        headers: {
          'Authorization': token
        }
      }).then(res => {
        localStorage.setItem("user", JSON.stringify(res.data))
        this.$store.commit('setUser', res.data)

      })
    },
    getCurUserInfo(id){
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/admin/users/userInfo', {
        user: id
      }, {
        headers: {
          'Authorization': token
        }
      }).then(res => {
        localStorage.setItem("UserInfo", JSON.stringify(res.data))
        this.$store.commit('setUserInfo', res.data)
      })
    }
  }
  ,
  computed: {
    user() {
      return this.$store.getters.user
      //JSON.parse(localStorage.getItem('user'))||
    },
    userInfo(){
      return JSON.parse(localStorage.getItem('UserInfo'))|| this.$store.getters.userInfo
    }
  }

})
