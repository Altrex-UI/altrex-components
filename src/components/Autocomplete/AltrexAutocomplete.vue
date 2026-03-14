<template>
  <div class="altrex-autocomplete-wrapper" :class="wrapperClasses" v-click-outside="closeDropdown">
    <!-- Input Field -->
    <div class="altrex-autocomplete-input-wrapper">
      <AltrexInput
        :model-value="inputValue"
        v-bind="inputProps"
        :label="label"
        :placeholder="placeholder"
        :size="size"
        :disabled="disabled"
        :error="error"
        :readonly="readonly"
        @update:modelValue="handleInputChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.down.prevent="navigateOptions('down')"
        @keydown.up.prevent="navigateOptions('up')"
        @keydown.enter.prevent="selectHighlightedOption"
        @keydown.esc="closeDropdown"
        ref="inputRef"
      >
        <template #suffix>
          <div class="altrex-autocomplete-icons">
            <AltrexSpinner v-if="isLoading" size="s" />
            <AltrexIcon v-else-if="!inputValue" icon="generic-search" size="s" />
            <button
              v-else-if="clearable"
              type="button"
              class="altrex-autocomplete-clear"
              @click.stop="handleClear"
              @mousedown.prevent
              tabindex="-1"
            >
              <AltrexIcon icon="generic-x" size="s" />
            </button>
          </div>
        </template>
      </AltrexInput>
    </div>

    <!-- Selected Options (Multi-select chips) -->
    <div v-if="multiple && selectedOptions.length > 0" class="altrex-autocomplete-chips">
      <div
        v-for="option in selectedOptions"
        :key="getOptionValue(option)"
        class="altrex-autocomplete-chip"
      >
        <span class="altrex-autocomplete-chip-label">
          {{ getOptionLabel(option) }}
        </span>
        <button
          type="button"
          class="altrex-autocomplete-chip-remove"
          @click="removeOption(option)"
          @mousedown.prevent
          :aria-label="`Remove ${getOptionLabel(option)}`"
        >
          <AltrexIcon icon="generic-x" size="s" />
        </button>
      </div>
    </div>

    <!-- Dropdown -->
    <Teleport to="body">
      <Transition name="dropdown">
        <div
          v-if="isOpen && shouldShowDropdown"
          ref="dropdownRef"
          class="altrex-autocomplete-dropdown"
          :style="floatingStyles"
          role="listbox"
          :aria-multiselectable="multiple"
        >
          <div class="altrex-autocomplete-options" ref="optionsContainer">
            <template v-if="filteredOptions.length > 0">
              <div
                v-for="(option, index) in filteredOptions"
                :key="getOptionValue(option)"
                :id="`option-${index}`"
                class="altrex-autocomplete-option"
                :class="{
                  'is-selected': isSelected(option),
                  'is-highlighted': index === highlightedIndex,
                  'is-disabled': isOptionDisabled(option)
                }"
                role="option"
                :aria-selected="isSelected(option)"
                @click="selectOption(option)"
                @mouseenter="highlightedIndex = index"
              >
                <!-- Checkbox for multi-select -->
                <div v-if="multiple" class="altrex-autocomplete-checkbox">
                  <AltrexIcon
                    :icon="isSelected(option) ? 'generic-check-square' : 'generic-square'"
                    size="s"
                  />
                </div>

                <!-- Option content slot -->
                <slot name="option" :option="option" :highlighted="index === highlightedIndex">
                  {{ getOptionLabel(option) }}
                </slot>

                <!-- Check icon for single-select -->
                <div v-if="!multiple && isSelected(option)" class="altrex-autocomplete-check">
                  <AltrexIcon icon="generic-check" size="s" />
                </div>
              </div>
            </template>

            <!-- No results -->
            <div v-else class="altrex-autocomplete-empty">
              <slot name="no-results">
                <div class="altrex-autocomplete-empty-content">
                  <AltrexIcon icon="generic-search" size="m" />
                  <p>No results found</p>
                </div>
              </slot>
            </div>

            <!-- Loading state -->
            <div v-if="isLoading" class="altrex-autocomplete-loading">
              <slot name="loading">
                <AltrexSpinner size="m" />
                <span>Loading...</span>
              </slot>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script>
import { ref, computed, watch, nextTick } from 'vue'
import AltrexInput from '../Input/AltrexInput.vue'
import AltrexIcon from '../Icon/AltrexIcon.vue'
import AltrexSpinner from '../Spinner/AltrexSpinner.vue'
import { useFloating, offset, flip, shift, size } from '@altrex-ui/floating'

