<template>
  <div class="drawer-demo">
    <h1>Altrex Drawer</h1>
    <p class="subtitle">Slide-in side panels for navigation, filters, and contextual content</p>

    <!-- Position Variants -->
    <section class="demo-section">
      <h2>Positions</h2>
      <p class="description">
        Drawers can slide in from any edge: left, right, top, or bottom.
      </p>

      <div class="demo-group">
        <div class="demo-item">
          <AltrexButton label="Left" @click="openDrawer('left', 'm')" />
          <span class="demo-label">Slide from left</span>
        </div>

        <div class="demo-item">
          <AltrexButton label="Right" @click="openDrawer('right', 'm')" />
          <span class="demo-label">Slide from right</span>
        </div>

        <div class="demo-item">
          <AltrexButton label="Top" @click="openDrawer('top', 'm')" />
          <span class="demo-label">Slide from top</span>
        </div>

        <div class="demo-item">
          <AltrexButton label="Bottom" @click="openDrawer('bottom', 'm')" />
          <span class="demo-label">Slide from bottom</span>
        </div>
      </div>
    </section>

    <!-- Size Variants -->
    <section class="demo-section">
      <h2>Sizes</h2>
      <p class="description">
        Four size variants: small (320px), medium (400px), large (600px), and extra-large (800px).
        On mobile, drawers are nearly full-width (90vw) regardless of size.
      </p>

      <div class="demo-group">
        <div class="demo-item">
          <AltrexButton label="Small" size="s" @click="openDrawer('right', 's')" />
          <span class="demo-label">320px desktop</span>
        </div>

        <div class="demo-item">
          <AltrexButton label="Medium" size="m" @click="openDrawer('right', 'm')" />
          <span class="demo-label">400px desktop (default)</span>
        </div>

        <div class="demo-item">
          <AltrexButton label="Large" size="l" @click="openDrawer('right', 'l')" />
          <span class="demo-label">600px desktop</span>
        </div>

        <div class="demo-item">
          <AltrexButton label="Extra Large" size="l" @click="openDrawer('right', 'xl')" />
          <span class="demo-label">800px desktop</span>
        </div>
      </div>
    </section>

    <!-- With Content -->
    <section class="demo-section">
      <h2>With Header and Footer</h2>
      <p class="description">
        Drawers support header, body, and footer slots for structured content.
      </p>

      <AltrexButton label="Open Drawer with Slots" @click="isContentDrawerOpen = true" />

      <AltrexDrawer
        :open="isContentDrawerOpen"
        @update:open="isContentDrawerOpen = $event"
        title="Settings"
        position="right"
        size="m"
      >
        <template #body>
          <div class="drawer-content">
            <h3>Notification Settings</h3>
            <p>Configure your notification preferences.</p>

            <div class="settings-group">
              <AltrexCheckbox v-model="settings.emailNotifications" label="Email notifications" />
              <AltrexCheckbox v-model="settings.pushNotifications" label="Push notifications" />
              <AltrexCheckbox v-model="settings.smsNotifications" label="SMS notifications" />
            </div>

            <h3>Privacy</h3>
            <div class="settings-group">
              <AltrexCheckbox v-model="settings.profileVisible" label="Profile visible to public" />
              <AltrexCheckbox v-model="settings.activityVisible" label="Show activity status" />
            </div>
          </div>
        </template>

        <template #footer>
          <AltrexButton label="Cancel" variant="ghost" @click="isContentDrawerOpen = false" />
          <AltrexButton label="Save Changes" @click="saveSettings" />
        </template>
      </AltrexDrawer>
    </section>

    <!-- Persistent Mode -->
    <section class="demo-section">
      <h2>Persistent Drawer</h2>
      <p class="description">
        Prevent closing on backdrop click or escape key for forms or critical workflows.
      </p>

      <AltrexButton label="Open Persistent Drawer" @click="isPersistentOpen = true" />

      <AltrexDrawer
        :open="isPersistentOpen"
        @update:open="isPersistentOpen = $event"
        title="Complete Your Profile"
        position="right"
        size="l"
        :close-on-backdrop="false"
        :close-on-escape="false"
      >
        <template #body>
          <div class="drawer-content">
            <p>
              This drawer requires you to explicitly click the close button or cancel.
              Clicking the backdrop or pressing Escape will not close it.
            </p>

            <div class="form-group">
              <AltrexInput v-model="formData.name" label="Full Name" placeholder="John Doe" />
            </div>

            <div class="form-group">
              <AltrexInput v-model="formData.email" label="Email" type="email" placeholder="john@example.com" />
            </div>

            <div class="form-group">
              <AltrexInput v-model="formData.bio" label="Bio" placeholder="Tell us about yourself..." />
            </div>
          </div>
        </template>

        <template #footer>
          <AltrexButton label="Cancel" variant="ghost" @click="isPersistentOpen = false" />
          <AltrexButton label="Submit" @click="submitForm" />
        </template>
      </AltrexDrawer>
    </section>

    <!-- Custom Backdrop -->
    <section class="demo-section">
      <h2>Custom Backdrop Opacity</h2>
      <p class="description">
        Adjust the backdrop opacity for different visual effects.
      </p>

      <div class="demo-group">
        <div class="demo-item">
          <AltrexButton label="Light (0.2)" @click="openCustomBackdrop(0.2)" />
          <span class="demo-label">Subtle overlay</span>
        </div>

        <div class="demo-item">
          <AltrexButton label="Medium (0.5)" @click="openCustomBackdrop(0.5)" />
          <span class="demo-label">Default overlay</span>
        </div>

        <div class="demo-item">
          <AltrexButton label="Dark (0.8)" @click="openCustomBackdrop(0.8)" />
          <span class="demo-label">Strong overlay</span>
        </div>
      </div>
    </section>

    <!-- Style Overrides -->
    <section class="demo-section">
      <h2>Style Overrides</h2>
      <p class="description">
        Customize drawer appearance using the styleOverrides prop.
      </p>

      <AltrexButton label="Custom Styled Drawer" @click="isStyledOpen = true" />

      <AltrexDrawer
        :open="isStyledOpen"
        @update:open="isStyledOpen = $event"
        title="Custom Styled"
        position="right"
        size="m"
        :style-overrides="{
          background: '#f8f9fa',
          titleColor: '#2c3e50',
          bodyColor: '#34495e'
        }"
      >
        <p>This drawer has custom background and text colors applied via styleOverrides.</p>
      </AltrexDrawer>
    </section>

    <!-- Props Reference -->
    <section class="demo-section">
      <h2>Props Reference</h2>
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
              <td><code>open</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Controls drawer visibility (v-model)</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td>String</td>
              <td><code>''</code></td>
              <td>Drawer title text</td>
            </tr>
            <tr>
              <td><code>position</code></td>
              <td>String</td>
              <td><code>'right'</code></td>
              <td>Slide position: 'left', 'right', 'top', 'bottom'</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>String</td>
              <td><code>'m'</code></td>
              <td>Size variant: 's', 'm', 'l', 'xl'</td>
            </tr>
            <tr>
              <td><code>showClose</code></td>
              <td>Boolean</td>
              <td><code>true</code></td>
              <td>Show close button</td>
            </tr>
            <tr>
              <td><code>closeOnBackdrop</code></td>
              <td>Boolean</td>
              <td><code>true</code></td>
              <td>Allow closing by clicking backdrop</td>
            </tr>
            <tr>
              <td><code>closeOnEscape</code></td>
              <td>Boolean</td>
              <td><code>true</code></td>
              <td>Allow closing with Escape key</td>
            </tr>
            <tr>
              <td><code>lockBodyScroll</code></td>
              <td>Boolean</td>
              <td><code>true</code></td>
              <td>Prevent body scroll when open</td>
            </tr>
            <tr>
              <td><code>backdropOpacity</code></td>
              <td>Number</td>
              <td><code>0.5</code></td>
              <td>Backdrop opacity (0-1)</td>
            </tr>
            <tr>
              <td><code>styleOverrides</code></td>
              <td>Object</td>
              <td><code>{}</code></td>
              <td>Custom CSS variable overrides</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Events Reference -->
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
              <td><code>@update:open</code></td>
              <td>Boolean</td>
              <td>Emitted when open state changes (v-model)</td>
            </tr>
            <tr>
              <td><code>@open</code></td>
              <td>-</td>
              <td>Emitted when drawer opens</td>
            </tr>
            <tr>
              <td><code>@close</code></td>
              <td>-</td>
              <td>Emitted when drawer closes</td>
            </tr>
            <tr>
              <td><code>@afterOpen</code></td>
              <td>-</td>
              <td>Emitted after open animation completes</td>
            </tr>
            <tr>
              <td><code>@afterClose</code></td>
              <td>-</td>
              <td>Emitted after close animation completes</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Usage Example -->
    <section class="demo-section">
      <h2>Usage Example</h2>
      <pre class="code-block"><code>&lt;template&gt;
  &lt;AltrexButton label="Open Drawer" @click="isOpen = true" /&gt;

  &lt;AltrexDrawer
    v-model:open="isOpen"
    title="My Drawer"
    position="right"
    size="m"
  &gt;
    &lt;template #body&gt;
      &lt;p&gt;Drawer content goes here&lt;/p&gt;
    &lt;/template&gt;

    &lt;template #footer&gt;
      &lt;AltrexButton label="Close" @click="isOpen = false" /&gt;
    &lt;/template&gt;
  &lt;/AltrexDrawer&gt;
