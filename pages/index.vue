<template>
  <v-container>
    <h2 class="font-weight-regular accent--text">
      Dashboard
    </h2>
    <!--------------------- Histogram ------------------------------>
    <v-row class="mt-2">
      <v-col>
        <template>
          <v-card class="px-md-5" height="400" elevation="4">
            <v-card color="primary" dark class="mx-3">
              <v-card-title class="text-uppercase">
                <span>Produksi Ikan</span>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-card-subtitle>
                Grafik total produksi ikan
              </v-card-subtitle>
            </v-card>
          </v-card>
        </template>
      </v-col>
    </v-row>
    <template>
      <v-toolbar color="primary" dark class="mt-6" dense elevation="4">
        <v-icon class="mr-2">mdi-calendar-check</v-icon>

        <h3 class="font-weight-regular white--text">
          Pilih Tanggal
        </h3>
      </v-toolbar>
      <v-spacer></v-spacer>

      <v-card class="px-4 pt-4" tile elevation="4">
        <v-row>
          <!----------- Date Picker Start ----------->
          <v-col cols="12" lg="6" sm="6" md="4">
            <v-dialog
              ref="dialog_start"
              v-model="modal_start"
              :return-value.sync="input.date_start"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="input.date_start"
                  label="Tanggal Awal"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="input.date_start"
                scrollable
                color="primary"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal_start = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="
                    $refs.dialog_start.save(input.date_start),
                      getTotalProduction()
                  "
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <!----------- Date Picker End ----------->
          <v-col cols="12" lg="6" sm="6" md="4">
            <v-dialog
              ref="dialog_end"
              v-model="modal_end"
              :return-value.sync="input.date_end"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="input.date_end"
                  label="Tanggal Akhir"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="input.date_end"
                scrollable
                color="primary"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal_end = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="
                    $refs.dialog_end.save(input.date_end), getTotalProduction()
                  "
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
        </v-row>
      </v-card>
    </template>
    <!--------------------- Small Card ------------------------------>
    <v-row class="mt-4">
      <v-col>
        <v-card color="white" elevation="4">
          <v-list-item two-line>
            <v-list-item-avatar
              tile
              size="55"
              color="secondary"
              class="rounded-lg"
              ><v-icon large color="white">
                mdi-fish</v-icon
              ></v-list-item-avatar
            >
            <v-list-item-content class="my-2" block>
              <v-list-item-subtitle class="overline text-capitalize"
                >Total Produksi</v-list-item-subtitle
              >
              <br />
              <v-list-item-title class="font-weight-black">{{
                this.total_production
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col>
        <v-card color="white" elevation="4">
          <v-list-item two-line>
            <v-list-item-avatar
              tile
              size="55"
              color="success"
              class="rounded-lg"
              ><v-icon large color="white">
                mdi-cash-multiple</v-icon
              ></v-list-item-avatar
            >
            <v-list-item-content class="my-2" block>
              <v-list-item-subtitle class="overline text-capitalize"
                >Nilai Produksi</v-list-item-subtitle
              >
              <br />
              <v-list-item-title class="font-weight-black"
                >Rp5.0000.000</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col>
        <v-card color="white" elevation="4">
          <v-list-item two-line>
            <v-list-item-avatar tile size="55" color="info" class="rounded-lg"
              ><v-icon large color="white">
                mdi-sail-boat</v-icon
              ></v-list-item-avatar
            >
            <v-list-item-content class="my-2" block>
              <v-list-item-subtitle class="overline text-capitalize"
                >Jumlah Nelayan</v-list-item-subtitle
              >
              <br />
              <v-list-item-title class="font-weight-black"
                >100 orang</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col>
        <v-card color="white" elevation="4">
          <v-list-item two-line>
            <v-list-item-avatar
              tile
              size="55"
              color="warning"
              class="rounded-lg"
              ><v-icon large color="white">
                mdi-account</v-icon
              ></v-list-item-avatar
            >
            <v-list-item-content class="my-2" block>
              <v-list-item-subtitle class="overline text-capitalize"
                >Jumlah Pembeli</v-list-item-subtitle
              >
              <br />
              <v-list-item-title class="font-weight-black"
                >77 Orang</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <!--------------------- Pie Chart ------------------------------>
      <v-col>
        <template>
          <v-card class="px-md-5" height="500" elevation="4">
            <v-card color="info" dark class="mx-3">
              <v-card-title class="text-uppercase">
                <span>Aktifitas Lelang Ikan</span>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-card-subtitle>
                Persentase status penjualan lelang ikan
              </v-card-subtitle>
            </v-card>
          </v-card>
        </template>
      </v-col>
      <!--------------------- Table ------------------------------>

      <v-col>
        <template>
          <v-card class="px-md-5" elevation="4">
            <v-card color="primary" dark class="mx-3">
              <v-card-title class="text-uppercase">
                <span>Produksi Ikan</span>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-card-subtitle>
                Total produksi ikan dan nilai produksi ikan
              </v-card-subtitle>
            </v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                outlined
                dense
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="desserts"
              :search="search"
              :items-per-page="5"
            ></v-data-table>
          </v-card>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    //date
    modal_start: false,
    modal_end: false,
    input: {
      date_start: new Date().toISOString().substr(0, 10),
      date_end: new Date().toISOString().substr(0, 10)
    },
    total_production: null,
    //end date
    search: "",
    headers: [
      {
        text: "Jenis Ikan",
        align: "start",
        value: "name"
      },
      { text: "Total Produksi (Kg)", value: "calories" },
      { text: "Nilai Produksi (Rp)", value: "fat" }
    ],
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0
      },
      {
        name: "Eclair",
        calories: 262,
        fat: 16.0
      },
      {
        name: "Cupcake",
        calories: 305,
        fat: 3.7
      },
      {
        name: "Gingerbread",
        calories: 356,
        fat: 16.0
      },
      {
        name: "Jelly bean",
        calories: 375,
        fat: 0.0
      },
      {
        name: "Lollipop",
        calories: 392,
        fat: 0.2
      },
      {
        name: "Honeycomb",
        calories: 408,
        fat: 3.2
      },
      {
        name: "Donut",
        calories: 452,
        fat: 25.0
      },
      {
        name: "KitKat",
        calories: 518,
        fat: 26.0
      }
    ]
  }),

  mounted() {
    this.getTotalProduction();
  },

  methods: {
    async getTotalProduction() {
      try {
        this.total_production = await this.$api(
          "caught",
          "total_production",
          this.input
        );
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
