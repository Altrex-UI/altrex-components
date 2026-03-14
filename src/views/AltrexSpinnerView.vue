<template>
  <div class="demo-view">
    <h1>AltrexSpinner</h1>
    <p class="subtitle">Animated loading indicators with multiple sizes and color variants</p>

    <section class="demo-section">
      <h2>Sizes</h2>
      <p class="demo-description">Five size variants from extra-small to extra-large</p>
      <div class="demo-grid demo-grid--center">
        <div class="demo-item">
          <AltrexSpinner size="xs" />
          <span class="demo-label">Extra Small (16px)</span>
        </div>
        <div class="demo-item">
          <AltrexSpinner size="s" />
          <span class="demo-label">Small (24px)</span>
        </div>
        <div class="demo-item">
          <AltrexSpinner size="m" />
          <span class="demo-label">Medium (32px)</span>
        </div>
        <div class="demo-item">
          <AltrexSpinner size="l" />
          <span class="demo-label">Large (48px)</span>
        </div>
        <div class="demo-item">
          <AltrexSpinner size="xl" />
          <span class="demo-label">Extra Large (64px)</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Variants</h2>
      <p class="demo-description">Seven color variants for different contexts</p>
      <div class="demo-grid demo-grid--center">
        <div class="demo-item">
          <AltrexSpinner variant="primary" />
          <span class="demo-label">Primary</span>
        </div>
        <div class="demo-item">
          <AltrexSpinner variant="secondary" />
          <span class="demo-label">Secondary</span>
        </div>
        <div class="demo-item">
          <AltrexSpinner variant="success" />
          <span class="demo-label">Success</span>
        </div>
        <div class="demo-item">
          <AltrexSpinner variant="warning" />
          <span class="demo-label">Warning</span>
        </div>
        <div class="demo-item">
          <AltrexSpinner variant="danger" />
          <span class="demo-label">Danger</span>
        </div>
        <div class="demo-item">
          <AltrexSpinner variant="info" />
          <span class="demo-label">Info</span>
        </div>
        <div class="demo-item">
          <AltrexSpinner variant="neutral" />
          <span class="demo-label">Neutral</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>With Labels</h2>
      <p class="demo-description">Add descriptive text below the spinner</p>
      <div class="demo-grid demo-grid--center">
        <div class="demo-item">
          <AltrexSpinner size="l" label="Loading..." />
        </div>
        <div class="demo-item">
          <AltrexSpinner size="l" variant="success" label="Processing" />
        </div>
        <div class="demo-item">
          <AltrexSpinner size="l" variant="info" label="Fetching data" />
        </div>
        <div class="demo-item">
          <AltrexSpinner size="l" variant="warning" label="Please wait" />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>In Buttons</h2>
      <p class="demo-description">Spinners can be used inside buttons for loading states</p>
      <div class="demo-grid">
        <AltrexButton variant="fill" disabled>
          <AltrexSpinner size="xs" variant="neutral" />
          <span style="margin-left: 8px;">Loading...</span>
        </AltrexButton>
        <AltrexButton variant="fill" disabled>
          <AltrexSpinner size="s" variant="neutral" />
          <span style="margin-left: 8px;">Saving Changes</span>
        </AltrexButton>
        <AltrexButton variant="fill-success" disabled>
          <AltrexSpinner size="s" variant="neutral" />
          <span style="margin-left: 8px;">Processing</span>
        </AltrexButton>
      </div>
    </section>

    <section class="demo-section">
      <h2>Loading States</h2>
      <p class="demo-description">Common loading state patterns</p>
      <div class="demo-stack">
        <div class="loading-box">
          <AltrexSpinner size="l" variant="primary" label="Loading content..." />
        </div>
        <div class="loading-box loading-box--inline">
          <AltrexSpinner size="s" variant="primary" />
          <span>Fetching data...</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>gym&tonic Examples</h2>
      <p class="demo-description">Loading states for the gym app</p>
      <div class="demo-stack">
        <div class="workout-loading-card">
          <h3>Loading Workout</h3>
          <AltrexSpinner size="l" variant="primary" label="Fetching your workout plan..." />
        </div>
        <div class="workout-loading-card">
          <h3>Saving Progress</h3>
          <AltrexSpinner size="m" variant="success" label="Syncing with server..." />
        </div>
        <div class="workout-loading-card workout-loading-card--inline">
          <AltrexSpinner size="s" variant="info" />
          <div>
            <h4>Processing Exercise Data</h4>
            <p>Calculating your 1RM and volume metrics...</p>
          </div>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Fullscreen Overlay</h2>
      <p class="demo-description">Toggle a fullscreen loading overlay</p>
      <div class="demo-grid">
        <AltrexButton @click="showOverlay = true">
          Show Loading Overlay
        </AltrexButton>
      </div>
    </section>

    <!-- Loading Overlay -->
    <Transition name="fade">
      <div v-if="showOverlay" class="loading-overlay" @click="showOverlay = false">
        <div class="loading-overlay__content">
          <AltrexSpinner size="xl" variant="primary" label="Loading..." />
          <p class="loading-overlay__hint">Click anywhere to dismiss</p>
        </div>
      </div>
    </Transition>

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
              <td><code>size</code></td>
              <td>String</td>
              <td><code>'m'</code></td>
              <td>Spinner size: 'xs', 's', 'm', 'l', 'xl'</td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td>String</td>
              <td><code>'primary'</code></td>
              <td>Color variant: 'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'</td>
            </tr>
            <tr>
              <td><code>label</code></td>
              <td>String</td>
              <td><code>''</code></td>
              <td>Optional text label below spinner</td>
            </tr>
            <tr>
              <td><code>ariaLabel</code></td>
              <td>String</td>
              <td><code>'Loading'</code></td>
              <td>ARIA label for accessibility</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import AltrexSpinner from '../components/Spinner/AltrexSpinner.vue'
