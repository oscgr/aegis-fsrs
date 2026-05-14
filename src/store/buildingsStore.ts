import type { Building, BuildingCivGroup } from '@/constants/buildings.ts'
import { ref, shallowReadonly } from 'vue'
import useDB from '@/store/db.ts'
import BuildingUtils from '@/utils/BuildingUtils.ts'
import 'dexie-export-import'

// todo - use pinia
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
    cachedBuildings.value = BuildingUtils.getCivGroupBuildings(cachedCivGroup.value)
  }

  const patchCurrentBuildingCivGroup = async(buildingCivGroup: BuildingCivGroup) => {
    await patchAppState('current-civ-group', buildingCivGroup)
    cachedCivGroup.value = buildingCivGroup
    cachedBuildings.value = BuildingUtils.getCivGroupBuildings(buildingCivGroup)
  }

  return {
    currentBuildingCivGroup: shallowReadonly(cachedCivGroup),
    buildings: shallowReadonly(cachedBuildings),
    getCurrentBuildingCivGroup,
    patchCurrentBuildingCivGroup,
  }
}

export default useBuildingsStore
