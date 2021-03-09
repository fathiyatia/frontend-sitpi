<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-card color="secondary" dark elevation="0">
        <v-card-title class="mb-1">Pendaftaran User</v-card-title>
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
            Pilih Lokasi TPI
          </h3>
          <v-combobox
            outlined
            single-line
            label="Pilih Lokasi TPI"
            :rules="required"
            v-model="input.tpi"
            :items="tpi"
            clearable
          >
          </v-combobox>
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
          <h3 class="mb-3 mt-2 primary--text">
            Peran
          </h3>
          <v-select
            outlined
            single-line
            :items="role"
            item-text="role_name"
            item-value="id"
            label="Peran"
            :rules="required"
            v-model="input.role_id"
          ></v-select>
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
      tpi: null,
      username: null,
      role_id: null
    },
    tpi: ["TPI Indramayu", "TPI Sukabumi"],
    role: [
      { role_name: "Petugas TPI", id: "4" },
      { role_name: "Kasir", id: "5" }
    ]
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
            "register_tpi_officer",
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
