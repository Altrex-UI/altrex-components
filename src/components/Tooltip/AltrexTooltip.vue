<template>
  <div
    ref="tooltipWrapper"
    class="altrex-tooltip"
    :style="themeVariables"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @focusin="handleFocusIn"
    @focusout="handleFocusOut"
    @click="handleClick"
  >
    <!-- Trigger slot -->
    <div
      ref="trigger"
      class="altrex-tooltip__trigger"
      :aria-describedby="isVisible ? tooltipId : undefined"
    >
      <slot />
    </div>

    <!-- Tooltip content (teleported to body) -->
    <Teleport to="body">
      <Transition name="altrex-tooltip-fade">
        <div
          v-if="isVisible"
          :id="tooltipId"
          ref="tooltip"
          class="altrex-tooltip__content"
          :class="contentClasses"
          :style="tooltipStyle"
          role="tooltip"
          @mouseenter="handleTooltipMouseEnter"
          @mouseleave="handleTooltipMouseLeave"
        >
          <div class="altrex-tooltip__text">
            <slot name="content">
              {{ content }}
            </slot>
          </div>
          <div
            v-if="showArrow"
            class="altrex-tooltip__arrow"
            :style="arrowStyle"
          ></div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script>
import styling from '@/utils/styling'

export default {
  name: 'AltrexTooltip',
  mixins: [styling],
  props: {
    /**
     * Tooltip text content
     */
    content: {
      type: String,
      default: ''
    },
    /**
     * Placement: 'top', 'right', 'bottom', 'left'
     */
    placement: {
      type: String,
      default: 'top',
      validator: (value) => ['top', 'right', 'bottom', 'left'].includes(value)
    },
    /**
     * Delay before showing tooltip (ms)
     */
    delay: {
      type: Number,
      default: 200
    },
    /**
     * Max width of tooltip
     */
    maxWidth: {
      type: String,
      default: '280px'
    },
    /**
     * Theme variant: 'dark' or 'light'
     */
    theme: {
      type: String,
      default: 'dark',
      validator: (value) => ['dark', 'light'].includes(value)
    },
    /**
     * Show arrow indicator
     */
    showArrow: {
      type: Boolean,
      default: true
    },
    /**
     * Disable tooltip
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Trigger method: 'hover', 'click', 'focus', 'manual'
     */
    trigger: {
      type: String,
      default: 'hover',
      validator: (value) => ['hover', 'click', 'focus', 'manual'].includes(value)
    },
    /**
     * Manually control visibility (for trigger="manual")
     */
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      themePrefix: 'altrex-tooltip',
      isVisible: false,
      showDelayTimer: null,
      hideDelayTimer: null,
      position: {
        top: 0,
        left: 0
      },
      actualPlacement: this.placement,
      isTouchDevice: false,
      isHoveringTooltip: false
    }
  },
  computed: {
    tooltipId() {
      return `altrex-tooltip-${this._uid}`
    },
    contentClasses() {
      return [
        `altrex-tooltip__content--${this.theme}`,
        `altrex-tooltip__content--${this.actualPlacement}`
      ]
    },
    tooltipStyle() {
      return {
        top: `${this.position.top}px`,
        left: `${this.position.left}px`,
        maxWidth: this.maxWidth
      }
    },
    arrowStyle() {
      const size = 8
      const offset = size / 2

      const styles = {
        top: {
          bottom: `-${offset}px`,
          left: '50%',
          transform: 'translateX(-50%)'
        },
        bottom: {
          top: `-${offset}px`,
          left: '50%',
          transform: 'translateX(-50%)'
        },
        left: {
          right: `-${offset}px`,
          top: '50%',
          transform: 'translateY(-50%)'
        },
        right: {
          left: `-${offset}px`,
          top: '50%',
          transform: 'translateY(-50%)'
        }
      }

      return styles[this.actualPlacement] || {}
    }
  },
  watch: {
    visible(newVal) {
      if (this.trigger === 'manual') {
        if (newVal) {
          this.show()
        } else {
          this.hide()
        }
      }
    }
  },
  mounted() {
    // Detect touch device
    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  },
  beforeUnmount() {
    this.clearTimers()
  },
  methods: {
    handleMouseEnter() {
      if (this.disabled || this.trigger !== 'hover' || this.isTouchDevice) return
      this.showWithDelay()
    },
    handleMouseLeave() {
      if (this.disabled || this.trigger !== 'hover' || this.isTouchDevice) return
      if (!this.isHoveringTooltip) {
        this.hideWithDelay()
      }
    },
    handleTooltipMouseEnter() {
      if (this.disabled || this.trigger !== 'hover') return
      this.isHoveringTooltip = true
      this.clearTimers()
    },
    handleTooltipMouseLeave() {
      if (this.disabled || this.trigger !== 'hover') return
      this.isHoveringTooltip = false
      this.hideWithDelay()
    },
    handleFocusIn() {
      if (this.disabled || (this.trigger !== 'focus' && this.trigger !== 'hover')) return
      this.showWithDelay()
    },
    handleFocusOut() {
      if (this.disabled || (this.trigger !== 'focus' && this.trigger !== 'hover')) return
      this.hideWithDelay()
    },
    handleClick() {
      if (this.disabled) return

      // On touch devices or when trigger is 'click', toggle on click
      if (this.isTouchDevice || this.trigger === 'click') {
        if (this.isVisible) {
          this.hide()
        } else {
          this.show()
        }
      }
    },
    showWithDelay() {
      this.clearTimers()
      this.showDelayTimer = setTimeout(() => {
        this.show()
      }, this.delay)
    },
    hideWithDelay() {
      this.clearTimers()
      this.hideDelayTimer = setTimeout(() => {
        this.hide()
      }, 100)
    },
    show() {
      if (this.disabled || this.isVisible) return
      this.clearTimers()
      this.isVisible = true
      this.$nextTick(() => {
        this.updatePosition()
        this.$emit('show')
      })
    },
    hide() {
      if (!this.isVisible) return
      this.clearTimers()
      this.isVisible = false
      this.isHoveringTooltip = false
      this.$emit('hide')
    },
    clearTimers() {
      if (this.showDelayTimer) {
        clearTimeout(this.showDelayTimer)
        this.showDelayTimer = null
      }
      if (this.hideDelayTimer) {
        clearTimeout(this.hideDelayTimer)
        this.hideDelayTimer = null
      }
    },
    updatePosition() {
      if (!this.$refs.trigger || !this.$refs.tooltip) return

      const triggerRect = this.$refs.trigger.getBoundingClientRect()
      const tooltipRect = this.$refs.tooltip.getBoundingClientRect()
      const gap = 8 // Space between trigger and tooltip
      const arrowSize = this.showArrow ? 8 : 0

      let placement = this.placement
      let top = 0
      let left = 0

      // Calculate position based on placement
      switch (placement) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - gap - arrowSize
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
          break
        case 'bottom':
          top = triggerRect.bottom + gap + arrowSize
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
          break
        case 'left':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
          left = triggerRect.left - tooltipRect.width - gap - arrowSize
          break
        case 'right':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
          left = triggerRect.right + gap + arrowSize
          break
      }

      // Check if tooltip goes off-screen and flip if needed
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      }

      // Flip vertically if needed
      if (placement === 'top' && top < 0) {
        placement = 'bottom'
        top = triggerRect.bottom + gap + arrowSize
      } else if (placement === 'bottom' && top + tooltipRect.height > viewport.height) {
        placement = 'top'
        top = triggerRect.top - tooltipRect.height - gap - arrowSize
      }

      // Flip horizontally if needed
      if (placement === 'left' && left < 0) {
        placement = 'right'
        left = triggerRect.right + gap + arrowSize
      } else if (placement === 'right' && left + tooltipRect.width > viewport.width) {
        placement = 'left'
        left = triggerRect.left - tooltipRect.width - gap - arrowSize
      }

      // Constrain to viewport horizontally
      if (left < 8) left = 8
      if (left + tooltipRect.width > viewport.width - 8) {
        left = viewport.width - tooltipRect.width - 8
      }

      // Constrain to viewport vertically
      if (top < 8) top = 8
      if (top + tooltipRect.height > viewport.height - 8) {
        top = viewport.height - tooltipRect.height - 8
      }

      this.position = { top, left }
      this.actualPlacement = placement
    }
  }
}
</script>

