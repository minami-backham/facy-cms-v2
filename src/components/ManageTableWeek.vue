<template>
  <div class="manage-table">
    曜日
    <div class="manage-table-inner">
      <div class="manage-table__header">
        <div class="header__day"></div>
        <div class="header__active"></div>
        <div class="header__check"></div>
        <div class="header__start-time">開始時刻</div>
        <div class="header__end-time">終了時刻</div>
        <div class="header__time">時間</div>
        <div class="header__edit"></div>
      </div>
      <div class="manage-table__content">
        <div class="timetable" v-for="(day, index) in weekData" :key="index">
          <div class="table__day">{{ getJpDay(index) }}</div>
          <div class="table__active">
            <v-btn icon>
              <v-icon>{{ clock }}</v-icon>
            </v-btn>
          </div>
          <div class="table__check">
            <v-checkbox></v-checkbox>
          </div>
          <div class="table__start-time">
            {{ day.start_time }}
          </div>
          <div class="table__end-time">{{ day.end_time }}</div>
          <div class="table__time">{{ day.time }}</div>
          <div class="table__edit">
            <v-btn icon>
              <v-icon>{{ edit }}</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import * as _ from "lodash";
import CONFIG_SCHEDULE from "../../public/json/config_schedule.json";
import { mdiPencil } from "@mdi/js";
import { mdiClockTimeFourOutline } from "@mdi/js";
// import manageTimetableHeader from "../components/manageTimetableHeader.vue";
export default {
  name: "timetableweek",
  components: {
    // manageTimetableHeader,
  },
  data: () => {
    return {
      weekData: CONFIG_SCHEDULE.day_of_week,
      edit: mdiPencil,
      clock: mdiClockTimeFourOutline,
    };
  },
  methods: {
    getJpDay(key) {
      const jpDays = {
        Monday: "月",
        Tuesday: "火",
        Wednesday: "水",
        Thursday: "木",
        Friday: "金",
        Saturday: "土",
        Sunday: "日",
      };
      return jpDays[key];
    },
  },
  computed: {},
};
</script> 

<style lang="scss" scoped>
$table-width: 1024px;
$day-width: 40px;
$active-width: 40px;
$check-width: 40px;
$start-time-width: 96px;
$end-time-width: 96px;
$time-width: 40px;
$edit-width: 40px;

.manage-table {
  overflow: scroll;
}

.manage-table-inner {
  width: $table-width;
}

.manage-table__header {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  text-align: center;
  color: #696969;
  .header__day {
    padding: 8px;
    width: $day-width;
  }
  .header__active {
    padding: 8px;
    width: $active-width;
  }
  .header__check {
    padding: 8px;
    width: $check-width;
  }
  .header__start-time {
    padding: 8px;
    width: $start-time-width;
  }
  .header__end-time {
    padding: 8px;
    width: $end-time-width;
  }
  .header__time {
    padding: 8px;
    width: $time-width;
  }
  .header__edit {
    padding: 8px;
    width: $edit-width;
  }
}

.timetable {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  text-align: center;
  .table__day {
    padding: 8px;
    width: $day-width;
  }
  .table__active {
    padding: 8px;
    width: $active-width;
  }
  .table__check {
    padding: 8px;
    width: $check-width;
  }
  .table__start-time {
    padding: 8px;
    width: $start-time-width;
  }
  .table__end-time {
    padding: 8px;
    width: $end-time-width;
  }
  .table__time {
    padding: 8px;
    width: $time-width;
  }
  .table__edit {
    padding: 8px;
    width: $edit-width;
  }
}
</style>