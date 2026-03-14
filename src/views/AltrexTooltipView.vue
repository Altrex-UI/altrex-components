<template>
  <div class="demo-view">
    <h1>AltrexTooltip</h1>
    <p class="subtitle">Contextual information tooltips with mobile-first design and smart positioning</p>

    <!-- Mobile Notice -->
    <div class="mobile-notice">
      <AltrexIcon icon="generic-info-circle" />
      <div>
        <strong>Mobile Behavior:</strong> On touch devices, tooltips show on tap and dismiss when tapping outside.
        Desktop users can hover for instant feedback.
      </div>
    </div>

    <!-- Placements -->
    <section class="demo-section">
      <h2>Placements</h2>
      <p class="demo-description">Tooltips can be positioned on any side and auto-flip if they would go off-screen</p>
      <div class="placement-demo">
        <div class="placement-grid">
          <div class="placement-item"></div>
          <AltrexTooltip content="Tooltip on top" placement="top">
            <button class="demo-button">Top</button>
          </AltrexTooltip>
          <div class="placement-item"></div>

          <AltrexTooltip content="Tooltip on left" placement="left">
            <button class="demo-button">Left</button>
          </AltrexTooltip>
          <div class="placement-item center-space"></div>
          <AltrexTooltip content="Tooltip on right" placement="right">
            <button class="demo-button">Right</button>
          </AltrexTooltip>

          <div class="placement-item"></div>
          <AltrexTooltip content="Tooltip on bottom" placement="bottom">
            <button class="demo-button">Bottom</button>
          </AltrexTooltip>
          <div class="placement-item"></div>
        </div>
      </div>
    </section>

    <!-- Themes -->
    <section class="demo-section">
      <h2>Themes</h2>
      <p class="demo-description">Dark theme (default) for high contrast, light theme for subtle hints</p>
      <div class="demo-group">
        <AltrexTooltip content="Dark tooltip with high contrast" theme="dark">
          <button class="demo-button">Dark (Default)</button>
        </AltrexTooltip>
        <AltrexTooltip content="Light tooltip for subtle information" theme="light">
          <button class="demo-button demo-button--outlined">Light</button>
        </AltrexTooltip>
      </div>
    </section>

    <!-- Trigger Methods -->
    <section class="demo-section">
      <h2>Trigger Methods</h2>
      <p class="demo-description">Different ways to show tooltips</p>
      <div class="demo-grid">
        <div class="demo-item">
          <h3 class="demo-label">Hover (Desktop) / Tap (Mobile)</h3>
          <AltrexTooltip content="Shows on hover (desktop) or tap (mobile)" trigger="hover">
            <button class="demo-button">Hover/Tap Me</button>
          </AltrexTooltip>
        </div>
        <div class="demo-item">
          <h3 class="demo-label">Click Toggle</h3>
          <AltrexTooltip content="Click to toggle tooltip visibility" trigger="click">
            <button class="demo-button">Click Me</button>
          </AltrexTooltip>
        </div>
        <div class="demo-item">
          <h3 class="demo-label">Focus</h3>
          <AltrexTooltip content="Shows when input receives focus" trigger="focus">
            <input type="text" class="demo-input" placeholder="Focus on me" />
          </AltrexTooltip>
        </div>
        <div class="demo-item">
          <h3 class="demo-label">Manual Control</h3>
          <AltrexTooltip content="Controlled by v-model" trigger="manual" :visible="manualVisible">
            <button class="demo-button">Controlled</button>
          </AltrexTooltip>
          <button @click="manualVisible = !manualVisible" class="demo-button demo-button--small">
            {{ manualVisible ? 'Hide' : 'Show' }} Tooltip
          </button>
        </div>
      </div>
    </section>

    <!-- Delay -->
    <section class="demo-section">
      <h2>Show Delay</h2>
      <p class="demo-description">Control how quickly tooltips appear on hover</p>
      <div class="demo-group">
        <AltrexTooltip content="No delay" :delay="0">
          <button class="demo-button">0ms (Instant)</button>
        </AltrexTooltip>
        <AltrexTooltip content="Short delay" :delay="200">
          <button class="demo-button">200ms (Default)</button>
        </AltrexTooltip>
        <AltrexTooltip content="Longer delay" :delay="500">
          <button class="demo-button">500ms</button>
        </AltrexTooltip>
        <AltrexTooltip content="Long delay" :delay="1000">
          <button class="demo-button">1000ms</button>
        </AltrexTooltip>
      </div>
    </section>

    <!-- With/Without Arrow -->
    <section class="demo-section">
      <h2>Arrow Indicator</h2>
      <p class="demo-description">Toggle the arrow that points to the trigger element</p>
      <div class="demo-group">
        <AltrexTooltip content="Tooltip with arrow pointing to trigger" :show-arrow="true">
          <button class="demo-button">With Arrow</button>
        </AltrexTooltip>
        <AltrexTooltip content="Tooltip without arrow indicator" :show-arrow="false">
          <button class="demo-button demo-button--outlined">No Arrow</button>
        </AltrexTooltip>
      </div>
    </section>

    <!-- Max Width -->
    <section class="demo-section">
      <h2>Max Width Control</h2>
      <p class="demo-description">Constrain tooltip width for better layout control</p>
      <div class="demo-group">
        <AltrexTooltip
          content="This tooltip has a narrow max width of 150px which causes the text to wrap more"
          max-width="150px"
        >
          <button class="demo-button">Narrow (150px)</button>
        </AltrexTooltip>
        <AltrexTooltip
          content="This tooltip has the default max width of 280px which is comfortable for reading"
          max-width="280px"
        >
          <button class="demo-button">Default (280px)</button>
        </AltrexTooltip>
        <AltrexTooltip
          content="This tooltip has a wide max width of 400px allowing for longer single-line content without wrapping as much"
          max-width="400px"
        >
          <button class="demo-button">Wide (400px)</button>
        </AltrexTooltip>
      </div>
    </section>

    <!-- Custom Content Slot -->
    <section class="demo-section">
      <h2>Custom Content</h2>
      <p class="demo-description">Use slots for rich tooltip content beyond simple text</p>
      <div class="demo-group">
        <AltrexTooltip theme="light" max-width="320px">
          <button class="demo-button">Rich Content</button>
          <template #content>
            <div class="custom-tooltip">
              <div class="custom-tooltip__header">
                <AltrexIcon icon="generic-star" />
                <strong>Premium Feature</strong>
              </div>
              <p class="custom-tooltip__body">
                This feature requires a Pro subscription. Upgrade to unlock advanced capabilities.
              </p>
              <div class="custom-tooltip__footer">
                <a href="#" class="custom-tooltip__link">Learn more →</a>
              </div>
            </div>
          </template>
        </AltrexTooltip>

        <AltrexTooltip theme="light" max-width="300px">
          <button class="demo-button">Stats</button>
          <template #content>
            <div class="stats-tooltip">
              <div class="stats-tooltip__row">
                <span>Views:</span>
                <strong>1,234</strong>
              </div>
              <div class="stats-tooltip__row">
                <span>Clicks:</span>
                <strong>567</strong>
              </div>
              <div class="stats-tooltip__row">
                <span>Conversion:</span>
                <strong>45.9%</strong>
              </div>
            </div>
          </template>
        </AltrexTooltip>
      </div>
    </section>

    <!-- Practical Examples -->
    <section class="demo-section">
      <h2>Practical Examples</h2>
      <p class="demo-description">Real-world use cases for tooltips</p>

      <div class="example-card">
        <h3>Form Field Help</h3>
        <div class="form-field">
          <label for="username">
            Username
            <AltrexTooltip
              content="Must be 3-20 characters. Letters, numbers, and underscores only."
              placement="right"
              theme="light"
            >
              <AltrexIcon icon="generic-info-circle" class="help-icon" />
            </AltrexTooltip>
          </label>
          <input id="username" type="text" class="demo-input" placeholder="Enter username" />
        </div>
      </div>

      <div class="example-card">
        <h3>Icon Button Labels</h3>
        <div class="icon-toolbar">
          <AltrexTooltip content="Bold (Ctrl+B)" placement="bottom">
            <button class="icon-button" aria-label="Bold">
              <AltrexIcon icon="generic-bold" />
            </button>
          </AltrexTooltip>
          <AltrexTooltip content="Italic (Ctrl+I)" placement="bottom">
            <button class="icon-button" aria-label="Italic">
              <AltrexIcon icon="generic-italic" />
            </button>
          </AltrexTooltip>
          <AltrexTooltip content="Underline (Ctrl+U)" placement="bottom">
            <button class="icon-button" aria-label="Underline">
              <AltrexIcon icon="generic-underline" />
            </button>
          </AltrexTooltip>
          <AltrexTooltip content="Strike Through" placement="bottom">
            <button class="icon-button" aria-label="Strike">
              <AltrexIcon icon="generic-strikethrough" />
            </button>
          </AltrexTooltip>
        </div>
      </div>

      <div class="example-card">
        <h3>Status Indicators</h3>
        <div class="status-list">
          <div class="status-item">
            <AltrexTooltip content="All systems operational" placement="right" theme="light">
              <span class="status-dot status-dot--success"></span>
            </AltrexTooltip>
            <span>API Server</span>
          </div>
          <div class="status-item">
            <AltrexTooltip content="Experiencing high latency" placement="right" theme="light">
              <span class="status-dot status-dot--warning"></span>
            </AltrexTooltip>
            <span>Database</span>
          </div>
          <div class="status-item">
            <AltrexTooltip content="Service temporarily unavailable" placement="right" theme="light">
              <span class="status-dot status-dot--danger"></span>
            </AltrexTooltip>
            <span>CDN</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Disabled State -->
    <section class="demo-section">
      <h2>Disabled State</h2>
      <p class="demo-description">Prevent tooltips from appearing</p>
      <div class="demo-group">
        <AltrexTooltip content="This tooltip is enabled">
          <button class="demo-button">Enabled</button>
        </AltrexTooltip>
        <AltrexTooltip content="This tooltip won't show" :disabled="true">
          <button class="demo-button" disabled>Disabled</button>
        </AltrexTooltip>
      </div>
    </section>

    <!-- Auto-Flip Demo -->
    <section class="demo-section">
      <h2>Auto-Flip Positioning</h2>
      <p class="demo-description">Tooltips automatically reposition if they would go off-screen</p>
      <div class="edge-demo">
        <div class="edge-container">
          <div class="edge-item edge-item--top-left">
            <AltrexTooltip content="Prefers top but flips to bottom if needed" placement="top">
              <button class="demo-button demo-button--small">Top Left</button>
            </AltrexTooltip>
          </div>
          <div class="edge-item edge-item--top-right">
            <AltrexTooltip content="Prefers top but flips to bottom if needed" placement="top">
              <button class="demo-button demo-button--small">Top Right</button>
            </AltrexTooltip>
          </div>
          <div class="edge-item edge-item--bottom-left">
            <AltrexTooltip content="Prefers bottom but flips to top if needed" placement="bottom">
              <button class="demo-button demo-button--small">Bottom Left</button>
            </AltrexTooltip>
          </div>
          <div class="edge-item edge-item--bottom-right">
            <AltrexTooltip content="Prefers bottom but flips to top if needed" placement="bottom">
              <button class="demo-button demo-button--small">Bottom Right</button>
            </AltrexTooltip>
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
              <td><code>content</code></td>
              <td>String</td>
              <td><code>''</code></td>
              <td>Tooltip text content</td>
            </tr>
            <tr>
              <td><code>placement</code></td>
              <td>String</td>
              <td><code>'top'</code></td>
              <td>Position: 'top', 'right', 'bottom', 'left'</td>
            </tr>
            <tr>
              <td><code>delay</code></td>
              <td>Number</td>
              <td><code>200</code></td>
              <td>Delay before showing (ms)</td>
            </tr>
            <tr>
              <td><code>maxWidth</code></td>
              <td>String</td>
              <td><code>'280px'</code></td>
              <td>Maximum width of tooltip</td>
            </tr>
            <tr>
              <td><code>theme</code></td>
              <td>String</td>
              <td><code>'dark'</code></td>
              <td>Theme: 'dark' or 'light'</td>
            </tr>
            <tr>
              <td><code>showArrow</code></td>
              <td>Boolean</td>
              <td><code>true</code></td>
              <td>Show arrow indicator</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Disable tooltip</td>
            </tr>
            <tr>
              <td><code>trigger</code></td>
              <td>String</td>
              <td><code>'hover'</code></td>
              <td>Trigger: 'hover', 'click', 'focus', 'manual'</td>
            </tr>
            <tr>
              <td><code>visible</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Manual visibility control (trigger="manual")</td>
            </tr>
            <tr>
              <td><code>styleOverrides</code></td>
              <td>Object</td>
              <td><code>{}</code></td>
              <td>CSS variable overrides</td>
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
              <td><code>show</code></td>
              <td>—</td>
              <td>Emitted when tooltip becomes visible</td>
            </tr>
            <tr>
              <td><code>hide</code></td>
              <td>—</td>
              <td>Emitted when tooltip is hidden</td>
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
              <td>Trigger element (element that shows tooltip on hover/click)</td>
            </tr>
            <tr>
              <td><code>content</code></td>
              <td>Custom tooltip content (overrides content prop)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import AltrexTooltip from '../components/Tooltip/AltrexTooltip.vue'
