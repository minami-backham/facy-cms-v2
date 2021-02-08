<template>
  <v-form ref="form" v-model="valid" lazy-validation class="profile">
    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="名前"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="メールアドレス"
      required
    ></v-text-field>

    <v-select
      v-model="select"
      :items="items"
      :rules="[(v) => !!v || '権限を選択してください']"
      label="権限"
      required
      item-text="label"
      item-value="value"
      persistent-hint
      return-object
    ></v-select>

    <v-btn color="error" class="mr-4 update-btn" @click="updateProfile()">
      更新
    </v-btn>
  </v-form>
</template>

<script>
import { Users } from "@/api/users";

export default {
  props: {
    accountInfo: Object,
  },
  data() {
    return {
      valid: true,
      name: this.accountInfo.name,
      nameRules: [
        (v) => !!v || "名前の入力は必須です",
        (v) => !!v || "名前を入力してください",
      ],
      email: this.accountInfo.email,
      emailRules: [
        (v) => !!v || "メールアドレスの入力は必須です",
        (v) => /.+@.+\..+/.test(v) || "有効なメールアドレスを入力してください",
      ],
      select: {
        label: this.accountInfo.roll_label,
        value: this.accountInfo.roll_value,
      },
      sample: "",
      items: [
        { label: "管理者", value: "admin" },
        { label: "マーケター", value: "marketer" },
        { label: "サポーター", value: "support" },
      ],
      uid: this.accountInfo.uid,
    };
  },
  methods: {
    async updateProfile() {
      const params = {
        uid: this.uid,
        email: this.email,
        name: this.name,
        roll: this.select.value,
      };
      const result = await Users().updateUserProfile(params);
      if (result.result === true) {
        alert("アップデートに成功しました");
      } else {
        alert("アップデートに失敗しました。");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  padding: 20px;
  width: 300px;
  margin: 200px auto;

  .update-btn {
    width: 100%;
  }
}
</style>
