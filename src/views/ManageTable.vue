<template>
  <div class="schedule">
    <ManageTableWeek />
  </div>
</template>

<script>
import * as _ from "lodash";
// import manageTimetableHeader from "../components/manageTimetableHeader.vue";
import ManageTableWeek from "../components/ManageTableWeek.vue";

export default {
  name: "managetable",
  components: {
    // manageTimetableHeader,
    ManageTableWeek,
  },
};
</script> 