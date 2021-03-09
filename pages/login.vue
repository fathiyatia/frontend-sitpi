<template>
  <v-card max-width="1200px" class="pa-7 rounded-lg" tile elevation="5">
    <!---- Alert ----->
    <template>
      <alert v-model="snackbar" :success="success" :messages="messages"></alert>
    </template>
    <v-card-title class="d-flex justify-center">
      Aplikasi Pelelangan Ikan Terintegrasi
    </v-card-title>
    <v-card-subtitle class="pt-2 d-flex justify-center">
      Isi username dan kata sandi untuk masuk ke dalam sistem
    </v-card-subtitle>
    <span v-if="showError" class="pt-2 d-flex justify-center red--text"
      >Username atau password yang Anda masukkan salah</span
    >
    <v-form class="pt-5" ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="input.username"
        outlined
        single-line
        :rules="required"
        label="Username"
        prepend-inner-icon="mdi-account-circle"
      />
      <v-text-field
        v-model="input.password"
        outlined
        single-line
        :rules="required"
        label="Kata Sandi"
        prepend-inner-icon="mdi-lock"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="handleclick"
      />
    </v-form>
    <v-card-actions class="px-0">
      <v-btn color="primary" large block @click="login()">Masuk</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  layout: "blank",
  auth: "guest",
  data() {
    return {
      showError: false,
      //test alert
      snackbar: false,
      success: false,
      messages: "",
      icon: "",
      timeout: 2000,
      showPassword: false,
      valid: true,
      required: [v => !!v || "Data ini harus diisi"],
      input: {
        username: null,
        password: null
      }
    };
  },
  methods: {
    handleclick() {
      this.showPassword = !this.showPassword;
    },
    //cek
    async login() {
      if (this.$refs.form.validate()) {
        try {
          let response = await this.$auth.loginWith("local", {
            data: this.input
          });
          console.log(response);
        } catch (err) {
          this.showError = true;
          console.log(err);
        }
      }
    }
  }
};
</script>
