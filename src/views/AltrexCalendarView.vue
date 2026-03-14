<template>
  <div class="demo-view">
    <h1>AltrexCalendar</h1>
    <p class="subtitle">Date picker and calendar for workout scheduling</p>

    <section class="demo-section">
      <h2>Single Date Selection</h2>
      <p class="description">Select a single date</p>
      <div class="demo-grid">
        <div class="demo-item">
          <AltrexCalendar v-model="singleDate" mode="single" />
          <div class="demo-output">
            Selected: <strong>{{ formatDate(singleDate) }}</strong>
          </div>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Multiple Date Selection</h2>
      <p class="description">Select multiple dates for recurring workouts</p>
      <div class="demo-grid">
        <div class="demo-item">
          <AltrexCalendar v-model="multipleDates" mode="multiple" />
          <div class="demo-output">
            Selected {{ multipleDates.length }} dates:
            <ul v-if="multipleDates.length > 0">
              <li v-for="date in multipleDates" :key="date.toString()">
                {{ formatDate(date) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Date Range Selection</h2>
      <p class="description">Select a date range for workout programs or tracking periods</p>
      <div class="demo-grid">
        <div class="demo-item">
          <AltrexCalendar v-model="dateRange" mode="range" />
          <div class="demo-output">
            <div v-if="dateRange && dateRange.length === 2">
              From: <strong>{{ formatDate(dateRange[0]) }}</strong><br>
              To: <strong>{{ formatDate(dateRange[1]) }}</strong><br>
              Duration: <strong>{{ calculateDaysBetween(dateRange[0], dateRange[1]) }} days</strong>
            </div>
            <div v-else>
              Click start date, then end date
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Sizes</h2>
      <p class="description">Three size variants for different contexts</p>
      <div class="demo-grid demo-grid--sizes">
        <div class="demo-item">
          <AltrexCalendar size="s" v-model="sizeDemo" />
          <span class="demo-label">Small (s)</span>
        </div>
        <div class="demo-item">
          <AltrexCalendar size="m" v-model="sizeDemo" />
          <span class="demo-label">Medium (m) - Default</span>
        </div>
        <div class="demo-item">
          <AltrexCalendar size="l" v-model="sizeDemo" />
          <span class="demo-label">Large (l)</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Variants</h2>
      <p class="description">Color variants to match different contexts</p>
      <div class="demo-grid demo-grid--variants">
        <div class="demo-item">
          <AltrexCalendar variant="primary" v-model="variantDemo1" />
          <span class="demo-label">Primary</span>
        </div>
        <div class="demo-item">
          <AltrexCalendar variant="success" v-model="variantDemo2" />
          <span class="demo-label">Success</span>
        </div>
        <div class="demo-item">
          <AltrexCalendar variant="warning" v-model="variantDemo3" />
          <span class="demo-label">Warning</span>
        </div>
        <div class="demo-item">
          <AltrexCalendar variant="danger" v-model="variantDemo4" />
          <span class="demo-label">Danger</span>
        </div>
        <div class="demo-item">
          <AltrexCalendar variant="info" v-model="variantDemo5" />
          <span class="demo-label">Info</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Events & Workouts</h2>
      <p class="description">Display workout days with event indicators</p>
      <div class="demo-grid">
        <div class="demo-item">
          <AltrexCalendar
            v-model="eventDate"
            :events="workoutDays"
            variant="success"
          />
          <div class="demo-output">
            <div class="event-legend">
              <span class="event-legend__dot"></span>
              Scheduled workout days
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Date Restrictions</h2>
      <p class="description">Limit date selection with min/max dates and disabled dates</p>
      <div class="demo-grid">
        <div class="demo-item">
          <AltrexCalendar
            v-model="restrictedDate"
            :min-date="minDate"
            :max-date="maxDate"
          />
          <div class="demo-output">
            Min: <strong>{{ formatDate(minDate) }}</strong><br>
            Max: <strong>{{ formatDate(maxDate) }}</strong>
          </div>
        </div>
        <div class="demo-item">
          <AltrexCalendar
            v-model="disabledDemo"
            :disabled-dates="disabledDates"
          />
          <div class="demo-output">
            Weekends disabled for this demo
          </div>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Week Start Day</h2>
      <p class="description">Start week on Sunday or Monday</p>
      <div class="demo-grid">
        <div class="demo-item">
          <AltrexCalendar v-model="weekDemo1" :week-starts-on="0" />
          <span class="demo-label">Week starts on Sunday (0)</span>
        </div>
        <div class="demo-item">
          <AltrexCalendar v-model="weekDemo2" :week-starts-on="1" />
          <span class="demo-label">Week starts on Monday (1)</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Without Today Button</h2>
      <p class="description">Hide the today button for cleaner interface</p>
      <div class="demo-grid">
        <div class="demo-item">
          <AltrexCalendar
            v-model="noTodayDemo"
            :show-today-button="false"
          />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Event Handling</h2>
      <p class="description">Respond to calendar events</p>
      <div class="demo-grid">
        <div class="demo-item">
          <AltrexCalendar
            v-model="eventHandlingDate"
            @day-click="handleDayClick"
            @month-change="handleMonthChange"
          />
          <div class="event-log">
            <div class="event-log__title">Event Log:</div>
            <div v-for="(event, index) in eventLog" :key="index" class="event-log__item">
              {{ event }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Practical Example: Workout Schedule</h2>
      <p class="description">Full example with workout planning interface</p>
      <div class="workout-planner">
        <div class="workout-planner__calendar">
          <h3>Select Workout Days</h3>
          <AltrexCalendar
            v-model="workoutSchedule"
            mode="multiple"
            :events="workoutSchedule"
            variant="success"
            size="l"
          />
        </div>
        <div class="workout-planner__details">
          <h3>Scheduled Workouts</h3>
          <div v-if="workoutSchedule.length === 0" class="workout-planner__empty">
            No workouts scheduled. Click dates to add.
          </div>
          <div v-else class="workout-planner__list">
            <div
              v-for="(date, index) in sortedWorkouts"
              :key="date.toString()"
              class="workout-planner__item"
            >
              <div class="workout-planner__date">
                {{ formatDateLong(date) }}
              </div>
              <AltrexButton
                left-icon="generic-trash"
                variant="ghost"
                size="xs"
                aria-label="Remove workout"
                @click="removeWorkout(index)"
              />
            </div>
            <div class="workout-planner__summary">
              <strong>Total: {{ workoutSchedule.length }} workout{{ workoutSchedule.length !== 1 ? 's' : '' }}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Props</h2>
      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>modelValue</code></td>
              <td>Date | Array</td>
              <td>null</td>
              <td>Selected date(s) - use with v-model</td>
            </tr>
            <tr>
              <td><code>mode</code></td>
              <td>String</td>
              <td>'single'</td>
              <td>Selection mode: 'single', 'multiple', 'range'</td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td>String</td>
              <td>'primary'</td>
              <td>Color variant: 'primary', 'success', 'warning', 'danger', 'info'</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>String</td>
              <td>'m'</td>
              <td>Size: 's', 'm', 'l'</td>
            </tr>
            <tr>
              <td><code>events</code></td>
              <td>Array</td>
              <td>[]</td>
              <td>Array of dates or event objects with indicators</td>
            </tr>
            <tr>
              <td><code>minDate</code></td>
              <td>Date</td>
              <td>null</td>
              <td>Minimum selectable date</td>
            </tr>
            <tr>
              <td><code>maxDate</code></td>
              <td>Date</td>
              <td>null</td>
              <td>Maximum selectable date</td>
            </tr>
            <tr>
              <td><code>disabledDates</code></td>
              <td>Array</td>
              <td>[]</td>
              <td>Array of dates to disable</td>
            </tr>
            <tr>
              <td><code>weekStartsOn</code></td>
              <td>Number</td>
              <td>0</td>
              <td>First day of week: 0 (Sunday), 1 (Monday)</td>
            </tr>
            <tr>
              <td><code>showTodayButton</code></td>
              <td>Boolean</td>
              <td>true</td>
              <td>Show/hide "Today" button</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="demo-section">
      <h2>Events</h2>
      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Payload</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>@update:modelValue</code></td>
              <td>Date | Array</td>
              <td>Emitted when date selection changes</td>
            </tr>
            <tr>
              <td><code>@day-click</code></td>
              <td>Date</td>
              <td>Emitted when a day is clicked</td>
            </tr>
            <tr>
              <td><code>@month-change</code></td>
              <td>{ month: Number, year: Number }</td>
              <td>Emitted when month changes</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="demo-section">
      <h2>Features</h2>
      <ul class="feature-list">
        <li>Three selection modes: single, multiple, range</li>
        <li>Event/workout indicators on specific dates</li>
        <li>Today highlighting with bold styling</li>
        <li>Weekend highlighting with distinct colors</li>
        <li>Min/max date restrictions</li>
        <li>Disabled dates support</li>
        <li>Configurable week start day</li>
        <li>Month navigation with arrow buttons</li>
        <li>Quick "Today" button</li>
        <li>Responsive sizing for different contexts</li>
        <li>Dark mode support</li>
        <li>Accessible with ARIA labels</li>
        <li>Keyboard navigation ready</li>
      </ul>
    </section>
  </div>
</template>

<script>
import AltrexCalendar from '../components/Calendar/AltrexCalendar.vue'
import AltrexButton from '../components/Button/AltrexButton.vue'

export default {
  name: 'AltrexCalendarView',
  components: {
    AltrexCalendar,
    AltrexButton
  },
  data() {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)

    const threeMonthsFromNow = new Date(today)
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)

    const workoutDays = []
    for (let i = 1; i <= 30; i += 3) {
      const date = new Date(today.getFullYear(), today.getMonth(), i)
      workoutDays.push(date)
    }

    const disabledDates = []
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    for (let d = new Date(startOfMonth); d <= endOfMonth; d.setDate(d.getDate() + 1)) {
      if (d.getDay() === 0 || d.getDay() === 6) {
        disabledDates.push(new Date(d))
      }
    }

    return {
      singleDate: today,
      multipleDates: [today, tomorrow, nextWeek],
      dateRange: null,
      sizeDemo: today,
      variantDemo1: today,
      variantDemo2: today,
      variantDemo3: today,
      variantDemo4: today,
      variantDemo5: today,
      eventDate: today,
      workoutDays,
      restrictedDate: today,
      minDate: today,
      maxDate: threeMonthsFromNow,
      disabledDemo: today,
      disabledDates,
      weekDemo1: today,
      weekDemo2: today,
      noTodayDemo: today,
      eventHandlingDate: today,
      eventLog: [],
      workoutSchedule: []
    }
  },
  computed: {
    sortedWorkouts() {
      return [...this.workoutSchedule].sort((a, b) => a - b)
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return 'None'
      return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    },
    formatDateLong(date) {
      return new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    },
    calculateDaysBetween(start, end) {
      const diffTime = Math.abs(end - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    },
    handleDayClick(date) {
      this.logEvent(`Day clicked: ${this.formatDate(date)}`)
    },
    handleMonthChange({ month, year }) {
      const monthName = new Date(year, month).toLocaleDateString('en-US', { month: 'long' })
      this.logEvent(`Month changed: ${monthName} ${year}`)
    },
    logEvent(message) {
      const timestamp = new Date().toLocaleTimeString()
      this.eventLog.unshift(`[${timestamp}] ${message}`)
      if (this.eventLog.length > 5) {
        this.eventLog.pop()
      }
    },
    removeWorkout(index) {
      this.workoutSchedule.splice(index, 1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.demo-view
  padding: $altrex-spacing-8
  max-width: 1400px
  margin: 0 auto

h1
  font-size: $altrex-fontSize-4xl
  font-weight: $altrex-fontWeight-bold
  color: var(--altrex-colors-neutral-900)
  margin-bottom: $altrex-spacing-2

  [data-theme="dark"] &
    color: var(--altrex-colors-neutral-100)

.subtitle
  font-size: $altrex-fontSize-lg
  color: var(--altrex-colors-neutral-600)
  margin-bottom: $altrex-spacing-8

  [data-theme="dark"] &
    color: var(--altrex-colors-neutral-400)

.demo-section
  margin-bottom: $altrex-spacing-12

  h2
    font-size: $altrex-fontSize-2xl
    font-weight: $altrex-fontWeight-semibold
    color: var(--altrex-colors-neutral-800)
    margin-bottom: $altrex-spacing-2

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-200)

  .description
    font-size: $altrex-fontSize-md
    color: var(--altrex-colors-neutral-600)
    margin-bottom: $altrex-spacing-6

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-400)

.demo-grid
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr))
  gap: $altrex-spacing-8
  align-items: start

  &--sizes,
  &--variants
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))

