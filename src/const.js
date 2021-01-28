import * as _ from "lodash";

// 開始、終了時刻選択option
export const START_END_TIME_RANGE = _.map(_.range(9, 19), function (e) {
  return e + ":00";
});

// 時間枠の長さoption
export const DURATIONS = ["15", "30", "60"];
