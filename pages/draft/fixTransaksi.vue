<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <!----- Title ----->
      <v-card color="secondary" dark elevation="0">
        <v-card-title class="mb-1">Catat Hasil Lelang</v-card-title>
        <v-card-subtitle class="white--text font-weight-light"
          >Isi data dibawah ini untuk mencatat hasil lelang</v-card-subtitle
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
      <!----- Form ----->
      <v-card-text class="mt-2">
        <!----- Auction Table ----->
        <!----- Dummy ----->
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
            <v-row class="mt-3 px-2">
              <h3 class="accent--text">Pilih Ikan</h3>
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
              @change="addToCart(item), getTotal()"
            ></v-checkbox>
          </template>
        </v-data-table>
        <v-form ref="form" v-model="valid" lazy-validation>
          <!----- Cart ----->
          <v-row class="mx-0 pl-1 pb-5">
            <h2 class="primary--text ">Total Harga</h2>
          </v-row>
          <div v-if="!isEmpty">
            <v-row class="mx-0 pl-1 pb-8">
              <h2 class="accent--text">
                {{ total | totalFormat }}
              </h2>
              <h4>&nbsp; ( {{ input.orders.length }} jenis ikan )</h4>
            </v-row>
          </div>
          <div v-else>
            <v-row class="mx-0 pl-1 pb-3">
              <h3 class="font-weight-regular">Belum ada ikan yang dipilih</h3>
            </v-row>
          </div>

          <!----- Input Buyer and Area ----->
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
            single-line
            label="Daerah Penjualan Ikan"
            :rules="required"
            v-model="input.distribution_area"
          />
        </v-form>
      </v-card-text>
      <!----- End of Form ----->

      <v-card-actions class="justify-center px-3">
        <v-row>
          <v-col md="6">
            <v-btn large block color="accent" @click="reset">
              Batal
            </v-btn>
          </v-col>
          <v-col md="6">
            <v-btn large block color="primary" @click.stop="storeAuction()">
              Simpan
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  filters: {
    totalFormat(value) {
      if (isNaN(value)) {
        return "Rp ~";
      } else {
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
            return "Rp " + (minus === true ? " -" : "") + result;
          } catch (error) {
            return "Rp ~";
          }
        }
      }
    }
  },
  data: () => ({
    //checkbox: true,
    check: [],
    valid: true,
    disabled: 1,
    isEmpty: true,
    required: [v => !!v || "Data ini harus diisi"],
    buyer: [{ id: 12, name: "Bambang" }],
    auction: [],
    //dummy
    dummy: [
      {
        id: "1",
        fisher_name: "Fisher",
        fish_type: "Tenggiri",
        weight: "70 Kg",
        price: 1000
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
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id"
      },
      { text: "Jenis Ikan", value: "fish_type" },
      { text: "Berat", value: "weight" },
      { text: "Nama Nelayan", value: "fisher_name" },
      { text: "Harga", value: "price" },
      { text: "Aksi", value: "action", sortable: false, width: 160 }
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
    addToCart(item) {
      //chcek if cart is empty
      if (this.isEmpty == true) {
        this.isEmpty = false;
        //if length is 1 but data is null,
        if (this.input.orders.length == 1) {
          this.input.orders[0].auction_id = item.id;
          this.input.orders[0].fisher_name = item.fisher_name;
          this.input.orders[0].fish_type = item.fish_type;
          this.input.orders[0].weight = item.weight;
          this.input.orders[0].weight_unit = item.weight_unit;
          this.input.orders[0].price = item.price;
          this.check[this.dummy.indexOf(item)] = true;
        } //if there is no dummy data push
        else {
          this.input.orders.push({
            auction_id: item.id,
            fisher_name: item.fisher_name,
            fish_type: item.fish_type,
            weight: item.weight,
            weight_unit: item.weight_unit,
            price: item.price
          });
          this.check[this.dummy.indexOf(item)] = true;
        }
        // if cart is not empty
      } else {
        let isCart = false;
        let test = "";
        for (let index = 0; index < this.input.orders.length; index++) {
          if (item.id == this.input.orders[index].auction_id) {
            isCart = true;
            test = index;
          }
        }

        if (isCart == false) {
          this.input.orders.push({
            auction_id: item.id,
            fisher_name: item.fisher_name,
            fish_type: item.fish_type,
            weight: item.weight,
            weight_unit: item.weight_unit,
            price: item.price
          });
          this.check[this.dummy.indexOf(item)] = true;
        } else if (isCart == true) {
          if (test == 0 && this.input.orders.length == 1) {
            this.isEmpty = true;
          }
          this.input.orders.splice(test, 1);
        }
      }
    },
    // cek
    isDisabled(id) {
      //let isCart = false;
      //if (isCart == true) {
      //  return true;
      //}
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
    hapus(index) {
      if (index == 0 && this.input.orders.length == 1) {
        this.isEmpty = true;
      }
      //this.input.orders[index].price = 0;
      //this.getTotal();
      this.input.orders.splice(index, 1);
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