import AltrexIcon from '../components/Icon/AltrexIcon.vue'

export default {
  name: 'AltrexTooltipView',
  components: {
    AltrexTooltip,
    AltrexIcon
  },
  data() {
    return {
      manualVisible: false
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

// Mobile notice
.mobile-notice
  display: flex
  gap: $altrex-spacing-3
  padding: $altrex-spacing-4
  background: var(--altrex-colors-primary-50)
  border-left: 4px solid $altrex-colors-primary-500
  border-radius: $altrex-borderRadius-default
  margin-bottom: $altrex-spacing-8
  font-size: $altrex-fontSize-sm
  color: var(--altrex-colors-neutral-700)

  [data-theme="dark"] &
    background: rgba(59, 130, 246, 0.1)
    color: var(--altrex-colors-dark-text-secondary)

  :deep(.altrex-icon)
    altrex-icon-m()
    color: $altrex-colors-primary-500
    flex-shrink: 0

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

// Demo buttons
.demo-button
  min-height: $altrex-touchTarget-minimum
  padding: $altrex-spacing-3 $altrex-spacing-5
  background: $altrex-colors-primary-500
  color: white
  border: none
  border-radius: $altrex-borderRadius-default
  font-size: 16px
  font-weight: $altrex-fontWeight-medium
  cursor: pointer
  transition: all $altrex-transition-default

  +above('md')
    min-height: 40px
    font-size: $altrex-fontSize-base

  &:hover:not(:disabled)
    background: $altrex-colors-primary-600

  &:disabled
    opacity: 0.5
    cursor: not-allowed

  &--outlined
    background: transparent
    color: $altrex-colors-primary-500
    border: 2px solid $altrex-colors-primary-500

    &:hover:not(:disabled)
      background: $altrex-colors-primary-50

      [data-theme="dark"] &
        background: rgba(59, 130, 246, 0.1)

  &--small
    min-height: 36px
    padding: $altrex-spacing-2 $altrex-spacing-4
    font-size: $altrex-fontSize-sm

    +above('md')
      min-height: 32px

.demo-input
  width: 100%
  min-height: $altrex-touchTarget-minimum
  padding: $altrex-spacing-3 $altrex-spacing-4
  border: 1px solid var(--altrex-colors-neutral-300)
  border-radius: $altrex-borderRadius-default
  font-size: 16px
  background: var(--altrex-colors-neutral-50)
  color: var(--altrex-colors-neutral-900)

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-input)
    border-color: var(--altrex-colors-dark-border-default)
    color: var(--altrex-colors-dark-text-primary)

  +above('md')
    min-height: 40px
    font-size: $altrex-fontSize-base

  &:focus
    outline: 2px solid $altrex-colors-primary-500
    outline-offset: 2px

.demo-group
  display: flex
  flex-wrap: wrap
  gap: $altrex-spacing-4

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

// Placement demo
.placement-demo
  padding: $altrex-spacing-8
  background: var(--altrex-colors-neutral-50)
  border: 1px solid var(--altrex-colors-neutral-200)
  border-radius: $altrex-borderRadius-lg

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-elevated)
    border-color: var(--altrex-colors-dark-border-default)

.placement-grid
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: $altrex-spacing-4
  max-width: 500px
  margin: 0 auto

.placement-item
  display: flex
  align-items: center
  justify-content: center

  &.center-space
    background: var(--altrex-colors-neutral-100)
    border-radius: $altrex-borderRadius-default

    [data-theme="dark"] &
      background: var(--altrex-colors-dark-bg-subtle)

// Custom tooltip content
.custom-tooltip
  &__header
    display: flex
    align-items: center
    gap: $altrex-spacing-2
    margin-bottom: $altrex-spacing-2
    color: var(--altrex-colors-neutral-900)

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-primary)

    :deep(.altrex-icon)
      altrex-icon-s()
      color: $altrex-colors-warning-500

  &__body
    margin-bottom: $altrex-spacing-2
    font-size: $altrex-fontSize-sm
    line-height: 1.5

  &__footer
    margin-top: $altrex-spacing-3
    padding-top: $altrex-spacing-3
    border-top: 1px solid var(--altrex-colors-neutral-200)

    [data-theme="dark"] &
      border-color: var(--altrex-colors-dark-border-subtle)

  &__link
    color: $altrex-colors-primary-500
    text-decoration: none
    font-weight: $altrex-fontWeight-medium
    font-size: $altrex-fontSize-sm

    &:hover
      text-decoration: underline

