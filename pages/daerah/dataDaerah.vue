<template>
  <div>
    <v-data-table
      :headers="showHeaders"
      :items="area"
      :search="search"
      sort-by="created_at"
      sort-desc
      class="elevation-1 px-3"
    >
      <template v-slot:top>
        <v-row class="mx-0  pt-6">
          <v-col cols="12" lg="9" md="9">
            <h2 class="accent--text">Data Daerah Tangkapan</h2>
          </v-col>
          <v-col lg="3" md="3">
            <v-btn
              v-if="CheckCreatePermission()"
              block
              small
              color="success"
              :to="'/daerah/tambahDaerah'"
            >
              + Tambah Daerah
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
                <v-btn color="error" text @click="deleteArea">Hapus</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!------- Dialog Map -------->
          <v-dialog v-model="dialogMap">
            <v-card>
              <v-toolbar tile dark color="primary">
                <v-toolbar-title>Peta Daerah Tangkapan</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon dark @click="dialogMap = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn></v-toolbar
              >
              <v-row no-gutters>
                <v-img contain src="/peta.jpg">
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="primary"
                      ></v-progress-circular>
                    </v-row> </template
                ></v-img>
              </v-row>
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
    <br />
    <v-row class="mx-0 px-4 pt-3 pb-2">
      <v-btn small color="secondary" @click="dialogMap = true"
        >Lihat Peta</v-btn
      >
    </v-row>
    <v-row class="mx-0 px-4 pt-3 pb-2">
      <h4 class="accent--text">Keterangan</h4>
    </v-row>
    <v-row class="mx-0 px-4 pt-1">
      <span>D : Degrees / Derajat</span>
    </v-row>
    <v-row class="mx-0 px-4 pt-1">
      <span>M : Minutes / Menit</span>
    </v-row>
    <v-row class="mx-0 px-4 pt-1">
      <span>S : Seconds / Detik</span>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialogDelete: false,
    dialogMap: false,
    search: "",
    headers: [
      {
        text: "Kode Daerah Tangkapan",
        align: "start",
        value: "name"
      },
      { text: "Bujur D", value: "east_longitude_degree" },
      { text: "Bujur M", value: "east_longitude_minute" },
      { text: "Bujur S", value: "east_longitude_second" },
      { text: "Lintang D", value: "south_latitude_degree" },
      { text: "Lintang M", value: "south_latitude_minute" },
      { text: "Lintang S", value: "south_latitude_second" },
      { text: "Aksi", value: "id", sortable: false, width: 135 }
    ],
    area: []
  }),

  mounted() {
    this.getAllArea();
  },

  computed: {
    showHeaders() {
      if (
        this.$auth.$state.user.user.permissions.includes(
          "update-fishing-area"
        ) != true &&
        this.$auth.$state.user.user.permissions.includes(
          "delete-fishing-area"
        ) != true
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
        "create-fishing-area"
      );
    },
    popupDialogDelete(id) {
      this.dialogDelete = true;
      this.currentId = id;
    },

    deleteArea() {
      try {
        this.$api("fishing_area", "delete", this.currentId).finally(() => {
          this.getAllArea();
          this.dialogDelete = false;
        });
      } catch (e) {
        console.log(e);
      }
    },

    async getAllArea() {
      try {
        this.area = await this.$api("fishing_area", "index", null);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
