<template>
  <div>
    <div class="reset-password" :ref="reset_password">
      <div class="message-container">
        <p>パスワードを再設定します。</p>
        <p>登録しているメールアドレスを入力してください。</p>
      </div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          class="cols-4"
          v-model="email"
          :rules="emailRules"
          label="メールアドレス"
          required
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
        <v-btn class="button mr-4" @click="submitResetPasswordEmail()"
          >パスワードを変更</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import {UserAuth} from "@/api/userAuth.js";
export default {
  data: () => ({
    valid: false,
    email: "",
    emailRules: [
      (v) => !!v || "メールアドレスの入力は必須です",
      (v) => /.+@.+/.test(v) || "有効なメールアドレスを入力してください",
    ],
  }),
  methods: {
    async submitResetPasswordEmail() {
         const params = {
        email: this.email,
      };
      const result = await UserAuth().sendPasswordResetEmail(params);
      this.result = JSON.stringify(result);
      alert("再設定メールを送信しました");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.reset-password {
  padding: 20px;
  width: 300px;
  margin: 200px auto;

  .message-container {
    text-align: center;
    margin: 30px 0;
    font-size: 13px;
  }

  .comfirm_password {
    height: 50px;
  }

  .confirm-error_message {
    color: rgba(0, 0, 0, 0.6);
    font-size: 12px;
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
