<template>
  <div>
  <div class="container d-flex justify-content-center wh p-3">
    <div class="card text-white bg-light mb-3 " style="width: 300px">
      <div class="card-header text-center">Profile</div>
      <div class="container">
        <h4 ><img :src="`${sending_info.image}`" height="90" width="110" style="margin-left: 70px" /></h4>
        <hr>
        <input v-if="editable" v-model="current_user.name" type="text">
        <h4 v-else class="card-title color " v-bind:class="{ animation_remove: !editable }" v-model="current_user.name">Name: {{sending_info.name}}     </h4>
        <hr>
        <input v-if="editable" v-model="current_user.email" type="text">
        <h4 v-else class="card-title color " v-bind:class="{ animation_remove: !editable }" v-model="current_user.email"> Email: {{sending_info.email}}</h4>
        <hr>
        <input v-if="editable" v-model="current_user.phone" type="text">
        <h4 v-else class="card-title color " v-bind:class="{ animation_remove: !editable }"  v-model="current_user.phone">Phone: {{sending_info.phone}}</h4>
        <hr>

        <p class="card-text color " v-model="current_user.type">Type: {{sending_info.type}}</p>
        <p class="card-text color"  v-model="current_user.role">Role: {{sending_info.role}}</p>
        <div class="text-center">
          <button v-if="!editable" class="btn btn-primary " @click="edit()">Edit</button>
          <button v-else-if="editable" class="btn btn-primary" @click="save()">Save</button>
        </div>

      </div>
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
      current_user: {},
         editable:false,
      sending_info:{},
      image: null
    }
  },
  computed:{

  },

  mounted() {
this.getme()
  },

  methods:{



    // send(){
    //   const formdata=new FormData();
    //   formdata.set('image',this.image)
    //   const token = `Bearer ${localStorage.getItem('access_token')}`
    //   axios.post('http://127.0.0.1:8000/api/admin/image',formdata, {
    //     headers: {
    //       'Authorization': token
    //     }
    //   }).then(res => {
    //     console.log(res.data)
    //   }).catch(err=>{
    //
    //   })
    // },


  edit(){
   this.editable=true

 },
    getme(){
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/auth/me', null, {
        headers: {
          'Authorization': token
        }
      }).then(res => {
        this.sending_info=res.data
      })
    },
    save(){
      this.editable=false
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/user/save', this.current_user, {
        headers: {
          'Authorization': token
        }
      }).then(res => {
        this.getme()

      }).catch(err=>{

      })
    }

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

.color {
  color: black;
  text-align: center;
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
