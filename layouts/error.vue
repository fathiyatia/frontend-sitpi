<template>
  <v-app>
    <v-container
      fluid
      class="d-flex justify-center align-center full-height ma-0 pa-8"
    >
      <v-card tile elevation="0" color="#f2f6f9">
        <v-card-title class="d-flex justify-center">
          <h1 v-if="error.statusCode === 404">
            {{ pageNotFound }}
          </h1>
          <h1 v-else>
            {{ otherError }}
          </h1>
        </v-card-title>

        <v-card-subtitle class="pt-2 d-flex justify-center">
          Maaf, terjadi kesalahan. Silahkan kembali ke homepage.
        </v-card-subtitle>

        <v-card-actions class="d-flex justify-center">
          <v-btn class="primary text-capitalize" :to="'/'">
            Homepage
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred"
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
.full-height {
  height: 200px;
}
</style>
