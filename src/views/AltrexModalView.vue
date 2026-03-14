<template>
  <div class="demo-view">
    <h1>AltrexModal</h1>
    <p class="subtitle">Overlay dialog component with customizable sizes, header/footer slots, and accessibility</p>

    <section class="demo-section">
      <h2>Sizes</h2>
      <p class="demo-description">Modals come in five size variants: small (s), medium (m), large (l), extra-large (xl), and full</p>
      <div class="demo-grid">
        <AltrexButton @click="modals.small = true">
          Small Modal
        </AltrexButton>
        <AltrexButton @click="modals.medium = true">
          Medium Modal (Default)
        </AltrexButton>
        <AltrexButton @click="modals.large = true">
          Large Modal
        </AltrexButton>
        <AltrexButton @click="modals.xl = true">
          Extra Large Modal
        </AltrexButton>
        <AltrexButton @click="modals.full = true">
          Full-Screen Modal
        </AltrexButton>
      </div>
    </section>

    <section class="demo-section">
      <h2>Basic Usage</h2>
      <p class="demo-description">Simple modal with title and content</p>
      <div class="demo-grid">
        <AltrexButton @click="modals.basic = true">
          Open Basic Modal
        </AltrexButton>
      </div>
    </section>

    <section class="demo-section">
      <h2>Custom Header & Footer</h2>
      <p class="demo-description">Use header and footer slots for custom content</p>
      <div class="demo-grid">
        <AltrexButton @click="modals.customHeaderFooter = true">
          Open Modal with Custom Slots
        </AltrexButton>
      </div>
    </section>

    <section class="demo-section">
      <h2>Persistent Modal</h2>
      <p class="demo-description">Persistent modals cannot be closed by clicking overlay or pressing ESC</p>
      <div class="demo-grid">
        <AltrexButton @click="modals.persistent = true">
          Open Persistent Modal
        </AltrexButton>
      </div>
    </section>

    <section class="demo-section">
      <h2>Without Close Button</h2>
      <p class="demo-description">Hide the default close button using show-close prop</p>
      <div class="demo-grid">
        <AltrexButton @click="modals.noClose = true">
          Open Modal Without Close Button
        </AltrexButton>
      </div>
    </section>

    <section class="demo-section">
      <h2>No Padding</h2>
      <p class="demo-description">Remove body padding for custom layouts</p>
      <div class="demo-grid">
        <AltrexButton @click="modals.noPadding = true">
          Open Modal Without Padding
        </AltrexButton>
      </div>
    </section>

    <section class="demo-section">
      <h2>Form Example</h2>
      <p class="demo-description">Modal with form elements</p>
      <div class="demo-grid">
        <AltrexButton @click="modals.form = true">
          Open Form Modal
        </AltrexButton>
      </div>
    </section>

    <section class="demo-section">
      <h2>Confirmation Dialog</h2>
      <p class="demo-description">Common pattern for confirmation dialogs</p>
      <div class="demo-grid">
        <AltrexButton @click="modals.confirm = true" variant="danger">
          Delete Item
        </AltrexButton>
      </div>
      <p v-if="confirmResult" class="demo-value">Result: {{ confirmResult }}</p>
    </section>

    <!-- Modal Instances -->

    <!-- Sizes -->
    <AltrexModal v-model="modals.small" size="s" title="Small Modal">
      <p>This is a small modal with a maximum width of 400px.</p>
    </AltrexModal>

    <AltrexModal v-model="modals.medium" size="m" title="Medium Modal">
      <p>This is a medium modal (default) with a maximum width of 600px.</p>
      <p>Perfect for most use cases requiring moderate content space.</p>
    </AltrexModal>

    <AltrexModal v-model="modals.large" size="l" title="Large Modal">
      <p>This is a large modal with a maximum width of 800px.</p>
      <p>Great for displaying more detailed information or larger forms.</p>
      <p>Additional content can be added here to demonstrate scrolling behavior.</p>
    </AltrexModal>

    <AltrexModal v-model="modals.xl" size="xl" title="Extra Large Modal">
      <p>This is an extra-large modal with a maximum width of 1000px.</p>
      <p>Ideal for complex interfaces or data-heavy displays.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </AltrexModal>

    <AltrexModal v-model="modals.full" size="full" title="Full-Screen Modal">
      <p>This is a full-screen modal that takes up 95% of the viewport.</p>
      <p>Perfect for immersive experiences or detailed workflows.</p>
      <p>Use this when you need maximum screen real estate.</p>
    </AltrexModal>

    <!-- Basic -->
    <AltrexModal v-model="modals.basic" title="Welcome to Altrex Modal">
      <p>This is a basic modal with a title and body content.</p>
      <p>You can close it by:</p>
      <ul>
        <li>Clicking the X button</li>
        <li>Clicking outside the modal</li>
        <li>Pressing the ESC key</li>
      </ul>
    </AltrexModal>

    <!-- Custom Header & Footer -->
    <AltrexModal v-model="modals.customHeaderFooter" size="l">
      <template #header>
        <div style="display: flex; align-items: center; gap: 12px;">
          <AltrexIcon icon="generic-star" size="l" style="color: var(--altrex-colors-warning-500);" />
          <div>
            <h2 class="custom-modal-title">Custom Header with Icon</h2>
            <p class="custom-modal-subtitle">Subtitle text goes here</p>
          </div>
        </div>
      </template>

      <p>The header and footer are customized using slots.</p>
      <p>This gives you complete control over the layout and content of these sections.</p>
      <p>You can add any Vue components, icons, badges, or custom HTML.</p>

      <template #footer>
        <AltrexButton variant="ghost" @click="modals.customHeaderFooter = false">
          Cancel
        </AltrexButton>
        <AltrexButton variant="fill" @click="modals.customHeaderFooter = false">
          Save Changes
        </AltrexButton>
      </template>
    </AltrexModal>

    <!-- Persistent -->
    <AltrexModal v-model="modals.persistent" title="Persistent Modal" persistent>
      <p>This is a persistent modal.</p>
      <p>You cannot close it by clicking outside or pressing ESC.</p>
      <p>You must use the close button or an explicit action.</p>

      <template #footer>
        <AltrexButton @click="modals.persistent = false">
          Close
        </AltrexButton>
      </template>
    </AltrexModal>

    <!-- No Close Button -->
    <AltrexModal v-model="modals.noClose" title="No Close Button" :show-close="false">
      <p>This modal has no close button in the top-right corner.</p>
      <p>You can still close it by clicking outside or pressing ESC, or by using a custom action.</p>

      <template #footer>
        <AltrexButton @click="modals.noClose = false">
          Dismiss
        </AltrexButton>
      </template>
    </AltrexModal>

    <!-- No Padding -->
    <AltrexModal v-model="modals.noPadding" title="Custom Layout" no-padding>
      <div style="padding: 0;">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop"
          alt="Gym equipment"
          style="width: 100%; height: 300px; object-fit: cover; display: block;"
        />
        <div style="padding: 24px;">
          <p>This modal has no padding on the body.</p>
          <p>Perfect for custom layouts with full-bleed images or custom content.</p>
        </div>
      </div>
    </AltrexModal>

    <!-- Form Example -->
    <AltrexModal v-model="modals.form" title="Create New Exercise" size="l">
      <div class="form-group">
        <AltrexInput
          v-model="formData.exerciseName"
          label="Exercise Name"
          placeholder="e.g., Bench Press"
        />
      </div>

      <div class="form-group">
        <AltrexSelect
          v-model="formData.category"
          label="Category"
          :options="['Strength', 'Cardio', 'Flexibility', 'Balance']"
          placeholder="Select category"
        />
      </div>

      <div class="form-group">
        <AltrexTextarea
          v-model="formData.description"
          label="Description"
          placeholder="Describe how to perform this exercise..."
          :rows="4"
        />
      </div>

      <div class="form-group">
        <AltrexCheckbox v-model="formData.requiresEquipment">
          Requires Equipment
        </AltrexCheckbox>
      </div>

      <template #footer>
        <AltrexButton variant="ghost" @click="modals.form = false">
          Cancel
        </AltrexButton>
        <AltrexButton variant="fill" @click="handleFormSubmit">
          Create Exercise
        </AltrexButton>
      </template>
    </AltrexModal>

    <!-- Confirmation -->
    <AltrexModal v-model="modals.confirm" title="Confirm Delete" size="s">
      <p>Are you sure you want to delete this item?</p>
      <p style="color: var(--altrex-colors-danger-600);">This action cannot be undone.</p>

      <template #footer>
        <AltrexButton variant="ghost" @click="handleConfirm(false)">
          Cancel
        </AltrexButton>
        <AltrexButton variant="fill-danger" @click="handleConfirm(true)">
          Delete
        </AltrexButton>
      </template>
    </AltrexModal>

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
              <td><code>modelValue</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Controls modal visibility (v-model)</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td>String</td>
              <td><code>''</code></td>
              <td>Modal title (shown in header)</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>String</td>
              <td><code>'m'</code></td>
              <td>Modal size: 's', 'm', 'l', 'xl', 'full'</td>
            </tr>
            <tr>
              <td><code>persistent</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Prevent closing on overlay click or ESC</td>
            </tr>
            <tr>
              <td><code>showClose</code></td>
              <td>Boolean</td>
              <td><code>true</code></td>
              <td>Show/hide the close button</td>
            </tr>
            <tr>
              <td><code>noPadding</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Remove body padding for custom layouts</td>
            </tr>
            <tr>
              <td><code>ariaLabelledby</code></td>
              <td>String</td>
              <td><code>'modal-title'</code></td>
              <td>ARIA label reference for accessibility</td>
            </tr>
            <tr>
              <td><code>ariaDescribedby</code></td>
              <td>String</td>
              <td><code>'modal-body'</code></td>
              <td>ARIA description reference</td>
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
              <td>Emitted when modal opens/closes</td>
            </tr>
            <tr>
              <td><code>open</code></td>
              <td>None</td>
              <td>Emitted when modal opens</td>
            </tr>
            <tr>
              <td><code>close</code></td>
              <td>None</td>
              <td>Emitted when modal closes</td>
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
              <td>Modal body content</td>
            </tr>
            <tr>
              <td><code>header</code></td>
              <td>Custom header content (replaces title)</td>
            </tr>
            <tr>
              <td><code>footer</code></td>
              <td>Footer content (typically for action buttons)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import AltrexModal from '../components/Modal/AltrexModal.vue'
