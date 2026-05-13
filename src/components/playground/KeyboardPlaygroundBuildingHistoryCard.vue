<template>
  <v-card
    class="d-flex align-center flex-column"
    variant="tonal"
  >
    <v-img
      aspect-ratio="1"
      width="96px"
      transition="none"
      :src="historyEntry.icon"
    />
    <span class="text-body-small" v-text="historyEntry.name" />
    <span class="text-body-small" v-text="BuildingUtils.convertBuildingShortcutCodeToLayout(historyEntry.shortcut, KeyboardLayouts.AZERTY)" />
  </v-card>
</template>

<script setup lang="ts">
import type { Building } from '@/constants/buildings.ts'
import { KeyboardLayouts } from '@/constants/keyboards.ts'
import BuildingUtils from '@/utils/BuildingUtils.ts'

defineProps<{ historyEntry: Building }>()
</script>
