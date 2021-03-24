<template>
  <v-data-table
    :headers="showHeaders"
    :items="fisher"
    :search="search"
    sort-by="created_at"
    sort-desc
    class="elevation-1 px-3"
  >
    <template v-slot:top>
      <v-row class="mx-0 pt-6">
        <v-col cols="12" lg="9" md="9">
          <h2 class="accent--text">Data Nelayan</h2>
        </v-col>
        <v-col lg="3" md="3">
          <v-btn
            v-if="CheckCreatePermission()"
            small
            block
            color="success"
            :to="'/nelayan/tambahNelayan'"
          >
            + Tambah Nelayan
          </v-btn>
        </v-col>

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
              <v-btn color="error" text @click="deleteBuyer">Hapus</v-btn>
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
    <template v-slot:item.abk_total="{ item }">
      {{ item.abk_total }} orang
    </template>
    <template v-slot:item.id="{ item }">
      <v-btn
        x-small
        color="secondary"
        depressed
        :to="'/nelayan/edit/' + item.id"
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
        text: "NIK Nelayan",
        align: "start",
        value: "nik"
      },
      { text: "Nama", value: "name" },
      { text: "Status", value: "status" },
      { text: "Alamat", value: "address" },
      { text: "No. Telepon", value: "phone_number" },
      { text: "Jenis Kapal", value: "ship_type" },
      { text: "Jumlah ABK", value: "abk_total" },
      { text: "Aksi", value: "id", sortable: false, width: 135 }
    ],
    fisher: []
  }),

  mounted() {
    this.getAllFisher();
  },

  computed: {
    showHeaders() {
      if (
        this.$auth.$state.user.user.permissions.includes("update-fisher") !=
          true &&
        this.$auth.$state.user.user.permissions.includes("delete-fisher") !=
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
      return this.$auth.$state.user.user.permissions.includes("create-fisher");
    },
    popupDialogDelete(id) {
      this.dialogDelete = true;
      this.currentId = id;
    },

    deleteBuyer() {
      try {
        this.$api("fisher", "delete", this.currentId).finally(() => {
          this.getAllFisher();
          this.dialogDelete = false;
        });
      } catch (e) {
        console.log(e);
      }
    },

    async getAllFisher() {
      try {
        this.fisher = await this.$api("fisher", "index", null);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
