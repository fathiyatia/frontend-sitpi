<template>
  <v-data-table
    :headers="headers"
    :items="caughtfish"
    :search="search"
    sort-by="date"
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
      <v-btn x-small color="secondary" depressed :to="'/tangkapan/edit'">
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
        value: "fisherid"
      },
      { text: "Nama Nelayan", value: "fishername" },
      { text: "Tanggal", value: "date" },
      { text: "Jenis Ikan", value: "fishtype" },
      { text: "Berat", value: "weight" },
      { text: "Alat Tangkap", value: "geartype" },
      { text: "Daerah Tangkapan", value: "area" },
      { text: "Actions", value: "actions", sortable: false }
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

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.caughtfish = [
        {
          fisherid: "3279567891123456",
          fishername: "Bambang H",
          date: "22-12-2020",
          fishtype: "Tuna",
          weight: "100 Kg",
          geartype: "Jaring",
          area: "Selat Sunda"
        },
        {
          fisherid: "3279567891133356",
          fishername: "Herman B",
          date: "22-12-2020",
          fishtype: "Tuna",
          weight: "80 Kg",
          geartype: "Jaring",
          area: "Selat Sunda"
        }
      ];
    },

    deleteItem(item) {
      this.editedIndex = this.caughtfish.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.caughtfish.splice(this.editedIndex, 1);
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
