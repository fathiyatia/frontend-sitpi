<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-card color="secondary" dark elevation="0">
        <v-card-title class="mb-1">Form Transaksi</v-card-title>
        <v-card-subtitle class="white--text font-weight-light"
          >Isi form untuk mencatat transaksi pembelian hasil
          lelang</v-card-subtitle
        >
      </v-card>

      <v-card color="#F2F2F2" class="rounded-0 mx-3 mt-5" elevation="0">
        <v-row no-gutters class="mx-5">
          <v-col>
            <h4 class="accent--text mt-3 ">
              No. Pelelangan
            </h4>
          </v-col>
          <v-col>
            <h4 class="accent--text mt-3 font-weight-regular">
              : {{ this.input.auction_id }}
            </h4></v-col
          >
        </v-row>
        <v-row no-gutters class="mx-5">
          <v-col>
            <h4 class="accent--text mt-3 ">
              Tanggal
            </h4>
          </v-col>
          <v-col>
            <h4 class="accent--text mt-3 font-weight-regular">
              : {{ new Date(this.auction.created_at).toLocaleDateString() }}
            </h4></v-col
          >
        </v-row>
        <v-row no-gutters class="mx-5">
          <v-col>
            <h4 class="accent--text mt-3 ">
              Jenis Ikan
            </h4>
          </v-col>
          <v-col>
            <h4 class="accent--text mt-3 font-weight-regular">
              : {{ this.auction.fish_type }}
            </h4></v-col
          >
        </v-row>
        <v-row no-gutters class="mx-5">
          <v-col>
            <h4 class="accent--text mt-3 ">
              Berat
            </h4>
          </v-col>
          <v-col>
            <h4 class="accent--text mt-3 font-weight-regular">
              : {{ this.auction.weight }} {{ this.auction.weight_unit }}
            </h4></v-col
          >
        </v-row>
        <v-row no-gutters class="mx-5">
          <v-col>
            <h4 class="accent--text mt-3 mb-3 ">
              Nama Nelayan
            </h4>
          </v-col>
          <v-col>
            <h4 class="accent--text mt-3 mb-3 font-weight-regular">
              : {{ this.auction.fisher_name }}
            </h4></v-col
          >
        </v-row>
      </v-card>
      <v-card-text>
        <v-form ref="form">
          <h3 class="mb-3 mt-2 primary--text">
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
            <template v-slot:selection="{ item }">{{
              item.name + " - " + item.nik
            }}</template></v-autocomplete
          >
          <h3 class="mb-3 mt-2 primary--text">
            Total Harga
          </h3>
          <v-text-field
            outlined
            single-line
            prefix="Rp"
            type="number"
            label="Total Harga"
            :rules="required"
            v-model="input.price"
          />
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
  data: () => ({
    required: [v => !!v || "Data ini harus diisi"],
    buyer: [],
    auction: [],
    input: {
      auction_id: null,
      buyer_id: null,
      price: null,
      distribution_area: null
    }
  }),

  mounted() {
    this.getAllBuyer();
    this.getById();
    //this.getAllAuction();
  },

  methods: {
    reset() {
      this.$refs.form.reset();
    },
    async getAllBuyer() {
      try {
        this.buyer = await this.$api("buyer", "inquiry", null);
      } catch (e) {
        console.log(e);
      }
    },
    /*
    async getAllAuction() {
      try {
        this.auction = await this.$api("auction", "inquiry", null);
      } catch (e) {
        console.log(e);
      }
    },
    */
    async getById() {
      try {
        this.auction = await this.$api(
          "auction",
          "get_by_id",
          this.$route.params.id
        );
        this.input.auction_id = this.auction.id;
      } catch (e) {
        console.log(e);
      }
    },
    async storeTransaction() {
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
};
</script>
