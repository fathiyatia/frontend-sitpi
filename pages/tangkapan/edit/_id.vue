<template>
  <v-container>
    <v-card tile elevation="4" class="rounded-lg front-card">
      <v-card color="secondary" dark elevation="0">
        <v-card-title class="mb-1">Edit Tangkapan Ikan</v-card-title>
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
        <v-form ref="form">
          <h3 class="mb-3 mt-2 primary--text">
            Nama Nelayan / Nahkoda
          </h3>
          <v-autocomplete
            outlined
            single-line
            label="Nama Nelayan / Nahkoda"
            :rules="required"
            v-model="input.fisher_id"
            :items="fisher"
            clearable
            item-text="name"
            item-value="id"
          >
            <template v-slot:selection="{ item }">{{
              item.name + " - " + item.nik
            }}</template></v-autocomplete
          >
          <h3 class="mb-3 primary--text">
            Jumlah Hari Trip
          </h3>
          <v-text-field
            outlined
            single-line
            label="Jumlah Hari Trip"
            v-model="input.trip_day"
          />
          <h3 class="mb-3 primary--text">
            Jenis Alat Tangkap
          </h3>
          <v-autocomplete
            outlined
            single-line
            label="Jenis Alat Tangkap"
            :rules="required"
            v-model="input.fishing_gear_id"
            :items="fishinggear"
            clearable
            item-text="name"
            item-value="id"
          >
            <template v-slot:selection="{ item }">{{
              item.name
            }}</template></v-autocomplete
          >
          <h3 class="mb-3 primary--text">
            Daerah Tangkapan
          </h3>
          <v-autocomplete
            outlined
            single-line
            label="Daerah Tangkapan"
            :rules="required"
            v-model="input.fishing_area_id"
            :items="fishingarea"
            clearable
            item-text="name"
            item-value="id"
          >
            <template v-slot:selection="{ item }">{{
              item.name
            }}</template></v-autocomplete
          >
          <template>
            <h3 class="mb-3 primary--text">
              Jenis Ikan
            </h3>
            <v-autocomplete
              outlined
              single-line
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
                <h3 class="mb-3 primary--text">
                  Berat
                </h3>
                <v-text-field
                  outlined
                  single-line
                  label="Berat"
                  type="number"
                  v-model="input.weight"
                />
              </v-col>
              <v-col md="6">
                <h3 class="mb-3 primary--text">
                  Satuan
                </h3>
                <v-radio-group
                  v-model="input.weight_unit"
                  :rules="required"
                  row
                  class="check"
                >
                  <v-radio label="Kg" value="Kg"></v-radio>
                  <v-radio label="Kwintal" value="Kwintal"></v-radio>
                  <v-radio label="Ton" value="Ton"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
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
    snackbar: false,
    success: false,
    messages: "",
    fishinggear: [],
    fishingarea: [],
    fishtype: [],
    weightunit: [],
    fisher: [],
    input: {
      fisher_id: null,
      trip_day: null,
      fish_type_id: null,
      fishing_gear_id: null,
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
    this.getAllFishingArea();
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    async getById() {
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
        this.fisher = await this.$api("fisher", "index", null);
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
    async getAllFishingArea() {
      try {
        this.fishingarea = await this.$api("fishing_area", "index", null);
      } catch (e) {
        console.log(e);
      }
    },
    async updateCaught() {
      try {
        const result = await this.$api("caught", "update", this.input).finally(
          response => {
            return response;
          }
        );
        if (result.status === 200) {
          this.success = true;
          this.messages = "Data berhasil diubah";
          this.snackbar = true;
          setTimeout(() => {
            this.$router.push("/tangkapan/dataTangkapan");
          }, 500);
        } else {
          this.success = false;
          this.messages = "Data gagal diubah";
          this.snackbar = true;
        }
      } catch (e) {
        console.log(e);
        this.success = false;
        this.messages = "Data gagal diubah";
        this.snackbar = true;
      }
    }
  }
};
</script>
