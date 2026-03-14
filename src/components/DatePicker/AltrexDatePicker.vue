<template>
  <div class="altrex-datepicker-wrapper" v-click-outside="closeDropdown">
    <!-- Input Field -->
    <AltrexInput
      :model-value="displayValue"
      v-bind="inputProps"
      :label="label"
      :placeholder="placeholder"
      :size="size"
      :disabled="disabled"
      :error="error"
      :readonly="true"
      @click="toggleDropdown"
      @keydown.esc="closeDropdown"
      ref="inputRef"
    >
      <template #suffix>
        <div class="altrex-datepicker-icons">
          <button
            v-if="clearable && displayValue"
            type="button"
            class="altrex-datepicker-clear"
            @click.stop="handleClear"
            @mousedown.prevent
            tabindex="-1"
            aria-label="Clear date"
          >
            <AltrexIcon icon="generic-x" size="s" />
          </button>
          <AltrexIcon v-else icon="generic-calendar" size="s" class="altrex-datepicker-icon" />
        </div>
      </template>
    </AltrexInput>

    <!-- Calendar Dropdown -->
    <Teleport to="body">
      <Transition name="dropdown">
        <div
          v-if="isOpen"
          ref="dropdownRef"
          class="altrex-datepicker-dropdown"
          :style="floatingStyles"
        >
          <!-- Calendar -->
          <AltrexCalendar
            :model-value="calendarValue"
            :mode="mode"
            :min-date="minDate"
            :max-date="maxDate"
            :disabled-dates="disabledDates"
            :first-day-of-week="firstDayOfWeek"
            :show-week-numbers="showWeekNumbers"
            :show-today-button="false"
            :color="calendarColor"
            @update:modelValue="handleCalendarChange"
          />

          <!-- Footer -->
          <div class="altrex-datepicker-footer">
            <AltrexButton
              v-if="showTodayButton"
              label="Today"
              size="s"
              variant="ghost"
              @click="selectToday"
            />
            <AltrexButton
              v-if="mode !== 'single' || !closeOnSelect"
              label="Done"
              size="s"
              @click="closeDropdown"
            />
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
import AltrexCalendar from '../Calendar/AltrexCalendar.vue'
import AltrexButton from '../Button/AltrexButton.vue'
import { useFloating, offset, flip, shift } from '@altrex-ui/floating'
import { formatDate, formatDateRange, getToday, isDateInRange, isDateDisabled, isSameDay } from '@/utils/dateFormat'

let datePickerIdCounter = 0

