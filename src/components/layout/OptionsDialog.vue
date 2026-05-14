<template>
  <v-dialog v-model="dialog" max-width="500px" :fullscreen="smAndDown">
    <v-card>
      <v-toolbar color="primary">
        <v-toolbar-title :text="t('options.title')" />
        <v-spacer />
        <v-btn :icon="mdiClose" variant="text" @click="dialog = false" />
      </v-toolbar>
      <v-card-text>
        <v-card variant="tonal">
          <v-card-title v-text="t('options.keyboardLayout.title')" />
          <v-card-text>
            <v-btn-toggle v-model="currentKeyboardLayout" density="compact" variant="tonal">
              <v-btn
                v-for="layout in keyboardLayouts"
                :key="layout.id"
                :value="layout.id"
                :text="layout.name"
              />
            </v-btn-toggle>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { KeyboardLayout } from '@/store/db.ts'
import { mdiClose } from '@mdi/js'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify/framework'
import useKeyboardLayoutsStore from '@/store/keyboardLayoutsStore.ts'

const dialog = ref(false)
const { t } = useI18n()
const keyboardLayouts = ref<KeyboardLayout[]>([])
const { smAndDown } = useDisplay()

const { currentKeyboardLayout: _currentKeyboardLayout, getCurrentKeyboardLayout, patchCurrentKeyboardLayout, searchKeyboardLayouts } = useKeyboardLayoutsStore()

const currentKeyboardLayout = computed({
  get: () => _currentKeyboardLayout.value?.id,
  set: (v) => {
    if (v)
      patchCurrentKeyboardLayout(v)
  },
})
const open = async() => {
  keyboardLayouts.value = await searchKeyboardLayouts()
  dialog.value = true
}

defineExpose({ open })
</script>
