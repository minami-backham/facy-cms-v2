<template>
  <div class="manage-table">
    <div class="manage-table-title">個別</div>
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
            :events="activeDates"
            @click:date="openDrawer(value)"
          ></v-calendar>
        </div>
      </div>
      <!-- 編集 drawer -->
      <Drawer :toggle="drawerToggle" @close="closeDrawer">
        <ManageTableDetails :dayName="editDayName" :dayDataProp="editDayData" />
      </Drawer>
    </div>
  </div>
</template>

<script>
import * as _ from "lodash";
import Drawer from "./Drawer.vue";
import ManageTableDetails from "./ManageTableDetails.vue";
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
      funcManageTable: funcManageTable,
      dateData: {},
      weekData: {},
      clock: mdiClockTimeFourOutline,
      selectTimeRange: START_END_TIME_RANGE, // 開始、終了時刻選択option
      selectTimeDuration: DURATIONS, // 時間枠の長さoption
      drawerToggle: false,
      editDayName: "", // 編集する曜日テキスト
      editDayData: {}, // 編集する日データ
      activeDates: [], // icon表示する日list
    };
  },
  mounted() {
    this.dateData = this.configData.date;
    this.weekData = this.configData.day_of_week;
  },
  watch: {
    dateData: {
      immediate: true,
      deep: true,
      handler: function () {
        console.log("watch dateData");
        this.getActiveDates();
      },
    },
  },
  methods: {
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
      const [year, month, date] = this.funcManageTable.getYMD(_date);
      if (_.get(this.dateData, [year, month, date])) {
        // 既存であればそれを返す
        return this.dateData[year][month][date];
      } else {
        // 年、月データなければ追加
        if (!this.dateData[year]) {
          this.$set(this.dateData, [year], {});
        }
        if (!this.dateData[year][month]) {
          this.$set(this.dateData[year], [month], {});
        }
        // 日に初期値set
        const initData = this.getInitDateData(_date);
        this.$set(this.dateData[year][month], [date], initData);
        return this.dateData[year][month][date];
      }
    },

    // weekDataから同曜日のデータを初期値としてコピー
    getInitDateData(_date) {
      const _weekNum = new Date(_date).getDay() + 1;
      const _dayId = _.find(DAY_OF_WEEK, (day) => day.weekNum == _weekNum).id;
      const copied = _.cloneDeep(this.weekData[_dayId]);
      copied["active"] = true; // デフォルトでactiveに
      return copied;
    },

    // オブジェクトキーを日付strの配列にする ["2020-01-01"...]
    dateKeysToArray(obj) {
      const isObject = (val) => typeof val === "object" && !Array.isArray(val);
      const addDelimiter = (a, b) => (a ? `${a}-${b}` : b);
      const paths = (obj = {}, head = "") => {
        return Object.entries(obj).reduce((product, [key, value]) => {
          console.log("dateKeysToArray", product);

          let fullPath = addDelimiter(head, key);
          return isObject(value)
            ? product.concat(paths(value, fullPath))
            : product.concat(fullPath);
        }, []);
      };
      const removeNonNumber = (arr) => {
        return arr.map((i) => i.replace(/-\D+/, ""));
      };
      // uniq
      return [...new Set(removeNonNumber(paths(obj)))];
    },

    // icon表示日
    getActiveDates() {
      const dateArray = this.dateKeysToArray(this.dateData);
      const dateArrayActive = this.filterDates(dateArray);
      console.log("dateArrayActive", dateArrayActive);
      this.activeDates = dateArrayActive.map((item) => {
        return {
          start: item,
          name: `<v-icon>clock</v-icon>`,
        };
      });
    },

    // activeな日のみ
    filterDates(dates) {
      const _arr = dates.map((_date) => {
        const [year, month, date] = this.funcManageTable.getYMD(_date);
        if (this.dateData[year][month][date].active) {
          return _date;
        }
      });
      return _.compact(_arr);
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