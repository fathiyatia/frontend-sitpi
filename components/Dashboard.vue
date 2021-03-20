<template>
  <div>
    <v-row class="mt-5">
      <!--------------------- Fisher ------------------------------>
      <v-col lg="6">
        <v-card class="px-md-5" elevation="4">
          <v-card-title class="font-weight-regular">
            <v-icon class="mr-2" color="success">mdi-sail-boat </v-icon> Jumlah
            Nelayan
          </v-card-title>
          <doughnut-chart
            style="position: relative; height:40vh;"
            ref="fisher_chart"
            :chartdata="fisher_data"
            :options="chartoptions_fisher"
          ></doughnut-chart>
        </v-card>
      </v-col>
      <!--------------------- Chart Two ------------------------------>
      <v-col lg="6">
        <v-card class="px-md-5" elevation="4">
          <v-card-title class="font-weight-regular">
            <v-icon class="mr-2" color="warning"> mdi-account </v-icon> Jumlah
            Pembeli
          </v-card-title>
          <doughnut-chart
            style="position: relative; height:40vh;"
            ref="buyer_chart"
            :chartdata="buyer_data"
            :options="chartoptions_buyer"
          ></doughnut-chart>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import HorizontalbarChart from "~/components/HorizontalbarChart.vue";
export default {
  components: {
    HorizontalbarChart
  },
  data() {
    return {
      all_dashboard: [],
      //dougnut chart
      fisher_data: {
        labels: [],
        //name buat kayak tambahan di tooltip
        name: [],
        datasets: [
          {
            backgroundColor: ["#FB8C00", "#267488"],
            borderColor: [],
            data: []
          }
        ]
      },
      chartoptions_fisher: {
        //piechart
        //cutoutPercentage: 0,
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: "right",
          labels: {
            fontColor: "#424242",
            fontSize: 14
          }
        },
        layout: {
          padding: {
            top: 10,
            bottom: 20,
            right: 10,
            left: 10
          }
        },
        tooltips: {
          //cukup enabled aja kalo mau gampang otomatis nama : data
          enabled: true,
          bodyFontSize: 17,
          callbacks: {
            label: ({ index }, data) => {
              return " " + data.labels[index] + " : " + data.name[index];
            }
          }
        }
      },

      buyer_data: {
        labels: [],
        //name buat kayak tambahan di tooltip
        name: [],
        datasets: [
          {
            backgroundColor: ["#FB8C00", "#267488"],
            borderColor: [],
            data: []
          }
        ]
      },
      chartoptions_buyer: {
        //piechart
        //cutoutPercentage: 0,
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: "right",
          labels: {
            fontColor: "#424242",
            fontSize: 14
          }
        },
        layout: {
          padding: {
            top: 10,
            bottom: 20,
            right: 10,
            left: 10
          }
        },
        tooltips: {
          //cukup enabled aja kalo mau gampang otomatis nama : data
          enabled: true,
          bodyFontSize: 17,
          callbacks: {
            label: ({ index }, data) => {
              return " " + data.labels[index] + " : " + data.name[index];
            }
          }
        }
      }
    };
  },

  mounted() {
    this.getAllDashboard();
  },

  methods: {
    async getAllDashboard() {
      try {
        this.all_dashboard = await this.$api("dashboard", "header", null);
        for (let i = 0; i < this.all_dashboard.buyer_total.length; i++) {
          //labelnya
          this.buyer_data.labels.push(this.all_dashboard.buyer_total[i].status);
          //namanya
          this.buyer_data.name.push(this.all_dashboard.buyer_total[i].total);
          //datasetnya
          this.buyer_data.datasets[0].data.push(
            this.all_dashboard.buyer_total[i].total
          );
        }
        this.$refs.buyer_chart.update();

        for (let i = 0; i < this.all_dashboard.fisher_total.length; i++) {
          //labelnya
          this.fisher_data.labels.push(
            this.all_dashboard.fisher_total[i].status
          );
          //namanya
          this.fisher_data.name.push(this.all_dashboard.fisher_total[i].total);
          //datasetnya
          this.fisher_data.datasets[0].data.push(
            this.all_dashboard.fisher_total[i].total
          );
        }
        this.$refs.fisher_chart.update();
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
