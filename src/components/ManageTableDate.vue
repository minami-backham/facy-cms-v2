<template>
  <div class="manage-table">
    <div class="manage-table-title">個別</div>
    <div class="manage-table-inner">
      <div class="manage-table__content">
        <div class="manage-table__calendar-control">
          <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
            <v-icon>{{ arrowLeft }}</v-icon>
          </v-btn>
          <span
            class="manage-table__calendar-control--title"
            v-if="$refs.calendar"
          >
            {{ calendarTitle }}
          </span>
          <v-btn icon class="ma-2" @click="$refs.calendar.next()">
            <v-icon>{{ arrowRight }}</v-icon>
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
        <ManageTableDetailDate
          :dayName="editDayName"
          :dayDataProp="editDayData"
          @update-date="updateDate()"
          @remove-date="removeDate()"
        />
      </Drawer>
    </div>
  </div>
</template>

<script>
import * as _ from "lodash";
import Drawer from "./Drawer.vue";
import ManageTableDetailDate from "./ManageTableDetailDate.vue";
import funcManageTable from "../funcManageTable.js";
import { START_END_TIME_RANGE, DURATIONS } from "../const.js";
import { DAY_OF_WEEK } from "../api/statics.js";
import { mdiArrowLeft, mdiArrowRight } from "@mdi/js";
import { ConfigReserve } from "../api/api";

export default {
  name: "timetableweek",
  components: {
    Drawer,
    ManageTableDetailDate,
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
      selectTimeRange: START_END_TIME_RANGE, // 開始、終了時刻選択option
      selectTimeDuration: DURATIONS, // 時間枠の長さoption
      drawerToggle: false,
      editDayName: "", // 編集する曜日テキスト
      editDayData: {}, // 編集する日データ
      activeDates: [], // icon表示する日list
      arrowRight: mdiArrowRight,
      arrowLeft: mdiArrowLeft,
    };
  },
  mounted() {
    this.dateData = this.configData.date;
    this.weekData = this.configData.day_of_week;
    this.initToday();
  },
  watch: {
    configData: {
      immediate: true,
      deep: true,
      handler: function (newVal) {
        this.dateData = newVal.date;
        this.weekData = newVal.day_of_week;
      },
    },
    dateData: {
      immediate: true,
      deep: true,
      handler: function () {
        this.getActiveDates();
      },
    },
  },
  methods: {
    openDrawer(date) {
      this.editDayName = date;
      this.editDayData = this.getDayData();
      this.drawerToggle = true;
    },
    closeDrawer() {
      this.drawerToggle = false;
    },

    // drawerに渡す1日のデータ
    getDayData() {
      const [year, month, date] = this.selectDateYMD;
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
        // 追加日に初期値set
        const initData = this.getInitDateData();
        this.$set(this.dateData[year][month], [date], initData);
        return this.dateData[year][month][date];
      }
    },

    // weekDataから同曜日のデータを初期値としてコピー
    getInitDateData() {
      const _weekNum = new Date(this.value).getDay();
      const _dayId = _.find(DAY_OF_WEEK, (day) => day.index == _weekNum).id;
      console.log(_dayId);
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
    async getActiveDates() {
      const dateArray = this.dateKeysToArray(this.dateData);
      const dateArrayActive = this.filterDates(dateArray);
      this.activeDates = dateArrayActive.map((item) => {
        return {
          start: item,
          name: "🕓",
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

    // 選択中の日付の初期値 → 今日(YYYY-MM-DD)
    initToday() {
      const date = new Date();
      const y = date.getFullYear();
      const m = ("00" + (date.getMonth() + 1)).slice(-2);
      const d = ("00" + date.getDate()).slice(-2);
      this.value = y + "-" + m + "-" + d;
    },

    // API update 日
    async updateDate() {
      const [_year, _month, _date] = this.selectDateYMD;
      const payload = {
        year: _year,
        month: _month,
        day: _date,
        params: this.editDayData,
      };
      const result = await ConfigReserve().setDate(payload);
      console.log("update date", result);
    },
    async removeDate() {
      // const [_year, _month, _date] = this.selectDateYMD;
      // const payload = {
      //   year: _year,
      //   month: _month,
      //   day: _date,
      //   params: {},
      // };
      // const result = await ConfigReserve().setDate(payload);
      // console.log("remove date", result);
    },
  },
  computed: {
    calendarTitle() {
      const [year, month] = this.selectDateYMD;
      const _month = month.match(/0\d/) ? month[1] : month;
      return year + "年 " + _month + "月";
    },
    // 選択中の日付の年月日 [year, month, date]
    selectDateYMD() {
      return this.funcManageTable.getYMD(this.value);
    },
  },
};
</script> 

<style lang="scss">
.manage-table__calendar-control {
  text-align: center;
}

.manage-table__calendar-control--title {
  font-size: 20px;
}

.v-calendar-weekly__week {
  height: 72px !important;
}

.v-application {
  .v-calendar-weekly__day {
    .primary {
      background: transparent !important;
      .pl-1 {
        text-align: center;
        font-size: 14px;
      }
    }
  }
}
</style>