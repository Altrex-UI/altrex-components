<template>
  <div class="demo-view">
    <h1>AltrexTimer</h1>
    <p class="subtitle">Countdown timer for rest periods and timed exercises</p>

    <section class="demo-section">
      <h2>Sizes</h2>
      <p class="description">Three size variants: small, medium (default), and large</p>
      <div class="demo-grid">
        <div class="demo-item">
          <AltrexTimer size="s" :initial-time="90" />
          <span class="demo-label">Small (s)</span>
        </div>
        <div class="demo-item">
          <AltrexTimer size="m" :initial-time="90" />
          <span class="demo-label">Medium (m) - Default</span>
        </div>
        <div class="demo-item">
          <AltrexTimer size="l" :initial-time="90" />
          <span class="demo-label">Large (l)</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Variants</h2>
      <p class="description">Color variants to match different workout contexts</p>
      <div class="demo-grid">
        <div class="demo-item">
          <AltrexTimer variant="primary" :initial-time="60" />
          <span class="demo-label">Primary</span>
        </div>
        <div class="demo-item">
          <AltrexTimer variant="success" :initial-time="60" />
          <span class="demo-label">Success</span>
        </div>
        <div class="demo-item">
          <AltrexTimer variant="warning" :initial-time="60" />
          <span class="demo-label">Warning</span>
        </div>
        <div class="demo-item">
          <AltrexTimer variant="danger" :initial-time="60" />
          <span class="demo-label">Danger</span>
        </div>
        <div class="demo-item">
          <AltrexTimer variant="info" :initial-time="60" />
          <span class="demo-label">Info</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Preset Times</h2>
      <p class="description">Quick access to common rest period durations</p>
      <div class="demo-grid">
        <div class="demo-item">
          <AltrexTimer :initial-time="90" />
          <span class="demo-label">Default Presets (30s, 60s, 90s, 2m, 3m, 5m)</span>
        </div>
        <div class="demo-item">
          <AltrexTimer
            :initial-time="45"
            :presets="[15, 30, 45, 60]"
          />
          <span class="demo-label">Custom Presets (15s, 30s, 45s, 60s)</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Configuration Options</h2>
      <p class="description">Hide controls or presets as needed</p>
      <div class="demo-grid">
        <div class="demo-item">
          <AltrexTimer :initial-time="60" :show-presets="false" />
          <span class="demo-label">No Presets</span>
        </div>
        <div class="demo-item">
          <AltrexTimer :initial-time="60" :show-controls="false" />
          <span class="demo-label">No Controls (Display Only)</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Auto-Start</h2>
      <p class="description">Timer automatically starts when mounted</p>
      <div class="demo-grid">
        <div class="demo-item">
          <AltrexTimer
            v-if="showAutoStartTimer"
            :initial-time="10"
            :auto-start="true"
            variant="success"
            @complete="handleAutoStartComplete"
          />
          <AltrexButton
            v-else
            label="Restart Auto-Start Demo"
            @click="showAutoStartTimer = true"
          />
          <span class="demo-label">Auto-Start (10s demo)</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Event Handling</h2>
      <p class="description">Respond to timer events for custom behavior</p>
      <div class="demo-grid">
        <div class="demo-item">
          <AltrexTimer
            :initial-time="15"
            variant="info"
            @start="logEvent('start')"
            @pause="logEvent('pause')"
            @reset="logEvent('reset')"
            @complete="logEvent('complete')"
            @tick="handleTick"
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
      <h2>Practical Examples</h2>
      <p class="description">Common use cases for gym&tonic</p>
      <div class="demo-grid demo-grid--practical">
        <div class="demo-card">
          <h3>Rest Timer</h3>
          <p>Between sets during strength training</p>
          <AltrexTimer
            :initial-time="90"
            variant="primary"
            size="l"
          />
        </div>
        <div class="demo-card">
          <h3>HIIT Intervals</h3>
          <p>High-intensity interval training</p>
          <AltrexTimer
            :initial-time="30"
            variant="danger"
            size="l"
            :presets="[20, 30, 40, 45]"
          />
        </div>
        <div class="demo-card">
          <h3>Plank Hold</h3>
          <p>Timed isometric exercise</p>
          <AltrexTimer
            :initial-time="60"
            variant="warning"
            size="l"
            :presets="[30, 45, 60, 90]"
          />
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
              <td><code>initialTime</code></td>
              <td>Number</td>
              <td>60</td>
              <td>Starting time in seconds</td>
            </tr>
            <tr>
              <td><code>autoStart</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Automatically start timer when mounted</td>
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
              <td>Size: 's' (120px), 'm' (160px), 'l' (200px)</td>
            </tr>
            <tr>
              <td><code>showControls</code></td>
              <td>Boolean</td>
              <td>true</td>
              <td>Show play/pause/reset control buttons</td>
            </tr>
            <tr>
              <td><code>showPresets</code></td>
              <td>Boolean</td>
              <td>true</td>
              <td>Show preset time quick-select buttons</td>
            </tr>
            <tr>
              <td><code>presets</code></td>
              <td>Array</td>
              <td>[30, 60, 90, 120, 180, 300]</td>
              <td>Array of preset times in seconds</td>
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
              <td><code>@start</code></td>
              <td>-</td>
              <td>Emitted when timer starts</td>
            </tr>
            <tr>
              <td><code>@pause</code></td>
              <td>-</td>
              <td>Emitted when timer is paused</td>
            </tr>
            <tr>
              <td><code>@reset</code></td>
              <td>-</td>
              <td>Emitted when timer is reset</td>
            </tr>
            <tr>
              <td><code>@complete</code></td>
              <td>-</td>
              <td>Emitted when timer reaches zero (includes audio beep)</td>
            </tr>
            <tr>
              <td><code>@tick</code></td>
              <td>Number (timeRemaining)</td>
              <td>Emitted every second with remaining time</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="demo-section">
      <h2>Features</h2>
      <ul class="feature-list">
        <li>Circular progress visualization with smooth animation</li>
        <li>Time display in MM:SS format with monospace font</li>
        <li>Play/pause/reset controls with icon buttons</li>
        <li>Quick preset buttons for common durations</li>
        <li>Custom preset times support</li>
        <li>Audio beep notification when timer completes</li>
        <li>Visual pulse animation on completion</li>
        <li>Auto-start capability for automatic timers</li>
        <li>Responsive sizing for different contexts</li>
        <li>Dark mode support</li>
        <li>Accessible with ARIA labels and keyboard navigation</li>
        <li>Event system for custom behavior integration</li>
      </ul>
    </section>
  </div>
