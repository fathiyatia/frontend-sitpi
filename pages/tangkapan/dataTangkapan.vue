<template>
  <v-data-table
    :headers="showHeaders"
    :items="caughtfish"
    sort-by="created_at"
    sort-desc
    class="elevation-1 px-3"
  >
    <template v-slot:top>
      <v-row class="mx-0 px-4 pt-6">
        <h2 class="accent--text">Data Tangkapan Ikan</h2>
      </v-row>
      <v-row class="mx-0 px-4 pt-2 pb-6"
        ><span>
          Data tangkapan ikan yang didaratkan di
          <span class="primary--text font-weight-bold">TPI xxx </span> pada
          tanggal

          <span class="primary--text font-weight-bold">{{
            new Date().toLocaleDateString()
          }}</span>
        </span>
      </v-row>

      <v-card
        elevation="0"
        rounded
        class="mx-3 px-4 pt-5 mb-6 rounded-lg"
        color="#C5DEF0"
      >
        <span class="px-2 primary--text font-weight-bold">
          <v-icon medium color="primary">mdi-magnify</v-icon> Cari
        </span>
        <v-row no-gutters class="pt-3">
          <v-col cols="12" lg="6" md="6" class="px-2">
            <v-autocomplete
              solo
              dense
              block
              single-line
              label="Nama Nelayan"
              v-model="input.fisherid"
              :items="fisher"
              clearable
              item-text="name"
              item-value="id"
              @change="getAllCaught()"
            >
              <template v-slot:selection="{ item }">{{
                item.name
              }}</template></v-autocomplete
            >
          </v-col>

          <v-col lg="6" md="6" class="px-2">
            <v-autocomplete
              solo
              dense
              block
              single-line
              label="Jenis Ikan"
              v-model="input.fish"
              :items="fishtype"
              clearable
              item-text="name"
              item-value="id"
              @change="getAllCaught()"
            >
              <template v-slot:selection="{ item }">{{
                item.name
              }}</template></v-autocomplete
            >
          </v-col>
        </v-row>
      </v-card>

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
    </template>

    <template v-slot:item.created_at="{ item }">
      <span>{{ new Date(item.created_at).toLocaleDateString() }}</span>
    </template>
    <template v-slot:item.weight="{ item }">
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
    input: {
      fisherid: "0",
      fish: "0"
    },
    all_headers: [
      {
        text: "NIK Nelayan",
        align: "start",
        sortable: false,
        value: "fisher_nik"
      },
      { text: "Nama Nelayan", value: "fisher_name" },
      { text: "Jumlah Hari Trip", value: "trip_day" },
      { text: "Alat Tangkap", value: "fishing_gear" },
      { text: "Daerah Tangkapan", value: "fishing_area" },
      { text: "Jenis Ikan", value: "fish_type" },
      { text: "Berat", value: "weight" },
      { text: "Aksi", value: "id", sortable: false, width: 135 }
    ],
    fisher: [],
    fishtype: [],
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
    this.getAllFish();
    this.getAllFisher();
  },

  computed: {
    showHeaders() {
      if (this.input.fish == "0") {
        if (this.input.fisherid == "0") {
          return this.all_headers;
        } else {
          return this.all_headers.filter(
            header =>
              header.text !== "Nama Nelayan" && header.text !== "NIK Nelayan"
          );
        }
      } else {
        if (this.input.fisherid == "0") {
          return this.all_headers.filter(
            header => header.text !== "Jenis Ikan"
          );
        } else {
          return this.all_headers.filter(
            header =>
              header.text !== "Jenis Ikan" &&
              header.text !== "Nama Nelayan" &&
              header.text !== "NIK Nelayan"
          );
        }
      }
    }
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
        this.caughtfish = await this.$api("caught", "index", this.input);
      } catch (e) {
        console.log(e);
      }
    },
    async getAllFish() {
      try {
        this.fishtype = await this.$api("fish", "index", null);
      } catch (e) {
        console.log(e);
      }
    },
    async getAllFisher() {
      try {
        this.fisher = await this.$api("fisher", "inquiry", null);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
