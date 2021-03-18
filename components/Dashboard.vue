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
            ref="dchart"
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
            ref="dchart"
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
      //dougnut chart
      fisher_data: {
        labels: ["Tetap", "Pendatang"],
        //name buat kayak tambahan di tooltip
        name: [120, 80],
        datasets: [
          {
            backgroundColor: ["#FB8C00", "#267488"],
            borderColor: [],
            data: [120, 80]
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
        labels: ["Tetap", "Pendatang"],
        //name buat kayak tambahan di tooltip
        name: [120, 80],
        datasets: [
          {
            backgroundColor: ["#FB8C00", "#267488"],
            borderColor: [],
            data: [120, 80]
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
  }
};
</script>
