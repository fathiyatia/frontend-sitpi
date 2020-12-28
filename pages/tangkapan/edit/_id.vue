<template>
  <v-container>
    <v-card tile elevation="4" class="rounded-lg front-card">
      <v-toolbar color="secondary" dark elevation="0">
        <v-toolbar-title>Edit Tangkapan Ikan</v-toolbar-title>
      </v-toolbar>
      <v-spacer></v-spacer>
      <v-card-text>
        <v-form ref="form">
          <h3 class="accent--text">Identitas Nelayan</h3>
          <br />
          <v-text-field
            outlined
            label="NIK Nelayan"
            v-model="input.fisher_id"
            :rules="required"
          />
          <template>
            <h3 class="accent--text">Hasil Tangkapan</h3>
            <br />
            <v-select
              :items="fishtype"
              label="Jenis Ikan"
              outlined
              v-model="input.fish_type_id"
              :rules="required"
            ></v-select>
            <v-row>
              <v-col md="6">
                <v-text-field
                  outlined
                  label="Berat"
                  type="number"
                  v-model="input.weight"
                />
              </v-col>
              <v-col md="6">
                <v-select
                  :items="unittype"
                  label="Satuan"
                  outlined
                  v-model="input.weight_unit"
                ></v-select>
              </v-col>
            </v-row>
            <v-select
              :items="geartype"
              label="Alat Tangkap"
              outlined
              v-model="input.fishing_gear"
            ></v-select>
            <v-text-field
              outlined
              label="Daerah Tangkapan"
              v-model="input.fishing_area"
            />
          </template>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center px-3">
        <v-row>
          <v-col md="6">
            <v-btn large block color="accent" :to="'/tangkapan/dataTangkapan'">
              Batal
            </v-btn>
          </v-col>
          <v-col md="6">
            <v-btn large block color="primary" @click="updateCaught">
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
    geartype: ["Jaring", "Pancingan"],
    fishtype: ["Tuna", "Bandeng", "Bawal", "Kakap"],
    unittype: ["Kg", "Kwintal", "Ton"],
    input: {
      fisher_id: null,
      fish_type_id: null,
      fishing_gear: null,
      fishing_area: null,
      weight: null,
      weight_unit: null
    },
    required: [v => !!v || "Data ini harus diisi"]
  }),
  mounted() {
    this.getById();
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    async getById() {
      console.log("Masuk");
      try {
        this.input = await this.$api(
          "caught",
          "get_by_id",
          this.$route.params.id
        );
      } catch (e) {
        console.log(e);
      }
    },
    async updateCaught() {
      try {
        const result = await this.$api("caught", "update", this.input).finally(
          response => {
            this.$router.push("/tangkapan/dataTangkapan");
            return response;
          }
        );
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
