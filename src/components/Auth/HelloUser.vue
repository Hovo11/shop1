<template>
  <div>
    <h1>Welcome Dear {{user.name}} </h1>
    <h1>Welcome Dear {{user.email}} </h1>

  </div>
</template>

<script>
import axios from 'axios'
    export default {
        name: "HelloUser",
      data(){
        return{

        }
      },
      computed:{

      },

      mounted() {

      },

      methods:{
        getUser() {
          let User = localStorage.getItem('current_user') || [];
          User = JSON.parse(User)
          return User
        },
         async showJoke(){
         let this_id=1
         await  axios
             .post('http://127.0.0.1:8000/api/auth/miban/'+this_id)
             .then(response => (this.joke = response));
                console.log(this.joke.data)
         }

      },

    }
</script>

<style scoped>

</style>
