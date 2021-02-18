<template>
  <v-app id="app">
    <GlobalHeader />
    <Toast />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  import GlobalHeader from "./components/GlobalHeader.vue";
  import Toast from "./components/Toast.vue";

  export default {
    name: "App",
    components: {
      GlobalHeader,
      Toast,
    },
  };
</script>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
  #app {
    font-family: "Roboto", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
