import { computed, shallowRef } from 'vue'

const currentVersion = shallowRef<string | null>()
const appVersion = shallowRef<string | null>()
const ignoreNewVersion = shallowRef<boolean>(false)

function useVersion() {
  const init = async() => {
    currentVersion.value = await (await fetch(`./version?=c=${Date.now()}`)).text()
  }

  const verify = async() => {
    appVersion.value = await (await fetch(`./version?=c=${Date.now()}`)).text()
    if (!currentVersion.value && !!appVersion.value) {
      currentVersion.value = appVersion.value
      return false
    }
    return currentVersion.value !== appVersion.value
  }

  const update = () => {
    currentVersion.value = appVersion.value
    window.location.reload()
  }
  const ignore = () => {
    ignoreNewVersion.value = true
  }

  return { init, verify, update, ignore, ignoreNewVersion: computed(() => ignoreNewVersion.value), version: computed(() => currentVersion.value) }
}

export default useVersion
