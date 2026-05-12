import type { EntityTable } from 'dexie'
import { Dexie } from 'dexie'
import FileUtils from '@/utils/fileUtils.ts'
import 'dexie-export-import'

interface Sound {
  id: number
  name: string // display name
  content: string // base64 audio file
  preferences: {
    loop?: boolean
    mute?: boolean
    rate?: number
    volume?: number
  }
}

const db = new Dexie('aegis') as Dexie & {
  sounds: EntityTable<Sound, 'id'>
}
db.version(1).stores({
  sounds: '++id,&name', // Primary key and indexed props
})

export type { Sound }
export { db }

// --- composable

function useDB() {
  const addSound = async(sound: Omit<Sound, 'id'>) => {
    const createdSoundId = await db.sounds.add(sound)
    const createdSound = await db.sounds.get(createdSoundId)
    if (!createdSound) {
      throw new Error('Not found')
    }
    console.debug(`[db] created sound (id=${createdSoundId})`)
    return createdSound
  }

  const patchSound = async(soundId: number, changes: Partial<Omit<Sound, 'id'>>) => {
    await db.sounds.update(soundId, changes)
    const updatedSound = await db.sounds.get(soundId)
    if (!updatedSound) {
      throw new Error('Not found')
    }
    console.debug(`[db] patched sound (id=${soundId}, preferences=${JSON.stringify(changes)})`)
    return updatedSound
  }

  const patchSoundPreferences = async(soundId: number, changes: Partial<Sound['preferences']>) => {
    const soundToUpdate = await db.sounds.get(soundId)
    if (!soundToUpdate || !soundToUpdate.preferences) {
      throw new Error('Not found')
    }

    await db.sounds.update(soundId, {
      preferences: {
        ...soundToUpdate?.preferences,
        ...changes,
      },
    })
    const updatedSound = await db.sounds.get(soundId)
    if (!updatedSound) {
      throw new Error('Not found')
    }
    console.debug(`[db] patched sound preferences (id=${soundId}, preferences=${JSON.stringify(changes)})`)
    return updatedSound
  }

  const deleteSound = async(soundId: number) => {
    await db.sounds.delete(soundId)
    console.debug(`[db] deleted sound (id=${soundId})`)
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
    addSound,
    patchSound,
    deleteSound,
    patchSoundPreferences,
    exportData,
    importData,
  }
}

export default useDB
