<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 offset-sm-2">
          <ValidationObserver v-slot="{handleSubmit}">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <ValidationProvider name="name" rules="required"  v-slot="{errors}">
                <div class="form-group ">
                  <label for="model">Model</label>
                  <input id="model" type="text" class="form-control" v-bind:class="{ 'is-invalid': errors[0] }"  v-model="formData.model">
                  <small  class="text-danger">
                    {{ errors[0] }}
                  </small>
                </div>
              </ValidationProvider>
              <ValidationProvider >
                <div class="form-group">
                  <label for="file">Image</label>
                  <img v-if="image" :src="image" class="img-responsive" height="70" width="90">
                  <input id="file" type="file" v-on:change="onImageChange" class="form-control">
                </div>
              </ValidationProvider>
              <ValidationProvider name="name" rules="required"  v-slot="{errors}">
                <div class="form-group ">
                  <label for="name">name</label>
                  <input id="name" type="text" class="form-control" v-bind:class="{ 'is-invalid': errors[0] }"  v-model="formData.name">
                  <small  class="text-danger">
                    {{ errors[0] }}
                  </small>
                </div>
              </ValidationProvider>
              <ValidationProvider name="partNumber" rules="required|numeric"  v-slot="{errors}">
                <div class="form-group ">
                  <label for="partNumber">partNumber</label>
                  <input id="partNumber" type="text" class="form-control" v-bind:class="{ 'is-invalid': errors[0] }"  v-model="formData.partNumber">
                  <small  class="text-danger">
                    {{ errors[0] }}
                  </small>
                </div>
              </ValidationProvider>
              <!--              <div class="form-group">-->
              <!--                <label for="file">Image</label>-->
              <!--                <input id="file" type="file"  multiple v-on:change="onFileChange" ref="fileInput" :class="{ 'is-invalid': submitted && $v.new_user.image.$error }" />-->
              <!--                <div v-if="submitted && $v.new_user.image.$error" class="invalid-feedback">-->
              <!--                  <span v-if="!$v.new_user.email.image">Email is required</span>-->
              <!--                </div>-->
              <!--              </div>-->

              <div class="form-group">
              </div>
              <input type="submit" class="btn btn-primary" value="Submit">
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "addCars",
  data(){
    return{
      formData: {
        model: "",
        make: "",
        year: "",
        partNumber:"",
        name:"",
        images: "",
      },
      image: null
    }
  },
  computed:{

  },

  mounted() {
    this.storeUser();
  },

  methods:{


    onImageChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      let reader = new FileReader();
      let vm = this;
      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },




    getUser() {
      let User = localStorage.getItem('current_user') || [];
      User = JSON.parse(User)
      return User
    },
    getTime(){
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      return dateTime
    },
    onSubmit(e){
      this.formData.images=this.image
      this.formData.year=this.getTime()
      this.formData.make=this.user.name
      console.log(this.formData)
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/car/add', this.formData, {
        headers: {
          'Authorization': token
        }
      }).then(res => {
        this.$router.push('/user/cars')
        console.log(res.data)

      })

    }
  },

}
</script>

<style scoped>

</style>
