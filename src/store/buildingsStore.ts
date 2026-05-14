import type { Building, BuildingCivGroup } from '@/constants/buildings.ts'
import { ref, shallowReadonly } from 'vue'
import useDB from '@/store/db.ts'
import BuildingUtils from '@/utils/BuildingUtils.ts'
import 'dexie-export-import'

const cachedCivGroup = ref<BuildingCivGroup>()
const cachedBuildings = ref<Building[]>([])

function useBuildingsStore() {
  const { getAppState, patchAppState } = useDB()
  // --- My current layout
  const getCurrentBuildingCivGroup = async() => {
    const civGroup = await getAppState('current-civ-group')
    if (!civGroup)
      return
    cachedCivGroup.value = civGroup as BuildingCivGroup
  }

  const getCivGroupBuildings = async() => {
    if (!cachedCivGroup.value)
      throw new Error('CivGroup not set')
    cachedBuildings.value = BuildingUtils.getCivGroupBuildings(cachedCivGroup.value)
  }

  const patchCurrentBuildingCivGroup = async(buildingCivGroup: BuildingCivGroup) => {
    await patchAppState('current-civ-group', buildingCivGroup)
    cachedCivGroup.value = buildingCivGroup
  }

  return {
    buildingCivGroup: shallowReadonly(cachedCivGroup),
    buildings: shallowReadonly(cachedBuildings),
    getCurrentBuildingCivGroup,
    patchCurrentBuildingCivGroup,
    getCivGroupBuildings,
  }
}

export default useBuildingsStore
