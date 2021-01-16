<template>
  <v-data-table
    :headers="headers"
    :items="auction"
    :search="search"
    sort-by="created_at"
    sort-desc
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="accent--text"
          >Data Pelelangan Ikan</v-toolbar-title
        >
        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>
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
    <template v-slot:item.weightunit="{ item }">
      {{ item.weight }} {{ item.weight_unit }}
    </template>
    <template v-slot:item.action="{ item }">
      <v-btn
        small
        block
        color="secondary"
        :to="'/transaksi/formTransaksi/' + item.id"
      >
        Jual
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialogDelete: false,
    search: "",
    headers: [
      {
        text: "No. Pelelangan",
        align: "start",
        sortable: false,
        value: "id"
      },
      { text: "Waktu", value: "created_at" },
      { text: "Nelayan", value: "fisher_name" },
      { text: "Jenis Ikan", value: "fish_type" },
      { text: "Berat", value: "weightunit" },
      { text: "Status Pelelangan", value: "status_name" },
      { text: "Actions", value: "action", sortable: false }
    ],
    auction: []
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  mounted() {
    this.getAllAuction();
  },

  methods: {
    popupDialogDelete(id) {
      this.dialogDelete = true;
      this.currentId = id;
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    deleteAuction() {
      try {
        this.$api("auction", "delete", this.currentId).finally(() => {
          this.getAllAuction();
          this.dialogDelete = false;
        });
      } catch (e) {
        console.log(e);
      }
    },

    async getAllAuction() {
      try {
        this.auction = await this.$api("auction", "index", null);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
