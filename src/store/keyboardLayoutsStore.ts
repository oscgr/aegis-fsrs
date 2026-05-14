import type { KeyboardLayout } from '@/store/db.ts'
import { deburr, trim } from 'es-toolkit'
import { ref, shallowReadonly } from 'vue'
import useDB, { db } from '@/store/db.ts'
import 'dexie-export-import'

const cachedCurrentKeyboardLayout = ref<KeyboardLayout>()

function useKeyboardLayoutsStore() {
  const { getAppState, patchAppState } = useDB()
  // --- My current layout
  const getCurrentKeyboardLayout = async() => {
    const current = await getAppState('current-keyboard-layout-id')
    if (!current)
      return
    cachedCurrentKeyboardLayout.value = await db.keyboardLayouts.get(current as number)
  }

  const patchCurrentKeyboardLayout = async(id: number) => {
    await patchAppState('current-keyboard-layout-id', id)
    cachedCurrentKeyboardLayout.value = await db.keyboardLayouts.get(id)
  }

  // --- Search

  const searchKeyboardLayouts = async(query?: string) => {
    const q = deburr(trim(query || ''))
    if (q !== '')
      return db.keyboardLayouts.where({ name: q }).toArray()
    else
      return db.keyboardLayouts.toArray()
  }

  // --- CRUD

  const addKeyboardLayout = async(keyboardLayout: Omit<KeyboardLayout, 'id'>) => {
    const createdKeyboardLayoutId = await db.keyboardLayouts.add({ ...keyboardLayout, template: false })
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
    currentKeyboardLayout: shallowReadonly(cachedCurrentKeyboardLayout),
    getCurrentKeyboardLayout,
    patchCurrentKeyboardLayout,
    searchKeyboardLayouts,
    addKeyboardLayout,
    patchKeyboardName,
    patchKeyboardLayout,
    deleteKeyboardLayout,
  }
}

export default useKeyboardLayoutsStore
