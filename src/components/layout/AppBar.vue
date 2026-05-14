<template>
  <v-app-bar>
    <v-row no-gutters>
      <v-col class="d-md-flex align-center justify-start pl-4 d-none" cols="3" />
      <v-col
        class="d-flex align-center"
        :class="{ 'justify-space-between': smAndDown, 'justify-center': mdAndUp }"
        :cols="mdAndUp ? 6 : 12"
      >
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
            <v-list-item :append-icon="mdiKeyboardSettings" :title="t('keyboardLayouts.menuOptionTitle')" :subtitle="t('keyboardLayouts.menuOptionSubtitle', [currentKeyboardLayout?.name])" />
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
          href="https://github.com/oscgr/aegis-fsrs"
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
            <v-list-item :append-icon="mdiKeyboardSettings" :title="t('keyboardLayouts.menuOptionTitle')" :subtitle="t('keyboardLayouts.menuOptionSubtitle', [currentKeyboardLayout?.name])" />
            <v-divider />
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
  mdiKeyboardSettings,
  mdiMenu,
  mdiMoonWaningCrescent,
  mdiWeatherSunny,
} from '@mdi/js'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDisplay, useTheme } from 'vuetify/framework'
import useDB from '@/store/db.ts'
import useKeyboardLayoutsStore from '@/store/keyboardLayoutsStore.ts'

const theme = useTheme()
const { mdAndUp, smAndDown } = useDisplay()
const { exportData, importData } = useDB()
const { getCurrentKeyboardLayout, currentKeyboardLayout } = useKeyboardLayoutsStore()
const { t } = useI18n()

onMounted(async() => {
  await getCurrentKeyboardLayout()
})
</script>
