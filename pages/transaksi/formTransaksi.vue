<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <!----- Title ----->
      <v-card color="secondary" dark elevation="0">
        <v-card-title class="mb-1">Pembayaran</v-card-title>
        <v-card-subtitle class="white--text font-weight-light"
          >Pilih ikan yang akan dibayar, kemudian masukkan data
          pembeli</v-card-subtitle
        >
      </v-card>
      <!---- Alert ----->
      <template>
        <alert
          v-model="snackbar"
          :success="success"
          :messages="messages"
        ></alert>
      </template>
      <v-card-text>
        <v-row>
          <!-----=================== Table ========================----->

          <v-col lg="7" sm="7">
            <v-data-table
              :headers="headers"
              :items-per-page="5"
              :items="auction"
              :search="search"
              sort-by="created_at"
              sort-desc
              class="elevation-0 px-2"
            >
              <template v-slot:top>
                <v-row class="mx-1">
                  <h2 class="accent--text">Pilih Ikan</h2>
                </v-row>
                <v-card
                  elevation="0"
                  rounded
                  class="mx-0 mt-3 px-2 pt-5 mb-6 rounded-lg"
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
                        v-model="input_filter.fisherid"
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

                    <v-col lg="6" md="6" class="px-2">
                      <v-autocomplete
                        solo
                        dense
                        block
                        single-line
                        label="Jenis Ikan"
                        v-model="input_filter.fish"
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
                  </v-row>
                </v-card>
              </template>
              <template v-slot:item.weight="{ item }">
                {{ item.caught.weight }} {{ item.caught.weight_unit }}
              </template>
              <template v-slot:item.price="{ item }">
                {{ item.price | currencyFormat }}
              </template>
              <template v-slot:item.action="{ item }">
                <v-btn
                  block
                  small
                  color="secondary"
                  :disabled="isDisabled(item.id)"
                  depressed
                  @click="addToCart(item), getTotal()"
                >
                  Pilih
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
          <!-----==================== Cart ========================----->
          <v-col lg="5" sm="5">
            <v-card class="px-4 pt-5 mt-6 rounded-lg" elevation="2" outlined>
              <!----- Total Summary ----->
              <v-row class="mx-1 mb-4">
                <h2 class="primary--text">Daftar Pembelian</h2>
              </v-row>

              <div v-if="!isEmpty">
                <v-divider class="mt-4"></v-divider>
                <div v-for="(order, index) in input.orders" :key="index">
                  <v-row class="px-3">
                    <v-col cols="8" lg="9" sm="8">
                      <h3 class="accent--text  font-weight-medium">
                        {{ order.fish_type }}
                        {{ order.weight }} {{ order.weight_unit }}
                      </h3>
                      <h3 class="pt-1 accent--text font-weight-regular">
                        {{ order.price | currencyFormat }} -
                        <span class="pt-1 accent--text font-weight-regular">
                          Nelayan : {{ order.fisher_name }}
                        </span>
                      </h3>
                    </v-col>

                    <v-col cols="4" lg="3" sm="4">
                      <v-btn
                        color="red"
                        dark
                        depressed
                        small
                        text
                        @click="hapus(index)"
                        >Hapus</v-btn
                      >
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                </div>
                <v-row class="mx-0 mt-6 mb-1">
                  <h3 class="primary--text ">Total Harga</h3>
                </v-row>
                <v-row class="mx-0 pb-4">
                  <h3 class="accent--text ">
                    {{ input.total | currencyFormat }}
                  </h3>
                  <h4 class="accent--text">
                    &nbsp; ( {{ input.orders.length }} jenis ikan )
                  </h4>
                </v-row>

                <v-form ref="form" v-model="valid" lazy-validation>
                  <h3 class="my-3 primary--text">
                    Nama Pembeli
                  </h3>
                  <v-autocomplete
                    outlined
                    single-line
                    label="Nama Pembeli"
                    :rules="required"
                    v-model="input.buyer_id"
                    :items="buyer"
                    clearable
                    item-text="name"
                    item-value="id"
                    @change="getByIdBuyer()"
                  >
                  </v-autocomplete>

                  <h3 class="mb-3 primary--text">
                    Daerah Distribusi Ikan
                  </h3>
                  <v-text-field
                    outlined
                    clearable
                    single-line
                    label="Daerah Distribusi Ikan"
                    :rules="required"
                    v-model="input.distribution_area"
                  />
                </v-form>
                <v-card-actions>
                  <v-row>
                    <v-btn
                      class="mb-2"
                      block
                      color="primary"
                      @click="confirm()"
                    >
                      Bayar
                    </v-btn>
                  </v-row>
                </v-card-actions>
              </div>

              <div v-else>
                <v-row class="mx-0 pb-6">
                  <h3 class="font-weight-regular">
                    Belum ada ikan yang dipilih
                  </h3>
                </v-row>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!----- Confirmation Dialog ----->
    <v-dialog v-model="dialog" width="600px">
      <v-card>
        <v-card-title>
          <h3 class="primary--text">Konfirmasi Data</h3>
        </v-card-title>
        <v-card-text>
          <v-divider></v-divider>
          <v-row no-gutters>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                NIK Pembeli
              </h3>
            </v-col>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                : {{ this.buyer_confirm.nik }}
              </h3></v-col
            >
          </v-row>
          <v-row no-gutters>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                Nama Pembeli
              </h3>
            </v-col>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                : {{ this.buyer_confirm.name }}
              </h3></v-col
            >
          </v-row>
          <v-row no-gutters>
            <v-col>
              <h3 class="accent--text my-4 font-weight-regular">
                Daerah Distribusi
              </h3>
            </v-col>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                : {{ this.input.distribution_area }}
              </h3></v-col
            >
          </v-row>

          <v-divider></v-divider>
          <v-row no-gutters>
            <h3 class="accent--text mt-5">
              Daftar Pembelian
            </h3>
          </v-row>
          <div
            class="orderfish"
            v-for="(order, index) in input.orders"
            :key="index"
          >
            <v-row no-gutters>
              <v-col>
                <h3 class="accent--text mt-4 font-weight-regular">
                  {{ index + 1 }}) {{ order.fish_type }} {{ order.weight }}
                </h3>
              </v-col>
              <v-col class="">
                <h3 class="align-end accent--text mt-4 font-weight-regular">
                  {{ order.price | currencyFormat }}
                </h3></v-col
              >
              <!-----
              <v-col>
                <v-icon
                  class="mt-4"
                  color="primary"
                  @click="hapus(index, order.auction_id)"
                >
                  mdi-delete</v-icon
                >
              </v-col> ---->
            </v-row>
          </div>
          <v-row no-gutters>
            <v-col>
              <h3 class="accent--text mt-5">
                Total
              </h3>
            </v-col>
            <v-col>
              <h3 class="accent--text mt-5">
                {{ input.total | currencyFormat }}
              </h3>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="dialog = false">
            Edit
          </v-btn>
          <v-btn color="primary" @click="storeTransaction()">
            Simpan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  filters: {
    currencyFormat(value) {
      if (isNaN(value)) {
        return "Rp~";
      } else {
        if (value != null) {
          const minus = Number(value) < 0;
          if (value.toString().split(".").length > 2) return "Rp~";
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
            return "Rp~";
          }
        }
      }
    }
  },
  data: () => ({
    snackbar: false,
    success: false,
    messages: "",
    dialog: false,
    valid: true,
    isEmpty: true,
    required: [v => !!v || "Data ini harus diisi"],
    input: {
      el: ".orderfish",
      buyer_id: null,
      distribution_area: null,
      total: 0,
      orders: [
        {
          auction_id: null,
          fisher_name: null,
          fish_type: null,
          weight: null,
          price: null
        }
      ]
    },
    input_filter: {
      fisherid: "0",
      fish: "0"
    },
    search: "",
    headers: [
      { text: "Jenis Ikan", value: "caught.fish_type.name" },
      { text: "Berat", value: "weight" },
      { text: "Nama Nelayan", value: "caught.fisher.name" },
      { text: "Harga", value: "price" },
      { text: "Aksi", value: "action", sortable: false }
    ],
    buyer: [],
    auction: [],
    fishtype: [],
    fisher: [],
    buyer_confirm: []
  }),

  mounted() {
    this.getAllAuction();
    this.getAllBuyer();
    this.getAllFish();
    this.getAllFisher();
  },

  methods: {
    isDisabled(id) {
      for (let index = 0; index < this.input.orders.length; index++) {
        if (id == this.input.orders[index].auction_id) {
          return true;
        }
      }
    },
    hapus(index) {
      if (index == 0 && this.input.orders.length == 1) {
        this.isEmpty = true;
      }
      this.input.orders[index].price = 0;
      this.getTotal();
      this.input.orders.splice(index, 1);
    },
    confirm() {
      if (this.isEmpty) {
        this.success = false;
        this.messages = "Belum ada ikan yang dipilih";
        this.snackbar = true;
      } else {
        if (this.$refs.form.validate()) {
          this.dialog = true;
        }
      }
    },
    addToCart(item) {
      //check if order is empty or not
      if (this.isEmpty == true) {
        this.isEmpty = false;
        //check if there is null data, then replace null data
        if (this.input.orders.length == 1) {
          this.input.orders[0].auction_id = item.id;
          this.input.orders[0].fisher_name = item.caught.fisher.name;
          this.input.orders[0].fish_type = item.caught.fish_type.name;
          this.input.orders[0].weight = item.caught.weight;
          this.input.orders[0].weight_unit = item.caught.weight_unit;
          this.input.orders[0].price = item.price;
        }
        //push data if there is no null data
        else {
          this.input.orders.push({
            auction_id: item.id,
            fisher_name: item.caught.fisher.name,
            fish_type: item.caught.fish_type.name,
            weight: item.caught.weight,
            weight_unit: item.caught.weight_unit,
            price: item.price
          });
        }
        // if order is not empty push data
      } else {
        this.input.orders.push({
          auction_id: item.id,
          fisher_name: item.caught.fisher.name,
          fish_type: item.caught.fish_type.name,
          weight: item.caught.weight,
          weight_unit: item.caught.weight_unit,
          price: item.price
        });
      }
    },

    getTotal() {
      let sum = 0;
      for (let index = 0; index < this.input.orders.length; index++) {
        if (isNaN(this.input.orders[index].price)) continue;
        sum = sum + parseInt(this.input.orders[index].price);
      }
      this.input.total = sum;
      return sum;
    },

    async getAllAuction() {
      try {
        this.auction = await this.$api("auction", "inquiry", this.input_filter);
      } catch (e) {
        console.log(e);
      }
    },

    async getAllBuyer() {
      try {
        this.buyer = await this.$api("buyer", "index", null);
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
    },

    async getAllFish() {
      try {
        this.fishtype = await this.$api("fish", "index", null);
      } catch (e) {
        console.log(e);
      }
    },

    async getByIdBuyer() {
      try {
        this.buyer_confirm = await this.$api(
          "buyer",
          "get_by_id",
          this.input.buyer_id
        );
      } catch (e) {
        console.log(e);
      }
    },

    async storeTransaction() {
      //del soon
      if (this.isEmpty) {
        this.success = false;
        this.messages = "Belum ada ikan yang dipilih";
        this.snackbar = true;
      } else if (this.$refs.form.validate()) {
        try {
          const result = await this.$api(
            "transaction",
            "store",
            this.input
          ).finally(response => {
            this.input.orders.splice(0, this.input.orders.length);
            this.input.total = 0;
            this.$refs.form.reset();
            this.isEmpty = true;
            this.dialog = false;
            this.getAllAuction();
            return response;
          });

          if (result.status === 200) {
            this.success = true;
            this.messages = "Data transaksi berhasil ditambahkan";
            this.snackbar = true;
          } else {
            this.success = false;
            this.messages = "Data transaksi gagal ditambahkan";
            this.snackbar = true;
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
};
</script>
