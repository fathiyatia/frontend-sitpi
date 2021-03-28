<template>
  <v-data-table
    :headers="showHeaders"
    :items="buyer"
    :search="search"
    sort-by="created_at"
    sort-desc
    class="elevation-1 px-3"
  >
    <template v-slot:top>
      <v-row class="mx-0 pt-6">
        <v-col cols="12" lg="9" md="9">
          <h2 class="accent--text">Data Pembeli</h2>
        </v-col>
        <v-col lg="3" md="3">
          <v-btn
            v-if="CheckCreatePermission()"
            small
            block
            color="success"
            :to="'/pembeli/tambahPembeli'"
          >
            + Tambah Pembeli
          </v-btn>
        </v-col>
        <!---- Alert ----->
        <template>
          <alert
            v-model="snackbar"
            :success="success"
            :messages="messages"
          ></alert>
        </template>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Anda yakin ingin menghapus data ini?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialogDelete = false"
                >Batal</v-btn
              >
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
      <v-btn
        x-small
        color="secondary"
        depressed
        :to="'/pembeli/edit/' + item.id"
      >
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
    snackbar: false,
    success: false,
    messages: "",
    dialogDelete: false,
    search: "",
    headers: [
      {
        text: "NIK Pembeli",
        align: "start",
        value: "nik"
      },
      { text: "Nama", value: "name" },
      { text: "Status", value: "status" },
      { text: "Alamat", value: "address" },
      { text: "No. Telepon", value: "phone_number" },
      { text: "Aksi", value: "id", sortable: false, width: 135 }
    ],
    buyer: []
  }),

  mounted() {
    this.getAllBuyer();
  },

  computed: {
    showHeaders() {
      if (
        this.$auth.$state.user.user.permissions.includes("update-buyer") !=
          true &&
        this.$auth.$state.user.user.permissions.includes("delete-buyer") != true
      ) {
        return this.headers.filter(header => header.text !== "Aksi");
      } else {
        return this.headers;
      }
    }
  },

  methods: {
    CheckCreatePermission() {
      return this.$auth.$state.user.user.permissions.includes("create-buyer");
    },
    popupDialogDelete(id) {
      this.dialogDelete = true;
      this.currentId = id;
    },

    async deleteBuyer() {
      try {
        const result = await this.$api(
          "buyer",
          "delete",
          this.currentId
        ).finally(() => {
          this.getAllBuyer();
          this.dialogDelete = false;
        });
        if (result.status === 200) {
          this.success = true;
          this.messages = "Data berhasil dihapus";
          this.snackbar = true;
        } else {
          this.success = false;
          this.messages = "Data gagal dihapus";
          this.snackbar = true;
        }
      } catch (e) {
        console.log(e);
        this.success = false;
        this.messages = "Data gagal dihapus";
        this.snackbar = true;
      }
    },

    async getAllBuyer() {
      try {
        this.buyer = await this.$api("buyer", "index", null);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
