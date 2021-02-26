<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <v-card color="secondary" dark elevation="0">
        <v-card-title class="mb-1">Catat Tangkapan Ikan</v-card-title>
        <v-card-subtitle class="white--text font-weight-light"
          >Isi data dibawah ini untuk mencatat tangkapan ikan yang akan
          dilelang</v-card-subtitle
        >
      </v-card>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <!-- Fisher Identitiy etc ---->
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
            @change="getByIdFisher()"
          >
            <template v-slot:selection="{ item }">{{
              item.name + " - " + item.nik
            }}</template>
          </v-autocomplete>

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
            @change="getByIdFishingGear()"
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
            @change="getByIdFishingArea()"
          >
            <template v-slot:areaname="{ item }">{{
              item.name
            }}</template></v-autocomplete
          >
          <!-- Hasil Tangkapan ---->
          <template class="caughtfish" v-for="(caught, index) in input.caughts">
            <div no-gutters :key="index">
              <v-divider class="mb-6"></v-divider>
              <v-row no-gutters class="mb-2" :key="index">
                <v-col md="10">
                  <h3 class="accent--text">Hasil Tangkapan {{ index + 1 }}</h3>
                </v-col>
                <v-col md="2" align="right">
                  <v-btn
                    v-if="input.caughts.length > 1"
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
                @change="getByIdFish(index)"
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
                    <v-radio class="pb-3" label="Kg" value="Kg"></v-radio>
                    <v-radio
                      class="pb-3"
                      label="Kwintal"
                      value="Kwintal"
                    ></v-radio>
                    <v-radio class="pb-3" label="Ton" value="Ton"></v-radio>
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
            <v-btn large block color="primary" @click="confirm()">
              Simpan
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    <!----- Confirmation Dialog ----->
    <v-dialog v-model="dialog" width="600px">
      <v-card>
        <v-card-title>
          <h3 class="primary--text">Konfirmasi Data</h3>
        </v-card-title>
        <v-card-text>
          <v-divider></v-divider>
          <v-row no-gutters>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                NIK Nelayan / Nahkoda
              </h3>
            </v-col>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                : {{ this.fisher_confirm.nik }}
              </h3></v-col
            >
          </v-row>
          <v-row no-gutters>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                Nama Nelayan / Nahkoda
              </h3>
            </v-col>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                : {{ this.fisher_confirm.name }}
              </h3></v-col
            >
          </v-row>
          <v-row no-gutters>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                Jumlah Hari Trip
              </h3>
            </v-col>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                : {{ this.input.trip_day }} Hari
              </h3></v-col
            >
          </v-row>
          <v-row no-gutters>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                Jenis Alat Tangkap
              </h3>
            </v-col>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                : {{ this.fishinggear_confirm.name }}
              </h3></v-col
            >
          </v-row>
          <v-row no-gutters class="mb-3">
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                Daerah Tangkapan
              </h3>
            </v-col>

            <v-col>
              <h3 class="accent--text mt-3 mb-6 font-weight-regular">
                : {{ this.fishingarea_confirm.name }}
              </h3></v-col
            >
          </v-row>
          <v-divider></v-divider>
          <v-row no-gutters>
            <h3 class="accent--text mt-5">
              Daftar Hasil Tangkapan
            </h3>
          </v-row>
          <div
            class="caughtfish"
            v-for="(caught, index) in input.caughts"
            :key="index"
          >
            <v-row no-gutters>
              <v-col>
                <h3 class="accent--text mt-4 font-weight-regular">
                  {{ index + 1 }}) {{ all_fish_name_confirm[index] }}
                </h3>
              </v-col>
              <v-col>
                <h3 class="accent--text mt-4 font-weight-regular">
                  {{ caught.weight }}
                  {{ caught.unit }}
                </h3></v-col
              >
            </v-row>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="dialog = false">
            Edit
          </v-btn>
          <v-btn color="primary" @click="storeCaught()">
            Simpan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    valid: true,
    fishinggear: [],
    fishingarea: [],
    fishtype: [],
    fisher: [],
    input: {
      fisherid: null,
      fishername: null,
      trip_day: null,
      gear: null,
      area: null,
      el: ".caughtfish",
      caughts: [
        {
          fish: null,
          weight: null,
          unit: "Kg"
        }
      ]
    },
    fisher_confirm: [],
    fishingarea_confirm: [],
    fishinggear_confirm: [],
    fish_confirm: [],
    all_fish_name_confirm: [],
    required: [v => !!v || "Data ini harus diisi"]
  }),

  mounted() {
    this.getAllFisher();
    this.getAllFish();
    this.getAllFishingGear();
    this.getAllFishingArea();

    //this.getByIdFisher();
    //this.getByIdFish();
    //this.getByIdFishingArea();
    //this.getByIdFishingGear();
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
      this.input.caughts.splice(index, 1);
      this.all_fish_name_confirm.splice(index, 1);
    },
    reset() {
      this.$refs.form.reset();
    },
    confirm() {
      //if (this.$refs.form.validate()) {
      this.dialog = true;
      //}
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
    async getByIdFisher() {
      try {
        this.fisher_confirm = await this.$api(
          "fisher",
          "get_by_id",
          this.input.fisherid
        );
      } catch (e) {
        console.log(e);
      }
    },
    async getByIdFish(index) {
      try {
        this.fish_confirm = await this.$api(
          "fish",
          "get_by_id",
          this.input.caughts[index].fish
        );
        this.all_fish_name_confirm[index] = this.fish_confirm.name;
      } catch (e) {
        console.log(e);
      }
    },
    async getByIdFishingArea() {
      try {
        this.fishingarea_confirm = await this.$api(
          "fishing_area",
          "get_by_id",
          this.input.area
        );
      } catch (e) {
        console.log(e);
      }
    },
    async getByIdFishingGear() {
      try {
        this.fishinggear_confirm = await this.$api(
          "fishing_gear",
          "get_by_id",
          this.input.gear
        );
      } catch (e) {
        console.log(e);
      }
    },
    async storeCaught() {
      if (this.$refs.form.validate()) {
        try {
          await this.$api("caught", "store", this.input).finally(response => {
            this.dialog = false;
            this.$router.push("/tangkapan/dataTangkapan");
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
