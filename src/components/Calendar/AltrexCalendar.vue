<template>
  <div
    class="altrex-calendar"
    :class="[
      `altrex-calendar--${variant}`,
      `altrex-calendar--${size}`
    ]"
  >
    <!-- Header -->
    <div class="altrex-calendar__header">
      <AltrexButton
        :left-icon="'generic-chevron-left'"
        variant="ghost"
        size="s"
        aria-label="Previous month"
        @click="previousMonth"
      />
      <div class="altrex-calendar__header-title">
        {{ monthYearLabel }}
      </div>
      <AltrexButton
        :left-icon="'generic-chevron-right'"
        variant="ghost"
        size="s"
        aria-label="Next month"
        @click="nextMonth"
      />
    </div>

    <!-- Weekday Headers -->
    <div class="altrex-calendar__weekdays">
      <div
        v-for="day in weekdayLabels"
        :key="day"
        class="altrex-calendar__weekday"
      >
        {{ day }}
      </div>
    </div>

    <!-- Days Grid -->
    <div class="altrex-calendar__days">
      <button
        v-for="day in calendarDays"
        :key="day.key"
        type="button"
        class="altrex-calendar__day"
        :class="{
          'altrex-calendar__day--today': day.isToday,
          'altrex-calendar__day--selected': day.isSelected,
          'altrex-calendar__day--in-range': day.isInRange,
          'altrex-calendar__day--range-start': day.isRangeStart,
          'altrex-calendar__day--range-end': day.isRangeEnd,
          'altrex-calendar__day--disabled': day.isDisabled,
          'altrex-calendar__day--other-month': day.isOtherMonth,
          'altrex-calendar__day--weekend': day.isWeekend,
          'altrex-calendar__day--has-event': day.hasEvent
        }"
        :disabled="day.isDisabled"
        :aria-label="day.ariaLabel"
        :aria-selected="day.isSelected"
        @click="selectDay(day)"
      >
        <span class="altrex-calendar__day-number">{{ day.dayNumber }}</span>
        <span v-if="day.hasEvent" class="altrex-calendar__day-indicator"></span>
      </button>
    </div>

    <!-- Today Button -->
    <div v-if="showTodayButton" class="altrex-calendar__footer">
      <AltrexButton
        label="Today"
        variant="ghost"
        size="s"
        @click="goToToday"
      />
    </div>
  </div>
</template>

<script>
import AltrexButton from '@/components/Button/AltrexButton.vue'

