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
          <v-autocomplete
            outlined
            label="NIK Nelayan"
            :rules="required"
            v-model="input.fisher_id"
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
              v-model="input.fish_type_id"
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
                />
              </v-col>
              <v-col md="6">
                <v-autocomplete
                  outlined
                  label="Satuan"
                  :rules="required"
                  v-model="input.weight_unit"
                  :items="weightunit"
                  clearable
                  item-text="name"
                  item-value="id"
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
              v-model="input.fishing_gear"
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
    fishinggear: [],
    fishtype: [],
    weightunit: [],
    fisher: [],
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
    this.getAllFisher();
    this.getAllFish();
    this.getAllFishingGear();
    this.getAllWeightUnit();
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
