<template>
  <div>
    <div class="search-wrapper">
      <input type="text" v-model="filter_data.name" placeholder="Search by name.." class="input-wrapper"/>
      <label>Search by name:</label>
    </div>
  <div>
    <h1> {{ user.name }}</h1>
    <table class="table">
      <tr>
        <td>Name</td>
        <td>Image</td>
        <td>Model</td>
        <td>Make</td>
        <td>Year</td>
        <td>Part Number</td>
        <td>Edit</td>
      </tr>

      <tr v-for="item in filteredList" :key="item">
        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.name" type="text">
          <span v-else class="badge">{{ item.name }} </span>
        </td>
        <td>
          <img :src="`${item.images}`" height="90" width="90" />
        </td>
        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.model" type="text">
          <span  class="badge">{{ item.model}}</span></td>

        <td>
          <span  class="badge">{{ item.make}}</span>
        </td>
        <td>
          <span   class="badge">{{ item.year}}</span>
        </td>
        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.partNumber" type="text">
          <span v-else  class="badge">{{ item.partNumber}}</span>
        </td>
        <td >
          <button v-if="active_data.id!==item.id" @click="edit(item.id)" class="btn btn-dark">Edit</button>
          <button v-else @click="save(item.id)" class="btn btn-dark">Save</button>
        </td>
      </tr>

    </table>

  </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "myCars",
  data(){
    return{
      myCars:[],
      filter_data: {
        name:'',
      },
      active_data:{
        id:null
      },
      edit_data: {},
    }
  },
  computed:{


      filteredList() {
        if (this.filter_data.name!==''){
          return this.myCars.filter(post => {
            return post.name.toLowerCase().includes(this.filter_data.name.toLowerCase())
          })
        }
        else return this.myCars
      }
  },
  mounted() {
    this.getMyCars()
  },
  methods:{
    edit(id){
      this.active_data.id=id
      this.edit_data = this.myCars.find(ann => ann.id  === id)
      console.log(id, this.myCars, this.edit_data)
    },
    save(id){
      this.active_data.id=null;
      console.log(id)
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/car/save',
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
        this.cars.forEach((car)=> {
          if (car.id === res.data.id) {
            car = res.data
          }
        });
      }).catch(err=>{
      })
    },
    getMyCars(){
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/user/getMyCars', null, {
        headers: {
          'Authorization': token
        }
      }).then(res => {
        this.myCars=res.data
        console.log(res.data)
      })
    }
  }
}
</script>

<style scoped>
.filters{
  width: 300px;
}
.search-wrapper {
  text-align: center;
  margin-top: 10px;
}
</style>
