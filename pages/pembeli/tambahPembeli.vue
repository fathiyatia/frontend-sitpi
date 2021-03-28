<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-toolbar color="secondary" dark elevation="0">
        <v-toolbar-title>Pendataan Pembeli</v-toolbar-title>
      </v-toolbar>
      <v-spacer></v-spacer>
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
            NIK Pembeli
          </h3>
          <v-text-field
            outlined
            single-line
            label="NIK Pembeli"
            :rules="required"
            v-model="input.nik"
          />
          <h3 class="mb-3 mt-2 primary--text">
            Nama Pembeli
          </h3>
          <v-text-field
            outlined
            single-line
            label="Nama Pembeli"
            :rules="required"
            v-model="input.name"
          />
          <h3 class="mb-3 mt-2 primary--text">
            Status
          </h3>
          <v-select
            outlined
            single-line
            :items="status"
            item-text="status"
            item-value="id"
            label="Status"
            clearable
            :rules="required"
            v-model="input.status"
          ></v-select>
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
          <h3 class="mb-3 mt-2 primary--text">
            No. Telepon
          </h3>
          <v-text-field
            outlined
            single-line
            label="No. Telepon"
            v-model="input.phone_number"
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center px-3">
        <v-row>
          <v-col md="6">
            <v-btn large block color="accent" :to="'/pembeli/dataPembeli'">
              Batal
            </v-btn>
          </v-col>
          <v-col md="6">
            <v-btn large block color="primary" @click.stop="storeBuyer()">
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
      nik: null,
      name: null,
      status: null,
      address: null,
      phone_number: null
    },
    status: ["Tetap", "Pendatang"]
  }),
  methods: {
    async storeBuyer() {
      if (this.$refs.form.validate()) {
        try {
          const result = await this.$api("buyer", "store", this.input).finally(
            response => {
              return response;
            }
          );
          if (result.status === 200) {
            this.success = true;
            this.messages = "Data pembeli berhasil ditambahkan";
            this.snackbar = true;
            setTimeout(() => {
              this.$router.push("/pembeli/dataPembeli");
            }, 500);
          } else {
            this.success = false;
            this.messages = "Data pembeli gagal ditambahkan";
            this.snackbar = true;
          }
        } catch (e) {
          console.log(e);
          this.success = false;
          this.messages = "Data pembeli gagal ditambahkan";
          this.snackbar = true;
        }
      }
    }
  }
};
</script>
