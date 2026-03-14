<template>
  <div class="demo-view">
    <h1>AltrexCheckbox</h1>
    <p class="subtitle">Checkbox component with support for single checkboxes and checkbox groups</p>

    <section class="demo-section">
      <h2>Sizes</h2>
      <div class="demo-grid">
        <AltrexCheckbox
          v-model="basicChecked"
          size="s"
          label="Small Checkbox"
        />
        <AltrexCheckbox
          v-model="basicChecked"
          size="m"
          label="Medium Checkbox (Default)"
        />
        <AltrexCheckbox
          v-model="basicChecked"
          size="l"
          label="Large Checkbox"
        />
      </div>
      <p class="demo-value">Checked: {{ basicChecked }}</p>
    </section>

    <section class="demo-section">
      <h2>Single Checkbox</h2>
      <div class="demo-grid">
        <AltrexCheckbox
          v-model="singleChecked"
          label="Accept terms and conditions"
        />
        <AltrexCheckbox
          v-model="newsletter"
          label="Subscribe to newsletter"
        />
        <AltrexCheckbox
          v-model="notifications"
          label="Enable notifications"
        />
      </div>
      <p class="demo-value">Terms: {{ singleChecked }}, Newsletter: {{ newsletter }}, Notifications: {{ notifications }}</p>
    </section>

    <section class="demo-section">
      <h2>Checkbox Group</h2>
      <div class="demo-column">
        <div class="demo-label">Select Muscle Groups:</div>
        <AltrexCheckbox
          v-model="muscleGroups"
          value="chest"
          label="Chest"
        />
        <AltrexCheckbox
          v-model="muscleGroups"
          value="back"
          label="Back"
        />
        <AltrexCheckbox
          v-model="muscleGroups"
          value="legs"
          label="Legs"
        />
        <AltrexCheckbox
          v-model="muscleGroups"
          value="shoulders"
          label="Shoulders"
        />
        <AltrexCheckbox
          v-model="muscleGroups"
          value="arms"
          label="Arms"
        />
      </div>
      <p class="demo-value">Selected: {{ muscleGroups }}</p>
    </section>

    <section class="demo-section">
      <h2>Indeterminate State</h2>
      <div class="demo-column">
        <AltrexCheckbox
          v-model="selectAll"
          :indeterminate="isIndeterminate"
          label="Select All"
          @change="handleSelectAll"
        />
        <div class="demo-indent">
          <AltrexCheckbox
            v-model="options"
            value="option1"
            label="Option 1"
          />
          <AltrexCheckbox
            v-model="options"
            value="option2"
            label="Option 2"
          />
          <AltrexCheckbox
            v-model="options"
            value="option3"
            label="Option 3"
          />
        </div>
      </div>
      <p class="demo-value">Selected options: {{ options }}</p>
    </section>

    <section class="demo-section">
      <h2>With Slot Content</h2>
      <div class="demo-grid">
        <AltrexCheckbox v-model="customContent">
          <span class="custom-label">
            I agree to the <a href="#" @click.prevent>terms of service</a>
          </span>
        </AltrexCheckbox>
        <AltrexCheckbox v-model="customContent2">
          <div class="custom-label-complex">
            <strong>Premium Feature</strong>
            <span class="custom-sublabel">Get access to advanced analytics</span>
          </div>
        </AltrexCheckbox>
      </div>
    </section>

    <section class="demo-section">
      <h2>Validation</h2>
      <div class="demo-grid">
        <AltrexCheckbox
          v-model="errorChecked"
          label="Checkbox with error"
          error="You must check this option"
        />
        <AltrexCheckbox
          v-model="hintChecked"
          label="Checkbox with hint"
        >
          <template #hint>This is a helpful hint message</template>
        </AltrexCheckbox>
      </div>
    </section>

    <section class="demo-section">
      <h2>States</h2>
      <div class="demo-grid">
        <AltrexCheckbox
          v-model="basicChecked"
          label="Normal"
        />
        <AltrexCheckbox
          v-model="basicChecked"
          label="Disabled (Unchecked)"
          disabled
        />
        <AltrexCheckbox
          :model-value="true"
          label="Disabled (Checked)"
          disabled
        />
        <AltrexCheckbox
          v-model="requiredChecked"
          label="Required"
          required
        />
      </div>
    </section>

    <section class="demo-section">
      <h2>Real World Examples</h2>
      <div class="demo-column">
        <div class="demo-label">Workout Preferences:</div>
        <AltrexCheckbox
          v-model="workoutPrefs"
          value="warmup"
          label="Include warm-up exercises"
        />
        <AltrexCheckbox
          v-model="workoutPrefs"
          value="cooldown"
          label="Include cool-down stretches"
        />
        <AltrexCheckbox
          v-model="workoutPrefs"
          value="timer"
          label="Enable rest timer"
        />
        <AltrexCheckbox
          v-model="workoutPrefs"
          value="notes"
          label="Allow exercise notes"
        />
      </div>
      <p class="demo-value">Preferences: {{ workoutPrefs }}</p>

      <div class="demo-column" style="margin-top: 2rem;">
        <div class="demo-label">Training Days:</div>
        <AltrexCheckbox
          v-model="trainingDays"
          value="mon"
          label="Monday"
        />
        <AltrexCheckbox
          v-model="trainingDays"
          value="tue"
          label="Tuesday"
        />
        <AltrexCheckbox
          v-model="trainingDays"
          value="wed"
          label="Wednesday"
        />
        <AltrexCheckbox
          v-model="trainingDays"
          value="thu"
          label="Thursday"
        />
        <AltrexCheckbox
          v-model="trainingDays"
          value="fri"
          label="Friday"
        />
        <AltrexCheckbox
          v-model="trainingDays"
          value="sat"
          label="Saturday"
        />
        <AltrexCheckbox
          v-model="trainingDays"
          value="sun"
          label="Sunday"
        />
      </div>
      <p class="demo-value">Training days: {{ trainingDays }}</p>
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
              <td>Boolean | Array</td>
              <td>false</td>
              <td>v-model value (boolean for single, array for groups)</td>
            </tr>
            <tr>
              <td><code>value</code></td>
              <td>Any</td>
              <td>undefined</td>
              <td>Value for checkbox groups</td>
            </tr>
            <tr>
              <td><code>label</code></td>
              <td>String</td>
              <td>''</td>
              <td>Label text</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Disable checkbox</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>String</td>
              <td>'m'</td>
              <td>Size: s, m, l</td>
            </tr>
            <tr>
              <td><code>error</code></td>
              <td>String</td>
              <td>''</td>
              <td>Error message</td>
            </tr>
            <tr>
              <td><code>required</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Mark field as required</td>
            </tr>
            <tr>
              <td><code>indeterminate</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Show indeterminate state (partial selection)</td>
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
              <td>Boolean | Array</td>
              <td>Emitted on value change</td>
            </tr>
            <tr>
              <td><code>change</code></td>
              <td>Boolean | Array</td>
              <td>Emitted on checkbox change</td>
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
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>default</code></td>
              <td>Custom label content</td>
            </tr>
            <tr>
              <td><code>hint</code></td>
              <td>Hint message below checkbox</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import AltrexCheckbox from '../components/Checkbox/AltrexCheckbox.vue'

