<template>
  <v-row>
    <v-col>
      <v-card class="fill-height">
        <v-card-text>
          <v-btn to="/playground" variant="tonal">
            Go to playground
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col class="flex-grow-0">
      <HomeOptions />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import HomeOptions from '@/views/home/HomeOptions.vue'

const { t } = useI18n()
</script>
