<template>
  <div class="altrex-select-wrapper" :class="wrapperClasses" v-click-outside="closeDropdown">
    <label v-if="label" :for="selectId" class="altrex-select-label">
      {{ label }}
      <span v-if="required" class="altrex-select-required">*</span>
    </label>

    <div class="altrex-select-container" @click="toggleDropdown">
      <div class="altrex-select-display">
        <span v-if="displayText" class="altrex-select-value">
          {{ displayText }}
        </span>
        <span v-else class="altrex-select-placeholder">
          {{ placeholder }}
        </span>
      </div>

      <div class="altrex-select-actions">
        <button
          v-if="clearable && hasValue && !disabled"
          type="button"
          class="altrex-select-clear"
          @click.stop="handleClear"
          tabindex="-1"
        >
          <AltrexIcon icon="generic-x" size="s" />
        </button>

        <div class="altrex-select-arrow" :class="{ 'is-open': isOpen }">
          <AltrexIcon icon="generic-chevron-down" size="s" />
        </div>
      </div>
    </div>

    <transition name="dropdown">
      <div v-if="isOpen" class="altrex-select-dropdown" :style="dropdownStyle">
        <div v-if="searchable" class="altrex-select-search">
          <AltrexIcon icon="generic-search" size="s" />
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="altrex-select-search-input"
            @click.stop
          />
        </div>

        <div class="altrex-select-options" ref="optionsContainer">
          <template v-if="filteredOptions.length > 0">
            <div
              v-for="option in filteredOptions"
              :key="getOptionValue(option)"
              class="altrex-select-option"
              :class="{
                'is-selected': isSelected(option),
                'is-disabled': isOptionDisabled(option)
              }"
              @click="selectOption(option)"
            >
              <div v-if="multiple" class="altrex-select-checkbox">
                <AltrexIcon
                  :icon="isSelected(option) ? 'generic-check-square' : 'generic-square'"
                  size="s"
                />
              </div>

              <slot name="option" :option="option">
                {{ getOptionLabel(option) }}
              </slot>

              <div v-if="!multiple && isSelected(option)" class="altrex-select-check">
                <AltrexIcon icon="generic-check" size="s" />
              </div>
            </div>
          </template>

          <div v-else class="altrex-select-empty">
            <slot name="empty">
              No options found
            </slot>
          </div>
        </div>
      </div>
    </transition>

    <div v-if="error || success || $slots.hint" class="altrex-select-message">
      <div v-if="error" class="altrex-select-error">
        <AltrexIcon icon="generic-x-circle" size="s" />
        <span>{{ error }}</span>
      </div>
      <div v-else-if="success" class="altrex-select-success">
        <AltrexIcon icon="generic-check-circle" size="s" />
        <span>{{ success }}</span>
      </div>
      <div v-else class="altrex-select-hint">
        <slot name="hint"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import AltrexIcon from '../Icon/AltrexIcon.vue'

let selectIdCounter = 0

export default {
  name: 'AltrexSelect',

  components: {
    AltrexIcon
  },

  props: {
    modelValue: {
      type: [String, Number, Boolean, Array, Object],
      default: null
    },
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    size: {
      type: String,
      default: 'm',
      validator: (value) => ['s', 'm', 'l'].includes(value)
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Select an option'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    success: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: String,
      default: '300px'
    }
  },

  emits: ['update:modelValue', 'change', 'clear'],

  data() {
    return {
      selectId: `altrex-select-${++selectIdCounter}`,
      isOpen: false,
      searchQuery: ''
    }
  },

  computed: {
    wrapperClasses() {
      return {
        [`altrex-select-size-${this.size}`]: true,
        'altrex-select-disabled': this.disabled,
        'altrex-select-error-state': this.error,
        'altrex-select-success-state': this.success,
        'altrex-select-open': this.isOpen
      }
    },

    hasValue() {
      if (this.multiple) {
        return Array.isArray(this.modelValue) && this.modelValue.length > 0
      }
      return this.modelValue !== null && this.modelValue !== undefined && this.modelValue !== ''
    },

    displayText() {
      if (!this.hasValue) return ''

      if (this.multiple) {
        const selectedOptions = this.options.filter(opt =>
          this.modelValue.includes(this.getOptionValue(opt))
        )
        if (selectedOptions.length === 0) return ''
        if (selectedOptions.length === 1) return this.getOptionLabel(selectedOptions[0])
        return `${selectedOptions.length} selected`
      }

      const selectedOption = this.options.find(opt =>
        this.getOptionValue(opt) === this.modelValue
      )
      return selectedOption ? this.getOptionLabel(selectedOption) : ''
    },

    filteredOptions() {
      if (!this.searchable || !this.searchQuery) {
        return this.options
      }

      const query = this.searchQuery.toLowerCase()
      return this.options.filter(option => {
        const label = this.getOptionLabel(option).toLowerCase()
        return label.includes(query)
      })
    },

    dropdownStyle() {
      return {
        maxHeight: this.maxHeight
      }
    }
  },

  directives: {
    clickOutside: {
      mounted(el, binding) {
        el.clickOutsideEvent = function(event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value()
          }
        }
        document.addEventListener('click', el.clickOutsideEvent)
      },
      unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  },

  methods: {
    getOptionValue(option) {
      if (typeof option === 'object' && option !== null) {
        return option.value !== undefined ? option.value : option
      }
      return option
    },

    getOptionLabel(option) {
      if (typeof option === 'object' && option !== null) {
        return option.label !== undefined ? option.label : option.value
      }
      return String(option)
    },

    isOptionDisabled(option) {
      if (typeof option === 'object' && option !== null) {
        return option.disabled === true
      }
      return false
    },

    isSelected(option) {
      const value = this.getOptionValue(option)

      if (this.multiple) {
        return Array.isArray(this.modelValue) && this.modelValue.includes(value)
      }

      return this.modelValue === value
    },

    toggleDropdown() {
      if (this.disabled) return
      this.isOpen = !this.isOpen

      if (this.isOpen && this.searchable) {
        this.$nextTick(() => {
          this.$refs.searchInput?.focus()
        })
      }
    },

    closeDropdown() {
      this.isOpen = false
      this.searchQuery = ''
    },

    selectOption(option) {
      if (this.isOptionDisabled(option)) return

      const value = this.getOptionValue(option)

      if (this.multiple) {
        let newValue = Array.isArray(this.modelValue) ? [...this.modelValue] : []

        const index = newValue.indexOf(value)
        if (index > -1) {
          newValue.splice(index, 1)
        } else {
          newValue.push(value)
        }

        this.$emit('update:modelValue', newValue)
        this.$emit('change', newValue)
      } else {
        this.$emit('update:modelValue', value)
        this.$emit('change', value)
        this.closeDropdown()
      }
    },

    handleClear() {
      const newValue = this.multiple ? [] : null
      this.$emit('update:modelValue', newValue)
      this.$emit('clear')
    }
  }
}
</script>

