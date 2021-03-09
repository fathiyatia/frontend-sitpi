<template>
  <v-data-table
    :headers="headers"
    :items="gear"
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

        <!--Dialog Tambah Alat Tangkap--->
        <v-dialog v-model="dialogTambah" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Tambah Alat Tangkap</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form
                  class=""
                  no-gutters
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-text-field
                    label="Nama Alat Tangkap"
                    v-model="input.name"
                    :rules="required"
                    required
                  ></v-text-field>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="accent" text @click="closeTambah">
                Batal
              </v-btn>
              <v-btn color="primary" text @click="storeGear">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!--Dialog Edit--->
        <v-dialog v-model="dialogEdit" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Edit Alat Tangkap </span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-text-field
                    label="Nama Alat Tangkap"
                    required
                    v-model="inputedit.name"
                  ></v-text-field>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="accent" text @click="closeEdit">
                Batal
              </v-btn>
              <v-btn color="primary" text @click="updateGear()">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--Dialog Delete--->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="justify-center"
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
      <v-btn x-small color="secondary" depressed @click="getById(item.id)">
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
        text: "Kode Alat",
        align: "start",
        sortable: false,
        value: "code"
      },
      {
        text: "Jenis Alat Tangkap",
        value: "name"
      },
      { text: "Aksi", value: "id", sortable: false }
    ],
    input: {
      name: null
    },
    inputedit: {
      name: null
    },
    gear: []
  }),

  watch: {
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

    popupDialogEdit(id) {
      this.dialogEdit = true;
      this.currentId = id;
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    closeTambah() {
      this.dialogTambah = false;
    },

    closeEdit() {
      this.dialogEdit = false;
    },

    deleteGear() {
      try {
        this.$api("fishing_gear", "delete", this.currentId).finally(() => {
          this.getAllGear();
          this.dialogDelete = false;
        });
      } catch (e) {
        console.log(e);
      }
    },

    async getAllGear() {
      try {
        this.gear = await this.$api("fishing_gear", "index", null);
      } catch (e) {
        console.log(e);
      }
    },

    //res
    async storeGear() {
      if (this.$refs.form.validate()) {
        try {
          const result = await this.$api(
            "fishing_gear",
            "store",
            this.input
          ).finally(response => {
            this.getAllGear();
            this.dialogTambah = false;
            this.input.name = null;
            return response;
          });
        } catch (e) {
          console.log(e);
        }
      }
    },

    async getById(id) {
      try {
        this.inputedit = await this.$api("fishing_gear", "get_by_id", id);
        this.dialogEdit = true;
      } catch (e) {
        console.log(e);
      }
    },

    //res
    async updateGear() {
      try {
        const result = await this.$api(
          "fishing_gear",
          "update",
          this.inputedit
        ).finally(response => {
          this.getAllGear();
          this.dialogEdit = false;
          return response;
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
