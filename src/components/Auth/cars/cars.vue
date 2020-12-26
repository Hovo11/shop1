<template>
  <div>
    <div class="search-wrapper">
      <input type="text" v-model="filter_data.name" placeholder="Search by name.." class="input-wrapper"/>
      <label>Search by name:</label>
    </div>
    <table class="table">
      <tr>
        <td>id</td>
        <td>Name</td>
        <td>Model</td>
        <td>Make</td>
        <td>Year</td>
        <td>Creator Email</td>
        <td>Ordered</td>
        <td style="text-align: center"colspan="4">action</td>

      </tr>

      <tr v-for="(item, index) in filteredList" :key="item.id" v-if="item.owner.isActive">
        <td><span class="badge">{{ item.id }}</span></td>
        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.name" type="text">
          <span v-else class="badge">{{ item.name }}</span>
        </td>
        <td>
          <img :src="`${item.images}`" height="90" width="90" />
        </td>
        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.model" type="text">
          <span v-else class="badge">{{ item.model}}</span></td>

        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.make" type="text">
          <span v-else class="badge">{{ item.make}}</span>
        </td>
        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.year" type="text">
          <span v-else  class="badge">{{ item.year}}</span>
        </td>
        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.ownerEmail" type="text">
          <span v-else class="badge">{{ (item.owner)?item.owner.email:null}}</span>
        </td>
        <td>
          <input v-if="active_data.id===item.id" v-model="edit_data.customerEmail" type="text">
          <span v-else class="badge">{{ (item.customer)?item.customer.email:null}}</span>
        </td>

<!--        <td v-if="user && item.owner.id===item.user_id&& user.type==='seller'">-->
        <td v-if="user &&  user.role==='admin'">
          <button v-if="active_data.id!==item.id" @click="edit(item.id)" class="btn btn-info">Edit</button>
          <button v-else @click="save(item.id)" class="btn btn-info">Save</button>
        </td>
        <td v-if="user&& user.role==='admin'"><span @click="del(item.id)" class="btn btn-danger">Delete</span></td>
        <td v-if="user&& user.type==='customer'&&item.to_do_id===user.id"><span @click="decline(item.id)" class="btn btn-primary">Decline</span></td>
        <td v-else-if="user&& user.type==='customer'&& item.to_do_id===null"><span @click="take(item.id)" class="btn btn-primary">Take</span></td>


        <td>

        </td>

      </tr>

    </table>

  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "cars",
  data() {
    return {
      filter_data:{
        name:""
      },
      active_data:{
        id:null
      },
      edit_data: {},
      cars: null,

    }
  },
  computed:{
    filteredList() {
      if (this.filter_data.name!==''){
        return this.cars.filter(post => {
          return post.name.toLowerCase().includes(this.filter_data.name.toLowerCase())

        })
      }
      else return this.cars
    }
  },
  mounted() {
    this.getCars()

    this.storeUser()
  },
  methods:{

    take(id){
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/car/take', {
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
        this.getCars()
      }).catch(err=>{
        console.log(err)
      })

},
    decline(id){
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/car/decline', {
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
        this.getCars()
      }).catch(err=>{
        console.log(err)
      })
    },
    getCars() {
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/car/get').then(res => {
        this.cars=res.data
        // for (let i = 0; i < this.announcm.length ; i++) {
        //    if(this.announcm[i].owner){
        //      this.programmer.push(this.announcm[i].owner)
        //    }
        // }
        console.log(res.data)
      })
    },
    save(id){
      this.active_data.id=null;

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
      this.edit_data = this.cars.find(ann => ann.id  === id)
      console.log(id, this.cars, this.edit_data)
    },
    del(id){
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/car/delete', {
        user_id: id
       },
        {
        headers: {
          'Authorization': token
        }
      }).then(res => {
        console.log(res.data)
        this.cars = this.cars.filter((ann) => ann.id !== res.data)
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.search-wrapper .input-wrapper {
 border: 2px solid #001f3f;
  border-radius: 10px ;
  width: 400px;
  height: 30px;
  outline: none;

}
.search-wrapper {
  text-align: center;
  margin-top: 10px;
}

</style>
