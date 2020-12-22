<template>
  <div>
    <h1>{{ user.type }}</h1>

    <form >
<div class="col-sm-6 offset-sm-4 mt-4" >
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" name="title" class="form-control"  v-model="announcment.title">
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea type="text" name="description" class="form-control" id="description"  v-model="announcment.desc" >   </textarea>
      </div>
      <div class="form-group">
        <label for="date">date</label>
        <input type="date" id="date" name="date" class="form-control"   v-model="announcment.date">
      </div>
      <div class="form-group">
        <label for="salary">salary</label>
        <input type="text" id="salary" name="title" class="form-control"   v-model="announcment.salary">
      </div>
      <button @click="log($event)" name="submit" type="submit" value="sign" class="btn btn-primary">Submit</button>

</div>
    </form>


  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "addAnnouncment",
  data(){
    return{
      announcment: {

      }
    }
  },
  computed:{

  },

  mounted() {
    this.storeUser();
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
    },
    log($event){
      $event.preventDefault()
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/announcment/add', this.announcment, {
        headers: {
          'Authorization': token
        }
      }).then(res => {
        this.$router.push('/user/announcments')
        console.log(res.data)

      })

    }
  },

}
</script>

<style scoped>

</style>
