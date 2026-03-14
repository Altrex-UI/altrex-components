<template>
  <div class="demo-view">
    <h1>AltrexAlert</h1>
    <p class="subtitle">Display static alert messages with semantic variants and customizable styles</p>

    <!-- Variants Section -->
    <section class="demo-section">
      <h2>Variants</h2>
      <p class="description">Alert supports four semantic variants for different message types.</p>
      <div class="demo-stack">
        <AltrexAlert
          variant="success"
          message="Your changes have been saved successfully!"
        />
        <AltrexAlert
          variant="warning"
          message="Please review your settings before continuing."
        />
        <AltrexAlert
          variant="danger"
          message="An error occurred while processing your request."
        />
        <AltrexAlert
          variant="info"
          message="This is some helpful information for you."
        />
      </div>
    </section>

    <!-- With Title Section -->
    <section class="demo-section">
      <h2>With Title</h2>
      <p class="description">Alerts can include an optional title for better organization.</p>
      <div class="demo-stack">
        <AltrexAlert
          variant="success"
          title="Success"
          message="Your workout has been logged successfully!"
        />
        <AltrexAlert
          variant="warning"
          title="Warning"
          message="You have exceeded your daily calorie target."
        />
        <AltrexAlert
          variant="danger"
          title="Error"
          message="Failed to sync with fitness tracker."
        />
        <AltrexAlert
          variant="info"
          title="Tip"
          message="Remember to warm up before starting your workout."
        />
      </div>
    </section>

    <!-- Style Variants Section -->
    <section class="demo-section">
      <h2>Style Variants</h2>
      <p class="description">Choose between filled, outlined, or soft styles.</p>

      <h3>Filled Style (Default)</h3>
      <div class="demo-stack">
        <AltrexAlert
          variant="success"
          style="filled"
          title="Filled Success"
          message="This is a filled success alert with strong visual presence."
        />
        <AltrexAlert
          variant="info"
          style="filled"
          title="Filled Info"
          message="This is a filled info alert with strong visual presence."
        />
      </div>

      <h3>Outlined Style</h3>
      <div class="demo-stack">
        <AltrexAlert
          variant="success"
          style="outlined"
          title="Outlined Success"
          message="This is an outlined success alert with subtle background."
        />
        <AltrexAlert
          variant="info"
          style="outlined"
          title="Outlined Info"
          message="This is an outlined info alert with subtle background."
        />
      </div>

      <h3>Soft Style</h3>
      <div class="demo-stack">
        <AltrexAlert
          variant="success"
          style="soft"
          title="Soft Success"
          message="This is a soft success alert with light background and border."
        />
        <AltrexAlert
          variant="info"
          style="soft"
          title="Soft Info"
          message="This is a soft info alert with light background and border."
        />
      </div>
    </section>

    <!-- With Close Button Section -->
    <section class="demo-section">
      <h2>Closable Alerts</h2>
      <p class="description">Alerts can be made dismissible with a close button.</p>
      <div class="demo-stack">
        <AltrexAlert
          v-if="showAlert1"
          variant="success"
          title="Dismissible Alert"
          message="Click the X button to close this alert."
          :closable="true"
          @close="showAlert1 = false"
        />
        <AltrexAlert
          v-if="showAlert2"
          variant="warning"
          message="This warning can be dismissed."
          :closable="true"
          @close="showAlert2 = false"
        />
        <button
          v-if="!showAlert1 || !showAlert2"
          class="reset-button"
          @click="resetAlerts"
        >
          Reset Dismissed Alerts
        </button>
      </div>
    </section>

    <!-- Without Icon Section -->
    <section class="demo-section">
      <h2>Without Icon</h2>
      <p class="description">Icons can be hidden for a more minimal appearance.</p>
      <div class="demo-stack">
        <AltrexAlert
          variant="success"
          title="Success Without Icon"
          message="This alert doesn't display an icon."
          :show-icon="false"
        />
        <AltrexAlert
          variant="info"
          message="Simple info message without an icon."
          :show-icon="false"
        />
      </div>
    </section>

    <!-- Custom Icon Section -->
    <section class="demo-section">
      <h2>Custom Icon</h2>
      <p class="description">Override the default icon with a custom one.</p>
      <div class="demo-stack">
        <AltrexAlert
          variant="success"
          title="Custom Icon"
          message="This alert uses a custom star icon."
          icon="generic-star"
        />
        <AltrexAlert
          variant="info"
          message="This alert uses a bell icon for notifications."
          icon="generic-bell"
        />
      </div>
    </section>

    <!-- Using Slots Section -->
    <section class="demo-section">
      <h2>Using Slots</h2>
      <p class="description">Use the default slot for rich content beyond simple text.</p>
      <div class="demo-stack">
        <AltrexAlert variant="info" title="Rich Content">
          <p style="margin: 0 0 8px 0">You can include any HTML content in the alert:</p>
          <ul style="margin: 0; padding-left: 20px">
            <li>Formatted text and lists</li>
            <li>Links: <a href="#" style="color: inherit; text-decoration: underline">Learn more</a></li>
            <li>Custom styling and layout</li>
          </ul>
        </AltrexAlert>
      </div>
    </section>

    <!-- All Combinations Section -->
    <section class="demo-section">
      <h2>All Variant & Style Combinations</h2>
      <p class="description">Complete matrix of all variants and styles.</p>

      <div class="demo-grid">
        <div
          v-for="variant in ['success', 'warning', 'danger', 'info']"
          :key="variant"
          class="demo-grid-column"
        >
          <h4 class="variant-title">{{ capitalize(variant) }}</h4>
          <div class="demo-stack">
            <AltrexAlert
              :variant="variant"
              style="filled"
              :message="`Filled ${variant}`"
            />
            <AltrexAlert
              :variant="variant"
              style="outlined"
              :message="`Outlined ${variant}`"
            />
            <AltrexAlert
              :variant="variant"
              style="soft"
              :message="`Soft ${variant}`"
            />
          </div>
        </div>
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
              <td><code>message</code></td>
              <td>String</td>
              <td>''</td>
              <td>Alert message text</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td>String</td>
              <td>''</td>
              <td>Optional alert title</td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td>String</td>
              <td>'info'</td>
              <td>Alert semantic variant: 'success', 'warning', 'danger', 'info'</td>
            </tr>
            <tr>
              <td><code>style</code></td>
              <td>String</td>
              <td>'filled'</td>
              <td>Alert style type: 'filled', 'outlined', 'soft'</td>
            </tr>
            <tr>
              <td><code>showIcon</code></td>
              <td>Boolean</td>
              <td>true</td>
              <td>Whether to show the icon</td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td>String</td>
              <td>null</td>
              <td>Custom icon name (overrides default variant icon)</td>
            </tr>
            <tr>
              <td><code>closable</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Whether to show close button</td>
            </tr>
            <tr>
              <td><code>styleOverrides</code></td>
              <td>Object</td>
              <td>{}</td>
              <td>Custom CSS variable overrides</td>
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
              <td><code>close</code></td>
              <td>none</td>
              <td>Emitted when the close button is clicked</td>
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
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>default</code></td>
              <td>Alert message content (overrides message prop)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import AltrexAlert from '../components/Alert/AltrexAlert.vue'

