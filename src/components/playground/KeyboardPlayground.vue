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
          <v-card-actions>
            <div class="d-flex flex-wrap ga-2">
              <KeyboardPlaygroundBuildingHistoryCard
                v-for="historyEntry in historyBuilding"
                :key="historyEntry.name"
                :history-entry="historyEntry"
              />
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
const { buildings } = useBuildingsStore()
const currentKey = ref<number | null>(null)
const historyBuilding = ref<Readonly<Building>[]>([])

const keyStrokeHandler = (keyIndex: number) => {
  if (!isNumber(currentKey.value)) {
    currentKey.value = keyIndex
    return // First time pressing
  }
  const selectedBuilding = buildings.value?.find(b => b.shortcut[0] === currentKey.value && b.shortcut[1] === keyIndex)
  if (selectedBuilding) {
    currentKey.value = null
    historyBuilding.value.push(selectedBuilding)
  } else {
    currentKey.value = keyIndex
  }
}
</script>
