<template>
  <div class="reset-password">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        class="cols-4"
        v-model="password"
        :rules="passwordRules"
        type="password"
        label="新しいパスワード"
        required
      ></v-text-field>
      <p>{{ password }}</p>
      <v-text-field
        class="cols-4"
        v-model="repassword"
        :rules="repasswordRules"
        label="新しいパスワードをもう一度入力"
        required
      ></v-text-field>
      <p>{{ repassword }}</p>
    </v-form>
    <div class="button-container">
      <v-btn color="error" class="button mr-4" @click="checkPassword()"
        >パスワードを変更</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    password: "",
    passwordRules: [
      (v) => !!v || "パスワードの入力は必須です",
      (v) => 8 <= v.length || "８文字以上のパスワードを入力してください",
    ],
    repassword: "",
    repasswordRules: [
      (v) => !!v || "パスワードの入力は必須です",
      (v) =>
        8 <= v.length || "上記で設定したパスワードをもう一度入力してください",
    ],
  }),
  methods: {
    checkPassword() {
      if (this.password !== this.repassword) {
        alert("パスワードが一致しませ。もう一度入力");
        console.log("no match pass", this.password);
        console.log("no match repass", this.repassword);
      } else {
        alert("パスワード一致");
        console.log("1", this.password);
        console.log("2", this.repassword);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.reset-password {
  padding: 20px;
  width: 300px;
  margin: 200px auto;

  .button-container {
    text-align: center;
    margin-top: 50px;
    .button {
      background-color: red;
      color: white;
      width: 100%;
    }
  }
}
</style>
