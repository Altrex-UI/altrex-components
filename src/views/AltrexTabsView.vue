<template>
  <div class="demo-view">
    <h1>AltrexTabs</h1>
    <p class="subtitle">Navigate between different views with accessible tab navigation and keyboard support</p>

    <!-- Basic Usage Section -->
    <section class="demo-section">
      <h2>Basic Usage</h2>
      <p class="description">Simple tabs with line variant (default).</p>
      <AltrexTabs
        v-model="basicActive"
        :tabs="basicTabs"
      >
        <template #panel-0>
          <div class="panel-content">
            <h3>Workout Overview</h3>
            <p>View your workout statistics, progress, and recent activities.</p>
          </div>
        </template>
        <template #panel-1>
          <div class="panel-content">
            <h3>Exercises Library</h3>
            <p>Browse and manage your exercise collection.</p>
          </div>
        </template>
        <template #panel-2>
          <div class="panel-content">
            <h3>Progress Tracking</h3>
            <p>Track your fitness journey with measurements and milestones.</p>
          </div>
        </template>
      </AltrexTabs>
    </section>

    <!-- Variants Section -->
    <section class="demo-section">
      <h2>Variants</h2>
      <p class="description">Three visual styles: line, enclosed, and pills.</p>

      <h3>Line Variant (Default)</h3>
      <AltrexTabs
        v-model="lineActive"
        variant="line"
        :tabs="variantTabs"
      >
        <template #panel-0>
          <div class="panel-content">Content for Tab 1 in line variant.</div>
        </template>
        <template #panel-1>
          <div class="panel-content">Content for Tab 2 in line variant.</div>
        </template>
        <template #panel-2>
          <div class="panel-content">Content for Tab 3 in line variant.</div>
        </template>
      </AltrexTabs>

      <h3>Enclosed Variant</h3>
      <AltrexTabs
        v-model="enclosedActive"
        variant="enclosed"
        :tabs="variantTabs"
      >
        <template #panel-0>
          <div class="panel-content">Content for Tab 1 in enclosed variant.</div>
        </template>
        <template #panel-1>
          <div class="panel-content">Content for Tab 2 in enclosed variant.</div>
        </template>
        <template #panel-2>
          <div class="panel-content">Content for Tab 3 in enclosed variant.</div>
        </template>
      </AltrexTabs>

      <h3>Pills Variant</h3>
      <AltrexTabs
        v-model="pillsActive"
        variant="pills"
        :tabs="variantTabs"
      >
        <template #panel-0>
          <div class="panel-content">Content for Tab 1 in pills variant.</div>
        </template>
        <template #panel-1>
          <div class="panel-content">Content for Tab 2 in pills variant.</div>
        </template>
        <template #panel-2>
          <div class="panel-content">Content for Tab 3 in pills variant.</div>
        </template>
      </AltrexTabs>
    </section>

    <!-- With Icons Section -->
    <section class="demo-section">
      <h2>With Icons</h2>
      <p class="description">Tabs can include icons for better visual recognition.</p>
      <AltrexTabs
        v-model="iconActive"
        :tabs="iconTabs"
      >
        <template #panel-0>
          <div class="panel-content">
            <h3>Workout Plans</h3>
            <p>Create and manage your workout routines.</p>
          </div>
        </template>
        <template #panel-1>
          <div class="panel-content">
            <h3>Schedule</h3>
            <p>Plan your workouts on the calendar.</p>
          </div>
        </template>
        <template #panel-2>
          <div class="panel-content">
            <h3>Statistics</h3>
            <p>View your workout analytics and progress charts.</p>
          </div>
        </template>
        <template #panel-3>
          <div class="panel-content">
            <h3>Settings</h3>
            <p>Configure your preferences and account settings.</p>
          </div>
        </template>
      </AltrexTabs>
    </section>

    <!-- With Badges Section -->
    <section class="demo-section">
      <h2>With Badges</h2>
      <p class="description">Show counts or notifications with badge indicators.</p>
      <AltrexTabs
        v-model="badgeActive"
        :tabs="badgeTabs"
      >
        <template #panel-0>
          <div class="panel-content">
            <h3>All Workouts (12)</h3>
            <p>View all your workout templates.</p>
          </div>
        </template>
        <template #panel-1>
          <div class="panel-content">
            <h3>Scheduled (5)</h3>
            <p>Workouts scheduled for this week.</p>
          </div>
        </template>
        <template #panel-2>
          <div class="panel-content">
            <h3>Completed (8)</h3>
            <p>Your completed workout sessions.</p>
          </div>
        </template>
      </AltrexTabs>
    </section>

    <!-- Size Variants Section -->
    <section class="demo-section">
      <h2>Size Variants</h2>
      <p class="description">Three size options: small, medium, and large.</p>

      <h3>Small</h3>
      <AltrexTabs
        v-model="smallActive"
        size="small"
        :tabs="sizeTabs"
      >
        <template #panel-0>
          <div class="panel-content">Small size tab content.</div>
        </template>
        <template #panel-1>
          <div class="panel-content">Small size tab content.</div>
        </template>
        <template #panel-2>
          <div class="panel-content">Small size tab content.</div>
        </template>
      </AltrexTabs>

      <h3>Medium (Default)</h3>
      <AltrexTabs
        v-model="mediumActive"
        size="medium"
        :tabs="sizeTabs"
      >
        <template #panel-0>
          <div class="panel-content">Medium size tab content.</div>
        </template>
        <template #panel-1>
          <div class="panel-content">Medium size tab content.</div>
        </template>
        <template #panel-2>
          <div class="panel-content">Medium size tab content.</div>
        </template>
      </AltrexTabs>

      <h3>Large</h3>
      <AltrexTabs
        v-model="largeActive"
        size="large"
        :tabs="sizeTabs"
      >
        <template #panel-0>
          <div class="panel-content">Large size tab content.</div>
        </template>
        <template #panel-1>
          <div class="panel-content">Large size tab content.</div>
        </template>
        <template #panel-2>
          <div class="panel-content">Large size tab content.</div>
        </template>
      </AltrexTabs>
    </section>

    <!-- Alignment Section -->
    <section class="demo-section">
      <h2>Alignment</h2>
      <p class="description">Align tabs to the left, center, or right.</p>

      <h3>Left Aligned (Default)</h3>
      <AltrexTabs
        v-model="leftActive"
        align="left"
        :tabs="alignTabs"
      >
        <template #panel-0><div class="panel-content">Left aligned content.</div></template>
        <template #panel-1><div class="panel-content">Left aligned content.</div></template>
        <template #panel-2><div class="panel-content">Left aligned content.</div></template>
      </AltrexTabs>

      <h3>Center Aligned</h3>
      <AltrexTabs
        v-model="centerActive"
        align="center"
        :tabs="alignTabs"
      >
        <template #panel-0><div class="panel-content">Center aligned content.</div></template>
        <template #panel-1><div class="panel-content">Center aligned content.</div></template>
        <template #panel-2><div class="panel-content">Center aligned content.</div></template>
      </AltrexTabs>

      <h3>Right Aligned</h3>
      <AltrexTabs
        v-model="rightActive"
        align="right"
        :tabs="alignTabs"
      >
        <template #panel-0><div class="panel-content">Right aligned content.</div></template>
        <template #panel-1><div class="panel-content">Right aligned content.</div></template>
        <template #panel-2><div class="panel-content">Right aligned content.</div></template>
      </AltrexTabs>
    </section>

    <!-- Full Width Section -->
    <section class="demo-section">
      <h2>Full Width</h2>
      <p class="description">Tabs can stretch to fill the available width.</p>
      <AltrexTabs
        v-model="fullWidthActive"
        :tabs="fullWidthTabs"
        :full-width="true"
      >
        <template #panel-0>
          <div class="panel-content">Full width tab content 1.</div>
        </template>
        <template #panel-1>
          <div class="panel-content">Full width tab content 2.</div>
        </template>
        <template #panel-2>
          <div class="panel-content">Full width tab content 3.</div>
        </template>
      </AltrexTabs>
    </section>

    <!-- Disabled Tabs Section -->
    <section class="demo-section">
      <h2>Disabled Tabs</h2>
      <p class="description">Individual tabs can be disabled.</p>
      <AltrexTabs
        v-model="disabledActive"
        :tabs="disabledTabs"
      >
        <template #panel-0>
          <div class="panel-content">Active tab content.</div>
        </template>
        <template #panel-1>
          <div class="panel-content">This tab is disabled.</div>
        </template>
        <template #panel-2>
          <div class="panel-content">Available tab content.</div>
        </template>
      </AltrexTabs>
    </section>

    <!-- Keyboard Navigation Section -->
    <section class="demo-section">
      <h2>Keyboard Navigation</h2>
      <p class="description">Tabs support full keyboard navigation following ARIA patterns.</p>
      <div class="keyboard-info">
        <h4>Keyboard Shortcuts:</h4>
        <ul>
          <li><kbd>Tab</kbd> - Focus the tab list</li>
          <li><kbd>←</kbd> / <kbd>→</kbd> - Navigate between tabs (horizontal)</li>
          <li><kbd>↑</kbd> / <kbd>↓</kbd> - Navigate between tabs (alternative)</li>
          <li><kbd>Home</kbd> - Jump to first tab</li>
          <li><kbd>End</kbd> - Jump to last tab</li>
          <li><kbd>Enter</kbd> / <kbd>Space</kbd> - Activate focused tab</li>
        </ul>
      </div>
      <AltrexTabs
        v-model="keyboardActive"
        :tabs="keyboardTabs"
      >
        <template #panel-0><div class="panel-content">Try using arrow keys to navigate!</div></template>
        <template #panel-1><div class="panel-content">Press Home to go to first tab.</div></template>
        <template #panel-2><div class="panel-content">Press End to go to last tab.</div></template>
        <template #panel-3><div class="panel-content">Tab key moves focus to content.</div></template>
      </AltrexTabs>
    </section>

    <!-- Programmatic Control Section -->
    <section class="demo-section">
      <h2>Programmatic Control</h2>
      <p class="description">Control active tab programmatically with v-model.</p>
      <div class="control-buttons">
        <AltrexButton @click="programmaticActive = 0" size="small">Go to Tab 1</AltrexButton>
        <AltrexButton @click="programmaticActive = 1" size="small">Go to Tab 2</AltrexButton>
        <AltrexButton @click="programmaticActive = 2" size="small">Go to Tab 3</AltrexButton>
      </div>
      <AltrexTabs
        v-model="programmaticActive"
        :tabs="programmaticTabs"
        @change="handleTabChange"
      >
        <template #panel-0><div class="panel-content">Tab 1 - Currently active: {{ programmaticActive }}</div></template>
        <template #panel-1><div class="panel-content">Tab 2 - Currently active: {{ programmaticActive }}</div></template>
        <template #panel-2><div class="panel-content">Tab 3 - Currently active: {{ programmaticActive }}</div></template>
      </AltrexTabs>
      <p v-if="lastChange" class="change-info">Last change: {{ lastChange }}</p>
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
              <td><code>tabs</code></td>
              <td>Array</td>
              <td>required</td>
              <td>Array of tab objects with { label, id?, icon?, badge?, badgeVariant?, disabled?, content? }</td>
            </tr>
            <tr>
              <td><code>modelValue</code></td>
              <td>Number | String</td>
              <td>0</td>
              <td>Active tab index or id (v-model)</td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td>String</td>
              <td>'line'</td>
              <td>Tab variant: 'line', 'enclosed', 'pills'</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>String</td>
              <td>'medium'</td>
              <td>Tab size: 'small', 'medium', 'large'</td>
            </tr>
            <tr>
              <td><code>fullWidth</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Stretch tabs to fill container width</td>
            </tr>
            <tr>
              <td><code>align</code></td>
              <td>String</td>
              <td>'left'</td>
              <td>Tab alignment: 'left', 'center', 'right'</td>
            </tr>
            <tr>
              <td><code>ariaLabel</code></td>
              <td>String</td>
              <td>'Tabs'</td>
              <td>ARIA label for tab list</td>
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
              <td><code>update:modelValue</code></td>
              <td>Number | String</td>
              <td>Emitted when active tab changes (for v-model)</td>
            </tr>
            <tr>
              <td><code>change</code></td>
              <td>{ tab, index, id }</td>
              <td>Emitted when active tab changes with full tab details</td>
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
              <td><code>panel-{index}</code></td>
              <td>{ tab }</td>
              <td>Content for each tab panel (e.g., panel-0, panel-1, panel-2)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import AltrexTabs from '../components/Tabs/AltrexTabs.vue'
