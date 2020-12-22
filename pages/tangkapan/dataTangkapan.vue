<template>
  <v-data-table
    :headers="headers"
    :items="caughtfish"
    :search="search"
    sort-by="fishername"
    class="elevation-1"
  >
    <!---- Template 1 isinya judul, search, dialog --->
    <template v-slot:top>
      <v-toolbar flat>
        <!---- Judul Tabel --->
        <v-toolbar-title class="accent--text"
          >Data Tangkapan Ikan</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <!---- Buat tempat search --->
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

        <!---- Dialog Buat Edit Item --->
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Edit</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.fisherid"
                      label="NIK"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="fishtype"
                      label="Jenis Ikan"
                      outlined
                      v-model="editedItem.fishtype"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="geartype"
                      label="Alat Tangkap"
                      outlined
                      v-model="editedItem.geartype"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.weight"
                      label="Berat"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="unittype"
                      label="Satuan"
                      outlined
                      v-model="editedItem.unit"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.area"
                      label="Daerah Tangkapan"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Batal
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!---- End of Dialog Buat Edit Item--->

        <!---- Dialog Buat Delete Item --->
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
        <!---- End of Dialog Buat Delete Item --->
      </v-toolbar>
    </template>
    <!---- Template 2 isinya action button --->
    <template v-slot:item.actions="{ item }">
      <v-btn x-small color="secondary" depressed @click="editItem(item)">
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
    dialog: false,
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
    caughtfish: [],
    editedIndex: -1,
    editedItem: {
      fisherid: "",
      fishtype: "",
      weight: "",
      geartype: "",
      area: ""
    },
    defaultItem: {
      fisherid: "",
      fishername: "",
      date: "",
      fishtype: "",
      weight: "",
      geartype: "",
      area: ""
    }
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
          weight: "30 Kg",
          geartype: "Jaring",
          area: "Selat Sunda"
        },
        {
          fisherid: "3279567891133356",
          fishername: "Herman B",
          date: "22-12-2020",
          fishtype: "Tuna",
          weight: "50 Kg",
          geartype: "Jaring",
          area: "Selat Sunda"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.caughtfish.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
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

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.caughtfish[this.editedIndex], this.editedItem);
      } else {
        this.caughtfish.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
