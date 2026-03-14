<template>
  <div class="accordion-demo">
    <h1>Altrex Accordion Component</h1>
    <p class="intro">
      A mobile-first accordion component for expandable content panels. Perfect for FAQs,
      settings groups, and content organization.
    </p>

    <!-- Basic Example -->
    <section class="demo-section">
      <h2>Basic Accordion</h2>
      <p class="description">
        Single mode: only one panel can be open at a time.
      </p>

      <div class="demo-group">
        <AltrexAccordion>
          <AltrexAccordionItem
            title="What is Altrex?"
            name="item1"
            v-model:open="basicOpen.item1"
          >
            <p>
              Altrex is a mobile-first Vue 3 design system with comprehensive
              dark mode support and WCAG AAA touch target compliance.
            </p>
          </AltrexAccordionItem>

          <AltrexAccordionItem
            title="How do I install Altrex?"
            name="item2"
            v-model:open="basicOpen.item2"
          >
            <p>Install Altrex using npm:</p>
            <code>npm install @altrex-ui/components @altrex-ui/styling</code>
          </AltrexAccordionItem>

          <AltrexAccordionItem
            title="Is it responsive?"
            name="item3"
            v-model:open="basicOpen.item3"
          >
            <p>
              Yes! All components are mobile-first and optimized for touch devices
              with 44x44px minimum touch targets.
            </p>
          </AltrexAccordionItem>

          <AltrexAccordionItem
            title="Does it support dark mode?"
            name="item4"
            v-model:open="basicOpen.item4"
          >
            <p>
              Absolutely. Altrex includes comprehensive dark mode support with
              WCAG AA/AAA compliant color tokens.
            </p>
          </AltrexAccordionItem>
        </AltrexAccordion>
      </div>
    </section>

    <!-- Multiple Mode -->
    <section class="demo-section">
      <h2>Multiple Mode</h2>
      <p class="description">
        Multiple panels can be open simultaneously.
      </p>

      <div class="demo-group">
        <AltrexAccordion>
          <AltrexAccordionItem
            title="Features"
            name="features"
            v-model:open="multipleOpen.features"
          >
            <ul>
              <li>Mobile-first responsive design</li>
              <li>Touch-optimized interactions</li>
              <li>Dark mode support</li>
              <li>Accessibility built-in</li>
            </ul>
          </AltrexAccordionItem>

          <AltrexAccordionItem
            title="Components"
            name="components"
            v-model:open="multipleOpen.components"
          >
            <p>
              Over 34 components including buttons, forms, navigation,
              modals, tables, and more.
            </p>
          </AltrexAccordionItem>

          <AltrexAccordionItem
            title="Design Tokens"
            name="tokens"
            v-model:open="multipleOpen.tokens"
          >
            <p>
              Comprehensive design token system with colors, spacing,
              typography, and more. Single source of truth in tokens.json.
            </p>
          </AltrexAccordionItem>
        </AltrexAccordion>
      </div>
    </section>

    <!-- Variants -->
    <section class="demo-section">
      <h2>Variants</h2>
      <p class="description">
        Visual style variants: default, bordered, and filled.
      </p>

      <div class="demo-group-vertical">
        <div class="demo-item">
          <h3>Default</h3>
          <AltrexAccordion variant="default">
            <AltrexAccordionItem title="Default variant" name="default1" v-model:open="variants.default1">
              <p>Clean and minimal with simple dividers.</p>
            </AltrexAccordionItem>
            <AltrexAccordionItem title="Another item" name="default2" v-model:open="variants.default2">
              <p>Content goes here.</p>
            </AltrexAccordionItem>
          </AltrexAccordion>
        </div>

        <div class="demo-item">
          <h3>Bordered</h3>
          <AltrexAccordion variant="bordered">
            <AltrexAccordionItem title="Bordered variant" name="bordered1" v-model:open="variants.bordered1">
              <p>Defined border around the entire accordion.</p>
            </AltrexAccordionItem>
            <AltrexAccordionItem title="Another item" name="bordered2" v-model:open="variants.bordered2">
              <p>Content goes here.</p>
            </AltrexAccordionItem>
          </AltrexAccordion>
        </div>

        <div class="demo-item">
          <h3>Filled</h3>
          <AltrexAccordion variant="filled">
            <AltrexAccordionItem title="Filled variant" name="filled1" v-model:open="variants.filled1">
              <p>Background color and subtle shadow for elevation.</p>
            </AltrexAccordionItem>
            <AltrexAccordionItem title="Another item" name="filled2" v-model:open="variants.filled2">
              <p>Content goes here.</p>
            </AltrexAccordionItem>
          </AltrexAccordion>
        </div>
      </div>
    </section>

    <!-- Custom Icons -->
    <section class="demo-section">
      <h2>Custom Icons</h2>
      <p class="description">
        Use any icon from the Altrex icon library.
      </p>

      <div class="demo-group">
        <AltrexAccordion>
          <AltrexAccordionItem
            title="Plus/Minus Icon"
            name="icon1"
            icon="generic-plus"
            v-model:open="customIcons.icon1"
          >
            <p>Using the plus icon instead of chevron.</p>
          </AltrexAccordionItem>

          <AltrexAccordionItem
            title="Arrow Icon"
            name="icon2"
            icon="generic-arrow-right"
            v-model:open="customIcons.icon2"
          >
            <p>Using an arrow icon.</p>
          </AltrexAccordionItem>

          <AltrexAccordionItem
            title="Custom Icon"
            name="icon3"
            icon="generic-chevron-right"
            v-model:open="customIcons.icon3"
          >
            <p>Using a right chevron icon.</p>
          </AltrexAccordionItem>
        </AltrexAccordion>
      </div>
    </section>

    <!-- Disabled State -->
    <section class="demo-section">
      <h2>Disabled State</h2>
      <p class="description">
        Individual items can be disabled.
      </p>

      <div class="demo-group">
        <AltrexAccordion>
          <AltrexAccordionItem
            title="Active Item"
            name="active"
            v-model:open="disabledDemo.active"
          >
            <p>This item can be toggled.</p>
          </AltrexAccordionItem>

          <AltrexAccordionItem
            title="Disabled Item"
            name="disabled"
            :open="false"
            :disabled="true"
          >
            <p>This content is not accessible.</p>
          </AltrexAccordionItem>

          <AltrexAccordionItem
            title="Another Active Item"
            name="active2"
            v-model:open="disabledDemo.active2"
          >
            <p>This item can also be toggled.</p>
          </AltrexAccordionItem>
        </AltrexAccordion>
      </div>
    </section>

    <!-- Rich Content -->
    <section class="demo-section">
      <h2>Rich Content</h2>
      <p class="description">
        Accordion items can contain any content including images, buttons, and forms.
      </p>

      <div class="demo-group">
        <AltrexAccordion>
          <AltrexAccordionItem
            title="Content with Button"
            name="rich1"
            v-model:open="richOpen.rich1"
          >
            <p>You can include interactive elements inside accordion items.</p>
            <AltrexButton label="Click Me" variant="primary" size="s" @click="handleButtonClick" />
          </AltrexAccordionItem>

          <AltrexAccordionItem
            title="Form Content"
            name="rich2"
            v-model:open="richOpen.rich2"
          >
            <div class="form-content">
              <AltrexInput
                v-model="formData.name"
                label="Name"
                placeholder="Enter your name"
              />
              <AltrexInput
                v-model="formData.email"
                label="Email"
                placeholder="Enter your email"
                type="email"
              />
            </div>
          </AltrexAccordionItem>

          <AltrexAccordionItem
            title="List Content"
            name="rich3"
            v-model:open="richOpen.rich3"
          >
            <h4>Popular Features:</h4>
            <ul class="feature-list">
              <li>
                <AltrexIcon icon="generic-check" size="s" class="check-icon" />
                Mobile-first design
              </li>
              <li>
                <AltrexIcon icon="generic-check" size="s" class="check-icon" />
                Dark mode support
              </li>
              <li>
                <AltrexIcon icon="generic-check" size="s" class="check-icon" />
                Touch-optimized
              </li>
              <li>
                <AltrexIcon icon="generic-check" size="s" class="check-icon" />
                Fully accessible
              </li>
            </ul>
          </AltrexAccordionItem>
        </AltrexAccordion>
      </div>
    </section>

    <!-- Custom Header Slot -->
    <section class="demo-section">
      <h2>Custom Header</h2>
      <p class="description">
        Use the header slot for custom header content.
      </p>

      <div class="demo-group">
        <AltrexAccordion>
          <AltrexAccordionItem name="custom1" v-model:open="customHeader.custom1">
            <template #header>
              <div class="custom-header">
                <AltrexBadge content="New" variant="primary" size="small" />
                <span>Custom Header with Badge</span>
              </div>
            </template>
            <p>This accordion item has a custom header with a badge.</p>
          </AltrexAccordionItem>

          <AltrexAccordionItem name="custom2" v-model:open="customHeader.custom2">
            <template #header>
              <div class="custom-header">
                <AltrexIcon icon="generic-star" size="s" class="header-icon" />
                <span>Header with Icon</span>
              </div>
            </template>
            <p>This header includes a custom icon.</p>
          </AltrexAccordionItem>
        </AltrexAccordion>
      </div>
    </section>

    <!-- Props & Events -->
    <section class="demo-section">
      <h2>Props & Events</h2>

      <div class="props-table">
        <h3>AltrexAccordion Props</h3>
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
              <td><code>variant</code></td>
              <td>String</td>
              <td>'default'</td>
              <td>'default', 'bordered', or 'filled' - visual style</td>
            </tr>
          </tbody>
        </table>

        <h3>AltrexAccordionItem Props</h3>
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
              <td><code>title</code></td>
              <td>String</td>
              <td>''</td>
              <td>Title text for the accordion item</td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td>String</td>
              <td>'generic-chevron-bottom'</td>
              <td>Icon to display (from Altrex icon library)</td>
            </tr>
            <tr>
              <td><code>open</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Whether the item is open (v-model support)</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Whether the item is disabled</td>
            </tr>
            <tr>
              <td><code>name</code></td>
              <td>String/Number</td>
              <td>null</td>
              <td>Unique identifier for the item</td>
            </tr>
          </tbody>
        </table>

        <h3>Events</h3>
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
              <td>Emitted when an accordion item is toggled (v-model support)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import AltrexAccordion from '@/components/Accordion/AltrexAccordion.vue'
