<template>
  <v-data-table
    :headers="showHeaders"
    :items="caught_fish"
    sort-desc
    sort-by="caught.created_at"
    class="elevation-1 px-3"
  >
    <template v-slot:top>
      <v-row class="mx-0 px-4 pt-6">
        <h2 class="accent--text">Data Tangkapan Ikan</h2>
      </v-row>
      <v-row class="mx-0 px-4 pt-2 pb-6"
        ><span>
          Data tangkapan ikan yang didaratkan di
          <span class="primary--text font-weight-bold">{{
            $auth.$state.user.location_data.location_name
          }}</span>
          pada tanggal
          <span class="primary--text font-weight-bold">
            {{ new Date() | dateFormat }}</span
          >
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
              item-text="nick_name"
              item-value="id"
              @change="getAllCaught()"
            >
              <template v-slot:selection="{ item }">{{
                item.nick_name
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
              label="Status Lelang"
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
      <!---- Alert ----->
      <template>
        <alert
          v-model="snackbar"
          :success="success"
          :messages="messages"
        ></alert>
      </template>
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

    <template v-slot:item.caught.created_at="{ item }">
      <span
        >{{
          new Date(item.caught.created_at)
            .getHours()
            .toLocaleString()
            .padStart(2, "0")
        }}:{{
          new Date(item.caught.created_at)
            .getMinutes()
            .toLocaleString()
            .padStart(2, "0")
        }}
      </span>
    </template>

    <template v-slot:item.caught_status.Status="{ item }">
      <v-chip :color="getColor(item.caught_status.status)" outlined small dark>
        {{ item.caught_status.status }}
      </v-chip>
    </template>

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
    snackbar: false,
    success: false,
    messages: "",
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

    all_headers: [
      { text: "Waktu", value: "caught.created_at" },
      { text: "Nama Nelayan", value: "caught.fisher.nick_name" },
      { text: "Jumlah Hari Trip", value: "caught.trip_day" },
      { text: "Alat Tangkap", value: "caught.fishing_gear.name" },
      { text: "Daerah Tangkapan", value: "caught.fishing_area.name" },
      { text: "Jenis Ikan", value: "fish_type.name" },
      { text: "Berat", value: "weight", align: "right" },
      { text: "Status Lelang", value: "caught_status.Status" },
      { text: "Aksi", value: "action", sortable: false, width: 135 }
    ],
    fisher: [],
    fishtype: [],
    caught_fish: []
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
    showHeaders() {
      if (
        this.$auth.$state.user.user.permissions.includes("update-caught") !=
          true &&
        this.$auth.$state.user.user.permissions.includes("delete-caught") !=
          true
      ) {
        this.all_headers = this.all_headers.filter(
          header => header.text !== "Aksi"
        );
      }

      //check if there is filter active
      if (
        this.input.fish != "0" ||
        this.input.fisherid != "0" ||
        this.input.status != "0"
      ) {
        //filtering based on input
        this.show_headers = this.all_headers;
        if (this.input.fish != "0") {
          this.show_headers = this.show_headers.filter(
            header => header.text !== "Jenis Ikan"
          );
        }
        if (this.input.fisherid != "0") {
          this.show_headers = this.show_headers.filter(
            header => header.text !== "Nama Nelayan"
          );
        }
        if (this.input.status != "0") {
          this.show_headers = this.show_headers.filter(
            header => header.text !== "Status Lelang"
          );
        }
        return this.show_headers;
      }
      //return all headers if there is no filter active
      else {
        return this.all_headers;
      }
    }
  },

  methods: {
    getColor(status) {
      if (status == "Belum Terjual") return "red";
      else if (status == "Menunggu Pembayaran") return "blue darken-3";
      else return "green darken-2";
    },

    popupDialogDelete(id) {
      this.dialogDelete = true;
      this.currentId = id;
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    async deleteCaught() {
      try {
        const result = await this.$api(
          "caught",
          "delete",
          this.currentId
        ).finally(() => {
          this.dialogDelete = false;
          this.getAllCaught();
        });
        if (result.status === 200) {
          this.success = true;
          this.messages = "Data berhasil dihapus";
          this.snackbar = true;
        } else {
          this.success = false;
          this.messages = "Data gagal dihapus";
          this.snackbar = true;
        }
      } catch (e) {
        console.log(e);
        this.success = false;
        this.messages = "Data gagal dihapus";
        this.snackbar = true;
      }
    },

    async getAllCaught() {
      try {
        this.caught_fish = await this.$api("caught", "index", this.input);
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
        this.fisher = await this.$api("fisher", "index", null);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
