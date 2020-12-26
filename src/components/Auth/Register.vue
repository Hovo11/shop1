<template>
  <div class="jumbotron">
    <div class="container m-auto" >
      <div class="row">
        <div class="col-sm-8 offset-sm-2">
          <ValidationObserver v-slot="{handleSubmit}" class="m-auto">
            <form @submit.prevent="handleSubmit(onSubmit) " enctype="multipart/form-data">
              <ValidationProvider name="name" rules="required" v-slot="{errors}">
                <div class="form-group ">
                  <label for="name" class="text-center-css">Name</label>
                  <input id="name" type="text" class="form-control " v-bind:class="{ 'is-invalid': errors[0] }"
                         v-model="formData.name">
                  <small class="text-danger">
                    {{ errors[0] }}
                  </small>
                </div>
              </ValidationProvider>
              <ValidationProvider name="surname" rules="required" v-slot="{errors}">
                <div class="form-group ">
                  <label for="surname" class="text-center-css">Surname</label>
                  <input id="surname" type="text" class="form-control " v-bind:class="{ 'is-invalid': errors[0] }"
                         v-model="formData.surname">
                  <small class="text-danger">
                    {{ errors[0] }}
                  </small>
                </div>
              </ValidationProvider>
              <ValidationProvider name="email" rules="required|email" v-slot="{errors}">
                <div class="form-group ">
                  <label for="email" class="text-center-css">Email</label>
                  <input id="email" type="text" class="form-control " v-bind:class="{ 'is-invalid': errors[0] }"
                         v-model="formData.email">
                  <small class="text-danger">
                    {{ errors[0] }}
                  </small>
                </div>
              </ValidationProvider>
              <ValidationProvider name="address" rules="required" v-slot="{errors}">
                <div class="form-group ">
                  <label for="address" class="text-center-css">address</label>
                  <input id="address" type="text" class="form-control " v-bind:class="{ 'is-invalid': errors[0] }"
                         v-model="formData.address">
                  <small class="text-danger">
                    {{ errors[0] }}
                  </small>
                </div>
              </ValidationProvider>
              <ValidationProvider name="phone" rules="required|numeric|min:6" v-slot="{errors}">
                <div class="form-group ">
                  <label for="phone" class="text-center-css">Phone</label>
                  <input id="phone" type="text" class="form-control " v-bind:class="{ 'is-invalid': errors[0] }"
                         v-model="formData.phone">
                  <small class="text-danger">
                    {{ errors[0] }}
                  </small>
                </div>
              </ValidationProvider>
              <ValidationProvider name="type" rules="required" v-slot="{errors}">
                <div class="form-group d-flex justify-content-center ">
                  <div class="mr-4">
                    <input type="radio" id="seller" name="type" value="seller" v-model="formData.type">
                    <label for="seller">Seller</label><br>
                  </div>

                  <div class="ml-4">
                    <input type="radio" id="customer" name="type" value="customer" v-model="formData.type">
                    <label for="customer">Customer</label><br>
                  </div>

                  <small class="text-danger">
                    {{ errors[0] }}
                  </small>
                </div>
              </ValidationProvider>
              <ValidatonProvider>
                <div class="form-group">
                  <label for="file" >Image</label>
                  <img v-if="image" :src="image" class="img-responsive" height="70" width="90">
                  <input id="file" type="file" v-on:change="onImageChange" class="form-control-file ">
                </div>
              </ValidatonProvider>
              <ValidationProvider name="password" rules="required|min:8" v-slot="{errors}">
                <div class="form-group ">
                  <label for="password" class="text-center-css">Password</label>
                  <input id="password" type="password" class="form-control " v-bind:class="{ 'is-invalid': errors[0] }"
                         v-model="formData.password">
                  <small class="text-danger">
                    {{ errors[0] }}
                  </small>
                </div>
              </ValidationProvider>
              <ValidationProvider name="confirm" rules="required|confirmed:password" v-slot="{errors}">
                <div class="form-group ">
                  <label for="confirmPassword" class="text-center-css">Confirm Password</label>
                  <input id="confirmPassword" type="password" class="form-control "
                         v-bind:class="{ 'is-invalid': errors[0] }" v-model="formData.confirmPassword">
                  <small class="text-danger">
                    {{ errors[0] }}
                  </small>
                </div>
              </ValidationProvider>
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
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      formData: {
        name: "",
        surname: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        image: "",
        type: "",
        confirmPassword: ""

      },
      image: null
    };
  },

  methods: {
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
    onSubmit() {
      this.signup()
    },
    async   signup() {
      this.formData.image = this.image
      axios.post('http://127.0.0.1:8000/api/auth/signUp', this.formData).then(res => {
        console.log(res.data)

        // this.$router.push("/login")
         this.$router.push("/emailVerify")
      }).catch(err => {
        console.log(err.response.data)
      })
    }
  }
}

</script>
<style scoped>
body{margin: 0}
.custom-file-input {
  content: 'Select some files';
  display: inline-block;
  background: linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
}
.text-center-css {
  display: flex;
  justify-content: center;
}

</style>
