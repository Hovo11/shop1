<template>
<div>
  <labael for="code"> Please check your email and verify </labael>
  <input name="code" id="code" type="text" v-model="code">
  <button @click="send()">Send</button>

</div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return{
      code:''
    }
  },
name: "EmailVerify",
  methods:{
    send(){
      axios.post('http://127.0.0.1:8000/api/auth/checkEmailCode', {
        code:this.code,
      }).then(res => {
        console.log(res.data)
        this.$router.push("/login")

      }).catch(err => {
        console.log(err.response.data)
      })
    }
  }
}

</script>

<style scoped>

</style>