.stats-tooltip
  display: flex
  flex-direction: column
  gap: $altrex-spacing-2
  font-size: $altrex-fontSize-sm

  &__row
    display: flex
    justify-content: space-between
    gap: $altrex-spacing-4

    span
      color: var(--altrex-colors-neutral-600)

      [data-theme="dark"] &
        color: var(--altrex-colors-dark-text-secondary)

    strong
      color: var(--altrex-colors-neutral-900)

      [data-theme="dark"] &
        color: var(--altrex-colors-dark-text-primary)

// Example cards
.example-card
  background: var(--altrex-colors-neutral-50)
  border: 1px solid var(--altrex-colors-neutral-200)
  border-radius: $altrex-borderRadius-lg
  padding: $altrex-spacing-6
  margin-bottom: $altrex-spacing-6

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-elevated)
    border-color: var(--altrex-colors-dark-border-default)

  h3
    font-size: $altrex-fontSize-lg
    font-weight: $altrex-fontWeight-semibold
    color: var(--altrex-colors-neutral-800)
    margin-bottom: $altrex-spacing-4

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-200)

.form-field
  label
    display: flex
    align-items: center
    gap: $altrex-spacing-2
    font-size: $altrex-fontSize-sm
    font-weight: $altrex-fontWeight-medium
    color: var(--altrex-colors-neutral-700)
    margin-bottom: $altrex-spacing-2

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-primary)

