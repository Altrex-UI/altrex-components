<template>
  <Transition :name="transitionName">
    <div
      v-if="visible"
      class="altrex-toast"
      :class="[
        `altrex-toast--${variant}`,
        `altrex-toast--${position}`
      ]"
      role="alert"
      :aria-live="variant === 'danger' ? 'assertive' : 'polite'"
      @mouseenter="pauseTimer"
      @mouseleave="resumeTimer"
    >
      <div class="altrex-toast__content">
        <AltrexIcon
          v-if="showIcon"
          :icon="iconName"
          size="m"
          class="altrex-toast__icon"
        />
        <div class="altrex-toast__message">
          <div v-if="title" class="altrex-toast__title">{{ title }}</div>
          <div class="altrex-toast__text">{{ message }}</div>
        </div>
        <button
          v-if="closable"
          class="altrex-toast__close"
          type="button"
          aria-label="Close"
          @click="close"
        >
          <AltrexIcon icon="generic-x" size="s" />
        </button>
      </div>
      <div v-if="showProgress && duration" class="altrex-toast__progress">
        <div
          class="altrex-toast__progress-bar"
          :style="{ width: progressWidth + '%' }"
        />
      </div>
    </div>
  </Transition>
</template>

<script>
import AltrexIcon from '../Icon/AltrexIcon.vue'

export default {
  name: 'AltrexToast',
  components: {
    AltrexIcon
  },
  props: {
    message: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'info',
      validator: (value) => ['success', 'warning', 'danger', 'info'].includes(value)
    },
    duration: {
      type: Number,
      default: 3000
    },
    position: {
      type: String,
      default: 'top-right',
      validator: (value) => [
        'top-left', 'top-center', 'top-right',
        'bottom-left', 'bottom-center', 'bottom-right'
      ].includes(value)
    },
    closable: {
      type: Boolean,
      default: true
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    showProgress: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  data() {
    return {
      visible: false,
      timer: null,
      progressTimer: null,
      progressWidth: 100,
      isPaused: false,
      startTime: null,
      remainingTime: null
    }
  },
  computed: {
    iconName() {
      const icons = {
        success: 'generic-check-circle',
        warning: 'generic-alert-triangle',
        danger: 'generic-x-circle',
        info: 'generic-info'
      }
      return icons[this.variant]
    },
    transitionName() {
      if (this.position.includes('top')) {
        return 'altrex-toast-slide-down'
      } else {
        return 'altrex-toast-slide-up'
      }
    }
  },
  mounted() {
    this.visible = true
    if (this.duration > 0) {
      this.startTimer()
      if (this.showProgress) {
        this.startProgress()
      }
    }
  },
  beforeUnmount() {
    this.clearTimers()
  },
  methods: {
    startTimer() {
      this.startTime = Date.now()
      this.remainingTime = this.duration
      this.timer = setTimeout(() => {
        this.close()
      }, this.duration)
    },
    startProgress() {
      const startTime = Date.now()
      const updateProgress = () => {
        if (!this.isPaused && this.visible) {
          const elapsed = Date.now() - startTime
          this.progressWidth = Math.max(0, 100 - (elapsed / this.duration) * 100)
          if (this.progressWidth > 0) {
            this.progressTimer = requestAnimationFrame(updateProgress)
          }
        }
      }
      updateProgress()
    },
    pauseTimer() {
      if (this.duration > 0 && !this.isPaused) {
        this.isPaused = true
        clearTimeout(this.timer)
        if (this.progressTimer) {
          cancelAnimationFrame(this.progressTimer)
        }
        this.remainingTime = this.remainingTime - (Date.now() - this.startTime)
      }
    },
    resumeTimer() {
      if (this.duration > 0 && this.isPaused) {
        this.isPaused = false
        this.startTime = Date.now()
        this.timer = setTimeout(() => {
          this.close()
        }, this.remainingTime)
        if (this.showProgress) {
          const updateProgress = () => {
            if (!this.isPaused && this.visible) {
              const elapsed = Date.now() - this.startTime
              const totalElapsed = this.duration - this.remainingTime + elapsed
              this.progressWidth = Math.max(0, 100 - (totalElapsed / this.duration) * 100)
              if (this.progressWidth > 0) {
                this.progressTimer = requestAnimationFrame(updateProgress)
              }
            }
          }
          updateProgress()
        }
      }
    },
    clearTimers() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (this.progressTimer) {
        cancelAnimationFrame(this.progressTimer)
      }
    },
    close() {
      this.visible = false
      this.clearTimers()
      setTimeout(() => {
        this.$emit('close')
      }, 300)
    }
  }
}
</script>

