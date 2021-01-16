<template>
  <v-data-table
    :headers="headers"
    :items="area"
    :search="search"
    sort-by="created_at"
    sort-desc
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Data Daerah Tangkapan Ikan</v-toolbar-title>
        <v-spacer></v-spacer>
        <template>
          <v-btn small color="success" :to="'/daerah/tambahDaerah'">
            + Tambah Daerah
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
          outlined
          dense
          class="mt-2 px-5 mb-5 rounded-xl"
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
        :to="'/daerah/edit/' + item.id"
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
        text: "Nama Daerah",
        align: "start",
        sortable: false,
        value: "nik"
      },
      { text: "D", value: "south_latitude_degree" },
      { text: "M", value: "south_latitude_minute" },
      { text: "S", value: "south_latitude_second" },
      { text: "D", value: "east_latitude_degree" },
      { text: "M", value: "east_latitude_minute" },
      { text: "S", value: "east_latitude_second" },
      { text: "Aksi", value: "id", sortable: false }
    ],
    area: []
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
    this.getAllArea();
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

    deleteArea() {
      try {
        this.$api("buyer", "delete", this.currentId).finally(() => {
          this.getAllArea();
          this.dialogDelete = false;
        });
      } catch (e) {
        console.log(e);
      }
    },

    async getAllArea() {
      try {
        this.area = await this.$api("buyer", "index", null);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
