<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-toolbar color="secondary" dark elevation="0">
        <v-toolbar-title>Edit Nelayan</v-toolbar-title>
      </v-toolbar>
      <v-spacer></v-spacer>
      <v-card-text>
        <v-form ref="form">
          <h3 class="mb-3 mt-2 primary--text">
            NIK Nelayan / Nahkoda
          </h3>
          <v-text-field
            outlined
            single-line
            label="NIK Nelayan / Nahkoda"
            :rules="required"
            v-model="input.nik"
          />
          <h3 class="mb-3 mt-2 primary--text">
            Nama Lengkap Nelayan / Nahkoda
          </h3>
          <v-text-field
            outlined
            single-line
            label="Nama Lengkap Nelayan / Nahkoda"
            :rules="required"
            v-model="input.name"
          />
          <h3 class="mb-3 mt-2 primary--text">
            Alamat
          </h3>
          <v-text-field
            outlined
            single-line
            label="Alamat"
            :rules="required"
            v-model="input.address"
          />
          <h3 class="mb-3 mt-2 primary--text">
            Jenis Kapal
          </h3>
          <v-text-field
            outlined
            single-line
            label="Jenis Kapal"
            :rules="required"
            v-model="input.ship_type"
          />
          <h3 class="mb-3 mt-2 primary--text">
            Jumlah Anak Buah Kapal (ABK)
          </h3>
          <v-text-field
            outlined
            single-line
            label="Jumlah Anak Buah Kapal (ABK)"
            :rules="required"
            type="number"
            v-model="input.abk_total"
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
            <v-btn large block color="primary" @click="updateFisher">
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
      address: null,
      ship_type: null,
      abk_total: null
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
          "fisher",
          "get_by_id",
          this.$route.params.id
        );
      } catch (e) {
        console.log(e);
      }
    },
    async updateFisher() {
      try {
        const result = await this.$api("fisher", "update", this.input).finally(
          response => {
            this.$router.push("/nelayan/dataNelayan");
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
