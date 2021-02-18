import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import ResetPassword from "./views/ResetPassword.vue";
import Schedule from "./views/Schedule.vue";
import Reservation from "./views/Reservation.vue";
import ManageTable from "./views/ManageTable.vue";
import ManageAccount from "./components/ManageAccount.vue";
import UpdateProfile from "./components/UpdateProfile.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    //ここからpublic
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/reservation",
      name: "reservation",
      component: Reservation,
    },
    //ここからcms
    {
      path: "/manage/login",
      name: "login",
      component: Login,
    },
    { path: "/manage/reset", name: "reset", component: ResetPassword },
    {
      path: "/manage/schedule",
      name: "schedule",
      component: Schedule,
    },
    {
      path: "/manage/managetable",
      name: "ManageTable",
      component: ManageTable,
    },
    {
      path: "/manage/manageaccount",
      name: "ManageAcount",
      component: ManageAccount,
    },
    {
      path: "/manage/updateprofile",
      name: "UpdateProfile",
      component: UpdateProfile,
      props: true,
    },
  ],
});
