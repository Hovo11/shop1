

      <template>

        <div >
          <h3>Fresh --seed ic heto</h3>
          <h3>Miak adminna</h3>
          <h3>Login:Hovo111196@gmail.com</h3>
          <h3>Password: asdfghjkl</h3>
          <div class="container">
            <div class="row">
              <div class="col-sm-8 offset-sm-2">
                <div>
                  <form @submit.prevent="handleSubmit">

                    <div class="form-group">
                      <label for="email">Email</label>
                      <input type="email" v-model="login_user.email" id="email" name="email" class="form-control" :class="{ 'is-invalid': submitted && $v.login_user.email.$error }" />
                      <span class="danger" v-if="errors.email">Email doesn't exist</span>
                      <div v-if="submitted && $v.login_user.email.$error" class="invalid-feedback">
                        <span v-if="!$v.user.login_user.required">Email is required</span>
                        <span v-if="!$v.user.login_user.email">Email is invalid</span>


                      </div>
                      <span v-if="erorrs_laravel.unauthorized" style="color: red">Invalid email or password</span>
                    </div>
                    <div class="form-group">
                      <label for="password">Password</label>
                      <input type="password" v-model="login_user.password" id="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && $v.login_user.password.$error }" />
                      <span v-if="errors.password">Wrong Password </span>
                      <div v-if="submitted && $v.login_user.password.$error" class="invalid-feedback">
                        <span v-if="!$v.login_user.password.required">Password is required</span>
                        <span v-if="!$v.login_user.password.minLength">Password must be at least 6 characters</span>

                      </div>
                    </div>

                    <div class="form-group">
                      <button class="btn btn-primary">Login</button>
                      <router-link class="nav-link" to="/forgotPassword">Forgot Password</router-link>
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
            login_user: {

              email: "",
              password: "",
            },
            submitted: false
          };
        },
        validations: {
          login_user: {
            email: { required, email },
            password: { required, minLength: minLength(6) },
          }
        },
        beforeMount() {
          this.user=null
          },
        methods: {

          getUser() {
            let allUsers = localStorage.getItem('auth_users') || [];
            allUsers = JSON.parse(allUsers)
            return allUsers
          },

          checkUser() {
            axios.post('http://127.0.0.1:8000/api/auth/login',this.login_user).then(res=>{
              localStorage.setItem('access_token',res.data.access_token);
              this.storeUser()
             this.$router.push('/user/hello')
            }).catch(err=>{
              this.erorrs_laravel.unauthorized=err.response.data.error
              localStorage.setItem('emailForPass',this.login_user.email);
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

