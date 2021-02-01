<template>
  <div class="manage-table">
    <div class="manage-table-title">個別</div>
    <!-- {{value}} -->
    <div class="manage-table-inner">
      <div class="manage-table__content">
        <div class="manage-table__calendar-control">
          <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
            Prev
            <!-- <v-icon>mdi-chevron-left</v-icon> -->
          </v-btn>
          --
          <!-- <v-spacer></v-spacer> -->
          <v-btn icon class="ma-2" @click="$refs.calendar.next()">
            Next
            <!-- <v-icon>mdi-chevron-right</v-icon> -->
          </v-btn>
        </div>
        <div class="manage-table__calendar">
          <v-calendar
            locale="ja-jp"
            :day-format="(timestamp) => new Date(timestamp.date).getDate()"
            :month-format="
              (timestamp) => new Date(timestamp.date).getMonth() + 1 + ' /'
            "
            ref="calendar"
            v-model="value"
            :weekdays="weekday"
            :type="type"
            :events="events"
            @click:date="openDrawer(value)"
            @change="getEvents"
          ></v-calendar>
        </div>
      </div>
      <!-- 編集 drawer -->
      <Drawer :toggle="drawerToggle" @close="closeDrawer">
        <ManageTableDetails
          :dayName="editDayName"
          :dayDataProp="editDayData"
          @show-edit-status="showEditStatus"
        />
      </Drawer>
    </div>
  </div>
</template>
<script>
import * as _ from "lodash";
import Drawer from "./Drawer.vue";
import ManageTableDetails from "./ManageTableDetails.vue";
import { mdiPencil } from "@mdi/js";
import { mdiClockTimeFourOutline } from "@mdi/js";
import funcManageTable from "../funcManageTable.js";
import { START_END_TIME_RANGE, DURATIONS } from "../const.js";
import { DAY_OF_WEEK } from "../api/statics.js";

// import manageTimetableHeader from "../components/manageTimetableHeader.vue";

export default {
  name: "timetableweek",
  components: {
    Drawer,
    ManageTableDetails,
  },
  props: {
    configData: Object,
  },
  data() {
    return {
      type: "month",
      weekday: [0, 1, 2, 3, 4, 5, 6], // 日曜始まり
      value: "", // 選択中の日付
      events: this.activeDates,
      funcManageTable: funcManageTable,
      dateData: {},
      weekData: {},
      edit: mdiPencil,
      clock: mdiClockTimeFourOutline,
      selectTimeRange: START_END_TIME_RANGE, // 開始、終了時刻選択option
      selectTimeDuration: DURATIONS, // 時間枠の長さoption
      drawerToggle: false,
      editDayName: "", // 編集する曜日テキスト
      editDayData: {}, // 編集する日データ
      editStatus: this.initEditStatus(),
    };
  },
  mounted() {
    this.dateData = this.configData.date;
    this.weekData = this.configData.day_of_week;
  },
  watch: {
    // data()で入ってこないのでwatch
    configData: {
      immediate: true,
      handler: function (newVal) {
        this.dateData = newVal.date;
        this.weekData = newVal.day_of_week;
      },
    },
  },
  methods: {
    getEvents() {},

    // editStatus系→不要かも
    initEditStatus() {
      // 各日の編集状態init
      const days = _.map(DAY_OF_WEEK, (day) => day.id);
      let obj = {};
      days.forEach((day) => {
        obj[day] = false;
      });
      return obj;
    },
    showEditStatus(index) {
      // 編集中status
      this.editStatus[index] = true;
    },

    openDrawer(date) {
      this.editDayName = date;
      this.editDayData = this.getDayData(date);
      this.drawerToggle = true;
    },
    closeDrawer() {
      this.drawerToggle = false;
    },

    // drawerに渡す1日のデータ
    getDayData(_date) {
      const [year, month, date] = _date.match(/(\d{4})-(\d{2})-(\d{2})/).slice(1);
      // 既存であればそれを返す
      if (_.get(this.dateData, [year, month, date])) {
        return this.dateData[year][month][date];
      } else {
        // なければ weekDataから同曜日のデータを初期値としてコピー
        const _weekNum = new Date(_date).getDay() + 1;
        const _dayId = _.find(DAY_OF_WEEK, (day) => day.weekNum == _weekNum).id;
        const emptyObj = {[year]: { [month]: { [date]:{} }}};
        this.dateData = _.merge(this.dateData, emptyObj); // 上書きしないでmerge
        this.dateData[year][month][date] = _.cloneDeep(this.weekData[_dayId]);
        return this.dateData[year][month][date];
      }
    },
  },
  computed: {
    activeDates() {
      return [
        // TODO: icon表示日 activeな日のみに表示
        {
          id: 1,
          start: "2021-01-24",
          name: "icon",
        },
        {
          id: 2,
          start: "2021-01-04",
          name: "icon",
        },
      ];
    },
  },
};
</script> 

<style lang="scss" scoped>
$table-width: 1024px;
$day-width: 40px;
$active-width: 40px;
$check-width: 40px;
$start-time-width: 128px;
$end-time-width: 128px;
$time-width: 128px;
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