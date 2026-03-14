<template>
  <div class="altrex-tabs" :style="themeVariables">
    <div
      class="altrex-tabs__list"
      :class="tabsListClasses"
      role="tablist"
      :aria-label="ariaLabel"
    >
      <button
        v-for="(tab, index) in tabs"
        :key="tab.id || index"
        :ref="el => setTabRef(el, index)"
        class="altrex-tabs__tab"
        :class="getTabClasses(tab, index)"
        role="tab"
        :aria-selected="isActive(tab, index) ? 'true' : 'false'"
        :aria-controls="`${tabsId}-panel-${index}`"
        :id="`${tabsId}-tab-${index}`"
        :tabindex="isActive(tab, index) ? 0 : -1"
        :disabled="tab.disabled"
        @click="selectTab(tab, index)"
        @keydown="handleKeydown($event, index)"
      >
        <AltrexIcon
          v-if="tab.icon"
          :icon="tab.icon"
          size="s"
          class="altrex-tabs__icon"
        />
        <span class="altrex-tabs__label">{{ tab.label }}</span>
        <AltrexBadge
          v-if="tab.badge"
          :content="tab.badge"
          :variant="tab.badgeVariant || 'neutral'"
          size="small"
          class="altrex-tabs__badge"
        />
      </button>
    </div>

    <div class="altrex-tabs__panels">
      <div
        v-for="(tab, index) in tabs"
        :key="`panel-${tab.id || index}`"
        :id="`${tabsId}-panel-${index}`"
        class="altrex-tabs__panel"
        :class="{ 'altrex-tabs__panel--active': isActive(tab, index) }"
        role="tabpanel"
        :aria-labelledby="`${tabsId}-tab-${index}`"
        :hidden="!isActive(tab, index)"
        :tabindex="isActive(tab, index) ? 0 : -1"
      >
        <slot :name="`panel-${index}`" :tab="tab">
          <div v-if="tab.content">{{ tab.content }}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import AltrexIcon from '../Icon/AltrexIcon.vue'
import AltrexBadge from '../Badge/AltrexBadge.vue'
import styling from '@/utils/styling'

let tabsIdCounter = 0

