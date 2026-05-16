<template>
  <v-card
    class="d-flex align-center flex-column"
    variant="tonal"
    width="120px"
    height="140px"
    density="compact"
  >
    <v-card-text class="d-flex flex-column align-center">
      <v-img
        aspect-ratio="1"
        width="66px"
        transition="none"
        :src="historyEntry.icon"
      />
      <div class="text-body-small text-no-wrap" v-text="historyEntry.name" />
      <v-hotkey
        color="primary"
        :keys="BuildingUtils.convertBuildingShortcutCodeToLayout(historyEntry.shortcut1, historyEntry.shortcut2, (store.currentKeyboardLayout?.content || []) as KeyboardLayout['content'])"
        variant="elevated"
        platform="mac"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Building } from '@/constants/buildings.ts'
import type { KeyboardLayout } from '@/constants/keyboards.ts'
import useKeyboardLayoutsStore from '@/store/keyboardLayoutsStore.ts'
import BuildingUtils from '@/utils/BuildingUtils.ts'

defineProps<{ historyEntry: Building }>()
const store = useKeyboardLayoutsStore()
</script>