let autocompleteIdCounter = 0

export default {
  name: 'AltrexAutocomplete',

  components: {
    AltrexInput,
    AltrexIcon,
    AltrexSpinner
  },

  props: {
    /**
     * v-model value (string or array of strings for multi-select)
     */
    modelValue: {
      type: [String, Array],
      default: null
    },
    /**
     * Options array
     */
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    /**
     * Enable multi-select mode
     */
    multiple: {
      type: Boolean,
      default: false
    },
    /**
     * Filter mode: 'client' or 'async'
     */
    filterMode: {
      type: String,
      default: 'client',
      validator: (value) => ['client', 'async'].includes(value)
    },
    /**
     * Custom filter function
     */
    filterFn: {
      type: Function,
      default: null
    },
    /**
     * Minimum characters to trigger search
     */
    minChars: {
      type: Number,
      default: 1
    },
    /**
     * Debounce delay in ms (for async mode)
     */
    debounce: {
      type: Number,
      default: 300
    },
    /**
     * Loading state (for async mode)
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * Max dropdown height
     */
    maxDropdownHeight: {
      type: String,
      default: '300px'
    },
    /**
     * Input label
     */
    label: {
      type: String,
      default: ''
    },
    /**
     * Input placeholder
     */
    placeholder: {
      type: String,
      default: 'Type to search...'
    },
    /**
     * Size variant
     */
    size: {
      type: String,
      default: 'm',
      validator: (value) => ['s', 'm', 'l'].includes(value)
    },
    /**
     * Disabled state
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Readonly state
     */
    readonly: {
      type: Boolean,
      default: false
    },
    /**
     * Error message
     */
    error: {
      type: String,
      default: ''
    },
    /**
     * Clearable input
     */
    clearable: {
      type: Boolean,
      default: true
    }
  },

  emits: ['update:modelValue', 'select', 'remove', 'search', 'blur', 'focus'],

  setup(props, { emit }) {
    // Refs
    const inputRef = ref(null)
    const dropdownRef = ref(null)
    const optionsContainer = ref(null)

    // State
    const autocompleteId = `altrex-autocomplete-${++autocompleteIdCounter}`
    const inputValue = ref('')
    const isOpen = ref(false)
    const highlightedIndex = ref(-1)
    const debounceTimer = ref(null)

    // Floating UI
    const { floatingStyles, update } = useFloating(
      computed(() => inputRef.value?.$el?.querySelector('.altrex-input-container')),
      dropdownRef,
      {
        placement: 'bottom-start',
        middleware: [
          offset(4),
          flip(),
          shift({ padding: 8 }),
          size({
            apply({ availableHeight, rects }) {
              if (dropdownRef.value) {
                const maxHeight = Math.min(availableHeight - 8, 300)
                Object.assign(dropdownRef.value.style, {
                  maxHeight: `${maxHeight}px`,
                  width: `${rects.reference.width}px`
                })
              }
            }
          })
        ]
      }
    )

    // Computed
    const wrapperClasses = computed(() => ({
      [`altrex-autocomplete-size-${props.size}`]: true,
      'altrex-autocomplete-disabled': props.disabled,
      'altrex-autocomplete-readonly': props.readonly,
      'altrex-autocomplete-error': props.error,
      'altrex-autocomplete-open': isOpen.value,
      'altrex-autocomplete-multiple': props.multiple
    }))

    const isLoading = computed(() => props.loading)

    const selectedOptions = computed(() => {
      if (!props.multiple) return []

      const values = Array.isArray(props.modelValue) ? props.modelValue : []
      return props.options.filter(opt => values.includes(getOptionValue(opt)))
    })

    const filteredOptions = computed(() => {
      if (props.filterMode === 'async') {
        // Async mode: parent controls filtering
        return props.options
      }

      // Client-side filtering
      if (!inputValue.value || inputValue.value.length < props.minChars) {
        return props.options
      }

      const query = inputValue.value.toLowerCase()
      const filterFunction = props.filterFn || defaultFilterFn

      return props.options.filter(option => filterFunction(option, query))
    })

    const shouldShowDropdown = computed(() => {
      return filteredOptions.value.length > 0 || isLoading.value || inputValue.value.length >= props.minChars
    })

    const inputProps = computed(() => ({
      id: autocompleteId,
      role: 'combobox',
      'aria-autocomplete': 'list',
      'aria-expanded': isOpen.value,
      'aria-controls': `${autocompleteId}-listbox`,
      'aria-activedescendant': highlightedIndex.value >= 0 ? `option-${highlightedIndex.value}` : null
    }))

    // Methods
    const defaultFilterFn = (option, query) => {
      const label = getOptionLabel(option).toLowerCase()
      return label.includes(query)
    }

    const getOptionValue = (option) => {
      if (typeof option === 'object' && option !== null) {
        return option.value !== undefined ? option.value : option
      }
      return option
    }

    const getOptionLabel = (option) => {
      if (typeof option === 'object' && option !== null) {
        return option.label !== undefined ? option.label : option.value
      }
      return String(option)
    }

    const isOptionDisabled = (option) => {
      if (typeof option === 'object' && option !== null) {
        return option.disabled === true
      }
      return false
    }

    const isSelected = (option) => {
      const value = getOptionValue(option)

      if (props.multiple) {
        return Array.isArray(props.modelValue) && props.modelValue.includes(value)
      }

      return props.modelValue === value
    }

    const handleInputChange = (value) => {
      inputValue.value = value
      isOpen.value = true
      highlightedIndex.value = -1

      if (props.filterMode === 'async') {
        // Debounce async search
        clearTimeout(debounceTimer.value)
        debounceTimer.value = setTimeout(() => {
          emit('search', value)
        }, props.debounce)
      }

      if (!props.multiple && !value) {
        emit('update:modelValue', null)
      }
    }

    const selectOption = (option) => {
      if (isOptionDisabled(option)) return

      const value = getOptionValue(option)

      if (props.multiple) {
        let newValue = Array.isArray(props.modelValue) ? [...props.modelValue] : []

        const index = newValue.indexOf(value)
        if (index > -1) {
          newValue.splice(index, 1)
          emit('remove', option)
        } else {
          newValue.push(value)
          emit('select', option)
        }

        emit('update:modelValue', newValue)
        inputValue.value = '' // Clear input after selection
      } else {
        inputValue.value = getOptionLabel(option)
        emit('update:modelValue', value)
        emit('select', option)
        closeDropdown()
      }
    }

    const removeOption = (option) => {
      if (!props.multiple) return

      const value = getOptionValue(option)
      const newValue = (Array.isArray(props.modelValue) ? props.modelValue : [])
        .filter(v => v !== value)

      emit('update:modelValue', newValue)
      emit('remove', option)
    }

    const selectHighlightedOption = () => {
      if (highlightedIndex.value >= 0 && filteredOptions.value.length > 0) {
        selectOption(filteredOptions.value[highlightedIndex.value])
      }
    }

    const navigateOptions = (direction) => {
      if (!isOpen.value) {
        isOpen.value = true
        return
      }

      const optionsLength = filteredOptions.value.length
      if (optionsLength === 0) return

      if (direction === 'down') {
        highlightedIndex.value = (highlightedIndex.value + 1) % optionsLength
      } else if (direction === 'up') {
        highlightedIndex.value = highlightedIndex.value <= 0
          ? optionsLength - 1
          : highlightedIndex.value - 1
      }

      scrollToHighlighted()
    }

    const scrollToHighlighted = () => {
      nextTick(() => {
        const container = optionsContainer.value
        if (!container) return

        const highlightedElement = container.querySelector('.is-highlighted')
        if (highlightedElement) {
          highlightedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
        }
      })
    }

    const closeDropdown = () => {
      isOpen.value = false
      highlightedIndex.value = -1
    }

    const handleClear = () => {
      inputValue.value = ''
      emit('update:modelValue', props.multiple ? [] : null)
      isOpen.value = false
    }

    const handleFocus = (event) => {
      emit('focus', event)
    }

    const handleBlur = (event) => {
      emit('blur', event)
    }

    // Watchers
    watch(isOpen, (newVal) => {
      if (newVal) {
        nextTick(() => {
          update()
        })
      }
    })

    watch(() => props.options, () => {
      if (isOpen.value) {
        nextTick(() => {
          update()
        })
      }
    })

    // Click outside directive
    const clickOutside = {
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

    return {
      inputRef,
      dropdownRef,
      optionsContainer,
      inputValue,
      isOpen,
      highlightedIndex,
      wrapperClasses,
      isLoading,
      selectedOptions,
      filteredOptions,
      shouldShowDropdown,
      inputProps,
      floatingStyles,
      getOptionValue,
      getOptionLabel,
      isOptionDisabled,
      isSelected,
      handleInputChange,
      selectOption,
      removeOption,
      selectHighlightedOption,
      navigateOptions,
      closeDropdown,
      handleClear,
      handleFocus,
      handleBlur,
      clickOutside
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
  }
}
</script>

<style lang="stylus" scoped>
// ========================================
// WRAPPER
// ========================================
.altrex-autocomplete-wrapper
  position: relative
  display: flex
  flex-direction: column
  gap: $altrex-spacing-2
  width: 100%

// ========================================
// INPUT
// ========================================
.altrex-autocomplete-input-wrapper
  position: relative
  width: 100%

.altrex-autocomplete-icons
  display: flex
  align-items: center
  gap: $altrex-spacing-2

.altrex-autocomplete-clear
  display: flex
  align-items: center
  justify-content: center
  padding: 0
  background: transparent
  border: none
  cursor: pointer
  color: var(--altrex-colors-neutral-500)
  transition: color 0.2s ease

  // Mobile: touch target
  touch-target('minimum')

  +above('md')
    width: 20px
    height: 20px
    min-width: auto
    min-height: auto

  &:hover
    color: var(--altrex-colors-neutral-700)

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-primary)

  :deep(.altrex-icon)
    altrex-icon-s()

// ========================================
// CHIPS (Multi-select)
// ========================================
.altrex-autocomplete-chips
  display: flex
  flex-wrap: wrap
  gap: $altrex-spacing-2

.altrex-autocomplete-chip
  display: inline-flex
  align-items: center
  gap: $altrex-spacing-2
  padding: $altrex-spacing-2 $altrex-spacing-3
  background: var(--altrex-colors-primary-100)
  color: var(--altrex-colors-primary-700)
  border-radius: $altrex-borderRadius-default
  font-size: $altrex-fontSize-sm

  // Mobile: larger for touch
  min-height: 32px

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-subtle)
    color: var(--altrex-colors-dark-text-primary)

