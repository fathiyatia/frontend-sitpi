<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-toolbar color="secondary" dark elevation="0">
        <v-toolbar-title>Form Transaksi </v-toolbar-title>
      </v-toolbar>
      <v-spacer></v-spacer>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            outlined
            label="NIK Pembeli"
            :rules="required"
            v-model="input.buyer_id"
          />
          <v-text-field
            outlined
            label="No. Pelelangan"
            :rules="required"
            v-model="input.auction_id"
          />
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
    input: {
      buyer_id: null,
      auction_id: null,
      price: null,
      distribution_area: null
    }
  }),
  methods: {
    reset() {
      this.$refs.form.reset();
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
