<template>
  <v-app-bar>
    <v-row no-gutters>
      <v-col class="d-md-flex align-center justify-start pl-4 d-none" cols="3">
        <!--        <v-slider -->
        <!--          :key="`global-vol-slider-${mdAndUp ? 'not-mob' : 'mob'}`" -->
        <!--          density="compact" -->
        <!--          hide-details -->
        <!--          :max="1" -->
        <!--          :min="0" -->
        <!--          :step="0.001" -->
        <!--          :width="mdAndUp ? 180 : ''" -->
        <!--        > -->
        <!--          <template #prepend> -->
        <!--            <v-btn -->
        <!--              v-tooltip:left="{ openDelay: 200, text: t('globalMute') }" -->
        <!--              :aria-label="t('globalMute')" -->
        <!--              density="comfortable" -->
        <!--              :icon="isGloballyMuted ? mdiVolumeOff : mdiVolumeHigh" -->
        <!--              variant="text" -->
        <!--              @click="toggleGlobalMute" -->
        <!--            /> -->
        <!--          </template> -->
        <!--        </v-slider> -->
      </v-col>
      <v-col
        class="d-flex align-center"
        :class="{ 'justify-space-between': smAndDown, 'justify-center': mdAndUp }"
        :cols="mdAndUp ? 6 : 12"
      >
        <!--        <v-tabs -->
        <!--          v-model="tab" -->
        <!--          align-tabs="center" -->
        <!--          density="comfortable" -->
        <!--          stacked -->
        <!--        > -->
        <!--          <v-tab> -->
        <!--            <v-icon :icon="mdiSurroundSound" /> -->
        <!--            <span v-text="t('soundboard')" /> -->
        <!--          </v-tab> -->
        <!--          <v-tab> -->
        <!--            <v-icon :icon="mdiWifiStrength3" /> -->
        <!--            <span v-text="t('motionDetector')" /> -->
        <!--          </v-tab> -->
        <!--        </v-tabs> -->
        <v-bottom-sheet
          :close-on-content-click="false"
          :disabled="mdAndUp"
          eager
          min-width="300px"
        >
          <template #activator="{ props: menuProps, isActive }">
            <v-btn
              v-if="smAndDown"
              :aria-label="t('menu')"
              :icon="isActive ? mdiClose : mdiMenu"
              v-bind="menuProps"
              variant="flat"
            />
          </template>
          <v-list>
            <v-list-item
              :append-icon="theme.current.value.dark ? mdiMoonWaningCrescent : mdiWeatherSunny"
              :title="t('toggleTheme')"
              @click="theme.toggle(['light', 'dark'])"
            />
            <v-list-item
              :append-icon="mdiGithub"
              href="https://github.com/oscgr/aegis-fsrs"
              target="_blank"
              :title="t('linkToGithub')"
            />
            <v-divider />
            <v-list-item :append-icon="mdiImport" :title="t('import')" @click="importData()" />
            <v-list-item :append-icon="mdiExport" :title="t('export')" @click="exportData()" />
          </v-list>
        </v-bottom-sheet>
      </v-col>
      <v-col class="d-none d-md-flex justify-end align-center pr-4" cols="3">
        <v-btn
          v-tooltip:left="{ openDelay: 200, text: t('toggleTheme') }"
          :aria-label="t('toggleTheme')"
          :icon="theme.current.value.dark ? mdiMoonWaningCrescent : mdiWeatherSunny"
          variant="flat"
          @click="theme.toggle(['light', 'dark'])"
        />
        <v-btn
          v-tooltip:left="{ openDelay: 200, text: t('linkToGithub') }"
          :aria-label="t('linkToGithub')"
          href="https://github.com/oscgr/rpg-soundboard"
          :icon="mdiGithub"
          target="_blank"
          variant="flat"
        />
        <v-menu>
          <template #activator="{ props: menuProps }">
            <v-btn
              v-tooltip:left="{ openDelay: 200, text: t('menu') }"
              :icon="mdiDotsVertical"
              v-bind="menuProps"
            />
          </template>
          <v-list density="compact">
            <v-list-item :append-icon="mdiImport" :title="t('import')" @click="importData()" />
            <v-list-item :append-icon="mdiExport" :title="t('export')" @click="exportData()" />
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script setup lang="ts">
import {
  mdiClose,
  mdiDotsVertical,
  mdiExport,
  mdiGithub,
  mdiImport,
  mdiMenu,
  mdiMoonWaningCrescent,
  mdiWeatherSunny,
} from '@mdi/js'

import { useToggle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { useDisplay, useTheme } from 'vuetify/framework'
import useDB from '@/store/db.ts'

const tab = defineModel()
const theme = useTheme()
const { mdAndUp, smAndDown } = useDisplay()
const [isGloballyMuted, toggleGlobalMute] = useToggle()

const { t } = useI18n()

const { exportData, importData } = useDB()
</script>