.help-icon
  altrex-icon-s()
  color: var(--altrex-colors-neutral-500)
  cursor: help

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-tertiary)

.icon-toolbar
  display: flex
  gap: $altrex-spacing-2

.icon-button
  touch-target('minimum')
  background: transparent
  border: 1px solid var(--altrex-colors-neutral-300)
  border-radius: $altrex-borderRadius-default
  color: var(--altrex-colors-neutral-700)
  cursor: pointer
  transition: all $altrex-transition-default

  [data-theme="dark"] &
    border-color: var(--altrex-colors-dark-border-default)
    color: var(--altrex-colors-dark-text-primary)

  +above('md')
    min-width: 36px
    min-height: 36px

  &:hover
    background: var(--altrex-colors-neutral-100)
    border-color: $altrex-colors-primary-500

    [data-theme="dark"] &
      background: var(--altrex-colors-dark-bg-hover)

  :deep(.altrex-icon)
    altrex-icon-s()

.status-list
  display: flex
  flex-direction: column
  gap: $altrex-spacing-3

.status-item
  display: flex
  align-items: center
  gap: $altrex-spacing-3
  font-size: $altrex-fontSize-base
  color: var(--altrex-colors-neutral-700)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-primary)

.status-dot
  width: 12px
  height: 12px
  border-radius: 50%
  cursor: help

  &--success
    background: $altrex-colors-success-500

  &--warning
    background: $altrex-colors-warning-500

  &--danger
    background: $altrex-colors-danger-500

// Edge demo
.edge-demo
  padding: $altrex-spacing-8
  background: var(--altrex-colors-neutral-50)
  border: 1px solid var(--altrex-colors-neutral-200)
  border-radius: $altrex-borderRadius-lg

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-elevated)
    border-color: var(--altrex-colors-dark-border-default)

.edge-container
  position: relative
  min-height: 300px
  background: var(--altrex-colors-neutral-100)
  border-radius: $altrex-borderRadius-default

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-subtle)

.edge-item
  position: absolute

  &--top-left
    top: 10px
    left: 10px

  &--top-right
    top: 10px
    right: 10px

  &--bottom-left
    bottom: 10px
    left: 10px

  &--bottom-right
    bottom: 10px
    right: 10px

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
