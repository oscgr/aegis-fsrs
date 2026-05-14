/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify } from 'vuetify'
// Styles
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

import { VFileUpload } from 'vuetify/labs/VFileUpload'
import { en, fr } from 'vuetify/locale'
import 'vuetify/styles'
import '@fontsource/inter/latin-100.css'
import '@fontsource/inter/latin-200.css'
import '@fontsource/inter/latin-300.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-700.css'
import '@fontsource/inter/latin-800.css'
import '@fontsource/inter/latin-900.css'
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  locale: {
    locale: navigator.language?.slice(0, 2),
    fallback: 'en',
    messages: { en, fr },
  },
  components: {
    VFileUpload,
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          background: '#14263a',
          surface: '#223951',
          // 'surface-bright': '#354250',
          // 'surface-light': '#EEEEEE',
          // 'surface-variant': '#424242',
          // 'on-surface-variant': '#EEEEEE',
          primary: '#d8b25d',
          // 'primary-darken-1': '#1F5592',
          secondary: '#48A9A6',
          // 'secondary-darken-1': '#018786',
          error: '#B00020',
          info: '#FB8C00',
          // 'success': '#4CAF50',
          // 'warning': '#FB8C00',
        },

      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
