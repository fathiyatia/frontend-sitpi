<template>
  <v-app>
    <navbar-office v-model="drawer" v-if="officer"></navbar-office>
    <navbar-dinas v-model="drawer" v-if="district"></navbar-dinas>
    <navbar-admin v-model="drawer" v-if="admin"></navbar-admin>
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
                {{ $auth.$state.user.user.name }}
                | {{ $auth.$state.user.location }}
                <v-icon>mdi-menu-down</v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold accent--text">
                      {{ this.$auth.$state.user.user.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="pt-1 accent--text"
                      >Username :
                      {{ this.$auth.$state.user.user.username }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>

              <v-list dense>
                <v-list-item>
                  <v-list-item-title>
                    <v-card
                      elevation="0"
                      class="py-3"
                      :to="'/tangkapan/formTangkapan'"
                    >
                      <h3 class="primary--text font-weight-medium">
                        <v-icon color="primary" class="px-2">
                          mdi-lock-reset
                        </v-icon>
                        Ubah Kata Sandi
                      </h3>
                    </v-card>

                    <!----
                    <v-btn
                      block
                      color="primary"
                      text
                      class="text-capitalize"
                      :to="'/user/ubahPassword'"
                    >
                      Ubah Kata Sandi
                    </v-btn>
                    --->
                  </v-list-item-title>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-list>
                <v-list-item>
                  <v-list-item-title
                    ><v-btn color="primary" block primary @click="logout()">
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
      officer: false,
      admin: false,
      district: false,
      clipped: false,
      drawer: true,
      fixed: false,
      menu: false,

      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: ""
    };
  },

  mounted() {
    this.CheckRole();
  },

  methods: {
    CheckRole() {
      if (this.$auth.$state.user.user.role.Name == "superadmin") {
        this.admin = true;
      } else if (this.$auth.$state.user.user.role.Name == "district-admin") {
        this.district = true;
      } else {
        this.officer = true;
      }
    },
    async logout() {
      try {
        this.$api("user", "logout");
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
<style scoped>
.v-application {
  background-color: #f2f6f9;
}
</style>
