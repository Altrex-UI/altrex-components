<template>
  <div class="demo-view">
    <h1>AltrexProgress</h1>
    <p class="subtitle">Linear and circular progress indicators with variants, animations, and labels</p>

    <section class="demo-section">
      <h2>Linear Progress - Sizes</h2>
      <p class="demo-description">Three size variants: small (s), medium (m), and large (l)</p>
      <div class="demo-stack">
        <AltrexProgress :value="65" size="s" show-label label-position="outside" />
        <AltrexProgress :value="65" size="m" show-label label-position="outside" />
        <AltrexProgress :value="65" size="l" show-label label-position="outside" />
      </div>
    </section>

    <section class="demo-section">
      <h2>Variants</h2>
      <p class="demo-description">Five color variants for different states and contexts</p>
      <div class="demo-stack">
        <div class="demo-progress-item">
          <span class="demo-progress-label">Primary</span>
          <AltrexProgress :value="75" variant="primary" />
        </div>
        <div class="demo-progress-item">
          <span class="demo-progress-label">Success</span>
          <AltrexProgress :value="100" variant="success" />
        </div>
        <div class="demo-progress-item">
          <span class="demo-progress-label">Warning</span>
          <AltrexProgress :value="50" variant="warning" />
        </div>
        <div class="demo-progress-item">
          <span class="demo-progress-label">Danger</span>
          <AltrexProgress :value="25" variant="danger" />
        </div>
        <div class="demo-progress-item">
          <span class="demo-progress-label">Info</span>
          <AltrexProgress :value="60" variant="info" />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>With Labels</h2>
      <p class="demo-description">Show progress with inside or outside labels</p>
      <div class="demo-stack">
        <div class="demo-progress-item">
          <span class="demo-progress-label">Inside Label</span>
          <AltrexProgress :value="65" size="l" show-label label-position="inside" />
        </div>
        <div class="demo-progress-item">
          <span class="demo-progress-label">Outside Label</span>
          <AltrexProgress :value="65" show-label label-position="outside" />
        </div>
        <div class="demo-progress-item">
          <span class="demo-progress-label">Value Format</span>
          <AltrexProgress :value="45" :max="60" show-label label-format="value" label-position="outside" />
        </div>
        <div class="demo-progress-item">
          <span class="demo-progress-label">Custom Label</span>
          <AltrexProgress :value="12" :max="15" show-label custom-label="12 of 15 exercises" label-position="outside" />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Striped & Animated</h2>
      <p class="demo-description">Add striped pattern with optional animation</p>
      <div class="demo-stack">
        <div class="demo-progress-item">
          <span class="demo-progress-label">Striped</span>
          <AltrexProgress :value="70" size="l" striped />
        </div>
        <div class="demo-progress-item">
          <span class="demo-progress-label">Striped + Animated</span>
          <AltrexProgress :value="70" size="l" striped animated variant="success" />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Interactive Demo</h2>
      <p class="demo-description">Control the progress value with a slider</p>
      <div class="demo-stack">
        <div class="demo-controls">
          <label>Value: {{ interactiveValue }}%</label>
          <input
            v-model.number="interactiveValue"
            type="range"
            min="0"
            max="100"
            class="demo-slider"
          />
        </div>
        <AltrexProgress
          :value="interactiveValue"
          size="l"
          show-label
          label-position="inside"
          :variant="getVariantForValue(interactiveValue)"
        />
      </div>
    </section>

    <section class="demo-section">
      <h2>Circular Progress</h2>
      <p class="demo-description">Circular progress indicators for compact displays</p>
      <div class="demo-grid">
        <div class="demo-circular-item">
          <AltrexProgress :value="75" type="circular" variant="primary" show-label />
          <span class="demo-label">Primary</span>
        </div>
        <div class="demo-circular-item">
          <AltrexProgress :value="100" type="circular" variant="success" show-label />
          <span class="demo-label">Complete</span>
        </div>
        <div class="demo-circular-item">
          <AltrexProgress :value="50" type="circular" variant="warning" show-label />
          <span class="demo-label">Warning</span>
        </div>
        <div class="demo-circular-item">
          <AltrexProgress :value="25" type="circular" variant="danger" show-label />
          <span class="demo-label">Danger</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Circular Sizes</h2>
      <p class="demo-description">Customize circular progress size</p>
      <div class="demo-grid">
        <div class="demo-circular-item">
          <AltrexProgress :value="65" type="circular" :circular-size="80" :stroke-width="6" show-label />
          <span class="demo-label">Small (80px)</span>
        </div>
        <div class="demo-circular-item">
          <AltrexProgress :value="65" type="circular" :circular-size="120" :stroke-width="8" show-label />
          <span class="demo-label">Medium (120px)</span>
        </div>
        <div class="demo-circular-item">
          <AltrexProgress :value="65" type="circular" :circular-size="160" :stroke-width="10" show-label />
          <span class="demo-label">Large (160px)</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Workout Progress Examples</h2>
      <p class="demo-description">Real-world examples for gym&tonic app</p>
      <div class="demo-stack">
        <div class="workout-example">
          <div class="workout-info">
            <h3>Bench Press - Set 3 of 4</h3>
            <p>Current: 225 lbs × 8 reps</p>
          </div>
          <AltrexProgress :value="75" :max="100" variant="primary" size="l" show-label custom-label="3/4 sets" label-position="outside" striped />
        </div>
        <div class="workout-example">
          <div class="workout-info">
            <h3>Rest Timer</h3>
            <p>{{ restSeconds }} seconds remaining</p>
          </div>
          <AltrexProgress :value="restSeconds" :max="90" variant="info" size="l" show-label :custom-label="`${restSeconds}s`" label-position="outside" />
        </div>
        <div class="workout-example">
          <div class="workout-info">
            <h3>Today's Workout</h3>
            <p>5 of 8 exercises completed</p>
          </div>
          <AltrexProgress :value="62.5" variant="success" size="l" show-label custom-label="5/8 exercises" label-position="outside" />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Circular Workout Stats</h2>
      <p class="demo-description">Compact stats display for dashboard</p>
      <div class="demo-grid">
        <div class="workout-stat-card">
          <AltrexProgress :value="4" :max="5" type="circular" variant="primary" show-label label-format="value" :circular-size="100" />
          <div class="stat-info">
            <h4>Workouts</h4>
            <p>This Week</p>
          </div>
        </div>
        <div class="workout-stat-card">
          <AltrexProgress :value="15250" :max="20000" type="circular" variant="success" show-label :custom-label="'76%'" :circular-size="100" />
          <div class="stat-info">
            <h4>Volume</h4>
            <p>15,250 lbs</p>
          </div>
        </div>
        <div class="workout-stat-card">
          <AltrexProgress :value="285" :max="300" type="circular" variant="warning" show-label :custom-label="'95%'" :circular-size="100" />
          <div class="stat-info">
            <h4>Minutes</h4>
            <p>285 / 300 min</p>
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
              <td><code>value</code></td>
              <td>Number</td>
              <td><code>0</code></td>
              <td>Current progress value</td>
            </tr>
            <tr>
              <td><code>max</code></td>
              <td>Number</td>
              <td><code>100</code></td>
              <td>Maximum value</td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td>String</td>
              <td><code>'primary'</code></td>
              <td>Color variant: 'primary', 'success', 'warning', 'danger', 'info'</td>
            </tr>
            <tr>
              <td><code>type</code></td>
              <td>String</td>
              <td><code>'linear'</code></td>
              <td>Progress type: 'linear', 'circular'</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>String</td>
              <td><code>'m'</code></td>
              <td>Linear size: 's', 'm', 'l'</td>
            </tr>
            <tr>
              <td><code>striped</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Add striped pattern (linear only)</td>
            </tr>
            <tr>
              <td><code>animated</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Animate stripes (requires striped)</td>
            </tr>
            <tr>
              <td><code>showLabel</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Show progress label</td>
            </tr>
            <tr>
              <td><code>labelPosition</code></td>
              <td>String</td>
              <td><code>'inside'</code></td>
              <td>Label position: 'inside', 'outside' (linear only)</td>
            </tr>
            <tr>
              <td><code>labelFormat</code></td>
              <td>String</td>
              <td><code>'percentage'</code></td>
              <td>Label format: 'percentage', 'value', 'custom'</td>
            </tr>
            <tr>
              <td><code>customLabel</code></td>
              <td>String</td>
              <td><code>''</code></td>
              <td>Custom label text</td>
            </tr>
            <tr>
              <td><code>circularSize</code></td>
              <td>Number</td>
              <td><code>120</code></td>
              <td>Circular progress size in pixels</td>
            </tr>
            <tr>
              <td><code>strokeWidth</code></td>
              <td>Number</td>
              <td><code>8</code></td>
              <td>Circular progress stroke width</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import AltrexProgress from '../components/Progress/AltrexProgress.vue'

