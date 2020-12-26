import Vue from 'vue'
import Router from 'vue-router'
import authRoutes from '../components/Auth/auth-routes.js'
//not found
import NotFound from "../components/404/NotFound";
import adminRoutes from '../components/admin/admin-router'
import cars from "../components/Auth/cars/car-routes";

import auth from "../middlewares/auth";
import guest from "../middlewares/guest";
import manager from "../middlewares/manager";
import programmer from "../middlewares/programmer";


Vue.use(Router)

const router= new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    ...cars,
    ...adminRoutes,
    ...authRoutes,
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
});
router.beforeEach((to, from, next) => {
  if(to.meta.middleware){
    if (to.meta.middleware.includes('auth')){
      auth({next,router})
    }
    if (to.meta.middleware.includes('guest')){
      guest({from,next,router})
    }

    if (to.meta.middleware.includes('manager')){
      manager({next,router})
    }
    if (to.meta.middleware.includes('programmer')){
      programmer({next,router})
    }
  }

});
export default router;

