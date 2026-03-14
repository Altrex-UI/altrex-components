import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './views/router'
import AltrexUI from './AltrexUI.vue'
import { useThemeStore } from './stores/theme'
import ToastPlugin from './components/Toast/toast-plugin'
import '@altrex-ui/styling/tokens.css'

const app = createApp(AltrexUI)

const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(ToastPlugin)

// Initialize theme store after Pinia is set up
const themeStore = useThemeStore()
themeStore.initTheme()

app.mount('#app')

// Development-only: Touch Target Validator
// Validates WCAG 2.1 Level AAA touch targets (44x44px minimum)
if (import.meta.env.DEV) {
  import('./utils/touch-target-validator.js').then(({ setupAutoValidation }) => {
    setupAutoValidation(router, {
      delay: 1500, // Wait for components to render
      minSize: 44,  // WCAG 2.1 Level AAA
      logResults: true,
    })
  })
}
