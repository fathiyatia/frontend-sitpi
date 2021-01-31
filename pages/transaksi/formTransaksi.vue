<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <!----- Title ----->
      <v-card color="secondary" dark elevation="0">
        <v-card-title class="mb-1">Isi Transaksi</v-card-title>
        <v-card-subtitle class="white--text font-weight-light"
          >Pilih ikan dan isi data dibawah ini untuk mencatat transaksi
          pembelian hasil lelang</v-card-subtitle
        >
      </v-card>
      <!----- Auction Table ----->
      <v-data-table
        :headers="headers"
        :items="auction"
        :search="search"
        :items-per-page="5"
        sort-by="created_at"
        sort-desc
        class="elevation-0 px-3"
      >
        <template v-slot:top>
          <v-row class="mx-0 pt-6 pl-2">
            <h3 class="accent--text">Pilih Ikan</h3>
          </v-row>
          <template>
            <v-text-field
              outlined
              dense
              class="mt-2 px-2 mb-5 rounded-xl"
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Cari"
              single-line
              hide-details
            ></v-text-field>
          </template>
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
              addToCart(item.id, item.fish_type, item.weight, item.weight_unit)
            "
          >
            Jual
          </v-btn>
        </template>
      </v-data-table>

      <!----- Form ----->
      <!----- Order List ----->
      <v-card-text class="mt-4">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row class="mx-0 pl-1 pb-5">
            <h2 class="primary--text ">
              Daftar Ikan yang sudah dipilih
            </h2>
          </v-row>
          <div v-if="!isEmpty">
            <div v-for="(order, index) in input.orders" :key="index">
              <v-divider></v-divider>
              <v-row class="mx-5 mb-3 pt-2">
                <v-col lg="3" sm="6">
                  <h3 class="accent--text mt-3 font-weight-regular">
                    {{ index + 1 }} ) &nbsp; {{ order.fish_type }}
                  </h3></v-col
                >
                <v-col lg="3" sm="6">
                  <h3 class="accent--text mt-3 font-weight-regular">
                    {{ order.weight }} {{ order.weight_unit }}
                  </h3></v-col
                >
                <v-col cols="12" lg="3" sm="6">
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
                <v-col lg="3" sm="6">
                  <v-btn
                    class="pl-4"
                    color="red"
                    dark
                    depressed
                    small
                    @click="hapus(index)"
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

          <h3 class="mb-3 mt-7 primary--text">
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
            <v-btn large block color="primary" @click.stop="storeTransaction()">
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
    total: null,
    //nggak usah pake ini
    dummy: {
      auction: "0",
      fisherid: "0",
      fish: "0",
      status: "1"
    },
    input: {
      buyer_id: null,
      distribution_area: null,
      orders: [
        {
          auction_id: null,
          fish_type: null,
          weight: null,
          price: null
        }
      ]
    },
    search: "",
    headers: [
      {
        text: "No. Pelelangan",
        align: "start",
        sortable: false,
        value: "id"
      },
      { text: "Jenis Ikan", value: "fish_type" },
      { text: "Berat", value: "weight" },
      { text: "Aksi", value: "action", sortable: false, width: 160 }
    ],
    auction: []
  }),

  mounted() {
    this.getAllAuction();
  },

  methods: {
    addToCart(id, fish_type, weight, weight_unit) {
      if (this.isEmpty == true) {
        this.isEmpty = false;
        if (this.input.orders.length == 1) {
          this.input.orders[0].auction_id = id;
          this.input.orders[0].fish_type = fish_type;
          this.input.orders[0].weight = weight;
          this.input.orders[0].weight_unit = weight_unit;
        } else {
          this.input.orders.push({
            auction_id: id,
            fish_type: fish_type,
            weight: weight,
            weight_unit: weight_unit,
            price: null
          });
        }
      } else {
        this.input.orders.push({
          auction_id: id,
          fish_type: fish_type,
          weight: weight,
          weight_unit: weight_unit,
          price: null
        });
      }
    },
    isDisabled(id) {
      let isCart = false;
      for (let index = 0; index < this.input.orders.length; index++) {
        if (id == this.input.orders[index].auction_id) {
          isCart = true;
        }
      }
      if (isCart == true) {
        return true;
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

    async getAllAuction() {
      try {
        this.auction = await this.$api("auction", "index", this.dummy);
      } catch (e) {
        console.log(e);
      }
    },

    async storeTransaction() {
      if (this.$refs.form.validate()) {
        try {
          const result = await this.$api(
            "transaction",
            "store",
            this.input
          ).finally(response => {
            this.$router.push("/transaksi/dataTransaksi");
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
