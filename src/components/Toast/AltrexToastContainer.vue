<template>
  <Teleport to="body">
    <div
      v-for="position in positions"
      :key="position"
      class="altrex-toast-container"
      :class="`altrex-toast-container--${position}`"
    >
      <AltrexToast
        v-for="toast in getToastsByPosition(position)"
        :key="toast.id"
        v-bind="toast"
        @close="removeToast(toast.id)"
      />
    </div>
  </Teleport>
</template>

<script>
import AltrexToast from './AltrexToast.vue'

export default {
  name: 'AltrexToastContainer',
  components: {
    AltrexToast
  },
  data() {
    return {
      toasts: [],
      positions: [
        'top-left', 'top-center', 'top-right',
        'bottom-left', 'bottom-center', 'bottom-right'
      ]
    }
  },
  methods: {
    addToast(toast) {
      const id = Date.now() + Math.random()
      this.toasts.push({
        ...toast,
        id
      })
      return id
    },
    removeToast(id) {
      const index = this.toasts.findIndex(t => t.id === id)
      if (index !== -1) {
        this.toasts.splice(index, 1)
      }
    },
    getToastsByPosition(position) {
      return this.toasts.filter(toast => toast.position === position)
    },
    clearAll() {
      this.toasts = []
    }
  }
}
</script>

<style lang="stylus" scoped>
.altrex-toast-container
  position: fixed
  z-index: 9999
  display: flex
  flex-direction: column
  gap: $altrex-spacing-3
  pointer-events: none
  padding: $altrex-spacing-4

  // Top positions
  &--top-left
    top: 0
    left: 0

  &--top-center
    top: 0
    left: 50%
    transform: translateX(-50%)

  &--top-right
    top: 0
    right: 0

  // Bottom positions
  &--bottom-left
    bottom: 0
    left: 0

  &--bottom-center
    bottom: 0
    left: 50%
    transform: translateX(-50%)

  &--bottom-right
    bottom: 0
    right: 0
</style>
