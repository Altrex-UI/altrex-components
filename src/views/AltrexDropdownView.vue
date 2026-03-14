<template>
  <div class="demo-view">
    <h1>AltrexDropdown</h1>
    <p class="subtitle">Dropdown menus with keyboard navigation, mobile-first design, and smart positioning</p>

    <!-- Mobile Notice -->
    <div class="mobile-notice">
      <AltrexIcon icon="generic-info-circle" />
      <div>
        <strong>Mobile Behavior:</strong> Dropdowns show full-width menus on mobile with 44×44px touch targets.
        Desktop displays compact menus with hover support and keyboard navigation.
      </div>
    </div>

    <!-- Basic Usage -->
    <section class="demo-section">
      <h2>Basic Usage</h2>
      <p class="demo-description">Simple dropdown with menu items</p>
      <div class="demo-container">
        <AltrexDropdown
          :items="basicItems"
          trigger-text="Select Option"
          @select="handleBasicSelect"
        />
        <p v-if="basicSelected" class="demo-output">
          Selected: <code>{{ basicSelected.label }}</code>
        </p>
      </div>
    </section>

    <!-- Placements -->
    <section class="demo-section">
      <h2>Placements</h2>
      <p class="demo-description">Control where the menu appears relative to the trigger</p>
      <div class="placement-grid">
        <AltrexDropdown
          :items="placementItems"
          placement="top-left"
          trigger-text="Top Left"
        />
        <AltrexDropdown
          :items="placementItems"
          placement="top-right"
          trigger-text="Top Right"
        />
        <AltrexDropdown
          :items="placementItems"
          placement="bottom-left"
          trigger-text="Bottom Left"
        />
        <AltrexDropdown
          :items="placementItems"
          placement="bottom-right"
          trigger-text="Bottom Right"
        />
      </div>
    </section>

    <!-- Trigger Methods -->
    <section class="demo-section">
      <h2>Trigger Methods</h2>
      <p class="demo-description">Click or hover to open (mobile always uses click)</p>
      <div class="demo-group">
        <AltrexDropdown
          :items="triggerItems"
          trigger="click"
          trigger-text="Click to Open"
        />
        <AltrexDropdown
          :items="triggerItems"
          trigger="hover"
          trigger-text="Hover to Open"
        />
      </div>
    </section>

    <!-- With Icons -->
    <section class="demo-section">
      <h2>With Icons</h2>
      <p class="demo-description">Add icons to menu items for better visual clarity</p>
      <div class="demo-container">
        <AltrexDropdown
          :items="iconItems"
          trigger-text="Actions"
          @select="handleActionSelect"
        />
        <p v-if="actionSelected" class="demo-output">
          Action: <code>{{ actionSelected.label }}</code>
        </p>
      </div>
    </section>

    <!-- With Dividers -->
    <section class="demo-section">
      <h2>With Dividers</h2>
      <p class="demo-description">Group related items with dividers</p>
      <div class="demo-container">
        <AltrexDropdown
          :items="dividerItems"
          trigger-text="File Menu"
          @select="handleFileSelect"
        />
      </div>
    </section>

    <!-- With Disabled Items -->
    <section class="demo-section">
      <h2>Disabled Items</h2>
      <p class="demo-description">Disable specific menu items</p>
      <div class="demo-container">
        <AltrexDropdown
          :items="disabledItems"
          trigger-text="Edit Options"
        />
      </div>
    </section>

    <!-- With Descriptions -->
    <section class="demo-section">
      <h2>With Descriptions</h2>
      <p class="demo-description">Add helpful descriptions to menu items</p>
      <div class="demo-container">
        <AltrexDropdown
          :items="descriptionItems"
          trigger-text="Choose Plan"
          max-height="400px"
          @select="handlePlanSelect"
        />
      </div>
    </section>

    <!-- Custom Trigger -->
    <section class="demo-section">
      <h2>Custom Trigger</h2>
      <p class="demo-description">Use custom content as the dropdown trigger</p>
      <div class="demo-group">
        <AltrexDropdown :items="basicItems">
          <template #trigger>
            <button class="custom-trigger custom-trigger--primary">
              <AltrexIcon icon="generic-settings" />
              Settings
            </button>
          </template>
        </AltrexDropdown>

        <AltrexDropdown :items="userMenuItems" placement="bottom-right">
          <template #trigger>
            <div class="user-trigger">
              <div class="user-avatar">JD</div>
              <span class="user-name">John Doe</span>
              <AltrexIcon icon="generic-chevron-down" class="user-chevron" />
            </div>
          </template>
        </AltrexDropdown>

        <AltrexDropdown :items="iconItems">
          <template #trigger>
            <button class="icon-trigger" aria-label="More options">
              <AltrexIcon icon="generic-more-vertical" />
            </button>
          </template>
        </AltrexDropdown>
      </div>
    </section>

    <!-- Max Height & Scrolling -->
    <section class="demo-section">
      <h2>Max Height & Scrolling</h2>
      <p class="demo-description">Long menus scroll when they exceed max height</p>
      <div class="demo-group">
        <AltrexDropdown
          :items="longList"
          trigger-text="Short Menu (200px)"
          max-height="200px"
        />
        <AltrexDropdown
          :items="longList"
          trigger-text="Tall Menu (400px)"
          max-height="400px"
        />
      </div>
    </section>

    <!-- Keyboard Navigation -->
    <section class="demo-section">
      <h2>Keyboard Navigation</h2>
      <p class="demo-description">Full keyboard support for accessibility</p>
      <div class="demo-container">
        <div class="accessibility-info">
          <h3>Keyboard Shortcuts:</h3>
          <ul>
            <li><kbd>Enter</kbd> or <kbd>Space</kbd> or <kbd>↓</kbd> - Open menu</li>
            <li><kbd>Escape</kbd> - Close menu</li>
            <li><kbd>↑</kbd> / <kbd>↓</kbd> - Navigate items</li>
            <li><kbd>Home</kbd> / <kbd>End</kbd> - First/last item</li>
            <li><kbd>Enter</kbd> or <kbd>Space</kbd> - Select item</li>
          </ul>
          <p><strong>Try it:</strong> Tab to the dropdown below and use keyboard navigation</p>
        </div>
        <AltrexDropdown
          :items="keyboardItems"
          trigger-text="Keyboard Navigation Demo"
          @select="handleKeyboardSelect"
        />
        <p v-if="keyboardSelected" class="demo-output">
          Selected: <code>{{ keyboardSelected.label }}</code>
        </p>
      </div>
    </section>

    <!-- Disabled State -->
    <section class="demo-section">
      <h2>Disabled State</h2>
      <p class="demo-description">Disable the entire dropdown</p>
      <div class="demo-group">
        <AltrexDropdown
          :items="basicItems"
          trigger-text="Enabled Dropdown"
        />
        <AltrexDropdown
          :items="basicItems"
          trigger-text="Disabled Dropdown"
          :disabled="true"
        />
      </div>
    </section>

    <!-- Practical Examples -->
    <section class="demo-section">
      <h2>Practical Examples</h2>
      <p class="demo-description">Real-world use cases</p>

      <div class="example-card">
        <h3>User Profile Menu</h3>
        <AltrexDropdown :items="profileMenuItems" placement="bottom-right" @select="handleProfileAction">
          <template #trigger>
            <div class="profile-trigger">
              <img src="https://i.pravatar.cc/40" alt="User" class="profile-avatar" />
              <span class="profile-name">Jane Smith</span>
              <AltrexIcon icon="generic-chevron-down" />
            </div>
          </template>
        </AltrexDropdown>
      </div>

      <div class="example-card">
        <h3>Table Row Actions</h3>
        <div class="table-row">
          <span class="table-cell">Item #12345</span>
          <span class="table-cell">Active</span>
          <AltrexDropdown :items="rowActions" placement="bottom-right" @select="handleRowAction">
            <template #trigger>
              <button class="icon-trigger" aria-label="Actions">
                <AltrexIcon icon="generic-more-horizontal" />
              </button>
            </template>
          </AltrexDropdown>
        </div>
      </div>

      <div class="example-card">
        <h3>Bulk Actions Toolbar</h3>
        <div class="toolbar">
          <span class="toolbar-text">3 items selected</span>
          <AltrexDropdown :items="bulkActions" @select="handleBulkAction">
            <template #trigger>
              <button class="toolbar-button">
                Bulk Actions
                <AltrexIcon icon="generic-chevron-down" />
              </button>
            </template>
          </AltrexDropdown>
        </div>
      </div>
    </section>

    <!-- Events Demo -->
    <section class="demo-section">
      <h2>Events</h2>
      <p class="demo-description">Listen to menu events</p>
      <div class="demo-container">
        <AltrexDropdown
          :items="eventItems"
          trigger-text="Event Demo"
          @open="handleOpen"
          @close="handleClose"
          @select="handleEventSelect"
          @item-click="handleItemClick"
        />
        <div class="event-log">
          <h4>Event Log:</h4>
          <div
            v-for="(event, index) in eventLog"
            :key="index"
            class="event-log__item"
          >
            {{ event }}
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
              <td><code>items</code></td>
              <td>Array</td>
              <td>—</td>
              <td>Menu items (required). Each item: { label, value, icon?, disabled?, divider?, description? }</td>
            </tr>
            <tr>
              <td><code>placement</code></td>
              <td>String</td>
              <td><code>'bottom-left'</code></td>
              <td>Menu position: 'bottom-left', 'bottom-right', 'top-left', 'top-right'</td>
            </tr>
            <tr>
              <td><code>trigger</code></td>
              <td>String</td>
              <td><code>'click'</code></td>
              <td>Trigger method: 'click' or 'hover'</td>
            </tr>
            <tr>
              <td><code>maxHeight</code></td>
              <td>String</td>
              <td><code>'320px'</code></td>
              <td>Max height before scrolling</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Disable the dropdown</td>
            </tr>
            <tr>
              <td><code>triggerText</code></td>
              <td>String</td>
              <td><code>'Menu'</code></td>
              <td>Text for default trigger button</td>
            </tr>
            <tr>
              <td><code>closeOnClick</code></td>
              <td>Boolean</td>
              <td><code>true</code></td>
              <td>Close menu after selecting item</td>
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
              <td><code>open</code></td>
              <td>—</td>
              <td>Emitted when menu opens</td>
            </tr>
            <tr>
              <td><code>close</code></td>
              <td>—</td>
              <td>Emitted when menu closes</td>
            </tr>
            <tr>
              <td><code>select</code></td>
              <td>item</td>
              <td>Emitted when item is selected</td>
            </tr>
            <tr>
              <td><code>item-click</code></td>
              <td>{ item, index }</td>
              <td>Emitted when item is clicked</td>
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
              <td><code>trigger</code></td>
              <td>—</td>
              <td>Custom trigger element (replaces default button)</td>
            </tr>
            <tr>
              <td><code>item-{value}</code></td>
              <td><code>{ item }</code></td>
              <td>Custom content for specific item</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import AltrexDropdown from '../components/Dropdown/AltrexDropdown.vue'
