<template>
  <div class="demo-view">
    <h1>AltrexEmptyState</h1>
    <p class="subtitle">Display empty states for lists, searches, and collections with clear messaging and actions</p>

    <!-- Basic Usage Section -->
    <section class="demo-section">
      <h2>Basic Usage</h2>
      <p class="description">Simple empty state with icon, heading, and message.</p>
      <div class="demo-box">
        <AltrexEmptyState
          icon="generic-inbox"
          heading="No workouts yet"
          message="Start tracking your fitness journey by creating your first workout."
          action-label="Create Workout"
          action-icon="generic-plus"
          @action="handleAction('Create workout clicked')"
        />
      </div>
    </section>

    <!-- Different Contexts Section -->
    <section class="demo-section">
      <h2>Different Contexts</h2>
      <p class="description">Empty states for common gym app scenarios.</p>

      <div class="demo-grid">
        <div class="demo-box">
          <AltrexEmptyState
            icon="generic-clipboard"
            heading="No exercises"
            message="Your exercise library is empty. Add exercises to build your workouts."
            action-label="Add Exercise"
            action-icon="generic-plus"
            size="small"
            @action="handleAction('Add exercise clicked')"
          />
        </div>

        <div class="demo-box">
          <AltrexEmptyState
            icon="generic-search"
            heading="No results found"
            message="We couldn't find any exercises matching your search. Try different keywords."
            action-label="Clear Search"
            action-icon="generic-x"
            size="small"
            @action="handleAction('Clear search clicked')"
          />
        </div>

        <div class="demo-box">
          <AltrexEmptyState
            icon="generic-bar-chart"
            heading="No measurements"
            message="Track your progress by recording your first measurement."
            action-label="Add Measurement"
            size="small"
            @action="handleAction('Add measurement clicked')"
          />
        </div>
      </div>
    </section>

    <!-- Size Variants Section -->
    <section class="demo-section">
      <h2>Size Variants</h2>
      <p class="description">Three size options to fit different container sizes.</p>

      <h3>Small</h3>
      <div class="demo-box demo-box--small">
        <AltrexEmptyState
          icon="generic-folder"
          heading="Folder is empty"
          message="No files in this folder yet."
          size="small"
        />
      </div>

      <h3>Medium (Default)</h3>
      <div class="demo-box">
        <AltrexEmptyState
          icon="generic-inbox"
          heading="No notifications"
          message="You're all caught up! Check back later for new updates."
          size="medium"
        />
      </div>

      <h3>Large</h3>
      <div class="demo-box demo-box--large">
        <AltrexEmptyState
          icon="generic-calendar"
          heading="No scheduled workouts"
          message="Plan your week by scheduling workouts on your calendar. Stay consistent and reach your fitness goals."
          action-label="Schedule Workout"
          action-icon="generic-plus"
          size="large"
          @action="handleAction('Schedule workout clicked')"
        />
      </div>
    </section>

    <!-- Compact Mode Section -->
    <section class="demo-section">
      <h2>Compact Mode</h2>
      <p class="description">Reduced spacing for tighter layouts or secondary areas.</p>
      <div class="demo-box demo-box--compact">
        <AltrexEmptyState
          icon="generic-tag"
          heading="No tags"
          message="Add tags to organize your content."
          action-label="Add Tag"
          compact
          @action="handleAction('Add tag clicked')"
        />
      </div>
    </section>

    <!-- Different Icons Section -->
    <section class="demo-section">
      <h2>Different Icons</h2>
      <p class="description">Use appropriate icons to match the context.</p>

      <div class="demo-grid">
        <div class="demo-box demo-box--small">
          <AltrexEmptyState
            icon="generic-heart"
            heading="No favorites"
            message="Mark exercises as favorites to see them here."
            size="small"
          />
        </div>

        <div class="demo-box demo-box--small">
          <AltrexEmptyState
            icon="generic-star"
            heading="No ratings"
            message="Rate your workouts to track satisfaction."
            size="small"
          />
        </div>

        <div class="demo-box demo-box--small">
          <AltrexEmptyState
            icon="generic-users"
            heading="No members"
            message="Invite people to join your team."
            size="small"
          />
        </div>

        <div class="demo-box demo-box--small">
          <AltrexEmptyState
            icon="generic-image"
            heading="No images"
            message="Upload images to your gallery."
            size="small"
          />
        </div>
      </div>
    </section>

    <!-- Without Icon Section -->
    <section class="demo-section">
      <h2>Without Icon</h2>
      <p class="description">Empty states can work without icons for simpler designs.</p>
      <div class="demo-box">
        <AltrexEmptyState
          :show-icon="false"
          heading="Nothing here yet"
          message="This area will populate with content as you use the app."
          action-label="Get Started"
          @action="handleAction('Get started clicked')"
        />
      </div>
    </section>

    <!-- Using Slots Section -->
    <section class="demo-section">
      <h2>Using Slots</h2>
      <p class="description">Customize content with slots for more complex layouts.</p>

      <div class="demo-box">
        <AltrexEmptyState>
          <template #icon>
            <div class="custom-icon">
              <AltrexIcon icon="generic-dumbbell" size="xxl" />
            </div>
          </template>
          <template #heading>
            <span style="color: var(--altrex-colors-primary-500)">Welcome to Your Fitness Journey!</span>
          </template>
          <template #message>
            <p style="margin: 0">Start building your perfect workout routine today.</p>
            <ul style="list-style: none; padding: 0; margin: 16px 0 0">
              <li>✓ Create custom workouts</li>
              <li>✓ Track your progress</li>
              <li>✓ Achieve your goals</li>
            </ul>
          </template>
          <template #action>
            <div style="display: flex; gap: 12px; justify-content: center">
              <AltrexButton variant="fill" @click="handleAction('Begin clicked')">
                Begin
              </AltrexButton>
              <AltrexButton variant="outline" @click="handleAction('Learn more clicked')">
                Learn More
              </AltrexButton>
            </div>
          </template>
        </AltrexEmptyState>
      </div>
    </section>

    <!-- Action Variants Section -->
    <section class="demo-section">
      <h2>Action Button Variants</h2>
      <p class="description">Customize the action button appearance.</p>

      <div class="demo-grid">
        <div class="demo-box demo-box--small">
          <AltrexEmptyState
            icon="generic-plus"
            heading="Fill Variant"
            message="Default solid button."
            action-label="Create"
            action-variant="fill"
            size="small"
            @action="handleAction('Fill clicked')"
          />
        </div>

        <div class="demo-box demo-box--small">
          <AltrexEmptyState
            icon="generic-plus"
            heading="Outline Variant"
            message="Outlined button style."
            action-label="Create"
            action-variant="outline"
            size="small"
            @action="handleAction('Outline clicked')"
          />
        </div>

        <div class="demo-box demo-box--small">
          <AltrexEmptyState
            icon="generic-plus"
            heading="Ghost Variant"
            message="Minimal ghost button."
            action-label="Create"
            action-variant="ghost"
            size="small"
            @action="handleAction('Ghost clicked')"
          />
        </div>
      </div>
    </section>

    <!-- In Card Section -->
    <section class="demo-section">
      <h2>In Card Container</h2>
      <p class="description">Empty states work well inside cards and containers.</p>
      <div class="card-container">
        <AltrexEmptyState
          icon="generic-bell"
          heading="No notifications"
          message="You have no new notifications."
          compact
        />
      </div>
    </section>

    <!-- Toast for Actions -->
    <AltrexToast
      v-if="showToast"
      :message="toastMessage"
      variant="success"
      :duration="2000"
      position="top-right"
      @close="showToast = false"
    />

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
              <td><code>icon</code></td>
              <td>String</td>
              <td>'generic-inbox'</td>
              <td>Icon name to display</td>
            </tr>
            <tr>
              <td><code>iconSize</code></td>
              <td>String</td>
              <td>'xxl'</td>
              <td>Icon size: 'm', 'l', 'xl', 'xxl'</td>
            </tr>
            <tr>
              <td><code>showIcon</code></td>
              <td>Boolean</td>
              <td>true</td>
              <td>Whether to show the icon</td>
            </tr>
            <tr>
              <td><code>heading</code></td>
              <td>String</td>
              <td>''</td>
              <td>Heading text</td>
            </tr>
            <tr>
              <td><code>message</code></td>
              <td>String</td>
              <td>''</td>
              <td>Message/description text</td>
            </tr>
            <tr>
              <td><code>actionLabel</code></td>
              <td>String</td>
              <td>''</td>
              <td>Action button label</td>
            </tr>
            <tr>
              <td><code>actionVariant</code></td>
              <td>String</td>
              <td>'fill'</td>
              <td>Button variant: 'fill', 'outline', 'ghost'</td>
            </tr>
            <tr>
              <td><code>actionSize</code></td>
              <td>String</td>
              <td>'medium'</td>
              <td>Button size: 'small', 'medium', 'large'</td>
            </tr>
            <tr>
              <td><code>actionIcon</code></td>
              <td>String</td>
              <td>null</td>
              <td>Icon for action button</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>String</td>
              <td>'medium'</td>
              <td>Empty state size: 'small', 'medium', 'large'</td>
            </tr>
            <tr>
              <td><code>compact</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Compact mode with reduced spacing</td>
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
              <td><code>action</code></td>
              <td>none</td>
              <td>Emitted when action button is clicked</td>
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
              <td><code>icon</code></td>
              <td>Custom icon content (overrides icon prop)</td>
            </tr>
            <tr>
              <td><code>heading</code></td>
              <td>Custom heading content (overrides heading prop)</td>
            </tr>
            <tr>
              <td><code>message</code></td>
              <td>Custom message content (overrides message prop)</td>
            </tr>
            <tr>
              <td><code>default</code></td>
              <td>Additional content between message and action</td>
            </tr>
            <tr>
              <td><code>action</code></td>
              <td>Custom action content (overrides action button)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import AltrexEmptyState from '../components/EmptyState/AltrexEmptyState.vue'
