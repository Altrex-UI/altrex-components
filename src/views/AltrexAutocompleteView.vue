<template>
  <div class="autocomplete-demo">
    <h1>Altrex Autocomplete</h1>
    <p class="subtitle">Search input with dropdown suggestions and multi-select support</p>

    <!-- Basic Usage -->
    <section class="demo-section">
      <h2>Basic Autocomplete</h2>
      <p class="description">
        Type to filter options. Supports keyboard navigation (↑↓ arrows, Enter, Escape).
      </p>

      <div class="demo-example">
        <AltrexAutocomplete
          v-model="basicValue"
          :options="countries"
          label="Select Country"
          placeholder="Type to search countries..."
        />
        <p class="demo-result">Selected: <strong>{{ basicValue || 'None' }}</strong></p>
      </div>
    </section>

    <!-- Multi-Select -->
    <section class="demo-section">
      <h2>Multi-Select Mode</h2>
      <p class="description">
        Select multiple options. Selected items appear as chips below the input.
      </p>

      <div class="demo-example">
        <AltrexAutocomplete
          v-model="multiSelectValue"
          :options="programmingLanguages"
          label="Select Programming Languages"
          placeholder="Type to search languages..."
          multiple
        />
        <p class="demo-result">Selected: <strong>{{ multiSelectValue.join(', ') || 'None' }}</strong></p>
      </div>
    </section>

    <!-- Async Mode -->
    <section class="demo-section">
      <h2>Async Search</h2>
      <p class="description">
        Search with debounced API calls. Type to trigger async search with 500ms debounce.
      </p>

      <div class="demo-example">
        <AltrexAutocomplete
          v-model="asyncValue"
          :options="asyncResults"
          :loading="asyncLoading"
          filter-mode="async"
          :debounce="500"
          label="Search Users"
          placeholder="Type to search users..."
          @search="handleAsyncSearch"
        />
        <p class="demo-result">Selected: <strong>{{ asyncValue || 'None' }}</strong></p>
      </div>
    </section>

    <!-- Custom Option Rendering -->
    <section class="demo-section">
      <h2>Custom Option Template</h2>
      <p class="description">
        Use the option slot to customize how options are displayed.
      </p>

      <div class="demo-example">
        <AltrexAutocomplete
          v-model="customValue"
          :options="usersWithAvatars"
          label="Select Team Member"
          placeholder="Search team members..."
        >
          <template #option="{ option }">
            <div class="custom-option">
              <div class="custom-option-avatar" :style="{ backgroundColor: option.color }">
                {{ option.initials }}
              </div>
              <div class="custom-option-info">
                <div class="custom-option-name">{{ option.label }}</div>
                <div class="custom-option-role">{{ option.role }}</div>
              </div>
            </div>
          </template>
        </AltrexAutocomplete>
        <p class="demo-result">Selected: <strong>{{ customValue || 'None' }}</strong></p>
      </div>
    </section>

    <!-- Size Variants -->
    <section class="demo-section">
      <h2>Sizes</h2>
      <p class="description">
        Three size variants: small, medium (default), and large.
      </p>

      <div class="demo-group">
        <div class="demo-item">
          <AltrexAutocomplete
            v-model="sizeSmall"
            :options="fruits"
            label="Small"
            size="s"
            placeholder="Search..."
          />
        </div>

        <div class="demo-item">
          <AltrexAutocomplete
            v-model="sizeMedium"
            :options="fruits"
            label="Medium (Default)"
            size="m"
            placeholder="Search..."
          />
        </div>

        <div class="demo-item">
          <AltrexAutocomplete
            v-model="sizeLarge"
            :options="fruits"
            label="Large"
            size="l"
            placeholder="Search..."
          />
        </div>
      </div>
    </section>

    <!-- Custom Filter Function -->
    <section class="demo-section">
      <h2>Custom Filter Function</h2>
      <p class="description">
        Provide a custom filter function for advanced filtering logic.
      </p>

      <div class="demo-example">
        <AltrexAutocomplete
          v-model="customFilterValue"
          :options="products"
          :filter-fn="customProductFilter"
          label="Search Products"
          placeholder="Search by name or category..."
        />
        <p class="demo-hint">Try searching "electronics" or "laptop"</p>
      </div>
    </section>

    <!-- States -->
    <section class="demo-section">
      <h2>States</h2>
      <p class="description">
        Disabled, readonly, and error states.
      </p>

      <div class="demo-group">
        <div class="demo-item">
          <AltrexAutocomplete
            v-model="stateDisabled"
            :options="countries"
            label="Disabled"
            placeholder="Cannot interact"
            disabled
          />
        </div>

        <div class="demo-item">
          <AltrexAutocomplete
            v-model="stateReadonly"
            :options="countries"
            label="Readonly"
            placeholder="Can focus, cannot change"
            readonly
          />
        </div>

        <div class="demo-item">
          <AltrexAutocomplete
            v-model="stateError"
            :options="countries"
            label="With Error"
            placeholder="Search..."
            error="Please select a valid option"
          />
        </div>
      </div>
    </section>

    <!-- Min Characters -->
    <section class="demo-section">
      <h2>Minimum Characters</h2>
      <p class="description">
        Require a minimum number of characters before showing suggestions.
      </p>

      <div class="demo-example">
        <AltrexAutocomplete
          v-model="minCharsValue"
          :options="countries"
          :min-chars="3"
          label="Search Countries"
          placeholder="Type at least 3 characters..."
        />
        <p class="demo-hint">Type at least 3 characters to see results</p>
      </div>
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
              <td><code>modelValue</code></td>
              <td>String, Array</td>
              <td><code>null</code></td>
              <td>v-model value</td>
            </tr>
            <tr>
              <td><code>options</code></td>
              <td>Array</td>
              <td><code>[]</code></td>
              <td>Options array (objects or primitives)</td>
            </tr>
            <tr>
              <td><code>multiple</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Enable multi-select mode</td>
            </tr>
            <tr>
              <td><code>filterMode</code></td>
              <td>String</td>
              <td><code>'client'</code></td>
              <td>'client' or 'async'</td>
            </tr>
            <tr>
              <td><code>filterFn</code></td>
              <td>Function</td>
              <td><code>null</code></td>
              <td>Custom filter function</td>
            </tr>
            <tr>
              <td><code>minChars</code></td>
              <td>Number</td>
              <td><code>1</code></td>
              <td>Min characters to trigger search</td>
            </tr>
            <tr>
              <td><code>debounce</code></td>
              <td>Number</td>
              <td><code>300</code></td>
              <td>Debounce delay in ms (async mode)</td>
            </tr>
            <tr>
              <td><code>loading</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Show loading spinner</td>
            </tr>
            <tr>
              <td><code>label</code></td>
              <td>String</td>
              <td><code>''</code></td>
              <td>Input label</td>
            </tr>
            <tr>
              <td><code>placeholder</code></td>
              <td>String</td>
              <td><code>'Type to search...'</code></td>
              <td>Input placeholder</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>String</td>
              <td><code>'m'</code></td>
              <td>Size: 's', 'm', 'l'</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Disabled state</td>
            </tr>
            <tr>
              <td><code>readonly</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Readonly state</td>
            </tr>
            <tr>
              <td><code>error</code></td>
              <td>String</td>
              <td><code>''</code></td>
              <td>Error message</td>
            </tr>
            <tr>
              <td><code>clearable</code></td>
              <td>Boolean</td>
              <td><code>true</code></td>
              <td>Show clear button</td>
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
              <td><code>@update:modelValue</code></td>
              <td>String or Array</td>
              <td>Emitted when value changes</td>
            </tr>
            <tr>
              <td><code>@select</code></td>
              <td>Option</td>
              <td>Emitted when option is selected</td>
            </tr>
            <tr>
              <td><code>@remove</code></td>
              <td>Option</td>
              <td>Emitted when option is removed (multi-select)</td>
            </tr>
            <tr>
              <td><code>@search</code></td>
              <td>String</td>
              <td>Emitted on search query change (async mode)</td>
            </tr>
            <tr>
              <td><code>@focus</code></td>
              <td>Event</td>
              <td>Emitted when input gains focus</td>
            </tr>
            <tr>
              <td><code>@blur</code></td>
              <td>Event</td>
              <td>Emitted when input loses focus</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Usage Example -->
    <section class="demo-section">
      <h2>Usage Example</h2>
      <pre class="code-block"><code>&lt;template&gt;
  &lt;AltrexAutocomplete
    v-model="selectedCountry"
    :options="countries"
    label="Select Country"
    placeholder="Type to search..."
    @select="handleSelect"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
