<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-toolbar color="secondary" dark elevation="0">
        <v-toolbar-title>Edit Pelelangan </v-toolbar-title>
      </v-toolbar>
      <v-spacer></v-spacer>
      <v-card-text>
        <v-form ref="form">
          <v-text-field outlined label="Jumlah Lelang" :rules="required" />
          <v-select
            :items="unittype"
            label="Satuan"
            outlined
            :rules="required"
          ></v-select>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center px-3">
        <v-row>
          <v-col md="6">
            <v-btn large block color="accent" @click="reset">
              Batal
            </v-btn>
          </v-col>
          <v-col md="6">
            <v-btn large block color="primary"> Simpan </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    unittype: ["Kg", "Kwintal", "Ton"],
    required: [v => !!v || "Data ini harus diisi"]
  }),
  methods: {
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
