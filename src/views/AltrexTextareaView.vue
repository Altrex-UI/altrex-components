<template>
  <div class="demo-view">
    <h1>AltrexTextarea</h1>
    <p class="subtitle">Multi-line text input with auto-resize and character counting</p>

    <section class="demo-section">
      <h2>Sizes</h2>
      <div class="demo-grid">
        <AltrexTextarea
          v-model="basicValue"
          size="s"
          label="Small Textarea"
          placeholder="Small size"
        />
        <AltrexTextarea
          v-model="basicValue"
          size="m"
          label="Medium Textarea (Default)"
          placeholder="Medium size"
        />
        <AltrexTextarea
          v-model="basicValue"
          size="l"
          label="Large Textarea"
          placeholder="Large size"
        />
      </div>
    </section>

    <section class="demo-section">
      <h2>Basic Usage</h2>
      <div class="demo-grid">
        <AltrexTextarea
          v-model="textValue"
          label="Description"
          placeholder="Enter description..."
          :rows="4"
        />
        <AltrexTextarea
          v-model="notesValue"
          label="Workout Notes"
          placeholder="Add your notes here..."
          :rows="4"
        />
      </div>
      <p class="demo-value">Description: "{{ textValue }}"</p>
    </section>

    <section class="demo-section">
      <h2>Auto-resize</h2>
      <div class="demo-grid">
        <AltrexTextarea
          v-model="autoResizeValue"
          label="Auto-resize Textarea"
          placeholder="Type and watch it grow..."
          autosize
          :min-rows="3"
          :max-rows="10"
        />
        <AltrexTextarea
          v-model="autoResizeValue2"
          label="With Max Rows"
          placeholder="Will stop growing at 6 rows..."
          autosize
          :min-rows="2"
          :max-rows="6"
        />
      </div>
    </section>

    <section class="demo-section">
      <h2>Character Counter</h2>
      <div class="demo-grid">
        <AltrexTextarea
          v-model="limitedValue"
          label="Limited to 200 characters"
          placeholder="Type something..."
          :maxlength="200"
          show-char-count
        />
        <AltrexTextarea
          v-model="tweetValue"
          label="Tweet (280 characters)"
          placeholder="What's happening?"
          :maxlength="280"
          show-char-count
          :rows="4"
        />
      </div>
    </section>

    <section class="demo-section">
      <h2>Resize Options</h2>
      <div class="demo-grid">
        <AltrexTextarea
          v-model="resizeValue"
          label="Vertical Resize (Default)"
          placeholder="Can resize vertically"
          resize="vertical"
        />
        <AltrexTextarea
          v-model="resizeValue"
          label="Both Directions"
          placeholder="Can resize both ways"
          resize="both"
        />
        <AltrexTextarea
          v-model="resizeValue"
          label="No Resize"
          placeholder="Cannot resize"
          resize="none"
        />
      </div>
    </section>

    <section class="demo-section">
      <h2>Validation States</h2>
      <div class="demo-grid">
        <AltrexTextarea
          v-model="errorValue"
          label="Error State"
          placeholder="Enter value"
          error="This field is required"
        />
        <AltrexTextarea
          v-model="successValue"
          label="Success State"
          placeholder="Enter value"
          success="Looks good!"
        />
        <AltrexTextarea
          v-model="hintValue"
          label="With Hint"
          placeholder="Enter value"
        >
          <template #hint>Provide detailed information about your workout</template>
        </AltrexTextarea>
      </div>
    </section>

    <section class="demo-section">
      <h2>States</h2>
      <div class="demo-grid">
        <AltrexTextarea
          v-model="basicValue"
          label="Normal"
          placeholder="Normal state"
        />
        <AltrexTextarea
          v-model="basicValue"
          label="Disabled"
          placeholder="Disabled state"
          disabled
        />
        <AltrexTextarea
          v-model="basicValue"
          label="Readonly"
          placeholder="Readonly state"
          readonly
        />
        <AltrexTextarea
          v-model="basicValue"
          label="Required"
          placeholder="Required field"
          required
        />
      </div>
    </section>

    <section class="demo-section">
      <h2>Real World Examples</h2>
      <div class="demo-grid">
        <AltrexTextarea
          v-model="workoutDescription"
          label="Workout Description"
          placeholder="Describe your workout plan..."
          :rows="4"
          :maxlength="500"
          show-char-count
        />
        <AltrexTextarea
          v-model="exerciseNotes"
          label="Exercise Notes"
          placeholder="Add notes about form, intensity, etc."
          autosize
          :min-rows="3"
          :max-rows="8"
        />
        <AltrexTextarea
          v-model="progressNotes"
          label="Progress Journal"
          placeholder="Record your progress, feelings, observations..."
          :rows="6"
          :maxlength="1000"
          show-char-count
        />
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
              <td>String</td>
              <td>''</td>
              <td>v-model value</td>
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
              <td>''</td>
              <td>Placeholder text</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Disable textarea</td>
            </tr>
            <tr>
              <td><code>readonly</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Make textarea readonly</td>
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
              <td><code>rows</code></td>
              <td>Number</td>
              <td>3</td>
              <td>Number of visible text rows</td>
            </tr>
            <tr>
              <td><code>maxlength</code></td>
              <td>Number</td>
              <td>undefined</td>
              <td>Maximum character length</td>
            </tr>
            <tr>
              <td><code>resize</code></td>
              <td>String</td>
              <td>'vertical'</td>
              <td>Resize option: none, both, horizontal, vertical</td>
            </tr>
            <tr>
              <td><code>autosize</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Auto-grow height based on content</td>
            </tr>
            <tr>
              <td><code>minRows</code></td>
              <td>Number</td>
              <td>3</td>
              <td>Minimum rows (for autosize)</td>
            </tr>
            <tr>
              <td><code>maxRows</code></td>
              <td>Number</td>
              <td>undefined</td>
              <td>Maximum rows (for autosize)</td>
            </tr>
            <tr>
              <td><code>required</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Mark field as required</td>
            </tr>
            <tr>
              <td><code>showCharCount</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Show character counter</td>
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
              <td>String</td>
              <td>Emitted on value change</td>
            </tr>
            <tr>
              <td><code>input</code></td>
              <td>String</td>
              <td>Emitted on input</td>
            </tr>
            <tr>
              <td><code>focus</code></td>
              <td>Event</td>
              <td>Emitted on focus</td>
            </tr>
            <tr>
              <td><code>blur</code></td>
              <td>Event</td>
              <td>Emitted on blur</td>
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
              <td><code>hint</code></td>
              <td>Hint message below textarea</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import AltrexTextarea from '../components/Textarea/AltrexTextarea.vue'

export default {
  name: 'AltrexTextareaView',

  components: {
    AltrexTextarea
  },

  data() {
    return {
      basicValue: '',
      textValue: '',
      notesValue: '',
      autoResizeValue: '',
      autoResizeValue2: '',
      limitedValue: '',
      tweetValue: '',
      resizeValue: '',
      errorValue: '',
      successValue: 'This is valid content',
      hintValue: '',
      workoutDescription: '',
      exerciseNotes: '',
      progressNotes: ''
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))
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
