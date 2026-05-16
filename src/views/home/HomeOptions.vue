<template>
  <v-card class="fill-height">
    <v-card-text>
      <div class="text-body-medium font-weight-thin text-center mb-1" v-text="t('options.civ.title')" />
      <div class="text-center">
        <v-btn-toggle
          v-model="currentBuildingCivGroup"
          direction="vertical"
          density="comfortable"
          variant="text"
          color="primary"
        >
          <v-btn
            v-for="buildingCivGroup in BuildingCivGroups"
            :key="buildingCivGroup.name"
            v-tooltip:right="{ openDelay: 50, text: buildingCivGroup.name }"
            block
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
      </div>
      <div class="text-body-medium font-weight-thin text-center mt-4 mb-1" v-text="t('options.keyboardLayout.title')" />
      <div class="text-center">
        <v-btn-toggle
          v-model="currentKeyboardLayout"
          direction="vertical"
          density="comfortable"
          variant="text"
          color="primary"
        >
          <v-btn
            v-for="layout in [...keyboardLayouts, { name: 'Custom' }]"
            :key="layout.name"
            :value="layout.name"
            :disabled="layout.name === 'Custom'"
            :text="layout.name"
          />
        </v-btn-toggle>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { BuildingCivGroups } from '@/constants/buildings.ts'
import { KeyboardLayouts } from '@/constants/keyboards.ts'
import useBuildingsStore from '@/store/buildingsStore.ts'
import useKeyboardLayoutsStore from '@/store/keyboardLayoutsStore.ts'

const { t } = useI18n()

const keyboardLayoutsStore = useKeyboardLayoutsStore()
const buildingsStore = useBuildingsStore()

const keyboardLayouts = computed(() => KeyboardLayouts) // todo - include custom

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
</script>
