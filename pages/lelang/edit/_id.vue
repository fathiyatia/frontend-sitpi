<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-card color="secondary" dark elevation="0">
        <v-card-title class="mb-1">Edit Hasil Lelang</v-card-title>
      </v-card>
      <v-spacer></v-spacer>
      <v-card-text>
        <v-form ref="form">
          <h3 class="mb-3 mt-2 primary--text">
            Harga
          </h3>
          <v-text-field
            outlined
            single-line
            prefix="Rp"
            label="Harga"
            :rules="required"
            v-model="input.price"
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center px-3">
        <v-row>
          <v-col md="6">
            <v-btn large block color="accent" :to="'/lelang/dataLelang'">
              Batal
            </v-btn>
          </v-col>
          <v-col md="6">
            <v-btn large block color="primary" @click="updateAuction">
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
    //cek
    input: {
      buyer_id: null,
      //auction_id: null,
      distribution_area: null,
      weight_unit: null,
      price: null
    }
  }),
  mounted() {
    this.getAllAuction();
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    async getById() {
      try {
        this.input = await this.$api(
          "auction",
          "get_by_id",
          this.$route.params.id
        );
      } catch (e) {
        console.log(e);
      }
    },
    //cek
    async getAllAuction() {
      try {
        this.auction = await this.$api("auction", "inquiry", null).finally(
          async () => {
            await this.getById();
          }
        );
      } catch (e) {
        console.log(e);
      }
    },
    //res
    async updateAuction() {
      try {
        const result = await this.$api("auction", "update", this.input).finally(
          response => {
            this.$router.push("/lelang/dataLelang");
            return response;
          }
        );
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
