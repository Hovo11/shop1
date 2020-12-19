

      <template>
        <div >
          <div class="container">
            <div class="row">
              <div class="col-sm-8 offset-sm-2">
                <div>
                  <form @submit.prevent="handleSubmit">

                    <div class="form-group">
                      <label for="email">Email</label>
                      <input type="email" v-model="user.email" id="email" name="email" class="form-control" :class="{ 'is-invalid': submitted && $v.user.email.$error }" />
                      <span class="danger" v-if="errors.email">Email doesn't exist</span>
                      <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                        <span v-if="!$v.user.email.required">Email is required</span>
                        <span v-if="!$v.user.email.email">Email is invalid</span>


                      </div>
                      <span v-if="erorrs_laravel.unauthorized">Email doesn't exist</span>
                    </div>
                    <div class="form-group">
                      <label for="password">Password</label>
                      <input type="password" v-model="user.password" id="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && $v.user.password.$error }" />
                      <span v-if="errors.password">Wrong Password </span>
                      <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
                        <span v-if="!$v.user.password.required">Password is required</span>
                        <span v-if="!$v.user.password.minLength">Password must be at least 6 characters</span>

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
      import { required, email, minLength } from "vuelidate/lib/validators";
      import axios from "axios";

      export default {
        name: "app",
        data() {
          return {
            erorrs_laravel:{
              unauthorized:null
            },
            errors:{
              email: "",
              password: "",
            },
            user: {

              email: "",
              password: "",
            },
            submitted: false
          };
        },
        validations: {
          user: {
            email: { required, email },
            password: { required, minLength: minLength(6) },
          }
        },
        methods: {

          getUser() {
            let allUsers = localStorage.getItem('auth_users') || [];
            allUsers = JSON.parse(allUsers)
            return allUsers
          },

          checkUser() {
            axios.post('http://127.0.0.1:8000/api/auth/login',this.user).then(res=>{
              localStorage.setItem('access_token',res.data.access_token);
              this.storeUser()
              this.$router.push('/user/hello')
            }).catch(err=>{
              this.erorrs_laravel.unauthorized=err.response.data.error
              console.log(this.erorrs_laravel.unauthorized)

            })

          },
          storageUsers(user) {
            let allUsers = JSON.stringify(user);
            localStorage.setItem('current_user', allUsers);
          },
          handleSubmit(e) {
            this.submitted = true;

            // stop here if form is invalid
            this.$v.$touch();
            if (this.$v.$invalid) {
              return;
            }
            this.checkUser()

          }
        }
      };
      </script>

