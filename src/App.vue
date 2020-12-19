<template>
  <div id="app">
    <Header />

<router-view/>
    <Footer/>
  </div>

</template>

<script>
  import Vue from 'vue';
  import Header from "./components/Global/Header";
  import Footer from "./components/Global/Footer";

export default {
  name: 'App',
  data() {
    return {

    }
  },
  mounted() {
    this.storeUser();
  },
  methods: {

  },
  components:{Header,
    Footer
  }
}
</script>

<style>
#app {
font-family: "Droid Sans";
}
</style>
