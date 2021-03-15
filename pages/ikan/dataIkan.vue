<template>
  <v-data-table
    :headers="showHeaders"
    :items="fish"
    :search="search"
    sort-by="created_at"
    sort-desc
    class="elevation-1 px-3"
  >
    <template v-slot:top>
      <v-row class="mx-0  pt-6">
        <v-col cols="12" lg="9" md="9">
          <h2 class="accent--text">Data Ikan</h2>
        </v-col>
        <v-col lg="3" md="3">
          <v-btn
            v-if="CheckCreatePermission()"
            block
            small
            color="success"
            @click="popupDialogTambah()"
          >
            + Tambah Ikan
          </v-btn>
        </v-col>

        <!--Dialog Tambah Ikan--->
        <v-dialog v-model="dialogTambah" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Tambah Ikan</span>
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
                    label="Kode Ikan"
                    v-model="input.code"
                    :rules="required"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Nama Ikan"
                    v-model="input.name"
                    :rules="required"
                    required
                  ></v-text-field>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="accent"
                text
                @click="(dialogTambah = false), $refs.form.reset()"
              >
                Batal
              </v-btn>
              <v-btn color="primary" text @click="storeFish">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!--Dialog Edit--->
        <v-dialog v-model="dialogEdit" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Edit Ikan </span>
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
                    label="Kode Ikan"
                    required
                    v-model="inputedit.code"
                  ></v-text-field>
                  <v-text-field
                    label="Nama Ikan"
                    required
                    v-model="inputedit.name"
                  ></v-text-field>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="accent" text @click="dialogEdit = false">
                Batal
              </v-btn>
              <v-btn color="primary" text @click="updateFish()">
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
              <v-btn color="primary" text @click="dialogDelete = false"
                >Batal</v-btn
              >
              <v-btn color="error" text @click="deleteFish">Hapus</v-btn>
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
        text: "Kode Ikan",
        align: "start",

        value: "code"
      },
      { text: "Nama Ikan", value: "name" },
      { text: "Aksi", value: "id" }
    ],
    input: {
      name: null,
      code: null
    },
    inputedit: {
      name: null,
      code: null
    },
    fish: []
  }),

  mounted() {
    this.getAllFish();
  },

  computed: {
    showHeaders() {
      if (
        this.$auth.$state.user.user.permissions.includes("update-fish-type") !=
          true &&
        this.$auth.$state.user.user.permissions.includes("delete-fish-type") !=
          true
      ) {
        return this.headers.filter(header => header.text !== "Aksi");
      } else {
        return this.headers;
      }
    }
  },

  methods: {
    CheckCreatePermission() {
      return this.$auth.$state.user.user.permissions.includes(
        "create-fish-type"
      );
    },
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

    deleteFish() {
      try {
        this.$api("fish", "delete", this.currentId).finally(() => {
          this.getAllFish();
          this.dialogDelete = false;
        });
      } catch (e) {
        console.log(e);
      }
    },

    async getAllFish() {
      try {
        this.fish = await this.$api("fish", "index", null);
      } catch (e) {
        console.log(e);
      }
    },
    //res
    async storeFish() {
      if (this.$refs.form.validate()) {
        try {
          const result = await this.$api("fish", "store", this.input).finally(
            response => {
              this.getAllFish();
              this.dialogTambah = false;
              this.$refs.form.reset();
              return response;
            }
          );
        } catch (e) {
          console.log(e);
        }
      }
    },

    async getById(id) {
      try {
        this.inputedit = await this.$api("fish", "get_by_id", id);
        this.dialogEdit = true;
      } catch (e) {
        console.log(e);
      }
    },
    // res
    async updateFish() {
      try {
        const result = await this.$api(
          "fish",
          "update",
          this.inputedit
        ).finally(response => {
          this.getAllFish();
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
