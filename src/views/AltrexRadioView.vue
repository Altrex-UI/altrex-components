<template>
  <div class="demo-view">
    <h1>AltrexRadio</h1>
    <p class="subtitle">Radio button groups for mutually exclusive selections with mobile-first design</p>

    <!-- Basic Usage -->
    <section class="demo-section">
      <h2>Basic Usage</h2>
      <p class="demo-description">Simple radio group with string options</p>
      <div class="demo-container">
        <AltrexRadio
          v-model="basicValue"
          :options="basicOptions"
          name="basic-radio"
          label="Choose your favorite color"
        />
        <p class="demo-output">Selected: <code>{{ basicValue }}</code></p>
      </div>
    </section>

    <!-- Direction: Vertical vs Horizontal -->
    <section class="demo-section">
      <h2>Layout Direction</h2>
      <p class="demo-description">Vertical layout (default) stacks options. Horizontal layout goes side-by-side on tablet+</p>
      <div class="demo-grid">
        <div class="demo-item">
          <h3 class="demo-label">Vertical (Default)</h3>
          <AltrexRadio
            v-model="directionVertical"
            :options="sizeOptions"
            name="direction-vertical"
            label="T-Shirt Size"
            direction="vertical"
          />
        </div>
        <div class="demo-item">
          <h3 class="demo-label">Horizontal (on tablet+)</h3>
          <AltrexRadio
            v-model="directionHorizontal"
            :options="sizeOptions"
            name="direction-horizontal"
            label="T-Shirt Size"
            direction="horizontal"
          />
        </div>
      </div>
    </section>

    <!-- Object Options -->
    <section class="demo-section">
      <h2>Object Options</h2>
      <p class="demo-description">Options can be objects with label, value, and disabled properties</p>
      <div class="demo-container">
        <AltrexRadio
          v-model="objectValue"
          :options="objectOptions"
          name="object-radio"
          label="Select a subscription plan"
        />
        <p class="demo-output">Selected value: <code>{{ objectValue }}</code></p>
      </div>
    </section>

    <!-- States -->
    <section class="demo-section">
      <h2>States</h2>
      <p class="demo-description">Different states of the radio group</p>
      <div class="demo-grid">
        <div class="demo-item">
          <h3 class="demo-label">Default</h3>
          <AltrexRadio
            v-model="stateDefault"
            :options="['Option A', 'Option B', 'Option C']"
            name="state-default"
            label="Normal state"
          />
        </div>
        <div class="demo-item">
          <h3 class="demo-label">Required</h3>
          <AltrexRadio
            v-model="stateRequired"
            :options="['Yes', 'No']"
            name="state-required"
            label="Do you agree?"
            required
          />
        </div>
        <div class="demo-item">
          <h3 class="demo-label">Disabled</h3>
          <AltrexRadio
            v-model="stateDisabled"
            :options="['Option 1', 'Option 2', 'Option 3']"
            name="state-disabled"
            label="Disabled group"
            disabled
          />
        </div>
        <div class="demo-item">
          <h3 class="demo-label">With Error</h3>
          <AltrexRadio
            v-model="stateError"
            :options="['Red', 'Green', 'Blue']"
            name="state-error"
            label="Select a color"
            required
            :error="stateError ? '' : 'Please select a color'"
          />
        </div>
      </div>
    </section>

    <!-- Individual Disabled Options -->
    <section class="demo-section">
      <h2>Individual Disabled Options</h2>
      <p class="demo-description">Disable specific options while keeping others enabled</p>
      <div class="demo-container">
        <AltrexRadio
          v-model="individualDisabled"
          :options="individualDisabledOptions"
          name="individual-disabled"
          label="Select shipping method"
        />
        <p class="demo-output">Selected: <code>{{ individualDisabled }}</code></p>
      </div>
    </section>

    <!-- Custom Labels with Slots -->
    <section class="demo-section">
      <h2>Custom Labels</h2>
      <p class="demo-description">Use slots to customize option labels with rich content</p>
      <div class="demo-container">
        <AltrexRadio
          v-model="customLabel"
          :options="customLabelOptions"
          name="custom-label"
          label="Choose your plan"
        >
          <template #label-basic="{ option }">
            <div class="custom-label">
              <span class="custom-label__title">{{ option.label }}</span>
              <span class="custom-label__price">Free</span>
            </div>
          </template>
          <template #label-pro="{ option }">
            <div class="custom-label">
              <span class="custom-label__title">{{ option.label }}</span>
              <span class="custom-label__price">$9.99/mo</span>
            </div>
          </template>
          <template #label-enterprise="{ option }">
            <div class="custom-label">
              <span class="custom-label__title">{{ option.label }}</span>
              <span class="custom-label__price">Contact us</span>
            </div>
          </template>
        </AltrexRadio>
      </div>
    </section>

    <!-- Accessibility -->
    <section class="demo-section">
      <h2>Accessibility</h2>
      <p class="demo-description">Full keyboard support and ARIA attributes</p>
      <div class="demo-container">
        <div class="accessibility-info">
          <h3>Keyboard Navigation:</h3>
          <ul>
            <li><kbd>Tab</kbd> - Move focus to radio group</li>
            <li><kbd>Arrow Up/Down</kbd> - Navigate between options</li>
            <li><kbd>Space</kbd> - Select focused option</li>
          </ul>
          <h3>Screen Reader Support:</h3>
          <ul>
            <li>Proper <code>role="radiogroup"</code></li>
            <li>Each option has <code>role="radio"</code></li>
            <li>Required state announced</li>
            <li>Error messages linked with <code>aria-describedby</code></li>
          </ul>
        </div>
        <AltrexRadio
          v-model="accessibilityValue"
          :options="['Option 1', 'Option 2', 'Option 3']"
          name="accessibility"
          label="Try keyboard navigation"
          required
        />
      </div>
    </section>

    <!-- Style Overrides -->
    <section class="demo-section">
      <h2>Style Overrides</h2>
      <p class="demo-description">Customize appearance with CSS variables via styleOverrides prop</p>
      <div class="demo-grid">
        <div class="demo-item">
          <h3 class="demo-label">Custom Colors</h3>
          <AltrexRadio
            v-model="styleOverride1"
            :options="['Apple', 'Banana', 'Cherry']"
            name="style-override-1"
            label="Favorite fruit"
            :style-overrides="{
              '--altrex-radio-border-color-checked': '#10b981',
              '--altrex-radio-dot-color': '#10b981',
              '--altrex-radio-outline-color': '#10b981'
            }"
          />
        </div>
        <div class="demo-item">
          <h3 class="demo-label">Custom Size</h3>
          <AltrexRadio
            v-model="styleOverride2"
            :options="['Small', 'Medium', 'Large']"
            name="style-override-2"
            label="Size preference"
            :style-overrides="{
              '--altrex-radio-control-size': '28px',
              '--altrex-radio-dot-size': '14px'
            }"
          />
        </div>
      </div>
    </section>

    <!-- Interactive Example -->
    <section class="demo-section">
      <h2>Interactive Form Example</h2>
      <p class="demo-description">Complete form with validation</p>
      <div class="demo-container">
        <form @submit.prevent="handleSubmit" class="demo-form">
          <AltrexRadio
            v-model="formData.experience"
            :options="experienceOptions"
            name="experience"
            label="How much development experience do you have?"
            required
            :error="formErrors.experience"
          />

          <AltrexRadio
            v-model="formData.preference"
            :options="preferenceOptions"
            name="preference"
            label="Preferred work style"
            direction="horizontal"
            required
            :error="formErrors.preference"
          />

          <AltrexRadio
            v-model="formData.newsletter"
            :options="[
              { label: 'Yes, send me updates', value: true },
              { label: 'No thanks', value: false }
            ]"
            name="newsletter"
            label="Newsletter subscription"
          />

          <div class="form-actions">
            <button type="submit" class="submit-button">Submit</button>
            <button type="button" class="reset-button" @click="resetForm">Reset</button>
          </div>

          <div v-if="formSubmitted" class="form-result">
            <h4>Form Data:</h4>
            <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
          </div>
        </form>
      </div>
    </section>

    <!-- Props Documentation -->
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
              <td>String | Number | Boolean</td>
              <td><code>null</code></td>
              <td>The selected value (use with v-model)</td>
            </tr>
            <tr>
              <td><code>options</code></td>
              <td>Array</td>
              <td>—</td>
              <td>Array of options (strings or objects with label, value, disabled)</td>
            </tr>
            <tr>
              <td><code>label</code></td>
              <td>String</td>
              <td><code>''</code></td>
              <td>Group label text</td>
            </tr>
            <tr>
              <td><code>name</code></td>
              <td>String</td>
              <td>—</td>
              <td>Name attribute for the radio group (required)</td>
            </tr>
            <tr>
              <td><code>direction</code></td>
              <td>String</td>
              <td><code>'vertical'</code></td>
              <td>Layout direction: 'vertical' or 'horizontal'</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Disable all radio buttons</td>
            </tr>
            <tr>
              <td><code>required</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Mark as required (shows asterisk)</td>
            </tr>
            <tr>
              <td><code>error</code></td>
              <td>String</td>
              <td><code>''</code></td>
              <td>Error message to display</td>
            </tr>
            <tr>
              <td><code>styleOverrides</code></td>
              <td>Object</td>
              <td><code>{}</code></td>
              <td>CSS variable overrides for customization</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Events Documentation -->
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
              <td>String | Number | Boolean</td>
              <td>Emitted when selection changes (for v-model)</td>
            </tr>
            <tr>
              <td><code>change</code></td>
              <td>String | Number | Boolean</td>
              <td>Emitted when selection changes</td>
            </tr>
            <tr>
              <td><code>focus</code></td>
              <td>—</td>
              <td>Emitted when any radio receives focus</td>
            </tr>
            <tr>
              <td><code>blur</code></td>
              <td>—</td>
              <td>Emitted when any radio loses focus</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Slots Documentation -->
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
              <td><code>label-{value}</code></td>
              <td><code>{ option }</code></td>
              <td>Custom label content for specific option (e.g., <code>label-basic</code>)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import AltrexRadio from '../components/Radio/AltrexRadio.vue'

