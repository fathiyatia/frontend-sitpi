<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-toolbar color="secondary" dark elevation="0">
        <v-toolbar-title>Edit Pembeli </v-toolbar-title>
      </v-toolbar>
      <v-spacer></v-spacer>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <h3 class="mb-3 mt-2 primary--text">
            NIK Pembeli
          </h3>
          <v-text-field
            outlined
            single-line
            label="NIK Pembeli"
            :rules="required"
            v-model="input.nik"
          />
          <h3 class="mb-3 mt-2 primary--text">
            Nama Pembeli
          </h3>
          <v-text-field
            outlined
            single-line
            label="Nama Pembeli"
            :rules="required"
            v-model="input.name"
          />
          <h3 class="mb-3 mt-2 primary--text">
            Status
          </h3>
          <v-select
            outlined
            single-line
            :items="status"
            item-text="status"
            item-value="id"
            label="Status"
            clearable
            :rules="required"
            v-model="input.status"
          ></v-select>
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
            No. Telepon
          </h3>
          <v-text-field
            outlined
            single-line
            label="No. Telepon"
            v-model="input.phone_number"
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
    valid: true,
    required: [v => !!v || "Data ini harus diisi"],
    input: {
      nik: null,
      name: null,
      address: null
    },
    status: ["Tetap", "Pendatang"]
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
    //res
    async updateBuyer() {
      if (this.$refs.form.validate()) {
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
  }
};
</script>
