<template>
  <v-app>
    <!----
    <navbar-office v-model="drawer" v-if="officer"></navbar-office>
    <navbar-dinas v-model="drawer" v-if="district"></navbar-dinas>
    <navbar-admin v-model="drawer" v-if="admin"></navbar-admin>
    ---->
    <navbar v-if="isLogin" v-model="drawer"> </navbar>

    <!-- Top Navbar --->
    <v-app-bar color="primary" :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" />
      <v-toolbar-title class="white--text" v-text="title" />
      <v-spacer></v-spacer>
      <!-- Toggle Button for User --->
      <template>
        <div v-if="isLogin" class="text-center">
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
                <span
                  v-if="$auth.$state.user.user.role.name != 'superadmin'"
                  class="ml-1"
                >
                  | {{ $auth.$state.user.location }}
                </span>
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
                      ><v-row class="mt-1" no-gutters>
                        <v-col>
                          Username
                        </v-col>
                        <v-col>
                          : {{ this.$auth.$state.user.user.username }}
                        </v-col>
                      </v-row>
                      <v-row class="mt-2" no-gutters>
                        <v-col>
                          Peran
                        </v-col>
                        <v-col>
                          :
                          {{
                            this.$auth.$state.user.user.role.name | roleFormat
                          }}
                        </v-col>
                      </v-row>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <div v-if="this.$auth.$state.user.user.role.name != 'superadmin'">
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-title>
                      <v-card
                        elevation="0"
                        class="py-2"
                        :to="'/user/ubahPassword'"
                      >
                        <h3 class="primary--text font-weight-medium">
                          <v-icon color="primary" class="px-2">
                            mdi-lock-reset
                          </v-icon>
                          Ubah Kata Sandi
                        </h3>
                      </v-card>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </div>
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
  filters: {
    roleFormat(value) {
      if (value == "tpi officer") {
        return "Petugas TPI";
      } else if (value == "tpi-cashier") {
        return "Kasir TPI";
      } else if (value == "tpi-admin") {
        return "Admin TPI";
      } else if (value == "district-admin") {
        return "Admin Dinas";
      } else if (value == "superadmin") {
        return "Superadmin";
      }
    }
  },
  data() {
    return {
      isLogin: true,
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

  methods: {
    logout() {
      try {
        this.$router.push("/login");
        this.isLogin = false;
        this.$api("user", "logout").finally(() => {
          this.$router.push("/login");
        });
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