&lt;/template&gt;

&lt;script&gt;
import { ref } from 'vue'
import AltrexDrawer from '@/components/Drawer/AltrexDrawer.vue'
import AltrexButton from '@/components/Button/AltrexButton.vue'

export default {
  components: { AltrexDrawer, AltrexButton },
  setup() {
    const isOpen = ref(false)
    return { isOpen }
  }
}
&lt;/script&gt;</code></pre>
    </section>

    <!-- Dynamic Drawer (for position/size demos) -->
    <AltrexDrawer
      :open="isDynamicOpen"
      @update:open="isDynamicOpen = $event"
      :title="`${currentSize.toUpperCase()} Drawer - ${currentPosition}`"
      :position="currentPosition"
      :size="currentSize"
      :backdrop-opacity="currentBackdropOpacity"
    >
      <div class="drawer-content">
        <p>
          This is a <strong>{{ currentSize }}</strong> drawer sliding from the <strong>{{ currentPosition }}</strong>.
        </p>
        <p>
          Backdrop opacity: <strong>{{ currentBackdropOpacity }}</strong>
        </p>
        <p>
          On mobile (< 768px), drawers are nearly full-width (90vw) or full-height (90vh) regardless of size.
          On desktop, the drawer respects the size variant.
        </p>
        <p>
          <strong>Try these interactions:</strong>
        </p>
        <ul>
          <li>Click the backdrop to close (if enabled)</li>
          <li>Press Escape to close (if enabled)</li>
          <li>Click the X button to close</li>
          <li>Resize your browser to see responsive behavior</li>
        </ul>
      </div>
    </AltrexDrawer>
  </div>
