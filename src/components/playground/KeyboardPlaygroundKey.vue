<template>
  <v-sheet class="keyboard-key text-uppercase cursor-pointer" :color="isStroked ? 'primary' : 'grey-lighten-4'" v-text="keyboardKey" />
</template>

<script setup lang="ts">
defineProps<{ isStroked: boolean, keyboardKey: string }>()
</script>

<style lang="scss">
.keyboard-key {
  line-height: 2;
  text-align: center;
  border-radius: 0.25rem;
  height: 2rem;
  aspect-ratio: 1;
  outline: black solid 0.1px;
  user-select: none;
}

.keyboard-key:hover {
  background-color: rgba(63, 66, 70, 0.26);
}
</style>
