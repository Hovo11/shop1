<template>
  <div class="container d-flex justify-content-center wh p-3">
    <div class="card text-white bg-dark mb-3 ">
      <div class="card-header text-center">Profile</div>
      <div class="container">
        <h4 class="card-title">Name: {{user.name}}</h4>
        <h4 class="card-title"> Email: {{user.email}}</h4>
        <h4 class="card-title">Age: {{user.age}}</h4>
        <p class="card-text">Role: {{user.role}}</p>
        <p class="card-text">Type: {{user.type}}</p>
      </div>
    </div>

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
    this.storeUser();
    let type= JSON.parse(localStorage.getItem('user'))
    console.log(type.role)

  },

  methods:{


}}
</script>

<style scoped>
body{padding-top:30px;}

.glyphicon {  margin-bottom: 10px;margin-right: 10px;}
.wh{
  width:50% ;
  height:50% ;
}
small {
  display: block;
  line-height: 1.428571429;
  color: #999;
}
</style>
