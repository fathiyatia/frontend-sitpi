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

Vue.filter("dateFormat", function(value) {
  var date = value;
  var tahun = date.getFullYear();
  var bulan = date.getMonth();
  var tanggal = date.getDate();
  switch (bulan) {
    case 0:
      bulan = "Januari";
      break;
    case 1:
      bulan = "Februari";
      break;
    case 2:
      bulan = "Maret";
      break;
    case 3:
      bulan = "April";
      break;
    case 4:
      bulan = "Mei";
      break;
    case 5:
      bulan = "Juni";
      break;
    case 6:
      bulan = "Juli";
      break;
    case 7:
      bulan = "Agustus";
      break;
    case 8:
      bulan = "September";
      break;
    case 9:
      bulan = "Oktober";
      break;
    case 10:
      bulan = "November";
      break;
    case 11:
      bulan = "Desember";
      break;
  }

  return tanggal + " " + bulan + " " + tahun;
});
