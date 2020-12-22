<template>
  <v-data-table
    :headers="headers"
    :items="transaction"
    :search="search"
    sort-by="date"
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

        <!---- Dialog Delete Item --->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Anda yakin ingin menghapus data ini?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="closeDelete">Batal</v-btn>
              <v-btn color="error" text @click="deleteItemConfirm">Hapus</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <!---- Action Button --->
    <template v-slot:item.actions="{ item }">
      <v-btn x-small color="secondary" depressed :to="'/transaksi/edit'">
        Edit
      </v-btn>

      <v-btn x-small color="error" depressed @click="deleteItem(item)">
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
        value: "transactionid"
      },
      { text: "Tanggal", value: "date" },
      { text: "Nama Pembeli", value: "buyername" },
      { text: "Nama Nelayan", value: "fishername" },
      { text: "Jenis Ikan", value: "fishtype" },
      { text: "Berat", value: "weight" },
      { text: "Total Harga (Rp)", value: "price" },
      { text: "Daerah Penjualan", value: "area" },
      { text: "Actions", value: "actions", sortable: false }
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

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.transaction = [
        {
          transactionid: "123456",
          date: "22-12-2020",
          buyername: "Mawar",
          fishername: "Bambang H",
          fishtype: "Tuna",
          weight: "50 kg",
          price: "Rp250.000",
          area: "Selat Sunda"
        },
        {
          transactionid: "654321",
          date: "22-12-2020",
          buyername: "Fulan",
          fishername: "Bambang H",
          fishtype: "Kakap",
          weight: "70 kg",
          price: "Rp500.000",
          area: "Selat Sunda"
        }
      ];
    },

    deleteItem(item) {
      this.editedIndex = this.transaction.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.transaction.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    }
  }
};
</script>