import AltrexIcon from '../components/Icon/AltrexIcon.vue'
import AltrexButton from '../components/Button/AltrexButton.vue'
import AltrexToast from '../components/Toast/AltrexToast.vue'

export default {
  name: 'AltrexEmptyStateView',
  components: {
    AltrexEmptyState,
    AltrexIcon,
    AltrexButton,
    AltrexToast
  },
  data() {
    return {
      showToast: false,
      toastMessage: ''
    }
  },
  methods: {
    handleAction(action) {
      this.toastMessage = action
      this.showToast = true
      setTimeout(() => {
        this.showToast = false
      }, 2000)
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

  .description
    font-size: $altrex-fontSize-base
    color: var(--altrex-colors-neutral-600)
    margin-bottom: $altrex-spacing-6

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-400)

.demo-box
  border: 2px dashed var(--altrex-colors-neutral-300)
  border-radius: $altrex-borderRadius-lg
  min-height: 350px
  margin-bottom: $altrex-spacing-6
  background: var(--altrex-colors-neutral-50)

  [data-theme="dark"] &
    border-color: var(--altrex-colors-dark-border-default)
    background: var(--altrex-colors-dark-bg-surface)

  &--small
    min-height: 250px

  &--large
    min-height: 450px

  &--compact
    min-height: 200px

.demo-grid
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))
  gap: $altrex-spacing-6

.card-container
  border: 1px solid var(--altrex-colors-neutral-200)
  border-radius: $altrex-borderRadius-lg
  background: #ffffff
  box-shadow: $altrex-shadow-sm

  [data-theme="dark"] &
    border-color: var(--altrex-colors-dark-border-default)
    background: var(--altrex-colors-dark-bg-elevated)

.custom-icon
  color: var(--altrex-colors-primary-500)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-primary-default)

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
