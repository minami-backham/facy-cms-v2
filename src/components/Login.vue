<template>
  <div>
    <v-form v-model="valid" class="login">
      <v-container>
        <v-row class="login-form">
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
              type="password"
              label="パスワード"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-col cols="12" md="4" class="button">
      <v-btn class="button-container" elevation="6" large>ログイン</v-btn>
    </v-col>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    email: "",
    emailRules: [
      (v) => !!v || "メールアドレスの入力は必須です",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "パスワードの入力は必須です",
      (v) => 8 <= v.length || "８文字以上の有効なパスワードを入力してください",
    ],
  }),
};
</script>

<style lang="scss" scoped>
.login {
  padding: 20px 10px;
  margin: auto 0;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.button {
  text-align: center;

  .button-container {
    background-color: red;
    color: white;
  }
}
</style>
