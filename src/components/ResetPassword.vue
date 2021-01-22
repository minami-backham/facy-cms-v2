<template>
  <div>
    <div class="reset-password" :ref="reset_password">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          class="cols-4"
          v-model="password"
          :rules="passwordRules"
          type="password"
          label="新しいパスワード"
          v-validate="'required'"
          name="password"
          ref="password"
        ></v-text-field>
        <v-text-field
          class="cols-4 comfirm_password"
          v-model="repassword"
          type="password"
          label="新しいパスワードをもう一度入力"
          v-validate="'required|confirmed:password'"
          name="password_confirmation"
          data-vv-as="password"
        ></v-text-field>
      </v-form>

      <!-- ERRORS -->
      <div class="alert alert-danger" v-show="errors.any()">
        <div
          v-if="errors.has('password_confirmation')"
          class="confirm-error_message"
        >
          {{ errors.first("password_confirmation") }}
        </div>
      </div>

      <div class="button-container">
        <v-btn class="button mr-4" @click="checkPassword()"
          >パスワードを変更</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    password: "",
    passwordRules: [
      (v) => 8 <= v.length || "８文字以上のパスワードを入力してください",
    ],
    repassword: "",
    isActive: true,
  }),
  methods: {
    checkPassword() {
      if (this.password == "" && this.repassword == "") {
        alert("パスワードが入力されていません");
      } else if (this.password !== this.repassword) {
        alert("パスワードが一致しませ。もう一度入力");
        this.clearForm();
      } else {
        alert("パスワード一致");
        this.clearForm();
      }
      this.clearForm();
    },
    clearForm(e) {
      this.password = "";
      this.repassword = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.reset-password {
  padding: 20px;
  width: 300px;
  margin: 200px auto;

  .confirm-error_message {
    margin-top: 20px;
    color: red;
    font-size: 15px;
  }

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
