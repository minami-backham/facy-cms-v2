<template>
  <div id="app">
    <!-- <Login /> -->
    <ResetPassword />
  </div>
</template>

<script>
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";

export default {
  name: "App",
  components: {
    // Login,
    ResetPassword,
  },
};
</script>

<style>
#app {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
