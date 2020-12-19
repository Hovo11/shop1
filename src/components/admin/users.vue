<template>
  <div>
    <h1>Samo</h1>
    <table class="table">
      <tr>
        <td>id</td>
        <td>Name</td>
        <td>Surname</td>
        <td>Email</td>
        <td>age</td>
        <td>type</td>
        <td>Edit</td>
        <td>Delete</td>



      </tr>

      <tr v-for="item in users" :key="item">
        <td><span class="badge">{{ item.id }}</span></td>
        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.name" type="text">
          <span v-else class="badge">{{ item.name }}</span>
        </td>
        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.surname" type="text">
          <span v-else class="badge">{{ item.surname}}</span></td>

        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.email" type="text">
          <span v-else class="badge">{{ item.email}}</span>
        </td>
        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.age" type="text">
          <span v-else  class="badge">{{ item.age}}</span>
        </td>
        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.type" type="text">
          <span v-else class="badge">{{ item.type}}</span>
        </td>
        <td>
          <button v-if="active_data.id!==item.id" @click="edit(item.id)" class="btn btn-dark">Edit</button>
          <button v-else @click="save(item.id)" class="btn btn-dark">Save</button>

        </td>
        <td><span @click="del(item.id)" class="btn btn-danger">Delete</span></td>

        <td>

        </td>

      </tr>

    </table>

  </div>
</template>

<script>
import axios from "axios";
export default {
name: "users",
  data() {
    return {

      active_data:{
        id:null
      },
      edit_data: {},
      users: null
    }
  },
  mounted() {
    this.getUsers()
  },
  methods:{
  getUsers() {
    const token = `Bearer ${localStorage.getItem('access_token')}`
    axios.post('http://127.0.0.1:8000/api/admin/users/', null, {
      headers: {
        'Authorization': token
      }
    }).then(res => {
     this.users=res.data

    })

  },
    save(id){
      this.active_data.id=null
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/admin/users/save'+id, this.edit_data, {
        headers: {
          'Authorization': token
        }
      }).then(res => {
        console.log(res.data)
        this.users.forEach((user)=> {
          if (user.id === res.data.id) {
            user = res.data

          }
        });

      }).catch(err=>{

      })
    },
  edit(id){
    // const token = `Bearer ${localStorage.getItem('access_token')}`
    // axios.post('http://127.0.0.1:8000/api/admin/users/edit'+id, null, {
    //   headers: {
    //     'Authorization': token
    //   }
    // }).then(res => {
    //   this.active_data.id=id
    //   this.edit_data=res.data
    //
    // }).catch(err=>{
    //   console.log(err)
    // })
    this.active_data.id=id
    this.users.forEach((user)=> {
      if (user.id === id) {
        this.edit_data=user
      }
    })

  },
    del(id){
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/admin/users/delete'+id, null, {
        headers: {
          'Authorization': token
        }
      }).then(res => {
        console.log(res.data)
        this.users = this.users.filter((user) => user.id !== res.data)
      }).catch(err=>{
        console.log(err)

      })

  }
}
}
</script>

<style scoped>

</style>