export default {
  name: 'AltrexProgressView',
  components: {
    AltrexProgress
  },
  data() {
    return {
      interactiveValue: 65,
      restSeconds: 90
    }
  },
  mounted() {
    // Simulate rest timer countdown
    this.restInterval = setInterval(() => {
      if (this.restSeconds > 0) {
        this.restSeconds--
      } else {
        this.restSeconds = 90
      }
    }, 1000)
  },
  beforeUnmount() {
    if (this.restInterval) {
      clearInterval(this.restInterval)
    }
  },
  methods: {
    getVariantForValue(value) {
      if (value >= 75) return 'success'
      if (value >= 50) return 'primary'
      if (value >= 25) return 'warning'
      return 'danger'
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
    margin-bottom: $altrex-spacing-4

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-200)

.demo-description
  font-size: $altrex-fontSize-base
  color: var(--altrex-colors-neutral-600)
  margin-bottom: $altrex-spacing-6

  [data-theme="dark"] &
    color: var(--altrex-colors-neutral-400)

.demo-stack
  display: flex
  flex-direction: column
  gap: $altrex-spacing-6

.demo-grid
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr))
  gap: $altrex-spacing-6

.demo-progress-item
  display: flex
  flex-direction: column
  gap: $altrex-spacing-2

.demo-progress-label
  font-size: $altrex-fontSize-sm
  font-weight: $altrex-fontWeight-medium
  color: var(--altrex-colors-neutral-700)

  [data-theme="dark"] &
    color: var(--altrex-colors-neutral-300)

