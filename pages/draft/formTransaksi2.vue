<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <!----- Title ----->
      <v-card color="secondary" dark elevation="0">
        <v-card-title class="mb-1">Pembayaran</v-card-title>
        <v-card-subtitle class="white--text font-weight-light"
          >Pilih ikan yang akan dibayar dan masukkan data
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
          <!----- Dummy ----->
          <v-col lg="7">
            <v-data-table
              :headers="headers"
              :items-per-page="5"
              :items="dummy"
              :search="search"
              sort-by="created_at"
              sort-desc
              class="elevation-0 px-2"
            >
              <template v-slot:top>
                <v-row class="px-2">
                  <h2 class="accent--text">Pilih Ikan</h2>
                </v-row>
                <v-text-field
                  outlined
                  dense
                  class="mx-0 mt-4 mb-5 rounded-xl"
                  v-model="search"
                  prepend-inner-icon="mdi-magnify"
                  label="Cari"
                  single-line
                  hide-details
                ></v-text-field>
              </template>
              <template v-slot:item.weight="{ item }">
                {{ item.weight }} {{ item.weight_unit }}
              </template>
              <template v-slot:item.action="{ item }">
                <v-checkbox
                  v-model="check[dummy.indexOf(item)]"
                  @click="addToCart(item), getTotal()"
                ></v-checkbox>
              </template>
            </v-data-table>
          </v-col>
          <!-----==================== Cart ========================----->
          <v-col lg="5" class="mt-2">
            <v-card class="px-4 pt-5 mt-4 rounded-lg" elevation="2" outlined>
              <!----- Total Summary ----->
              <v-row class="mx-0 pb-5">
                <h2 class="primary--text ">Total Harga</h2>
              </v-row>
              <div v-if="!isEmpty">
                <v-row class="mx-0 pb-8">
                  <h2 class="accent--text">
                    {{ total | totalFormat }}
                  </h2>
                  <h4 class="accent--text">
                    &nbsp; ( {{ input.orders.length }} jenis ikan )
                  </h4>
                </v-row>
                <!----- Input Buyer and Area ----->
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
                  >
                  </v-autocomplete>

                  <h3 class="mb-3 mt-2 primary--text">
                    Daerah Penjualan Ikan
                  </h3>
                  <v-text-field
                    outlined
                    clearable
                    single-line
                    label="Daerah Penjualan Ikan"
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
                      Simpan
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
                : 327600000987676655
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
                : Bambang
              </h3></v-col
            >
          </v-row>
          <v-row no-gutters>
            <v-col>
              <h3 class="accent--text my-4 font-weight-regular">
                Daerah Penjualan
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
              <v-col>
                <h3 class="accent--text mt-4 font-weight-regular">
                  {{ order.price | totalFormat }}
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
              <h3 class="accent--text mt-5">{{ total | totalFormat }}</h3>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="dialog = false">
            Edit
          </v-btn>
          <v-btn color="primary" @click="store()">
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
    totalFormat(value) {
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
    dialog: false,
    check: [],
    valid: true,
    isEmpty: true,
    required: [v => !!v || "Data ini harus diisi"],
    buyer: [{ id: 12, name: "Bambang - 327600000987676655" }],
    auction: [],
    //dummy
    dummy: [
      {
        id: "1",
        fisher_name: "Fisher",
        fish_type: "Tenggiri",
        weight: "70 Kg",
        price: 100000
      },
      {
        id: "2",
        fisher_name: "Fisher",
        fish_type: "Test",
        weight: "50 Kg",
        price: 3000
      },
      {
        id: "3",
        fisher_name: "Fisher",
        fish_type: "Tenggiri",
        weight: "50 Kg",
        price: 3000
      },
      {
        id: "4",
        fisher_name: "Fisher",
        fish_type: "Tenggiri",
        weight: "50 Kg",
        price: 3000
      },
      {
        id: "5",
        fisher_name: "Fisher",
        fish_type: "Tenggiri",
        weight: "50 Kg",
        price: 3000
      },
      {
        id: "6",
        fisher_name: "Fisher",
        fish_type: "Test",
        weight: "50 Kg",
        price: 3000
      },
      {
        id: "7",
        fisher_name: "Fisher",
        fish_type: "Tenggiri",
        weight: "50 Kg",
        price: 3000
      }
    ],
    total: 0,
    input: {
      el: ".orderfish",
      buyer_id: null,
      distribution_area: null,
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
    search: "",
    headers: [
      { text: "Jenis Ikan", value: "fish_type" },
      { text: "Berat", value: "weight" },
      { text: "Nama Nelayan", value: "fisher_name" },
      { text: "Harga", value: "price" },
      { text: "Aksi", value: "action", sortable: false }
    ],
    auction: [],
    //test alert
    snackbar: false,
    success: false,
    messages: "",
    icon: "",
    timeout: 2000
  }),

  mounted() {
    this.getAllAuction();
    this.getAllBuyer();
  },

  methods: {
    store() {
      this.$refs.form.reset();
      this.input.orders.splice(0, this.input.orders.length);
      this.dialog = false;
      this.$router.go();
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
          this.input.orders[0].fisher_name = item.fisher_name;
          this.input.orders[0].fish_type = item.fish_type;
          this.input.orders[0].weight = item.weight;
          this.input.orders[0].weight_unit = item.weight_unit;
          this.input.orders[0].price = item.price;
          //save the checkbox state to prevent change in state
          //this.check[this.dummy.indexOf(item)] = true;
        }
        //push data if there is no null data
        else {
          this.input.orders.push({
            auction_id: item.id,
            fisher_name: item.fisher_name,
            fish_type: item.fish_type,
            weight: item.weight,
            weight_unit: item.weight_unit,
            price: item.price
          });
          //state
          //this.check[this.dummy.indexOf(item)] = true;
        }
        // if order is not empty
      } else {
        let isOrder = false;
        // currentIndex to save index of order for delete
        let currentIndex = "";
        // check if data already in order or not
        for (let index = 0; index < this.input.orders.length; index++) {
          if (item.id == this.input.orders[index].auction_id) {
            isOrder = true;
            currentIndex = index;
          }
        }
        // if data not in order, then push data
        if (isOrder == false) {
          this.input.orders.push({
            auction_id: item.id,
            fisher_name: item.fisher_name,
            fish_type: item.fish_type,
            weight: item.weight,
            weight_unit: item.weight_unit,
            price: item.price
          });
          //state
          //this.check[this.dummy.indexOf(item)] = true;
        }
        // if data already in order, then delete data
        else if (isOrder == true) {
          // check if data is the only one data, then declare order is empty
          if (currentIndex == 0 && this.input.orders.length == 1) {
            this.isEmpty = true;
          }
          this.input.orders.splice(currentIndex, 1);
        }
      }
    },
    //test hapus
    hapus(index, id) {
      if (index == 0 && this.input.orders.length == 1) {
        this.isEmpty = true;
      }
      for (let x = 0; x < this.dummy.length; x++) {
        if (id == this.dummy[x].id) {
          let y = x;
          this.check[y] = false;
          this.input.orders.splice(index, 1);
        }
      }
    },

    getTotal() {
      let sum = 0;
      for (let index = 0; index < this.input.orders.length; index++) {
        if (isNaN(this.input.orders[index].price)) continue;
        sum = sum + parseInt(this.input.orders[index].price);
      }
      this.total = sum;
      return sum;
    },

    reset() {
      this.$refs.form.reset();
    },
    //cek
    async getAllAuction() {
      try {
        this.auction = await this.$api("auction", "inquiry", null);
      } catch (e) {
        console.log(e);
      }
    },

    async getAllBuyer() {
      try {
        this.buyer = await this.$api("buyer", "inquiry", null);
      } catch (e) {
        console.log(e);
      }
    },
    // res
    async storeAuction() {
      if (this.isEmpty) {
        this.success = false;
        this.messages = "Belum ada ikan yang dipilih";
        this.snackbar = true;
      } else if (this.$refs.form.validate()) {
        try {
          const result = await this.$api(
            "auction",
            "store",
            this.input
          ).finally(response => {
            this.$router.push("/lelang/dataLelang");
            return response;
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
};
</script>