<style lang="stylus" scoped>
.altrex-toast
  position: relative
  background: var(--altrex-colors-neutral-50)
  border-radius: $altrex-borderRadius-lg
  box-shadow: $altrex-shadows-lg
  overflow: hidden
  pointer-events: auto

  // Mobile-first: full width with small margins
  width: calc(100vw - $altrex-spacing-4)
  min-width: 0

  // Desktop: constrained max-width
  +above('md')
    min-width: 300px;
    max-width: 500px;
    width: auto;

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-elevated)
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5)

  // Variants
  &--success
    border-left: 4px solid var(--altrex-colors-success-500)

    .altrex-toast__icon
      color: var(--altrex-colors-success-500)

    .altrex-toast__progress-bar
      background: var(--altrex-colors-success-500)

  &--warning
    border-left: 4px solid var(--altrex-colors-warning-500)

    .altrex-toast__icon
      color: var(--altrex-colors-warning-500)

    .altrex-toast__progress-bar
      background: var(--altrex-colors-warning-500)

  &--danger
    border-left: 4px solid var(--altrex-colors-danger-500)

    .altrex-toast__icon
      color: var(--altrex-colors-danger-500)

    .altrex-toast__progress-bar
      background: var(--altrex-colors-danger-500)

  &--info
    border-left: 4px solid var(--altrex-colors-info-500)

    .altrex-toast__icon
      color: var(--altrex-colors-info-500)

    .altrex-toast__progress-bar
      background: var(--altrex-colors-info-500)

.altrex-toast__content
  display: flex
  align-items: flex-start
  gap: $altrex-spacing-3
  padding: $altrex-spacing-4

.altrex-toast__icon
  flex-shrink: 0
  margin-top: 2px

.altrex-toast__message
  flex: 1
  min-width: 0

.altrex-toast__title
  font-size: $altrex-fontSize-base
  font-weight: $altrex-fontWeight-semibold
  color: var(--altrex-colors-neutral-900)
  margin-bottom: $altrex-spacing-1

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-primary)

.altrex-toast__text
  font-size: $altrex-fontSize-sm
  color: var(--altrex-colors-neutral-700)
  line-height: 1.5

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-secondary)

.altrex-toast__close
  flex-shrink: 0
  background: transparent
  border: none
  border-radius: $altrex-borderRadius-default
  color: var(--altrex-colors-neutral-500)
  cursor: pointer
  transition: all 0.2s ease

  // Mobile: touch-optimized (44x44px)
  touch-target('minimum')

  // Desktop: smaller (32x32px)
  +above('md')
    width: 32px;
    height: 32px;
    min-width: auto;
    min-height: auto;

  // Icon visual stays 16px
  :deep(.altrex-icon)
    altrex-icon-s()

  &:hover
    background: var(--altrex-colors-neutral-100)
    color: var(--altrex-colors-neutral-700)

    [data-theme="dark"] &
      background: var(--altrex-colors-dark-bg-hover)
      color: var(--altrex-colors-dark-text-secondary)

  &:focus
    outline: 2px solid var(--altrex-colors-primary-500)
    outline-offset: 2px

.altrex-toast__progress
  position: absolute
  bottom: 0
  left: 0
  right: 0
  height: 4px
  background: var(--altrex-colors-neutral-200)

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-border-subtle)

.altrex-toast__progress-bar
  height: 100%
  transition: width 0.1s linear

// Transitions
.altrex-toast-slide-down-enter-active,
.altrex-toast-slide-down-leave-active
  transition: all 0.3s ease

.altrex-toast-slide-down-enter-from
  opacity: 0
  transform: translateY(-100%)

.altrex-toast-slide-down-leave-to
  opacity: 0
  transform: translateX(100%)

.altrex-toast-slide-up-enter-active,
.altrex-toast-slide-up-leave-active
  transition: all 0.3s ease

.altrex-toast-slide-up-enter-from
  opacity: 0
  transform: translateY(100%)

.altrex-toast-slide-up-leave-to
  opacity: 0
  transform: translateX(100%)
</style>