.demo-item
  display: flex
  flex-direction: column
  align-items: center
  gap: $altrex-spacing-4

.demo-label
  font-size: $altrex-fontSize-sm
  font-weight: $altrex-fontWeight-medium
  color: var(--altrex-colors-neutral-700)
  text-align: center

  [data-theme="dark"] &
    color: var(--altrex-colors-neutral-300)

.demo-output
  width: 100%
  padding: $altrex-spacing-4
  background: var(--altrex-colors-neutral-100)
  border-radius: $altrex-borderRadius-default
  font-size: $altrex-fontSize-sm
  color: var(--altrex-colors-neutral-700)

  [data-theme="dark"] &
    background: var(--altrex-colors-neutral-900)
    color: var(--altrex-colors-neutral-300)

  strong
    color: var(--altrex-colors-neutral-900)

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-100)

  ul
    margin: $altrex-spacing-2 0 0 $altrex-spacing-4
    padding: 0

.event-legend
  display: flex
  align-items: center
  gap: $altrex-spacing-2

  &__dot
    width: 4px
    height: 4px
    border-radius: 50%
    background: $altrex-colors-success-500

.event-log
  width: 100%
  padding: $altrex-spacing-4
  background: var(--altrex-colors-neutral-100)
  border-radius: $altrex-borderRadius-default
  font-size: $altrex-fontSize-sm
  font-family: monospace

  [data-theme="dark"] &
    background: var(--altrex-colors-neutral-900)

  &__title
    font-weight: $altrex-fontWeight-semibold
    margin-bottom: $altrex-spacing-2
    color: var(--altrex-colors-neutral-800)

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-200)

  &__item
    padding: $altrex-spacing-1 0
    color: var(--altrex-colors-neutral-700)
    border-top: 1px solid var(--altrex-colors-neutral-200)

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-300)
      border-color: var(--altrex-colors-neutral-700)

    &:first-of-type
      border-top: none

