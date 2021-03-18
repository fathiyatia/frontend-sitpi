<template>
  <div>
    <h3 class="px-1 mt-3 accent--text font-weight-medium">
      <v-icon color="primary" class="mr-1"> mdi-calendar</v-icon> Tanggal :
      <date-format></date-format>
    </h3>

    <!---- Small Card ----->
    <v-row class="mt-3">
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
                >Total Produksi (Kg)</v-list-item-subtitle
              >
              <br />
              <v-list-item-title class="font-weight-black"
                >7.988 Kg</v-list-item-title
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
              color="success"
              class="rounded-lg"
              ><v-icon large color="white">
                mdi-cash-multiple</v-icon
              ></v-list-item-avatar
            >
            <v-list-item-content class="my-2" block>
              <v-list-item-subtitle class="overline text-capitalize"
                >Nilai Produksi (Rp)</v-list-item-subtitle
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
                mdi-clock</v-icon
              ></v-list-item-avatar
            >
            <v-list-item-content class="my-2" block>
              <v-list-item-subtitle class="overline text-capitalize"
                >Rata-rata Kecepatan Lelang</v-list-item-subtitle
              >
              <br />
              <v-list-item-title class="font-weight-black"
                >3.3 Jam</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <!--- =============================  Chart ===========================================---->
    <v-row class="mt-2">
      <!--------------------- Production ------------------------------>
      <v-col lg="6">
        <v-card class="px-md-5" elevation="4">
          <v-card color="secondary" dark class="mx-3">
            <v-card-title class="d-flex justify-center font-weight-regular">
              Produksi Ikan (Kg)
            </v-card-title>
            <v-card-subtitle
              class="d-flex justify-center font-weight-regular white--text"
            >
              7.988 Kg
            </v-card-subtitle>
          </v-card>
          <bar-chart
            ref="production_chart"
            :chartdata="production_data"
            :options="chartoptions_production"
          ></bar-chart>
        </v-card>
      </v-col>
      <!--------------------- Chart Two ------------------------------>
      <v-col lg="6">
        <v-card class="px-md-5" elevation="4">
          <v-card color="success" dark class="mx-3">
            <v-card-title class="d-flex justify-center font-weight-regular">
              Nilai Produksi Ikan (Rp)
            </v-card-title>
            <v-card-subtitle
              class="d-flex justify-center font-weight-regular white--text"
            >
              Rp500.000
            </v-card-subtitle>
          </v-card>
          <bar-chart
            ref="production_value_chart"
            :chartdata="production_value_data"
            :options="chartoptions_production_value"
          ></bar-chart>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <!--------------------- Chart Three ------------------------------>
      <v-col>
        <v-card class="px-md-5" elevation="4">
          <v-card color="info" dark class="mx-3">
            <v-card-title class="d-flex justify-center font-weight-regular">
              Kecepatan Lelang Ikan
            </v-card-title>
            <v-card-subtitle
              class="d-flex justify-center font-weight-regular white--text"
            >
              3.3 Jam
            </v-card-subtitle>
          </v-card>
          <bar-chart
            ref="speed_chart"
            :chartdata="speed_data"
            :options="chartoptions_speed"
          ></bar-chart>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import DoughnutChart from "~/components/DoughnutChart.vue";
import BarChart from "~/components/BarChart.vue";
import LineChart from "~/components/LineChart.vue";
export default {
  components: {
    DoughnutChart,
    BarChart,
    LineChart
  },
  data() {
    return {
      // data and option for total production
      production_data: {
        labels: [
          "Tuna",
          "Tenggiri",
          "Cakalang",
          "Kakap",
          "Udang",
          "Layang",
          "Tongkol",
          "Ikan A",
          "Ikan B",
          "Ikan C"
        ],
        //name buat kayak tambahan di tooltip
        name: [5000, 4000, 1000, 50000, 4000, 10000, 5000, 4000, 10000, 5000],
        datasets: [
          {
            //control width bar
            barPercentage: 0.8,
            backgroundColor: "#5D8CCA",
            borderColor: [],
            data: [5000, 4000, 1000, 5000, 4000, 10000, 5000, 4000, 10000, 5000]
          }
        ]
      },
      chartoptions_production: {
        legend: false,
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: "Total Produksi (Kg)"
              }
            }
          ]
        },
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 30,
            bottom: 30,
            right: 20,
            left: 3
          }
        },
        tooltips: {
          //cukup enabled aja kalo mau gampang otomatis nama : data
          enabled: true,
          bodyFontSize: 17,
          callbacks: {
            label: ({ index }, data) => {
              return " " + data.name[index] + " Kg";
            }
          }
        }
      },

      // data and option for value production
      production_value_data: {
        labels: [
          "Tuna",
          "Tenggiri",
          "Cakalang",
          "Kakap",
          "Udang",
          "Layang",
          "Tongkol",
          "Ikan A",
          "Ikan B",
          "Ikan C"
        ],
        //name buat kayak tambahan di tooltip
        name: [5000, 4000, 1000, 50000, 4000, 10000, 5000, 4000, 10000, 5000],
        datasets: [
          {
            //control width bar
            barPercentage: 0.8,
            backgroundColor: "#267488",
            borderColor: [],
            data: [5000, 4000, 1000, 5000, 4000, 10000, 5000, 4000, 10000, 5000]
          }
        ]
      },
      chartoptions_production_value: {
        legend: false,
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: "Nilai Produksi (Rp)"
              }
            }
          ]
        },
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 30,
            bottom: 30,
            right: 20,
            left: 3
          }
        },
        tooltips: {
          //cukup enabled aja kalo mau gampang otomatis nama : data
          enabled: true,
          bodyFontSize: 17,
          callbacks: {
            label: ({ index }, data) => {
              return " Rp " + data.name[index];
            }
          }
        }
      },

      // data and option for transaction speed
      speed_data: {
        labels: [
          "Tuna",
          "Tenggiri",
          "Cakalang",
          "Kakap",
          "Udang",
          "Layang",
          "Tongkol",
          "Ikan A",
          "Ikan B",
          "Ikan C"
        ],
        //name buat kayak tambahan di tooltip
        name: [5000, 4000, 1000, 50000, 4000, 10000, 5000, 4000, 10000, 5000],
        datasets: [
          {
            //control width bar
            barPercentage: 0.8,
            backgroundColor: "#6BA39D",
            borderColor: [],
            data: [5000, 4000, 1000, 5000, 4000, 10000, 5000, 4000, 10000, 5000]
          }
        ]
      },
      chartoptions_speed: {
        legend: false,
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: "Kecepatan Lelang (Jam)"
              }
            }
          ]
        },
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 30,
            bottom: 30,
            right: 20,
            left: 3
          }
        },
        tooltips: {
          //cukup enabled aja kalo mau gampang otomatis nama : data
          enabled: true,
          bodyFontSize: 17,
          callbacks: {
            label: ({ index }, data) => {
              return " " + data.name[index] + " Jam";
            }
          }
        }
      }
    };
  }
};
</script>
