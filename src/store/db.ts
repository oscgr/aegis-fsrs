import type { EntityTable } from 'dexie'
import { Dexie } from 'dexie'
import { BuildingCivGroup } from '@/constants/buildings.ts'
import { KeyboardLayouts } from '@/constants/keyboards.ts'
import FileUtils from '@/utils/FileUtils.ts'
import 'dexie-export-import'

export interface KeyboardLayout {
  id: number
  name: string // display name
  template: boolean // templates cannot be deleted. They are standard keyboard layouts
  content: [string, string, string, string, string, string, string, string, string, string, string, string] // flattened 4x3 keys grid
}

export type AppState = {
  key: 'current-keyboard-layout-id'
  value: KeyboardLayout['id']
} | {
  key: 'theme-dark'
  value: boolean
} | {
  key: 'current-civ-group'
  value: BuildingCivGroup
}

const db = new Dexie('aegis-fsrs') as Dexie & {
  keyboardLayouts: EntityTable<KeyboardLayout, 'id'>
  appState: EntityTable<AppState, 'key'>
}
db.version(1).stores({
  keyboardLayouts: '++id,&name', // Primary key and indexed props
  appState: 'key',
})

db.on('populate', async() => {
  db.keyboardLayouts.bulkAdd(Object.entries(KeyboardLayouts).map(([name, content]) => ({ name, content, template: true })))
  db.appState.bulkAdd([
    // { key: 'theme-dark', value: window.matchMedia('(prefers-color-scheme: dark)') },
    { key: 'current-keyboard-layout-id', value: 3 }, // todo
    { key: 'current-civ-group', value: BuildingCivGroup.COMMON },
  ])
})
export { db }

// --- composable
function useDB() {
  const getAppState = async(key: AppState['key']) => {
    const current = await db.appState.get(key)
    return current?.value
  }

  const patchAppState = async(key: AppState['key'], value: AppState['value']) => {
    await db.appState.put({ key, value })
  }

  async function exportData() {
    const blob = await db.export({ prettyJson: false })
    const compressedBlob = await FileUtils.compressBlobWithGzip(blob)
    await FileUtils.downloadDexieDB(compressedBlob, `export-${Date.now()}.gz`)
  }

  async function importData() {
    const blob = await FileUtils.uploadDexieDB()
    if (blob) {
      const decompressedBlob = await FileUtils.decompressBlobWithGzip(blob)
      await db.import(decompressedBlob)
    }
  }

  return {
    getAppState,
    patchAppState,
    exportData,
    importData,
  }
}

export default useDB