.workout-planner
  display: grid
  grid-template-columns: auto 1fr
  gap: $altrex-spacing-8
  padding: $altrex-spacing-6
  background: var(--altrex-colors-neutral-50)
  border-radius: $altrex-borderRadius-lg
  border: 1px solid var(--altrex-colors-neutral-200)

  [data-theme="dark"] &
    background: var(--altrex-colors-neutral-800)
    border-color: var(--altrex-colors-neutral-700)

  @media (max-width: 900px)
    grid-template-columns: 1fr

  h3
    font-size: $altrex-fontSize-lg
    font-weight: $altrex-fontWeight-semibold
    color: var(--altrex-colors-neutral-800)
    margin-bottom: $altrex-spacing-4

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-200)

  &__calendar
    display: flex
    flex-direction: column
    align-items: center

  &__details
    display: flex
    flex-direction: column

  &__empty
    padding: $altrex-spacing-8
    text-align: center
    color: var(--altrex-colors-neutral-500)
    font-style: italic

  &__list
    display: flex
    flex-direction: column
    gap: $altrex-spacing-2

  &__item
    display: flex
    align-items: center
    justify-content: space-between
    padding: $altrex-spacing-3
    background: var(--altrex-colors-neutral-100)
    border-radius: $altrex-borderRadius-default
    transition: all $altrex-transition-default

    [data-theme="dark"] &
      background: var(--altrex-colors-neutral-700)

    &:hover
      background: var(--altrex-colors-neutral-200)

      [data-theme="dark"] &
        background: var(--altrex-colors-neutral-600)

  &__date
    font-size: $altrex-fontSize-sm
    color: var(--altrex-colors-neutral-800)

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-200)

  &__summary
    margin-top: $altrex-spacing-4
    padding-top: $altrex-spacing-4
    border-top: 1px solid var(--altrex-colors-neutral-300)
    text-align: center
    color: var(--altrex-colors-neutral-700)

    [data-theme="dark"] &
      border-color: var(--altrex-colors-neutral-600)
      color: var(--altrex-colors-neutral-300)

