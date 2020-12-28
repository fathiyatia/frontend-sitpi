<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-toolbar color="secondary" dark elevation="0">
        <v-toolbar-title>Edit Pembeli </v-toolbar-title>
      </v-toolbar>
      <v-spacer></v-spacer>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            outlined
            label="NIK Pembeli"
            :rules="required"
            v-model="input.nik"
          />
          <v-text-field
            outlined
            label="Nama"
            :rules="required"
            v-model="input.name"
          />
          <v-text-field
            outlined
            label="Alamat"
            :rules="required"
            v-model="input.address"
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center px-3">
        <v-row>
          <v-col md="6">
            <v-btn large block color="accent" :to="'/pembeli/dataPembeli'">
              Batal
            </v-btn>
          </v-col>
          <v-col md="6">
            <v-btn large block color="primary" @click="updateBuyer">
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
      nik: null,
      name: null,
      address: null
    }
  }),
  mounted() {
    this.getById();
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    async getById() {
      try {
        this.input = await this.$api(
          "buyer",
          "get_by_id",
          this.$route.params.id
        );
      } catch (e) {
        console.log(e);
      }
    },
    async updateBuyer() {
      try {
        const result = await this.$api("buyer", "update", this.input).finally(
          response => {
            this.$router.push("/pembeli/dataPembeli");
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