import AltrexAutocomplete from '@/components/Autocomplete/AltrexAutocomplete.vue'

const selectedCountry = ref(null)
const countries = ['USA', 'Canada', 'Mexico', 'Brazil', 'Argentina']

const handleSelect = (option) => {
  console.log('Selected:', option)
}
&lt;/script&gt;</code></pre>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue'
import AltrexAutocomplete from '@/components/Autocomplete/AltrexAutocomplete.vue'

export default {
  name: 'AltrexAutocompleteView',
  components: {
    AltrexAutocomplete
  },
  setup() {
    // Basic
    const basicValue = ref(null)
    const countries = [
      'United States', 'Canada', 'Mexico', 'Brazil', 'Argentina',
      'United Kingdom', 'France', 'Germany', 'Spain', 'Italy',
      'China', 'Japan', 'South Korea', 'India', 'Australia'
    ]

    // Multi-select
    const multiSelectValue = ref([])
    const programmingLanguages = [
      'JavaScript', 'TypeScript', 'Python', 'Java', 'C#',
      'C++', 'Go', 'Rust', 'Swift', 'Kotlin',
      'Ruby', 'PHP', 'Dart', 'R', 'Scala'
    ]

    // Async
    const asyncValue = ref(null)
    const asyncResults = ref([])
    const asyncLoading = ref(false)

    const allUsers = [
      'Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince',
      'Edward Norton', 'Fiona Apple', 'George Martin', 'Helen Troy',
      'Ian McKellen', 'Julia Roberts', 'Kevin Hart', 'Laura Dern'
    ]

    const handleAsyncSearch = (query) => {
      if (!query || query.length < 1) {
        asyncResults.value = []
        return
      }

      asyncLoading.value = true

      // Simulate API call
      setTimeout(() => {
        asyncResults.value = allUsers.filter(user =>
          user.toLowerCase().includes(query.toLowerCase())
        )
        asyncLoading.value = false
      }, 800)
    }

    // Custom rendering
    const customValue = ref(null)
    const usersWithAvatars = [
      { value: '1', label: 'Alice Johnson', role: 'Product Manager', initials: 'AJ', color: '#3498db' },
      { value: '2', label: 'Bob Smith', role: 'Senior Developer', initials: 'BS', color: '#e74c3c' },
      { value: '3', label: 'Charlie Brown', role: 'UX Designer', initials: 'CB', color: '#2ecc71' },
      { value: '4', label: 'Diana Prince', role: 'QA Engineer', initials: 'DP', color: '#f39c12' },
      { value: '5', label: 'Edward Norton', role: 'DevOps Lead', initials: 'EN', color: '#9b59b6' }
    ]

    // Sizes
    const sizeSmall = ref(null)
    const sizeMedium = ref(null)
    const sizeLarge = ref(null)
    const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']

    // Custom filter
    const customFilterValue = ref(null)
    const products = [
      { value: '1', label: 'MacBook Pro', category: 'Electronics', price: 2399 },
      { value: '2', label: 'iPhone 15', category: 'Electronics', price: 999 },
      { value: '3', label: 'AirPods Pro', category: 'Electronics', price: 249 },
      { value: '4', label: 'Office Chair', category: 'Furniture', price: 299 },
      { value: '5', label: 'Standing Desk', category: 'Furniture', price: 599 },
      { value: '6', label: 'Monitor', category: 'Electronics', price: 399 }
    ]

    const customProductFilter = (option, query) => {
      const lowerQuery = query.toLowerCase()
      return (
        option.label.toLowerCase().includes(lowerQuery) ||
        option.category.toLowerCase().includes(lowerQuery)
      )
    }

    // States
    const stateDisabled = ref(null)
    const stateReadonly = ref('USA')
    const stateError = ref(null)

    // Min chars
    const minCharsValue = ref(null)

    return {
      basicValue,
      countries,
      multiSelectValue,
      programmingLanguages,
      asyncValue,
      asyncResults,
      asyncLoading,
      handleAsyncSearch,
      customValue,
      usersWithAvatars,
      sizeSmall,
      sizeMedium,
      sizeLarge,
      fruits,
      customFilterValue,
      products,
      customProductFilter,
      stateDisabled,
      stateReadonly,
      stateError,
      minCharsValue
    }
  }
}
</script>

