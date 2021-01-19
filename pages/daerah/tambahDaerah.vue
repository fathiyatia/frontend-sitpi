<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-toolbar color="secondary" dark elevation="0">
        <v-toolbar-title>Pendataan Daerah Tangkapan</v-toolbar-title>
      </v-toolbar>
      <v-spacer></v-spacer>
      <v-card-text>
        <v-form ref="form">
          <h3 class="mb-3 mt-2 primary--text">
            Nama Daerah
          </h3>
          <v-text-field
            outlined
            single-line
            label="Nama Daerah"
            :rules="required"
            v-model="input.nik"
          />
          <h2 class="accent--text">Koordinat Bujur</h2>
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
                v-model="input.name"
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
                v-model="input.name"
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
                v-model="input.name"
              />
            </v-col>
          </v-row>

          <h2 class="accent--text">Koordinat Lintang</h2>
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
                v-model="input.name"
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
                v-model="input.name"
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
                v-model="input.name"
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
    required: [v => !!v || "Data ini harus diisi"],
    input: {
      nik: null,
      name: null,
      address: null
    }
  }),
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    async storeBuyer() {
      if (this.$refs.form.validate()) {
        try {
          const result = await this.$api("buyer", "store", this.input).finally(
            response => {
              this.$router.push("/pembeli/dataPembeli");
              return response;
            }
          );
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
};
</script>
