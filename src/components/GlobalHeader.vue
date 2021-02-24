<template>
  <v-app-bar class="global-header white" flat app>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>{{ AccountCircle }}</v-icon>
    </v-btn>
    <v-navigation-drawer v-model="drawer" absolute left temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Menu </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-content>
            <v-list-item-title
              ><router-link :to="item.path">{{
                item.title
              }}</router-link></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>
<script>
import { mdiAccountCircle } from "@mdi/js";

export default {
  data: () => ({
    AccountCircle: mdiAccountCircle,
    drawer: false,
    items: [
      { path: "/manage/login", title: "ログイン画面" },
      { path: "/manage/reset", title: "パスワードリセット画面" },
      { path: "/manage/schedule", title: "スケジュール画面" },
      { path: "/manage/managetable", title: "予約可能日設定" },
      { path: "/reservation", title: "予約フォーム" },
    ],
  }),
};
</script>

<style lang="scss">
.v-navigation-drawer {
  height: 100vh !important; // windowの高さ適用
  .v-list-item__title {
    a {
      color: #696969;
      text-decoration: none;
    }
  }
}
.v-overlay {
  height: 100vh;
}
</style>