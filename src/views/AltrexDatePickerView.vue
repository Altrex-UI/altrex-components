<template>
  <div class="datepicker-demo">
    <h1>Altrex Date Picker</h1>
    <p class="subtitle">Calendar-based date selection with single, multiple, and range modes</p>

    <!-- Basic Single Date -->
    <section class="demo-section">
      <h2>Single Date Selection</h2>
      <p class="description">
        Click to open calendar and select a single date. Automatically closes after selection.
      </p>

      <div class="demo-example">
        <AltrexDatePicker
          v-model="singleDate"
          label="Select Date"
          placeholder="Choose a date..."
        />
        <p class="demo-result">Selected: <strong>{{ formatDisplayDate(singleDate) }}</strong></p>
      </div>
    </section>

    <!-- Multiple Dates -->
    <section class="demo-section">
      <h2>Multiple Date Selection</h2>
      <p class="description">
        Select multiple dates. Click to toggle selection. Calendar stays open until you click "Done".
      </p>

      <div class="demo-example">
        <AltrexDatePicker
          v-model="multipleDates"
          mode="multiple"
          label="Select Multiple Dates"
          placeholder="Choose dates..."
        />
        <p class="demo-result">Selected: <strong>{{ multipleDates.length }} dates</strong></p>
        <ul v-if="multipleDates.length > 0" class="date-list">
          <li v-for="(date, index) in multipleDates" :key="index">
            {{ formatDisplayDate(date) }}
          </li>
        </ul>
      </div>
    </section>

    <!-- Date Range -->
    <section class="demo-section">
      <h2>Date Range Selection</h2>
      <p class="description">
        Select a start and end date. Click first date for start, second date for end.
      </p>

      <div class="demo-example">
        <AltrexDatePicker
          v-model="dateRange"
          mode="range"
          label="Select Date Range"
          placeholder="Choose date range..."
        />
        <p class="demo-result">
          <strong>Start:</strong> {{ formatDisplayDate(dateRange.start) }}<br>
          <strong>End:</strong> {{ formatDisplayDate(dateRange.end) }}
        </p>
      </div>
    </section>

    <!-- Date Format -->
    <section class="demo-section">
      <h2>Date Formats</h2>
      <p class="description">
        Customize the date display format.
      </p>

      <div class="demo-group">
        <div class="demo-item">
          <AltrexDatePicker
            v-model="formatMMDDYYYY"
            label="MM/DD/YYYY"
            format="MM/DD/YYYY"
          />
        </div>

        <div class="demo-item">
          <AltrexDatePicker
            v-model="formatDDMMYYYY"
            label="DD/MM/YYYY"
            format="DD/MM/YYYY"
          />
        </div>

        <div class="demo-item">
          <AltrexDatePicker
            v-model="formatYYYYMMDD"
            label="YYYY-MM-DD"
            format="YYYY-MM-DD"
          />
        </div>
      </div>
    </section>

    <!-- Min/Max Dates -->
    <section class="demo-section">
      <h2>Date Constraints (Min/Max)</h2>
      <p class="description">
        Restrict selectable dates to a specific range. Dates outside range are disabled.
      </p>

      <div class="demo-example">
        <AltrexDatePicker
          v-model="constrainedDate"
          :min-date="minDate"
          :max-date="maxDate"
          label="Select Date (Next 30 Days)"
          placeholder="Only next 30 days are selectable..."
        />
        <p class="demo-hint">Only dates from today to 30 days from now can be selected.</p>
      </div>
    </section>

    <!-- Disabled Dates -->
    <section class="demo-section">
      <h2>Disabled Specific Dates</h2>
      <p class="description">
        Disable specific dates or days of the week (e.g., weekends).
      </p>

      <div class="demo-example">
        <AltrexDatePicker
          v-model="noWeekendsDate"
          :disabled-days-of-week="[0, 6]"
          label="Weekdays Only"
          placeholder="Weekends are disabled..."
        />
        <p class="demo-hint">Saturdays and Sundays are disabled.</p>
      </div>
    </section>

    <!-- Size Variants -->
    <section class="demo-section">
      <h2>Sizes</h2>
      <p class="description">
        Three size variants: small, medium (default), and large.
      </p>

      <div class="demo-group">
        <div class="demo-item">
          <AltrexDatePicker
            v-model="sizeSmall"
            label="Small"
            size="s"
          />
        </div>

        <div class="demo-item">
          <AltrexDatePicker
            v-model="sizeMedium"
            label="Medium (Default)"
            size="m"
          />
        </div>

        <div class="demo-item">
          <AltrexDatePicker
            v-model="sizeLarge"
            label="Large"
            size="l"
          />
        </div>
      </div>
    </section>

    <!-- Calendar Options -->
    <section class="demo-section">
      <h2>Calendar Options</h2>
      <p class="description">
        Customize calendar appearance and behavior.
      </p>

      <div class="demo-group">
        <div class="demo-item">
          <AltrexDatePicker
            v-model="mondayFirst"
            :first-day-of-week="1"
            label="Week Starts Monday"
          />
        </div>

        <div class="demo-item">
          <AltrexDatePicker
            v-model="withWeekNumbers"
            :show-week-numbers="true"
            label="With Week Numbers"
          />
        </div>

        <div class="demo-item">
          <AltrexDatePicker
            v-model="customColor"
            calendar-color="success"
            label="Custom Color (Success)"
          />
        </div>
      </div>
    </section>

    <!-- States -->
    <section class="demo-section">
      <h2>States</h2>
      <p class="description">
        Disabled and error states.
      </p>

      <div class="demo-group">
        <div class="demo-item">
          <AltrexDatePicker
            v-model="stateDisabled"
            label="Disabled"
            disabled
          />
        </div>

        <div class="demo-item">
          <AltrexDatePicker
            v-model="stateError"
            label="With Error"
            error="Please select a valid date"
          />
        </div>
      </div>
    </section>

    <!-- Behavior Options -->
    <section class="demo-section">
      <h2>Behavior Options</h2>
      <p class="description">
        Customize picker behavior.
      </p>

      <div class="demo-group">
        <div class="demo-item">
          <AltrexDatePicker
            v-model="notClearable"
            label="Not Clearable"
            :clearable="false"
          />
        </div>

        <div class="demo-item">
          <AltrexDatePicker
            v-model="noTodayButton"
            label="No Today Button"
            :show-today-button="false"
          />
        </div>

        <div class="demo-item">
          <AltrexDatePicker
            v-model="noAutoClose"
            label="Manual Close"
            :close-on-select="false"
          />
        </div>
      </div>
    </section>

    <!-- Props Reference -->
    <section class="demo-section">
      <h2>Props Reference</h2>
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
              <td>Date, Array, Object</td>
              <td><code>null</code></td>
              <td>v-model value</td>
            </tr>
            <tr>
              <td><code>mode</code></td>
              <td>String</td>
              <td><code>'single'</code></td>
              <td>'single', 'multiple', 'range'</td>
            </tr>
            <tr>
              <td><code>label</code></td>
              <td>String</td>
              <td><code>''</code></td>
              <td>Input label</td>
            </tr>
            <tr>
              <td><code>placeholder</code></td>
              <td>String</td>
              <td><code>'Select date...'</code></td>
              <td>Input placeholder</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>String</td>
              <td><code>'m'</code></td>
              <td>Size: 's', 'm', 'l'</td>
            </tr>
            <tr>
              <td><code>format</code></td>
              <td>String</td>
              <td><code>'MM/DD/YYYY'</code></td>
              <td>Date display format</td>
            </tr>
            <tr>
              <td><code>minDate</code></td>
              <td>Date</td>
              <td><code>null</code></td>
              <td>Minimum selectable date</td>
            </tr>
            <tr>
              <td><code>maxDate</code></td>
              <td>Date</td>
              <td><code>null</code></td>
              <td>Maximum selectable date</td>
            </tr>
            <tr>
              <td><code>disabledDates</code></td>
              <td>Array, Function</td>
              <td><code>null</code></td>
              <td>Disabled dates</td>
            </tr>
            <tr>
              <td><code>disabledDaysOfWeek</code></td>
              <td>Array</td>
              <td><code>null</code></td>
              <td>Disabled days (0=Sunday)</td>
            </tr>
            <tr>
              <td><code>firstDayOfWeek</code></td>
              <td>Number</td>
              <td><code>0</code></td>
              <td>First day (0=Sun, 1=Mon)</td>
            </tr>
            <tr>
              <td><code>showWeekNumbers</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Show week numbers</td>
            </tr>
            <tr>
              <td><code>clearable</code></td>
              <td>Boolean</td>
              <td><code>true</code></td>
              <td>Show clear button</td>
            </tr>
            <tr>
              <td><code>closeOnSelect</code></td>
              <td>Boolean</td>
              <td><code>true</code></td>
              <td>Close after selection (single)</td>
            </tr>
            <tr>
              <td><code>showTodayButton</code></td>
              <td>Boolean</td>
              <td><code>true</code></td>
              <td>Show "Today" button</td>
            </tr>
            <tr>
              <td><code>calendarColor</code></td>
              <td>String</td>
              <td><code>'primary'</code></td>
              <td>Calendar color theme</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Usage Example -->
    <section class="demo-section">
      <h2>Usage Example</h2>
      <pre class="code-block"><code>&lt;template&gt;
  &lt;!-- Single Date --&gt;
  &lt;AltrexDatePicker
    v-model="selectedDate"
    label="Select Date"
    format="MM/DD/YYYY"
    @select="handleDateSelect"
  /&gt;

  &lt;!-- Date Range --&gt;
  &lt;AltrexDatePicker
    v-model="dateRange"
    mode="range"
    label="Select Range"
    :min-date="minDate"
    :max-date="maxDate"
  /&gt;

  &lt;!-- Multiple Dates --&gt;
  &lt;AltrexDatePicker
    v-model="dates"
    mode="multiple"
    label="Select Dates"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
