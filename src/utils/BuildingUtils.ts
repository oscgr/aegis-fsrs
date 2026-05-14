import type { KeyboardLayout } from '@/constants/keyboards.ts'
import Buildings, { BuildingCivGroup } from '@/constants/buildings.ts'

export default {
  convertBuildingShortcutCodeToLayout(shortcut1: number, shortcut2: number, keyboardLayout: KeyboardLayout['content']): string {
    return `${keyboardLayout[shortcut1].toUpperCase()}+${keyboardLayout[shortcut2].toUpperCase()}`
  },
  getCivGroupBuildings(group: BuildingCivGroup) {
    return Buildings.filter(building => building.groups.some(_group => [BuildingCivGroup.COMMON, group].includes(_group)))
  },
}
