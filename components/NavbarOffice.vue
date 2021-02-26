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
      <!--- Form --->
      <v-divider class="mx-3 mb-2" color="white"></v-divider>
      <!---  <span class="ml-3 caption white--text">Tangkapan Ikan</span> -->
      <!--- comment <v-list-item-group color="white">
        <v-list-item
          v-for="(item, i) in form"
          :key="i"
          :to="item.to"
          router
          exact
          color="success"
        >
          <v-list-item-action>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content class="white--text">
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group> --->
      <v-card
        color="info"
        elevation="0"
        class="ma-3 pa-3"
        :to="'/tangkapan/formTangkapan'"
      >
        <h4 class="white--text font-weight-regular">
          <v-icon class="pr-2" color="white"> mdi-clipboard-edit </v-icon> Catat
          Tangkapan Ikan
        </h4>
      </v-card>
      <v-card
        color="info"
        elevation="0"
        class="ma-3 pa-3"
        :to="'/lelang/formLelang'"
      >
        <h4 class="white--text font-weight-regular">
          <v-icon class="pr-2" color="white"> mdi-book-open-variant </v-icon>
          Catat Hasil Lelang
        </h4>
      </v-card>
      <!--- Rekap --->
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
          to: "/"
        }
      ],

      recap: [
        {
          icon: "mdi-basket",
          title: "Tangkapan Ikan",
          to: "/tangkapan/dataTangkapan"
        },
        {
          icon: "mdi-cash-multiple",
          title: "Hasil Lelang",
          to: "/lelang/dataLelang"
        }
      ],
      data: [
        {
          icon: "mdi-sail-boat",
          title: "Nelayan",
          to: "/nelayan/dataNelayan"
        },
        {
          icon: "mdi-account",
          title: "Pembeli",
          to: "/pembeli/dataPembeli"
        },
        {
          icon: "mdi-hook",
          title: "Alat Tangkap",
          to: "/alat/dataAlat"
        },
        {
          icon: "mdi-map-marker",
          title: "Daerah Tangkapan",
          to: "/daerah/dataDaerah"
        },
        {
          icon: "mdi-fish",
          title: "Ikan",
          to: "/ikan/dataIkan"
        },
        {
          icon: "mdi-badge-account",
          title: "User",
          to: "/user/dataUser"
        }
      ],
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
  }
};
</script>