export default {
  name: 'AltrexRadioView',
  components: {
    AltrexRadio
  },
  data() {
    return {
      // Basic
      basicValue: 'blue',
      basicOptions: ['Red', 'Green', 'Blue', 'Yellow'],

      // Direction
      directionVertical: 'medium',
      directionHorizontal: 'large',
      sizeOptions: ['Small', 'Medium', 'Large', 'X-Large'],

      // Object options
      objectValue: 'pro',
      objectOptions: [
        { label: 'Free Plan', value: 'free', disabled: false },
        { label: 'Pro Plan', value: 'pro', disabled: false },
        { label: 'Enterprise Plan', value: 'enterprise', disabled: true }
      ],

      // States
      stateDefault: 'Option B',
      stateRequired: null,
      stateDisabled: 'Option 2',
      stateError: null,

      // Individual disabled
      individualDisabled: 'standard',
      individualDisabledOptions: [
        { label: 'Express Shipping (Unavailable)', value: 'express', disabled: true },
        { label: 'Standard Shipping', value: 'standard', disabled: false },
        { label: 'Economy Shipping', value: 'economy', disabled: false }
      ],

      // Custom labels
      customLabel: 'pro',
      customLabelOptions: [
        { label: 'Basic', value: 'basic' },
        { label: 'Pro', value: 'pro' },
        { label: 'Enterprise', value: 'enterprise' }
      ],

      // Accessibility
      accessibilityValue: null,

      // Style overrides
      styleOverride1: 'Apple',
      styleOverride2: 'Medium',

      // Form
      formData: {
        experience: null,
        preference: null,
        newsletter: null
      },
      formErrors: {
        experience: '',
        preference: ''
      },
      formSubmitted: false,
      experienceOptions: [
        { label: 'Beginner (0-2 years)', value: 'beginner' },
        { label: 'Intermediate (3-5 years)', value: 'intermediate' },
        { label: 'Advanced (5+ years)', value: 'advanced' }
      ],
      preferenceOptions: [
        { label: 'Remote', value: 'remote' },
        { label: 'Hybrid', value: 'hybrid' },
        { label: 'On-site', value: 'onsite' }
      ]
    }
  },
  methods: {
    handleSubmit() {
      // Validate
      this.formErrors = {
        experience: '',
        preference: ''
      }

      let hasErrors = false

      if (!this.formData.experience) {
        this.formErrors.experience = 'Please select your experience level'
        hasErrors = true
      }

      if (!this.formData.preference) {
        this.formErrors.preference = 'Please select your work preference'
        hasErrors = true
      }

      if (!hasErrors) {
        this.formSubmitted = true
        console.log('Form submitted:', this.formData)
      }
    },
    resetForm() {
      this.formData = {
        experience: null,
        preference: null,
        newsletter: null
      }
      this.formErrors = {
        experience: '',
        preference: ''
      }
      this.formSubmitted = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.demo-view
  padding: $altrex-spacing-8
  max-width: 1200px
  margin: 0 auto

  +above('md')
    padding: $altrex-spacing-12

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

.demo-description
  font-size: $altrex-fontSize-base
  color: var(--altrex-colors-neutral-600)
  margin-bottom: $altrex-spacing-6

  [data-theme="dark"] &
    color: var(--altrex-colors-neutral-400)

.demo-container
  background: var(--altrex-colors-neutral-50)
  border: 1px solid var(--altrex-colors-neutral-200)
  border-radius: $altrex-borderRadius-lg
  padding: $altrex-spacing-6

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-elevated)
    border-color: var(--altrex-colors-dark-border-default)

.demo-grid
  display: grid
  grid-template-columns: 1fr
  gap: $altrex-spacing-6

  +above('md')
    grid-template-columns: repeat(2, 1fr)

.demo-item
  background: var(--altrex-colors-neutral-50)
  border: 1px solid var(--altrex-colors-neutral-200)
  border-radius: $altrex-borderRadius-lg
  padding: $altrex-spacing-6

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-elevated)
    border-color: var(--altrex-colors-dark-border-default)

.demo-label
  font-size: $altrex-fontSize-sm
  font-weight: $altrex-fontWeight-semibold
  color: var(--altrex-colors-neutral-700)
  margin-bottom: $altrex-spacing-4
  text-transform: uppercase
  letter-spacing: 0.05em

  [data-theme="dark"] &
    color: var(--altrex-colors-neutral-300)

.demo-output
  margin-top: $altrex-spacing-4
  padding: $altrex-spacing-3
  background: var(--altrex-colors-neutral-100)
  border-radius: $altrex-borderRadius-default
  font-size: $altrex-fontSize-sm

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-subtle)

  code
    color: $altrex-colors-primary-600
    font-weight: $altrex-fontWeight-semibold

    [data-theme="dark"] &
      color: $altrex-colors-primary-400