import AltrexButton from '../components/Button/AltrexButton.vue'

export default {
  name: 'AltrexTabsView',
  components: {
    AltrexTabs,
    AltrexButton
  },
  data() {
    return {
      // Basic
      basicActive: 0,
      basicTabs: [
        { label: 'Overview', id: 'overview' },
        { label: 'Exercises', id: 'exercises' },
        { label: 'Progress', id: 'progress' }
      ],

      // Variants
      lineActive: 0,
      enclosedActive: 0,
      pillsActive: 0,
      variantTabs: [
        { label: 'Tab 1' },
        { label: 'Tab 2' },
        { label: 'Tab 3' }
      ],

      // Icons
      iconActive: 0,
      iconTabs: [
        { label: 'Workouts', icon: 'generic-dumbbell' },
        { label: 'Schedule', icon: 'generic-calendar' },
        { label: 'Stats', icon: 'generic-bar-chart' },
        { label: 'Settings', icon: 'generic-settings' }
      ],

      // Badges
      badgeActive: 0,
      badgeTabs: [
        { label: 'All', badge: 12, badgeVariant: 'neutral' },
        { label: 'Scheduled', badge: 5, badgeVariant: 'primary' },
        { label: 'Completed', badge: 8, badgeVariant: 'success' }
      ],

      // Sizes
      smallActive: 0,
      mediumActive: 0,
      largeActive: 0,
      sizeTabs: [
        { label: 'First' },
        { label: 'Second' },
        { label: 'Third' }
      ],

      // Alignment
      leftActive: 0,
      centerActive: 0,
      rightActive: 0,
      alignTabs: [
        { label: 'Tab A' },
        { label: 'Tab B' },
        { label: 'Tab C' }
      ],

      // Full width
      fullWidthActive: 0,
      fullWidthTabs: [
        { label: 'Tab One' },
        { label: 'Tab Two' },
        { label: 'Tab Three' }
      ],

      // Disabled
      disabledActive: 0,
      disabledTabs: [
        { label: 'Active' },
        { label: 'Disabled', disabled: true },
        { label: 'Available' }
      ],

      // Keyboard
      keyboardActive: 0,
      keyboardTabs: [
        { label: 'First' },
        { label: 'Second' },
        { label: 'Third' },
        { label: 'Fourth' }
      ],

      // Programmatic
      programmaticActive: 0,
      programmaticTabs: [
        { label: 'Tab 1' },
        { label: 'Tab 2' },
        { label: 'Tab 3' }
      ],
      lastChange: null
    }
  },
  methods: {
    handleTabChange(event) {
      this.lastChange = `Tab "${event.tab.label}" (index: ${event.index})`
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
    margin-bottom: $altrex-spacing-4

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-300)

  h4
    font-size: $altrex-fontSize-lg
    font-weight: $altrex-fontWeight-medium
    margin-bottom: $altrex-spacing-2

  .description
    font-size: $altrex-fontSize-base
    color: var(--altrex-colors-neutral-600)
    margin-bottom: $altrex-spacing-6

    [data-theme="dark"] &
      color: var(--altrex-colors-neutral-400)

.panel-content
  padding: $altrex-spacing-6
  background: var(--altrex-colors-neutral-50)
  border: 1px solid var(--altrex-colors-neutral-200)
  border-radius: $altrex-borderRadius-default

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-surface)
    border-color: var(--altrex-colors-dark-border-default)

  h3
    margin-top: 0
    font-size: $altrex-fontSize-lg
    color: var(--altrex-colors-neutral-900)

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-primary)

  p
    margin: $altrex-spacing-2 0 0
    color: var(--altrex-colors-neutral-700)

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-secondary)