<style lang="stylus" scoped>
.altrex-select-wrapper
  position: relative
  display: flex
  flex-direction: column
  gap: $altrex-spacing-2
  width: 100%

.altrex-select-label
  font-size: $altrex-fontSize-sm
  font-weight: $altrex-fontWeight-medium
  color: var(--altrex-colors-neutral-700)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-primary)

  .altrex-select-required
    color: var(--altrex-colors-danger-500)
    margin-left: $altrex-spacing-1

.altrex-select-container
  display: flex
  align-items: center
  justify-content: space-between
  background: #ffffff
  border: 2px solid var(--altrex-colors-neutral-300)
  border-radius: $altrex-borderRadius-default
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08)
  cursor: pointer
  transition: all 0.2s ease
  user-select: none

  // Mobile-first: WCAG AAA touch target
  min-height: $altrex-touchTarget-minimum
  padding: $altrex-spacing-3 $altrex-spacing-4
  font-size: 16px // Prevent iOS zoom

  // Desktop: allow size variations
  +above('md')
    font-size: $altrex-fontSize-base;

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-elevated)
    border-color: var(--altrex-colors-dark-border-default)
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3)

  &:hover:not(.altrex-select-disabled .altrex-select-container)
    border-color: var(--altrex-colors-primary-400)
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12)

    [data-theme="dark"] &
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4)

  .altrex-select-open &
    border-color: var(--altrex-colors-primary-500)
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1), 0 2px 8px rgba(0, 0, 0, 0.12)

    [data-theme="dark"] &
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2), 0 2px 8px rgba(0, 0, 0, 0.4)

  .altrex-select-error-state &
    border-color: var(--altrex-colors-danger-500)

  .altrex-select-success-state &
    border-color: var(--altrex-colors-success-500)

  .altrex-select-disabled &
    cursor: not-allowed
    opacity: 0.6
    background: var(--altrex-colors-neutral-100)

    [data-theme="dark"] &
      background: var(--altrex-colors-dark-bg-base)

  .altrex-select-size-s &
    // Mobile: touch target minimum
    min-height: $altrex-touchTarget-minimum
    padding: $altrex-spacing-3
    font-size: 16px

    // Desktop: compact
    +above('md')
      min-height: 36px;
      padding: $altrex-spacing-2 $altrex-spacing-3;
      font-size: $altrex-fontSize-sm;

  .altrex-select-size-m &
    min-height: $altrex-touchTarget-minimum
    padding: $altrex-spacing-3 $altrex-spacing-4
    font-size: 16px

    +above('md')
      min-height: 40px;
      font-size: $altrex-fontSize-base;

  .altrex-select-size-l &
    // Mobile: comfortable touch target
    min-height: $altrex-touchTarget-comfortable
    padding: $altrex-spacing-4 $altrex-spacing-5
    font-size: 16px

    +above('md')
      min-height: 48px;
      font-size: $altrex-fontSize-lg;

.altrex-select-display
  flex: 1
  min-width: 0

.altrex-select-value
  color: var(--altrex-colors-neutral-900)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-primary)

.altrex-select-placeholder
  color: var(--altrex-colors-neutral-400)

