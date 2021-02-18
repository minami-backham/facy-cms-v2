<template>
  <div class="schedule">
    <ManageTableWeek :configData="configData.day_of_week" />
    <v-divider></v-divider>
    <ManageTableDate :configData="configData" />
  </div>
</template>

<script>
import ManageTableWeek from "../components/ManageTableWeek.vue";
import ManageTableDate from "../components/ManageTableDate.vue";
import { ConfigReserve } from "../api/api";

export default {
  name: "managetable",
  components: {
    ManageTableWeek,
    ManageTableDate,
  },
  data() {
    return {
      configData: {},
    };
  },
  async mounted() {
    // API get
    this.configData = await ConfigReserve().get();
  },
};
</script>

<style lang="scss">
</style>