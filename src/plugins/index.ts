import type { App } from 'vue'
import { createRulesPlugin } from 'vuetify/labs/rules'
import i18n from '@/plugins/i18n'
import pinia from '@/plugins/pinia'
import { router } from '@/plugins/router.ts'
import vuetify from '@/plugins/vuetify'

export function registerPlugins(app: App) {
  app.use(pinia)
  app.use(vuetify)
  app.use(router)
  app.use(createRulesPlugin({ /* options */}, vuetify.locale))
  app.use(i18n)
}
