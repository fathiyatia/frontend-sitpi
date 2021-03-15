<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-toolbar color="secondary" dark elevation="0">
        <v-toolbar-title>Edit Daerah Tangkapan</v-toolbar-title>
      </v-toolbar>
      <v-spacer></v-spacer>
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
            <v-btn large block color="primary" @click="updateArea()">
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
      name: null,
      south_latitude_degree: null,
      south_latitude_minute: null,
      south_latitude_second: null,
      east_longitude_degree: null,
      east_longitude_minute: null,
      east_longitude_second: null
    }
  }),
  mounted() {
    this.getById();
  },
  methods: {
    async getById() {
      try {
        this.input = await this.$api(
          "fishing_area",
          "get_by_id",
          this.$route.params.id
        );
      } catch (e) {
        console.log(e);
      }
    },
    async updateArea() {
      if (this.$refs.form.validate()) {
        try {
          const result = await this.$api(
            "fishing_area",
            "update",
            this.input
          ).finally(response => {
            this.$router.push("/daerah/dataDaerah");
            return response;
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
};
</script>
