<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-toolbar color="secondary" dark elevation="0">
        <v-toolbar-title>Form Tangkapan Ikan</v-toolbar-title>
      </v-toolbar>
      <v-spacer></v-spacer>
      <v-card-text>
        <v-form ref="form">
          <h3 class="accent--text">Identitas Nelayan</h3>
          <br />
          <v-text-field
            outlined
            label="NIK Nelayan"
            v-model="input.fisherid"
            :rules="required"
          />
          <template>
            <h3 class="accent--text">Hasil Tangkapan</h3>
            <br />
            <v-select
              :items="fishtype"
              label="Jenis Ikan"
              outlined
              v-model="input.fish"
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
                  v-model="input.unit"
                ></v-select>
              </v-col>
            </v-row>
            <v-select
              :items="geartype"
              label="Alat Tangkap"
              outlined
              v-model="input.gear"
            ></v-select>
            <v-text-field
              outlined
              label="Daerah Tangkapan"
              v-model="input.area"
            />
            <h3 class="accent--text">Data Lelang Ikan</h3>
            <br />
            <span class="accent--text">
              Jumlah yang dilelang sama dengan yang ditangkap?
            </span>
            <v-radio-group
              v-model="input.check"
              row
              @change="checkweight"
              class="check"
            >
              <v-radio label="Ya" value="Yes"></v-radio>
              <v-radio label="Tidak" value="No"></v-radio>
            </v-radio-group>
            <v-row>
              <v-col md="6">
                <v-text-field
                  outlined
                  label="Berat"
                  v-model="input.weightauction"
                  type="number"
                  :rules="required"
                />
              </v-col>
              <v-col md="6">
                <v-select
                  :items="unittype"
                  label="Satuan"
                  outlined
                  v-model="input.unitauction"
                  :rules="required"
                ></v-select>
              </v-col>
            </v-row>
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
            <v-btn large block color="primary" @click.stop="storeCaught()">
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
      fisherid: null,
      fish: null,
      gear: null,
      area: null,
      check: null,
      weight: null,
      unit: null,
      weightauction: null,
      unitauction: null
    },
    required: [v => !!v || "Data ini harus diisi"]
  }),
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    checkweight() {
      if (this.input.check == "Yes") {
        this.input.weightauction = this.input.weight;
        this.input.unitauction = this.input.unit;
      } else if (this.input.check == "No") {
        this.input.weightauction = null;
        this.input.unitauction = null;
      }
    },
    async storeCaught() {
      try {
        let caught = await this.$api("caught", "store", this.input);
        let auction = await this.$api("auction", "store", this.input);
        this.$router.push("/tangkapan/dataTangkapan");
        return {
          auction,
          caught
        };
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
