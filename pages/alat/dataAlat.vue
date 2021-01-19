<template>
  <v-data-table
    :headers="headers"
    :items="buyer"
    :search="search"
    sort-by="created_at"
    sort-desc
    class="elevation-1 px-3"
  >
    <template v-slot:top>
      <v-row class="mx-0  pt-6">
        <v-col cols="12" lg="9" md="9">
          <h2 class="accent--text">Data Alat Tangkap</h2>
        </v-col>
        <v-col lg="3" md="3">
          <v-btn block small color="success" @click="popupDialogTambah()">
            + Tambah Alat Tangkap
          </v-btn>
        </v-col>

        <!--Dialog Tambah--->
        <v-dialog v-model="dialogTambah" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Tambah Alat Tangkap</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-text-field
                    label="Nama Alat Tangkap"
                    required
                  ></v-text-field>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="accent" text @click="closeTambah">
                Batal
              </v-btn>
              <v-btn color="primary" text @click="closeTambah">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!--Dialog Edit--->
        <v-dialog v-model="dialogEdit" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Edit Alat Tangkap</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-text-field
                    label="Nama Alat Tangkap"
                    required
                    v-model="input.name"
                  ></v-text-field>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="accent" text @click="closeEdit">
                Batal
              </v-btn>
              <v-btn color="primary" text @click="closeEdit">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--Dialog Delete--->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Anda yakin ingin menghapus data ini?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="closeDelete">Batal</v-btn>
              <v-btn color="error" text @click="deleteGear">Hapus</v-btn>
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
      <v-btn x-small color="secondary" depressed @click="popupDialogEdit()">
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
    valid: true,
    required: [v => !!v || "Data ini harus diisi"],
    dialogDelete: false,
    dialogTambah: false,
    dialogEdit: false,
    search: "",
    headers: [
      {
        text: "Jenis Alat Tangkap",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Aksi", value: "id", sortable: false }
    ],
    input: {
      name: null
    },
    gear: [],
    buyer: []
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogTambah(val) {
      val || this.closeTambah();
    },
    dialogEdit(val) {
      val || this.closeEdit();
    }
  },

  mounted() {
    this.getAllGear();
  },

  methods: {
    popupDialogDelete(id) {
      this.dialogDelete = true;
      this.currentId = id;
    },

    popupDialogTambah() {
      this.dialogTambah = true;
    },
    popupDialogEdit() {
      this.dialogEdit = true;
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeTambah() {
      this.dialogTambah = false;
    },

    closeEdit() {
      this.dialogEdit = false;
    },

    deleteGear() {
      try {
        this.$api("buyer", "delete", this.currentId).finally(() => {
          this.getAllBuyer();
          this.dialogDelete = false;
        });
      } catch (e) {
        console.log(e);
      }
    },

    async getAllGear() {
      try {
        this.buyer = await this.$api("buyer", "index", null);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
