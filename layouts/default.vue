<template>
  <v-app>
    <v-navigation-drawer
      color="primary"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      width="300"
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
        <!--- Tangkapan --->
        <v-divider class="mx-3 mb-2" color="white"></v-divider>
        <span class="ml-3 caption white--text">Tangkapan Ikan</span>
        <v-list-item-group color="white">
          <v-list-item
            v-for="(item, i) in caught"
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
        <!--- Lelang --->
        <v-divider class="mx-3 mb-2" color="white"></v-divider>
        <span class="ml-3 caption white--text">Lelang</span>
        <v-list-item
          v-for="(item, i) in auction"
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
        <!--- Transaksi --->
        <v-divider class="mx-3 mb-2" color="white"></v-divider>
        <span class="ml-3 caption white--text">Transaksi</span>
        <v-list-item-group color="white">
          <v-list-item
            v-for="(item, i) in transaction"
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
        <!--- Laporan ---->
        <v-divider class="mx-3 mb-2" color="white"></v-divider>
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
          <v-list-item-content>
            <v-list-item-title class="white--text" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="primary" :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" />
      <v-toolbar-title class="white--text" v-text="title" />
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="fixed">
      <span>&copy; {{ new Date().getFullYear() }} </span>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      dashboard: [
        {
          icon: "mdi-view-dashboard",
          title: "Dashboard",
          to: "/"
        }
      ],
      caught: [
        {
          icon: "mdi-clipboard-edit",
          title: "Isi Tangkapan Ikan",
          to: "/tangkapan/formTangkapan"
        },
        {
          icon: "mdi-fish",
          title: "Data Tangkapan Ikan",
          to: "/tangkapan/dataTangkapan"
        }
      ],
      auction: [
        {
          icon: "mdi-handshake",
          title: "Data Proses Lelang",
          to: "/pelelangan/dataPelelangan"
        }
      ],
      transaction: [
        {
          icon: "mdi-clipboard-edit",
          title: "Isi Transaksi",
          to: "/transaksi/formTransaksi"
        },
        {
          icon: "mdi-cash-multiple",
          title: "Data Transaksi",
          to: "/transaksi/dataTransaksi"
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
          icon: "mdi-map-marker",
          title: "Daerah Tangkapan",
          to: "/daerah/dataDaerah"
        },
        {
          icon: "mdi-hook",
          title: "Alat Tangkap",
          to: "/alat/dataAlat"
        }
      ],
      report: [
        {
          icon: "mdi-file-chart",
          title: "Laporan",
          to: "/"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Sistem Informasi TPI"
    };
  }
};
</script>
<style scoped>
.v-application {
  background-color: #f2f6f9;
}
</style>