import AltrexIcon from '../components/Icon/AltrexIcon.vue'

export default {
  name: 'AltrexDropdownView',
  components: {
    AltrexDropdown,
    AltrexIcon
  },
  data() {
    return {
      // Basic
      basicItems: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' }
      ],
      basicSelected: null,

      // Placements
      placementItems: [
        { label: 'Item A', value: 'a' },
        { label: 'Item B', value: 'b' },
        { label: 'Item C', value: 'c' }
      ],

      // Triggers
      triggerItems: [
        { label: 'Action 1', value: 'action1' },
        { label: 'Action 2', value: 'action2' },
        { label: 'Action 3', value: 'action3' }
      ],

      // Icons
      iconItems: [
        { label: 'Edit', value: 'edit', icon: 'generic-pencil' },
        { label: 'Copy', value: 'copy', icon: 'generic-copy' },
        { label: 'Share', value: 'share', icon: 'generic-share' },
        { label: 'Delete', value: 'delete', icon: 'generic-trash' }
      ],
      actionSelected: null,

      // Dividers
      dividerItems: [
        { label: 'New File', value: 'new', icon: 'generic-file-add' },
        { label: 'Open', value: 'open', icon: 'generic-folder-open' },
        { divider: true },
        { label: 'Save', value: 'save', icon: 'generic-save' },
        { label: 'Save As...', value: 'saveas', icon: 'generic-save' },
        { divider: true },
        { label: 'Export', value: 'export', icon: 'generic-download' },
        { label: 'Print', value: 'print', icon: 'generic-printer' }
      ],

      // Disabled
      disabledItems: [
        { label: 'Cut', value: 'cut', icon: 'generic-scissors' },
        { label: 'Copy', value: 'copy', icon: 'generic-copy', disabled: true },
        { label: 'Paste', value: 'paste', icon: 'generic-clipboard', disabled: true },
        { divider: true },
        { label: 'Undo', value: 'undo', icon: 'generic-undo' },
        { label: 'Redo', value: 'redo', icon: 'generic-redo', disabled: true }
      ],

      // Descriptions
      descriptionItems: [
        {
          label: 'Free',
          value: 'free',
          description: 'Perfect for getting started'
        },
        {
          label: 'Pro',
          value: 'pro',
          description: 'Best for professionals'
        },
        {
          label: 'Enterprise',
          value: 'enterprise',
          description: 'Advanced features for teams'
        }
      ],

      // User menu
      userMenuItems: [
        { label: 'Profile', value: 'profile', icon: 'generic-user' },
        { label: 'Settings', value: 'settings', icon: 'generic-settings' },
        { divider: true },
        { label: 'Logout', value: 'logout', icon: 'generic-logout' }
      ],

      // Long list
      longList: Array.from({ length: 20 }, (_, i) => ({
        label: `Item ${i + 1}`,
        value: `item-${i + 1}`
      })),

      // Keyboard
      keyboardItems: [
        { label: 'First Item', value: '1' },
        { label: 'Second Item', value: '2' },
        { label: 'Third Item', value: '3' },
        { label: 'Fourth Item', value: '4', disabled: true },
        { label: 'Fifth Item', value: '5' }
      ],
      keyboardSelected: null,

      // Profile menu
      profileMenuItems: [
        { label: 'View Profile', value: 'view-profile', icon: 'generic-user' },
        { label: 'Account Settings', value: 'settings', icon: 'generic-settings' },
        { label: 'Billing', value: 'billing', icon: 'generic-credit-card' },
        { divider: true },
        { label: 'Help & Support', value: 'help', icon: 'generic-question-circle' },
        { label: 'Documentation', value: 'docs', icon: 'generic-book' },
        { divider: true },
        { label: 'Sign Out', value: 'signout', icon: 'generic-logout' }
      ],

      // Row actions
      rowActions: [
        { label: 'View', value: 'view', icon: 'generic-eye' },
        { label: 'Edit', value: 'edit', icon: 'generic-pencil' },
        { label: 'Duplicate', value: 'duplicate', icon: 'generic-copy' },
        { divider: true },
        { label: 'Archive', value: 'archive', icon: 'generic-archive' },
        { label: 'Delete', value: 'delete', icon: 'generic-trash' }
      ],

      // Bulk actions
      bulkActions: [
        { label: 'Export Selected', value: 'export', icon: 'generic-download' },
        { label: 'Tag Selected', value: 'tag', icon: 'generic-tag' },
        { label: 'Archive Selected', value: 'archive', icon: 'generic-archive' },
        { divider: true },
        { label: 'Delete Selected', value: 'delete', icon: 'generic-trash' }
      ],

      // Events
      eventItems: [
        { label: 'Action A', value: 'a' },
        { label: 'Action B', value: 'b' },
        { label: 'Action C', value: 'c' }
      ],
      eventLog: []
    }
  },
  methods: {
    handleBasicSelect(item) {
      this.basicSelected = item
    },
    handleActionSelect(item) {
      this.actionSelected = item
    },
    handleFileSelect(item) {
      console.log('File action:', item.label)
    },
    handlePlanSelect(item) {
      console.log('Plan selected:', item.label)
    },
    handleKeyboardSelect(item) {
      this.keyboardSelected = item
    },
    handleProfileAction(item) {
      console.log('Profile action:', item.value)
    },
    handleRowAction(item) {
      console.log('Row action:', item.value)
    },
    handleBulkAction(item) {
      console.log('Bulk action:', item.value)
    },
    handleOpen() {
      this.addEventLog('Menu opened')
    },
    handleClose() {
      this.addEventLog('Menu closed')
    },
    handleEventSelect(item) {
      this.addEventLog(`Selected: ${item.label}`)
    },
    handleItemClick({ item, index }) {
      this.addEventLog(`Clicked item at index ${index}: ${item.label}`)
    },
    addEventLog(message) {
      const timestamp = new Date().toLocaleTimeString()
      this.eventLog.unshift(`[${timestamp}] ${message}`)
      if (this.eventLog.length > 5) {
        this.eventLog.pop()
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

.demo-container
  background: var(--altrex-colors-neutral-50)
  border: 1px solid var(--altrex-colors-neutral-200)
  border-radius: $altrex-borderRadius-lg
  padding: $altrex-spacing-6

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-elevated)
    border-color: var(--altrex-colors-dark-border-default)

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

.demo-group
  display: flex
  flex-wrap: wrap
  gap: $altrex-spacing-4

.placement-grid
  display: grid
  grid-template-columns: repeat(2, 1fr)
  gap: $altrex-spacing-4
  padding: $altrex-spacing-8
  background: var(--altrex-colors-neutral-50)
  border: 1px solid var(--altrex-colors-neutral-200)
  border-radius: $altrex-borderRadius-lg

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-elevated)
    border-color: var(--altrex-colors-dark-border-default)

  +above('md')
    grid-template-columns: repeat(4, 1fr)

// Custom triggers
.custom-trigger
  min-height: $altrex-touchTarget-minimum
  display: inline-flex
  align-items: center
  gap: $altrex-spacing-2
  padding: $altrex-spacing-3 $altrex-spacing-4
  border: none
  border-radius: $altrex-borderRadius-default
  font-size: 16px
  font-weight: $altrex-fontWeight-medium
  cursor: pointer
  transition: all $altrex-transition-default

  +above('md')
    min-height: 40px
    font-size: $altrex-fontSize-base

  :deep(.altrex-icon)
    altrex-icon-s()

  &--primary
    background: $altrex-colors-primary-500
    color: white

    &:hover
      background: $altrex-colors-primary-600

.user-trigger
  display: flex
  align-items: center
  gap: $altrex-spacing-2
  padding: $altrex-spacing-2 $altrex-spacing-3
  background: var(--altrex-colors-neutral-50)
  border: 1px solid var(--altrex-colors-neutral-300)
  border-radius: $altrex-borderRadius-default
  cursor: pointer
  transition: all $altrex-transition-default

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-input)
    border-color: var(--altrex-colors-dark-border-default)

  &:hover
    border-color: $altrex-colors-primary-500