export default {
  name: 'AltrexTabs',
  components: {
    AltrexIcon,
    AltrexBadge
  },
  mixins: [styling],
  props: {
    /**
     * Array of tab objects with { label, id?, icon?, badge?, badgeVariant?, disabled?, content? }
     */
    tabs: {
      type: Array,
      required: true,
      validator: (tabs) => {
        return tabs.every(tab => tab.label)
      }
    },
    /**
     * Active tab index or id
     */
    modelValue: {
      type: [Number, String],
      default: 0
    },
    /**
     * Tab variant style
     */
    variant: {
      type: String,
      default: 'line',
      validator: (value) => ['line', 'enclosed', 'pills'].includes(value)
    },
    /**
     * Tab size
     */
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    /**
     * Full width tabs
     */
    fullWidth: {
      type: Boolean,
      default: false
    },
    /**
     * Align tabs (left, center, right)
     */
    align: {
      type: String,
      default: 'left',
      validator: (value) => ['left', 'center', 'right'].includes(value)
    },
    /**
     * ARIA label for tab list
     */
    ariaLabel: {
      type: String,
      default: 'Tabs'
    }
  },
  emits: ['update:modelValue', 'change'],
  data() {
    return {
      themePrefix: 'altrex-tabs',
      tabsId: `altrex-tabs-${++tabsIdCounter}`,
      tabRefs: []
    }
  },
  computed: {
    tabsListClasses() {
      return {
        [`altrex-tabs__list--${this.variant}`]: true,
        [`altrex-tabs__list--${this.size}`]: true,
        [`altrex-tabs__list--align-${this.align}`]: true,
        'altrex-tabs__list--full-width': this.fullWidth
      }
    },
    activeIndex() {
      if (typeof this.modelValue === 'number') {
        return this.modelValue
      }
      // If modelValue is a string (id), find the index
      const index = this.tabs.findIndex(tab => tab.id === this.modelValue)
      return index >= 0 ? index : 0
    }
  },
  methods: {
    setTabRef(el, index) {
      if (el) {
        this.tabRefs[index] = el
      }
    },
    isActive(tab, index) {
      if (typeof this.modelValue === 'number') {
        return index === this.modelValue
      }
      return tab.id === this.modelValue || index === this.activeIndex
    },
    getTabClasses(tab, index) {
      return {
        'altrex-tabs__tab--active': this.isActive(tab, index),
        'altrex-tabs__tab--disabled': tab.disabled
      }
    },
    selectTab(tab, index) {
      if (tab.disabled) return

      const newValue = tab.id !== undefined ? tab.id : index
      this.$emit('update:modelValue', newValue)
      this.$emit('change', { tab, index, id: tab.id })
    },
    handleKeydown(event, currentIndex) {
      const { key } = event
      let newIndex = currentIndex

      switch (key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault()
          newIndex = this.getPreviousEnabledIndex(currentIndex)
          break
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault()
          newIndex = this.getNextEnabledIndex(currentIndex)
          break
        case 'Home':
          event.preventDefault()
          newIndex = this.getFirstEnabledIndex()
          break
        case 'End':
          event.preventDefault()
          newIndex = this.getLastEnabledIndex()
          break
        default:
          return
      }

      if (newIndex !== currentIndex) {
        this.focusTab(newIndex)
        this.selectTab(this.tabs[newIndex], newIndex)
      }
    },
    getPreviousEnabledIndex(currentIndex) {
      let index = currentIndex - 1
      while (index >= 0) {
        if (!this.tabs[index].disabled) return index
        index--
      }
      // Wrap to end
      return this.getLastEnabledIndex()
    },
    getNextEnabledIndex(currentIndex) {
      let index = currentIndex + 1
      while (index < this.tabs.length) {
        if (!this.tabs[index].disabled) return index
        index++
      }
      // Wrap to start
      return this.getFirstEnabledIndex()
    },
    getFirstEnabledIndex() {
      for (let i = 0; i < this.tabs.length; i++) {
        if (!this.tabs[i].disabled) return i
      }
      return 0
    },
    getLastEnabledIndex() {
      for (let i = this.tabs.length - 1; i >= 0; i--) {
        if (!this.tabs[i].disabled) return i
      }
      return this.tabs.length - 1
    },
    focusTab(index) {
      this.$nextTick(() => {
        if (this.tabRefs[index]) {
          this.tabRefs[index].focus()
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.altrex-tabs
  width: 100%

.altrex-tabs__list
  display: flex
  gap: var(--altrex-tabs-gap, $altrex-spacing-2)
  border-bottom: 2px solid transparent

  // Mobile-first: horizontal scroll for many tabs
  overflow-x: auto
  overflow-y: hidden
  -webkit-overflow-scrolling: touch
  scrollbar-width: thin

  // Hide scrollbar on mobile for cleaner look
  &::-webkit-scrollbar
    height: 2px

  &::-webkit-scrollbar-track
    background: transparent

  &::-webkit-scrollbar-thumb
    background: var(--altrex-colors-neutral-300)
    border-radius: 2px

  // Desktop: allow normal alignment
  +above('md')
    overflow-x: visible;

  &--align-left
    justify-content: flex-start

  &--align-center
    justify-content: center

  &--align-right
    justify-content: flex-end

  &--full-width
    .altrex-tabs__tab
      flex: 1

  // Line variant (default)
  &--line
    border-bottom-color: var(--altrex-tabs-border-color, $altrex-colors-neutral-200)

    [data-theme="dark"] &
      border-bottom-color: var(--altrex-tabs-border-color, $altrex-colors-dark-border-default)

    .altrex-tabs__tab
      border-bottom: 2px solid transparent
      margin-bottom: -2px

      &--active
        border-bottom-color: var(--altrex-tabs-active-color, $altrex-colors-primary-500)

        [data-theme="dark"] &
          border-bottom-color: var(--altrex-tabs-active-color, $altrex-colors-dark-primary-default)

  // Enclosed variant
  &--enclosed
    gap: 0

    .altrex-tabs__tab
      border: 1px solid transparent
      border-bottom: none
      border-radius: $altrex-borderRadius-default $altrex-borderRadius-default 0 0

      &--active
        background: var(--altrex-tabs-active-background, #ffffff)
        border-color: var(--altrex-tabs-border-color, $altrex-colors-neutral-200)
        border-bottom: 1px solid var(--altrex-tabs-active-background, #ffffff)
        margin-bottom: -1px

        [data-theme="dark"] &
          background: var(--altrex-tabs-active-background, $altrex-colors-dark-bg-surface)
          border-color: var(--altrex-tabs-border-color, $altrex-colors-dark-border-default)
          border-bottom-color: var(--altrex-tabs-active-background, $altrex-colors-dark-bg-surface)

  // Pills variant
  &--pills
    gap: $altrex-spacing-2
    border-bottom: none

    .altrex-tabs__tab
      border-radius: var(--altrex-tabs-border-radius, $altrex-borderRadius-lg)

      &--active
        background: var(--altrex-tabs-active-background, $altrex-colors-primary-500)
        color: var(--altrex-tabs-active-color, #ffffff)

        [data-theme="dark"] &
          background: var(--altrex-tabs-active-background, $altrex-colors-dark-primary-default)

.altrex-tabs__tab
  display: flex
  align-items: center
  gap: $altrex-spacing-2
  background: transparent
  border: none
  font-family: $altrex-font-family-body
  font-weight: $altrex-fontWeight-medium
  color: var(--altrex-tabs-color, $altrex-colors-neutral-600)
  cursor: pointer
  transition: all $altrex-transition-default
  white-space: nowrap

  // Mobile-first: touch-optimized height
  min-height: $altrex-touchTarget-minimum
  padding: var(--altrex-tabs-padding, $altrex-spacing-3 $altrex-spacing-3)
  font-size: var(--altrex-tabs-font-size, $altrex-fontSize-sm)

  // Desktop: more compact
  +above('md')
    min-height: auto;
    padding: var(--altrex-tabs-padding, $altrex-spacing-3 $altrex-spacing-4);
    font-size: var(--altrex-tabs-font-size, $altrex-fontSize-base);

  [data-theme="dark"] &
    color: var(--altrex-tabs-color, $altrex-colors-dark-text-secondary)

  &:hover:not(&--disabled):not(&--active)
    color: var(--altrex-tabs-hover-color, $altrex-colors-neutral-900)
    background: var(--altrex-tabs-hover-background, $altrex-colors-neutral-50)

    [data-theme="dark"] &
      color: var(--altrex-tabs-hover-color, $altrex-colors-dark-text-primary)
      background: var(--altrex-tabs-hover-background, $altrex-colors-dark-bg-hover)

  &:focus-visible
    outline: 2px solid $altrex-colors-primary-500
    outline-offset: 2px
    z-index: 1

    [data-theme="dark"] &
      outline-color: $altrex-colors-dark-border-focus

  &--active
    color: var(--altrex-tabs-active-color, $altrex-colors-primary-500)
    font-weight: $altrex-fontWeight-semibold

    [data-theme="dark"] &
      color: var(--altrex-tabs-active-color, $altrex-colors-dark-primary-default)

  &--disabled
    opacity: 0.5
    cursor: not-allowed
    pointer-events: none

  // Size variants
  .altrex-tabs__list--small &
    padding: $altrex-spacing-2 $altrex-spacing-3
    font-size: $altrex-fontSize-sm

  .altrex-tabs__list--large &
    padding: $altrex-spacing-4 $altrex-spacing-5
    font-size: $altrex-fontSize-lg

.altrex-tabs__icon
  flex-shrink: 0
  color: currentColor

.altrex-tabs__label
  flex-shrink: 0

.altrex-tabs__badge
  flex-shrink: 0

.altrex-tabs__panels
  margin-top: var(--altrex-tabs-panels-margin-top, $altrex-spacing-6)

.altrex-tabs__panel
  &:focus
    outline: none

  &--active
    animation: fadeIn 0.2s ease-in-out

@keyframes fadeIn
  from
    opacity: 0
  to
    opacity: 1
</style>