// Custom label styling
.custom-label
  display: flex
  flex-direction: column
  gap: $altrex-spacing-1

  &__title
    font-weight: $altrex-fontWeight-semibold
    color: var(--altrex-colors-neutral-900)

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-primary)

  &__price
    font-size: $altrex-fontSize-sm
    color: var(--altrex-colors-neutral-600)

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-secondary)

// Accessibility info
.accessibility-info
  padding: $altrex-spacing-6
  background: var(--altrex-colors-primary-50)
  border-left: 4px solid $altrex-colors-primary-500
  border-radius: $altrex-borderRadius-default
  margin-bottom: $altrex-spacing-6

  [data-theme="dark"] &
    background: rgba(59, 130, 246, 0.1)

  h3
    font-size: $altrex-fontSize-base
    font-weight: $altrex-fontWeight-semibold
    color: var(--altrex-colors-neutral-900)
    margin-bottom: $altrex-spacing-3

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-primary)

  ul
    list-style: disc
    padding-left: $altrex-spacing-6
    margin-bottom: $altrex-spacing-4

    &:last-child
      margin-bottom: 0

  li
    color: var(--altrex-colors-neutral-700)
    margin-bottom: $altrex-spacing-2

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-secondary)

  code
    background: rgba(0, 0, 0, 0.1)
    padding: 2px 6px
    border-radius: 3px
    font-size: $altrex-fontSize-sm

  kbd
    background: var(--altrex-colors-neutral-200)
    padding: 2px 6px
    border-radius: 3px
    font-size: $altrex-fontSize-sm
    font-weight: $altrex-fontWeight-semibold
    border: 1px solid var(--altrex-colors-neutral-300)

    [data-theme="dark"] &
      background: var(--altrex-colors-dark-bg-subtle)
      border-color: var(--altrex-colors-dark-border-default)

