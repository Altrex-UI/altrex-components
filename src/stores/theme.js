import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  // State
  const theme = ref('auto') // 'light' | 'dark' | 'auto'
  const systemPreference = ref('light')
  let mediaQueryList = null

  // Computed
  const effectiveTheme = computed(() => {
    if (theme.value === 'auto') {
      return systemPreference.value
    }
    return theme.value
  })

  const isDark = computed(() => effectiveTheme.value === 'dark')

  // Actions
  function setTheme(newTheme) {
    if (!['light', 'dark', 'auto'].includes(newTheme)) {
      console.warn(`Invalid theme value: ${newTheme}. Expected 'light', 'dark', or 'auto'.`)
      return
    }

    theme.value = newTheme
    saveToLocalStorage()
  }

  function initTheme() {
    // Load from localStorage
    const saved = loadFromLocalStorage()
    if (saved) {
      theme.value = saved
    }

    // Detect system preference
    detectSystemPreference()
  }

  function detectSystemPreference() {
    if (typeof window === 'undefined') return

    mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')

    // Set initial value
    systemPreference.value = mediaQueryList.matches ? 'dark' : 'light'

    // Listen for changes
    const handler = (e) => {
      systemPreference.value = e.matches ? 'dark' : 'light'
    }

    // Modern API
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handler)
    } else {
      // Fallback for older browsers
      mediaQueryList.addListener(handler)
    }
  }

  function saveToLocalStorage() {
    try {
      localStorage.setItem('altrex-theme-preference', theme.value)
    } catch (error) {
      console.warn('Failed to save theme preference to localStorage:', error)
    }
  }

  function loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem('altrex-theme-preference')
      if (saved && ['light', 'dark', 'auto'].includes(saved)) {
        return saved
      }
    } catch (error) {
      console.warn('Failed to load theme preference from localStorage:', error)
    }
    return null
  }

  // Watch effectiveTheme to apply to DOM
  watch(effectiveTheme, (newTheme) => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newTheme)
    }
  }, { immediate: true })

  return {
    theme,
    effectiveTheme,
    isDark,
    setTheme,
    initTheme,
  }
})