</template>

<script>
import { ref } from 'vue'
import AltrexDrawer from '@/components/Drawer/AltrexDrawer.vue'
import AltrexButton from '@/components/Button/AltrexButton.vue'
import AltrexInput from '@/components/Input/AltrexInput.vue'
import AltrexCheckbox from '@/components/Checkbox/AltrexCheckbox.vue'

export default {
  name: 'AltrexDrawerView',
  components: {
    AltrexDrawer,
    AltrexButton,
    AltrexInput,
    AltrexCheckbox
  },
  setup() {
    // Dynamic drawer state
    const isDynamicOpen = ref(false)
    const currentPosition = ref('right')
    const currentSize = ref('m')
    const currentBackdropOpacity = ref(0.5)

    // Content drawer state
    const isContentDrawerOpen = ref(false)
    const settings = ref({
      emailNotifications: true,
      pushNotifications: false,
      smsNotifications: false,
      profileVisible: true,
      activityVisible: false
    })

    // Persistent drawer state
    const isPersistentOpen = ref(false)
    const formData = ref({
      name: '',
      email: '',
      bio: ''
    })

    // Styled drawer state
    const isStyledOpen = ref(false)

    const openDrawer = (position, size) => {
      currentPosition.value = position
      currentSize.value = size
      currentBackdropOpacity.value = 0.5
      isDynamicOpen.value = true
    }

    const openCustomBackdrop = (opacity) => {
      currentPosition.value = 'right'
      currentSize.value = 'm'
      currentBackdropOpacity.value = opacity
      isDynamicOpen.value = true
    }

    const saveSettings = () => {
      console.log('Settings saved:', settings.value)
      isContentDrawerOpen.value = false
      alert('Settings saved successfully!')
    }

    const submitForm = () => {
      console.log('Form submitted:', formData.value)
      isPersistentOpen.value = false
      alert('Profile updated successfully!')
    }

    return {
      isDynamicOpen,
      currentPosition,
      currentSize,
      currentBackdropOpacity,
      isContentDrawerOpen,
      settings,
      isPersistentOpen,
      formData,
      isStyledOpen,
      openDrawer,
      openCustomBackdrop,
      saveSettings,
      submitForm
    }
  }
}
</script>