.user-avatar
  width: 32px
  height: 32px
  display: flex
  align-items: center
  justify-content: center
  background: $altrex-colors-primary-500
  color: white
  border-radius: 50%
  font-size: $altrex-fontSize-sm
  font-weight: $altrex-fontWeight-bold

.user-name
  font-size: $altrex-fontSize-sm
  font-weight: $altrex-fontWeight-medium
  color: var(--altrex-colors-neutral-900)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-primary)

.user-chevron
  altrex-icon-s()
  color: var(--altrex-colors-neutral-600)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-secondary)

.icon-trigger
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

.profile-trigger
  display: flex
  align-items: center
  gap: $altrex-spacing-3
  padding: $altrex-spacing-2
  border: 1px solid var(--altrex-colors-neutral-300)
  border-radius: $altrex-borderRadius-default
  cursor: pointer
  transition: all $altrex-transition-default

  [data-theme="dark"] &
    border-color: var(--altrex-colors-dark-border-default)

  &:hover
    border-color: $altrex-colors-primary-500

.profile-avatar
  width: 40px
  height: 40px
  border-radius: 50%

.profile-name
  font-size: $altrex-fontSize-base
  font-weight: $altrex-fontWeight-medium
  color: var(--altrex-colors-neutral-900)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-primary)

  :deep(.altrex-icon)
    altrex-icon-s()

