<template>
  <div class="demo-view">
    <h1>AltrexToast</h1>
    <p class="subtitle">Notification system with programmatic API and multiple positions</p>

    <section class="demo-section">
      <h2>Basic Usage</h2>
      <p class="demo-description">Show toast notifications with different variants</p>
      <div class="demo-grid">
        <AltrexButton @click="showSuccessToast">
          Success Toast
        </AltrexButton>
        <AltrexButton @click="showWarningToast">
          Warning Toast
        </AltrexButton>
        <AltrexButton @click="showDangerToast">
          Danger Toast
        </AltrexButton>
        <AltrexButton @click="showInfoToast">
          Info Toast
        </AltrexButton>
      </div>
    </section>

    <section class="demo-section">
      <h2>With Titles</h2>
      <p class="demo-description">Add titles to provide more context</p>
      <div class="demo-grid">
        <AltrexButton @click="showToastWithTitle('success')">
          Success with Title
        </AltrexButton>
        <AltrexButton @click="showToastWithTitle('warning')">
          Warning with Title
        </AltrexButton>
        <AltrexButton @click="showToastWithTitle('danger')">
          Danger with Title
        </AltrexButton>
        <AltrexButton @click="showToastWithTitle('info')">
          Info with Title
        </AltrexButton>
      </div>
    </section>

    <section class="demo-section">
      <h2>Positions</h2>
      <p class="demo-description">Toast can appear in six different positions</p>
      <div class="demo-grid">
        <AltrexButton @click="showPositionToast('top-left')">
          Top Left
        </AltrexButton>
        <AltrexButton @click="showPositionToast('top-center')">
          Top Center
        </AltrexButton>
        <AltrexButton @click="showPositionToast('top-right')">
          Top Right
        </AltrexButton>
        <AltrexButton @click="showPositionToast('bottom-left')">
          Bottom Left
        </AltrexButton>
        <AltrexButton @click="showPositionToast('bottom-center')">
          Bottom Center
        </AltrexButton>
        <AltrexButton @click="showPositionToast('bottom-right')">
          Bottom Right
        </AltrexButton>
      </div>
    </section>

    <section class="demo-section">
      <h2>Duration</h2>
      <p class="demo-description">Control how long toasts stay visible</p>
      <div class="demo-grid">
        <AltrexButton @click="showDurationToast(1000)">
          1 Second
        </AltrexButton>
        <AltrexButton @click="showDurationToast(3000)">
          3 Seconds (Default)
        </AltrexButton>
        <AltrexButton @click="showDurationToast(5000)">
          5 Seconds
        </AltrexButton>
        <AltrexButton @click="showDurationToast(0)">
          Persistent (No Auto-dismiss)
        </AltrexButton>
      </div>
    </section>

    <section class="demo-section">
      <h2>With Progress Bar</h2>
      <p class="demo-description">Show a progress bar indicating time remaining</p>
      <div class="demo-grid">
        <AltrexButton @click="showProgressToast">
          Toast with Progress
        </AltrexButton>
      </div>
    </section>

    <section class="demo-section">
      <h2>Without Icon or Close Button</h2>
      <p class="demo-description">Customize toast appearance</p>
      <div class="demo-grid">
        <AltrexButton @click="showCustomToast('noIcon')">
          No Icon
        </AltrexButton>
        <AltrexButton @click="showCustomToast('noClose')">
          No Close Button
        </AltrexButton>
        <AltrexButton @click="showCustomToast('minimal')">
          Minimal (No Icon or Close)
        </AltrexButton>
      </div>
    </section>

    <section class="demo-section">
      <h2>gym&tonic Examples</h2>
      <p class="demo-description">Real-world notifications for the gym app</p>
      <div class="demo-stack">
        <div class="example-group">
          <h3>Workout Actions</h3>
          <div class="demo-grid">
            <AltrexButton @click="showWorkoutToast('start')">
              Start Workout
            </AltrexButton>
            <AltrexButton @click="showWorkoutToast('complete')">
              Complete Workout
            </AltrexButton>
            <AltrexButton @click="showWorkoutToast('save')">
              Save Progress
            </AltrexButton>
            <AltrexButton @click="showWorkoutToast('pr')">
              New PR!
            </AltrexButton>
          </div>
        </div>
        <div class="example-group">
          <h3>Exercise Actions</h3>
          <div class="demo-grid">
            <AltrexButton @click="showExerciseToast('add')">
              Add Exercise
            </AltrexButton>
            <AltrexButton @click="showExerciseToast('remove')">
              Remove Exercise
            </AltrexButton>
            <AltrexButton @click="showExerciseToast('reorder')">
              Reorder Exercises
            </AltrexButton>
          </div>
        </div>
        <div class="example-group">
          <h3>Error States</h3>
          <div class="demo-grid">
            <AltrexButton @click="showErrorToast('network')">
              Network Error
            </AltrexButton>
            <AltrexButton @click="showErrorToast('validation')">
              Validation Error
            </AltrexButton>
            <AltrexButton @click="showErrorToast('auth')">
              Auth Error
            </AltrexButton>
          </div>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>API Methods</h2>
      <p class="demo-description">Programmatic API usage examples</p>
      <div class="code-block">
        <pre><code>// Basic usage
