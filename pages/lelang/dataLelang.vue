<template>
  <!----- Dummy --->
  <v-data-table
    :headers="showHeaders"
    :items="auction"
    :search="search"
    sort-by="created_at"
    class="elevation-1 px-3"
  >
    <template v-slot:top>
      <v-row class="mx-0 px-4 pt-6">
        <h2 class="accent--text">Data Hasil Lelang</h2>
      </v-row>
      <v-row class="mx-0 px-4 pt-2 pb-6"
        ><span>
          Data hasil lelang di
          <span class="primary--text font-weight-bold"
            >{{ $auth.$state.user.location }}
          </span>
          pada tanggal
          <span class="primary--text font-weight-bold">
            <date-format></date-format>
          </span>
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
              @change="getAllAuction()"
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
              @change="getAllAuction()"
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
              @change="getAllAuction()"
            ></v-select>
          </v-col>
        </v-row>
      </v-card>

      <!--Dialog Edit--->
      <v-dialog v-model="dialogEdit" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Hasil Lelang </span>
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
                  label="Harga"
                  prefix="Rp"
                  required
                  v-model="total_price"
                ></v-text-field>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="accent" text @click="closeEdit">
              Batal
            </v-btn>
            <v-btn color="primary" text @click="updateAuction()">
              Simpan
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!------ Dialog Delete ----->
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="justify-center"
            >Anda yakin ingin menghapus data ini?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="closeDelete">Batal</v-btn>
            <v-btn color="error" text @click="deleteAuction">Hapus</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
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

    <template v-slot:item.price="{ item }">
      {{ item.price | currencyFormat }}
    </template>
    <template v-slot:item.weight="{ item }">
      {{ item.caught.weight }} {{ item.caught.weight_unit }}
    </template>

    <template v-slot:item.caught.caught_status.Status="{ item }">
      <v-chip
        :color="getColor(item.caught.caught_status.Status)"
        outlined
        small
        dark
      >
        {{ item.caught.caught_status.Status }}
      </v-chip>
    </template>

    <template v-slot:item.action="{ item }">
      <!----
      <v-btn x-small color="secondary" depressed @click="getById(item.id)">
        Edit
      </v-btn>
      ----->
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
  filters: {
    currencyFormat(value) {
      if (value != null) {
        const minus = Number(value) < 0;
        if (value.toString().split(".").length > 2) return "Rp ~";
        else if (value.toString().split(".").length > 1) {
          value = value.toString().split(".");
          value = value[0];
        }
        try {
          const result = value
            .toString()
            .match(/\d{1,3}(?=(\d{3})*$)/g)
            .join(".");
          return "Rp" + (minus === true ? " -" : "") + result;
        } catch (error) {
          return "Rp ~";
        }
      }
    }
  },
  data: () => ({
    valid: true,
    dialogDelete: false,
    dialogEdit: false,
    required: [v => !!v || "Data ini harus diisi"],
    search: "",
    total_price: "",
    input: {
      fisherid: "0",
      fish: "0",
      status: "0"
    },
    status: [
      { status: "Menunggu Pembayaran", id: "2" },
      { status: "Selesai", id: "3" }
    ],
    all_headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "code"
      },
      { text: "Jam Masuk", value: "caught.created_at" },
      { text: "Jam Terjual", value: "created_at" },
      { text: "Nama Nelayan", value: "caught.fisher.name" },
      { text: "Jenis Ikan", value: "caught.fish_type.name" },
      { text: "Berat", value: "weight" },
      { text: "Harga", value: "price" },
      { text: "Status Lelang", value: "caught.caught_status.Status" },
      { text: "Aksi", value: "action", width: 135 }
    ],
    fisher: [],
    fishtype: [],
    auction: []
  }),

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogEdit(val) {
      val || this.closeEdit();
    }
  },

  mounted() {
    this.getAllAuction();
    this.getAllFish();
    this.getAllFisher();
  },

  computed: {
    showHeaders() {
      if (
        this.$auth.$state.user.user.permissions.includes("update-auction") !=
          true &&
        this.$auth.$state.user.user.permissions.includes("delete-auction") !=
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
      if (status == "Menunggu Pembayaran") return "blue darken-3";
      else return "green darken-2";
    },
    popupDialogDelete(id) {
      this.dialogDelete = true;
      this.currentId = id;
    },
    popupDialogEdit(id) {
      this.dialogEdit = true;
      this.currentId = id;
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    closeEdit() {
      this.dialogEdit = false;
    },

    async getById(id) {
      try {
        this.total_price = await this.$api("auction", "get_by_id", id);
        this.dialogEdit = true;
      } catch (e) {
        console.log(e);
      }
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

    async updateAuction() {
      try {
        const result = await this.$api(
          "auction",
          "update",
          this.total_price
        ).finally(response => {
          this.getAllAuction();
          this.dialogEdit = false;
          return response;
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
        this.fisher = await this.$api("fisher", "index", null);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
