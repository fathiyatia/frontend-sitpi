<template>
  <v-navigation-drawer color="primary" v-model="drawer" fixed app width="265"
    ><v-container>
      <v-row no-gutters class="pt-4">
        <v-col cols="4">
          <v-avatar color="secondary" size="36"> </v-avatar>
        </v-col>
        <v-col cols="8" class="white--text">
          <h3 class="pt-1">SITPI</h3>
        </v-col>
      </v-row>
    </v-container>

    <v-list>
      <!--- Dashboard --->
      <div v-if="this.$auth.$state.user.user.role.name != 'superadmin'">
        <v-list-item-group color="white">
          <v-list-item
            v-for="(item, i) in dashboard"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon color="white">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text" v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </div>
      <!--- Form --->

      <v-divider
        v-if="
          this.$auth.$state.user.user.permissions.includes('create-caught') ||
            this.$auth.$state.user.user.permissions.includes(
              'create-auction'
            ) ||
            this.$auth.$state.user.user.permissions.includes(
              'create-transaction'
            )
        "
        class="mx-3 mb-2"
        color="white"
      ></v-divider>
      <v-card
        v-if="this.$auth.$state.user.user.permissions.includes('create-caught')"
        color="info"
        elevation="0"
        class="ma-3 pa-3"
        :to="'/tangkapan/formTangkapan'"
      >
        <h4 class="white--text font-weight-regular">
          <v-icon class="pr-2" color="white"> mdi-clipboard-edit </v-icon>
          Catat Tangkapan Ikan
        </h4>
      </v-card>
      <v-card
        v-if="
          this.$auth.$state.user.user.permissions.includes('create-auction')
        "
        color="info"
        elevation="0"
        class="ma-3 pa-3"
        :to="'/lelang/formLelang'"
      >
        <h4 class="white--text font-weight-regular">
          <v-icon class="pr-2" color="white"> mdi-handshake </v-icon>
          Lelang
        </h4>
      </v-card>
      <v-card
        v-if="
          this.$auth.$state.user.user.permissions.includes('create-transaction')
        "
        color="info"
        elevation="0"
        class="ma-3 pa-3"
        :to="'/transaksi/formTransaksi'"
      >
        <h4 class="white--text font-weight-regular">
          <v-icon class="pr-2" color="white"> mdi-account-cash </v-icon>
          Pembayaran
        </h4>
      </v-card>

      <!--- Rekap --->
      <div v-if="CheckRoleTPI()">
        <v-divider class="mx-3 mb-2" color="white"></v-divider>
        <span class="ml-3 caption white--text">Rekap</span>
        <v-list-item-group color="white">
          <v-list-item
            v-for="(item, i) in recap"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon color="white">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text" v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </div>
      <!--- Pendataan --->
      <v-divider class="mx-3 mb-2" color="white"></v-divider>
      <span class="ml-3 caption white--text">Pendataan</span>
      <v-list-item-group color="white">
        <v-list-item
          v-for="(item, i) in data"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content class="white--text">
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <div v-if="CheckRoleForReport()">
        <!--- Laporan --->
        <v-divider class="mx-3 mb-2" color="white"></v-divider>
        <span class="ml-3 caption white--text">Laporan</span>
        <v-list-item-group color="white">
          <v-list-item
            v-for="(item, i) in report"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon color="white">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content class="white--text">
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    value: Boolean
  },
  data() {
    return {
      clipped: false,
      miniVariant: false,
      drawer: this.$props.value,
      dashboard: [
        {
          icon: "mdi-view-dashboard",
          title: "Dashboard",
          to: "/dashboard"
        }
      ],

      recap: [],
      data: [],
      report: [
        {
          icon: "mdi-file-chart",
          title: "Produksi Ikan",
          to: "/laporan/produksiIkan"
        },
        {
          icon: "mdi-file-chart",
          title: "Transaksi Lelang",
          to: "/laporan/transaksiLelang"
        }
      ]
    };
  },
  watch: {
    value(value) {
      this.drawer = value;
    },
    drawer(value) {
      this.$emit("input", value);
    }
  },

  mounted() {
    this.ShowData();
    this.ShowRecap();
  },

  methods: {
    CheckRoleTPI() {
      if (
        this.$auth.$state.user.user.role.name == "tpi-admin" ||
        this.$auth.$state.user.user.role.name == "tpi-officer" ||
        this.$auth.$state.user.user.role.name == "tpi-cashier"
      ) {
        return true;
      }
    },
    ShowRecap() {
      if (
        this.$auth.$state.user.user.role.name == "tpi-admin" ||
        this.$auth.$state.user.user.role.name == "tpi-officer"
      ) {
        this.recap.push({
          icon: "mdi-basket",
          title: "Tangkapan Ikan",
          to: "/tangkapan/dataTangkapan"
        });
      }
      if (
        this.$auth.$state.user.user.role.name == "tpi-admin" ||
        this.$auth.$state.user.user.role.name == "tpi-officer" ||
        this.$auth.$state.user.user.role.name == "tpi-cashier"
      ) {
        this.recap.push(
          {
            icon: "mdi-file-document-multiple",
            title: "Hasil Lelang",
            to: "/lelang/dataLelang"
          },
          {
            icon: "mdi-cash-multiple",
            title: "Transaksi",
            to: "/transaksi/dataTransaksi"
          }
        );
      }
    },
    CheckRoleForReport() {
      if (
        this.$auth.$state.user.user.role.name == "tpi-admin" ||
        this.$auth.$state.user.user.role.name == "district-admin"
      ) {
        return true;
      }
    },

    ShowData() {
      //nelayan
      if (this.$auth.$state.user.user.permissions.includes("create-fisher")) {
        this.data.push({
          icon: "mdi-sail-boat",
          title: "Nelayan",
          to: "/nelayan/dataNelayan"
        });
      }
      //pembeli
      if (this.$auth.$state.user.user.permissions.includes("create-buyer")) {
        this.data.push({
          icon: "mdi-account",
          title: "Pembeli",
          to: "/pembeli/dataPembeli"
        });
      }
      //alat tangkap
      if (
        this.$auth.$state.user.user.permissions.includes("create-fishing-gear")
      ) {
        this.data.push({
          icon: "mdi-hook",
          title: "Alat Tangkap",
          to: "/alat/dataAlat"
        });
      }
      //daerah tangkapan
      if (
        this.$auth.$state.user.user.permissions.includes("create-fishing-area")
      ) {
        this.data.push({
          icon: "mdi-map-marker",
          title: "Daerah Tangkapan",
          to: "/daerah/dataDaerah"
        });
      }
      // ikan
      if (
        this.$auth.$state.user.user.permissions.includes("create-fish-type")
      ) {
        this.data.push({
          icon: "mdi-fish",
          title: "Ikan",
          to: "/ikan/dataIkan"
        });
      }
      //tpi
      if (this.$auth.$state.user.user.permissions.includes("create-tpi")) {
        this.data.push({
          icon: "mdi-home-map-marker",
          title: "TPI",
          to: "/tpi/dataTPI"
        });
      }
      //user
      if (
        this.$auth.$state.user.user.permissions.includes(
          "create-district-admin"
        ) ||
        this.$auth.$state.user.user.permissions.includes("create-tpi-admin") ||
        this.$auth.$state.user.user.permissions.includes(
          "create-tpi-officer"
        ) ||
        this.$auth.$state.user.user.permissions.includes("create-tpi-officer")
      ) {
        this.data.push({
          icon: "mdi-badge-account",
          title: "User",
          to: "/user/dataUser"
        });
      }
    }
  }
};
</script>
