<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="mobile"
    max-width="400px"
    persistent
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-card-text>
        <div class="text-justify" v-text="$t('newVersionAvailable.content')" />
      </v-card-text>
      <v-card-actions>
        <v-btn :text="$t('newVersionAvailable.no')" variant="text" @click="ignore()" />
        <v-spacer />
        <v-btn :text="$t('newVersionAvailable.yes')" variant="outlined" @click="update()" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { useDisplay } from 'vuetify/framework'
import useVersion from '@/store/version.ts'

const dialog = ref<boolean>(false)
const ONE_MIN = 60 * 1000
const timeoutId = shallowRef()
const { verify, ignoreNewVersion, ignore: _ignore, update: _update, init } = useVersion()
const { mobile } = useDisplay()

onMounted(() => {
  setInterval(async() => {
    if (!import.meta.env.DEV && !ignoreNewVersion.value && await verify())
      open()
  }, ONE_MIN)
})

function open() {
  if (dialog.value)
    return
  dialog.value = true
}

function update() {
  _update()
  dialog.value = false
}
function ignore() {
  _ignore()
  if (timeoutId.value)
    clearTimeout(timeoutId.value)

  dialog.value = false
}

onMounted(() => {
  init()
})
onUnmounted(() => {
  if (timeoutId.value)
    clearTimeout(timeoutId.value)
})
</script>