<style lang="stylus" scoped>
// ========================================
// TOOLTIP WRAPPER
// ========================================

.altrex-tooltip
  display: inline-block
  position: relative

  &__trigger
    display: inline-block

// ========================================
// TOOLTIP CONTENT (TELEPORTED)
// ========================================

.altrex-tooltip__content
  position: fixed
  z-index: 2000
  pointer-events: auto

  // Mobile: Larger, more readable
  padding: $altrex-spacing-3 $altrex-spacing-4
  font-size: 16px
  line-height: 1.5
  border-radius: $altrex-borderRadius-default
  box-shadow: $altrex-shadow-lg
  word-wrap: break-word

  // Desktop: More compact
  +above('md')
    padding: $altrex-spacing-2 $altrex-spacing-3
    font-size: $altrex-fontSize-sm

  // Dark theme (default)
  &--dark
    background: var(--altrex-tooltip-background-dark, $altrex-colors-neutral-900)
    color: var(--altrex-tooltip-color-dark, $altrex-colors-neutral-50)

  // Light theme
  &--light
    background: var(--altrex-tooltip-background-light, $altrex-colors-neutral-50)
    color: var(--altrex-tooltip-color-light, $altrex-colors-neutral-900)
    border: 1px solid var(--altrex-tooltip-border-light, $altrex-colors-neutral-200)

    [data-theme="dark"] &
      background: var(--altrex-tooltip-background-light, var(--altrex-colors-dark-bg-elevated))
      color: var(--altrex-tooltip-color-light, var(--altrex-colors-dark-text-primary))
      border-color: var(--altrex-tooltip-border-light, var(--altrex-colors-dark-border-default))

  &__text
    position: relative
    z-index: 1

