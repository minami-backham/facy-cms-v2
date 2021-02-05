<template>
  <div class="manage-table">
    <div class="manage-table-inner">
      <v-btn @click="update()">更新</v-btn>
      <v-btn @click="remove()">削除</v-btn>
      <ManageTableDetailTable :dayDataProp="dayDataProp" :dayName="dayName" />
    </div>
  </div>
</template>
<script>
import ManageTableDetailTable from "./ManageTableDetailTable.vue";

export default {
  name: "ManageTableDetailDate",
  components: {
    ManageTableDetailTable,
  },
  props: { dayName: String, dayDataProp: Object },
  watch: {
    // data()で入ってこないのでwatch
    dayDataProp: {
      immediate: true,
      handler: function (newVal) {
        this.dayData = newVal;
      },
    },
  },
  methods: {
    update() {
      this.$emit("update-date");
    },
    remove() {
      this.$emit("remove-date");
    },
  },
};
</script> 

<style lang="scss" scoped>
$table-width: 460px;

.manage-table {
  overflow: scroll;
}

.manage-table-inner {
  width: $table-width;
}
</style>