import AltrexButton from '../components/Button/AltrexButton.vue'

export default {
  name: 'AltrexSpinnerView',
  components: {
    AltrexSpinner,
    AltrexButton
  },
  data() {
    return {
      showOverlay: false
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

.demo-grid
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr))
  gap: $altrex-spacing-6

  &--center
    justify-items: center

.demo-stack
  display: flex
  flex-direction: column
  gap: $altrex-spacing-6

.demo-item
  display: flex
  flex-direction: column
  align-items: center
  gap: $altrex-spacing-3

.demo-label
  font-size: $altrex-fontSize-sm
  color: var(--altrex-colors-neutral-600)

  [data-theme="dark"] &
    color: var(--altrex-colors-neutral-400)

.loading-box
  padding: $altrex-spacing-8
  background: var(--altrex-colors-neutral-50)
  border: 2px dashed var(--altrex-colors-neutral-300)
  border-radius: $altrex-borderRadius-lg
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  min-height: 200px

  [data-theme="dark"] &
    background: var(--altrex-colors-neutral-800)
    border-color: var(--altrex-colors-neutral-600)

  &--inline
    flex-direction: row
    gap: $altrex-spacing-4
    min-height: auto
    padding: $altrex-spacing-4

    span
      font-size: $altrex-fontSize-base
      color: var(--altrex-colors-neutral-700)

      [data-theme="dark"] &
        color: var(--altrex-colors-neutral-300)

.workout-loading-card
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
    color: var(--altrex-colors-neutral-900)
    margin: 0
    text-align: center

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-100)

  h4
    font-size: $altrex-fontSize-base
    font-weight: $altrex-fontWeight-semibold
    color: var(--altrex-colors-neutral-900)
    margin: 0

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-100)

  p
    font-size: $altrex-fontSize-sm
    color: var(--altrex-colors-neutral-600)
    margin: $altrex-spacing-1 0 0 0

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-400)

  &--inline
    flex-direction: row
    align-items: flex-start
    text-align: left

.loading-overlay
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: rgba(0, 0, 0, 0.6)
  display: flex
  align-items: center
  justify-content: center
  z-index: 9999
  cursor: pointer

  [data-theme="dark"] &
    background: rgba(0, 0, 0, 0.8)

.loading-overlay__content
  display: flex
  flex-direction: column
  align-items: center
  gap: $altrex-spacing-4

.loading-overlay__hint
  font-size: $altrex-fontSize-sm
  color: var(--altrex-colors-neutral-300)
  margin: 0

// Fade transition
.fade-enter-active,
.fade-leave-active
  transition: opacity 0.3s ease

.fade-enter-from,
.fade-leave-to
  opacity: 0

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
