<template>
  <v-app-bar class="global-header white" flat app>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>{{ AccountCircle }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
import { mdiAccountCircle } from "@mdi/js";

export default {
  data: () => ({
    AccountCircle: mdiAccountCircle,
  }),
};
</script>