.altrex-select-actions
  display: flex
  align-items: center
  gap: $altrex-spacing-2
  flex-shrink: 0

.altrex-select-clear
  // Always meet touch target
  touch-target('minimum')
  border: none
  background: transparent
  color: var(--altrex-colors-neutral-500)
  cursor: pointer
  transition: color 0.2s ease

  // Icon visual size stays 16px
  :deep(.altrex-icon)
    altrex-icon-s()

  &:hover
    color: var(--altrex-colors-neutral-700)

  [data-theme="dark"] &
    color: var(--altrex-colors-neutral-400)

    &:hover
      color: var(--altrex-colors-neutral-200)

.altrex-select-arrow
  display: flex
  align-items: center
  color: var(--altrex-colors-neutral-500)
  transition: transform 0.2s ease

  [data-theme="dark"] &
    color: var(--altrex-colors-neutral-400)

  &.is-open
    transform: rotate(180deg)

.altrex-select-dropdown
  position: absolute
  top: calc(100% + 4px)
  left: 0
  right: 0
  background: #ffffff
  border: 2px solid var(--altrex-colors-neutral-300)
  border-radius: $altrex-borderRadius-default
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15)
  overflow: hidden
  z-index: 1000

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-elevated)
    border-color: var(--altrex-colors-dark-border-default)
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5)

.altrex-select-search
  display: flex
  align-items: center
  gap: $altrex-spacing-2
  padding: $altrex-spacing-3
  border-bottom: 1px solid var(--altrex-colors-neutral-200)

  [data-theme="dark"] &
    border-color: var(--altrex-colors-dark-border-subtle)

  .altrex-icon
    color: var(--altrex-colors-neutral-500)

.altrex-select-search-input
  flex: 1
  border: none
  outline: none
  background: transparent
  color: var(--altrex-colors-neutral-900)
  font-size: $altrex-fontSize-sm

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-primary)

  &::placeholder
    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-tertiary)

.altrex-select-options
  overflow-y: auto
  max-height: inherit

.altrex-select-option
  display: flex
  align-items: center
  gap: $altrex-spacing-2
  cursor: pointer
  transition: background 0.2s ease
  color: var(--altrex-colors-neutral-900)

  // Mobile: touch-optimized
  min-height: $altrex-touchTarget-minimum
  padding: $altrex-spacing-3 $altrex-spacing-4
  font-size: 16px

  // Desktop: more compact
  +above('md')
    min-height: auto;
    font-size: $altrex-fontSize-base;

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-primary)

  &:hover:not(.is-disabled)
    background: var(--altrex-colors-neutral-100)

    [data-theme="dark"] &
      background: var(--altrex-colors-dark-bg-hover)

  &.is-selected
    background: var(--altrex-colors-primary-50)
    color: var(--altrex-colors-primary-700)

    [data-theme="dark"] &
      background: var(--altrex-colors-dark-primary-muted)
      color: var(--altrex-colors-dark-primary-default)

  &.is-disabled
    opacity: 0.5
    cursor: not-allowed

  .altrex-select-size-s &
    min-height: $altrex-touchTarget-minimum
    padding: $altrex-spacing-3
    font-size: 16px

    +above('md')
      min-height: auto;
      padding: $altrex-spacing-2 $altrex-spacing-3;
      font-size: $altrex-fontSize-sm;

  .altrex-select-size-l &
    min-height: $altrex-touchTarget-comfortable
    padding: $altrex-spacing-4 $altrex-spacing-5
    font-size: 16px

    +above('md')
      min-height: auto;
      font-size: $altrex-fontSize-lg;

.altrex-select-checkbox
  display: flex
  color: var(--altrex-colors-primary-600)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-primary-default)

.altrex-select-check
  margin-left: auto
  display: flex
  color: var(--altrex-colors-primary-600)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-primary-default)

.altrex-select-empty
  padding: $altrex-spacing-6 $altrex-spacing-4
  text-align: center
  color: var(--altrex-colors-neutral-500)
  font-size: $altrex-fontSize-sm

  [data-theme="dark"] &
    color: var(--altrex-colors-neutral-400)

.altrex-select-message
  font-size: $altrex-fontSize-sm

  .altrex-select-size-s &
    font-size: $altrex-fontSize-xs

.altrex-select-error,
.altrex-select-success,
.altrex-select-hint
  display: flex
  align-items: center
  gap: $altrex-spacing-2

.altrex-select-error
  color: var(--altrex-colors-danger-600)

  [data-theme="dark"] &
    color: var(--altrex-colors-danger-400)

.altrex-select-success
  color: var(--altrex-colors-success-600)

  [data-theme="dark"] &
    color: var(--altrex-colors-success-400)

.altrex-select-hint
  color: var(--altrex-colors-neutral-600)

  [data-theme="dark"] &
    color: var(--altrex-colors-neutral-400)

// Dropdown transition
.dropdown-enter-active,
.dropdown-leave-active
  transition: all 0.2s ease

.dropdown-enter-from,
.dropdown-leave-to
  opacity: 0
  transform: translateY(-8px)
</style>
