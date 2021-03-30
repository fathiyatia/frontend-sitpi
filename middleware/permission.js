export default ({ store, route, redirect }) => {
  const user = store.$auth.$state.user.user;
  switch (route.name) {
    case "tangkapan-formTangkapan":
      if (!user.permissions.includes("create-caught")) {
        redirect("/login");
      }
      break;
    case "lelang-formLelang":
      if (!user.permissions.includes("create-auction")) {
        redirect("/login");
      }
      break;
    case "transaksi-formTransaksi":
      if (!user.permissions.includes("create-transaction")) {
        redirect("/login");
      }
      break;
    case "nelayan-dataNelayan":
      if (!user.permissions.includes("create-fisher")) {
        redirect("/login");
      }
      break;
    case "nelayan-tambahNelayan":
      if (!user.permissions.includes("create-fisher")) {
        redirect("/login");
      }
      break;
    case "pembeli-dataPembeli":
      if (!user.permissions.includes("create-buyer")) {
        redirect("/login");
      }
      break;
    case "pembeli-tambahPembeli":
      if (!user.permissions.includes("create-buyer")) {
        redirect("/login");
      }
      break;
    case "alat-dataAlat":
      if (!user.permissions.includes("create-fishing-gear")) {
        redirect("/login");
      }
      break;

    case "daerah-dataDaerah":
      if (!user.permissions.includes("create-fishing-area")) {
        redirect("/login");
      }
      break;
    case "daerah-tambahDaerah":
      if (!user.permissions.includes("create-fishing-area")) {
        redirect("/login");
      }
      break;
    case "ikan-dataikan":
      if (!user.permissions.includes("create-fish-type")) {
        redirect("/login");
      }
      break;
    case "user-dataUser":
      if (
        !user.permissions.includes("create-district-admin") &&
        !user.permissions.includes("create-tpi-admin") &&
        !user.permissions.includes("create-tpi-officer") &&
        !user.permissions.includes("create-tpi-cashier")
      ) {
        redirect("/login");
      }
      break;
    case "tpi-dataTPI":
      if (!user.permissions.includes("create-tpi")) {
        redirect("/login");
      }
      break;
    case "tpi-tambahTPI":
      if (!user.permissions.includes("create-tpi")) {
        redirect("/login");
      }
      break;

    case "user-register-adminDinas":
      if (!user.permissions.includes("create-district-admin")) {
        redirect("/login");
      }
      break;

    case "user-register-adminTPI":
      if (!user.permissions.includes("create-tpi-admin")) {
        redirect("/login");
      }
      break;

    case "user-register-petugasTPI":
      if (!user.permissions.includes("create-tpi-officer")) {
        redirect("/login");
      }
      break;

    case "user-register-kasir":
      if (!user.permissions.includes("create-tpi-cashier")) {
        redirect("/login");
      }
      break;

    case "laporan-produksiIkan":
      if (user.role.name != "tpi-admin" && user.role.name != "district-admin") {
        redirect("/login");
      }
      break;

    case "laporan-transaksiLelang":
      if (user.role.name != "tpi-admin" && user.role.name != "district-admin") {
        redirect("/login");
      }
      break;

    case "tangkapan-dataTangkapan":
      if (
        user.role.name != "tpi-admin" &&
        user.role.name != "tpi-officer" &&
        user.role.name != "tpi-cashier"
      ) {
        redirect("/login");
      }
      break;

    case "lelang-dataLelang":
      if (
        user.role.name != "tpi-admin" &&
        user.role.name != "tpi-officer" &&
        user.role.name != "tpi-cashier"
      ) {
        redirect("/login");
      }
      break;

    case "transaksi-dataTransaksi":
      if (
        user.role.name != "tpi-admin" &&
        user.role.name != "tpi-officer" &&
        user.role.name != "tpi-cashier"
      ) {
        redirect("/login");
      }
      break;

    default:
      redirect("/login");
  }
};
