<template>
  <div class="demo-view">
    <h1>AltrexPagination</h1>
    <p class="subtitle">Navigate through pages with mobile-first design and smart page number display</p>

    <!-- Mobile Notice -->
    <div class="mobile-notice">
      <AltrexIcon icon="generic-info-circle" />
      <div>
        <strong>Mobile Behavior:</strong> On mobile, fewer page numbers are shown (3 buttons) for better touch interaction.
        Desktop displays more page numbers (7 buttons) for easier navigation.
      </div>
    </div>

    <!-- Basic Usage -->
    <section class="demo-section">
      <h2>Basic Usage</h2>
      <p class="demo-description">Simple pagination with page numbers</p>
      <div class="demo-container">
        <AltrexPagination
          v-model="basicPage"
          :total="100"
          :per-page="10"
        />
        <p class="demo-output">Current Page: <code>{{ basicPage }}</code></p>
      </div>
    </section>

    <!-- With Total Display -->
    <section class="demo-section">
      <h2>With Total Items</h2>
      <p class="demo-description">Show the range of items being displayed</p>
      <div class="demo-container">
        <AltrexPagination
          v-model="totalPage"
          :total="247"
          :per-page="20"
          show-total
        />
        <p class="demo-output">Showing items {{ (totalPage - 1) * 20 + 1 }} - {{ Math.min(totalPage * 20, 247) }} of 247</p>
      </div>
    </section>

    <!-- With First/Last Buttons -->
    <section class="demo-section">
      <h2>First & Last Buttons</h2>
      <p class="demo-description">Quick navigation to first and last pages</p>
      <div class="demo-container">
        <AltrexPagination
          v-model="firstLastPage"
          :total="500"
          :per-page="10"
          show-first-last
        />
      </div>
    </section>

    <!-- With Jump to Page -->
    <section class="demo-section">
      <h2>Jump to Page</h2>
      <p class="demo-description">Allow users to jump directly to a specific page</p>
      <div class="demo-container">
        <AltrexPagination
          v-model="jumperPage"
          :total="1000"
          :per-page="25"
          show-jumper
          show-total
        />
      </div>
    </section>

    <!-- All Features Combined -->
    <section class="demo-section">
      <h2>All Features</h2>
      <p class="demo-description">Pagination with all features enabled</p>
      <div class="demo-container">
        <AltrexPagination
          v-model="fullPage"
          :total="5000"
          :per-page="50"
          show-total
          show-first-last
          show-jumper
        />
      </div>
    </section>

    <!-- Different Item Counts -->
    <section class="demo-section">
      <h2>Different Item Counts</h2>
      <p class="demo-description">Pagination adapts to different data sizes</p>
      <div class="demo-grid">
        <div class="demo-item">
          <h3 class="demo-label">Few Pages (3)</h3>
          <AltrexPagination
            v-model="fewPages"
            :total="30"
            :per-page="10"
          />
        </div>
        <div class="demo-item">
          <h3 class="demo-label">Many Pages (50)</h3>
          <AltrexPagination
            v-model="manyPages"
            :total="500"
            :per-page="10"
          />
        </div>
        <div class="demo-item">
          <h3 class="demo-label">Single Page</h3>
          <AltrexPagination
            v-model="singlePage"
            :total="8"
            :per-page="10"
          />
        </div>
        <div class="demo-item">
          <h3 class="demo-label">Empty Results</h3>
          <AltrexPagination
            v-model="emptyPage"
            :total="0"
            :per-page="10"
          />
        </div>
      </div>
    </section>

    <!-- Size Variants -->
    <section class="demo-section">
      <h2>Size Variants</h2>
      <p class="demo-description">Different sizes for various contexts</p>
      <div class="demo-grid">
        <div class="demo-item">
          <h3 class="demo-label">Small</h3>
          <AltrexPagination
            v-model="sizeSmall"
            :total="100"
            :per-page="10"
            size="s"
          />
        </div>
        <div class="demo-item">
          <h3 class="demo-label">Medium (Default)</h3>
          <AltrexPagination
            v-model="sizeMedium"
            :total="100"
            :per-page="10"
            size="m"
          />
        </div>
        <div class="demo-item">
          <h3 class="demo-label">Large</h3>
          <AltrexPagination
            v-model="sizeLarge"
            :total="100"
            :per-page="10"
            size="l"
          />
        </div>
      </div>
    </section>

    <!-- Max Buttons Control -->
    <section class="demo-section">
      <h2>Max Buttons Control</h2>
      <p class="demo-description">Control how many page buttons are visible (auto-detects mobile/desktop by default)</p>
      <div class="demo-grid">
        <div class="demo-item">
          <h3 class="demo-label">Minimal (3 buttons)</h3>
          <AltrexPagination
            v-model="maxButtons3"
            :total="200"
            :per-page="10"
            :max-buttons="3"
          />
        </div>
        <div class="demo-item">
          <h3 class="demo-label">Standard (5 buttons)</h3>
          <AltrexPagination
            v-model="maxButtons5"
            :total="200"
            :per-page="10"
            :max-buttons="5"
          />
        </div>
        <div class="demo-item">
          <h3 class="demo-label">Extended (7 buttons)</h3>
          <AltrexPagination
            v-model="maxButtons7"
            :total="200"
            :per-page="10"
            :max-buttons="7"
          />
        </div>
        <div class="demo-item">
          <h3 class="demo-label">Maximum (9 buttons)</h3>
          <AltrexPagination
            v-model="maxButtons9"
            :total="200"
            :per-page="10"
            :max-buttons="9"
          />
        </div>
      </div>
    </section>

    <!-- Practical Example: Data Table -->
    <section class="demo-section">
      <h2>Practical Example: Data Table</h2>
      <p class="demo-description">Pagination with a simulated data table</p>
      <div class="data-table-container">
        <!-- Table -->
        <div class="data-table">
          <div class="data-table__header">
            <div class="data-table__cell">ID</div>
            <div class="data-table__cell">Name</div>
            <div class="data-table__cell">Email</div>
            <div class="data-table__cell">Status</div>
          </div>
          <div
            v-for="item in currentPageData"
            :key="item.id"
            class="data-table__row"
          >
            <div class="data-table__cell">{{ item.id }}</div>
            <div class="data-table__cell">{{ item.name }}</div>
            <div class="data-table__cell">{{ item.email }}</div>
            <div class="data-table__cell">
              <span class="status-badge" :class="`status-badge--${item.status}`">
                {{ item.status }}
              </span>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="pagination-wrapper">
          <AltrexPagination
            v-model="tablePage"
            :total="tableData.length"
            :per-page="itemsPerPage"
            show-total
            show-first-last
            @change="handlePageChange"
          />
        </div>

        <!-- Items per page selector -->
        <div class="items-per-page">
          <label for="items-per-page">Items per page:</label>
          <select id="items-per-page" v-model.number="itemsPerPage" class="items-per-page-select">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Events Demo -->
    <section class="demo-section">
      <h2>Events</h2>
      <p class="demo-description">Listen to page change events</p>
      <div class="demo-container">
        <AltrexPagination
          v-model="eventsPage"
          :total="150"
          :per-page="15"
          @change="handleEventChange"
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

    <!-- Accessibility -->
    <section class="demo-section">
      <h2>Accessibility</h2>
      <p class="demo-description">Full keyboard support and ARIA attributes</p>
      <div class="demo-container">
        <div class="accessibility-info">
          <h3>Keyboard Navigation:</h3>
          <ul>
            <li><kbd>Tab</kbd> - Navigate between buttons</li>
            <li><kbd>Enter</kbd> or <kbd>Space</kbd> - Activate button</li>
            <li><kbd>Arrow Keys</kbd> - Navigate in jump input</li>
          </ul>
          <h3>Screen Reader Support:</h3>
          <ul>
            <li>Proper <code>role="navigation"</code> landmark</li>
            <li><code>aria-label</code> on all buttons</li>
            <li><code>aria-current="page"</code> on active page</li>
            <li>Disabled states properly announced</li>
          </ul>
        </div>
        <AltrexPagination
          v-model="a11yPage"
          :total="200"
          :per-page="20"
          show-total
          show-jumper
        />
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
              <td><code>modelValue</code></td>
              <td>Number</td>
              <td><code>1</code></td>
              <td>Current page number (use with v-model)</td>
            </tr>
            <tr>
              <td><code>total</code></td>
              <td>Number</td>
              <td>—</td>
              <td>Total number of items (required)</td>
            </tr>
            <tr>
              <td><code>perPage</code></td>
              <td>Number</td>
              <td><code>10</code></td>
              <td>Items per page</td>
            </tr>
            <tr>
              <td><code>showFirstLast</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Show first/last page buttons</td>
            </tr>
            <tr>
              <td><code>showJumper</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Show "jump to page" input</td>
            </tr>
            <tr>
              <td><code>showTotal</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Show total items text</td>
            </tr>
            <tr>
              <td><code>maxButtons</code></td>
              <td>Number</td>
              <td><code>null</code></td>
              <td>Max page buttons (auto: 3 mobile, 7 desktop)</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>String</td>
              <td><code>'m'</code></td>
              <td>Size variant: 's', 'm', 'l'</td>
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
              <td><code>update:modelValue</code></td>
              <td>Number</td>
              <td>Emitted when page changes (for v-model)</td>
            </tr>
            <tr>
              <td><code>change</code></td>
              <td><code>{ page, perPage }</code></td>
              <td>Emitted when page changes with details</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import AltrexPagination from '../components/Pagination/AltrexPagination.vue'