.props-table
  overflow-x: auto

  table
    width: 100%
    border-collapse: collapse
    font-size: $altrex-fontSize-sm

    th, td
      text-align: left
      padding: $altrex-spacing-3 $altrex-spacing-4
      border-bottom: 1px solid var(--altrex-colors-neutral-200)

      [data-theme="dark"] &
        border-color: var(--altrex-colors-neutral-700)

    th
      font-weight: $altrex-fontWeight-semibold
      color: var(--altrex-colors-neutral-900)
      background: var(--altrex-colors-neutral-100)

      [data-theme="dark"] &
        color: var(--altrex-colors-neutral-100)
        background: var(--altrex-colors-neutral-800)

    td
      color: var(--altrex-colors-neutral-700)

      [data-theme="dark"] &
        color: var(--altrex-colors-neutral-300)

    code
      padding: 2px 6px
      background: var(--altrex-colors-neutral-100)
      border-radius: $altrex-borderRadius-sm
      font-family: monospace
      font-size: $altrex-fontSize-xs

      [data-theme="dark"] &
        background: var(--altrex-colors-neutral-700)

.feature-list
  list-style: none
  padding: 0
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))
  gap: $altrex-spacing-3

  li
    padding: $altrex-spacing-3
    background: var(--altrex-colors-neutral-50)
    border-radius: $altrex-borderRadius-default
    border-left: 3px solid $altrex-colors-primary-500
    color: var(--altrex-colors-neutral-700)

    [data-theme="dark"] &
      background: var(--altrex-colors-neutral-800)
      color: var(--altrex-colors-neutral-300)

    &::before
      content: '✓'
      color: $altrex-colors-success-500
      font-weight: $altrex-fontWeight-bold
      margin-right: $altrex-spacing-2
</style>