.table-row
  display: flex
  align-items: center
  justify-content: space-between
  padding: $altrex-spacing-3
  background: var(--altrex-colors-neutral-100)
  border-radius: $altrex-borderRadius-default

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-subtle)

.table-cell
  font-size: $altrex-fontSize-sm
  color: var(--altrex-colors-neutral-700)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-secondary)

.toolbar
  display: flex
  align-items: center
  justify-content: space-between
  padding: $altrex-spacing-3
  background: var(--altrex-colors-neutral-100)
  border-radius: $altrex-borderRadius-default

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-subtle)

.toolbar-text
  font-size: $altrex-fontSize-sm
  font-weight: $altrex-fontWeight-medium
  color: var(--altrex-colors-neutral-700)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-primary)

.toolbar-button
  min-height: 36px
  display: flex
  align-items: center
  gap: $altrex-spacing-2
  padding: $altrex-spacing-2 $altrex-spacing-3
  background: $altrex-colors-primary-500
  color: white
  border: none
  border-radius: $altrex-borderRadius-default
  font-size: $altrex-fontSize-sm
  font-weight: $altrex-fontWeight-medium
  cursor: pointer

  &:hover
    background: $altrex-colors-primary-600

  :deep(.altrex-icon)
    altrex-icon-s()

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

  li
    color: var(--altrex-colors-neutral-700)
    margin-bottom: $altrex-spacing-2

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-secondary)

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

// Event log
.event-log
  margin-top: $altrex-spacing-6
  padding: $altrex-spacing-4
  background: var(--altrex-colors-neutral-900)
  border-radius: $altrex-borderRadius-default
  color: $altrex-colors-success-400
  font-family: monospace
  font-size: $altrex-fontSize-sm

  h4
    color: white
    margin-bottom: $altrex-spacing-3

  &__item
    padding: $altrex-spacing-2 0
    border-bottom: 1px solid rgba(255, 255, 255, 0.1)

    &:last-child
      border-bottom: none

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