import AltrexIcon from '../components/Icon/AltrexIcon.vue'

export default {
  name: 'AltrexPaginationView',
  components: {
    AltrexPagination,
    AltrexIcon
  },
  data() {
    return {
      // Basic examples
      basicPage: 1,
      totalPage: 3,
      firstLastPage: 5,
      jumperPage: 10,
      fullPage: 25,

      // Different counts
      fewPages: 2,
      manyPages: 15,
      singlePage: 1,
      emptyPage: 1,

      // Sizes
      sizeSmall: 3,
      sizeMedium: 3,
      sizeLarge: 3,

      // Max buttons
      maxButtons3: 10,
      maxButtons5: 10,
      maxButtons7: 10,
      maxButtons9: 10,

      // Data table
      tablePage: 1,
      itemsPerPage: 10,
      tableData: this.generateTableData(100),

      // Events
      eventsPage: 1,
      eventLog: [],

      // Accessibility
      a11yPage: 1
    }
  },
  computed: {
    currentPageData() {
      const start = (this.tablePage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.tableData.slice(start, end)
    }
  },
  watch: {
    itemsPerPage() {
      // Reset to page 1 when items per page changes
      this.tablePage = 1
    }
  },
  methods: {
    generateTableData(count) {
      const statuses = ['active', 'inactive', 'pending']
      const firstNames = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Eve', 'Frank']
      const lastNames = ['Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Moore', 'Taylor', 'Anderson']

      return Array.from({ length: count }, (_, i) => {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
        return {
          id: i + 1,
          name: `${firstName} ${lastName}`,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
          status: statuses[Math.floor(Math.random() * statuses.length)]
        }
      })
    },
    handlePageChange(data) {
      console.log('Page changed:', data)
    },
    handleEventChange(data) {
      const timestamp = new Date().toLocaleTimeString()
      this.eventLog.unshift(`[${timestamp}] Changed to page ${data.page} (${data.perPage} items per page)`)
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

// Data table
.data-table-container
  background: var(--altrex-colors-neutral-50)
  border: 1px solid var(--altrex-colors-neutral-200)
  border-radius: $altrex-borderRadius-lg
  padding: $altrex-spacing-6

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-elevated)
    border-color: var(--altrex-colors-dark-border-default)

.data-table
  overflow-x: auto
  margin-bottom: $altrex-spacing-6

  &__header
    display: grid
    grid-template-columns: 60px 1fr 1.5fr 100px
    gap: $altrex-spacing-3
    padding: $altrex-spacing-3 $altrex-spacing-4
    background: var(--altrex-colors-neutral-100)
    border-radius: $altrex-borderRadius-default $altrex-borderRadius-default 0 0
    font-weight: $altrex-fontWeight-semibold
    font-size: $altrex-fontSize-sm

    [data-theme="dark"] &
      background: var(--altrex-colors-dark-bg-subtle)

  &__row
    display: grid
    grid-template-columns: 60px 1fr 1.5fr 100px
    gap: $altrex-spacing-3
    padding: $altrex-spacing-3 $altrex-spacing-4
    border-bottom: 1px solid var(--altrex-colors-neutral-200)

    [data-theme="dark"] &
      border-color: var(--altrex-colors-dark-border-subtle)

    &:last-child
      border-bottom: none

    &:hover
      background: var(--altrex-colors-neutral-100)

      [data-theme="dark"] &
        background: var(--altrex-colors-dark-bg-subtle)

  &__cell
    display: flex
    align-items: center
    font-size: $altrex-fontSize-sm
    color: var(--altrex-colors-neutral-700)

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-secondary)

.status-badge
  padding: 2px 8px
  border-radius: $altrex-borderRadius-full
  font-size: $altrex-fontSize-xs
  font-weight: $altrex-fontWeight-medium

  &--active
    background: $altrex-colors-success-100
    color: $altrex-colors-success-700

  &--inactive
    background: $altrex-colors-neutral-100
    color: $altrex-colors-neutral-700

    [data-theme="dark"] &
      background: var(--altrex-colors-dark-bg-subtle)
      color: var(--altrex-colors-dark-text-secondary)

  &--pending
    background: $altrex-colors-warning-100
    color: $altrex-colors-warning-700

.pagination-wrapper
  margin-bottom: $altrex-spacing-6

.items-per-page
  display: flex
  align-items: center
  gap: $altrex-spacing-3
  font-size: $altrex-fontSize-sm
  color: var(--altrex-colors-neutral-700)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-primary)

  label
    font-weight: $altrex-fontWeight-medium

.items-per-page-select
  min-height: $altrex-touchTarget-minimum
  padding: $altrex-spacing-2 $altrex-spacing-3
  border: 1px solid var(--altrex-colors-neutral-300)
  border-radius: $altrex-borderRadius-default
  font-size: 16px
  background: var(--altrex-colors-neutral-50)
  color: var(--altrex-colors-neutral-900)
  cursor: pointer

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-input)
    border-color: var(--altrex-colors-dark-border-default)
    color: var(--altrex-colors-dark-text-primary)

  +above('md')
    min-height: 36px
    font-size: $altrex-fontSize-base

  &:focus
    outline: 2px solid $altrex-colors-primary-500
    outline-offset: 2px

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

    &:last-child
      margin-bottom: 0

  li
    color: var(--altrex-colors-neutral-700)
    margin-bottom: $altrex-spacing-2

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-secondary)

  code
    background: rgba(0, 0, 0, 0.1)
    padding: 2px 6px
    border-radius: 3px
    font-size: $altrex-fontSize-sm

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
