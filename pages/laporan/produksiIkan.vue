<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="report.production_table"
      :search="search"
      sort-by="created_at"
      sort-desc
      class="elevation-1 px-3"
    >
      <template v-slot:top>
        <v-row class="mx-0  pt-6">
          <v-col cols="12" lg="8" md="8">
            <h2 class="accent--text">Laporan Produksi Ikan</h2>
          </v-col>

          <v-col lg="2" md="2">
            <v-btn block small color="error" @click="exportPdf()">
              Export Pdf
            </v-btn>
          </v-col>

          <v-col lg="2" md="2">
            <v-btn block small color="success" @click="exportExcel()">
              Export Excel
            </v-btn>
          </v-col>
        </v-row>
        <!--- Filter ----->
        <v-card
          elevation="0"
          rounded
          class="mx-3 px-4 pt-3 mb-6 mt-4 rounded-lg"
          color="#C5DEF0"
        >
          <v-row no-gutters class="pt-3">
            <!--- Pilih Periode ----->
            <v-col cols="12" lg="6" md="6" class="px-2">
              <span class="primary--text font-weight-bold">
                Pilih Periode
              </span>
              <v-select
                class="mt-3"
                :items="period"
                label="Pilih Periode"
                solo
                dense
                block
                v-model="input.period"
                @change="checkPeriod(), getAllProduction()"
              ></v-select>
            </v-col>
            <!--- Pilih Tanggal ---->
            <v-col lg="6" md="6" class="px-2">
              <!--- Daily Report ---->
              <div v-if="daily">
                <span class="primary--text font-weight-bold">
                  Pilih Tanggal
                </span>
                <v-dialog
                  ref="dialog_daily"
                  v-model="modal_daily"
                  :return-value.sync="input.date_daily"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      class="mt-3"
                      solo
                      dense
                      v-model="date_daily_formatted"
                      label="Pilih Tanggal"
                      prepend-inner-icon="mdi-calendar"
                      append-icon="mdi-menu-down"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="input.date_daily"
                    scrollable
                    color="primary"
                    :max="date_max"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal_daily = false">
                      Batal
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="
                        $refs.dialog_daily.save(input.date_daily),
                          getAllProduction()
                      "
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </div>
              <!--- Weekly Report ---->
              <div v-if="weekly">
                <span class="primary--text font-weight-bold"> &nbsp; </span>
                <template>
                  <v-text-field
                    class="mt-3"
                    solo
                    dense
                    v-model="date_weekly_formatted"
                    label="Pilih Tanggal"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                  >
                  </v-text-field>
                </template>
              </div>
              <!--- Monthly Report ---->
              <div v-if="monthly">
                <span class="primary--text font-weight-bold">
                  Pilih Bulan
                </span>
                <v-dialog
                  ref="dialog_monthly"
                  v-model="modal_monthly"
                  :return-value.sync="input.date_monthly"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      class="mt-3"
                      solo
                      dense
                      v-model="date_monthly_formatted"
                      label="Pilih Bulan"
                      prepend-inner-icon="mdi-calendar"
                      append-icon="mdi-menu-down"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="input.date_monthly"
                    type="month"
                    scrollable
                    color="primary"
                    :max="date_max"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal_monthly = false">
                      Batal
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="
                        $refs.dialog_monthly.save(input.date_monthly),
                          getAllProduction()
                      "
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </div>
              <!--- Yearly Report ---->
              <div v-if="yearly">
                <span class="primary--text font-weight-bold">
                  Pilih Tahun
                </span>
                <v-select
                  class="mt-3"
                  solo
                  dense
                  block
                  single-line
                  label="Pilih Tahun"
                  v-model="input.date_yearly"
                  :items="year_list"
                  @change="getAllProduction()"
                >
                </v-select>
              </div>

              <!--- Custom Report ---->
              <div v-if="custom">
                <v-row no-gutters>
                  <!--- Pick From Date ---->
                  <v-col cols="12" lg="6" md="6" class="px-2">
                    <span class="primary--text font-weight-bold">
                      Dari Tanggal
                    </span>
                    <v-dialog
                      ref="dialog_custom_from"
                      v-model="modal_custom_from"
                      :return-value.sync="input.date_custom_from"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          class="mt-3"
                          solo
                          dense
                          v-model="date_custom_from_formatted"
                          label="Pilih Tanggal"
                          prepend-inner-icon="mdi-calendar"
                          append-icon="mdi-menu-down"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        >
                        </v-text-field>
                      </template>
                      <v-date-picker
                        v-model="input.date_custom_from"
                        scrollable
                        color="primary"
                        :max="date_max"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="modal_custom_from = false"
                        >
                          Batal
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="
                            $refs.dialog_custom_from.save(
                              input.date_custom_from
                            ),
                              getAllProduction()
                          "
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                  <!--- Pick To Date ---->
                  <v-col lg="6" md="6" class="px-2">
                    <span class="primary--text font-weight-bold">
                      Sampai Tanggal
                    </span>
                    <v-dialog
                      ref="dialog_custom_to"
                      v-model="modal_custom_to"
                      :return-value.sync="input.date_custom_to"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          class="mt-3"
                          solo
                          dense
                          v-model="date_custom_to_formatted"
                          label="Pilih Tanggal"
                          prepend-inner-icon="mdi-calendar"
                          append-icon="mdi-menu-down"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        >
                        </v-text-field>
                      </template>
                      <v-date-picker
                        v-model="input.date_custom_to"
                        scrollable
                        color="primary"
                        :max="date_max"
                        :min="input.date_custom_from"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="modal_custom_to = false"
                        >
                          Batal
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="
                            $refs.dialog_custom_to.save(input.date_custom_to),
                              getAllProduction()
                          "
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                </v-row>
              </div>
            </v-col>

            <!--- Pilih TPI ----->
            <v-col v-if="checkRole()" cols="12" lg="6" md="6" class="px-2">
              <span class="primary--text font-weight-bold">
                Pilih TPI
              </span>
              <v-autocomplete
                class="mt-3"
                solo
                dense
                block
                single-line
                label="TPI"
                v-model="input.tpi"
                :items="tpi"
                item-text="name"
                item-value="id"
                @change="getAllProduction(), getByIdTpi()"
              >
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-card>
        <!--- Summary ---->
        <v-card elevation="0" rounded class="px-4 pt-3 mb-2 mt-4 rounded-lg">
          <v-row no-gutters class="">
            <v-col>
              <h4 v-if="checkRole()" class="accent--text">
                {{ current_tpi.name }}
              </h4>
              <h4 v-else class="accent--text">
                {{ $auth.$state.user.location_data.location_name }}
              </h4>
            </v-col>
          </v-row>

          <v-row no-gutters class="">
            <v-col>
              <h4 v-if="daily" class="accent--text">
                Tanggal : {{ date_daily_formatted }}
              </h4>
              <h4 v-if="monthly" class="accent--text">
                Bulan : {{ date_monthly_formatted }}
              </h4>
              <h4 v-if="yearly" class="accent--text">
                Tahun : {{ input.date_yearly }}
              </h4>
              <h4 v-if="custom" class="accent--text">
                Tanggal : {{ date_custom_from_formatted }} -
                {{ date_custom_to_formatted }}
              </h4>
            </v-col>
          </v-row>

          <v-row no-gutters class="mt-5">
            <v-col lg="3" sm="6">
              <h4 class="accent--text font-weight-regular">
                Total Produksi
              </h4>
            </v-col>
            <v-col lg="3" sm="6">
              <h4 class="accent--text font-weight-regular">
                : {{ report.production_total }} Kg
              </h4>
            </v-col>
          </v-row>
          <v-row no-gutters class="">
            <v-col lg="3" sm="6">
              <h4 class="accent--text font-weight-regular">
                Nilai Produksi
              </h4>
            </v-col>
            <v-col lg="3" sm="6">
              <h4 class="accent--text font-weight-regular">
                : {{ report.production_value | currencyFormat }}
              </h4>
            </v-col>
          </v-row>

          <v-row no-gutters class="">
            <v-col lg="3" sm="6">
              <h4 class="accent--text font-weight-regular">
                Kecepatan Penjualan
              </h4>
            </v-col>
            <v-col lg="3" sm="6">
              <h4 class="accent--text font-weight-regular">
                : {{ report.transaction_speed }} Jam
              </h4>
            </v-col>
          </v-row>

          <v-row no-gutters class="mt-7 mb-4">
            <v-col>
              <h4 class="accent--text">
                Tabel Produksi Ikan
              </h4>
            </v-col>
          </v-row>
        </v-card>
      </template>

      <template v-slot:item.id="{ item }">
        {{ report.production_table.indexOf(item) + 1 }}
      </template>
      <template v-slot:item.production_total="{ item }">
        {{ item.production_total }} Kg
      </template>
      <template v-slot:item.production_value="{ item }">
        {{ item.production_value | currencyFormat }}
      </template>
      <template v-slot:item.transaction_speed="{ item }">
        {{ item.transaction_speed }} Jam
      </template>
    </v-data-table>
    <br />
  </div>
