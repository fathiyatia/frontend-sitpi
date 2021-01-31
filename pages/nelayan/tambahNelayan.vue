<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-card color="secondary" dark elevation="0">
        <v-card-title class="mb-1">Pendataan Nelayan</v-card-title>
      </v-card>
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
            :rules="required"
            v-model="input.phone"
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
  data: () => ({
    valid: true,
    required: [v => !!v || "Data ini harus diisi"],
    input: {
      nik: null,
      name: null,
      status: null,
      address: null,
      phone: null,
      ship_type: null,
      abk_total: null
    },
    ship_type: [],
    status: [
      { status: "Tetap", id: "1" },
      { status: "Pendatang", id: "2" }
    ]
  }),
  mounted() {
    this.getAllShip();
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    async storeFisher() {
      if (this.$refs.form.validate()) {
        try {
          const result = await this.$api("fisher", "store", this.input).finally(
            response => {
              this.$router.push("/nelayan/dataNelayan");
              return response;
            }
          );
        } catch (e) {
          console.log(e);
        }
      }
    },
    async getAllShip() {
      try {
        this.ship_type = await this.$api("fisher", "inquiry", null);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
