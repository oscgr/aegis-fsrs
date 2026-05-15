<template>
  <v-container max-width="500px">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title v-text="t('keyboardPlayground.title')" />
          <v-card-text>
            <v-row v-for="(keyboardRow, i) in chunk(Array.from({ length: 12 }), 4)" :key="i">
              <v-col
                v-for="(_, j) in keyboardRow"
                :key="j"
                cols="3"
                class="d-flex justify-center align-center"
              >
                <KeyboardPlaygroundKey
                  :index="i * 4 + j"
                  :current="currentKey"
                  @key-stroke="keyStrokeHandler"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="overflow-x-auto">
            <div
              v-for="historyEntry in historyBuilding"
              :key="historyEntry.name"
            >
              <KeyboardPlaygroundBuildingHistoryCard :history-entry="historyEntry" />
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { Building } from '@/constants/buildings.ts'
import { chunk, isNumber } from 'es-toolkit'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import KeyboardPlaygroundBuildingHistoryCard from '@/components/playground/KeyboardPlaygroundBuildingHistoryCard.vue'
import KeyboardPlaygroundKey from '@/components/playground/KeyboardPlaygroundKey.vue'
import useBuildingsStore from '@/store/buildingsStore.ts'

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
