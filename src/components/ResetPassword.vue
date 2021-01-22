<template>
  <div>
    <!-- <div class="input-group">
      <h4 id="header">Enter Password</h4>

      <div class="input-fields">
        <input
          v-validate="'required'"
          name="password"
          type="password"
          placeholder="Password"
          ref="password"
        />

        <input
          v-validate="'required|confirmed:password'"
          name="password_confirmation"
          type="password"
          placeholder="Password, Again"
          data-vv-as="password"
        />
      </div>
    </div> -->

    <div class="reset-password">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          class="cols-4"
          v-model="password"
          :rules="passwordRules"
          type="password"
          label="新しいパスワード"
          required
          v-validate="'required'"
          name="password"
          ref="password"
        ></v-text-field>
        <v-text-field
          class="cols-4"
          v-model="repassword"
          :rules="repasswordRules"
          type="password"
          label="新しいパスワードをもう一度入力"
          required
          v-validate="'required|confirmed:password'"
          name="password_confirmation"
          data-vv-as="password"
        ></v-text-field>
      </v-form>

      <!-- ERRORS -->
      <div class="alert alert-danger" v-show="errors.any()">
        <div v-if="errors.has('password')">
          {{ errors.first("password") }}
        </div>
        <div v-if="errors.has('password_confirmation')">
          {{ errors.first("password_confirmation") }}
        </div>
      </div>

      <div class="button-container">
        <v-btn color="error" class="button mr-4" @click="checkPassword()"
          >パスワードを変更</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";

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
  //   components: {
  //   ValidationProvider
  // },
  methods: {
    checkPassword() {
      if (this.password !== this.repassword) {
        alert("パスワードが一致しませ。もう一度入力");
        this.clearForm();
      } else {
        alert("パスワード一致");
        this.clearForm();
      }
    },
    clearForm() {
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