import AltrexDatePicker from '@/components/DatePicker/AltrexDatePicker.vue'

const selectedDate = ref(null)
const dateRange = ref({ start: null, end: null })
const dates = ref([])

const minDate = new Date()
const maxDate = new Date()
maxDate.setDate(maxDate.getDate() + 30)

const handleDateSelect = (date) => {
  console.log('Selected:', date)
}
&lt;/script&gt;</code></pre>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue'
import AltrexDatePicker from '@/components/DatePicker/AltrexDatePicker.vue'
import { formatDate } from '@/utils/dateFormat'

export default {
  name: 'AltrexDatePickerView',
  components: {
    AltrexDatePicker
  },
  setup() {
    // Basic
    const singleDate = ref(null)
    const multipleDates = ref([])
    const dateRange = ref({ start: null, end: null })

    // Formats
    const formatMMDDYYYY = ref(null)
    const formatDDMMYYYY = ref(null)
    const formatYYYYMMDD = ref(null)

    // Constraints
    const constrainedDate = ref(null)
    const minDate = new Date()
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 30)

    // Disabled dates
    const noWeekendsDate = ref(null)

    // Sizes
    const sizeSmall = ref(null)
    const sizeMedium = ref(null)
    const sizeLarge = ref(null)

    // Calendar options
    const mondayFirst = ref(null)
    const withWeekNumbers = ref(null)
    const customColor = ref(null)

    // States
    const stateDisabled = ref(null)
    const stateError = ref(null)

    // Behavior
    const notClearable = ref(null)
    const noTodayButton = ref(null)
    const noAutoClose = ref(null)

    // Helpers
    const formatDisplayDate = (date) => {
      if (!date) return 'None'
      return formatDate(date, 'MM/DD/YYYY')
    }

    return {
      singleDate,
      multipleDates,
      dateRange,
      formatMMDDYYYY,
      formatDDMMYYYY,
      formatYYYYMMDD,
      constrainedDate,
      minDate,
      maxDate,
      noWeekendsDate,
      sizeSmall,
      sizeMedium,
      sizeLarge,
      mondayFirst,
      withWeekNumbers,
      customColor,
      stateDisabled,
      stateError,
      notClearable,
      noTodayButton,
      noAutoClose,
      formatDisplayDate
    }
  }
}
</script>

