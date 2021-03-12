<template>
  <v-data-table
    :headers="headers"
    :items="all_user"
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
        <v-col lg="3" md="3" v-if="CheckRoleDinas()">
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
        <v-col lg="3" md="3" v-if="CheckRoleTPI()">
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
        <v-col lg="3" md="3" v-if="CheckRoleTPI()">
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
        <v-col lg="3" md="3" v-if="CheckRoleSuperadmin()">
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
    <template v-slot:item.id="{ item }">
      <v-btn x-small color="secondary" depressed :to="'/user/edit/' + item.id">
        Edit
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialogDelete: false,
    search: "",
    headers: [
      {
        text: "Username",
        align: "start",
        sortable: false,
        value: "username"
      },
      { text: "Nama", value: "name" },
      { text: "NIK", value: "nik" },
      { text: "Alamat", value: "address" },
      { text: "Peran", value: "role.Name" },
      { text: "Status", value: "user_status.Status" },
      { text: "Aksi", value: "id", sortable: false, width: 135 }
    ],
    all_user: []
  }),

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  mounted() {
    this.getAllUser();
  },

  methods: {
    /* nyoba set permission
    CheckPermission() {
      return this.$auth.$state.user.user.role.Permission[0].Name.includes(
        "create-tpi-officer"
      );
    },
    */

    //sementara masih check dari role dulu
    CheckRoleTPI() {
      if (this.$auth.$state.user.user.role.Name == "tpi-admin") {
        return true;
      }
    },
    CheckRoleDinas() {
      if (this.$auth.$state.user.user.role.Name == "district-admin") {
        return true;
      }
    },
    CheckRoleSuperadmin() {
      if (this.$auth.$state.user.user.role.Name == "superadmin") {
        return true;
      }
    },
    popupDialogDelete(id) {
      this.dialogDelete = true;
      this.currentId = id;
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    deleteBuyer() {
      try {
        this.$api("fisher", "delete", this.currentId).finally(() => {
          this.getAllFisher();
          this.dialogDelete = false;
        });
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
