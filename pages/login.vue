<template>
  <v-card max-width="1200px" class="pa-7 rounded-lg" tile elevation="5">
    <v-card-title class="d-flex justify-center">
      Aplikasi Pelelangan Ikan Terintegrasi
    </v-card-title>
    <v-card-subtitle class="d-flex justify-center">
      Isi username dan password untuk masuk ke dalam sistem
    </v-card-subtitle>
    <v-form class="pt-3" ref="form" v-model="valid" lazy-validation>
      <v-text-field
        outlined
        single-line
        :rules="required"
        label="Username"
        prepend-inner-icon="mdi-account-circle"
      />
      <v-text-field
        outlined
        single-line
        :rules="required"
        label="Password"
        prepend-inner-icon="mdi-lock"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="handleclick"
      />
      <span>Masuk sebagai : </span>
      <v-radio-group row class="check" :rules="required">
        <v-radio class="pb-3" label="Petugas TPI" value="1"></v-radio>
        <v-radio class="pb-3" label="Dinas Kabupaten" value="2"></v-radio>
      </v-radio-group>
    </v-form>
    <v-card-actions class="px-0">
      <v-btn color="primary" block @click="login()">Masuk</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  layout: "blank",
  data() {
    return {
      showPassword: false,
      valid: true,
      required: [v => !!v || "Data ini harus diisi"]
    };
  },
  methods: {
    handleclick() {
      this.showPassword = !this.showPassword;
    },
    login() {
      if (this.$refs.form.validate()) {
        this.$router.push("/");
      }
    }
  }
};
</script>
