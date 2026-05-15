import type { KeyboardLayout } from '@/constants/keyboards.ts'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { KeyboardLayouts } from '@/constants/keyboards.ts'
import useDB from '@/store/db.ts'

const useKeyboardLayoutsStore = defineStore('keyboards', () => {
  const cachedCurrentKeyboardLayoutName = ref<string>()
  const cachedCustomKeyboardLayout = ref<KeyboardLayout['content']>()

  const { getAppState, patchAppState } = useDB()

  // --- My current layout
  const cacheCurrentKeyboardLayout = async() => {
    const current = await getAppState('current-keyboard-layout')
    if (!current)
      return
    cachedCurrentKeyboardLayoutName.value = current as string
  }
  const cacheCustomKeyboardLayout = async() => {
    const current = await getAppState('custom-keyboard-layout')
    if (!current)
      return
    cachedCustomKeyboardLayout.value = current as KeyboardLayout['content']
  }

  const patchCurrentKeyboardLayout = async(name: string) => {
    await patchAppState('current-keyboard-layout', name)
    cachedCurrentKeyboardLayoutName.value = name
  }

  const patchCustomKeyboardLayout = async(content: KeyboardLayout['content']) => {
    await patchAppState('custom-keyboard-layout', content)
    cachedCustomKeyboardLayout.value = content
  }

  return {
    currentKeyboardLayout: computed(() => KeyboardLayouts.find(layout => layout.name === cachedCurrentKeyboardLayoutName.value)),
    customKeyboardLayout: computed(() => cachedCustomKeyboardLayout.value),
    cacheCurrentKeyboardLayout,
    cacheCustomKeyboardLayout,
    patchCurrentKeyboardLayout,
    patchCustomKeyboardLayout,
  }
})

export default useKeyboardLayoutsStore
