import Vue from "vue";

Vue.filter("currencyFormat", function(value) {
  if (isNaN(value)) {
    return "Rp~";
  } else {
    if (value != null) {
      const minus = Number(value) < 0;
      if (value.toString().split(".").length > 2) return "Rp~";
      else if (value.toString().split(".").length > 1) {
        value = value.toString().split(".");
        value = value[0];
      }
      try {
        const result = value
          .toString()
          .match(/\d{1,3}(?=(\d{3})*$)/g)
          .join(".");
        return "Rp" + (minus === true ? " -" : "") + result;
      } catch (error) {
        return "Rp~";
      }
    }
  }
});
