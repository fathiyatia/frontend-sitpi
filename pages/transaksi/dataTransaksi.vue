<template>
  <v-data-table
    :headers="headers"
    :items="transaction"
    :search="search"
    sort-by="created_at"
    sort-desc
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="accent--text">Data Transaksi</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Anda yakin ingin menghapus data ini?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="closeDelete">Batal</v-btn>
              <v-btn color="error" text @click="deleteTransaction">Hapus</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.created_at="{ item }">
      <span>{{ new Date(item.created_at).toLocaleDateString() }}</span>
    </template>
    <template v-slot:item.price="{ item }">
      <span> Rp{{ item.price }}</span>
    </template>
    <template v-slot:item.weightunit="{ item }">
      {{ item.weight }} {{ item.weight_unit }}
    </template>
    <template v-slot:item.action="{ item }">
      <v-btn
        x-small
        color="secondary"
        depressed
        :to="'/transaksi/edit/' + item.id"
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
        text: "No. Transaksi",
        align: "start",
        sortable: false,
        value: "id"
      },
      { text: "Tanggal", value: "created_at" },
      { text: "Nama Pembeli", value: "buyer_name" },
      { text: "Nama Nelayan", value: "fisher_name" },
      { text: "Jenis Ikan", value: "fish_type" },
      { text: "Berat", value: "weightunit" },
      { text: "Total Harga", value: "price" },
      { text: "Daerah Penjualan", value: "distribution_area" },
      { text: "Actions", value: "action", sortable: false }
    ],
    transaction: []
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
    this.getAllTransaction();
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

    deleteTransaction() {
      try {
        this.$api("transaction", "delete", this.currentId).finally(() => {
          this.getAllTransaction();
          this.dialogDelete = false;
        });
      } catch (e) {
        console.log(e);
      }
    },

    async getAllTransaction() {
      try {
        this.transaction = await this.$api("transaction", "index", null);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
