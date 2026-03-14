<template>
  <div class="demo-view">
    <h1>AltrexSelect</h1>
    <p class="subtitle">Dropdown select component with search, multi-select, and validation</p>

    <section class="demo-section">
      <h2>Sizes</h2>
      <div class="demo-grid">
        <AltrexSelect
          v-model="basicValue"
          :options="simpleOptions"
          size="s"
          label="Small Select"
          placeholder="Select option"
        />
        <AltrexSelect
          v-model="basicValue"
          :options="simpleOptions"
          size="m"
          label="Medium Select (Default)"
          placeholder="Select option"
        />
        <AltrexSelect
          v-model="basicValue"
          :options="simpleOptions"
          size="l"
          label="Large Select"
          placeholder="Select option"
        />
      </div>
      <p class="demo-value">Selected: {{ basicValue }}</p>
    </section>

    <section class="demo-section">
      <h2>Simple Options (String Array)</h2>
      <div class="demo-grid">
        <AltrexSelect
          v-model="simpleValue"
          :options="simpleOptions"
          label="String Options"
          placeholder="Choose one"
        />
      </div>
      <p class="demo-value">Selected: "{{ simpleValue }}"</p>
    </section>

    <section class="demo-section">
      <h2>Object Options (Label/Value)</h2>
      <div class="demo-grid">
        <AltrexSelect
          v-model="objectValue"
          :options="categoryOptions"
          label="Exercise Category"
          placeholder="Select category"
        />
      </div>
      <p class="demo-value">Selected value: "{{ objectValue }}"</p>
    </section>

    <section class="demo-section">
      <h2>Searchable</h2>
      <div class="demo-grid">
        <AltrexSelect
          v-model="exerciseValue"
          :options="exerciseOptions"
          label="Search Exercise"
          placeholder="Type to search..."
          searchable
        />
      </div>
      <p class="demo-value">Selected: "{{ exerciseValue }}"</p>
    </section>

    <section class="demo-section">
      <h2>Multi-Select</h2>
      <div class="demo-grid">
        <AltrexSelect
          v-model="multiValue"
          :options="muscleGroupOptions"
          label="Muscle Groups"
          placeholder="Select multiple"
          multiple
        />
        <AltrexSelect
          v-model="multiSearchValue"
          :options="equipmentOptions"
          label="Equipment (Searchable Multi-Select)"
          placeholder="Search and select"
          multiple
          searchable
        />
      </div>
      <p class="demo-value">Selected muscle groups: {{ multiValue }}</p>
      <p class="demo-value">Selected equipment: {{ multiSearchValue }}</p>
    </section>

    <section class="demo-section">
      <h2>Clearable</h2>
      <div class="demo-grid">
        <AltrexSelect
          v-model="clearableValue"
          :options="simpleOptions"
          label="Clearable Select"
          placeholder="Select option"
          clearable
        />
      </div>
      <p class="demo-value">Selected: "{{ clearableValue }}"</p>
    </section>

    <section class="demo-section">
      <h2>Validation States</h2>
      <div class="demo-grid">
        <AltrexSelect
          v-model="errorValue"
          :options="simpleOptions"
          label="Error State"
          placeholder="Select option"
          error="This field is required"
        />
        <AltrexSelect
          v-model="successValue"
          :options="simpleOptions"
          label="Success State"
          placeholder="Select option"
          success="Valid selection!"
        />
      </div>
    </section>

    <section class="demo-section">
      <h2>Disabled Options</h2>
      <div class="demo-grid">
        <AltrexSelect
          v-model="disabledOptionValue"
          :options="disabledOptions"
          label="Some Options Disabled"
          placeholder="Select option"
        />
      </div>
      <p class="demo-value">Selected: "{{ disabledOptionValue }}"</p>
    </section>

    <section class="demo-section">
      <h2>States</h2>
      <div class="demo-grid">
        <AltrexSelect
          v-model="basicValue"
          :options="simpleOptions"
          label="Normal"
          placeholder="Select option"
        />
        <AltrexSelect
          v-model="basicValue"
          :options="simpleOptions"
          label="Disabled"
          placeholder="Select option"
          disabled
        />
        <AltrexSelect
          v-model="basicValue"
          :options="simpleOptions"
          label="Required"
          placeholder="Select option"
          required
        />
      </div>
    </section>

    <section class="demo-section">
      <h2>Real World Examples</h2>
      <div class="demo-grid">
        <AltrexSelect
          v-model="workoutCategory"
          :options="categoryOptions"
          label="Workout Category"
          placeholder="Select category"
          required
        />
        <AltrexSelect
          v-model="workoutExercises"
          :options="exerciseOptions"
          label="Select Exercises"
          placeholder="Search exercises..."
          multiple
          searchable
        />
        <AltrexSelect
          v-model="weightUnit"
          :options="unitOptions"
          label="Weight Unit"
          placeholder="Select unit"
        />
        <AltrexSelect
          v-model="daysOfWeek"
          :options="dayOptions"
          label="Training Days"
          placeholder="Select days"
          multiple
        />
      </div>
    </section>

    <section class="demo-section">
      <h2>Custom Option Slot</h2>
      <div class="demo-grid">
        <AltrexSelect
          v-model="customValue"
          :options="exerciseOptionsWithDetails"
          label="Exercise with Details"
          placeholder="Select exercise"
          searchable
        >
          <template #option="{ option }">
            <div class="custom-option">
              <div class="custom-option-label">{{ option.label }}</div>
              <div class="custom-option-meta">{{ option.category }} • {{ option.equipment }}</div>
            </div>
          </template>
        </AltrexSelect>
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
              <td>Any | Array</td>
              <td>null</td>
              <td>v-model value (single value or array for multiple)</td>
            </tr>
            <tr>
              <td><code>options</code></td>
              <td>Array</td>
              <td>[]</td>
              <td>Options array (strings or {label, value, disabled} objects)</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>String</td>
              <td>'m'</td>
              <td>Size: s, m, l</td>
            </tr>
            <tr>
              <td><code>label</code></td>
              <td>String</td>
              <td>''</td>
              <td>Label text</td>
            </tr>
            <tr>
              <td><code>placeholder</code></td>
              <td>String</td>
              <td>'Select an option'</td>
              <td>Placeholder text</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Disable select</td>
            </tr>
            <tr>
              <td><code>error</code></td>
              <td>String</td>
              <td>''</td>
              <td>Error message</td>
            </tr>
            <tr>
              <td><code>success</code></td>
              <td>String</td>
              <td>''</td>
              <td>Success message</td>
            </tr>
            <tr>
              <td><code>clearable</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Show clear button</td>
            </tr>
            <tr>
              <td><code>searchable</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Enable search/filter</td>
            </tr>
            <tr>
              <td><code>multiple</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Enable multi-select</td>
            </tr>
            <tr>
              <td><code>required</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Mark field as required</td>
            </tr>
            <tr>
              <td><code>maxHeight</code></td>
              <td>String</td>
              <td>'300px'</td>
              <td>Maximum dropdown height</td>
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
              <td><code>update:modelValue</code></td>
              <td>Any | Array</td>
              <td>Emitted on value change</td>
            </tr>
            <tr>
              <td><code>change</code></td>
              <td>Any | Array</td>
              <td>Emitted on selection change</td>
            </tr>
            <tr>
              <td><code>clear</code></td>
              <td>-</td>
              <td>Emitted when clear button clicked</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="demo-section">
      <h2>Slots</h2>
      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th>Slot</th>
              <th>Props</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>option</code></td>
              <td>{ option }</td>
              <td>Custom option rendering</td>
            </tr>
            <tr>
              <td><code>empty</code></td>
              <td>-</td>
              <td>Custom empty state</td>
            </tr>
            <tr>
              <td><code>hint</code></td>
              <td>-</td>
              <td>Hint message below select</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import AltrexSelect from '../components/Select/AltrexSelect.vue'