<style lang="stylus" scoped>
.drawer-demo
  padding: $altrex-spacing-8
  max-width: 1200px
  margin: 0 auto

h1
  margin-bottom: $altrex-spacing-2
  color: var(--altrex-colors-neutral-900)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-primary)

.subtitle
  margin-bottom: $altrex-spacing-8
  color: var(--altrex-colors-neutral-600)
  font-size: $altrex-fontSize-lg

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-secondary)

.demo-section
  margin-bottom: $altrex-spacing-8

  h2
    margin-bottom: $altrex-spacing-2
    color: var(--altrex-colors-neutral-800)
    font-size: $altrex-fontSize-xl

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-primary)

  .description
    margin-bottom: $altrex-spacing-4
    color: var(--altrex-colors-neutral-600)
    font-size: $altrex-fontSize-sm

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-secondary)

.demo-group
  display: flex
  gap: $altrex-spacing-4
  flex-wrap: wrap

.demo-item
  display: flex
  flex-direction: column
  gap: $altrex-spacing-2

.demo-label
  font-size: $altrex-fontSize-xs
  color: var(--altrex-colors-neutral-500)
  max-width: 120px

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-tertiary)

.drawer-content
  h3
    margin-top: $altrex-spacing-6
    margin-bottom: $altrex-spacing-3
    font-size: $altrex-fontSize-lg
    font-weight: $altrex-fontWeight-semibold
    color: var(--altrex-colors-neutral-800)

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-primary)

    &:first-child
      margin-top: 0

  p
    margin-bottom: $altrex-spacing-3
    line-height: 1.6

  ul
    margin-left: $altrex-spacing-5
    margin-bottom: $altrex-spacing-3
    line-height: 1.8

.settings-group
  display: flex
  flex-direction: column
  gap: $altrex-spacing-3
  margin-bottom: $altrex-spacing-4

.form-group
  margin-bottom: $altrex-spacing-4

.props-table
  overflow-x: auto

  table
    width: 100%
    border-collapse: collapse
    font-size: $altrex-fontSize-sm

    th,
    td
      text-align: left
      padding: $altrex-spacing-3
      border-bottom: 1px solid var(--altrex-colors-neutral-200)

      [data-theme="dark"] &
        border-bottom-color: var(--altrex-colors-dark-border-subtle)

    th
      font-weight: $altrex-fontWeight-semibold
      color: var(--altrex-colors-neutral-900)
      background: var(--altrex-colors-neutral-50)

      [data-theme="dark"] &
        color: var(--altrex-colors-dark-text-primary)
        background: var(--altrex-colors-dark-bg-elevated)

    td
      color: var(--altrex-colors-neutral-700)

      [data-theme="dark"] &
        color: var(--altrex-colors-dark-text-secondary)

    code
      padding: 2px 6px
      background: var(--altrex-colors-neutral-100)
      border-radius: $altrex-borderRadius-sm
      font-family: 'Monaco', 'Courier New', monospace
      font-size: 0.9em

      [data-theme="dark"] &
        background: var(--altrex-colors-dark-bg-subtle)
        color: var(--altrex-colors-dark-text-primary)

.code-block
  background: var(--altrex-colors-neutral-50)
  border: 1px solid var(--altrex-colors-neutral-200)
  border-radius: $altrex-borderRadius-default
  padding: $altrex-spacing-4
  overflow-x: auto

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-subtle)
    border-color: var(--altrex-colors-dark-border-subtle)

  code
    font-family: 'Monaco', 'Courier New', monospace
    font-size: $altrex-fontSize-sm
    line-height: 1.6
    color: var(--altrex-colors-neutral-800)

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-primary)
</style>
