
<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 offset-sm-2">
          <div>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" v-model="new_user.name" id="firstName" name="firstName" class="form-control" :class="{ 'is-invalid': submitted && $v.new_user.name.$error }" />
                <div v-if="submitted && !$v.new_user.name.required" class="invalid-feedback">First Name is required</div>
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" v-model="new_user.surname" id="lastName" name="lastName" class="form-control" :class="{ 'is-invalid': submitted && $v.new_user.surname.$error }" />
                <div v-if="submitted && !$v.new_user.surname.required" class="invalid-feedback">Last Name is required</div>
              </div>

              <div class="form-group">
                <label for="age">Age</label>
                <input type="text" v-model="new_user.age" id="age" name="age" class="form-control" :class="{ 'is-invalid': submitted && $v.new_user.age.$error }" />
                <div v-if="submitted && !$v.new_user.age.required" class="invalid-feedback">age is required</div>
                <div v-if="submitted && !$v.new_user.age.numeric" class="invalid-feedback">write numbers</div>
              </div>

              <div class="form-group">
                <label for="role" >Role</label>

                <div id="role" class="col-md-6" :class="{ 'is-invalid': submitted && $v.new_user.role.$error }">
                  <input type="radio" id="manager" name="role" value="manager" v-model="new_user.role" >
                  <label for="manager">manager</label><br>
                  <input type="radio" id="developer" name="role" value="programmer"  v-model="new_user.role">
                  <label for="developer">developer</label><br>
                </div>
                <div v-if="submitted && !$v.new_user.role.required" class="invalid-feedback">Role is required</div>
              </div>





              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" v-model="new_user.email" id="email" name="email" class="form-control" :class="{ 'is-invalid': submitted && $v.new_user.email.$error }" />
                <div v-if="submitted && $v.new_user.email.$error" class="invalid-feedback">
                  <span v-if="!$v.new_user.email.required">Email is required</span>
                  <span v-if="!$v.new_user.email.email">Email is invalid</span>
                </div>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" v-model="new_user.password" id="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && $v.new_user.password.$error }" />
                <div v-if="submitted && $v.new_user.password.$error" class="invalid-feedback">
                  <span v-if="!$v.new_user.password.required">Password is required</span>
                  <span v-if="!$v.new_user.password.minLength">Password must be at least 6 characters</span>
                </div>
              </div>
              <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" v-model="new_user.confirmPassword" id="confirmPassword" name="confirmPassword" class="form-control" :class="{ 'is-invalid': submitted && $v.new_user.confirmPassword.$error }" />
                <div v-if="submitted && $v.new_user.confirmPassword.$error" class="invalid-feedback">
                  <span v-if="!$v.new_user.confirmPassword.required">Confirm Password is required</span>
                  <span v-else-if="!$v.new_user.confirmPassword.sameAsPassword">Passwords must match</span>
                </div>
              </div>
              <div class="form-group">
                <button class="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required,numeric, email, minLength, sameAs } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      new_user: {
        name: "",
        surname: "",
        email: "",
        age:"",
        password: "",
        role: "",
        confirmPassword: ""
      },
      submitted: false
    };
  },
  validations: {
    new_user: {
      name: { required },
      surname: { required },
      role: { required },
      email: { required, email },
      age: {required,numeric},
      password: { required, minLength: minLength(6) },
      confirmPassword: { required, sameAsPassword: sameAs('password') }
    }
  },
  methods: {
    handleSubmit(e) {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      console.log(this.new_user)
     this.signup()
    },
    signup() {
      axios.post('http://127.0.0.1:8000/api/auth/signUp',this.new_user).then(res=>{
        console.log(res.data)
        this.$router.push("/login")
      }).catch(err=>{
        console.log(err.response.data)
      })
    }
  }
  }

</script>
