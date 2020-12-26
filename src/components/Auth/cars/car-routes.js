import cars from "./cars";
import addCars from "./addCars";
import myCars from "./myCars";
import manager from "../../../middlewares/manager";
import programmer from "../../../middlewares/programmer";
import guest from "../../../middlewares/guest";
export default [
  {
    path: '/user/cars',
    name: 'cars',
    component: cars,
    meta: {
      middleware: 'guest'
    }
  },

  {
    path: '/user/addCars',
    name: 'addCars',
    component: addCars,
    meta: {
      middleware: ['auth','manager']
    }

  },
  {
    path: '/user/myCars',
    name: 'myCars',
    component: myCars,
    meta: {
      middleware: ['auth','manager']
    }

  },
]