<style lang="stylus" scoped>
.autocomplete-demo
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

.demo-example
  max-width: 500px

.demo-result,
.demo-hint
  margin-top: $altrex-spacing-3
  font-size: $altrex-fontSize-sm
  color: var(--altrex-colors-neutral-600)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-secondary)

.demo-group
  display: grid
  gap: $altrex-spacing-4

  // Mobile: 1 column
  grid-template-columns: 1fr

  // Desktop: 3 columns
  +above('md')
    grid-template-columns: repeat(3, 1fr)

.demo-item
  display: flex
  flex-direction: column

// Custom option styling
.custom-option
  display: flex
  align-items: center
  gap: $altrex-spacing-3
  width: 100%

.custom-option-avatar
  width: 36px
  height: 36px
  border-radius: 50%
  display: flex
  align-items: center
  justify-content: center
  color: white
  font-weight: $altrex-fontWeight-semibold
  font-size: $altrex-fontSize-sm
  flex-shrink: 0

.custom-option-info
  flex: 1
  min-width: 0

.custom-option-name
  font-weight: $altrex-fontWeight-medium
  color: var(--altrex-colors-neutral-900)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-primary)

.custom-option-role
  font-size: $altrex-fontSize-xs
  color: var(--altrex-colors-neutral-500)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-tertiary)

// Props table
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
