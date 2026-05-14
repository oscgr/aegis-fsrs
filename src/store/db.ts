import type { EntityTable } from 'dexie'
import { Dexie } from 'dexie'
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
  ])
})
export { db }

// --- composable
function useDB() {
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
    exportData,
    importData,
  }
}

export default useDB
