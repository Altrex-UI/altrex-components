<template>
  <div class="demo-view">
    <h1>AltrexToggle</h1>
    <p class="subtitle">Toggle switch component for on/off states with optional labels</p>

    <section class="demo-section">
      <h2>Sizes</h2>
      <div class="demo-grid">
        <AltrexToggle
          v-model="basicToggle"
          size="s"
          label="Small Toggle"
        />
        <AltrexToggle
          v-model="basicToggle"
          size="m"
          label="Medium Toggle (Default)"
        />
        <AltrexToggle
          v-model="basicToggle"
          size="l"
          label="Large Toggle"
        />
      </div>
      <p class="demo-value">State: {{ basicToggle }}</p>
    </section>

    <section class="demo-section">
      <h2>Basic Usage</h2>
      <div class="demo-grid">
        <AltrexToggle
          v-model="notifications"
          label="Enable notifications"
        />
        <AltrexToggle
          v-model="autoSave"
          label="Auto-save changes"
        />
        <AltrexToggle
          v-model="darkMode"
          label="Dark mode"
        />
      </div>
      <p class="demo-value">Notifications: {{ notifications }}, Auto-save: {{ autoSave }}, Dark mode: {{ darkMode }}</p>
    </section>

    <section class="demo-section">
      <h2>Left/Right Labels</h2>
      <div class="demo-column">
        <AltrexToggle
          v-model="leftRightToggle"
          left-label="Off"
          right-label="On"
        />
        <AltrexToggle
          v-model="publicPrivate"
          left-label="Private"
          right-label="Public"
        />
        <AltrexToggle
          v-model="imperial"
          left-label="Metric"
          right-label="Imperial"
        />
      </div>
      <p class="demo-value">State: {{ leftRightToggle }}, Public: {{ publicPrivate }}, Imperial: {{ imperial }}</p>
    </section>

    <section class="demo-section">
      <h2>With Slot Content</h2>
      <div class="demo-column">
        <AltrexToggle v-model="customContent">
          <span class="custom-label">
            <strong>Premium Feature</strong> - Get access to advanced analytics
          </span>
        </AltrexToggle>

        <AltrexToggle v-model="customContent2">
          <template #leftLabel>
            <span class="custom-label">🌙 Dark</span>
          </template>
          <template #rightLabel>
            <span class="custom-label">☀️ Light</span>
          </template>
        </AltrexToggle>
      </div>
    </section>

    <section class="demo-section">
      <h2>Validation</h2>
      <div class="demo-grid">
        <AltrexToggle
          v-model="errorToggle"
          label="Toggle with error"
          error="This setting is required"
        />
        <AltrexToggle
          v-model="hintToggle"
          label="Toggle with hint"
        >
          <template #hint>Enabling this will send you weekly reports</template>
        </AltrexToggle>
      </div>
    </section>

    <section class="demo-section">
      <h2>States</h2>
      <div class="demo-grid">
        <AltrexToggle
          v-model="basicToggle"
          label="Normal"
        />
        <AltrexToggle
          :model-value="false"
          label="Disabled (Off)"
          disabled
        />
        <AltrexToggle
          :model-value="true"
          label="Disabled (On)"
          disabled
        />
        <AltrexToggle
          v-model="requiredToggle"
          label="Required"
          required
        />
      </div>
    </section>

    <section class="demo-section">
      <h2>Real World Examples</h2>
      <div class="demo-column">
        <h3>Workout Settings</h3>
        <AltrexToggle
          v-model="workoutSettings.showRestTimer"
          label="Show rest timer between sets"
        />
        <AltrexToggle
          v-model="workoutSettings.autoStartTimer"
          label="Auto-start rest timer"
        />
        <AltrexToggle
          v-model="workoutSettings.playSound"
          label="Play sound when rest timer ends"
        />
        <AltrexToggle
          v-model="workoutSettings.vibrate"
          label="Vibrate on timer completion"
        />
        <AltrexToggle
          v-model="workoutSettings.trackVolume"
          label="Track total volume (weight × reps)"
        />
      </div>
      <p class="demo-value">{{ workoutSettings }}</p>

      <div class="demo-column" style="margin-top: 2rem;">
        <h3>User Preferences</h3>
        <AltrexToggle
          v-model="userPrefs.emailNotifications"
          label="Email notifications"
        />
        <AltrexToggle
          v-model="userPrefs.pushNotifications"
          label="Push notifications"
        />
        <AltrexToggle
          v-model="userPrefs.weeklyReport"
          label="Weekly progress report"
        />
        <AltrexToggle
          v-model="userPrefs.publicProfile"
          label="Public profile"
        />
      </div>
      <p class="demo-value">{{ userPrefs }}</p>

      <div class="demo-column" style="margin-top: 2rem;">
        <h3>Units</h3>
        <AltrexToggle
          v-model="units.weight"
          left-label="kg"
          right-label="lbs"
        />
        <AltrexToggle
          v-model="units.distance"
          left-label="km"
          right-label="miles"
        />
        <AltrexToggle
          v-model="units.height"
          left-label="cm"
          right-label="inches"
        />
      </div>
      <p class="demo-value">Weight: {{ units.weight ? 'lbs' : 'kg' }}, Distance: {{ units.distance ? 'miles' : 'km' }}, Height: {{ units.height ? 'inches' : 'cm' }}</p>
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
              <td>Boolean</td>
              <td>false</td>
              <td>v-model value</td>
            </tr>
            <tr>
              <td><code>label</code></td>
              <td>String</td>
              <td>''</td>
              <td>Label text (displayed on right)</td>
            </tr>
            <tr>
              <td><code>leftLabel</code></td>
              <td>String</td>
              <td>''</td>
              <td>Label displayed on left side of toggle</td>
            </tr>
            <tr>
              <td><code>rightLabel</code></td>
              <td>String</td>
              <td>''</td>
              <td>Label displayed on right side of toggle</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Disable toggle</td>
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
              <td>Boolean</td>
              <td>Emitted on value change</td>
            </tr>
            <tr>
              <td><code>change</code></td>
              <td>Boolean</td>
              <td>Emitted on toggle change</td>
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
              <td>Custom label content (displayed on right)</td>
            </tr>
            <tr>
              <td><code>leftLabel</code></td>
              <td>Custom left label content</td>
            </tr>
            <tr>
              <td><code>rightLabel</code></td>
              <td>Custom right label content</td>
            </tr>
            <tr>
              <td><code>hint</code></td>
              <td>Hint message below toggle</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import AltrexToggle from '../components/Toggle/AltrexToggle.vue'

export default {
  name: 'AltrexToggleView',

  components: {
    AltrexToggle
  },

  data() {
    return {
      basicToggle: false,
      notifications: true,
      autoSave: false,
      darkMode: false,
      leftRightToggle: false,
      publicPrivate: false,
      imperial: false,
      customContent: false,
      customContent2: true,
      errorToggle: false,
      hintToggle: false,
      requiredToggle: false,

      workoutSettings: {
        showRestTimer: true,
        autoStartTimer: true,
        playSound: false,
        vibrate: true,
        trackVolume: true
      },

      userPrefs: {
        emailNotifications: true,
        pushNotifications: true,
        weeklyReport: false,
        publicProfile: false
      },

      units: {
        weight: false, // false = kg, true = lbs
        distance: false, // false = km, true = miles
        height: false // false = cm, true = inches
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

  h3
    font-size: $altrex-fontSize-lg
    font-weight: $altrex-fontWeight-medium
    color: var(--altrex-colors-neutral-700)
    margin-bottom: $altrex-spacing-4

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-300)

.demo-grid
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
  gap: $altrex-spacing-4

.demo-column
  display: flex
  flex-direction: column
  gap: $altrex-spacing-3

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
  strong
    color: var(--altrex-colors-neutral-900)

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-100)

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
