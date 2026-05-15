import type { Building, BuildingCivGroup } from '@/constants/buildings.ts'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import useDB from '@/store/db.ts'
import BuildingUtils from '@/utils/BuildingUtils.ts'

const useBuildingsStore = defineStore('buildings', () => {
  const { getAppState, patchAppState } = useDB()
  const cachedCivGroup = ref<BuildingCivGroup>()
  const cachedBuildings = ref<Building[]>([])

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
    currentBuildingCivGroup: computed(() => cachedCivGroup.value),
    buildings: computed(() => cachedBuildings.value),
    getCurrentBuildingCivGroup,
    patchCurrentBuildingCivGroup,
  }
})

export default useBuildingsStore
