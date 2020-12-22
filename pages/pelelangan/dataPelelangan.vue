<template>
  <v-data-table
    :headers="headers"
    :items="auction"
    :search="search"
    sort-by="date"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="accent--text"
          >Data Pelelangan Ikan</v-toolbar-title
        >
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
      <v-btn x-small color="secondary" depressed :to="'/pelelangan/edit'">
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
        text: "No. Pelelangan",
        align: "start",
        sortable: false,
        value: "auctionid"
      },
      { text: "Tanggal", value: "date" },
      { text: "Nelayan", value: "fishername" },
      { text: "Jenis Ikan", value: "fishtype" },
      { text: "Berat", value: "weight" },
      { text: "Status Pelelangan", value: "status" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    auction: []
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
      this.auction = [
        {
          auctionid: "123456",
          date: "23-12-2020",
          fishername: "Bambang H",
          fishtype: "Tuna",
          weight: "50 kg",
          status: "Belum Terjual"
        },
        {
          auctionid: "666456",
          date: "22-12-2020",
          fishername: "Herman B",
          fishtype: "Tuna",
          weight: "70 kg",
          status: "Sudah Terjual"
        }
      ];
    },

    deleteItem(item) {
      this.editedIndex = this.auction.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.auction.splice(this.editedIndex, 1);
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
