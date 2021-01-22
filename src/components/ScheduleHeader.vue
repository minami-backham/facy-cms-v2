<template>
  <v-row class="scheule-header">
    <v-col>
      <v-select
        v-model="sortType"
        :items="sortOptions"
        item-text="label"
        item-value="value"
        label="並べ替え"
        filled
        dense
        return-object
        @change="$emit('sort-type', sortType)"
      ></v-select>
    </v-col>
    <v-col>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="dates"
        transition="scroll-y-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateRangeText"
            label="期間で絞り込み"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            filled
            dense
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="dates"
          color="black"
          locale="ja"
          :day-format="(dates) => new Date(dates).getDate()"
          :first-day-of-week="1"
          no-title
          scrollable
          range
        >
          <v-spacer></v-spacer>
          <v-btn text color="black" @click="clearDateRange()">選択解除</v-btn>
          <v-btn text color="black" @click="menu = false">閉じる</v-btn>
          <v-btn text color="black" @click="setDateRange(dates)">確定</v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data: () => {
    return {
      sortType: null,
      menu: false,
      dates: null,
      sortOptions: [
        { label: "日付（昇順）", value: { sortKey: "date", sortOrder: "asc" } },
        {
          label: "日付（降順）",
          value: { sortKey: "date", sortOrder: "desc" },
        },
        {
          label: "開始時間（昇順）",
          value: { sortKey: "start_time", sortOrder: "asc" },
        },
        {
          label: "開始時間（降順）",
          value: { sortKey: "start_time", sortOrder: "desc" },
        },
        {
          label: "終了時間（昇順）",
          value: { sortKey: "end_time", sortOrder: "asc" },
        },
        {
          label: "終了時間（降順）",
          value: { sortKey: "end_time", sortOrder: "desc" },
        },
        {
          label: "メールアドレス（昇順）",
          value: { sortKey: "user_mail", sortOrder: "asc" },
        },
        {
          label: "メールアドレス（降順）",
          value: { sortKey: "user_mail", sortOrder: "desc" },
        },
        {
          label: "サポートid（昇順）",
          value: { sortKey: "video_user_id", sortOrder: "asc" },
        },
        {
          label: "サポートid（降順）",
          value: { sortKey: "video_user_id", sortOrder: "desc" },
        },
        {
          label: "カスタマーid（昇順）",
          value: { sortKey: "video_cms_id", sortOrder: "asc" },
        },
        {
          label: "カスタマーid（降順）",
          value: { sortKey: "video_cms_id", sortOrder: "desc" },
        },
      ],
    };
  },
  computed: {
    dateRangeText() {
      if (this.dates) {
        return this.dates.join(" 〜 ");
      }
      return null;
    },
  },
  methods: {
    setDateRange(dates) {
      this.$refs.menu.save(dates);
      this.$emit("date-range", dates);
    },
    clearDateRange(dates) {
      this.dates = null;
      this.$refs.menu.save(this.dates);
      this.$emit("date-range", this.dates);
    },
  },
};
</script>

<style lang="scss">
/* カレンダーの土日の色設定 */
.v-date-picker-table.v-date-picker-table--date
  > table
  > tbody
  tr
  td:nth-child(6) {
  .v-btn {
    .v-btn__content {
      color: #3F51B5; //indigo
    }
  }
  .v-btn--active {
    .v-btn__content {
      color: #9FA8DA; //indigo lighten-3
    }
  }
}

.v-date-picker-table.v-date-picker-table--date
  > table
  > tbody
  tr
  td:nth-child(7) {
  .v-btn {
    .v-btn__content {
      color: #E91E63; //pink
    }
  }

  .v-btn--active {
    .v-btn__content {
      color: #F48FB1; //pink lighten-3
    }
  }
}
</style>