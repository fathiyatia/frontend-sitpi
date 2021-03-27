<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-toolbar color="secondary" dark elevation="0">
        <v-toolbar-title>Edit TPI</v-toolbar-title>
      </v-toolbar>
      <v-spacer></v-spacer>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <h3 class="mb-3 mt-2 primary--text">
            Kode TPI
          </h3>
          <v-text-field
            outlined
            single-line
            label="Kode TPI "
            :rules="required"
            v-model="input.code"
          />
          <h3 class="mb-3 mt-2 primary--text">
            Nama TPI
          </h3>
          <v-text-field
            outlined
            single-line
            label="Nama TPI"
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
          <h3 class="mb-3 mt-2 primary--text">
            Kepala TPI
          </h3>
          <v-text-field
            outlined
            single-line
            label="Kepala TPI"
            v-model="input.pic"
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center px-3">
        <v-row>
          <v-col md="6">
            <v-btn large block color="accent" :to="'/tpi/dataTPI'">
              Batal
            </v-btn>
          </v-col>
          <v-col md="6">
            <v-btn large block color="primary" @click="updateTpi">
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
      code: null,
      name: null,
      address: null,
      phone_number: null,
      pic: null
    }
  }),
  mounted() {
    this.getById();
  },
  methods: {
    async getById() {
      try {
        this.input = await this.$api("tpi", "get_by_id", this.$route.params.id);
      } catch (e) {
        console.log(e);
      }
    },
    //res
    async updateTpi() {
      if (this.$refs.form.validate()) {
        try {
          const result = await this.$api("tpi", "update", this.input).finally(
            response => {
              this.$router.push("/tpi/dataTPI");
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
