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
            v-model="fisherid"
            :rules="required"
          />
          <template>
            <h3 class="accent--text">Hasil Tangkapan</h3>
            <br />
            <v-select
              :items="fishtype"
              label="Jenis Ikan"
              outlined
              v-model="caught.fish"
              :rules="required"
            ></v-select>
            <v-row>
              <v-col md="6">
                <v-text-field
                  outlined
                  label="Berat"
                  type="number"
                  v-model="caught.weight"
                />
              </v-col>
              <v-col md="6">
                <v-select
                  :items="unittype"
                  label="Satuan"
                  outlined
                  v-model="caught.unit"
                ></v-select>
              </v-col>
            </v-row>
            <v-select
              :items="geartype"
              label="Alat Tangkap"
              outlined
              v-model="caught.gear"
            ></v-select>
            <v-text-field
              outlined
              label="Daerah Tangkapan"
              v-model="caught.area"
            />
          </template>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center px-3">
        <v-row>
          <v-col md="6">
            <v-btn large block color="accent" @click="reset">
              Batal
            </v-btn>
          </v-col>
          <v-col md="6">
            <v-btn large block color="primary" :to="'/tangkapan/dataTangkapan'">
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
    caught: [
      {
        fish: "",
        gear: "",
        area: "",
        check: null,
        weight: null,
        weightauction: null,
        unit: "",
        unitauction: ""
      }
    ],
    required: [v => !!v || "Data ini harus diisi"]
  }),
  methods: {
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
