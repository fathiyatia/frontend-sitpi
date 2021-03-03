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
            <span class="primary--text font-weight-bold">TPI xxx </span> pada
            tanggal

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
      <!---- Uncomment Dummy
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
    ---->
      <template v-slot:item.action="{ item }">
        <v-btn small block color="info" depressed @click="confirm()">
          Detail
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" width="600px">
      <v-card>
        <v-card-title>
          <h3 class="primary--text">Transaksi</h3>
        </v-card-title>
        <v-card-text>
          <v-divider></v-divider>
          <v-row no-gutters>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                ID Transaksi
              </h3>
            </v-col>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                : 00001
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
                : 3276000879665
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
                : Agung
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
                : Indramayu
              </h3></v-col
            >
          </v-row>

          <v-divider></v-divider>
          <v-row no-gutters>
            <h3 class="accent--text mt-5">
              Daftar Pembelian
            </h3>
          </v-row>
          <!--------
          <div
            class="orderfish"
            v-for="(order, index) in input.orders"
            :key="index"
          >
            <v-row no-gutters>
              <v-col>
                <h3 class="accent--text mt-4 font-weight-regular">
                  {{ index + 1 }}) {{ order.fish_type }} {{ order.weight }}
                </h3>
              </v-col>
              <v-col>
                <h3 class="accent--text mt-4 font-weight-regular">
                  {{ order.price }}
                </h3></v-col
              >
            </v-row>
          </div> ------>
          <!--- dummy jangan lupa hapus -------->
          <v-row no-gutters>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                1) Tuna 70 Kg
              </h3>
            </v-col>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                Rp50.000
              </h3></v-col
            >
          </v-row>
          <v-row no-gutters>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                2) Tenggiri 100 Kg
              </h3>
            </v-col>
            <v-col>
              <h3 class="accent--text mt-4 font-weight-regular">
                Rp100.000
              </h3></v-col
            >
          </v-row>
          <v-row no-gutters>
            <v-col>
              <h3 class="accent--text mt-5">
                Total
              </h3>
            </v-col>
            <v-col>
              <h3 class="accent--text mt-5">
                Rp150.000
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
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      {
        text: "ID Transaksi",
        align: "start",
        sortable: false,
        value: "id"
      },
      { text: "Waktu", value: "created_at" },
      { text: "Nama Pembeli", value: "buyer_name" },
      { text: "Daerah Penjualan", value: "distribution_area" },
      { text: "Total Harga", value: "price" },
      { text: "Aksi", value: "action", sortable: false, width: 135 }
    ],
    transaction: [
      {
        id: "00001",
        created_at: "10:00",
        buyer_name: "Agung",
        distribution_area: "Indramayu",
        price: "Rp150.000"
      }
    ]
  }),

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  mounted() {
    //this.getAllFisher();
  },

  methods: {
    confirm() {
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

    async getAllFisher() {
      try {
        this.fisher = await this.$api("fisher", "index", null);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
