<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-card color="secondary" dark elevation="0">
        <v-card-title class="mb-1">Pendataan Nelayan</v-card-title>
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
            NIK Nelayan / Nahkoda
          </h3>
          <v-text-field
            outlined
            single-line
            label="NIK Nelayan / Nahkoda"
            :rules="required"
            v-model="input.nik"
          />
          <h3 class="mb-3 mt-2 primary--text">
            Nama Lengkap Nelayan / Nahkoda
          </h3>
          <v-text-field
            outlined
            single-line
            label="Nama Lengkap Nelayan / Nahkoda"
            :rules="required"
            v-model="input.name"
          />
          <h3 class="mb-3 mt-2 primary--text">
            Nama Panggilan Nelayan / Nahkoda
          </h3>
          <v-text-field
            outlined
            single-line
            label="Nama Panggilan Nelayan / Nahkoda"
            :rules="required"
            v-model="input.nick_name"
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
            :rules="required"
            clearable
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
          <h3 class="mb-3 mt-2 primary--text">
            Jenis Kapal
          </h3>
          <v-combobox
            outlined
            single-line
            label="Jenis Kapal"
            :rules="required"
            v-model="input.ship_type"
            :items="ship_type"
            clearable
          >
          </v-combobox>

          <h3 class="mb-3 mt-2 primary--text">
            Jumlah Anak Buah Kapal (ABK)
          </h3>
          <v-text-field
            outlined
            single-line
            suffix="orang"
            label="Jumlah Anak Buah Kapal (ABK)"
            type="number"
            :rules="required"
            v-model="input.abk_total"
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
  middleware: "permission",
  data: () => ({
    snackbar: false,
    success: false,
    messages: "",
    valid: true,
    required: [v => !!v || "Data ini harus diisi"],
    input: {
      nik: null,
      name: null,
      nick_name: null,
      status: null,
      address: null,
      phone_number: null,
      ship_type: null,
      abk_total: null
    },
    ship_type: [
      "Perahu Tak Bermotor - Jukung",
      "Perahu Tak Bermotor - Perahu Papan",
      "Perahu Motor Tempel",
      "Kapal Motor < 5 GT",
      "Kapal Motor 5-10 GT",
      "Kapal Motor 11-20 GT",
      "Kapal Motor 21-50 GT",
      "Kapal Motor 51-100 GT",
      "Kapal Motor > 100 GT"
    ],
    status: ["Tetap", "Pendatang"]
  }),
  methods: {
    async storeFisher() {
      if (this.$refs.form.validate()) {
        try {
          const result = await this.$api("fisher", "store", this.input).finally(
            response => {
              return response;
            }
          );
          if (result.status === 200) {
            this.success = true;
            this.messages = "Data nelayan berhasil ditambahkan";
            this.snackbar = true;
            setTimeout(() => {
              this.$router.push("/nelayan/dataNelayan");
            }, 500);
          } else {
            this.success = false;
            this.messages = "Data nelayan gagal ditambahkan";
            this.snackbar = true;
          }
        } catch (e) {
          this.success = false;
          this.messages = "Data nelayan gagal ditambahkan";
          this.snackbar = true;
        }
      }
    }
  }
};
</script>
