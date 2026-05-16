<template>
  <v-card>
    <v-card-title v-text="t('keyboardPlayground.title')" />
    <v-card-text>
      <div v-for="(keyboardRow, i) in chunk(Array.from({ length: 12 }), 4)" :key="i" class="d-flex justify-center align-center">
        <div
          v-for="(_, j) in keyboardRow"
          :key="j"
          class="d-flex justify-center pa-2 align-center"
        >
          <KeyboardPlaygroundKey
            :index="i * 4 + j"
            :current="currentKey"
            @key-stroke="keyStrokeHandler"
          />
        </div>
      </div>
    </v-card-text>
    <v-card-actions class="overflow-x-auto">
      <div
        v-for="historyEntry in historyBuilding"
        :key="historyEntry.name"
      >
        <KeyboardPlaygroundBuildingHistoryCard :history-entry="historyEntry" />
      </div>
    </v-card-actions>
    <v-fab app to="/" :icon="mdiArrowLeft" />
  </v-card>
</template>

<script setup lang="ts">
import type { Building } from '@/constants/buildings.ts'
import { mdiArrowLeft } from '@mdi/js'
import { chunk, isNumber } from 'es-toolkit'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import useBuildingsStore from '@/store/buildingsStore.ts'
import KeyboardPlaygroundBuildingHistoryCard from '@/views/playground/KeyboardPlaygroundBuildingHistoryCard.vue'
import KeyboardPlaygroundKey from '@/views/playground/KeyboardPlaygroundKey.vue'

const { t } = useI18n()
const store = useBuildingsStore()
const currentKey = ref<number | null>(null)
const historyBuilding = ref<Readonly<Building>[]>([])

const keyStrokeHandler = (keyIndex: number) => {
  if (!isNumber(currentKey.value)) {
    currentKey.value = keyIndex
    return // First time pressing
  }
  const selectedBuilding = store.buildings.filter(b => b.shortcut1 === currentKey.value && b.shortcut2 === keyIndex)
  if (selectedBuilding?.length > 1)
    throw new Error('More than one building found for shortcut')
  if (selectedBuilding[0]) {
    currentKey.value = null
    historyBuilding.value.unshift(selectedBuilding[0])
  } else {
    currentKey.value = keyIndex
  }
}
</script>
