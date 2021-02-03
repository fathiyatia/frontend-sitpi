<template>
  <v-app>
    <v-main>
      <v-container
        fluid
        class="d-flex justify-center align-center full-height ma-0 pa-8 background_login"
      >
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  computed: {
    is_dark() {
      return this.$vuetify.theme.isDark;
    }
  }
};
</script>

<style>
.full-height {
  height: 100%;
}
</style>