export default {
  name: 'AltrexDatePicker',

  components: {
    AltrexInput,
    AltrexIcon,
    AltrexCalendar,
    AltrexButton
  },

  props: {
    /**
     * v-model value (Date, Date[], or {start, end})
     */
    modelValue: {
      type: [Date, Array, Object],
      default: null
    },
    /**
     * Selection mode
     */
    mode: {
      type: String,
      default: 'single',
      validator: (value) => ['single', 'multiple', 'range'].includes(value)
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
      default: 'Select date...'
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
     * Error message
     */
    error: {
      type: String,
      default: ''
    },
    /**
     * Minimum selectable date
     */
    minDate: {
      type: Date,
      default: null
    },
    /**
     * Maximum selectable date
     */
    maxDate: {
      type: Date,
      default: null
    },
    /**
     * Disabled dates (array or function)
     */
    disabledDates: {
      type: [Array, Function],
      default: null
    },
    /**
     * Disabled days of week (0=Sunday)
     */
    disabledDaysOfWeek: {
      type: Array,
      default: null
    },
    /**
     * Date format string
     */
    format: {
      type: String,
      default: 'MM/DD/YYYY'
    },
    /**
     * First day of week (0=Sunday, 1=Monday)
     */
    firstDayOfWeek: {
      type: Number,
      default: 0,
      validator: (value) => value >= 0 && value <= 6
    },
    /**
     * Show week numbers
     */
    showWeekNumbers: {
      type: Boolean,
      default: false
    },
    /**
     * Clearable input
     */
    clearable: {
      type: Boolean,
      default: true
    },
    /**
     * Close on date select (single mode only)
     */
    closeOnSelect: {
      type: Boolean,
      default: true
    },
    /**
     * Show "Today" button
     */
    showTodayButton: {
      type: Boolean,
      default: true
    },
    /**
     * Calendar color
     */
    calendarColor: {
      type: String,
      default: 'primary'
    }
  },

  emits: ['update:modelValue', 'select', 'clear', 'open', 'close'],

  setup(props, { emit }) {
    // Refs
    const inputRef = ref(null)
    const dropdownRef = ref(null)

    // State
    const datePickerId = `altrex-datepicker-${++datePickerIdCounter}`
    const isOpen = ref(false)

    // Floating UI
    const { floatingStyles, update } = useFloating(
      computed(() => inputRef.value?.$el),
      dropdownRef,
      {
        placement: 'bottom-start',
        middleware: [
          offset(4),
          flip({
            fallbackPlacements: ['top-start', 'bottom-end', 'top-end']
          }),
          shift({ padding: 8 })
        ]
      }
    )

    // Computed
    const calendarValue = computed(() => {
      if (props.mode === 'range' && props.modelValue) {
        return {
          start: props.modelValue.start || null,
          end: props.modelValue.end || null
        }
      }
      return props.modelValue
    })

    const displayValue = computed(() => {
      if (!props.modelValue) return ''

      if (props.mode === 'single' && props.modelValue instanceof Date) {
        return formatDate(props.modelValue, props.format)
      }

      if (props.mode === 'multiple' && Array.isArray(props.modelValue)) {
        if (props.modelValue.length === 0) return ''
        if (props.modelValue.length === 1) return formatDate(props.modelValue[0], props.format)
        return `${props.modelValue.length} dates selected`
      }

      if (props.mode === 'range' && props.modelValue.start) {
        return formatDateRange(props.modelValue.start, props.modelValue.end, props.format)
      }

      return ''
    })

    const inputProps = computed(() => ({
      id: datePickerId,
      role: 'combobox',
      'aria-expanded': isOpen.value,
      'aria-haspopup': 'dialog'
    }))

    // Methods
    const toggleDropdown = () => {
      if (props.disabled) return
      isOpen.value = !isOpen.value

      if (isOpen.value) {
        nextTick(() => {
          update()
          emit('open')
        })
      } else {
        emit('close')
      }
    }

    const closeDropdown = () => {
      if (isOpen.value) {
        isOpen.value = false
        emit('close')
      }
    }

    const handleCalendarChange = (value) => {
      // Validate date(s)
      let validatedValue = value

      if (props.mode === 'single' && value instanceof Date) {
        if (!isDateInRange(value, props.minDate, props.maxDate)) return
        if (isDateDisabled(value, props.disabledDates, props.disabledDaysOfWeek)) return
      } else if (props.mode === 'multiple' && Array.isArray(value)) {
        validatedValue = value.filter(date =>
          isDateInRange(date, props.minDate, props.maxDate) &&
          !isDateDisabled(date, props.disabledDates, props.disabledDaysOfWeek)
        )
      } else if (props.mode === 'range' && value.start) {
        if (!isDateInRange(value.start, props.minDate, props.maxDate)) return
        if (value.end && !isDateInRange(value.end, props.minDate, props.maxDate)) return
      }

      emit('update:modelValue', validatedValue)
      emit('select', validatedValue)

      // Close dropdown for single mode
      if (props.mode === 'single' && props.closeOnSelect) {
        closeDropdown()
      }
    }

    const handleClear = () => {
      let clearedValue
      if (props.mode === 'single') {
        clearedValue = null
      } else if (props.mode === 'multiple') {
        clearedValue = []
      } else if (props.mode === 'range') {
        clearedValue = { start: null, end: null }
      }

      emit('update:modelValue', clearedValue)
      emit('clear')
      closeDropdown()
    }

    const selectToday = () => {
      const today = getToday()

      // Check if today is valid
      if (!isDateInRange(today, props.minDate, props.maxDate)) return
      if (isDateDisabled(today, props.disabledDates, props.disabledDaysOfWeek)) return

      if (props.mode === 'single') {
        emit('update:modelValue', today)
        emit('select', today)
        if (props.closeOnSelect) {
          closeDropdown()
        }
      } else if (props.mode === 'multiple') {
        const current = Array.isArray(props.modelValue) ? props.modelValue : []
        const hasToday = current.some(date => isSameDay(date, today))

        if (!hasToday) {
          emit('update:modelValue', [...current, today])
          emit('select', [...current, today])
        }
      } else if (props.mode === 'range') {
        emit('update:modelValue', { start: today, end: null })
        emit('select', { start: today, end: null })
      }
    }

    // Watchers
    watch(isOpen, (newVal) => {
      if (newVal) {
        nextTick(() => {
          update()
        })
      }
    })

    return {
      inputRef,
      dropdownRef,
      isOpen,
      calendarValue,
      displayValue,
      inputProps,
      floatingStyles,
      toggleDropdown,
      closeDropdown,
      handleCalendarChange,
      handleClear,
      selectToday
    }
  },

  directives: {
    clickOutside: {
      mounted(el, binding) {
        const component = binding.instance
        el.clickOutsideEvent = function(event) {
          if (!(el === event.target || el.contains(event.target))) {
            // Check if click is on the dropdown (which is teleported)
            const dropdownEl = component.dropdownRef
            if (!dropdownEl || !dropdownEl.contains(event.target)) {
              binding.value()
            }
          }
        }
        document.addEventListener('click', el.clickOutsideEvent)
      },
      unmounted(el) {
        if (el.clickOutsideEvent) {
          document.removeEventListener('click', el.clickOutsideEvent)
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
// ========================================
// WRAPPER
// ========================================
.altrex-datepicker-wrapper
  position: relative
  width: 100%

// ========================================
// INPUT ICONS
// ========================================
.altrex-datepicker-icons
  display: flex
  align-items: center
  gap: $altrex-spacing-2

.altrex-datepicker-icon
  color: var(--altrex-colors-neutral-500)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-tertiary)

.altrex-datepicker-clear
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
// DROPDOWN
// ========================================
.altrex-datepicker-dropdown
  position: absolute
  z-index: 1000
  background: var(--altrex-colors-neutral-50)
  border-radius: $altrex-borderRadius-lg
  box-shadow: $altrex-shadow-xl
  overflow: hidden
  display: flex
  flex-direction: column
  width: fit-content

  // Mobile: full width with margins
  max-width: calc(100vw - $altrex-spacing-4)

  +above('md')
    max-width: none

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-elevated)
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5)

  // Remove duplicate border/shadow from calendar when inside dropdown
  :deep(.altrex-calendar)
    border: none
    box-shadow: none
    border-radius: 0
    margin: 0

// ========================================
// FOOTER
// ========================================
.altrex-datepicker-footer
  display: flex
  gap: $altrex-spacing-2
  justify-content: space-between
  padding: $altrex-spacing-3
  border-top: 1px solid var(--altrex-colors-neutral-200)
  background: var(--altrex-colors-neutral-50)

  [data-theme="dark"] &
    border-color: var(--altrex-colors-dark-border-subtle)
    background: var(--altrex-colors-dark-bg-subtle)

// ========================================
// TRANSITIONS
// ========================================
.dropdown-enter-active,
.dropdown-leave-active
  transition: opacity 0.2s ease, transform 0.2s ease

.dropdown-enter-from,
.dropdown-leave-to
  opacity: 0
  transform: translateY(-8px)
</style>
