<template>
  <div>

  <div v-for="val in userInfo[0].created_cars" class="col-sm-3 col-md-3 float-left shadow p-3 border">
    <div class="img-thumbnail text-center">
        <img :src="`${val.images}`" height="90" width="90" />
      <h4 class="border text-info">{{val.model}}</h4>
      <h4 class="border text-success">{{val.name}}</h4>
      <h4 class="border text-danger">{{val.year}}</h4>
      <h4 class="border text-info">{{val.partNumber}}</h4>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "userInfo",
  mounted() {

  }
}
</script>

<style scoped>

</style>
