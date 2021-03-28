<template>
  <v-container>
    <v-card
      max-width="400px"
      tile
      elevation="4"
      class="mt-3 rounded-lg front-card"
    >
      <v-card color="secondary" dark elevation="0">
        <v-card-title class="mb-1">Ubah Password</v-card-title>
      </v-card>

      <!---- Alert ----->
      <template>
        <alert
          v-model="snackbar"
          :success="success"
          :messages="messages"
        ></alert>
      </template>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <h3 class="mb-3 mt-2 primary--text">
            Password saat ini
          </h3>
          <v-text-field
            outlined
            dense
            single-line
            label="Masukkan password saat ini"
            :rules="required"
            v-model="input.old_password"
            type="password"
          />

          <h3 class="mb-3 primary--text">
            Password baru
          </h3>
          <v-text-field
            outlined
            dense
            single-line
            label="Masukkan password baru"
            :rules="rules"
            v-model="input.new_password"
            type="password"
          />
          <h3 class="mb-3 primary--text">
            Konfirmasi password baru
          </h3>
          <v-text-field
            dense
            outlined
            single-line
            label="Masukkan kembali password baru"
            :rules="rules"
            v-model="input.new_password_confirm"
            type="password"
          />
        </v-form>
        <v-card-actions class="justify-center">
          <v-row>
            <v-col md="6" class="py-0 px-2">
              <v-btn large block color="accent" :to="'/pembeli/dataPembeli'">
                Batal
              </v-btn>
            </v-col>
            <v-col md="6" class="py-0 px-2">
              <v-btn large block color="primary" @click.stop="changePassword()">
                Ubah Password
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    snackbar: false,
    success: false,
    messages: "",
    valid: true,
    required: [v => !!v || "Data ini harus diisi"],
    input: {
      old_password: null,
      new_password: null,
      new_password_confirm: null
    }
  }),

  computed: {
    rules() {
      const rules = [];
      if (this.input.new_password) {
        const rule = v =>
          (!!v && v) === this.input.new_password || "Password tidak sama";

        rules.push(rule);
      } else {
        const rule = v => !!v || "Data ini harus diisi";
        rules.push(rule);
      }

      return rules;
    }
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },

    logout() {
      try {
        //this.$router.push("/login");
        this.isLogin = false;
        this.$api("user", "logout").finally(() => {
          this.$router.push("/login");
        });
      } catch (e) {
        console.log(e);
      }
    },
    async changePassword() {
      if (this.$refs.form.validate()) {
        try {
          const result = await this.$api(
            "user",
            "change_password",
            this.input
          ).finally(response => {
            return response;
          });
          if (result.status === 200) {
            this.success = true;
            this.messages = "Password berhasil diubah, silahkan login kembali";
            this.snackbar = true;
            setTimeout(() => {
              this.logout();
            }, 1500);
          } else {
            this.success = false;
            this.messages = "Password gagal diubah";
            this.snackbar = true;
          }
        } catch (e) {
          console.log(e);
          this.success = false;
          this.messages = "Password gagal diubah";
          this.snackbar = true;
        }
      }
    }
  }
};
</script>
