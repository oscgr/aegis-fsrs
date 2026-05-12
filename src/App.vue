<template>
  <v-app>
    <AppBar />
    <v-main>
      <!--          <Soundboard /> -->
      <VersionChecker />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import AppBar from '@/components/layout/AppBar.vue'
import VersionChecker from '@/components/layout/VersionChecker.vue'
</script>

<style lang="css">
html, body, .v-application {
  font-family: "Inter", sans-serif !important;
}

/* Target Vuetify's specific typography utility classes.
  We use a wildcard for classes starting with "text-" so we
  don't accidentally override icon fonts like ".mdi"
*/
.v-application [class*="text-"] {
  font-family: "Inter", sans-serif !important;
}

/* Also ensure standard buttons pick up the font */
.v-btn {
  font-family: "Inter", sans-serif !important;
}
</style>
