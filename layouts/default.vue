<template>
  <v-app>
    <v-navigation-drawer
      color="primary"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-container>
        <v-row>
          <v-col cols="4"> </v-col>
          <v-col cols="8" class="white--text">
            <h3>SITPI</h3>
          </v-col>
        </v-row>
      </v-container>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
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

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
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
      items: [
        {
          icon: "mdi-view-dashboard",
          title: "Dashboard",
          to: "/"
        },
        {
          icon: "mdi-fish",
          title: "Form Tangkapan Ikan",
          to: "/tangkapan/formTangkapan"
        },
        {
          icon: "mdi-cash",
          title: "Form Transaksi",
          to: "/transaksi/formTransaksi"
        },
        {
          icon: "mdi-fish",
          title: "Data Tangkapan Ikan",
          to: "/tangkapan/dataTangkapan"
        },
        {
          icon: "mdi-handshake",
          title: "Data Lelang",
          to: "/pelelangan/dataPelelangan"
        },
        {
          icon: "mdi-cash-multiple",
          title: "Data Transaksi",
          to: "/transaksi/dataTransaksi"
        },
        {
          icon: "mdi-sail-boat",
          title: "Data Nelayan",
          to: ""
        },
        {
          icon: "mdi-account",
          title: "Data Pembeli",
          to: ""
        },
        {
          icon: "mdi-cog",
          title: "Admin",
          to: ""
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
</script>
<style scoped>
.v-application {
  background-color: #F2F6F9;
}
</style>