</template>

<script>
import AltrexTimer from '../components/Timer/AltrexTimer.vue'
import AltrexButton from '../components/Button/AltrexButton.vue'

export default {
  name: 'AltrexTimerView',
  components: {
    AltrexTimer,
    AltrexButton
  },
  data() {
    return {
      eventLog: [],
      showAutoStartTimer: true
    }
  },
  methods: {
    logEvent(eventName) {
      const timestamp = new Date().toLocaleTimeString()
      this.eventLog.unshift(`[${timestamp}] ${eventName}`)
      if (this.eventLog.length > 5) {
        this.eventLog.pop()
      }
    },
    handleTick(timeRemaining) {
      // Only log every 5 seconds to avoid spam
      if (timeRemaining % 5 === 0) {
        this.logEvent(`tick (${timeRemaining}s remaining)`)
      }
    },
    handleAutoStartComplete() {
      this.showAutoStartTimer = false
      setTimeout(() => {
        // Keep it hidden to show the restart button
      }, 100)
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
  gap: $altrex-spacing-8
  align-items: start

  &--practical
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))

.demo-item
  display: flex
  flex-direction: column
  align-items: center
  gap: $altrex-spacing-4
  padding: $altrex-spacing-6
  background: var(--altrex-colors-neutral-50)
  border-radius: $altrex-borderRadius-lg
  border: 1px solid var(--altrex-colors-neutral-200)

  [data-theme="dark"] &
    background: var(--altrex-colors-neutral-800)
    border-color: var(--altrex-colors-neutral-700)

.demo-label
  font-size: $altrex-fontSize-sm
  font-weight: $altrex-fontWeight-medium
  color: var(--altrex-colors-neutral-700)
  text-align: center

  [data-theme="dark"] &
    color: var(--altrex-colors-neutral-300)

.demo-card
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

  h3
    font-size: $altrex-fontSize-lg
    font-weight: $altrex-fontWeight-semibold
    color: var(--altrex-colors-neutral-800)
    margin: 0

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-200)

  p
    font-size: $altrex-fontSize-sm
    color: var(--altrex-colors-neutral-600)
    text-align: center
    margin: 0

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-400)

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