export default {
  name: 'AltrexCheckboxView',

  components: {
    AltrexCheckbox
  },

  data() {
    return {
      basicChecked: false,
      singleChecked: false,
      newsletter: true,
      notifications: false,
      muscleGroups: ['chest', 'back'],
      selectAll: false,
      options: ['option1'],
      customContent: false,
      customContent2: false,
      errorChecked: false,
      hintChecked: false,
      requiredChecked: false,
      workoutPrefs: ['warmup', 'timer'],
      trainingDays: ['mon', 'wed', 'fri']
    }
  },

  computed: {
    isIndeterminate() {
      const allOptions = ['option1', 'option2', 'option3']
      return this.options.length > 0 && this.options.length < allOptions.length
    }
  },

  watch: {
    options(newVal) {
      const allOptions = ['option1', 'option2', 'option3']
      this.selectAll = newVal.length === allOptions.length
    }
  },

  methods: {
    handleSelectAll(checked) {
      if (checked) {
        this.options = ['option1', 'option2', 'option3']
      } else {
        this.options = []
      }
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
  gap: $altrex-spacing-4

.demo-column
  display: flex
  flex-direction: column
  gap: $altrex-spacing-3

.demo-label
  font-weight: $altrex-fontWeight-medium
  color: var(--altrex-colors-neutral-700)
  margin-bottom: $altrex-spacing-2

  [data-theme="dark"] &
    color: var(--altrex-colors-neutral-300)

.demo-indent
  display: flex
  flex-direction: column
  gap: $altrex-spacing-3
  margin-left: $altrex-spacing-6

.demo-value
  margin-top: $altrex-spacing-4
  padding: $altrex-spacing-3
  background: var(--altrex-colors-neutral-100)
  border-radius: $altrex-borderRadius-default
  font-family: monospace
  font-size: $altrex-fontSize-sm

  [data-theme="dark"] &
    background: var(--altrex-colors-neutral-800)

.custom-label
  a
    color: var(--altrex-colors-primary-600)
    text-decoration: underline

    [data-theme="dark"] &
      color: var(--altrex-colors-primary-400)

    &:hover
      color: var(--altrex-colors-primary-700)

.custom-label-complex
  display: flex
  flex-direction: column
  gap: $altrex-spacing-1

  strong
    color: var(--altrex-colors-neutral-900)

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-100)

.custom-sublabel
  font-size: $altrex-fontSize-sm
  color: var(--altrex-colors-neutral-600)

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
