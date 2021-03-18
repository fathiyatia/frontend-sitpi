<template>
  <v-container>
    <h2 class="text-center font-weight-regular accent--text">
      Dashboard - {{ $auth.$state.user.location_data.location_name }}
    </h2>
    <!---------------------Fisher and Buyer ------------------------------>
    <dashboard></dashboard>

    <template>
      <v-card color="#CCEAF8" tile elevation="0" class="mt-8">
        <v-tabs fixed-tabs background-color="transparent" show-arrows>
          <v-tabs-slider color="primary"></v-tabs-slider>
          <!----- Day------>
          <v-tab class="font-weight-bold">Hari</v-tab>
          <v-tab-item>
            <v-card color="white" tile elevation="0" class="px-6 py-4">
              <dashboard-day></dashboard-day>
            </v-card>
          </v-tab-item>

          <!----- Month------>
          <v-tab class="font-weight-bold">Bulan</v-tab>
          <v-tab-item>
            <v-card color="white" tile elevation="0" class="px-6 py-4">
              <dashboard-month></dashboard-month>
            </v-card>
          </v-tab-item>

          <!----- Year------>
          <v-tab class="font-weight-bold">Tahun </v-tab>
          <v-tab-item>
            <v-card color="white" tile elevation="0" class="px-6 py-4">
              <dashboard-year></dashboard-year>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </template>
  </v-container>
</template>

<script>
export default {
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
  data: () => ({}),

  methods: {}
};
</script>
