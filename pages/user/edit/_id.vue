<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-card color="secondary" dark elevation="0">
        <v-card-title class="mb-1">Edit User</v-card-title>
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
            type="number"
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
          <div v-if="this.$auth.$state.user.user.role.name == 'tpi-admin'">
            <h3 class="mb-3 mt-2 primary--text">
              Peran
            </h3>
            <v-select
              outlined
              single-line
              :items="role"
              item-text="name"
              item-value="id"
              label="Peran"
              :rules="required"
              v-model="input.role_id"
            ></v-select>
          </div>
          <h3 class="mb-3 mt-2 primary--text">
            Status
          </h3>
          <v-select
            outlined
            single-line
            :items="status"
            item-text="name"
            item-value="id"
            label="Status"
            :rules="required"
            v-model="input.user_status_id"
          ></v-select>
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
            <v-btn large block color="primary" @click="updateUser">
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
      tpi: null,
      username: null,
      role_id: null,
      user_status_id: null
    },
    tpi: ["TPI Indramayu", "TPI Sukabumi"],
    role: [
      { name: "Admin TPI", id: 3 },
      { name: "Petugas TPI", id: 4 },
      { name: "Kasir", id: 5 }
    ],
    status: [
      { name: "Aktif", id: 1 },
      { name: "Tidak Aktif", id: 2 }
    ]
  }),
  mounted() {
    this.getById();
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    async getById() {
      try {
        this.input = await this.$api(
          "user",
          "get_by_id",
          this.$route.params.id
        ).finally(response => {
          return response;
        });
      } catch (e) {
        console.log(e);
      }
    },

    async updateUser() {
      if (this.$refs.form.validate()) {
        try {
          const result = await this.$api("user", "update", this.input).finally(
            response => {
              return response;
            }
          );
          if (result.status === 200) {
            this.success = true;
            this.messages = "Data berhasil diubah";
            this.snackbar = true;
            setTimeout(() => {
              this.$router.push("/user/dataUser");
            }, 500);
          } else {
            this.success = false;
            this.messages = "Data gagal diubah";
            this.snackbar = true;
          }
        } catch (e) {
          this.success = false;
          this.messages = "Data gagal diubah";
          this.snackbar = true;
        }
      }
    }
  }
};
</script>