import AltrexAccordionItem from '@/components/Accordion/AltrexAccordionItem.vue'
import AltrexButton from '@/components/Button/AltrexButton.vue'
import AltrexInput from '@/components/Input/AltrexInput.vue'
import AltrexBadge from '@/components/Badge/AltrexBadge.vue'
import AltrexIcon from '@/components/Icon/AltrexIcon.vue'

export default {
  name: 'AltrexAccordionView',
  components: {
    AltrexAccordion,
    AltrexAccordionItem,
    AltrexButton,
    AltrexInput,
    AltrexBadge,
    AltrexIcon
  },
  data() {
    return {
      basicOpen: {
        item1: true,
        item2: false,
        item3: false,
        item4: false
      },
      multipleOpen: {
        features: true,
        components: true,
        tokens: false
      },
      variants: {
        default1: true,
        default2: false,
        bordered1: true,
        bordered2: false,
        filled1: true,
        filled2: false
      },
      customIcons: {
        icon1: false,
        icon2: false,
        icon3: false
      },
      disabledDemo: {
        active: true,
        active2: false
      },
      richOpen: {
        rich1: false,
        rich2: false,
        rich3: false
      },
      customHeader: {
        custom1: false,
        custom2: false
      },
      formData: {
        name: '',
        email: ''
      }
    }
  },
  methods: {
    handleButtonClick() {
      alert('Button clicked inside accordion!')
    }
  }
}
</script>