// ========================================
// TOOLTIP ARROW
// ========================================

.altrex-tooltip__arrow
  position: absolute
  width: 8px
  height: 8px
  transform: rotate(45deg)
  z-index: 0

  // Dark theme arrow
  .altrex-tooltip__content--dark &
    background: var(--altrex-tooltip-background-dark, $altrex-colors-neutral-900)

  // Light theme arrow
  .altrex-tooltip__content--light &
    background: var(--altrex-tooltip-background-light, $altrex-colors-neutral-50)
    border: 1px solid var(--altrex-tooltip-border-light, $altrex-colors-neutral-200)

    [data-theme="dark"] &
      background: var(--altrex-tooltip-background-light, var(--altrex-colors-dark-bg-elevated))
      border-color: var(--altrex-tooltip-border-light, var(--altrex-colors-dark-border-default))

  // Hide borders on certain sides based on placement
  .altrex-tooltip__content--top &
    border-top: none
    border-left: none

  .altrex-tooltip__content--bottom &
    border-bottom: none
    border-right: none

  .altrex-tooltip__content--left &
    border-left: none
    border-bottom: none

  .altrex-tooltip__content--right &
    border-right: none
    border-top: none

// ========================================
// FADE TRANSITION
// ========================================

.altrex-tooltip-fade-enter-active,
.altrex-tooltip-fade-leave-active
  transition: opacity 0.15s ease, transform 0.15s ease

.altrex-tooltip-fade-enter-from,
.altrex-tooltip-fade-leave-to
  opacity: 0
  transform: scale(0.95)

.altrex-tooltip-fade-enter-to,
.altrex-tooltip-fade-leave-from
  opacity: 1
  transform: scale(1)

// ========================================
// REDUCED MOTION
// ========================================

@media (prefers-reduced-motion: reduce)
  .altrex-tooltip-fade-enter-active,
  .altrex-tooltip-fade-leave-active
    transition: none

  .altrex-tooltip-fade-enter-from,
  .altrex-tooltip-fade-leave-to
    transform: none
</style>
