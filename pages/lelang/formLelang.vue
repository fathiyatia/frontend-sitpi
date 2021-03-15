<template>
  <v-container>
    <v-card tile elevation="4" class="mt-3 rounded-lg front-card">
      <!----- Title ----->
      <v-card color="secondary" dark elevation="0">
        <v-card-title class="mb-1">Lelang</v-card-title>
        <v-card-subtitle class="white--text font-weight-light"
          >Pilih ikan yang akan dilelang, kemudian masukkan harga
          lelang</v-card-subtitle
        >
      </v-card>
      <!---- Alert ----->
      <template>
        <alert
          v-model="snackbar"
          :success="success"
          :messages="messages"
        ></alert>
      </template>
      <!----- Caught Fish Table ----->
      <v-card-text class="mt-2">
        <v-data-table
          :headers="headers"
          :items="caught_fish"
          :search="search"
          :items-per-page="5"
          sort-by="created_at"
          sort-desc
          class="elevation-0 px-2"
        >
          <template v-slot:top>
            <v-row class="mb-2 mx-2">
              <h2 class="accent--text">Pilih Ikan</h2>
            </v-row>
            <!----- Filter ----->
            <v-card
              elevation="0"
              rounded
              class="mx-0 mt-3 px-4 pt-5 mb-6 rounded-lg"
              color="#C5DEF0"
            >
              <span class="px-2 primary--text font-weight-bold">
                <v-icon medium color="primary">mdi-magnify</v-icon> Cari
              </span>
              <v-row no-gutters class="pt-3">
                <v-col cols="12" lg="6" md="6" class="px-2">
                  <v-autocomplete
                    solo
                    dense
                    block
                    single-line
                    label="Nama Nelayan"
                    v-model="input_filter.fisherid"
                    :items="fisher"
                    clearable
                    item-text="name"
                    item-value="id"
                    @change="getAllCaught()"
                  >
                    <template v-slot:selection="{ item }">{{
                      item.name
                    }}</template></v-autocomplete
                  >
                </v-col>

                <v-col lg="6" md="6" class="px-2">
                  <v-autocomplete
                    solo
                    dense
                    block
                    single-line
                    label="Jenis Ikan"
                    v-model="input_filter.fish"
                    :items="fishtype"
                    clearable
                    item-text="name"
                    item-value="id"
                    @change="getAllCaught()"
                  >
                    <template v-slot:selection="{ item }">{{
                      item.name
                    }}</template></v-autocomplete
                  >
                </v-col>
              </v-row>
            </v-card>
          </template>
          <template v-slot:item.weight="{ item }">
            {{ item.weight }} {{ item.weight_unit }}
          </template>
          <template v-slot:item.action="{ item }">
            <v-btn
              block
              small
              color="secondary"
              depressed
              @click="popupDialog(), getInput(item)"
            >
              Jual
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <!----- Dialog Input Price ----->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <h3 class="primary--text">Masukkan Harga Lelang</h3>
        </v-card-title>
        <v-card-text>
          <v-row no-gutters>
            <v-col>
              <h3 class="accent--text mt-1 font-weight-regular">
                Ikan : {{ this.input.fish_type }} {{ this.input.weight }}
                {{ this.input.weight_unit }}
              </h3>
            </v-col>
            <v-col>
              <h3 class="accent--text mt-1 font-weight-regular">
                Nelayan : {{ this.input.fisher_name }}
              </h3>
            </v-col>
          </v-row>

          <v-form
            class=""
            no-gutters
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              single-line
              prefix="Rp"
              dense
              outlined
              class="mt-6"
              type="number"
              label="Harga lelang"
              v-model="input.price"
              :rules="required"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="accent" text @click="close">
            Batal
          </v-btn>
          <v-btn color="primary" text @click="storeAuction()">
            Simpan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    snackbar: false,
    success: false,
    messages: "",
    dialog: false,
    valid: true,
    required: [v => !!v || "Data ini harus diisi"],
    caught_fish: [],
    fisher: [],
    fishtype: [],
    input_filter: {
      fisherid: "0",
      fish: "0"
    },
    input: {
      id: null,
      fish_type: null,
      weight: null,
      weight_unit: null,
      fisher_name: null,
      price: null
    },
    search: "",
    headers: [
      { text: "Jenis Ikan", value: "fish_type.name" },
      { text: "Berat", value: "weight" },
      { text: "Nama Nelayan", value: "fisher.name" },
      { text: "Aksi", value: "action", sortable: false, width: 160 }
    ]
  }),

  mounted() {
    this.getAllCaught();
    this.getAllFisher();
    this.getAllFish();
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    getInput(item) {
      this.input.id = item.id;
      this.input.fish_type = item.fish_type.name;
      this.input.weight = item.weight;
      this.input.weight_unit = item.weight_unit;
      this.input.fisher_name = item.fisher.name;
    },

    popupDialog() {
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$refs.form.reset();
    },

    //cek
    async getAllCaught() {
      try {
        this.caught_fish = await this.$api(
          "caught",
          "inquiry",
          this.input_filter
        );
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
    },

    async getAllFish() {
      try {
        this.fishtype = await this.$api("fish", "index", null);
      } catch (e) {
        console.log(e);
      }
    },

    async storeAuction() {
      if (this.$refs.form.validate()) {
        try {
          const result = await this.$api(
            "auction",
            "store",
            this.input
          ).finally(response => {
            this.dialog = false;
            this.$refs.form.reset();
            this.getAllCaught();
            return response;
          });

          if (result.status === 200) {
            this.success = true;
            this.messages = "Data lelang berhasil ditambahkan";
            this.snackbar = true;
          } else {
            this.success = false;
            this.messages = "Data lelang gagal ditambahkan";
            this.snackbar = true;
          }
        } catch (e) {
          console.log(e);
        }
      }
      this.$refs.form.reset();
    }
  }
};
</script>