<style lang="stylus" scoped>
.datepicker-demo
  padding: $altrex-spacing-8
  max-width: 1200px
  margin: 0 auto

h1
  margin-bottom: $altrex-spacing-2
  color: var(--altrex-colors-neutral-900)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-primary)

.subtitle
  margin-bottom: $altrex-spacing-8
  color: var(--altrex-colors-neutral-600)
  font-size: $altrex-fontSize-lg

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-secondary)

.demo-section
  margin-bottom: $altrex-spacing-8

  h2
    margin-bottom: $altrex-spacing-2
    color: var(--altrex-colors-neutral-800)
    font-size: $altrex-fontSize-xl

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-primary)

  .description
    margin-bottom: $altrex-spacing-4
    color: var(--altrex-colors-neutral-600)
    font-size: $altrex-fontSize-sm

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-secondary)

.demo-example
  max-width: 400px

.demo-result,
.demo-hint
  margin-top: $altrex-spacing-3
  font-size: $altrex-fontSize-sm
  color: var(--altrex-colors-neutral-600)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-secondary)

.date-list
  margin-top: $altrex-spacing-2
  margin-left: $altrex-spacing-5
  font-size: $altrex-fontSize-sm
  color: var(--altrex-colors-neutral-700)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-secondary)

.demo-group
  display: grid
  gap: $altrex-spacing-4

  // Mobile: 1 column
  grid-template-columns: 1fr

  // Desktop: 3 columns
  +above('md')
    grid-template-columns: repeat(3, 1fr)

