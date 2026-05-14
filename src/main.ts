/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Composables
import { createApp } from 'vue'
// Plugins
import { registerPlugins } from '@/plugins'

import useBuildingsStore from '@/store/buildingsStore.ts'
import useKeyboardLayoutsStore from '@/store/keyboardLayoutsStore.ts'
// Components
import App from './App.vue'

const { getCurrentKeyboardLayout } = useKeyboardLayoutsStore()
const { getCurrentBuildingCivGroup } = useBuildingsStore()

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

// todo use pinia
Promise.all([getCurrentKeyboardLayout(), getCurrentBuildingCivGroup()])
