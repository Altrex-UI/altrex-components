<template>
  <div class="demo-view">
    <h1>AltrexInput</h1>
    <p class="subtitle">Text and number input field with validation, icons, and various states</p>

    <section class="demo-section">
      <h2>Sizes</h2>
      <div class="demo-grid">
        <AltrexInput
          v-model="basicValue"
          size="s"
          label="Small Input"
          placeholder="Small size"
        />
        <AltrexInput
          v-model="basicValue"
          size="m"
          label="Medium Input (Default)"
          placeholder="Medium size"
        />
        <AltrexInput
          v-model="basicValue"
          size="l"
          label="Large Input"
          placeholder="Large size"
        />
      </div>
    </section>

    <section class="demo-section">
      <h2>Input Types</h2>
      <div class="demo-grid">
        <AltrexInput
          v-model="textValue"
          type="text"
          label="Text Input"
          placeholder="Enter text"
        />
        <AltrexInput
          v-model="numberValue"
          type="number"
          label="Number Input"
          placeholder="Enter number"
          :min="0"
          :max="100"
          :step="5"
        />
        <AltrexInput
          v-model="emailValue"
          type="email"
          label="Email Input"
          placeholder="Enter email"
        />
        <AltrexInput
          v-model="passwordValue"
          type="password"
          label="Password Input"
          placeholder="Enter password"
        />
      </div>
    </section>

    <section class="demo-section">
      <h2>With Icons</h2>
      <div class="demo-grid">
        <AltrexInput
          v-model="searchValue"
          type="search"
          label="Left Icon"
          placeholder="Search..."
          leftIcon="generic-search"
        />
        <AltrexInput
          v-model="emailValue"
          type="email"
          label="Right Icon"
          placeholder="Email"
          rightIcon="generic-mail"
        />
        <AltrexInput
          v-model="basicValue"
          label="Both Icons"
          placeholder="Username"
          leftIcon="generic-user"
          rightIcon="generic-check"
        />
      </div>
    </section>

    <section class="demo-section">
      <h2>Clearable</h2>
      <div class="demo-grid">
        <AltrexInput
          v-model="clearableValue"
          label="Clearable Input"
          placeholder="Type something..."
          clearable
        />
        <AltrexInput
          v-model="clearableValue"
          label="With Icon & Clearable"
          placeholder="Search..."
          leftIcon="generic-search"
          clearable
        />
      </div>
      <p class="demo-value">Current value: "{{ clearableValue }}"</p>
    </section>

    <section class="demo-section">
      <h2>Prefix & Suffix</h2>
      <div class="demo-grid">
        <AltrexInput
          v-model="priceValue"
          type="number"
          label="Price"
          placeholder="0.00"
        >
          <template #prefix>$</template>
        </AltrexInput>
        <AltrexInput
          v-model="weightValue"
          type="number"
          label="Weight"
          placeholder="Enter weight"
        >
          <template #suffix>kg</template>
        </AltrexInput>
        <AltrexInput
          v-model="urlValue"
          type="url"
          label="Website"
          placeholder="mysite"
        >
          <template #prefix>https://</template>
          <template #suffix>.com</template>
        </AltrexInput>
      </div>
    </section>

    <section class="demo-section">
      <h2>Validation States</h2>
      <div class="demo-grid">
        <AltrexInput
          v-model="errorValue"
          label="Error State"
          placeholder="Enter value"
          error="This field is required"
        />
        <AltrexInput
          v-model="successValue"
          label="Success State"
          placeholder="Enter value"
          success="Looks good!"
        />
        <AltrexInput
          v-model="basicValue"
          label="With Hint"
          placeholder="Enter value"
        >
          <template #hint>This is a helpful hint message</template>
        </AltrexInput>
      </div>
    </section>

    <section class="demo-section">
      <h2>States</h2>
      <div class="demo-grid">
        <AltrexInput
          v-model="basicValue"
          label="Normal"
          placeholder="Normal state"
        />
        <AltrexInput
          v-model="basicValue"
          label="Disabled"
          placeholder="Disabled state"
          disabled
        />
        <AltrexInput
          v-model="basicValue"
          label="Readonly"
          placeholder="Readonly state"
          readonly
        />
        <AltrexInput
          v-model="basicValue"
          label="Required"
          placeholder="Required field"
          required
        />
      </div>
    </section>

    <section class="demo-section">
      <h2>Max Length</h2>
      <div class="demo-grid">
        <AltrexInput
          v-model="limitedValue"
          label="Limited to 10 characters"
          placeholder="Max 10 chars"
          :maxlength="10"
        />
      </div>
      <p class="demo-value">{{ limitedValue.length }}/10 characters</p>
    </section>

    <section class="demo-section">
      <h2>Real World Examples</h2>
      <div class="demo-grid">
        <AltrexInput
          v-model="username"
          label="Username"
          placeholder="Enter username"
          leftIcon="generic-user"
          :maxlength="20"
          required
        />
        <AltrexInput
          v-model="weight"
          type="number"
          label="Body Weight"
          placeholder="0"
          leftIcon="generic-activity"
          :min="0"
          :max="500"
          :step="0.1"
        >
          <template #suffix>kg</template>
        </AltrexInput>
        <AltrexInput
          v-model="reps"
          type="number"
          label="Target Reps"
          placeholder="0"
          :min="1"
          :max="100"
          required
        />
        <AltrexInput
          v-model="exerciseName"
          label="Exercise Name"
          placeholder="e.g., Bench Press"
          leftIcon="generic-activity"
          clearable
          required
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
              <td>String | Number</td>
              <td>''</td>
              <td>v-model value</td>
            </tr>
            <tr>
              <td><code>type</code></td>
              <td>String</td>
              <td>'text'</td>
              <td>Input type: text, number, email, password, tel, url, search</td>
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
              <td>Disable input</td>
            </tr>
            <tr>
              <td><code>readonly</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Make input readonly</td>
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
              <td><code>leftIcon</code></td>
              <td>String</td>
              <td>''</td>
              <td>Icon name for left side</td>
            </tr>
            <tr>
              <td><code>rightIcon</code></td>
              <td>String</td>
              <td>''</td>
              <td>Icon name for right side</td>
            </tr>
            <tr>
              <td><code>clearable</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Show clear button</td>
            </tr>
            <tr>
              <td><code>min</code></td>
              <td>Number</td>
              <td>undefined</td>
              <td>Minimum value (for number type)</td>
            </tr>
            <tr>
              <td><code>max</code></td>
              <td>Number</td>
              <td>undefined</td>
              <td>Maximum value (for number type)</td>
            </tr>
            <tr>
              <td><code>step</code></td>
              <td>Number</td>
              <td>undefined</td>
              <td>Step increment (for number type)</td>
            </tr>
            <tr>
              <td><code>maxlength</code></td>
              <td>Number</td>
              <td>undefined</td>
              <td>Maximum character length</td>
            </tr>
            <tr>
              <td><code>required</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Mark field as required</td>
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
              <td>String | Number</td>
              <td>Emitted on value change</td>
            </tr>
            <tr>
              <td><code>input</code></td>
              <td>String | Number</td>
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
            <tr>
              <td><code>clear</code></td>
              <td>-</td>
              <td>Emitted when clear button clicked</td>
            </tr>
            <tr>
              <td><code>enter</code></td>
              <td>Event</td>
              <td>Emitted when Enter key pressed</td>
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
              <td><code>leftIcon</code></td>
              <td>Custom left icon content</td>
            </tr>
            <tr>
              <td><code>rightIcon</code></td>
              <td>Custom right icon content</td>
            </tr>
            <tr>
              <td><code>prefix</code></td>
              <td>Content before input (e.g., $, https://)</td>
            </tr>
            <tr>
              <td><code>suffix</code></td>
              <td>Content after input (e.g., kg, .com)</td>
            </tr>
            <tr>
              <td><code>hint</code></td>
              <td>Hint message below input</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import AltrexInput from '../components/Input/AltrexInput.vue'

export default {
  name: 'AltrexInputView',

  components: {
    AltrexInput
  },

  data() {
    return {
      basicValue: '',
      textValue: '',
      numberValue: '',
      emailValue: '',
      passwordValue: '',
      searchValue: '',
      clearableValue: '',
      priceValue: '',
      weightValue: '',
      urlValue: '',
      errorValue: '',
      successValue: 'Valid value',
      limitedValue: '',
      username: '',
      weight: '',
      reps: '',
      exerciseName: ''
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