.demo-item
  display: flex
  flex-direction: column

// Props table
.props-table
  overflow-x: auto

  table
    width: 100%
    border-collapse: collapse
    font-size: $altrex-fontSize-sm

    th,
    td
      text-align: left
      padding: $altrex-spacing-3
      border-bottom: 1px solid var(--altrex-colors-neutral-200)

      [data-theme="dark"] &
        border-bottom-color: var(--altrex-colors-dark-border-subtle)

    th
      font-weight: $altrex-fontWeight-semibold
      color: var(--altrex-colors-neutral-900)
      background: var(--altrex-colors-neutral-50)

      [data-theme="dark"] &
        color: var(--altrex-colors-dark-text-primary)
        background: var(--altrex-colors-dark-bg-elevated)

    td
      color: var(--altrex-colors-neutral-700)

      [data-theme="dark"] &
        color: var(--altrex-colors-dark-text-secondary)

    code
      padding: 2px 6px
      background: var(--altrex-colors-neutral-100)
      border-radius: $altrex-borderRadius-sm
      font-family: 'Monaco', 'Courier New', monospace
      font-size: 0.9em

      [data-theme="dark"] &
        background: var(--altrex-colors-dark-bg-subtle)
        color: var(--altrex-colors-dark-text-primary)

.code-block
  background: var(--altrex-colors-neutral-50)
  border: 1px solid var(--altrex-colors-neutral-200)
  border-radius: $altrex-borderRadius-default
  padding: $altrex-spacing-4
  overflow-x: auto

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-subtle)
    border-color: var(--altrex-colors-dark-border-subtle)

  code
    font-family: 'Monaco', 'Courier New', monospace
    font-size: $altrex-fontSize-sm
    line-height: 1.6
    color: var(--altrex-colors-neutral-800)

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-primary)
</style>