import AltrexButton from '../components/Button/AltrexButton.vue'
import AltrexIcon from '../components/Icon/AltrexIcon.vue'
import AltrexInput from '../components/Input/AltrexInput.vue'
import AltrexSelect from '../components/Select/AltrexSelect.vue'
import AltrexTextarea from '../components/Textarea/AltrexTextarea.vue'
import AltrexCheckbox from '../components/Checkbox/AltrexCheckbox.vue'

export default {
  name: 'AltrexModalView',
  components: {
    AltrexModal,
    AltrexButton,
    AltrexIcon,
    AltrexInput,
    AltrexSelect,
    AltrexTextarea,
    AltrexCheckbox
  },
  data() {
    return {
      modals: {
        small: false,
        medium: false,
        large: false,
        xl: false,
        full: false,
        basic: false,
        customHeaderFooter: false,
        persistent: false,
        noClose: false,
        noPadding: false,
        form: false,
        confirm: false
      },
      formData: {
        exerciseName: '',
        category: '',
        description: '',
        requiresEquipment: false
      },
      confirmResult: ''
    }
  },
  methods: {
    handleFormSubmit() {
      console.log('Form submitted:', this.formData)
      this.modals.form = false
      // Reset form
      this.formData = {
        exerciseName: '',
        category: '',
        description: '',
        requiresEquipment: false
      }
    },
    handleConfirm(confirmed) {
      this.confirmResult = confirmed ? 'Item deleted' : 'Cancelled'
      this.modals.confirm = false
      // Clear result after 3 seconds
      setTimeout(() => {
        this.confirmResult = ''
      }, 3000)
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
  margin-bottom: $altrex-spacing-4

  [data-theme="dark"] &
    color: var(--altrex-colors-neutral-400)

.demo-grid
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))
  gap: $altrex-spacing-4

.demo-value
  margin-top: $altrex-spacing-4
  padding: $altrex-spacing-3
  background: var(--altrex-colors-neutral-100)
  border-radius: $altrex-borderRadius-default
  font-family: monospace
  font-size: $altrex-fontSize-sm
  color: var(--altrex-colors-neutral-700)

  [data-theme="dark"] &
    background: var(--altrex-colors-neutral-800)
    color: var(--altrex-colors-neutral-300)

.custom-modal-title
  margin: 0
  font-size: $altrex-fontSize-xl
  font-weight: $altrex-fontWeight-semibold
  color: var(--altrex-colors-neutral-900)

  [data-theme="dark"] &
    color: var(--altrex-colors-neutral-100)

.custom-modal-subtitle
  margin: $altrex-spacing-1 0 0 0
  font-size: $altrex-fontSize-sm
  color: var(--altrex-colors-neutral-600)

  [data-theme="dark"] &
    color: var(--altrex-colors-neutral-400)

.form-group
  margin-bottom: $altrex-spacing-4

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
