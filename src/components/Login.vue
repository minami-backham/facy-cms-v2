<template>
  <v-form v-model="valid" class="login">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="メールアドレス"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :counter="10"
            label="パスワード"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    // firstname: "",
    // lastname: "",
    // nameRules: [
    //   (v) => !!v || "Name is required",
    //   (v) => v.length <= 10 || "Name must be less than 10 characters",
    // ],
    email: "",
    emailRules: [
      (v) => !!v || "メールアドレスの入力は必須です",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "パスワードの入力は必須です",
      (v) => v.length <= 8 || "８文字以上の有効なパスワードを入力してください",
    ],
  }),
};
</script>

<style>
.login {
  padding: 20px 10px;
}
</style>
