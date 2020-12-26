// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuelidate from "vuelidate";
import BootstrapVue from "bootstrap-vue";
import BootstrapVueIcons  from "bootstrap-vue";
import BIconArrowUp  from "bootstrap-vue";
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from "./store";
import userMixins from './mixins/user-mixin.js'
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
import {ValidationObserver} from 'vee-validate'
import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules'

extend('required', required)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(BIconArrowUp)
Vue.component('ValidationProvider',ValidationProvider)
Vue.component('ValidationObserver',ValidationObserver)
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


Vue.use(BootstrapVue);
Vue.config.productionTip = false
Vue.use(Vuelidate)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  mixins: [userMixins],
  components: {App},
  template: '<App/>'
})
