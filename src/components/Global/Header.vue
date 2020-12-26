<template>
  <div class="header-container">

    <nav class="navbar navbar-expand-lg navbar-dark primary-color">

      <!-- Navbar brand -->
      <a class="navbar-brand" href="#">Navbar</a>

      <!-- Collapse button -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
              aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Collapsible content -->
      <div class="collapse navbar-collapse" id="basicExampleNav">

        <!-- Links -->
        <ul class="navbar-nav mr-auto">
          <li class="nav-item ">
            <router-link class="nav-link" to="/user/cars">Shop </router-link>

          </li>
          <li v-if="user!=null &&user.role==='admin'" class="nav-item">
            <router-link class="nav-link" to="/admin/users">AllUsers</router-link>
          </li>

          <li  v-if="!user&&user===null" class="nav-item">
            <router-link class="nav-link" to="/signup">Register</router-link>
          </li>
<!--          <li >-->
<!--            <router-link class="nav-link" to="/" >Logout</router-link>-->
<!--&lt;!&ndash;           <button class="bg-transparent border-0" @click="logout()">Logout</button>&ndash;&gt;-->
<!--          </li>-->

          <li v-if="user!=null &&user.type==='seller'" class="nav-item">
            <router-link class="nav-link" to="/user/myCars">MyCars</router-link>
          </li>

<!--        <li v-if="user!=null &&user.type==='customer'" class="nav-item dropdown cursor">-->
<!--          <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"-->
<!--             aria-haspopup="true" aria-expanded="false">Customer Options</a>-->
<!--          <div class="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">-->
<!--            <router-link class="dropdown-item" to="/user/cars">Cars</router-link>-->
<!--          </div>-->
<!--        </li>-->
          <li v-if="user!=null &&user.type==='seller'" class="nav-item ">
              <router-link class="nav-link" to="/user/addCars">AddCars</router-link>
          </li>
          <li v-if="user!=null" class="nav-item ">
            <router-link class="nav-link" to="/user/hello">My Profile</router-link>
          </li>
          <li  class="nav-item">
            <router-link v-if="user===null" class="nav-link" to="/Login">Login</router-link>
            <router-link v-else class="nav-link"  @click.native="logout($event)" to="/Login">Logout</router-link>
          </li>

        </ul>
        <!-- Links -->
      </div>
      <!-- Collapsible content -->

    </nav>

  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "Header",
    mounted() {
       this.storeUser()
      },
    methods:{
      logout($event){
        $event.preventDefault()

        const token = `Bearer ${localStorage.getItem('access_token')}`
        axios.post('http://127.0.0.1:8000/api/auth/logout', null, {
          headers: {
            'Authorization': token
          }
        }).then(res => {
          this.storeUser()
          this.$store.commit('setUser', null)
          localStorage.removeItem("user")
          localStorage.removeItem("access_token")
          localStorage.removeItem("UserInfo")
          localStorage.removeItem("my_info")
          localStorage.removeItem("emailForPass")
          console.log(this.user)
          console.log(localStorage.user)

          this.$router.push('/login')
        })
      }
    }
  }
</script>

<style scoped>
  body{margin: 0}
  .header-container{
    text-align: center;
    width: 100%;


    background-color: #001f3f;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5%;
    box-sizing: border-box;
  }
  .cursor{
    cursor: pointer;
  }
  .links{
    display: flex;
    width: 15%;
    color: black;
    justify-content: space-between;
    align-items: center;
  }
  .link{
    color: black;
  }

</style>
