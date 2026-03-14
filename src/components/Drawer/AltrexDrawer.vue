<template>
  <Teleport to="body">
    <Transition :name="`altrex-drawer-slide-${position}`">
      <div
        v-if="open"
        class="altrex-drawer-overlay"
        :style="{ backgroundColor: overlayColor }"
        @click="handleOverlayClick"
        @keydown.esc="handleEscKey"
      >
        <div
          class="altrex-drawer"
          :class="[
            `altrex-drawer--${position}`,
            `altrex-drawer--${size}`,
          ]"
          :style="themeVariables"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="ariaLabelledby"
          :aria-describedby="ariaDescribedby"
          @click.stop
        >
          <!-- Close button -->
          <button
            v-if="showClose"
            class="altrex-drawer__close"
            type="button"
            aria-label="Close drawer"
            @click="handleClose"
          >
            <AltrexIcon icon="generic-x" size="m" />
          </button>

          <!-- Header -->
          <div v-if="$slots.header || title" class="altrex-drawer__header">
            <slot name="header">
              <h2 :id="ariaLabelledby" class="altrex-drawer__title">
                {{ title }}
              </h2>
            </slot>
          </div>

          <!-- Body -->
          <div :id="ariaDescribedby" class="altrex-drawer__body">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="altrex-drawer__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import { nextTick } from 'vue'
import AltrexIcon from '../Icon/AltrexIcon.vue'
import styling from '@/utils/styling'

