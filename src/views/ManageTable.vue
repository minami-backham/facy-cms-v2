<template>
  <div class="schedule">
    <v-btn to="">保存</v-btn>
    <ManageTableWeek :configData="configData.day_of_week" />
    <ManageTableDate :configData="configData" />
  </div>
</template>

<script>
// import * as _ from "lodash";
// import manageTimetableHeader from "../components/manageTimetableHeader.vue";
import ManageTableWeek from "../components/ManageTableWeek.vue";
import ManageTableDate from "../components/ManageTableDate.vue";
import { ConfigReserve } from "../api/api";

export default {
  name: "managetable",
  components: {
    // manageTimetableHeader,
    ManageTableWeek,
    ManageTableDate,
  },
  data() {
    return {
      configData: {},
    };
  },
  async mounted() {
    this.configData = await ConfigReserve().get();
    console.log("get", this.configData);
  },
};
</script>

<style lang="scss">
</style>