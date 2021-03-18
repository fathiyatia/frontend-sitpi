<template> </template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.checkRole();
  },

  methods: {
    checkRole() {
      if (this.$auth.$state.user.user.role.name != "superadmin") {
        this.$router.replace("/dashboard");
      } else {
        this.$router.replace("/ikan/dataIkan");
      }
    }
  }
};
</script>
