import type { KeyboardLayout } from '@/store/db.ts'
import Buildings, { BuildingCivGroup } from '@/constants/buildings.ts'

export default {
  convertBuildingShortcutCodeToLayout(shortcut: [number, number], keyboardLayout: KeyboardLayout['content']): string {
    return `${keyboardLayout[shortcut[0]].toUpperCase()}+${keyboardLayout[shortcut[1]].toUpperCase()}`
  },
  getCivGroupBuildings(group: BuildingCivGroup) {
    return Buildings.filter(building => [BuildingCivGroup.GENERIC, group].includes(building.group))
  },
}
