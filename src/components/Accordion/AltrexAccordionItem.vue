<template>
  <div
    class="altrex-accordion-item"
    :class="accordionItemClasses"
    :style="themeVariables"
  >
    <button
      :id="buttonId"
      class="altrex-accordion-item__header"
      type="button"
      :aria-expanded="isOpen ? 'true' : 'false'"
      :aria-controls="contentId"
      :aria-disabled="disabled ? 'true' : 'false'"
      :disabled="disabled"
      @click="handleToggle"
    >
      <slot name="header">
        <span class="altrex-accordion-item__title">{{ title }}</span>
      </slot>

      <AltrexIcon
        :icon="icon"
        size="m"
        class="altrex-accordion-item__icon"
      />
    </button>

    <transition
      name="altrex-accordion-collapse"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    >
      <div
        v-show="isOpen"
        :id="contentId"
        class="altrex-accordion-item__content-wrapper"
        role="region"
        :aria-labelledby="buttonId"
      >
        <div class="altrex-accordion-item__content">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import AltrexIcon from '../Icon/AltrexIcon.vue'
import styling from '@/utils/styling'

let itemIdCounter = 0

export default {
  name: 'AltrexAccordionItem',
  components: {
    AltrexIcon
  },
  mixins: [styling],
  inject: {
    accordion: {
      default: null
    }
  },
  props: {
    /**
     * Accordion item title
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * Icon to display (defaults to chevron-bottom)
     */
    icon: {
      type: String,
      default: 'generic-chevron-bottom'
    },
    /**
     * Whether the item is open (v-model support)
     */
    open: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the item is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Unique identifier for this item
     */
    name: {
      type: [String, Number],
      default: null
    }
  },
  emits: ['update:open'],
  data() {
    return {
      themePrefix: 'altrex-accordion-item',
      internalId: null
    }
  },
  computed: {
    isOpen() {
      return this.open
    },
    accordionItemClasses() {
      return {
        'altrex-accordion-item--open': this.isOpen,
        'altrex-accordion-item--disabled': this.disabled
      }
    },
    buttonId() {
      return `altrex-accordion-button-${this.internalId}`
    },
    contentId() {
      return `altrex-accordion-content-${this.internalId}`
    }
  },
  created() {
    this.internalId = this.name !== null ? this.name : itemIdCounter++
  },
  methods: {
    handleToggle() {
      if (this.disabled) return

      const newState = !this.isOpen
      // Emit update event for v-model support
      this.$emit('update:open', newState)
    },
    // Transition hooks for smooth height animation
    onEnter(el) {
      el.style.height = '0'
    },
    onAfterEnter(el) {
      el.style.height = 'auto'
    },
    onLeave(el) {
      el.style.height = `${el.scrollHeight}px`
      // Force reflow
      el.offsetHeight
      el.style.height = '0'
    },
    onAfterLeave(el) {
      el.style.height = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.altrex-accordion-item
  border-bottom: 1px solid var(--altrex-accordion-item-border-color, $altrex-colors-neutral-200)

  [data-theme="dark"] &
    border-bottom-color: var(--altrex-accordion-item-border-color, $altrex-colors-dark-border-default)

  &:last-child
    border-bottom: none

// Header button - Mobile-first touch-optimized
.altrex-accordion-item__header
  width: 100%
  display: flex
  align-items: center
  justify-content: space-between
  text-align: left
  background: var(--altrex-accordion-item-header-background, transparent)
  border: none
  cursor: pointer
  transition: all $altrex-transition-default
  color: var(--altrex-accordion-item-header-color, $altrex-colors-neutral-900)

  [data-theme="dark"] &
    color: var(--altrex-accordion-item-header-color, $altrex-colors-dark-text-primary)

  // Mobile: touch-optimized (44px minimum)
  min-height: $altrex-touchTarget-minimum
  padding: $altrex-spacing-3 $altrex-spacing-4
  font-size: 16px  // Prevent iOS zoom

  // Desktop: more compact
  +above('md')
    min-height: 48px
    padding: $altrex-spacing-4 $altrex-spacing-5
    font-size: $altrex-fontSize-base

  // Hover state
  &:hover:not(:disabled)
    background: var(--altrex-accordion-item-header-background-hover, $altrex-colors-neutral-50)

    [data-theme="dark"] &
      background: var(--altrex-accordion-item-header-background-hover, $altrex-colors-dark-bg-hover)

  // Focus state
  &:focus-visible
    outline: 2px solid var(--altrex-accordion-item-focus-color, $altrex-colors-primary-500)
    outline-offset: -2px
    z-index: 1

    [data-theme="dark"] &
      outline-color: var(--altrex-accordion-item-focus-color, $altrex-colors-dark-primary-default)

  // Active/pressed state - touch feedback
  &:active:not(:disabled)
    background: var(--altrex-accordion-item-header-background-active, $altrex-colors-neutral-100)

    [data-theme="dark"] &
      background: var(--altrex-accordion-item-header-background-active, $altrex-colors-dark-bg-active)

  +touch-device()
    &:active:not(:disabled)
      transform: scale(0.99)

  // Disabled state
  &:disabled
    opacity: 0.5
    cursor: not-allowed

// Title
.altrex-accordion-item__title
  flex: 1
  font-weight: var(--altrex-accordion-item-title-font-weight, $altrex-fontWeight-medium)
  line-height: 1.5
  min-width: 0

// Icon - rotate when open
.altrex-accordion-item__icon
  flex-shrink: 0
  margin-left: $altrex-spacing-3
  transition: transform $altrex-transition-default
  color: var(--altrex-accordion-item-icon-color, $altrex-colors-neutral-600)

  [data-theme="dark"] &
    color: var(--altrex-accordion-item-icon-color, $altrex-colors-dark-text-secondary)

  .altrex-accordion-item--open &
    transform: rotate(180deg)

  altrex-icon-m()

// Content wrapper - transition container
.altrex-accordion-item__content-wrapper
  overflow: hidden
  transition: height $altrex-transition-default

// Content
.altrex-accordion-item__content
  color: var(--altrex-accordion-item-content-color, $altrex-colors-neutral-700)
  line-height: 1.6

  [data-theme="dark"] &
    color: var(--altrex-accordion-item-content-color, $altrex-colors-dark-text-secondary)

  // Mobile: comfortable padding
  padding: $altrex-spacing-3 $altrex-spacing-4 $altrex-spacing-4

  // Desktop: more spacious
  +above('md')
    padding: $altrex-spacing-4 $altrex-spacing-5 $altrex-spacing-5

// Collapse transition
.altrex-accordion-collapse-enter-active,
.altrex-accordion-collapse-leave-active
  transition: height $altrex-transition-default

.altrex-accordion-collapse-enter-from,
.altrex-accordion-collapse-leave-to
  height: 0

// Open state styling
.altrex-accordion-item--open
  .altrex-accordion-item__header
    background: var(--altrex-accordion-item-header-background-open, transparent)
    color: var(--altrex-accordion-item-header-color-open, $altrex-colors-primary-600)

    [data-theme="dark"] &
      color: var(--altrex-accordion-item-header-color-open, $altrex-colors-dark-primary-default)

// Disabled state styling
.altrex-accordion-item--disabled
  .altrex-accordion-item__header
    opacity: 0.5
    cursor: not-allowed
</style>