this.$toast.success('Workout saved!')
this.$toast.warning('Rest time almost over')
this.$toast.danger('Failed to load exercises')
this.$toast.info('New feature available')

// With options
this.$toast.success('Exercise added', {
  title: 'Success',
  duration: 5000,
  position: 'bottom-right',
  showProgress: true
})

// Manual control
const id = this.$toast.show({
  message: 'Processing...',
  duration: 0 // won't auto-dismiss
})
// Later...
this.$toast.remove(id)

// Clear all toasts
this.$toast.clear()</code></pre>
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
              <td>-</td>
              <td>Toast message content (required)</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td>String</td>
              <td><code>''</code></td>
              <td>Optional toast title</td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td>String</td>
              <td><code>'info'</code></td>
              <td>Toast type: 'success', 'warning', 'danger', 'info'</td>
            </tr>
            <tr>
              <td><code>duration</code></td>
              <td>Number</td>
              <td><code>3000</code></td>
              <td>Auto-dismiss duration in ms (0 = no auto-dismiss)</td>
            </tr>
            <tr>
              <td><code>position</code></td>
              <td>String</td>
              <td><code>'top-right'</code></td>
              <td>Toast position: 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'</td>
            </tr>
            <tr>
              <td><code>closable</code></td>
              <td>Boolean</td>
              <td><code>true</code></td>
              <td>Show close button</td>
            </tr>
            <tr>
              <td><code>showIcon</code></td>
              <td>Boolean</td>
              <td><code>true</code></td>
              <td>Show variant icon</td>
            </tr>
            <tr>
              <td><code>showProgress</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Show progress bar</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="demo-section">
      <h2>API Methods</h2>
      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>Parameters</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>$toast.show(options)</code></td>
              <td>Object</td>
              <td>Show toast with custom options</td>
            </tr>
            <tr>
              <td><code>$toast.success(message, options)</code></td>
              <td>String, Object</td>
              <td>Show success toast</td>
            </tr>
            <tr>
              <td><code>$toast.warning(message, options)</code></td>
              <td>String, Object</td>
              <td>Show warning toast</td>
            </tr>
            <tr>
              <td><code>$toast.danger(message, options)</code></td>
              <td>String, Object</td>
              <td>Show danger toast</td>
            </tr>
            <tr>
              <td><code>$toast.error(message, options)</code></td>
              <td>String, Object</td>
              <td>Alias for danger()</td>
            </tr>
            <tr>
              <td><code>$toast.info(message, options)</code></td>
              <td>String, Object</td>
              <td>Show info toast</td>
            </tr>
            <tr>
              <td><code>$toast.remove(id)</code></td>
              <td>Number</td>
              <td>Remove specific toast by ID</td>
            </tr>
            <tr>
              <td><code>$toast.clear()</code></td>
              <td>-</td>
              <td>Remove all toasts</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import AltrexButton from '../components/Button/AltrexButton.vue'

