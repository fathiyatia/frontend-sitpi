<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="transaction"
      :search="search"
      sort-by="created_at"
      sort-desc
      class="elevation-1 px-3"
    >
      <template v-slot:top>
        <v-row class="mx-0 px-4 pt-6">
          <h2 class="accent--text">Data Transaksi</h2>
        </v-row>
        <v-row class="mx-0 px-4 pt-2 pb-6"
          ><span>
            Data transaksi di
            <span class="primary--text font-weight-bold">{{
              $auth.$state.user.location
            }}</span>
            pada tanggal

            <date-format></date-format>
          </span>
        </v-row>

        <template>
          <v-text-field
            outlined
            dense
            class="mt-2 px-2 mb-5 rounded-xl"
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Cari"
            single-line
            hide-details
          ></v-text-field>
        </template>
      </template>

      <template v-slot:item.created_at="{ item }">
        <span
          >{{
            new Date(item.created_at)
              .getHours()
              .toLocaleString()
              .padStart(2, "0")
          }}:{{
            new Date(item.created_at)
              .getMinutes()
              .toLocaleString()
              .padStart(2, "0")
          }}
        </span>
      </template>
      <template v-slot:item.total_price="{ item }">
        {{ item.total_price | currencyFormat }}
      </template>

      <template v-slot:item.action="{ item }">
        <v-btn small block color="info" depressed @click="confirm(item)">
          Detail
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" width="600px">
      <v-card>
        <v-card-title>
          <h3 class="primary--text">Transaksi</h3>
        </v-card-title>
        <v-card-text v-if="dialog == true">
          <v-divider></v-divider>
          <v-row no-gutters>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                ID Transaksi
              </h3>
            </v-col>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                : {{ this.currentItem.id }}
              </h3></v-col
            >
          </v-row>

          <v-row no-gutters>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                NIK Pembeli
              </h3>
            </v-col>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                : {{ this.currentItem.buyer.nik }}
              </h3></v-col
            >
          </v-row>
          <v-row no-gutters>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                Nama Pembeli
              </h3>
            </v-col>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                : {{ this.currentItem.buyer.name }}
              </h3></v-col
            >
          </v-row>
          <v-row no-gutters>
            <v-col>
              <h3 class="accent--text my-4 font-weight-regular">
                Daerah Distribusi
              </h3>
            </v-col>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                : {{ this.currentItem.distribution_area }}
              </h3></v-col
            >
          </v-row>

          <v-divider></v-divider>
          <v-row no-gutters>
            <h3 class="accent--text mt-5">
              Daftar Pembelian
            </h3>
          </v-row>

          <div v-for="(item, index) in listItem" :key="index">
            <v-row no-gutters>
              <v-col>
                <h3 class="accent--text mt-4 font-weight-regular">
                  {{ index + 1 }}) {{ item.auction.caught.fish_type.name }}
                  {{ item.auction.caught.weight }}
                  {{ item.auction.caught.weight_unit }}
                </h3>
              </v-col>
              <v-col>
                <h3 class="accent--text mt-4 font-weight-regular">
                  {{ item.auction.price | currencyFormat }}
                </h3></v-col
              >
            </v-row>
          </div>
          <v-row no-gutters>
            <v-col>
              <h3 class="accent--text mt-5">
                Total
              </h3>
            </v-col>
            <v-col>
              <h3 class="accent--text mt-5">
                {{ this.currentItem.total_price | currencyFormat }}
              </h3>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn block class="my-2" color="primary" @click="dialog = false">
            Tutup
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  filters: {
    currencyFormat(value) {
      if (isNaN(value)) {
        return "Rp~";
      } else {
        if (value != null) {
          const minus = Number(value) < 0;
          if (value.toString().split(".").length > 2) return "Rp~";
          else if (value.toString().split(".").length > 1) {
            value = value.toString().split(".");
            value = value[0];
          }
          try {
            const result = value
              .toString()
              .match(/\d{1,3}(?=(\d{3})*$)/g)
              .join(".");
            return "Rp" + (minus === true ? " -" : "") + result;
          } catch (error) {
            return "Rp~";
          }
        }
      }
    }
  },
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      {
        text: "ID Transaksi",
        align: "start",
        sortable: false,
        value: "code"
      },
      { text: "Waktu", value: "created_at" },
      { text: "Nama Pembeli", value: "buyer.name" },
      { text: "Daerah Penjualan", value: "distribution_area" },
      { text: "Total Harga", value: "total_price" },
      { text: "Aksi", value: "action", sortable: false, width: 135 }
    ],
    transaction: [],
    currentItem: [],
    listItem: []
  }),

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  mounted() {
    this.getAllTransaction();
  },

  methods: {
    confirm(item) {
      this.currentItem = item;
      this.listItem = item.transaction_item;
      this.dialog = true;
    },
    popupDialogDelete(id) {
      this.dialogDelete = true;
      this.currentId = id;
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    deleteBuyer() {
      try {
        this.$api("fisher", "delete", this.currentId).finally(() => {
          this.getAllFisher();
          this.dialogDelete = false;
        });
      } catch (e) {
        console.log(e);
      }
    },

    async getAllTransaction() {
      try {
        this.transaction = await this.$api("transaction", "index", null);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
