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

          <div v-if="superadmin">
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
          </div>
          <div v-if="district">
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
          </div>
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
            :items="checkRole()"
            item-text="role"
            item-value="id"
            label="Peran"
            :rules="required"
            clearable
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
            <v-btn large block color="primary" @click.stop="storeFisher()">
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
    district: true,
    superadmin: false,
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
    role_district: ["Admin TPI", "Petugas TPI"],
    role_superadmin: ["Dinas"]
  }),
  methods: {
    checkRole() {
      if (this.district == true) {
        return this.role_district;
      } else if (this.superadmin == true) {
        return this.role_superadmin;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    //res
    async storeFisher() {
      if (this.$refs.form.validate()) {
        try {
          const result = await this.$api("fisher", "store", this.input).finally(
            response => {
              this.$router.push("/user/dataUser");
              return response;
            }
          );
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
};
</script>
