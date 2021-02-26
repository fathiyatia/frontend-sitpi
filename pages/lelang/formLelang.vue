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
        <v-form ref="form" v-model="valid" lazy-validation>
          <!----- Input Buyer and Area ----->
          <h3 class="mb-3 primary--text">
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

          <!----- Auction Table ----->
          <!----- Dummy ----->
          <v-data-table
            :headers="headers"
            :items="dummy"
            :search="search"
            :items-per-page="5"
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
              <v-btn
                block
                small
                color="secondary"
                depressed
                :disabled="isDisabled(item.id)"
                @click="
                  addToCart(
                    item.id,
                    item.fisher_name,
                    item.fish_type,
                    item.weight,
                    item.weight_unit
                  )
                "
              >
                Jual
              </v-btn>
            </template>
          </v-data-table>

          <!----- Cart ----->
          <v-row class="mx-0 pl-1 pb-5">
            <h2 class="primary--text ">
              Daftar Ikan yang sudah dipilih
            </h2>
          </v-row>
          <div v-if="!isEmpty">
            <div v-for="(order, index) in input.orders" :key="index">
              <v-divider></v-divider>
              <v-row class="mx-2 pt-1">
                <v-col lg="4" sm="6">
                  <h3 class="accent--text mt-3 font-weight-regular">
                    {{ index + 1 }}. &nbsp;{{ order.fish_type }}
                    {{ order.weight }} {{ order.weight_unit }}
                  </h3></v-col
                >
                <v-col lg="3" sm="6">
                  <h3 class="accent--text mt-3 font-weight-regular">
                    {{ order.fisher_name }}
                  </h3></v-col
                >
                <v-col cols="12" lg="3" sm="10">
                  <v-text-field
                    dense
                    outlined
                    single-line
                    prefix="Rp"
                    type="number"
                    label="Masukkan Harga"
                    :rules="required"
                    v-model="input.orders[index].price"
                    @input="getTotal()"
                  />
                </v-col>
                <v-col lg="2" sm="2">
                  <v-btn color="red" dark depressed small @click="hapus(index)"
                    >Hapus</v-btn
                  >
                </v-col>
              </v-row>
              <v-divider></v-divider>
            </div>
            <v-row class="mx-0 pl-1 pb-5 pt-5">
              <h2 class="accent--text">
                Total Harga : {{ total | totalFormat }}
              </h2>
            </v-row>
          </div>
          <div v-else>
            <v-row class="mx-0 pl-1 pb-3">
              <h3 class="font-weight-regular">Belum ada ikan yang dipilih</h3>
            </v-row>
          </div>
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
    valid: true,
    disabled: 1,
    isEmpty: true,
    required: [v => !!v || "Data ini harus diisi"],
    buyer: [],
    auction: [],
    //dummy
    dummy: [
      {
        id: "1",
        fisher_name: "Fisher",
        fish_type: "Tenggiri",
        weight: "70 Kg"
      },
      {
        id: "2",
        fisher_name: "Fisher",
        fish_type: "Tenggiri",
        weight: "50 Kg"
      }
    ],
    total: null,
    input: {
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
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id"
      },
      { text: "Jenis Ikan", value: "fish_type" },
      { text: "Berat", value: "weight" },
      { text: "Nama Nelayan", value: "fisher_name" },
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
    addToCart(id, fisher_name, fish_type, weight, weight_unit) {
      if (this.isEmpty == true) {
        this.isEmpty = false;
        if (this.input.orders.length == 1) {
          this.input.orders[0].auction_id = id;
          this.input.orders[0].fisher_name = fisher_name;
          this.input.orders[0].fish_type = fish_type;
          this.input.orders[0].weight = weight;
          this.input.orders[0].weight_unit = weight_unit;
        } else {
          this.input.orders.push({
            auction_id: id,
            fisher_name: fisher_name,
            fish_type: fish_type,
            weight: weight,
            weight_unit: weight_unit,
            price: null
          });
        }
      } else {
        this.input.orders.push({
          auction_id: id,
          fisher_name: fisher_name,
          fish_type: fish_type,
          weight: weight,
          weight_unit: weight_unit,
          price: null
        });
      }
    },
    // cek
    isDisabled(id) {
      //let isCart = false;
      for (let index = 0; index < this.input.orders.length; index++) {
        if (id == this.input.orders[index].auction_id) {
          //isCart = true;
          return true;
        }
      }
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
      this.input.orders[index].price = 0;
      this.getTotal();
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
