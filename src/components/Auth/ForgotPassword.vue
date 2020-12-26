<template>
  <div>
<div v-if="!codeSent" class="center">
  <label for="code">Your email:</label>
  <input class="ctr" type="text" v-model="email">
  <button @click="send()">Send</button>

</div>
  <div v-if="codeSent" class="center animation_remove">
    <label for="code">Please Write verification code:</label>
    <input id="code" class="ctr" type="text" v-model="code">
    <button @click="checkCode()">Verify</button>
</div>
  <div v-if="codeVerified">
    <ValidationObserver v-slot="{handleSubmit}" class="m-auto">
      <form @submit.prevent="handleSubmit(onSubmit) ">
    <ValidationProvider name="password" rules="required|min:8" v-slot="{errors}">
      <div class="form-group ">
        <label for="password" class="text-center-css">Password</label>
        <input id="password" type="password" class="form-control " v-bind:class="{ 'is-invalid': errors[0] }"
               v-model="changePassword.password">
        <small class="text-danger">
          {{ errors[0] }}
        </small>
      </div>
    </ValidationProvider>
    <ValidationProvider name="confirm" rules="required|confirmed:password" v-slot="{errors}">
      <div class="form-group ">
        <label for="confirmPassword" class="text-center-css">Confirm Password</label>
        <input id="confirmPassword" type="password" class="form-control "
               v-bind:class="{ 'is-invalid': errors[0] }" v-model="changePassword.confirmPassword">
        <small class="text-danger">
          {{ errors[0] }}
        </small>
      </div>
    </ValidationProvider>
        <input type="submit" class="btn btn-primary" value="Submit">
      </form>
    </ValidationObserver>
  </div>


  </div>

</template>
<script>
import axios from "axios";

export default {
name: "ForgotPassword",
  data(){
  return{
    email:localStorage.getItem('emailForPass')||null,
    code:null,
    sent:false,
    codeSent:false,
    codeVerified:false,
    changePassword:{
      password: "",
      confirmPassword: ""
    }
  }
  },
  methods:{
  send(){
    this.sent=true
    axios.post('http://127.0.0.1:8000/api/auth/forgotPassword', {
      email:this.email
    }).then(res => {
      this.codeSent=res.data

    }).catch(err => {
      console.log(err.response.data)
    })
  },
    checkCode(){
      axios.post('http://127.0.0.1:8000/api/auth/checkCode', {
        code:this.code
      }).then(res => {
        this.codeVerified=res.data

      }).catch(err => {
        console.log(err.response.data)
      })
    },
    onSubmit() {

      axios.post('http://127.0.0.1:8000/api/auth/changePassword',{
        password: this.changePassword
      }).then(res => {
        console.log(res.data)
         this.$router.push("/login")
      }).catch(err => {
        console.log(err.response.data)
      })
    },



  }
}
</script>

<style scoped>
.center {
  margin: auto;
  width: 50%;
  border: 3px solid green;
  padding: 10px;
  display: block;

}
.ctr{
  margin-left: auto;
  margin-right: auto;
}
.animation_remove {
  animation-name: right;
  animation-duration: 2s;
}

@keyframes right {
  from   {opacity: 0; left:400px; top:40px;}
  /*to  {opacity:1;left:800px; top:40px;}*/

}
</style>