export default {
  name: 'AltrexToastView',
  components: {
    AltrexButton
  },
  methods: {
    showSuccessToast() {
      this.$toast.success('Operation completed successfully!')
    },
    showWarningToast() {
      this.$toast.warning('Please review your settings.')
    },
    showDangerToast() {
      this.$toast.danger('An error occurred. Please try again.')
    },
    showInfoToast() {
      this.$toast.info('Here is some useful information.')
    },
    showToastWithTitle(variant) {
      const titles = {
        success: 'Success',
        warning: 'Warning',
        danger: 'Error',
        info: 'Information'
      }
      const messages = {
        success: 'Your changes have been saved successfully.',
        warning: 'This action requires your attention.',
        danger: 'Something went wrong. Please contact support.',
        info: 'Check out our new features in the settings menu.'
      }
      this.$toast[variant](messages[variant], {
        title: titles[variant]
      })
    },
    showPositionToast(position) {
      this.$toast.info(`Toast positioned at ${position}`, {
        position,
        title: 'Position Demo'
      })
    },
    showDurationToast(duration) {
      const message = duration === 0
        ? 'This toast will not auto-dismiss'
        : `This toast will dismiss in ${duration / 1000} seconds`
      this.$toast.info(message, {
        duration,
        title: 'Duration Demo'
      })
    },
    showProgressToast() {
      this.$toast.info('Watch the progress bar at the bottom', {
        title: 'Progress Demo',
        duration: 5000,
        showProgress: true
      })
    },
    showCustomToast(type) {
      const options = {
        noIcon: { showIcon: false, message: 'Toast without icon' },
        noClose: { closable: false, message: 'Toast without close button (auto-dismisses)' },
        minimal: {
          showIcon: false,
          closable: false,
          message: 'Minimal toast - just the message'
        }
      }
      this.$toast.info(options[type].message, options[type])
    },
    showWorkoutToast(action) {
      const toasts = {
        start: {
          variant: 'info',
          title: 'Workout Started',
          message: 'Good luck with your training session!'
        },
        complete: {
          variant: 'success',
          title: 'Workout Complete!',
          message: 'Great job! You crushed it today.'
        },
        save: {
          variant: 'success',
          title: 'Progress Saved',
          message: 'Your workout data has been synced.'
        },
        pr: {
          variant: 'success',
          title: 'New Personal Record! 🎉',
          message: 'Bench Press - 225 lbs × 8 reps',
          duration: 5000
        }
      }
      const toast = toasts[action]
      this.$toast[toast.variant](toast.message, {
        title: toast.title,
        duration: toast.duration || 3000,
        showProgress: true
      })
    },
    showExerciseToast(action) {
      const toasts = {
        add: {
          variant: 'success',
          message: 'Bench Press added to workout'
        },
        remove: {
          variant: 'info',
          message: 'Exercise removed from workout'
        },
        reorder: {
          variant: 'info',
          message: 'Exercises reordered successfully'
        }
      }
      const toast = toasts[action]
      this.$toast[toast.variant](toast.message)
    },
    showErrorToast(type) {
      const toasts = {
        network: {
          title: 'Network Error',
          message: 'Unable to connect to server. Please check your connection.'
        },
        validation: {
          title: 'Validation Error',
          message: 'Please fill in all required fields before saving.'
        },
        auth: {
          title: 'Authentication Required',
          message: 'Your session has expired. Please log in again.'
        }
      }
      const toast = toasts[type]
      this.$toast.danger(toast.message, {
        title: toast.title,
        duration: 5000
      })
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))
  gap: $altrex-spacing-4

.demo-stack
  display: flex
  flex-direction: column
  gap: $altrex-spacing-8

.example-group
  h3
    font-size: $altrex-fontSize-lg
    font-weight: $altrex-fontWeight-semibold
    color: var(--altrex-colors-neutral-800)
    margin-bottom: $altrex-spacing-4

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-200)

.code-block
  background: var(--altrex-colors-neutral-50)
  border: 1px solid var(--altrex-colors-neutral-200)
  border-radius: $altrex-borderRadius-lg
  padding: $altrex-spacing-6
  overflow-x: auto

  [data-theme="dark"] &
    background: var(--altrex-colors-neutral-900)
    border-color: var(--altrex-colors-neutral-700)

  pre
    margin: 0

  code
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace
    font-size: $altrex-fontSize-sm
    line-height: 1.6
    color: var(--altrex-colors-neutral-800)

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-200)

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