// Form styling
.demo-form
  display: flex
  flex-direction: column
  gap: $altrex-spacing-6

.form-actions
  display: flex
  gap: $altrex-spacing-3
  margin-top: $altrex-spacing-4

.submit-button,
.reset-button
  min-height: $altrex-touchTarget-minimum
  padding: $altrex-spacing-3 $altrex-spacing-6
  border-radius: $altrex-borderRadius-default
  font-size: 16px
  font-weight: $altrex-fontWeight-medium
  cursor: pointer
  transition: all $altrex-transition-default

  +above('md')
    min-height: 40px
    font-size: $altrex-fontSize-base

.submit-button
  background: $altrex-colors-primary-500
  color: $altrex-colors-neutral-50
  border: none

  &:hover
    background: $altrex-colors-primary-600

  +touch-device()
    &:active
      transform: scale(0.98)

.reset-button
  background: transparent
  color: var(--altrex-colors-neutral-700)
  border: 1px solid var(--altrex-colors-neutral-300)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-primary)
    border-color: var(--altrex-colors-dark-border-default)

  &:hover
    background: var(--altrex-colors-neutral-100)

    [data-theme="dark"] &
      background: var(--altrex-colors-dark-bg-hover)

  +touch-device()
    &:active
      transform: scale(0.98)

