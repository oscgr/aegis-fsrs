<template>
  <v-dialog v-model="dialog" max-width="900px" :fullscreen="smAndDown">
    <v-card>
      <v-toolbar color="surface" density="compact">
        <v-toolbar-title :text="t('options.title')" />
        <v-spacer />
        <v-btn :icon="mdiClose" variant="text" @click="dialog = false" />
      </v-toolbar>
      <v-card-text>
        <v-card variant="text">
          <v-card-title class="text-body-large" v-text="t('options.keyboardLayout.title')" />
          <v-card-text>
            <v-btn-toggle v-model="currentKeyboardLayout" density="compact" variant="tonal">
              <v-btn
                v-for="layout in [...keyboardLayouts, { name: 'Custom (coming soon)' }]"
                :key="layout.name"
                :value="layout.name"
                :disabled="layout.name === 'Custom (coming soon)'"
                :text="layout.name"
              />
            </v-btn-toggle>
          </v-card-text>
        </v-card>
        <v-card variant="text" class="mt-4">
          <v-card-title class="text-body-large" v-text="t('options.civ.title')" />
          <v-card-text>
            <v-btn-toggle v-model="currentBuildingCivGroup" variant="tonal" density="compact">
              <v-btn
                v-for="buildingCivGroup in BuildingCivGroups"
                :key="buildingCivGroup.name"
                v-tooltip:top="{ openDelay: 50, text: buildingCivGroup.name }"
                :value="buildingCivGroup.name"
              >
                <v-img
                  height="12px"
                  transition="none"
                  :width="`${21 * buildingCivGroup.nbCivs}px`"
                  :src="buildingCivGroup.icon"
                />
              </v-btn>
            </v-btn-toggle>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { mdiClose } from '@mdi/js'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify/framework'
import { BuildingCivGroups } from '@/constants/buildings.ts'
import { KeyboardLayouts } from '@/constants/keyboards.ts'
import useBuildingsStore from '@/store/buildingsStore.ts'
import useKeyboardLayoutsStore from '@/store/keyboardLayoutsStore.ts'

const dialog = ref(false)

const { t } = useI18n()
const keyboardLayoutsStore = useKeyboardLayoutsStore()
const buildingsStore = useBuildingsStore()

const keyboardLayouts = computed(() => KeyboardLayouts) // todo - include custom
const { smAndDown } = useDisplay()

const currentKeyboardLayout = computed({
  get: () => keyboardLayoutsStore.currentKeyboardLayout?.name,
  set: (v) => {
    if (v)
      keyboardLayoutsStore.patchCurrentKeyboardLayout(v)
  },
})

const currentBuildingCivGroup = computed({
  get: () => buildingsStore.currentBuildingCivGroup,
  set: (v) => {
    if (v)
      buildingsStore.patchCurrentBuildingCivGroup(v)
  },
})

const open = async() => {
  dialog.value = true
}

defineExpose({ open })
</script>
