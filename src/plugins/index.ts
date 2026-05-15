// Types
import type { App } from 'vue'
/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

import { createRulesPlugin } from 'vuetify/labs/rules'
import i18n from './i18n'
import pinia from './pinia'
// Plugins
import vuetify from './vuetify'

export function registerPlugins(app: App) {
  app.use(pinia)
  app.use(vuetify)
  app.use(createRulesPlugin({ /* options */}, vuetify.locale))
  app.use(i18n)
}