export default {
  name: 'AltrexDrawer',
  components: {
    AltrexIcon
  },
  mixins: [styling],
  props: {
    /**
     * Controls drawer visibility (v-model)
     */
    open: {
      type: Boolean,
      default: false
    },
    /**
     * Drawer title text
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * Position of drawer slide-in
     */
    position: {
      type: String,
      default: 'right',
      validator: (value) => ['left', 'right', 'top', 'bottom'].includes(value)
    },
    /**
     * Drawer size variant
     */
    size: {
      type: String,
      default: 'm',
      validator: (value) => ['s', 'm', 'l', 'xl'].includes(value)
    },
    /**
     * Show close button
     */
    showClose: {
      type: Boolean,
      default: true
    },
    /**
     * Prevent closing on backdrop click
     */
    closeOnBackdrop: {
      type: Boolean,
      default: true
    },
    /**
     * Prevent closing on escape key
     */
    closeOnEscape: {
      type: Boolean,
      default: true
    },
    /**
     * Lock body scroll when drawer is open
     */
    lockBodyScroll: {
      type: Boolean,
      default: true
    },
    /**
     * Backdrop opacity (0-1)
     */
    backdropOpacity: {
      type: Number,
      default: 0.5,
      validator: (value) => value >= 0 && value <= 1
    },
    /**
     * ARIA labelledby attribute
     */
    ariaLabelledby: {
      type: String,
      default: 'drawer-title'
    },
    /**
     * ARIA describedby attribute
     */
    ariaDescribedby: {
      type: String,
      default: 'drawer-body'
    }
  },
  emits: ['update:open', 'close', 'open', 'afterOpen', 'afterClose'],
  data() {
    return {
      themePrefix: 'altrex-drawer'
    }
  },
  computed: {
    overlayColor() {
      return `rgba(0, 0, 0, ${this.backdropOpacity})`
    }
  },
  watch: {
    open(newVal) {
      if (newVal) {
        this.handleOpen()
      } else {
        this.handleDrawerClose()
      }
    }
  },
  mounted() {
    if (this.open) {
      this.handleOpen()
    }
  },
  beforeUnmount() {
    this.handleDrawerClose()
  },
  methods: {
    handleOpen() {
      nextTick(() => {
        if (this.lockBodyScroll) {
          document.body.style.overflow = 'hidden'
        }
        this.$emit('open')
        // Emit afterOpen after animation completes (300ms)
        setTimeout(() => {
          this.$emit('afterOpen')
        }, 300)
      })
    },
    handleDrawerClose() {
      if (this.lockBodyScroll) {
        document.body.style.overflow = ''
      }
      // Emit afterClose after animation completes (300ms)
      setTimeout(() => {
        this.$emit('afterClose')
      }, 300)
    },
    handleClose() {
      this.$emit('update:open', false)
      this.$emit('close')
    },
    handleOverlayClick() {
      if (this.closeOnBackdrop) {
        this.handleClose()
      }
    },
    handleEscKey(event) {
      if (this.closeOnEscape && this.open) {
        event.preventDefault()
        this.handleClose()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
// ========================================
// OVERLAY
// ========================================
.altrex-drawer-overlay
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 1100  // Above modals (1000)
  display: flex
  overflow: hidden

  [data-theme="dark"] &
    background-color: var(--altrex-colors-dark-bg-overlay)

// ========================================
// DRAWER BASE
// ========================================
.altrex-drawer
  position: fixed
  background: var(--altrex-drawer-background, var(--altrex-colors-neutral-50))
  box-shadow: var(--altrex-drawer-shadow, $altrex-shadows-xl)
  display: flex
  flex-direction: column
  overflow-y: auto
  z-index: 1101

  [data-theme="dark"] &
    background: var(--altrex-drawer-background, var(--altrex-colors-dark-bg-elevated))
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5)

// ========================================
// POSITION VARIANTS
// ========================================
.altrex-drawer--left,
.altrex-drawer--right
  top: 0
  bottom: 0

.altrex-drawer--top,
.altrex-drawer--bottom
  left: 0
  right: 0

.altrex-drawer--left
  left: 0

.altrex-drawer--right
  right: 0

.altrex-drawer--top
  top: 0

.altrex-drawer--bottom
  bottom: 0

// ========================================
// SIZE VARIANTS
// ========================================

// Left/Right Drawers - Width sizing
.altrex-drawer--left,
.altrex-drawer--right
  // Mobile: nearly full-width
  width: 90vw

  +above('md')
    // Desktop: fixed widths
    &.altrex-drawer--s
      width: 320px

    &.altrex-drawer--m
      width: 400px

    &.altrex-drawer--l
      width: 600px

    &.altrex-drawer--xl
      width: 800px

// Top/Bottom Drawers - Height sizing
.altrex-drawer--top,
.altrex-drawer--bottom
  // Mobile: nearly full-height
  height: 90vh

  +above('md')
    // Desktop: fixed heights
    &.altrex-drawer--s
      height: 320px

    &.altrex-drawer--m
      height: 400px

    &.altrex-drawer--l
      height: 600px

    &.altrex-drawer--xl
      height: 800px

// ========================================
// CLOSE BUTTON
// ========================================
.altrex-drawer__close
  position: absolute
  z-index: 10
  display: flex
  align-items: center
  justify-content: center
  padding: 0
  background: transparent
  border: none
  border-radius: $altrex-borderRadius-default
  color: var(--altrex-drawer-close-color, var(--altrex-colors-neutral-500))
  cursor: pointer
  transition: all 0.2s ease

  // Mobile: large touch target (comfortable)
  width: 48px
  height: 48px
  top: $altrex-spacing-2
  right: $altrex-spacing-2

  // Desktop: more compact
  +above('md')
    width: 32px
    height: 32px
    top: $altrex-spacing-4
    right: $altrex-spacing-4

  // Icon visual stays 16px
  :deep(.altrex-icon)
    altrex-icon-s()

  &:hover
    background: var(--altrex-drawer-close-background-hover, var(--altrex-colors-neutral-100))
    color: var(--altrex-drawer-close-color-hover, var(--altrex-colors-neutral-700))

    [data-theme="dark"] &
      background: var(--altrex-colors-dark-bg-hover)
      color: var(--altrex-colors-dark-text-primary)

  &:focus
    outline: 2px solid var(--altrex-colors-primary-500)
    outline-offset: 2px

  +touch-device()
    &:active
      transform: scale(0.95)

// ========================================
// HEADER
// ========================================
.altrex-drawer__header
  flex-shrink: 0
  border-bottom: 1px solid var(--altrex-drawer-border-color, var(--altrex-colors-neutral-200))

  // Mobile: comfortable padding
  padding: $altrex-spacing-4

  // Desktop: more spacious
  +above('md')
    padding: $altrex-spacing-6

  [data-theme="dark"] &
    border-bottom-color: var(--altrex-colors-dark-border-subtle)

.altrex-drawer__title
  margin: 0
  font-weight: $altrex-fontWeight-semibold
  color: var(--altrex-drawer-title-color, var(--altrex-colors-neutral-900))

  // Mobile: readable size
  font-size: $altrex-fontSize-lg

  // Desktop: larger
  +above('md')
    font-size: $altrex-fontSize-xl

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-primary)

// ========================================
// BODY
// ========================================
.altrex-drawer__body
  flex: 1
  overflow-y: auto
  color: var(--altrex-drawer-body-color, var(--altrex-colors-neutral-700))

  // Mobile: comfortable padding
  padding: $altrex-spacing-4

  // Desktop: more spacious
  +above('md')
    padding: $altrex-spacing-6

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-secondary)

// ========================================
// FOOTER
// ========================================
.altrex-drawer__footer
  flex-shrink: 0
  border-top: 1px solid var(--altrex-drawer-border-color, var(--altrex-colors-neutral-200))
  display: flex
  gap: $altrex-spacing-3
  justify-content: flex-end

  // Mobile: comfortable padding
  padding: $altrex-spacing-4

  // Desktop: more spacious
  +above('md')
    padding: $altrex-spacing-6

  [data-theme="dark"] &
    border-top-color: var(--altrex-colors-dark-border-subtle)

// ========================================
// SLIDE ANIMATIONS
// ========================================

// Slide from LEFT
.altrex-drawer-slide-left-enter-active,
.altrex-drawer-slide-left-leave-active
  transition: transform 0.3s ease-out, opacity 0.3s ease-out

.altrex-drawer-slide-left-enter-from
  .altrex-drawer
    transform: translateX(-100%)

.altrex-drawer-slide-left-leave-to
  .altrex-drawer
    transform: translateX(-100%)

// Slide from RIGHT
.altrex-drawer-slide-right-enter-active,
.altrex-drawer-slide-right-leave-active
  transition: transform 0.3s ease-out, opacity 0.3s ease-out

.altrex-drawer-slide-right-enter-from
  .altrex-drawer
    transform: translateX(100%)

.altrex-drawer-slide-right-leave-to
  .altrex-drawer
    transform: translateX(100%)

// Slide from TOP
.altrex-drawer-slide-top-enter-active,
.altrex-drawer-slide-top-leave-active
  transition: transform 0.3s ease-out, opacity 0.3s ease-out

.altrex-drawer-slide-top-enter-from
  .altrex-drawer
    transform: translateY(-100%)

.altrex-drawer-slide-top-leave-to
  .altrex-drawer
    transform: translateY(-100%)

// Slide from BOTTOM
.altrex-drawer-slide-bottom-enter-active,
.altrex-drawer-slide-bottom-leave-active
  transition: transform 0.3s ease-out, opacity 0.3s ease-out

.altrex-drawer-slide-bottom-enter-from
  .altrex-drawer
    transform: translateY(100%)

.altrex-drawer-slide-bottom-leave-to
  .altrex-drawer
    transform: translateY(100%)

// Overlay fade
.altrex-drawer-slide-left-enter-from,
.altrex-drawer-slide-left-leave-to,
.altrex-drawer-slide-right-enter-from,
.altrex-drawer-slide-right-leave-to,
.altrex-drawer-slide-top-enter-from,
.altrex-drawer-slide-top-leave-to,
.altrex-drawer-slide-bottom-enter-from,
.altrex-drawer-slide-bottom-leave-to
  opacity: 0
</style>