.altrex-autocomplete-chip-label
  line-height: 1

.altrex-autocomplete-chip-remove
  display: flex
  align-items: center
  justify-content: center
  padding: 0
  background: transparent
  border: none
  cursor: pointer
  color: currentColor
  opacity: 0.7
  transition: opacity 0.2s ease

  // Mobile: touch target
  width: 20px
  height: 20px

  &:hover
    opacity: 1

  :deep(.altrex-icon)
    altrex-icon-s()

// ========================================
// DROPDOWN
// ========================================
.altrex-autocomplete-dropdown
  position: absolute
  z-index: 1000
  background: var(--altrex-colors-neutral-50)
  border: 1px solid var(--altrex-colors-neutral-200)
  border-radius: $altrex-borderRadius-default
  box-shadow: $altrex-shadow-md
  overflow: hidden

  // Mobile: full width with margins
  min-width: calc(100vw - $altrex-spacing-4)

  +above('md')
    min-width: 200px

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-elevated)
    border-color: var(--altrex-colors-dark-border-default)
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5)

.altrex-autocomplete-options
  max-height: 300px
  overflow-y: auto

.altrex-autocomplete-option
  display: flex
  align-items: center
  gap: $altrex-spacing-3
  padding: $altrex-spacing-3 $altrex-spacing-4
  cursor: pointer
  transition: background 0.15s ease
  color: var(--altrex-colors-neutral-700)

  // Mobile: large touch target
  min-height: $altrex-touchTarget-minimum

  +above('md')
    min-height: 40px

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-secondary)

  &.is-highlighted,
  &:hover
    background: var(--altrex-colors-neutral-100)

    [data-theme="dark"] &
      background: var(--altrex-colors-dark-bg-hover)

  &.is-selected
    color: var(--altrex-colors-primary-600)
    font-weight: $altrex-fontWeight-medium

    [data-theme="dark"] &
      color: var(--altrex-colors-primary-400)

  &.is-disabled
    opacity: 0.5
    cursor: not-allowed

.altrex-autocomplete-checkbox,
.altrex-autocomplete-check
  flex-shrink: 0
  display: flex
  align-items: center

  :deep(.altrex-icon)
    altrex-icon-s()

.altrex-autocomplete-empty,
.altrex-autocomplete-loading
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  padding: $altrex-spacing-6
  color: var(--altrex-colors-neutral-500)
  text-align: center

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-tertiary)

.altrex-autocomplete-empty-content
  display: flex
  flex-direction: column
  align-items: center
  gap: $altrex-spacing-2

  p
    margin: 0
    font-size: $altrex-fontSize-sm

// ========================================
// TRANSITIONS
// ========================================
.dropdown-enter-active,
.dropdown-leave-active
  transition: opacity 0.15s ease, transform 0.15s ease

.dropdown-enter-from,
.dropdown-leave-to
  opacity: 0
  transform: translateY(-4px)
</style>
