<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-card color="secondary" dark elevation="0">
        <v-card-title class="mb-1">Pendaftaran Kasir</v-card-title>
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
            Nama
          </h3>
          <v-text-field
            outlined
            single-line
            label="Nama "
            :rules="required"
            v-model="input.name"
          />
          <h3 class="mb-3 mt-2 primary--text">
            NIK
          </h3>
          <v-text-field
            outlined
            single-line
            label="NIK"
            :rules="required"
            v-model="input.nik"
          />
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
          <div v-if="checkRole()">
            <h3 class="mb-3 mt-2 primary--text">
              Pilih Lokasi TPI
            </h3>
            <v-autocomplete
              outlined
              single-line
              label="Pilih Lokasi TPI"
              :rules="required"
              v-model="input.tpi"
              :items="tpi"
              item-text="name"
              item-value="id"
              clearable
            >
            </v-autocomplete>
          </div>
          <h3 class="mb-3 mt-2 primary--text">
            Username
          </h3>
          <v-text-field
            outlined
            single-line
            label="Username"
            :rules="required"
            v-model="input.username"
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
            <v-btn large block color="primary" @click.stop="register()">
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
    snackbar: false,
    success: false,
    messages: "",
    valid: true,
    required: [v => !!v || "Data ini harus diisi"],
    input: {
      name: null,
      nik: null,
      address: null,
      username: null,
      tpi: null
    },
    tpi: []
  }),
  mounted() {
    this.getAllTpi();
  },

  methods: {
    reset() {
      this.$refs.form.reset();
    },
    checkRole() {
      if (this.$auth.$state.user.user.role.name == "tpi-admin") {
        this.input.tpi = this.$auth.$state.user.location_data.location_id;
        return false;
      } else {
        return true;
      }
    },
    async getAllTpi() {
      try {
        this.tpi = await this.$api("tpi", "index", null);
      } catch (e) {
        console.log(e);
      }
    },

    async register() {
      if (this.$refs.form.validate()) {
        try {
          const result = await this.$api(
            "user",
            "register_tpi_cashier",
            this.input
          ).finally(response => {
            return response;
          });
          if (result.status === 200) {
            this.success = true;
            this.messages = "Akun kasir berhasil ditambahkan";
            this.snackbar = true;
            setTimeout(() => {
              this.$router.push("/user/dataUser");
            }, 500);
          } else {
            this.success = false;
            this.messages = "Akun kasir gagal ditambahkan";
            this.snackbar = true;
          }
        } catch (e) {
          console.log(e);
          this.success = false;
          this.messages = "Akun kasir gagal ditambahkan";
          this.snackbar = true;
        }
      }
    }
  }
};
</script>
