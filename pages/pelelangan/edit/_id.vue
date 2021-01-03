<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-toolbar color="secondary" dark elevation="0">
        <v-toolbar-title>Edit Pelelangan </v-toolbar-title>
      </v-toolbar>
      <v-spacer></v-spacer>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            outlined
            label="Jumlah Lelang"
            :rules="required"
            v-model="input.weight"
          />
          <v-autocomplete
            outlined
            label="Satuan"
            :rules="required"
            v-model="input.weight_unit"
            :items="weightunit"
            clearable
            item-text="name"
            item-value="id"
          >
            <template v-slot:selection="{ item }">{{
              item.name
            }}</template></v-autocomplete
          >
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center px-3">
        <v-row>
          <v-col md="6">
            <v-btn
              large
              block
              color="accent"
              :to="'/pelelangan/dataPelelangan'"
            >
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
    weightunit: [],
    required: [v => !!v || "Data ini harus diisi"],
    input: {
      weight: null,
      weight_unit: null
    }
  }),
  mounted() {
    this.getById();
    this.getAllWeightUnit();
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
    async getAllWeightUnit() {
      try {
        this.weightunit = await this.$api("weight_unit", "index", null);
      } catch (e) {
        console.log(e);
      }
    },
    async updateAuction() {
      try {
        const result = await this.$api("auction", "update", this.input).finally(
          response => {
            this.$router.push("/pelelangan/dataPelelangan");
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
