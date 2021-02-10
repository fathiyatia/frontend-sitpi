<template>
  <v-data-table
    :headers="showHeaders"
    :items="auction"
    :search="search"
    sort-by="created_at"
    sort-desc
    class="elevation-1 px-3"
  >
    <template v-slot:top>
      <v-row class="mx-0 px-4 pt-6">
        <h2 class="accent--text">Data Proses Lelang</h2>
      </v-row>
      <v-row class="mx-0 px-4 pt-2 pb-6"
        ><span>
          Data ikan yang sedang dilelang atau sudah terjual di
          <span class="primary--text font-weight-bold">TPI xxx </span> pada
          tanggal

          <date-format></date-format>
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
          <v-col cols="12" lg="3" sm="6" class="px-2">
            <v-autocomplete
              solo
              dense
              block
              single-line
              label="No. Pelelangan"
              v-model="input.auction"
              @change="getAllAuction()"
              :items="auction"
              clearable
              item-text="id"
              item-value="id"
            >
              <template v-slot:selection="{ item }">{{
                item.id
              }}</template></v-autocomplete
            >
          </v-col>
          <v-col cols="12" lg="3" sm="6" class="px-2">
            <v-autocomplete
              solo
              dense
              block
              single-line
              label="Nama Nelayan"
              v-model="input.fisherid"
              @change="getAllAuction()"
              :items="fisher"
              clearable
              item-text="name"
              item-value="id"
            >
              <template v-slot:selection="{ item }">{{
                item.name
              }}</template></v-autocomplete
            >
          </v-col>

          <v-col cols="12" lg="3" sm="6" class="px-2">
            <v-autocomplete
              solo
              dense
              block
              single-line
              label="Jenis Ikan"
              v-model="input.fish"
              @change="getAllAuction()"
              :items="fishtype"
              clearable
              item-text="name"
              item-value="id"
            >
              <template v-slot:selection="{ item }">{{
                item.name
              }}</template></v-autocomplete
            >
          </v-col>
          <v-col cols="12" lg="3" sm="6" class="px-2">
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
              @change="getAllAuction()"
            ></v-select>
          </v-col>
        </v-row>
      </v-card>
    </template>

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
    <template v-slot:item.sold_at="{ item }">
      <span
        >{{
          new Date(item.sold_at)
            .getHours()
            .toLocaleString()
            .padStart(2, "0")
        }}:{{
          new Date(item.sold_at)
            .getMinutes()
            .toLocaleString()
            .padStart(2, "0")
        }}
      </span>
    </template>
    <template v-slot:item.weight="{ item }">
      {{ item.weight }} {{ item.weight_unit }}
    </template>
    <template v-slot:item.action="{ item }">
      <v-btn
        small
        block
        color="secondary"
        :to="'/transaksi/formTransaksi/' + item.id"
        :disabled="isDisabled(item.status_name)"
      >
        Jual
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialogDelete: false,
    search: "",
    disabled: 1,
    status: [
      { status: "Belum Terjual", id: "1" },
      { status: "Sudah Terjual", id: "2" }
    ],
    input: {
      auction: "0",
      fisherid: "0",
      fish: "0",
      status: "0"
    },
    all_headers: [
      {
        text: "No. Pelelangan",
        align: "start",
        sortable: false,
        value: "id"
      },
      { text: "Jam Masuk", value: "created_at" },
      { text: "Jam Terjual", value: "sold_at" },
      { text: "Nelayan", value: "fisher_name" },
      { text: "Jenis Ikan", value: "fish_type" },
      { text: "Berat", value: "weight" },
      { text: "Status Pelelangan", value: "status_name" }
    ],
    auction: [],
    auction_id: [],
    fisher: [],
    fishtype: []
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
    this.getAllAuction();
    this.getAllFish();
    this.getAllFisher();
  },

  computed: {
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
    isDisabled(status) {
      if (status == "Sudah Terjual") {
        return true;
      }
    },
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

    deleteAuction() {
      try {
        this.$api("auction", "delete", this.currentId).finally(() => {
          this.getAllAuction();
          this.dialogDelete = false;
        });
      } catch (e) {
        console.log(e);
      }
    },

    async getAllAuction() {
      try {
        this.auction = await this.$api("auction", "index", this.input);
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
