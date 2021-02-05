<template>
  <div class="manage-table">
    <v-btn @click="updateWeek()">保存</v-btn>
    <div class="manage-table-title">曜日</div>
    <div class="manage-table-inner">
      <div class="manage-table__header">
        <div class="header__day"></div>
        <div class="header__active"></div>
        <div class="header__check"></div>
        <div class="header__start-time">開始時刻</div>
        <div class="header__end-time">終了時刻</div>
        <div class="header__time">時間</div>
        <div class="header__edit">詳細</div>
      </div>
      <div class="manage-table__content">
        <div class="timetable" v-for="(day, index) in weekData" :key="index">
          <div class="table__day">
            {{ funcManageTable.getJpDayShort(index) }}
          </div>
          <div class="table__active">
            <span v-show="editStatus[index]">🕓</span>
          </div>
          <div class="table__check">
            <v-checkbox v-model="day.active"></v-checkbox>
          </div>
          <div class="table__start-time">
            <v-select
              :items="selectTimeRange"
              v-model="day.start_time"
              @change="onTimeChange(index)"
              filled
              dense
            ></v-select>
          </div>
          <div class="table__end-time">
            <v-select
              :items="selectTimeRange"
              v-model="day.end_time"
              @change="onTimeChange(index)"
              filled
              dense
            ></v-select>
          </div>
          <div class="table__time">
            <v-select
              :items="selectTimeDuration"
              item-text="`${day.time}分`"
              v-model="day.time"
              @change="onTimeChange(index)"
              filled
              dense
            >
              <template v-slot:item="data">
                <span>{{ data.item }}分</span>
              </template>
            </v-select>
          </div>
          <div class="table__edit">
            <v-btn icon @click="openDrawer(day, index)">
              <v-icon>{{ edit }}</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
      <!-- 編集 drawer -->
      <Drawer :toggle="drawerToggle" @close="closeDrawer">
        <ManageTableDetailWeek
          :dayName="editDayName"
          :dayDataProp="editDayData"
          @update-week="updateWeek()"
        />
      </Drawer>
    </div>
  </div>
</template>
<script>
import * as _ from "lodash";
import Drawer from "./Drawer.vue";
import ManageTableDetailWeek from "./ManageTableDetailWeek.vue";
import { mdiPencil } from "@mdi/js";
import funcManageTable from "../funcManageTable.js";
import { START_END_TIME_RANGE, DURATIONS } from "../const.js";
import { DAY_OF_WEEK } from "../api/statics.js";
import { ConfigReserve } from "../api/api";

export default {
  name: "timetableweek",
  components: {
    Drawer,
    ManageTableDetailWeek,
  },
  props: {
    configData: Object,
  },
  data() {
    return {
      funcManageTable: funcManageTable,
      weekData: {},
      edit: mdiPencil,
      selectTimeRange: START_END_TIME_RANGE, // 開始、終了時刻選択option
      selectTimeDuration: DURATIONS, // 時間枠の長さoption
      drawerToggle: false,
      editDayName: "", // 編集する曜日テキスト
      editDayData: {}, // 編集する日データ
      editStatus: this.initModifiedStatus(),
    };
  },
  mounted() {
    this.weekData = this.configData;
    // TODO: 曜日の並びfix
  },
  watch: {
    // data()で入ってこないのでwatch
    configData: {
      immediate: true,
      handler: function (newVal) {
        this.weekData = newVal;
      },
    },
    weekData: {
      immediate: true,
      deep: true,
      handler: function () {
        this.checkIfModified();
      },
    },
  },
  methods: {
    initModifiedStatus() {
      // 各曜日のiconステータスinit
      const days = _.map(DAY_OF_WEEK, (day) => day.id);
      let obj = {};
      days.forEach((day) => {
        obj[day] = false;
      });
      return obj;
    },
    onTimeChange(index) {
      // 時間系の変更あれば変更日の時間枠を再生成
      this.weekData[index].detail = this.funcManageTable.rebuildTimeTable(
        this.weekData[index]
      );
    },
    showIcon(key) {
      // icon表示
      this.editStatus[key] = true;
    },
    removeIcon(key) {
      // icon非表示
      this.editStatus[key] = false;
    },
    openDrawer(dayData, index) {
      this.editDayName = index;
      this.editDayData = dayData;
      this.drawerToggle = true;
    },
    closeDrawer() {
      this.drawerToggle = false;
    },

    checkIfModified() {
      // 時間枠修正status（時計icon）check
      _.forEach(this.weekData, (day, index) => {
        // activeではない日は表示しない
        if (day.active == false) {
          this.removeIcon(index);
          return;
        }

        // detail内に無効化された時間枠がある or not
        const activeTables = day.detail.filter((d) => {
          return d.active;
        });
        if (activeTables.length < day.detail.length) {
          this.showIcon(index);
        } else {
          this.removeIcon(index);
        }
      });
    },

    // API 週データの更新
    async updateWeek() {
      const result = await ConfigReserve().updateDayOfWeek(this.weekData);
      console.log("update week", result);
    },
  },
};
</script> 

<style lang="scss">
$table-width: 800px;
$day-width: 40px;
$active-width: 40px;
$check-width: 40px;
$start-time-width: 128px;
$end-time-width: 128px;
$time-width: 128px;
$edit-width: 40px;

.manage-table {
  width: $table-width;
  padding: 24px 0;
}

.manage-table-title {
  margin-top: 16px;
  font-size: 20px;
  color: grey;
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