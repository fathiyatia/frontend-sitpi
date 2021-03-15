<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-card color="secondary" dark elevation="0">
        <v-card-title class="mb-1">Pendaftaran Admin Dinas</v-card-title>
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
            Pilih Provinsi
          </h3>
          <v-autocomplete
            outlined
            single-line
            label="Pilih Provinsi"
            :rules="required"
            v-model="input.province"
            :items="province"
            clearable
            item-text="name"
            item-value="id"
            @change="getAllDistrict()"
          >
          </v-autocomplete>
          <h3 class="mb-3 mt-2 primary--text">
            Pilih Kabupaten / Kota
          </h3>
          <v-autocomplete
            outlined
            single-line
            label="Pilih Kabupaten / Kota"
            :rules="required"
            v-model="input.district"
            :items="district"
            clearable
            item-text="name"
            item-value="id"
          >
          </v-autocomplete>
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
      province: null,
      district: null,
      username: null
    },
    district: [],
    province: []
  }),
  mounted() {
    this.getAllProvince();
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    async getAllProvince() {
      try {
        this.province = await this.$api("province", "index", null);
      } catch (e) {
        console.log(e);
      }
    },
    async getAllDistrict() {
      try {
        this.district = await this.$api(
          "district",
          "index",
          this.input.province
        );
      } catch (e) {
        console.log(e);
      }
    },
    //res
    async register() {
      if (this.$refs.form.validate()) {
        try {
          const result = await this.$api(
            "user",
            "register_district_admin",
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
