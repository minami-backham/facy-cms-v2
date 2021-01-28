import { DAY_OF_WEEK } from "./api/statics.js";

const func = {
  // X曜日
  getJpDay(key) {
    return key ? DAY_OF_WEEK[key.toUpperCase()].label : "";
  },
  // 曜日一文字
  getJpDayShort(key) {
    return key ? DAY_OF_WEEK[key.toUpperCase()].shortLabel : "";
  }
};

export default func;
