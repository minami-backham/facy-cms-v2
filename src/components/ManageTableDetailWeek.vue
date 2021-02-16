<template>
  <div class="manage-detail-table">
    <div class="manage-detail-table-inner">
      <v-btn @click="update()">更新</v-btn>
      <ManageTableDetailTable :dayDataProp="dayDataProp" :dayName="dayName" />
    </div>
  </div>
</template>
<script>
import ManageTableDetailTable from "./ManageTableDetailTable.vue";

export default {
  name: "ManageTableDetailWeek",
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
      this.$emit("update-week");
    },
  },
};
</script> 

<style lang="scss" scoped>
$table-width: 460px;

.manage-detail-table-inner {
  width: $table-width;
  padding: 24px;
}
</style>