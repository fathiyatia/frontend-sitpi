<template>
  <div>
    <h3 class="px-1 mt-3 accent--text font-weight-medium">
      <v-icon color="primary" class="mr-1"> mdi-calendar</v-icon>
      Bulan :
      {{ new Date().getMonth() | monthFormat }}
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
                >Total Produksi
              </v-list-item-subtitle>
              <br />
              <v-list-item-title class="font-weight-black"
                >{{ this.all_dashboard.production_total }} Kg</v-list-item-title
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
                >Nilai Produksi
              </v-list-item-subtitle>
              <br />
              <v-list-item-title class="font-weight-black">{{
                this.all_dashboard.transaction_total | currencyFormat
              }}</v-list-item-title>
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
                >{{
                  this.all_dashboard.transaction_speed
                }}
                Jam</v-list-item-title
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
              {{ this.all_dashboard.production_total }} Kg
            </v-card-subtitle>
          </v-card>
          <bar-chart
            v-if="loaded"
            ref="production_chart"
            :chartdata="production_data"
            :options="chartoptions_production"
          ></bar-chart>
          <v-row v-else class="py-6" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-row>
        </v-card>
      </v-col>
      <!--------------------- Production Value ------------------------------>
      <v-col lg="6">
        <v-card class="px-md-5" elevation="4">
          <v-card color="success" dark class="mx-3">
            <v-card-title class="d-flex justify-center font-weight-regular">
              Nilai Produksi Ikan (Rp)
            </v-card-title>
            <v-card-subtitle
              class="d-flex justify-center font-weight-regular white--text"
            >
              {{ this.all_dashboard.transaction_total | currencyFormat }}
            </v-card-subtitle>
          </v-card>
          <bar-chart
            v-if="loaded"
            ref="production_value_chart"
            :chartdata="production_value_data"
            :options="chartoptions_production_value"
          ></bar-chart>
          <v-row v-else class="py-6" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <!---------------------  Speed ------------------------------>
      <v-col>
        <v-card class="px-md-5" elevation="4">
          <v-card color="info" dark class="mx-3">
            <v-card-title class="d-flex justify-center font-weight-regular">
              Kecepatan Lelang Ikan
            </v-card-title>
            <v-card-subtitle
              class="d-flex justify-center font-weight-regular white--text"
            >
              {{ this.all_dashboard.transaction_speed }} Jam
            </v-card-subtitle>
          </v-card>
          <bar-chart
            v-if="loaded"
            ref="speed_chart"
            :chartdata="speed_data"
            :options="chartoptions_speed"
          ></bar-chart>
          <v-row v-else class="py-6" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-row>
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
  filters: {
    monthFormat(value) {
      const monthNames = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "December"
      ];
      var month = monthNames[value];
      return month;
    }
  },
  data() {
    return {
      loaded: false,
      all_dashboard: [],
      production_data: {
        labels: [],
        name: [],
        datasets: [
          {
            barPercentage: 0.8,
            backgroundColor: "#5D8CCA",
            borderColor: [],
            data: []
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
          enabled: true,
          bodyFontSize: 17,
          callbacks: {
            label: ({ index }, data) => {
              return " : " + data.name[index] + " Kg";
            }
          }
        }
      },

      production_value_data: {
        labels: [],
        name: [],
        datasets: [
          {
            barPercentage: 0.8,
            backgroundColor: "#267488",
            borderColor: [],
            data: []
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
          enabled: true,
          bodyFontSize: 17,
          callbacks: {
            label: ({ index }, data) => {
              return " : Rp " + data.name[index];
            }
          }
        }
      },

      speed_data: {
        labels: [],

        name: [],
        datasets: [
          {
            barPercentage: 0.8,
            backgroundColor: "#6BA39D",
            borderColor: [],
            data: []
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
            right: 3,
            left: 3
          }
        },
        tooltips: {
          enabled: true,
          bodyFontSize: 17,
          callbacks: {
            label: ({ index }, data) => {
              return " : " + data.name[index] + " Jam";
            }
          }
        }
      }
    };
  },

  mounted() {
    this.getAllDashboardDay();
  },

  methods: {
    async getAllDashboardDay() {
      try {
        this.all_dashboard = await this.$api(
          "dashboard",
          "detail",
          "monthly"
        ).finally(() => {
          this.loaded = true;
        });
        //production_total
        for (
          let i = 0;
          i < this.all_dashboard.production_total_graph.length;
          i++
        ) {
          this.production_data.labels.push(
            this.all_dashboard.production_total_graph[i].date
          );

          this.production_data.name.push(
            this.all_dashboard.production_total_graph[i].total
          );

          this.production_data.datasets[0].data.push(
            this.all_dashboard.production_total_graph[i].total
          );
        }
        this.$refs.production_chart.update();
        //production_value_total
        for (
          let i = 0;
          i < this.all_dashboard.transaction_total_graph.length;
          i++
        ) {
          this.production_value_data.labels.push(
            this.all_dashboard.transaction_total_graph[i].date
          );

          this.production_value_data.name.push(
            this.all_dashboard.transaction_total_graph[i].total
          );

          this.production_value_data.datasets[0].data.push(
            this.all_dashboard.transaction_total_graph[i].total
          );
        }
        this.$refs.production_value_chart.update();
        //transaction speed
        for (
          let i = 0;
          i < this.all_dashboard.transaction_speed_graph.length;
          i++
        ) {
          this.speed_data.labels.push(
            this.all_dashboard.transaction_speed_graph[i].date
          );

          this.speed_data.name.push(
            this.all_dashboard.transaction_speed_graph[i].speed
          );

          this.speed_data.datasets[0].data.push(
            this.all_dashboard.transaction_speed_graph[i].speed
          );
        }
        this.$refs.speed_chart.update();
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
