<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-card color="secondary" dark elevation="0">
        <v-card-title class="mb-1">Pendaftaran Kasir</v-card-title>
      </v-card>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <h3 class="mb-3 mt-2 primary--text">
            Nama
          </h3>
          <v-text-field
            outlined
            single-line
            label="Nama "
            :rules="required"
            v-model="input.name"
          />
          <h3 class="mb-3 mt-2 primary--text">
            NIK
          </h3>
          <v-text-field
            outlined
            single-line
            label="NIK"
            :rules="required"
            v-model="input.nik"
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
            Username
          </h3>
          <v-text-field
            outlined
            single-line
            label="Username"
            :rules="required"
            v-model="input.username"
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center px-3">
        <v-row>
          <v-col md="6">
            <v-btn large block color="accent" :to="'/user/dataUser'">
              Batal
            </v-btn>
          </v-col>
          <v-col md="6">
            <v-btn large block color="primary" @click.stop="register()">
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
    valid: true,
    required: [v => !!v || "Data ini harus diisi"],
    input: {
      name: null,
      nik: null,
      address: null,

      username: null
    },
    tpi: ["TPI Indramayu", "TPI Sukabumi"]
  }),
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    //res
    async register() {
      if (this.$refs.form.validate()) {
        try {
          const result = await this.$api(
            "user",
            "register_tpi_cashier",
            this.input
          ).finally(response => {
            this.$router.push("/user/dataUser");
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
