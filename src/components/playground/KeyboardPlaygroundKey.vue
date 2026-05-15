<template>
  <!-- TODO find a way to disable badge when no content to prevent this if/else. Maybe <Teleport/>? -->
  <v-badge
    v-if="!!badgeContent"
    location="top right"
    color="primary"
    bordered
    :content="badgeContent"
  >
    <v-btn
      width="52px"
      :text="keyboardKey.toUpperCase()"
      :color="keys.current?.has(keyboardKey) ? 'primary' : ''"
      class="mx-1"
      variant="tonal"
      :disabled="!comboExists"
      @click="keyStrokeHandler()"
    />
  </v-badge>
  <v-btn
    v-else
    width="52px"
    :text="keyboardKey.toUpperCase()"
    :color="keys.current?.has(keyboardKey) ? 'primary' : ''"
    class="mx-1"
    variant="tonal"
    :disabled="!comboExists"
    @click="keyStrokeHandler()"
  />
</template>

<script setup lang="ts">
import { onKeyStroke, useMagicKeys } from '@vueuse/core'
import { isNumber } from 'es-toolkit'
import { computed } from 'vue'
import { BuildingAge } from '@/constants/buildings.ts'
import useBuildingsStore from '@/store/buildingsStore.ts'
import useKeyboardLayoutsStore from '@/store/keyboardLayoutsStore.ts'

const props = defineProps<{ index: number, current: number | null }>()
const emits = defineEmits<{ (e: 'keyStroke', index: number): void }>()
const keys = useMagicKeys()
const keyboardLayoutsStore = useKeyboardLayoutsStore()
const buildingsStore = useBuildingsStore()

const keyboardKey = computed(() => keyboardLayoutsStore.currentKeyboardLayout?.content[props.index] || '')

const comboExists = computed(() => {
  if (!isNumber(props.current)) // Nothing is pressed
    return buildingsStore.buildings.some(b => b.shortcut1 === props.index)
  else if (buildingsStore.buildings.every(b => b.shortcut1 !== props.current)) // Pressed a key that could not lead to a building shortcut
    return buildingsStore.buildings.some(b => b.shortcut1 === props.index)
  return buildingsStore.buildings.some(b => b.shortcut1 === props.current && b.shortcut2 === props.index)
})

const badgeContent = computed(() => {
  const building = buildingsStore.buildings.find(b => b.shortcut1 === props.current && b.shortcut2 === props.index)
  if (building)
    return building.name.split(' ').map(v => v[0]).join('').toUpperCase()
  switch (props.index) {
    case 0:
      return BuildingAge.I
    case 1:
      return BuildingAge.II
    case 2:
      return BuildingAge.III
    case 3:
      return BuildingAge.IV
    default:
      return null
  }
})

const keyStrokeHandler = () => {
  emits('keyStroke', props.index)
}

onKeyStroke(keyboardKey.value, keyStrokeHandler, { passive: true, dedupe: true })
</script>

<style lang="scss">
</style>
