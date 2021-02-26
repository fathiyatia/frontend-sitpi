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
    <template> </template>
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
    total_production: "",
    total_fisher: "",
    total_buyer: "",
    date_max: new Date().toISOString().substr(0, 10),
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
    this.getTotalFisher();
    this.getTotalBuyer();
  },

  computed: {
    date_start_formatted: function() {
      return new Date(this.input.date_start).toLocaleDateString();
    },
    date_end_formatted: function() {
      return new Date(this.input.date_end).toLocaleDateString();
    }
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
    },
    async getTotalFisher() {
      try {
        this.total_fisher = await this.$api(
          "caught",
          "total_fisher",
          this.input
        );
      } catch (e) {
        console.log(e);
      }
    },
    //cek
    async getTotalBuyer() {
      try {
        this.total_buyer = await this.$api(
          "transaction",
          "total_buyer",
          this.input
        );
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
