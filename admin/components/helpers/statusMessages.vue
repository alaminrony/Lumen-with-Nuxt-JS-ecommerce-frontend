<template>
  <div>
    <div class="sufee-alert alert with-close alert-success alert-dismissible"
         v-if="this.$store.state.shared.status_messages.success_message != ''">
      <span class="badge badge-pill badge-success">Success</span>
      {{ this.$store.state.shared.status_messages.success_message }}
    </div>

    <div class="sufee-alert alert with-close alert-danger alert-dismissible" v-if="this.$store.state.shared.status_messages.error_message != ''">
      <span class="badge badge-pill badge-success">Error</span>
      {{ this.$store.state.shared.status_messages.error_message }}
    </div>

    <div class="sufee-alert alert with-close alert-danger alert-dismissible" v-if="this.$store.state.shared.status_messages.validation_errors.length">
      <ul v-for="(error, index) in this.$store.state.shared.status_messages.validation_errors" :key="index">
        <li>{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "statusMessages",
      mounted() {
      }
    }
</script>

<style scoped>

</style>