export default {
  name: 'AltrexCalendar',
  components: {
    AltrexButton
  },
  props: {
    modelValue: {
      type: [Date, Array],
      default: null
    },
    mode: {
      type: String,
      default: 'single',
      validator: (value) => ['single', 'multiple', 'range'].includes(value)
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'success', 'warning', 'danger', 'info'].includes(value)
    },
    size: {
      type: String,
      default: 'm',
      validator: (value) => ['s', 'm', 'l'].includes(value)
    },
    events: {
      type: Array,
      default: () => []
    },
    minDate: {
      type: Date,
      default: null
    },
    maxDate: {
      type: Date,
      default: null
    },
    disabledDates: {
      type: Array,
      default: () => []
    },
    weekStartsOn: {
      type: Number,
      default: 0,
      validator: (value) => value === 0 || value === 1
    },
    showTodayButton: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      rangeStart: null
    }
  },
  computed: {
    monthYearLabel() {
      const date = new Date(this.currentYear, this.currentMonth)
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    },
    weekdayLabels() {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      if (this.weekStartsOn === 1) {
        return [...days.slice(1), days[0]]
      }
      return days
    },
    calendarDays() {
      const days = []
      const firstDay = new Date(this.currentYear, this.currentMonth, 1)
      const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      let startDay = firstDay.getDay() - this.weekStartsOn
      if (startDay < 0) startDay += 7

      const prevMonthLastDay = new Date(this.currentYear, this.currentMonth, 0)
      for (let i = startDay - 1; i >= 0; i--) {
        const date = new Date(this.currentYear, this.currentMonth - 1, prevMonthLastDay.getDate() - i)
        days.push(this.createDayObject(date, true))
      }

      for (let i = 1; i <= lastDay.getDate(); i++) {
        const date = new Date(this.currentYear, this.currentMonth, i)
        days.push(this.createDayObject(date, false))
      }

      const remainingDays = 42 - days.length
      for (let i = 1; i <= remainingDays; i++) {
        const date = new Date(this.currentYear, this.currentMonth + 1, i)
        days.push(this.createDayObject(date, true))
      }

      return days
    }
  },
  methods: {
    createDayObject(date, isOtherMonth) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const dateTime = date.getTime()
      const todayTime = today.getTime()

      return {
        date,
        key: date.toISOString(),
        dayNumber: date.getDate(),
        isToday: dateTime === todayTime,
        isOtherMonth,
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
        isDisabled: this.isDateDisabled(date),
        isSelected: this.isDateSelected(date),
        isInRange: this.isDateInRange(date),
        isRangeStart: this.isRangeStart(date),
        isRangeEnd: this.isRangeEnd(date),
        hasEvent: this.hasEvent(date),
        ariaLabel: date.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }
    },
    isDateDisabled(date) {
      const dateTime = new Date(date).setHours(0, 0, 0, 0)

      if (this.minDate && dateTime < new Date(this.minDate).setHours(0, 0, 0, 0)) {
        return true
      }

      if (this.maxDate && dateTime > new Date(this.maxDate).setHours(0, 0, 0, 0)) {
        return true
      }

      // Check if disabledDates exists and is an array
      if (!this.disabledDates || !Array.isArray(this.disabledDates)) {
        return false
      }

      return this.disabledDates.some(disabledDate => {
        return new Date(disabledDate).setHours(0, 0, 0, 0) === dateTime
      })
    },
    isDateSelected(date) {
      if (!this.modelValue) return false
      const dateTime = new Date(date).setHours(0, 0, 0, 0)

      if (this.mode === 'single') {
        return new Date(this.modelValue).setHours(0, 0, 0, 0) === dateTime
      }

      if (this.mode === 'multiple' && Array.isArray(this.modelValue)) {
        return this.modelValue.some(d => new Date(d).setHours(0, 0, 0, 0) === dateTime)
      }

      if (this.mode === 'range' && Array.isArray(this.modelValue) && this.modelValue.length === 2) {
        const start = new Date(this.modelValue[0]).setHours(0, 0, 0, 0)
        const end = new Date(this.modelValue[1]).setHours(0, 0, 0, 0)
        return dateTime === start || dateTime === end
      }

      return false
    },
    isDateInRange(date) {
      if (this.mode !== 'range' || !Array.isArray(this.modelValue) || this.modelValue.length !== 2) {
        return false
      }

      const dateTime = new Date(date).setHours(0, 0, 0, 0)
      const start = new Date(this.modelValue[0]).setHours(0, 0, 0, 0)
      const end = new Date(this.modelValue[1]).setHours(0, 0, 0, 0)

      return dateTime > start && dateTime < end
    },
    isRangeStart(date) {
      if (this.mode !== 'range' || !Array.isArray(this.modelValue) || this.modelValue.length === 0) {
        return false
      }

      const dateTime = new Date(date).setHours(0, 0, 0, 0)
      const start = new Date(this.modelValue[0]).setHours(0, 0, 0, 0)
      return dateTime === start
    },
    isRangeEnd(date) {
      if (this.mode !== 'range' || !Array.isArray(this.modelValue) || this.modelValue.length !== 2) {
        return false
      }

      const dateTime = new Date(date).setHours(0, 0, 0, 0)
      const end = new Date(this.modelValue[1]).setHours(0, 0, 0, 0)
      return dateTime === end
    },
    hasEvent(date) {
      if (!this.events || this.events.length === 0) return false

      const dateTime = new Date(date).setHours(0, 0, 0, 0)
      return this.events.some(event => {
        const eventDate = new Date(event.date || event).setHours(0, 0, 0, 0)
        return eventDate === dateTime
      })
    },
    selectDay(day) {
      if (day.isDisabled) return

      const date = new Date(day.date)
      this.$emit('day-click', date)

      if (this.mode === 'single') {
        this.$emit('update:modelValue', date)
      } else if (this.mode === 'multiple') {
        const selected = Array.isArray(this.modelValue) ? [...this.modelValue] : []
        const dateTime = date.setHours(0, 0, 0, 0)
        const index = selected.findIndex(d => new Date(d).setHours(0, 0, 0, 0) === dateTime)

        if (index > -1) {
          selected.splice(index, 1)
        } else {
          selected.push(date)
        }

        this.$emit('update:modelValue', selected)
      } else if (this.mode === 'range') {
        if (!this.rangeStart || (Array.isArray(this.modelValue) && this.modelValue.length === 2)) {
          this.rangeStart = date
          this.$emit('update:modelValue', [date])
        } else {
          const start = this.rangeStart
          const end = date
          this.$emit('update:modelValue', start <= end ? [start, end] : [end, start])
          this.rangeStart = null
        }
      }
    },
    previousMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11
        this.currentYear--
      } else {
        this.currentMonth--
      }
      this.$emit('month-change', { month: this.currentMonth, year: this.currentYear })
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0
        this.currentYear++
      } else {
        this.currentMonth++
      }
      this.$emit('month-change', { month: this.currentMonth, year: this.currentYear })
    },
    goToToday() {
      const today = new Date()
      this.currentMonth = today.getMonth()
      this.currentYear = today.getFullYear()

      if (this.mode === 'single') {
        this.$emit('update:modelValue', today)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.altrex-calendar
  background: var(--altrex-colors-neutral-50)
  border: 1px solid var(--altrex-colors-neutral-200)
  border-radius: $altrex-borderRadius-lg
  padding: $altrex-spacing-4
  width: 100%
  min-width: 280px
  max-width: 360px
  user-select: none

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-elevated)
    border-color: var(--altrex-colors-dark-border-subtle)

  &--s
    font-size: $altrex-fontSize-xs

  &--m
    font-size: $altrex-fontSize-sm

  &--l
    font-size: $altrex-fontSize-md

  &--primary
    --altrex-calendar-color $altrex-colors-primary-500
    --altrex-calendar-color-hover $altrex-colors-primary-600

  &--success
    --altrex-calendar-color $altrex-colors-success-500
    --altrex-calendar-color-hover $altrex-colors-success-600

  &--warning
    --altrex-calendar-color $altrex-colors-warning-500
    --altrex-calendar-color-hover $altrex-colors-warning-600

  &--danger
    --altrex-calendar-color $altrex-colors-danger-500
    --altrex-calendar-color-hover $altrex-colors-danger-600

  &--info
    --altrex-calendar-color $altrex-colors-info-500
    --altrex-calendar-color-hover $altrex-colors-info-600

.altrex-calendar__header
  display: flex
  align-items: center
  justify-content: space-between
  margin-bottom: $altrex-spacing-4
  gap: $altrex-spacing-2

.altrex-calendar__header-title
  font-size: $altrex-fontSize-lg
  font-weight: $altrex-fontWeight-semibold
  color: var(--altrex-colors-neutral-900)
  flex: 1
  text-align: center

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-primary)

