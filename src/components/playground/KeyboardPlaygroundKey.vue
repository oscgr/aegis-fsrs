<template>
  <v-btn
    :text="keyboardKey.toUpperCase()"
    width="52px"
    :color="isStroked ? 'primary' : ''"
    class="mx-1"
    variant="tonal"
  />
</template>

<script setup lang="ts">
defineProps<{ isStroked: boolean, keyboardKey: string }>()
</script>

<style lang="scss">
</style>
