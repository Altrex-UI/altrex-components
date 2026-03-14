import { createApp, h } from 'vue'
import AltrexToastContainer from './AltrexToastContainer.vue'

let toastContainerInstance = null

function ensureToastContainer() {
  if (!toastContainerInstance) {
    const container = document.createElement('div')
    container.id = 'altrex-toast-container-root'
    document.body.appendChild(container)

    const app = createApp({
      render() {
        return h(AltrexToastContainer, {
          ref: 'toastContainer'
        })
      }
    })

    const instance = app.mount(container)
    toastContainerInstance = instance.$refs.toastContainer
  }
  return toastContainerInstance
}

const toast = {
  show(options) {
    const container = ensureToastContainer()
    return container.addToast({
      message: '',
      variant: 'info',
      duration: 3000,
      position: 'top-right',
      closable: true,
      showIcon: true,
      showProgress: false,
      ...options
    })
  },

  success(message, options = {}) {
    return this.show({
      message,
      variant: 'success',
      ...options
    })
  },

  warning(message, options = {}) {
    return this.show({
      message,
      variant: 'warning',
      ...options
    })
  },

  danger(message, options = {}) {
    return this.show({
      message,
      variant: 'danger',
      ...options
    })
  },

  error(message, options = {}) {
    return this.danger(message, options)
  },

  info(message, options = {}) {
    return this.show({
      message,
      variant: 'info',
      ...options
    })
  },

  remove(id) {
    if (toastContainerInstance) {
      toastContainerInstance.removeToast(id)
    }
  },

  clear() {
    if (toastContainerInstance) {
      toastContainerInstance.clearAll()
    }
  }
}

export default {
  install(app) {
    app.config.globalProperties.$toast = toast
    app.provide('$toast', toast)
  }
}

export { toast }
