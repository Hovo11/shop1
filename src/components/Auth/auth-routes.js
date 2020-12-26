//Auth routes
import Register from "./Register";
import Login from "./Login";
import HelloUser from "./HelloUser";
import auth from "../../middlewares/auth";
import guest from "../../middlewares/guest";
import EmailVerify from "./EmailVerify";
import manager from "../../middlewares/manager";
import ForgotPassword from "./ForgotPassword";
export default [
  {
    path: '/signup',
    name: 'Register',
    component: Register,
    meta: {middleware: ['guest']}
  },
  {
    path: '/emailVerify',
    name: 'Email',
    component: EmailVerify,
    meta: {middleware: ['guest']}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {middleware: ['guest']}
  },
  {
    path: '/forgotPassword',
    name: 'forgotPassword',
    component: ForgotPassword,
    meta: {middleware: ['guest']}
  },
  {
    path: '/user/hello',
    name: 'Hello',
    component: HelloUser,
    meta: {middleware: ['auth']}
  },
]
