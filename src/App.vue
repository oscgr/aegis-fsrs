<template>
  <v-app>
    <AppBar />
    <v-main>
      <!-- :key to force re-render, because of keystroke listener -->
      <KeyboardPlayground :key="keyboardLayoutsStore.currentKeyboardLayout?.name" />
      <VersionChecker />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import AppBar from '@/components/layout/AppBar.vue'
import VersionChecker from '@/components/layout/VersionChecker.vue'
import KeyboardPlayground from '@/components/playground/KeyboardPlayground.vue'
import useBuildingsStore from '@/store/buildingsStore.ts'
import useKeyboardLayoutsStore from '@/store/keyboardLayoutsStore.ts'

const keyboardLayoutsStore = useKeyboardLayoutsStore()
const buildingsStore = useBuildingsStore()

onMounted(() => {
  Promise.all([keyboardLayoutsStore.cacheCurrentKeyboardLayout(), buildingsStore.cacheCurrentCivGroupAndBuildings()])
})
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