.form-result
  padding: $altrex-spacing-4
  background: var(--altrex-colors-success-50)
  border: 1px solid var(--altrex-colors-success-200)
  border-radius: $altrex-borderRadius-default

  [data-theme="dark"] &
    background: rgba(16, 185, 129, 0.1)
    border-color: rgba(16, 185, 129, 0.3)

  h4
    font-size: $altrex-fontSize-base
    font-weight: $altrex-fontWeight-semibold
    color: var(--altrex-colors-success-700)
    margin-bottom: $altrex-spacing-3

    [data-theme="dark"] &
      color: var(--altrex-colors-success-400)

  pre
    background: var(--altrex-colors-neutral-900)
    color: var(--altrex-colors-neutral-50)
    padding: $altrex-spacing-4
    border-radius: $altrex-borderRadius-default
    overflow-x: auto
    font-size: $altrex-fontSize-sm

// Props table
.props-table
  overflow-x: auto

  table
    width: 100%
    border-collapse: collapse
    font-size: $altrex-fontSize-sm

    thead
      background: var(--altrex-colors-neutral-100)

      [data-theme="dark"] &
        background: var(--altrex-colors-dark-bg-subtle)

    th
      text-align: left
      padding: $altrex-spacing-3
      font-weight: $altrex-fontWeight-semibold
      color: var(--altrex-colors-neutral-900)
      border-bottom: 2px solid var(--altrex-colors-neutral-300)

      [data-theme="dark"] &
        color: var(--altrex-colors-dark-text-primary)
        border-color: var(--altrex-colors-dark-border-default)

    td
      padding: $altrex-spacing-3
      border-bottom: 1px solid var(--altrex-colors-neutral-200)
      color: var(--altrex-colors-neutral-700)

      [data-theme="dark"] &
        border-color: var(--altrex-colors-dark-border-subtle)
        color: var(--altrex-colors-dark-text-secondary)

    code
      background: var(--altrex-colors-neutral-100)
      padding: 2px 6px
      border-radius: 3px
      color: $altrex-colors-primary-600
      font-weight: $altrex-fontWeight-medium

      [data-theme="dark"] &
        background: var(--altrex-colors-dark-bg-subtle)
        color: $altrex-colors-primary-400
</style>
