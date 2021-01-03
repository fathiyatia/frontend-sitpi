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
          <v-autocomplete
            outlined
            label="NIK Nelayan"
            :rules="required"
            v-model="input.fisherid"
            :items="fisher"
            clearable
            item-text="nik"
            item-value="id"
          >
            <template v-slot:selection="{ item }">{{
              item.nik + " - " + item.name
            }}</template></v-autocomplete
          >
          <template>
            <h3 class="accent--text">Hasil Tangkapan</h3>
            <br />
            <v-autocomplete
              outlined
              label="Jenis Ikan"
              :rules="required"
              v-model="input.fish"
              :items="fishtype"
              clearable
              item-text="name"
              item-value="id"
            >
              <template v-slot:selection="{ item }">{{
                item.name
              }}</template></v-autocomplete
            >
            <v-row>
              <v-col md="6">
                <v-text-field
                  outlined
                  label="Berat"
                  type="number"
                  v-model="input.weight"
                  @change="checkweight"
                />
              </v-col>
              <v-col md="6">
                <v-autocomplete
                  outlined
                  label="Satuan"
                  :rules="required"
                  v-model="input.unit"
                  :items="weightunit"
                  clearable
                  item-text="name"
                  item-value="id"
                  @change="checkweight"
                >
                  <template v-slot:selection="{ item }">{{
                    item.name
                  }}</template></v-autocomplete
                >
              </v-col>
            </v-row>
            <v-autocomplete
              outlined
              label="Alat Tangkap"
              :rules="required"
              v-model="input.gear"
              :items="fishinggear"
              clearable
              item-text="name"
              item-value="id"
            >
              <template v-slot:selection="{ item }">{{
                item.name
              }}</template></v-autocomplete
            >
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
                  @change="changeweight"
                />
              </v-col>
              <v-col md="6">
                <v-autocomplete
                  outlined
                  label="Satuan"
                  :rules="required"
                  v-model="input.unitauction"
                  :items="weightunit"
                  clearable
                  item-text="name"
                  item-value="id"
                  @change="changeweight"
                >
                  <template v-slot:selection="{ item }">{{
                    item.name
                  }}</template></v-autocomplete
                >
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
    fishinggear: [],
    fishtype: [],
    weightunit: [],
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
    required: [v => !!v || "Data ini harus diisi"],
    fisher: []
  }),

  mounted() {
    this.getAllFisher();
    this.getAllFish();
    this.getAllFishingGear();
    this.getAllWeightUnit();
  },

  methods: {
    reset() {
      this.$refs.form.reset();
    },
    async getAllFisher() {
      try {
        this.fisher = await this.$api("fisher", "inquiry", null);
      } catch (e) {
        console.log(e);
      }
    },
    async getAllFish() {
      try {
        this.fishtype = await this.$api("fish", "index", null);
      } catch (e) {
        console.log(e);
      }
    },
    async getAllFishingGear() {
      try {
        this.fishinggear = await this.$api("fishing_gear", "index", null);
      } catch (e) {
        console.log(e);
      }
    },
    async getAllWeightUnit() {
      try {
        this.weightunit = await this.$api("weight_unit", "index", null);
      } catch (e) {
        console.log(e);
      }
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
    changeweight() {
      if (this.input.check == "Yes") {
        this.input.weight = this.input.weightauction;
        this.input.unit = this.input.unitauction;
      }
    },
    async storeCaught() {
      try {
        const result = await this.$api("caught", "store", this.input).finally(
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
