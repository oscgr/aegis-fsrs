import type { EntityTable } from 'dexie'
import type { KeyboardLayout } from '@/constants/keyboards.ts'
import { Dexie } from 'dexie'
import { BuildingCivGroup } from '@/constants/buildings.ts'
import FileUtils from '@/utils/FileUtils.ts'
import 'dexie-export-import'

export type AppState = {
  key: 'current-keyboard-layout'
  value: KeyboardLayout['name']
} | {
  key: 'current-civ-group'
  value: BuildingCivGroup
} | {
  key: 'custom-keyboard-layout'
  value: KeyboardLayout['content']
}

const db = new Dexie('aegis-fsrs') as Dexie & {
  appState: EntityTable<AppState, 'key'>
}
db.version(1).stores({
  keyboardLayouts: '++id,&name', // Primary key and indexed props
  appState: 'key',
})

db.on('populate', async() => {
  // db.keyboardLayouts.bulkAdd(Object.entries(KeyboardLayouts).map(([name, content]) => ({ name, content, template: true })))
  db.appState.bulkAdd([
    { key: 'current-keyboard-layout', value: 'QWERTY' }, // todo - ask usr on first connection
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