export default {
  name: 'AltrexSelectView',

  components: {
    AltrexSelect
  },

  data() {
    return {
      basicValue: null,
      simpleValue: null,
      objectValue: null,
      exerciseValue: null,
      multiValue: [],
      multiSearchValue: [],
      clearableValue: null,
      errorValue: null,
      successValue: 'option2',
      disabledOptionValue: null,
      workoutCategory: null,
      workoutExercises: [],
      weightUnit: 'kg',
      daysOfWeek: [],
      customValue: null,

      simpleOptions: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],

      categoryOptions: [
        { label: 'Chest', value: 'chest' },
        { label: 'Back', value: 'back' },
        { label: 'Legs', value: 'legs' },
        { label: 'Shoulders', value: 'shoulders' },
        { label: 'Arms', value: 'arms' },
        { label: 'Core', value: 'core' },
        { label: 'Cardio', value: 'cardio' }
      ],

      exerciseOptions: [
        { label: 'Bench Press', value: 'bench-press' },
        { label: 'Squat', value: 'squat' },
        { label: 'Deadlift', value: 'deadlift' },
        { label: 'Pull-ups', value: 'pullups' },
        { label: 'Overhead Press', value: 'overhead-press' },
        { label: 'Barbell Row', value: 'barbell-row' },
        { label: 'Dumbbell Curl', value: 'dumbbell-curl' },
        { label: 'Tricep Pushdown', value: 'tricep-pushdown' },
        { label: 'Leg Press', value: 'leg-press' },
        { label: 'Lunges', value: 'lunges' }
      ],

      muscleGroupOptions: [
        { label: 'Chest', value: 'chest' },
        { label: 'Back', value: 'back' },
        { label: 'Shoulders', value: 'shoulders' },
        { label: 'Biceps', value: 'biceps' },
        { label: 'Triceps', value: 'triceps' },
        { label: 'Quads', value: 'quads' },
        { label: 'Hamstrings', value: 'hamstrings' },
        { label: 'Glutes', value: 'glutes' },
        { label: 'Calves', value: 'calves' },
        { label: 'Abs', value: 'abs' }
      ],

      equipmentOptions: [
        { label: 'Barbell', value: 'barbell' },
        { label: 'Dumbbell', value: 'dumbbell' },
        { label: 'Machine', value: 'machine' },
        { label: 'Cable', value: 'cable' },
        { label: 'Bodyweight', value: 'bodyweight' },
        { label: 'Kettlebell', value: 'kettlebell' },
        { label: 'Resistance Bands', value: 'bands' }
      ],

      disabledOptions: [
        { label: 'Available Option 1', value: 'opt1' },
        { label: 'Disabled Option', value: 'opt2', disabled: true },
        { label: 'Available Option 2', value: 'opt3' },
        { label: 'Another Disabled', value: 'opt4', disabled: true }
      ],

      unitOptions: [
        { label: 'Kilograms (kg)', value: 'kg' },
        { label: 'Pounds (lbs)', value: 'lbs' }
      ],

      dayOptions: [
        { label: 'Monday', value: 1 },
        { label: 'Tuesday', value: 2 },
        { label: 'Wednesday', value: 3 },
        { label: 'Thursday', value: 4 },
        { label: 'Friday', value: 5 },
        { label: 'Saturday', value: 6 },
        { label: 'Sunday', value: 7 }
      ],

      exerciseOptionsWithDetails: [
        { label: 'Bench Press', value: 'bench-press', category: 'Chest', equipment: 'Barbell' },
        { label: 'Squat', value: 'squat', category: 'Legs', equipment: 'Barbell' },
        { label: 'Deadlift', value: 'deadlift', category: 'Back', equipment: 'Barbell' },
        { label: 'Pull-ups', value: 'pullups', category: 'Back', equipment: 'Bodyweight' },
        { label: 'Dumbbell Press', value: 'db-press', category: 'Chest', equipment: 'Dumbbell' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.demo-view
  padding: $altrex-spacing-8
  max-width: 1200px
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
    margin-bottom: $altrex-spacing-6

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-200)

.demo-grid
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
  gap: $altrex-spacing-6

.demo-value
  margin-top: $altrex-spacing-4
  padding: $altrex-spacing-3
  background: var(--altrex-colors-neutral-100)
  border-radius: $altrex-borderRadius-default
  font-family: monospace
  font-size: $altrex-fontSize-sm

  [data-theme="dark"] &
    background: var(--altrex-colors-neutral-800)

.custom-option
  display: flex
  flex-direction: column
  gap: $altrex-spacing-1

.custom-option-label
  font-weight: $altrex-fontWeight-medium

.custom-option-meta
  font-size: $altrex-fontSize-xs
  color: var(--altrex-colors-neutral-500)

  [data-theme="dark"] &
    color: var(--altrex-colors-neutral-400)

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
      color: var(--altrex-colors-neutral-700)
      background: var(--altrex-colors-neutral-50)

      [data-theme="dark"] &
        color: var(--altrex-colors-neutral-300)
        background: var(--altrex-colors-neutral-800)

    td
      color: var(--altrex-colors-neutral-600)

      [data-theme="dark"] &
        color: var(--altrex-colors-neutral-400)

    code
      background: var(--altrex-colors-neutral-100)
      padding: $altrex-spacing-1 $altrex-spacing-2
      border-radius: $altrex-borderRadius-sm
      font-size: $altrex-fontSize-xs
      color: var(--altrex-colors-primary-600)

      [data-theme="dark"] &
        background: var(--altrex-colors-neutral-800)
        color: var(--altrex-colors-primary-400)
</style>
