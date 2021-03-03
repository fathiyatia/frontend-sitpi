<template>
  <!---- Dummy ----->
  <v-data-table
    :headers="showHeaders"
    :items="dummy"
    sort-by="created_at"
    class="elevation-1 px-3"
  >
    <template v-slot:top>
      <v-row class="mx-0 px-4 pt-6">
        <h2 class="accent--text">Data Tangkapan Ikan</h2>
        <!---- Test Alert    
        <template>
          <v-btn dark color="orange darken-2" @click="testalert()">
            Open Snackbar
          </v-btn>
          <alert
            v-model="snackbar"
            :success="success"
            :messages="messages"
          ></alert>
        </template> --->
      </v-row>
      <v-row class="mx-0 px-4 pt-2 pb-6"
        ><span>
          Data tangkapan ikan yang didaratkan di
          <span class="primary--text font-weight-bold">TPI xxx </span> pada
          tanggal

          <date-format></date-format>
        </span>
      </v-row>
      <!---- Filter ----->
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
          <v-col cols="12" lg="4" sm="6" class="px-2">
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

          <v-col cols="12" lg="4" sm="6" class="px-2">
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
          <v-col cols="12" lg="4" sm="6" class="px-2">
            <v-select
              :items="status"
              item-text="status"
              item-value="id"
              label="Status Pelelangan"
              solo
              dense
              block
              single-line
              clearable
              v-model="input.status"
              @change="getAllCaught()"
            ></v-select>
          </v-col>
        </v-row>
      </v-card>

      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="justify-center"
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
    <template v-slot:item.weight="{ item }">
      {{ item.weight }} {{ item.weight_unit }}
    </template>

    <!---- Uncomment Dummy
    <template v-slot:item.created_at="{ item }">
      <span
        >{{
          new Date(item.created_at)
            .getHours()
            .toLocaleString()
            .padStart(2, "0")
        }}:{{
          new Date(item.created_at)
            .getMinutes()
            .toLocaleString()
            .padStart(2, "0")
        }}
      </span>
    </template>
    ---->
    <template v-slot:item.action="{ item }">
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
    //test alert
    snackbar: false,
    success: false,
    messages: "",
    icon: "",
    text: "Data Hasil Tangkapan berhasil ditambahkan",
    timeout: 2000,
    //
    dialogDelete: false,
    input: {
      fisherid: "0",
      fish: "0",
      status: "0"
    },
    status: [
      { status: "Belum Terjual", id: "1" },
      { status: "Menunggu Pembayaran", id: "2" },
      { status: "Selesai", id: "3" }
    ],
    //dummy
    dummy: [
      {
        fisher_nik: "12345566",
        fisher_name: "Rahmat",
        trip_day: "10",
        fishing_area: "WPP-RI 711",
        fishing_gear: "Kail",
        fish_type: "Tenggiri",
        weight: "70 Kg",
        created_at: "10:00",
        sold_at: "",
        status_name: "Belum terjual"
      },
      {
        fisher_nik: "12345566",
        fisher_name: "Rahmat",
        trip_day: "10",
        fishing_area: "WPP-RI 711",
        fishing_gear: "Kail",
        fish_type: "Tuna",
        weight: "50 Kg",
        created_at: "10:00",
        sold_at: "",
        status_name: "Belum terjual"
      },
      {
        trip_day: "10",
        fishing_area: "WPP-RI 711",
        fishing_gear: "Kail",
        created_at: "8:00",
        fisher_name: "Bagas",
        fish_type: "Tuna",
        weight: "70 Kg",
        status_name: "Selesai"
      },
      {
        trip_day: "10",
        fishing_area: "WPP-RI 711",
        fishing_gear: "Kail",
        created_at: "8:00",
        fisher_name: "Bagus",
        fish_type: "Tenggiri",
        weight: "100 Kg",
        status_name: "Selesai"
      },
      {
        trip_day: "10",
        fishing_area: "WPP-RI 711",
        fishing_gear: "Kail",
        fisher_name: "Agung",
        fish_type: "Tenggiri",
        weight: "100 Kg",
        created_at: "9:00",
        status_name: "Menunggu Pembayaran"
      },
      {
        trip_day: "10",
        fishing_area: "WPP-RI 711",
        fishing_gear: "Kail",
        fisher_name: "Agung",
        fish_type: "Cakalang",
        weight: "50 Kg",
        created_at: "9:00",
        status_name: "Menunggu Pembayaran"
      },
      {
        trip_day: "10",
        fishing_area: "WPP-RI 711",
        fishing_gear: "Kail",
        fisher_name: "Adi",
        fish_type: "Kakap",
        weight: "50 Kg",
        created_at: "9:00",
        status_name: "Menunggu Pembayaran"
      },
      {
        trip_day: "10",
        fishing_area: "WPP-RI 711",
        fishing_gear: "Kail",
        fisher_name: "Adi",
        fish_type: "Tenggiri",
        weight: "50 Kg",
        created_at: "9:00",
        status_name: "Menunggu Pembayaran"
      },
      {
        trip_day: "10",
        fishing_area: "WPP-RI 711",
        fishing_gear: "Kail",
        fisher_name: "Bagas",
        fish_type: "Tuna",
        weight: "50 Kg",
        created_at: "9:00",
        status_name: "Menunggu Pembayaran"
      },
      {
        fisher_name: "Bagas",
        fish_type: "Tenggiri",
        weight: "50 Kg",
        created_at: "9:00",
        status_name: "Menunggu Pembayaran",
        trip_day: "10",
        fishing_area: "WPP-RI 711",
        fishing_gear: "Kail"
      }
    ],
    all_headers: [
      { text: "ID", align: "start", value: "id" },
      ,
      { text: "Waktu", value: "created_at" },
      { text: "Nama Nelayan", value: "fisher_name" },
      { text: "Jumlah Hari Trip", value: "trip_day" },
      { text: "Alat Tangkap", value: "fishing_gear" },
      { text: "Daerah Tangkapan", value: "fishing_area" },
      { text: "Jenis Ikan", value: "fish_type" },
      { text: "Berat", value: "weight" },
      { text: "Status Lelang", value: "status_name" },
      { text: "Aksi", value: "action", sortable: false, width: 135 }
    ],
    fisher: [],
    fishtype: [],
    caughtfish: []
  }),

  watch: {
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
    //adj
    showHeaders() {
      if (this.input.fish == "0") {
        if (this.input.fisherid == "0") {
          if (this.input.status == "0") {
            return this.all_headers;
          } else {
            return this.all_headers.filter(
              header => header.text !== "Status Pelelangan"
            );
          }
        } else {
          if (this.input.status == "0") {
            return this.all_headers.filter(header => header.text !== "Nelayan");
          } else {
            return this.all_headers.filter(
              header =>
                header.text !== "Nelayan" && header.text !== "Status Pelelangan"
            );
          }
        }
      } else {
        if (this.input.fisherid == "0") {
          if (this.input.status == "0") {
            return this.all_headers.filter(
              header => header.text !== "Jenis Ikan"
            );
          } else {
            return this.all_headers.filter(
              header =>
                header.text !== "Jenis Ikan" &&
                header.text !== "Status Pelelangan"
            );
          }
        } else {
          if (this.input.status == "0") {
            return this.all_headers.filter(
              header =>
                header.text !== "Jenis Ikan" && header.text !== "Nelayan"
            );
          } else {
            return this.all_headers.filter(
              header =>
                header.text !== "Jenis Ikan" &&
                header.text !== "Nelayan" &&
                header.text !== "Status Pelelangan"
            );
          }
        }
      }
    }
  },

  methods: {
    //test alert
    async testalert() {
      (this.success = true),
        (this.messages = "Data berhasil ditambahkan"),
        (this.snackbar = true);
    },

    popupDialogDelete(id) {
      this.dialogDelete = true;
      this.currentId = id;
    },

    closeDelete() {
      this.dialogDelete = false;
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
