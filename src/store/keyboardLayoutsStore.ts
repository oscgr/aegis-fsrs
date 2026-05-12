import { db } from '@/store/db.ts'
import 'dexie-export-import'

interface KeyboardLayout {
  id: number
  name: string // display name
  content: [string, string, string, string, string, string, string, string, string, string, string, string] // flattened 4x3 keys grid
}

function useKeyboardLayoutsStore() {
  const addKeyboardLayout = async(keyboardLayout: Omit<KeyboardLayout, 'id'>) => {
    const createdKeyboardLayoutId = await db.keyboardLayouts.add(keyboardLayout)
    const createdKeyboardLayout = await db.keyboardLayouts.get(createdKeyboardLayoutId)
    if (!createdKeyboardLayout) {
      throw new Error('Not found')
    }
    console.debug(`[db] created layout (id=${createdKeyboardLayoutId})`)
    return createdKeyboardLayout
  }

  const patchKeyboardName = async(keyboardLayoutId: number, name: KeyboardLayout['name']) => {
    await db.keyboardLayouts.update(keyboardLayoutId, { name })
    const updatedKeyboardLayout = await db.keyboardLayouts.get(keyboardLayoutId)
    if (!updatedKeyboardLayout) {
      throw new Error('Not found')
    }
    console.debug(`[db] patched sound (id=${keyboardLayoutId}, name=${JSON.stringify(name)})`)
    return updatedKeyboardLayout
  }

  const patchKeyboardLayout = async(keyboardLayoutId: number, newLayout: KeyboardLayout['content']) => {
    if (!newLayout)
      return
    const keyboardLayoutToUpdate = await db.keyboardLayouts.get(keyboardLayoutId)
    if (!keyboardLayoutToUpdate || !keyboardLayoutToUpdate.content) {
      throw new Error('Not found')
    }

    await db.keyboardLayouts.update(keyboardLayoutId, {
      content: newLayout,
    })
    const updatedKeyboardLayout = await db.keyboardLayouts.get(keyboardLayoutId)
    if (!updatedKeyboardLayout) {
      throw new Error('Not found')
    }
    console.debug(`[db] patched layout preferences (id=${keyboardLayoutId}, preferences=${JSON.stringify(newLayout)})`)
    return updatedKeyboardLayout
  }

  const deleteKeyboardLayout = async(keyboardLayoutId: number) => {
    await db.keyboardLayouts.delete(keyboardLayoutId)
    console.debug(`[db] deleted keyboardLayout (id=${keyboardLayoutId})`)
  }

  return {
    addKeyboardLayout,
    patchKeyboardName,
    patchKeyboardLayout,
    deleteKeyboardLayout,
  }
}

export default useKeyboardLayoutsStore
