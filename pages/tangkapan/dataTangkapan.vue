<template>
  <v-data-table
    :headers="headers"
    :items="caughtfish"
    :search="search"
    sort-by="created_at"
    sort-desc
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="accent--text"
          >Data Tangkapan Ikan</v-toolbar-title
        >
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
              <v-btn color="error" text @click="deleteCaught">Hapus</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.created_at="{ item }">
      <span>{{ new Date(item.created_at).toLocaleDateString() }}</span>
    </template>
    <template v-slot:item.weightunit="{ item }">
      {{ item.weight }} {{ item.weight_unit }}
    </template>
    <template v-slot:item.id="{ item }">
      <v-btn
        x-small
        color="secondary"
        depressed
        :to="'/tangkapan/edit/' + item.id"
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
    geartype: ["Jaring", "Pancingan"],
    fishtype: ["Tuna", "Bandeng", "Bawal", "Kakap"],
    unittype: ["Kg", "Kwintal", "Ton"],
    dialogDelete: false,
    search: "",
    headers: [
      {
        text: "NIK Nelayan",
        align: "start",
        sortable: false,
        value: "fisher_nik"
      },
      { text: "Nama Nelayan", value: "fisher_name" },
      { text: "Tanggal", value: "created_at" },
      { text: "Jenis Ikan", value: "fish_type" },
      { text: "Berat", value: "weightunit" },
      { text: "Alat Tangkap", value: "fishing_gear" },
      { text: "Daerah Tangkapan", value: "fishing_area" },
      { text: "Actions", value: "id", sortable: false }
    ],
    caughtfish: []
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
    this.getAllCaught();
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

    deleteCaught() {
      try {
        this.$api("caught", "delete", this.currentId).finally(() => {
          this.getAllCaught();
          this.dialogDelete = false;
        });
      } catch (e) {
        console.log(e);
      }
    },

    async getAllCaught() {
      try {
        this.caughtfish = await this.$api("caught", "index", null);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
