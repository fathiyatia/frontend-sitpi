<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-card color="secondary" dark elevation="0">
        <v-card-title class="mb-1">Form Tangkapan Ikan</v-card-title>
        <v-card-subtitle class="white--text font-weight-light"
          >Isi form untuk mencatat tangkapan ikan yang akan
          dilelang</v-card-subtitle
        >
      </v-card>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <h3 class="mb-3 mt-2 primary--text">
            Nama Nelayan / Nahkoda
          </h3>
          <v-autocomplete
            outlined
            single-line
            label="Nama Nelayan / Nahkoda"
            :rules="required"
            v-model="input.fisherid"
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
            :rules="required"
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
            v-model="input.gear"
            :items="fishinggear"
            clearable
            item-text="name"
            item-value="id"
          >
            <template v-slot:selection="{ item }">{{ item.name }}</template>
          </v-autocomplete>
          <h3 class="mb-3 primary--text">
            Daerah Tangkapan
          </h3>
          <v-autocomplete
            outlined
            single-line
            label="Daerah Tangkapan"
            :rules="required"
            v-model="input.area"
            :items="fishingarea"
            clearable
            item-text="name"
            item-value="id"
          >
            <template v-slot:selection="{ item }">{{
              item.name
            }}</template></v-autocomplete
          >

          <template class="caughtfish" v-for="(caught, index) in input.caughts">
            <div no-gutters :key="index">
              <v-divider class="mb-6"></v-divider>
              <v-row no-gutters class="mb-2" :key="index">
                <v-col md="10">
                  <h3 class="accent--text">Hasil Tangkapan {{ index + 1 }}</h3>
                </v-col>
                <v-col md="2" align="right">
                  <v-btn
                    v-if="index != 0"
                    color="red"
                    dark
                    depressed
                    small
                    @click.stop="hapus(index)"
                    >Hapus</v-btn
                  >
                </v-col>
              </v-row>

              <h3 class="mb-3 primary--text">
                Jenis Ikan
              </h3>
              <v-autocomplete
                outlined
                single-line
                label="Jenis Ikan"
                :rules="required"
                v-model="input.caughts[index].fish"
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
                    :rules="required"
                    type="number"
                    v-model="input.caughts[index].weight"
                  />
                </v-col>
                <v-col md="6">
                  <h3 class="mb-3 primary--text">
                    Satuan
                  </h3>
                  <v-radio-group
                    v-model="input.caughts[index].unit"
                    :rules="required"
                    row
                    class="check"
                  >
                    <v-radio class="pb-3" label="Kg" value="1"></v-radio>
                    <v-radio class="pb-3" label="Kwintal" value="2"></v-radio>
                    <v-radio class="pb-3" label="Ton" value="3"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </div>
          </template>
          <v-card-actions class="justify-center ">
            <v-btn depressed large block color="success" @click.stop="tambah()">
              <v-icon>mdi-plus</v-icon> &nbsp; Hasil Tangkapan</v-btn
            >
          </v-card-actions>
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
            <v-btn large block color="primary" @click.stop="storeCaught">
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
    fishinggear: [],
    fishingarea: [],
    fishtype: [],
    fisher: [],
    //weightunit: [],
    input: {
      fisherid: null,
      trip_day: null,
      gear: null,
      area: null,
      el: ".caughtfish",
      caughts: [
        {
          fish: null,
          weight: null,
          unit: "1"
        }
      ]
    },
    required: [v => !!v || "Data ini harus diisi"]
  }),

  mounted() {
    this.getAllFisher();
    this.getAllFish();
    this.getAllFishingGear();
    this.getAllFishingArea();
  },

  methods: {
    tambah() {
      this.input.caughts.push({
        fish: null,
        weight: null,
        unit: "Kg"
      });
    },
    hapus(index) {
      if (index != 0) {
        this.input.caughts.splice(index, 1);
      }
    },
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
    async getAllFishingArea() {
      try {
        this.fishingarea = await this.$api("fishing_area", "index", null);
      } catch (e) {
        console.log(e);
      }
    },
    /*
    async getAllWeightUnit() {
      try {
        this.weightunit = await this.$api("weight_unit", "index", null);
      } catch (e) {
        console.log(e);
      }
    },
    */
    async storeCaught() {
      if (this.$refs.form.validate()) {
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
  }
};
</script>
