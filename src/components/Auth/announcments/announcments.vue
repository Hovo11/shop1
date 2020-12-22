<template>
  <div>
    <h1> {{ user.type }}</h1>
    <table class="table">
      <tr>
        <td>id</td>
        <td>Title</td>
        <td>Description</td>
        <td>Salary</td>
        <td>Deadline</td>
        <td>User_id</td>
        <td>To_Do_Id</td>
        <td>Edit</td>
        <td v-if="user.type==='admin'">Delete</td>
        <td>Take</td>



      </tr>

      <tr v-for="(item, index) in announcm" :key="item.id">
        <td><span class="badge">{{ item.id }}</span></td>
        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.title" type="text">
          <span v-else class="badge">{{ item.title }}</span>
        </td>
        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.description" type="text">
          <span v-else class="badge">{{ item.description}}</span></td>

        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.salary" type="text">
          <span v-else class="badge">{{ item.deadline}}</span>
        </td>
        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.user_id" type="text">
          <span v-else  class="badge">{{ item.salary}}</span>
        </td>
        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.deadline" type="text">
          <span v-else class="badge">{{ (item.creator)?item.creator.email:null}}</span>
        </td>
        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.to_do_id" type="text">
          <span v-else class="badge">{{ (item.programmer)?item.programmer.email:null}}</span>
        </td>

        <td>
          <button v-if="active_data.id!==item.id" @click="edit(item.id)" class="btn btn-dark">Edit</button>
          <button v-else @click="save(item.id)" class="btn btn-dark">Save</button>

        </td>
        <td v-if="user.type==='admin'"><span @click="del(item.id)" class="btn btn-danger">Delete</span></td>
        <td v-if="item.to_do_id===user.id"><span @click="decline(item.id)" class="btn btn-primary">Decline</span></td>
        <td v-else-if="item.to_do_id===null"><span @click="take(item.id)" class="btn btn-primary">Take</span></td>
        <td v-else><span class="btn btn-outline-secondary">Take</span></td>

        <td>

        </td>

      </tr>

    </table>

  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "announcments",
  data() {
    return {
      active_data:{
        id:null
      },
      edit_data: {},
      announcm: null,
      programmer: []
    }
  },
  mounted() {
    this.getUsers()
    this.getTodo()
    this.storeUser()
  },
  methods:{
    getTodo(){
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/announcment/getToDo', null,
        {
          headers: {
            'Authorization': token
          }
        }).then(res => {
        console.log(res.data)
      }).catch(err=>{
        console.log(err)
      })
    },
    take(id){
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/announcment/take', {
          product: id
        },
        {
          headers: {
            'Authorization': token
          }
        }).then(res => {
        console.log(res.data)
        // for (let i = 0; i <this.announcm.length ; i++) {
        //   if(this.announcm[i].id===id){
        //     this.announcm[i].to_do_id=res.data
        //   }
        // }
        this.getUsers()
      }).catch(err=>{
        console.log(err)
      })

},
    decline(id){
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/announcment/decline', {
          decline: id
        },
        {
          headers: {
            'Authorization': token
          }
        }).then(res => {
        // for (let i = 0; i <this.announcm.length ; i++) {
        //   if(this.announcm[i].id===id){
        //     this.announcm[i].to_do_id=null
        //   }
        // }
        this.getUsers()
      }).catch(err=>{
        console.log(err)
      })
    },
    getUsers() {
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/announcment/get', null, {
        headers: {
          'Authorization': token
        }
      }).then(res => {
        this.announcm=res.data
        for (let i = 0; i < this.announcm.length ; i++) {
           if(this.announcm[i].creator){
             this.programmer.push(this.announcm[i].creator)
           }
        }
        console.log(res.data)
        console.log(this.programmer)
      })
    },
    save(id){
      this.active_data.id=null;

      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/announcment/save',
        {
          data: this.edit_data,
          user_id: id
        },
  {
          headers: {
            'Authorization': token
          }
      }).then(res => {
        console.log(res.data)
        this.announcm.forEach((announcment)=> {
          if (announcment.id === res.data.id) {
            announcment = res.data
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
      this.edit_data = this.announcm.find(ann => ann.id  === id)
      console.log(id, this.announcm, this.edit_data)
    },
    del(id){
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/announcment/delete', {
        user_id: id
       },
        {
        headers: {
          'Authorization': token
        }
      }).then(res => {
        console.log(res.data)
        this.announcm = this.announcm.filter((ann) => ann.id !== res.data)
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
</style>
