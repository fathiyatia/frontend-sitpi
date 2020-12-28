<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-toolbar color="secondary" dark elevation="0">
        <v-toolbar-title>Pendaftaran Nelayan</v-toolbar-title>
      </v-toolbar>
      <v-spacer></v-spacer>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            outlined
            label="NIK Nelayan"
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
            <v-btn large block color="accent" :to="'/nelayan/dataNelayan'">
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
    required: [v => !!v || "Data ini harus diisi"],
    input: {
      nik: null,
      name: null,
      address: null
    }
  }),
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    async storeFisher() {
      try {
        const result = await this.$api("fisher", "store", this.input).finally(
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