<style lang="stylus" scoped>
.accordion-demo
  // Mobile-first padding
  padding: $altrex-spacing-4
  max-width: 1200px
  margin: 0 auto

  // Desktop: more spacious
  +above('md')
    padding: $altrex-spacing-8

h1
  font-size: $altrex-fluidTypography-h1
  color: $altrex-colors-neutral-900
  margin-bottom: $altrex-spacing-4

  [data-theme="dark"] &
    color: $altrex-colors-dark-text-primary

.intro
  font-size: $altrex-fontSize-lg
  color: $altrex-colors-neutral-700
  margin-bottom: $altrex-spacing-8
  line-height: 1.6

  [data-theme="dark"] &
    color: $altrex-colors-dark-text-secondary

.demo-section
  margin-bottom: $altrex-spacing-10

  h2
    font-size: $altrex-fluidTypography-h2
    color: $altrex-colors-neutral-900
    margin-bottom: $altrex-spacing-3

    [data-theme="dark"] &
      color: $altrex-colors-dark-text-primary

  h3
    font-size: $altrex-fluidTypography-h3
    color: $altrex-colors-neutral-800
    margin-bottom: $altrex-spacing-3
    margin-top: $altrex-spacing-6

    [data-theme="dark"] &
      color: $altrex-colors-dark-text-primary

  h4
    font-size: $altrex-fontSize-lg
    font-weight: $altrex-fontWeight-semibold
    color: $altrex-colors-neutral-800
    margin-bottom: $altrex-spacing-2

    [data-theme="dark"] &
      color: $altrex-colors-dark-text-primary

