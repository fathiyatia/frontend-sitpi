<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="showTable()"
      :search="search"
      sort-by="created_at"
      sort-desc
      class="elevation-1 px-3"
    >
      <template v-slot:top>
        <v-row class="mx-0 pt-6">
          <v-col>
            <h2 class="accent--text">Data User</h2>
          </v-col>
        </v-row>
        <v-row class="mx-0 mb-6">
          <v-col lg="3" md="3" v-if="CheckPermissionCreateAdminTPI()">
            <v-btn
              class="text-capitalize"
              small
              block
              color="success"
              :to="'/user/register/adminTPI'"
            >
              + Tambah Admin TPI
            </v-btn>
          </v-col>
          <v-col lg="3" md="3" v-if="CheckPermissionCreateOfficer()">
            <v-btn
              class="text-capitalize"
              small
              block
              color="success"
              :to="'/user/register/petugasTPI'"
            >
              + Tambah Petugas TPI
            </v-btn>
          </v-col>
          <v-col lg="3" md="3" v-if="CheckPermissionCreateCashier()">
            <v-btn
              class="text-capitalize"
              small
              block
              color="success"
              :to="'/user/register/kasir'"
            >
              + Tambah Kasir
            </v-btn>
          </v-col>
          <v-col lg="3" md="3" v-if="CheckPermissionCreateDistrict()">
            <v-btn
              class="text-capitalize"
              small
              block
              color="success"
              :to="'/user/register/adminDinas'"
            >
              + Tambah Admin Dinas
            </v-btn>
          </v-col>
        </v-row>

        <template>
          <v-text-field
            outlined
            dense
            class="mt-2 px-2 mb-5 rounded-xl"
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Cari"
            single-line
            hide-details
          ></v-text-field>
        </template>
      </template>
      <template v-slot:item.role="{ item }">
        {{ item.role.name | roleFormat }}
      </template>
      <template v-slot:item.user_status.Status="{ item }">
        <v-chip :color="getColor(item.user_status.Status)" outlined small dark>
          {{ item.user_status.Status }}
        </v-chip>
      </template>
      <template v-slot:item.id="{ item }">
        <v-btn
          x-small
          color="secondary"
          depressed
          :to="'/user/edit/' + item.id"
        >
          Edit
        </v-btn>
        <v-btn
          class="ml-2"
          x-small
          color="error"
          depressed
          @click="popupDialogReset(item)"
        >
          Reset Password
        </v-btn>
      </template>
    </v-data-table>
    <!---- Alert ----->
    <template>
      <alert v-model="snackbar" :success="success" :messages="messages"></alert>
    </template>
    <!------ Dialog Reset ----->
    <v-dialog v-model="dialogReset" max-width="500px">
      <v-card>
        <v-card-title class="justify-center"
          >Reset password pada akun {{ this.currentUsername }}?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeReset">Batal</v-btn>
          <v-btn color="error" text @click="resetPassword">Reset</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  //middleware: "permission",
  filters: {
    roleFormat(value) {
      if (value == "tpi-officer") {
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
  data: () => ({
    snackbar: false,
    success: false,
    messages: "",
    dialogReset: false,
    currentUsername: null,
    search: "",
    headers: [
      {
        text: "Username",
        align: "start",
        value: "username"
      },
      { text: "Nama", value: "name" },
      { text: "NIK", value: "nik" },
      { text: "Alamat", value: "address" },
      { text: "Peran", value: "role" },
      { text: "Status", value: "user_status.Status" },
      { text: "Aksi", value: "id", sortable: false, width: 210 }
    ],
    all_user: []
  }),

  mounted() {
    this.getAllUser();
  },

  methods: {
    showTable() {
      if (this.all_user != null) {
        return this.all_user;
      }
    },
    getColor(status) {
      if (status == "Aktif") return "blue";
      else return "red";
    },

    CheckPermissionCreateDistrict() {
      return this.$auth.$state.user.user.permissions.includes(
        "create-district-admin"
      );
    },

    CheckPermissionCreateAdminTPI() {
      return this.$auth.$state.user.user.permissions.includes(
        "create-tpi-admin"
      );
    },

    CheckPermissionCreateOfficer() {
      return this.$auth.$state.user.user.permissions.includes(
        "create-tpi-officer"
      );
    },
    CheckPermissionCreateCashier() {
      return this.$auth.$state.user.user.permissions.includes(
        "create-tpi-cashier"
      );
    },

    popupDialogReset(item) {
      this.dialogReset = true;
      this.currentUsername = item.username;
      this.currentId = item.id;
    },

    closeReset() {
      this.dialogReset = false;
    },

    async resetPassword() {
      try {
        const result = await this.$api(
          "user",
          "reset_password",
          this.currentId
        ).finally(() => {
          this.getAllUser();
          this.dialogReset = false;
        });
        if (result.status === 200) {
          this.success = true;
          this.messages = "Berhasil melakukan reset password";
          this.snackbar = true;
        } else {
          this.success = false;
          this.messages = "Gagal melakukan reset password";
          this.snackbar = true;
        }
      } catch (e) {
        console.log(e);
      }
    },

    async getAllUser() {
      try {
        this.all_user = await this.$api("user", "index", null);
      } catch (e) {
        console.log(e);
      }
    },

    async updateUser() {
      try {
        const result = await this.$api(
          "user",
          "update",
          this.inputedit
        ).finally(response => {
          this.getAllFish();
          this.dialogEdit = false;
          return response;
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