.altrex-calendar__weekdays
  display: grid
  grid-template-columns: repeat(7, 1fr)
  gap: 2px
  margin-bottom: $altrex-spacing-2

.altrex-calendar__weekday
  text-align: center
  font-size: $altrex-fontSize-xs
  font-weight: $altrex-fontWeight-semibold
  color: var(--altrex-colors-neutral-600)
  padding: $altrex-spacing-2

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-tertiary)

  .altrex-calendar--s &
    padding: $altrex-spacing-1

  .altrex-calendar--l &
    padding: $altrex-spacing-3

.altrex-calendar__days
  display: grid
  grid-template-columns: repeat(7, 1fr)
  gap: 2px

.altrex-calendar__day
  aspect-ratio: 1
  border: none
  background: transparent
  border-radius: $altrex-borderRadius-default
  cursor: pointer
  position: relative
  display: flex
  align-items: center
  justify-content: center
  color: var(--altrex-colors-neutral-900)
  font-weight: $altrex-fontWeight-medium
  transition: all $altrex-transition-default
  padding: $altrex-spacing-2

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-primary)

  .altrex-calendar--s &
    min-width: 36px
    font-size: $altrex-fontSize-xs

  .altrex-calendar--m &
    min-width: 44px
    font-size: $altrex-fontSize-sm

  .altrex-calendar--l &
    min-width: 52px
    font-size: $altrex-fontSize-md

  &:hover:not(&--disabled)
    background: var(--altrex-colors-neutral-100)

    [data-theme="dark"] &
      background: var(--altrex-colors-dark-bg-hover)

  &--other-month
    color: var(--altrex-colors-neutral-400)

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-border-default)

  &--weekend
    color: var(--altrex-colors-neutral-700)

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-400)

  &--today
    font-weight: $altrex-fontWeight-bold
    background: var(--altrex-colors-neutral-100)

    [data-theme="dark"] &
      background: var(--altrex-colors-dark-bg-hover)

  &--selected
    background: var(--altrex-calendar-color)
    color: var(--altrex-colors-neutral-50)
    font-weight: $altrex-fontWeight-semibold

    &:hover:not(&--disabled)
      background: var(--altrex-calendar-color-hover)

  &--in-range
    background: var(--altrex-colors-primary-100)
    border-radius: 0

    [data-theme="dark"] &
      background: var(--altrex-colors-primary-900)

  &--range-start
    border-top-left-radius: $altrex-borderRadius-default
    border-bottom-left-radius: $altrex-borderRadius-default
    border-top-right-radius: 0
    border-bottom-right-radius: 0

  &--range-end
    border-top-right-radius: $altrex-borderRadius-default
    border-bottom-right-radius: $altrex-borderRadius-default
    border-top-left-radius: 0
    border-bottom-left-radius: 0

  &--disabled
    color: var(--altrex-colors-neutral-300)
    cursor: not-allowed
    opacity: 0.5

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-border-subtle)

  &--has-event
    .altrex-calendar__day-indicator
      display: block

.altrex-calendar__day-number
  position: relative
  z-index: 1

.altrex-calendar__day-indicator
  display: none
  position: absolute
  bottom: 4px
  width: 4px
  height: 4px
  border-radius: 50%
  background: var(--altrex-calendar-color)

  .altrex-calendar__day--selected &
    background: var(--altrex-colors-neutral-50)

  .altrex-calendar--s &
    width: 3px
    height: 3px
    bottom: 2px

  .altrex-calendar--l &
    width: 5px
    height: 5px
    bottom: 6px

.altrex-calendar__footer
  margin-top: $altrex-spacing-4
  display: flex
  justify-content: center
</style>
