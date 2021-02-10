<template>
  <div class="text-center">
    <v-snackbar
      v-model="show"
      top
      :timeout="success ? timeout.success : timeout.error"
      :color="success ? color.success : color.error"
    >
      <v-icon class="pr-2" color="white">{{
        success ? "mdi-check-circle-outline" : "mdi-alert"
      }}</v-icon>
      {{ messages }}
    </v-snackbar>
  </div>
</template>
<script>
export default {
  props: {
    value: Boolean,
    messages: {
      type: String,
      default: ""
    },
    success: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: this.$props.value,
      timeout: {
        success: 1000,
        error: 1000
      },
      color: {
        success: "success",
        error: "error"
      }
    };
  },
  watch: {
    value(value) {
      this.show = value;
    },
    show(value) {
      this.$emit("input", value);
    }
  },
  methods: {
    close() {
      this.$emit("input", false);
    }
  }
};
</script>
