import { computed, ref } from 'vue'
import { KeyboardLayouts } from '@/constants/keyboards.ts'
import useDB from '@/store/db.ts'
import 'dexie-export-import'

// todo - use pinia
const cachedCurrentKeyboardLayoutName = ref<string>()

function useKeyboardLayoutsStore() {
  const { getAppState, patchAppState } = useDB()
  // --- My current layout
  const getCurrentKeyboardLayout = async() => {
    const current = await getAppState('current-keyboard-layout')
    if (!current)
      return
    cachedCurrentKeyboardLayoutName.value = current as string
  }

  const patchCurrentKeyboardLayout = async(name: string) => {
    await patchAppState('current-keyboard-layout', name)
    cachedCurrentKeyboardLayoutName.value = name
  }

  return {
    currentKeyboardLayout: computed(() => KeyboardLayouts.find(layout => layout.name === cachedCurrentKeyboardLayoutName.value)),
    getCurrentKeyboardLayout,
    patchCurrentKeyboardLayout,
  }
}

export default useKeyboardLayoutsStore
