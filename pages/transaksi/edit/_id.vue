<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-toolbar color="secondary" dark elevation="0">
        <v-toolbar-title>Edit Transaksi </v-toolbar-title>
      </v-toolbar>
      <v-spacer></v-spacer>
      <v-card-text>
        <v-form ref="form">
          <v-autocomplete
            outlined
            label="NIK Pembeli"
            :rules="required"
            v-model="input.buyer_id"
            :items="buyer"
            clearable
            item-text="nik"
            item-value="id"
          >
            <template v-slot:selection="{ item }">{{
              item.nik + " - " + item.name
            }}</template></v-autocomplete
          >
          <v-autocomplete
            outlined
            label="No. Pelelangan"
            :rules="required"
            v-model="input.auction_id"
            :items="auction"
            clearable
            item-text="id"
          >
            <template v-slot:selection="{ item }">{{
              item.id +
                " - Jenis Ikan : " +
                item.fish_type +
                " - Berat : " +
                item.weight +
                " " +
                item.weight_unit
            }}</template></v-autocomplete
          >
          <v-text-field
            outlined
            label="Total Harga (Rp)"
            :rules="required"
            v-model="input.price"
          />
          <v-text-field
            outlined
            label="Daerah Penjualan Ikan"
            :rules="required"
            v-model="input.distribution_area"
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center px-3">
        <v-row>
          <v-col md="6">
            <v-btn large block color="accent" :to="'/transaksi/dataTransaksi'">
              Batal
            </v-btn>
          </v-col>
          <v-col md="6">
            <v-btn large block color="primary" @click="updateTransaction">
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
      buyer_id: null,
      auction_id: null,
      distribution_area: null,
      weight_unit: null,
      price: null
    }
  }),
  mounted() {
    this.getAllBuyer();
    this.getAllAuction();
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    async getById() {
      try {
        this.input = await this.$api(
          "transaction",
          "get_by_id",
          this.$route.params.id
        );
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
    async getAllAuction() {
      try {
        this.auction = await this.$api("auction", "inquiry", null).finally(
          async () => {
            await this.getById();
          }
        );
        this.auction.push({
          id: this.input.auction_id,
          fish_type: this.input.fish_type,
          weight: this.input.weight,
          weight_unit: this.input.weight_unit
        });
      } catch (e) {
        console.log(e);
      }
    },
    async updateTransaction() {
      try {
        const result = await this.$api(
          "transaction",
          "update",
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