.keyboard-info
  padding: $altrex-spacing-4
  background: var(--altrex-colors-info-50)
  border: 1px solid var(--altrex-colors-info-500)
  border-radius: $altrex-borderRadius-default
  margin-bottom: $altrex-spacing-6

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-info-bg)
    border-color: var(--altrex-colors-dark-info-border)

  h4
    margin-top: 0
    color: var(--altrex-colors-info-900)

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-info-default)

  ul
    margin: $altrex-spacing-2 0 0
    padding-left: $altrex-spacing-5
    color: var(--altrex-colors-info-900)

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-info-default)

  kbd
    padding: 2px 6px
    background: var(--altrex-colors-neutral-100)
    border: 1px solid var(--altrex-colors-neutral-300)
    border-radius: $altrex-borderRadius-sm
    font-family: monospace
    font-size: 0.9em

    [data-theme="dark"] &
      background: var(--altrex-colors-dark-bg-hover)
      border-color: var(--altrex-colors-dark-border-default)

.control-buttons
  display: flex
  gap: $altrex-spacing-3
  margin-bottom: $altrex-spacing-6

.change-info
  margin-top: $altrex-spacing-4
  padding: $altrex-spacing-3
  background: var(--altrex-colors-success-50)
  border-radius: $altrex-borderRadius-default
  font-size: $altrex-fontSize-sm
  color: var(--altrex-colors-success-900)

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-success-bg)
    color: var(--altrex-colors-dark-success-default)

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
