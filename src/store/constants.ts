// Key used to store settings in dexie
// Changing the key will 'erase' all local user stored preference
import { readonly } from 'vue'

export const LOCAL_STORAGE_KEY = 'aoe-shortcuts-v060'

// Treshold before displaying game stats after game ended.
export const MIN_BUILDING_TRESHOLD = 15

export const KEYBOARD_DEFAULT_LAYOUTS = readonly({
  QWERTY: [
    ['q', 'w', 'e', 'r'],
    ['a', 's', 'd', 'f'],
    ['z', 'x', 'c', 'v'],
  ],
  QWERTZ: [
    ['q', 'w', 'e', 'r'],
    ['a', 's', 'd', 'f'],
    ['y', 'x', 'c', 'v'],
  ],
  AZERTY: [
    ['a', 'z', 'e', 'r'],
    ['q', 's', 'd', 'f'],
    ['w', 'x', 'c', 'v'],
  ],
  DVORAK: [
    ['\'', ',', '.', 'p'],
    ['a', 'o', 'e', 'u'],
    [';', 'q', 'j', 'k'],
  ],

  NULL: [
    ['?', '?', '?', '?'],
    ['?', '?', '?', '?'],
    ['?', '?', '?', '?'],
  ],
})
