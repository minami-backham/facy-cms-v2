import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./components/Login.vue";
import ResetPassword from "./components/ResetPassword.vue";
import Schedule from "./views/Schedule.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    { path: "/reset", name: "reset", component: ResetPassword },
    {
      path: "/schedule",
      name: "schedule",
      component: Schedule
    }
  ]
});
