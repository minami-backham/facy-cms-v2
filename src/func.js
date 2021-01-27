import { DAY_OF_WEEK } from "./api/statics.js";

const func = {
  getJpDay(key) {
    return DAY_OF_WEEK[key.toUpperCase()].label;
  },

  getJpDayShort(key) {
    return DAY_OF_WEEK[key.toUpperCase()].shortLabel;
  }
};

export default func;
