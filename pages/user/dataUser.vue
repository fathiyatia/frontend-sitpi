<template>
  <v-data-table
    :headers="headers"
    :items="fisher"
    :search="search"
    sort-by="created_at"
    sort-desc
    class="elevation-1 px-3"
  >
    <template v-slot:top>
      <v-row class="mx-0 pt-6">
        <v-col cols="12" lg="9" md="9">
          <h2 class="accent--text">Data User</h2>
        </v-col>
        <v-col lg="3" md="3">
          <v-btn small block color="success" :to="'/user/register'">
            + Tambah User
          </v-btn>
        </v-col>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="justify-center"
              >Anda yakin ingin menghapus data ini?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="closeDelete">Batal</v-btn>
              <v-btn color="error" text @click="deleteBuyer">Hapus</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      <v-btn
        x-small
        color="error"
        depressed
        @click="popupDialogDelete(item.id)"
      >
        Hapus
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
      { text: "Peran", value: "role_name" },
      { text: "Status", value: "status" },
      { text: "Aksi", value: "id", sortable: false, width: 135 }
    ],
    fisher: [
      {
        username: "rahmat123",
        name: "Rahmat",
        nik: "32760987777",
        address: "Indramayu",
        role_name: "Admin TPI",
        status: "Aktif"
      }
    ]
  }),

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  mounted() {
    this.getAllFisher();
  },

  methods: {
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

    async getAllFisher() {
      try {
        this.fisher = await this.$api("fisher", "index", null);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
