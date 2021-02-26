<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-card color="secondary" dark elevation="0">
        <v-card-title class="mb-1">Pendataan TPI</v-card-title>
      </v-card>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <h3 class="mb-3 mt-2 primary--text">
            Nama Tempat Pelelangan Ikan
          </h3>
          <v-text-field
            outlined
            single-line
            label="Nama "
            :rules="required"
            v-model="input.name"
          />
          <h3 class="mb-3 mt-2 primary--text">
            Lokasi
          </h3>
          <v-text-field
            outlined
            single-line
            label="Lokasi"
            :rules="required"
            v-model="input.location"
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
    valid: true,
    required: [v => !!v || "Data ini harus diisi"],
    input: {
      name: null,
      location: null
    }
  }),
  methods: {
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
