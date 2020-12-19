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
          <li class="nav-item active">
            <a class="nav-link" href="#">Home
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/signup">Register</router-link>
          </li>
          <li>
            <router-link class="nav-link" to="/signup" @click="logout($event)">Logout</router-link>
<!--           <button class="bg-transparent border-0" @click="logout()">Logout</button>-->
          </li>
          <!-- Dropdown -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">Dropdown</a>
            <div class="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>


        </ul>
        <!-- Links -->

        <form class="form-inline">
          <div class="md-form my-0">
            <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
          </div>
        </form>
      </div>
      <!-- Collapsible content -->

    </nav>

  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "Header",
    methods:{
      logout($event){
        $event.preventDefault()
        const token = `Bearer ${localStorage.getItem('access_token')}`
        axios.post('http://127.0.0.1:8000/api/auth/logout', null, {
          headers: {
            'Authorization': token
          }
        }).then(res => {
          localStorage.removeItem("user")
          localStorage.removeItem("access_token")
          this.$store.commit('setUser', null)
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


    background-color: #1e95f5;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5%;
    box-sizing: border-box;
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
