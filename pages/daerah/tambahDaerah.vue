<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-toolbar color="secondary" dark elevation="0">
        <v-toolbar-title>Pendataan Daerah Tangkapan</v-toolbar-title>
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
        <v-form ref="form">
          <h3 class="mb-3 mt-2 primary--text">
            Kode Daerah Tangkapan
          </h3>
          <v-text-field
            outlined
            single-line
            label="Kode Daerah Tangkapan"
            :rules="required"
            v-model="input.name"
          />
          <h3 class="accent--text">Koordinat Bujur</h3>
          <v-row no-gutters>
            <v-col class="mr-3">
              <h3 class="mb-3 mt-2 primary--text">
                Derajat (D)
              </h3>
              <v-text-field
                outlined
                single-line
                label="Derajat"
                :rules="required"
                v-model="input.east_longitude_degree"
              />
            </v-col>

            <v-col class="mr-3">
              <h3 class="mb-3 mt-2 primary--text">
                Menit (M)
              </h3>
              <v-text-field
                outlined
                single-line
                label="Menit"
                :rules="required"
                v-model="input.east_longitude_minute"
              />
            </v-col>
            <v-col>
              <h3 class="mb-3 mt-2 primary--text">
                Detik (S)
              </h3>
              <v-text-field
                outlined
                single-line
                label="Detik"
                :rules="required"
                v-model="input.east_longitude_second"
              />
            </v-col>
          </v-row>

          <h3 class="accent--text">Koordinat Lintang</h3>
          <v-row no-gutters>
            <v-col class="mr-3">
              <h3 class="mb-3 mt-2 primary--text">
                Derajat (D)
              </h3>
              <v-text-field
                outlined
                single-line
                label="Derajat"
                :rules="required"
                v-model="input.south_latitude_degree"
              />
            </v-col>

            <v-col class="mr-3">
              <h3 class="mb-3 mt-2 primary--text">
                Menit (M)
              </h3>
              <v-text-field
                outlined
                single-line
                label="Menit"
                :rules="required"
                v-model="input.south_latitude_minute"
              />
            </v-col>
            <v-col>
              <h3 class="mb-3 mt-2 primary--text">
                Detik (S)
              </h3>
              <v-text-field
                outlined
                single-line
                label="Detik"
                :rules="required"
                v-model="input.south_latitude_second"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center px-3">
        <v-row>
          <v-col md="6">
            <v-btn large block color="accent" :to="'/daerah/dataDaerah'">
              Batal
            </v-btn>
          </v-col>
          <v-col md="6">
            <v-btn large block color="primary" @click.stop="storeArea()">
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
    required: [v => !!v || "Data ini harus diisi"],
    input: {
      name: null,
      south_latitude_degree: null,
      south_latitude_minute: null,
      south_latitude_second: null,
      east_longitude_degree: null,
      east_longitude_minute: null,
      east_longitude_second: null
    }
  }),
  methods: {
    async storeArea() {
      if (this.$refs.form.validate()) {
        try {
          const result = await this.$api(
            "fishing_area",
            "store",
            this.input
          ).finally(response => {
            return response;
          });
          if (result.status === 200) {
            this.success = true;
            this.messages = "Data daerah berhasil ditambahkan";
            this.snackbar = true;
            setTimeout(() => {
              this.$router.push("/daerah/dataDaerah");
            }, 500);
          } else {
            this.success = false;
            this.messages = "Data daerah gagal ditambahkan";
            this.snackbar = true;
          }
        } catch (e) {
          this.success = false;
          this.messages = "Data daerah gagal ditambahkan";
          this.snackbar = true;
        }
      }
    }
  }
};
</script>
