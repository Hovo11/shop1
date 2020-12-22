import announcments from "./announcments";
import addAnnouncments from "./addAnnouncments";
import manager from "../../../middlewares/manager";
import programmer from "../../../middlewares/programmer";


export default [
  {
    path: '/user/announcments',
    name: 'announcment',
    component: announcments,
    meta: { middleware: ['auth','programmer'] }
  },

  {
    path: '/user/addAnnouncments',
    name: 'addAnnouncments',
    component: addAnnouncments,
    meta: {
      middleware: ['auth','manager']
    }

  },
]
