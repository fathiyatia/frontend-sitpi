<template>
  <v-data-table
    :headers="headers"
    :items="fisher"
    :search="search"
    sort-by="date"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Data Nelayan</v-toolbar-title>
        <v-spacer></v-spacer>
        <template>
          <v-btn small color="success" :to="'/nelayan/tambahNelayan'">
            + Tambah Nelayan
          </v-btn>
        </template>
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
    <!---- Action Button --->
    <template v-slot:item.actions="{ item }">
      <v-btn x-small color="secondary" depressed :to="'/nelayan/edit'">
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
        text: "NIK Nelayan",
        align: "start",
        sortable: false,
        value: "fisherid"
      },
      { text: "Nama", value: "name" },
      { text: "Alamat", value: "address" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    fisher: []
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
      this.fisher = [
        {
          fisherid: "123456",
          name: "Bambang H",
          address: "Bogor"
        },
        {
          fisherid: "123456",
          name: "Herman H",
          address: "Sukabumi"
        }
      ];
    },

    deleteItem(item) {
      this.editedIndex = this.fisher.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.fisher.splice(this.editedIndex, 1);
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
