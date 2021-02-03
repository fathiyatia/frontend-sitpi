<template>
  <v-app>
    <navbar-office v-model="drawer" v-if="office"></navbar-office>
    <navbar-dinas v-model="drawer" v-else></navbar-dinas>
    <!-- Top Navbar --->
    <v-app-bar color="primary" :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" />
      <v-toolbar-title class="white--text" v-text="title" />
      <v-spacer></v-spacer>
      <!-- Toggle Button for User --->
      <template>
        <div class="text-center">
          <v-menu
            v-model="menu"
            :close-on-content-click="true"
            :nudge-width="50"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="text-capitalize"
                color="white"
                dark
                text
                tile
                v-bind="attrs"
                v-on="on"
              >
                Rahmat | TPI Indramayu <v-icon>mdi-menu-down</v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold accent--text"
                      >Rahmat</v-list-item-title
                    >
                    <v-list-item-subtitle class="pt-1 accent--text"
                      >Username : rahmat123</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>

              <v-list dense>
                <v-list-item>
                  <v-list-item-title
                    ><v-btn
                      color="primary"
                      text
                      class="text-capitalize"
                      :to="'/user/ubahPassword'"
                    >
                      Ubah Kata Sandi
                    </v-btn></v-list-item-title
                  >
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-list>
                <v-list-item>
                  <v-list-item-title
                    ><v-btn color="primary" block primary :to="'/'">
                      Keluar
                    </v-btn></v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </template>
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
      office: true,
      clipped: false,
      drawer: false,
      fixed: false,
      menu: false,

      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: ""
    };
  }
};
</script>
<style scoped>
.v-application {
  background-color: #f2f6f9;
}
</style>
