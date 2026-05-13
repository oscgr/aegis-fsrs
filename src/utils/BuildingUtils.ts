import type { KeyboardLayout } from '@/store/db.ts'

export default {
  convertBuildingShortcutCodeToLayout(shortcut: [number, number], keyboardLayout: KeyboardLayout['content']): string {
    return `${keyboardLayout[shortcut[0]].toUpperCase()}+${keyboardLayout[shortcut[1]].toUpperCase()}`
  },
}
