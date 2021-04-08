<template>
  <v-card max-width="1200px" class="pa-7 rounded-lg" tile elevation="5">
    <!---- Alert ----->
    <template>
      <alert v-model="snackbar" :success="success" :messages="messages"></alert>
    </template>
    <h2 class="px-1 primary--text d-flex justify-center font-weight-medium">
      Aplikasi Pelelangan Ikan Terintegrasi
    </h2>
    <h4 class="px-1 pt-1 d-flex justify-center font-weight-regular">
      Isi username dan password untuk masuk ke dalam sistem
    </h4>
    <span v-if="showError" class="pt-2 d-flex justify-center red--text"
      >Username atau password yang Anda masukkan salah</span
    >
    <v-form class="pt-7" ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="input.username"
        outlined
        single-line
        :rules="required"
        label="Username"
        prepend-inner-icon="mdi-account-circle"
        @keyup.enter="login()"
      />
      <v-text-field
        v-model="input.password"
        outlined
        single-line
        :rules="required"
        label="Password"
        prepend-inner-icon="mdi-lock"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="handleclick"
        @keyup.enter="login()"
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
