<template>
  <v-card
    class="d-flex align-center flex-column"
    variant="tonal"
    density="compact"
  >
    <v-card-text class="d-flex flex-column align-center">
      <v-img
        aspect-ratio="1"
        width="66px"
        transition="none"
        :src="historyEntry.icon"
      />
      <!--      <v-img -->
      <!--        aspect-ratio="1" -->
      <!--        width="66px" -->
      <!--        transition="none" -->
      <!--        :src="`@/assets/icons/flags/${props.historyEntry.group.toLowerCase()}.png`" -->
      <!--      /> -->
      <div class="text-body-small" v-text="historyEntry.name" />
      <div class="text-body-small" v-text="BuildingUtils.convertBuildingShortcutCodeToLayout(historyEntry.shortcut, (currentKeyboardLayout?.content || []) as KeyboardLayout['content'])" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Building } from '@/constants/buildings.ts'
import type { KeyboardLayout } from '@/store/db.ts'
import useKeyboardLayoutsStore from '@/store/keyboardLayoutsStore.ts'
import BuildingUtils from '@/utils/BuildingUtils.ts'

defineProps<{ historyEntry: Building }>()
const { currentKeyboardLayout } = useKeyboardLayoutsStore()
</script>