</template>

<script>
export default {
  data: () => ({
    dialogDelete: false,
    search: "",
    headers: [
      {
        text: "No.",
        align: "start",
        sortable: false,
        value: "id"
      },
      { text: "Kode Ikan", value: "code" },
      { text: "Nama Ikan", value: "name" },
      {
        text: "Jumlah Produksi",
        align: "right",
        value: "production_total"
      },
      {
        text: "Nilai Produksi",
        align: "right",
        value: "production_value"
      },
      {
        text: "Kecepatan Penjualan",
        align: "right",
        value: "transaction_speed"
      }
    ],
    report: [],

    input: {
      tpi: 0,
      period: "Laporan Harian",
      date_daily: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),

      date_monthly:
        new Date(Date.now()).getFullYear() +
        "-" +
        (new Date(Date.now()).getMonth() + 1).toLocaleString().padStart(2, "0"),
      date_yearly: new Date().getFullYear(),

      date_custom_from: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      date_custom_to: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10)
    },

    period: [
      "Laporan Harian",
      "Laporan Bulanan",
      "Laporan Tahunan",
      "Pilih Jangka Waktu"
    ],
    tpi: [],
    current_tpi: [],
    last_period: "Laporan Harian",
    daily: true,
    weekly: false,
    monthly: false,
    yearly: false,
    custom: false,
    date_max: new Date(Date.now() + 7 * 60 * 60 * 1000)
      .toISOString()
      .substr(0, 10),
    //daily date picker
    modal_daily: false,
    modal_monthly: false,
    modal_yearly: false,
    modal_custom_from: false,
    modal_custom_to: false,
    year_list: [new Date().getFullYear(), new Date().getFullYear() - 1]
  }),

  mounted() {
    this.getAllTpi();
    this.getAllProduction();
    this.getByIdTpi();
  },

  computed: {
    date_daily_formatted: function() {
      return new Date(this.input.date_daily).toLocaleDateString();
    },
    date_weekly_formatted: function() {
      var start_week = new Date(
        Date.now() - 7 * 24 * 60 * 60 * 1000
      ).toLocaleDateString();
      var end_week = new Date(Date.now()).toLocaleDateString();
      return start_week + " - " + end_week;
    },
    date_monthly_formatted: function() {
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
      var month = monthNames[new Date(this.input.date_monthly).getMonth()];
      var year = new Date(this.input.date_monthly).getFullYear();
      return month + " " + year;
    },
    date_yearly_formatted: function() {
      return;
    },
    date_custom_from_formatted: function() {
      return new Date(this.input.date_custom_from).toLocaleDateString();
    },
    date_custom_to_formatted: function() {
      return new Date(this.input.date_custom_to).toLocaleDateString();
    }
  },

  methods: {
    async getByIdTpi() {
      if (
        this.input.tpi != 0 &&
        this.$auth.$state.user.user.role.name == "district-admin"
      ) {
        try {
          this.current_tpi = await this.$api(
            "tpi",
            "get_by_id",
            this.input.tpi
          ).finally(response => {
            return response;
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        this.current_tpi.name = this.$auth.$state.user.location_data.location_name;
      }
    },
    checkRole() {
      if (this.$auth.$state.user.user.role.name == "district-admin") {
        return true;
      } else if (this.$auth.$state.user.user.role.name == "tpi-admin") {
        this.input.tpi = this.$auth.$state.user.location_data.location_id;
        return false;
      }
    },
    checkPeriod() {
      this.checkLastPeriod();
      if (this.input.period == "Laporan Harian") {
        this.daily = true;
      } else if (this.input.period == "Laporan Mingguan") {
        this.weekly = true;
      } else if (this.input.period == "Laporan Bulanan") {
        this.monthly = true;
      } else if (this.input.period == "Laporan Tahunan") {
        this.yearly = true;
      } else if (this.input.period == "Pilih Jangka Waktu") {
        this.custom = true;
      }
    },

    checkLastPeriod() {
      if (this.last_period == "Laporan Harian") {
        this.daily = false;
      } else if (this.last_period == "Laporan Mingguan") {
        this.weekly = false;
      } else if (this.last_period == "Laporan Bulanan") {
        this.monthly = false;
      } else if (this.last_period == "Laporan Tahunan") {
        this.yearly = false;
      } else if (this.last_period == "Pilih Jangka Waktu") {
        this.custom = false;
      }
      this.last_period = this.input.period;
    },

    async getAllTpi() {
      if (this.$auth.$state.user.user.role.name == "district-admin") {
        try {
          this.tpi = await this.$api("tpi", "index", null);
          this.tpi.push({ id: 0, name: "Semua TPI" });
        } catch (e) {
          console.log(e);
        }
      }
    },

    async getAllProduction() {
      try {
        this.report = await this.$api("report", "production", this.input);
      } catch (e) {
        console.log(e);
      }
    },

    async exportExcel() {
      try {
        await this.$api("report", "excel_production", this.input);
      } catch (e) {
        console.log(e);
      }
    },
    async exportPdf() {
      try {
        await this.$api("report", "pdf_production", this.input);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
