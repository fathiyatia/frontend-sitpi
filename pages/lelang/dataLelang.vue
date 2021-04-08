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
        <h2 class="accent--text">Data Hasil Lelang</h2>
      </v-row>
      <v-row class="mx-0 px-4 pt-2 pb-6"
        ><span>
          Data hasil lelang di
          <span class="primary--text font-weight-bold"
            >{{ $auth.$state.user.location_data.location_name }}
          </span>
          pada tanggal
          <span class="primary--text font-weight-bold">
            {{ new Date() | dateFormat }}
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
              item-text="nick_name"
              item-value="id"
              @change="getAllAuction()"
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
              label="Status Lelang"
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
      <!---- Alert ----->
      <template>
        <alert
          v-model="snackbar"
          :success="success"
          :messages="messages"
        ></alert>
      </template>
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

    <template v-slot:item.caught_item.caught.created_at="{ item }">
      <span
        >{{
          new Date(item.caught_item.caught.created_at)
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
    <template v-slot:item.caught_item.weight="{ item }">
      {{ item.caught_item.weight }}
      {{ item.caught_item.weight_unit }}
    </template>

    <template v-slot:item.caught_item.caught_status.status="{ item }">
      <v-chip
        :color="getColor(item.caught_item.caught_status.status)"
        outlined
        small
        dark
      >
        {{ item.caught_item.caught_status.status }}
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
  middleware: "permission",
  data: () => ({
    snackbar: false,
    success: false,
    messages: "",
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
      { text: "Jam Masuk", value: "caught_item.caught.created_at" },
      { text: "Jam Terjual", value: "created_at" },
      { text: "Nama Nelayan", value: "caught_item.caught.fisher.nick_name" },
      { text: "Jenis Ikan", value: "caught_item.fish_type.name" },
      { text: "Berat", value: "caught_item.weight", align: "right" },
      { text: "Harga", value: "price", align: "right" },
      { text: "Status Lelang", value: "caught_item.caught_status.status" },
      { text: "Aksi", value: "action", width: 135, sortable: false }
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

    async deleteAuction() {
      try {
        const result = await this.$api(
          "auction",
          "delete",
          this.currentId
        ).finally(() => {
          this.getAllAuction();
          this.dialogDelete = false;
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
        this.success = false;
        this.messages = "Data gagal dihapus";
        this.snackbar = true;
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