.description
  font-size: $altrex-fontSize-base
  color: $altrex-colors-neutral-600
  margin-bottom: $altrex-spacing-6
  line-height: 1.6

  [data-theme="dark"] &
    color: $altrex-colors-dark-text-secondary

.demo-group
  display: flex
  flex-direction: column
  gap: $altrex-spacing-6

.demo-group-vertical
  display: flex
  flex-direction: column
  gap: $altrex-spacing-8

.demo-item
  // Mobile: full width
  width: 100%

  // Desktop: constrained
  +above('md')
    max-width: 800px

// Custom header styles
.custom-header
  display: flex
  align-items: center
  gap: $altrex-spacing-3

.header-icon
  color: $altrex-colors-warning-500

  [data-theme="dark"] &
    color: $altrex-colors-dark-warning-default

// Form content
.form-content
  display: flex
  flex-direction: column
  gap: $altrex-spacing-4

// Feature list
.feature-list
  list-style: none
  padding: 0
  margin: $altrex-spacing-3 0 0

  li
    display: flex
    align-items: center
    gap: $altrex-spacing-2
    padding: $altrex-spacing-2 0
    color: $altrex-colors-neutral-700

    [data-theme="dark"] &
      color: $altrex-colors-dark-text-secondary

  .check-icon
    color: $altrex-colors-success-500
    flex-shrink: 0

    [data-theme="dark"] &
      color: $altrex-colors-dark-success-default

// Props table
.props-table
  margin-top: $altrex-spacing-6
  overflow-x: auto

  table
    width: 100%
    border-collapse: collapse
    margin-bottom: $altrex-spacing-6
    background: $altrex-colors-neutral-50
    border-radius: $altrex-borderRadius-lg
    overflow: hidden

    [data-theme="dark"] &
      background: $altrex-colors-dark-bg-elevated

    thead
      background: $altrex-colors-neutral-100

      [data-theme="dark"] &
        background: $altrex-colors-dark-bg-hover

      th
        padding: $altrex-spacing-3 $altrex-spacing-4
        text-align: left
        font-weight: $altrex-fontWeight-semibold
        color: $altrex-colors-neutral-900
        font-size: $altrex-fontSize-sm

        [data-theme="dark"] &
          color: $altrex-colors-dark-text-primary

    tbody
      td
        padding: $altrex-spacing-3 $altrex-spacing-4
        border-top: 1px solid $altrex-colors-neutral-200
        color: $altrex-colors-neutral-700
        font-size: $altrex-fontSize-sm

        [data-theme="dark"] &
          border-top-color: $altrex-colors-dark-border-default
          color: $altrex-colors-dark-text-secondary

        code
          background: $altrex-colors-neutral-100
          padding: 2px 6px
          border-radius: $altrex-borderRadius-sm
          font-family: monospace
          font-size: $altrex-fontSize-xs

          [data-theme="dark"] &
            background: $altrex-colors-dark-bg-active
            color: $altrex-colors-dark-primary-default
</style>
