<template>
  <div>
    <div class="search-wrapper">
      <input type="text" v-model="filter_data.name" placeholder="Search by name.." class="input-wrapper"/>
      <label>Search by name:</label>
    </div>
    <table class="table table-primary">
      <tr>
        <td>id</td>
        <td>Name</td>
        <td>Surname</td>
        <td>Email</td>
        <td>type</td>
        <td>isActive</td>
       <td style="text-align: center"colspan="3">action</td>
      </tr>

      <tr v-for="item in filteredList" :key="item">
        <td><span class="badge alert-primary">{{ item.id }}</span></td>
        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.name" type="text">
          <span v-else class="badge table-primary " >{{ item.name }}</span>
        </td>
        <td>
          <img :src="`${item.image}`" height="90" width="90" />
        </td>
        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.surname" type="text">
          <span v-else class="badge table-primary">{{ item.surname}}</span></td>

        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.email" type="text">
          <span v-else class="badge page-link cursor "  @click=" item.type ==='seller'? curUserProfile(item.id):''">{{ item.email}}</span>
        </td>
        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.phone" type="text">
          <span v-else  class="badge table-primary ">{{ item.phone}}</span>
        </td>
        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.type" type="text">
          <span v-else class="badge table-primary">{{ item.type}}</span>
        </td>
        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.isActive" type="text">
          <span v-else class="badge table-primary">{{item.isActive}}</span>
        </td>
        <td>
          <button v-if="active_data.id!==item.id" @click="edit(item.id)" class="btn btn-primary">Edit</button>
          <button v-else @click="save(item.id)" class="btn btn-primary">Save</button>

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
  computed:{
    filteredList() {
      if (this.filter_data.name!==''){
        return this.users.filter(post => {
          return post.name.toLowerCase().includes(this.filter_data.name.toLowerCase())

        })
      }
      else return this.users
    }
  },
name: "users",
  data() {
    return {
      filter_data:{
        name:""
      },
      active_data:{
        id:null
      },
      edit_data: {},
      users: null
    }
  },
  mounted() {
    this.getUsers()
    this.$store.commit('setUserInfo', null)
    localStorage.removeItem("UserInfo")
  },
  methods:{
    curUserProfile(id){

     this.getCurUserInfo(id)
      this.$router.push('/admin/userInfo')
      console.log(this.userInfo)
    },
  getUsers() {
    const token = `Bearer ${localStorage.getItem('access_token')}`
    axios.post('http://127.0.0.1:8000/api/admin/users/', null, {
      headers: {
        'Authorization': token
      }
    }).then(res => {
     this.users=res.data
      console.log( this.users)

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
          // stipvac em getUser() noric kanchum vorovhetyev isActive true poxuma, bayc false f5 sexmelov
        this.users.forEach((user)=> {
          if (user.id === res.data.id) {
            user = res.data
          }

        }

        );
        // this.getUsers()
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
.cursor{
  cursor: pointer;
}
.search-wrapper {
  text-align: center;
  margin-top: 10px;
}
</style>
