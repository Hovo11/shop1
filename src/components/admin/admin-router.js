import users from './users'
import userInfo from "./userInfo";
export default [
  {
    path: '/admin/users',
    name: 'users',
    component: users,
    meta: {middleware: ['auth']}
  },
  {
    path: '/admin/userInfo',
    name: 'userInfo',
    component: userInfo,
    meta: {middleware: ['auth','admin']}
  }
]
