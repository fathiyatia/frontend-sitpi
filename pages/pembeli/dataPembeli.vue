<template>
  <v-data-table
    :headers="headers"
    :items="buyer"
    :search="search"
    sort-by="date"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Data Pembeli</v-toolbar-title>
        <v-spacer></v-spacer>
        <template>
          <v-btn small color="success" :to="'/pembeli/tambahPembeli'">
            + Tambah Pembeli
          </v-btn>
        </template>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
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
      </v-toolbar>
      <template>
        <v-text-field
          class="px-5 mb-5"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
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
    dialogDelete: false,
    search: "",
    headers: [
      {
        text: "NIK Pembeli",
        align: "start",
        sortable: false,
        value: "nik"
      },
      { text: "Nama", value: "name" },
      { text: "Alamat", value: "address" },
      { text: "Actions", value: "id", sortable: false }
    ],
    buyer: []
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  mounted() {
    this.getAllBuyer();
  },

  methods: {
    popupDialogDelete(id) {
      this.dialogDelete = true;
      this.currentId = id;
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    deleteBuyer() {
      try {
        this.$api("buyer", "delete", this.currentId).finally(() => {
          this.getAllBuyer();
          this.dialogDelete = false;
        });
      } catch (e) {
        console.log(e);
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