export default {
  name: 'AltrexAlertView',
  components: {
    AltrexAlert
  },
  data() {
    return {
      showAlert1: true,
      showAlert2: true
    }
  },
  methods: {
    resetAlerts() {
      this.showAlert1 = true
      this.showAlert2 = true
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
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
    margin-bottom: $altrex-spacing-2

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-200)

  h3
    font-size: $altrex-fontSize-xl
    font-weight: $altrex-fontWeight-medium
    color: var(--altrex-colors-neutral-700)
    margin-top: $altrex-spacing-6
    margin-bottom: $altrex-spacing-3

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-300)

  h4
    font-size: $altrex-fontSize-lg
    font-weight: $altrex-fontWeight-medium
    color: var(--altrex-colors-neutral-700)
    margin-bottom: $altrex-spacing-3

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-300)

  .description
    font-size: $altrex-fontSize-base
    color: var(--altrex-colors-neutral-600)
    margin-bottom: $altrex-spacing-4

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-400)

.demo-stack
  display: flex
  flex-direction: column
  gap: $altrex-spacing-4

.demo-grid
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
  gap: $altrex-spacing-6

.demo-grid-column
  display: flex
  flex-direction: column

.variant-title
  text-align: center
  text-transform: capitalize

.reset-button
  padding: $altrex-spacing-3 $altrex-spacing-5
  background: $altrex-colors-primary-500
  color: #ffffff
  border: none
  border-radius: $altrex-borderRadius-default
  font-size: $altrex-fontSize-sm
  font-weight: $altrex-fontWeight-medium
  cursor: pointer
  transition: all $altrex-transition-default

  &:hover
    background: $altrex-colors-primary-600

  &:active
    transform: scale(0.98)

  [data-theme="dark"] &
    background: $altrex-colors-dark-primary-default

    &:hover
      background: $altrex-colors-dark-primary-hover

.props-table
  overflow-x: auto

  table
    width: 100%
    border-collapse: collapse
    font-size: $altrex-fontSize-sm

    th, td
      text-align: left
      padding: $altrex-spacing-3
      border-bottom: 1px solid var(--altrex-colors-neutral-200)

      [data-theme="dark"] &
        border-color: var(--altrex-colors-dark-border-default)

    th
      font-weight: $altrex-fontWeight-semibold
      color: var(--altrex-colors-neutral-900)
      background: var(--altrex-colors-neutral-50)

      [data-theme="dark"] &
        color: var(--altrex-colors-dark-text-primary)
        background: var(--altrex-colors-dark-bg-surface)

    td
      color: var(--altrex-colors-neutral-700)

      [data-theme="dark"] &
        color: var(--altrex-colors-dark-text-secondary)

    code
      padding: 2px 6px
      background: var(--altrex-colors-neutral-100)
      border-radius: $altrex-borderRadius-sm
      font-family: 'Courier New', monospace
      font-size: 0.9em
      color: var(--altrex-colors-neutral-900)

      [data-theme="dark"] &
        background: var(--altrex-colors-dark-bg-hover)
        color: var(--altrex-colors-dark-text-primary)
</style>
