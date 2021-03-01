<template>
  <v-container>
    <v-card max-width="400px" tile elevation="4" class="mt-3 rounded-lg">
      <v-toolbar color="secondary" dark elevation="0">
        <v-toolbar-title>Ubah Kata Sandi</v-toolbar-title>
      </v-toolbar>
      <v-spacer></v-spacer>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <h3 class="mb-3 mt-2 primary--text">
            Masukkan kata sandi saat ini
          </h3>
          <v-text-field
            outlined
            single-line
            label="Masukkan kata sandi saat ini"
            :rules="required"
            v-model="input.old_password"
            type="password"
          />

          <h3 class="mb-3 primary--text">
            Masukkan kata sandi baru
          </h3>
          <v-text-field
            outlined
            single-line
            label="Masukkan kata sandi baru"
            :rules="rules"
            v-model="input.new_password"
            type="password"
          />
          <h3 class="mb-3 primary--text">
            Masukkan kembali kata sandi baru
          </h3>
          <v-text-field
            outlined
            single-line
            label="Masukkan kembali kata sandi baru"
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
              <v-btn large block color="primary" @click.stop="storeBuyer()">
                Simpan
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
          (!!v && v) === this.input.new_password || "Values do not match";

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
    async storeBuyer() {
      if (this.$refs.form.validate()) {
        this.$router.push("/pembeli/dataPembeli");
        return response;
      }
    }
  }
};
</script>