.demo-circular-item
  display: flex
  flex-direction: column
  align-items: center
  gap: $altrex-spacing-3

.demo-label
  font-size: $altrex-fontSize-sm
  color: var(--altrex-colors-neutral-600)

  [data-theme="dark"] &
    color: var(--altrex-colors-neutral-400)

.demo-controls
  display: flex
  flex-direction: column
  gap: $altrex-spacing-2

  label
    font-size: $altrex-fontSize-sm
    font-weight: $altrex-fontWeight-medium
    color: var(--altrex-colors-neutral-700)

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-300)

.demo-slider
  width: 100%
  height: 6px
  border-radius: 3px
  background: var(--altrex-colors-neutral-200)
  outline: none
  -webkit-appearance: none

  [data-theme="dark"] &
    background: var(--altrex-colors-neutral-700)

  &::-webkit-slider-thumb
    -webkit-appearance: none
    appearance: none
    width: 18px
    height: 18px
    border-radius: 50%
    background: var(--altrex-colors-primary-500)
    cursor: pointer

  &::-moz-range-thumb
    width: 18px
    height: 18px
    border-radius: 50%
    background: var(--altrex-colors-primary-500)
    cursor: pointer
    border: none

.workout-example
  padding: $altrex-spacing-6
  background: var(--altrex-colors-neutral-50)
  border-radius: $altrex-borderRadius-lg
  border: 1px solid var(--altrex-colors-neutral-200)

  [data-theme="dark"] &
    background: var(--altrex-colors-neutral-800)
    border-color: var(--altrex-colors-neutral-700)

.workout-info
  margin-bottom: $altrex-spacing-4

  h3
    font-size: $altrex-fontSize-lg
    font-weight: $altrex-fontWeight-semibold
    color: var(--altrex-colors-neutral-900)
    margin: 0 0 $altrex-spacing-1 0

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-100)

  p
    font-size: $altrex-fontSize-sm
    color: var(--altrex-colors-neutral-600)
    margin: 0

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-400)

.workout-stat-card
  padding: $altrex-spacing-6
  background: var(--altrex-colors-neutral-50)
  border-radius: $altrex-borderRadius-lg
  border: 1px solid var(--altrex-colors-neutral-200)
  display: flex
  flex-direction: column
  align-items: center
  gap: $altrex-spacing-4

  [data-theme="dark"] &
    background: var(--altrex-colors-neutral-800)
    border-color: var(--altrex-colors-neutral-700)

.stat-info
  text-align: center

  h4
    font-size: $altrex-fontSize-base
    font-weight: $altrex-fontWeight-semibold
    color: var(--altrex-colors-neutral-900)
    margin: 0 0 $altrex-spacing-1 0

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-100)

  p
    font-size: $altrex-fontSize-sm
    color: var(--altrex-colors-neutral-600)
    margin: 0

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
      padding: $altrex-spacing-3
      border-bottom: 1px solid var(--altrex-colors-neutral-200)

      [data-theme="dark"] &
        border-bottom-color: var(--altrex-colors-neutral-700)

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
        background: var(--altrex-colors-neutral-800)
</style>
