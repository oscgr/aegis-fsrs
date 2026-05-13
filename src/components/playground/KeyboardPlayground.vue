<template>
  <v-container class="fill-height">
    <v-row class="w-100 justify-center">
      <v-col cols="12">
        <v-card>
          <v-card-title v-text="t('keyboardPlayground.title')" />
          <v-card-text>
            <v-row v-for="(keyboardRow, i) in chunk(KeyboardLayouts.AZERTY, 4)" :key="i">
              <v-col
                v-for="(keyboardKey) in keyboardRow"
                :key="keyboardKey"
                cols="3"
                class="d-flex justify-center align-center"
              >
                <KeyboardPlaygroundKey
                  :is-stroked="keys.current?.has(keyboardKey)"
                  :keyboard-key="keyboardKey"
                  @click="emulateKeystroke(keyboardKey)"
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
import { onKeyStroke, useMagicKeys } from '@vueuse/core'
import { chunk, isNumber } from 'es-toolkit'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import KeyboardPlaygroundBuildingHistoryCard from '@/components/playground/KeyboardPlaygroundBuildingHistoryCard.vue'
import KeyboardPlaygroundKey from '@/components/playground/KeyboardPlaygroundKey.vue'
import Buildings from '@/constants/buildings.ts'
import { KeyboardLayouts } from '@/constants/keyboards.ts'

const { t } = useI18n()
const keys = useMagicKeys()
const currentKey = ref<number | null>(null)
const historyBuilding = ref<Building[]>([])

const emulateKeystroke = (key: string) => {
  keyStrokeHandler({ key } as KeyboardEvent) // "as" forced because keyStrokeHandler only takes into account "key" key
}

const keyStrokeHandler = (e: KeyboardEvent) => {
  const keyPressed = KeyboardLayouts.AZERTY.indexOf(e.key)
  if (!isNumber(keyPressed)) {
    console.warn('[keyboard-playground] key was not found in keyboard layout')
    return
  }

  if (!isNumber(currentKey.value)) {
    currentKey.value = keyPressed
    return // First time pressing
  }
  const selectedBuilding = Buildings.find(b => b.shortcut[0] === currentKey.value && b.shortcut[1] === keyPressed)
  if (selectedBuilding) {
    currentKey.value = null
    historyBuilding.value.push(selectedBuilding)
  } else {
    currentKey.value = keyPressed
  }
}

onKeyStroke(KeyboardLayouts.AZERTY, keyStrokeHandler, { passive: true, dedupe: true })
</script>
