<template>
  <div class="table-demo">
    <h1>Altrex Table</h1>
    <p class="subtitle">Responsive data table with sorting, pagination, and selection</p>

    <!-- Basic Table -->
    <section class="demo-section">
      <h2>Basic Table</h2>
      <p class="description">
        Simple table with data columns. Automatically switches to card layout on mobile (< 768px).
      </p>

      <AltrexTable
        :columns="basicColumns"
        :rows="basicData"
        row-key="id"
      />
    </section>

    <!-- With Sorting -->
    <section class="demo-section">
      <h2>Sortable Columns</h2>
      <p class="description">
        Click column headers to sort. Supports ascending and descending order.
      </p>

      <AltrexTable
        :columns="sortableColumns"
        :rows="userData"
        row-key="id"
        sortable
      />
    </section>

    <!-- With Pagination -->
    <section class="demo-section">
      <h2>With Pagination (Client-Side)</h2>
      <p class="description">
        Paginate large datasets. Client-side mode automatically handles pagination.
      </p>

      <AltrexTable
        :columns="basicColumns"
        :rows="largeDataset"
        row-key="id"
        paginated
        :page-size="5"
      />
    </section>

    <!-- With Selection -->
    <section class="demo-section">
      <h2>Row Selection</h2>
      <p class="description">
        Select rows with checkboxes. Supports single and multiple selection modes.
      </p>

      <div class="demo-controls">
        <AltrexButton
          :label="`Selected: ${selectedUsers.length}`"
          variant="ghost"
          size="s"
        />
        <AltrexButton
          v-if="selectedUsers.length > 0"
          label="Clear Selection"
          variant="ghost"
          size="s"
          @click="selectedUsers = []"
        />
      </div>

      <AltrexTable
        :columns="basicColumns"
        :rows="userData"
        row-key="id"
        selectable
        select-mode="multiple"
        v-model:selected-rows="selectedUsers"
      />
    </section>

    <!-- Custom Cell Rendering -->
    <section class="demo-section">
      <h2>Custom Cell Rendering</h2>
      <p class="description">
        Use slots to customize cell content. Add badges, buttons, or any custom UI.
      </p>

      <AltrexTable
        :columns="customColumns"
        :rows="userData"
        row-key="id"
      >
        <template #cell-status="{ value }">
          <AltrexBadge
            :content="value"
            :variant="getStatusVariant(value)"
          />
        </template>

        <template #cell-email="{ value }">
          <a :href="`mailto:${value}`" class="table-link">{{ value }}</a>
        </template>

        <template #row-actions="{ row }">
          <div class="action-buttons">
            <AltrexButton label="Edit" size="s" variant="ghost" @click="handleEdit(row)" />
            <AltrexButton label="Delete" size="s" variant="ghost" @click="handleDelete(row)" />
          </div>
        </template>
      </AltrexTable>
    </section>

    <!-- Loading State -->
    <section class="demo-section">
      <h2>Loading State</h2>
      <p class="description">
        Show loading spinner while fetching data.
      </p>

      <div class="demo-controls">
        <AltrexButton
          :label="isLoading ? 'Loading...' : 'Simulate Loading'"
          @click="simulateLoading"
        />
      </div>

      <AltrexTable
        :columns="basicColumns"
        :rows="basicData"
        row-key="id"
        :loading="isLoading"
      />
    </section>

    <!-- Empty State -->
    <section class="demo-section">
      <h2>Empty State</h2>
      <p class="description">
        Display a message when no data is available.
      </p>

      <AltrexTable
        :columns="basicColumns"
        :rows="[]"
        row-key="id"
        empty-message="No users found"
      />
    </section>

    <!-- Table Variants -->
    <section class="demo-section">
      <h2>Table Variants</h2>
      <p class="description">
        Striped, bordered, and compact variants for different use cases.
      </p>

      <h3>Striped</h3>
      <AltrexTable
        :columns="basicColumns"
        :rows="basicData"
        row-key="id"
        striped
      />

      <h3 style="margin-top: 2rem;">Bordered</h3>
      <AltrexTable
        :columns="basicColumns"
        :rows="basicData"
        row-key="id"
        bordered
      />

      <h3 style="margin-top: 2rem;">Compact</h3>
      <AltrexTable
        :columns="basicColumns"
        :rows="basicData"
        row-key="id"
        compact
      />
    </section>

    <!-- Sticky Header -->
    <section class="demo-section">
      <h2>Sticky Header</h2>
      <p class="description">
        Keep header visible while scrolling through long tables (max-height: 400px).
      </p>

      <AltrexTable
        :columns="basicColumns"
        :rows="largeDataset"
        row-key="id"
        sticky-header
      />
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
              <td><code>columns</code></td>
              <td>Array</td>
              <td>required</td>
              <td>Column definitions</td>
            </tr>
            <tr>
              <td><code>rows</code></td>
              <td>Array</td>
              <td>required</td>
              <td>Data rows</td>
            </tr>
            <tr>
              <td><code>rowKey</code></td>
              <td>String</td>
              <td><code>'id'</code></td>
              <td>Unique key for each row</td>
            </tr>
            <tr>
              <td><code>selectable</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Enable row selection</td>
            </tr>
            <tr>
              <td><code>selectMode</code></td>
              <td>String</td>
              <td><code>'single'</code></td>
              <td>'single' or 'multiple'</td>
            </tr>
            <tr>
              <td><code>sortable</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Enable column sorting</td>
            </tr>
            <tr>
              <td><code>paginated</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Enable pagination</td>
            </tr>
            <tr>
              <td><code>pageSize</code></td>
              <td>Number</td>
              <td><code>10</code></td>
              <td>Rows per page</td>
            </tr>
            <tr>
              <td><code>loading</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Show loading state</td>
            </tr>
            <tr>
              <td><code>stickyHeader</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Sticky header on scroll</td>
            </tr>
            <tr>
              <td><code>striped</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Striped rows</td>
            </tr>
            <tr>
              <td><code>bordered</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Show borders</td>
            </tr>
            <tr>
              <td><code>compact</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Reduce padding</td>
            </tr>
            <tr>
              <td><code>mobileCardMode</code></td>
              <td>Boolean</td>
              <td><code>true</code></td>
              <td>Use card layout on mobile</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Column Config Reference -->
    <section class="demo-section">
      <h2>Column Configuration</h2>
      <pre class="code-block"><code>const columns = [
  {
    key: 'name',           // Data key (required)
    label: 'Name',         // Header label (required)
    sortable: true,        // Enable sorting
    width: '200px',        // Column width
    align: 'left',         // 'left', 'center', 'right'
    formatter: (value) => value.toUpperCase(),  // Format cell value
    mobileLabel: 'Name',   // Label for mobile card view
    hideOnMobile: false    // Hide column on mobile
  }
]</code></pre>
    </section>

    <!-- Usage Example -->
    <section class="demo-section">
      <h2>Usage Example</h2>
      <pre class="code-block"><code>&lt;template&gt;
  &lt;AltrexTable
    :columns="columns"
    :rows="data"
    row-key="id"
    selectable
    select-mode="multiple"
    sortable
    paginated
    :page-size="10"
    v-model:selected-rows="selected"
    @row-click="handleRowClick"
  &gt;
    &lt;template #cell-status="{ value }"&gt;
      &lt;AltrexBadge :content="value" /&gt;
    &lt;/template&gt;

    &lt;template #row-actions="{ row }"&gt;
      &lt;AltrexButton label="Edit" @click="edit(row)" /&gt;
    &lt;/template&gt;
  &lt;/AltrexTable&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
import AltrexTable from '@/components/Table/AltrexTable.vue'

const selected = ref([])
const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'status', label: 'Status' }
]
const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' }
]

const handleRowClick = (row) => {
  console.log('Clicked:', row)
}
&lt;/script&gt;</code></pre>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue'
import AltrexTable from '@/components/Table/AltrexTable.vue'
import AltrexButton from '@/components/Button/AltrexButton.vue'
import AltrexBadge from '@/components/Badge/AltrexBadge.vue'

export default {
  name: 'AltrexTableView',
  components: {
    AltrexTable,
    AltrexButton,
    AltrexBadge
  },
  setup() {
    // Basic columns
    const basicColumns = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'age', label: 'Age', sortable: true, align: 'center' },
      { key: 'role', label: 'Role', sortable: true }
    ]

    // Sortable columns (same as basic)
    const sortableColumns = basicColumns

    // Custom columns with status
    const customColumns = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'status', label: 'Status' },
      { key: 'role', label: 'Role' }
    ]

    // Basic data
    const basicData = [
      { id: 1, name: 'John Doe', email: 'john@example.com', age: 28, role: 'Developer', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 32, role: 'Designer', status: 'Active' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 45, role: 'Manager', status: 'Inactive' },
      { id: 4, name: 'Alice Williams', email: 'alice@example.com', age: 29, role: 'Developer', status: 'Active' }
    ]

    // User data (with status)
    const userData = [
      { id: 1, name: 'John Doe', email: 'john@example.com', age: 28, role: 'Developer', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 32, role: 'Designer', status: 'Active' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 45, role: 'Manager', status: 'Inactive' },
      { id: 4, name: 'Alice Williams', email: 'alice@example.com', age: 29, role: 'Developer', status: 'Active' },
      { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', age: 35, role: 'Developer', status: 'Pending' },
      { id: 6, name: 'Diana Prince', email: 'diana@example.com', age: 30, role: 'Designer', status: 'Active' }
    ]

    // Large dataset for pagination
    const largeDataset = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      age: 20 + (i % 40),
      role: ['Developer', 'Designer', 'Manager', 'QA'][i % 4]
    }))

    // Selection
    const selectedUsers = ref([])

    // Loading state
    const isLoading = ref(false)

    const simulateLoading = () => {
      isLoading.value = true
      setTimeout(() => {
        isLoading.value = false
      }, 2000)
    }

    // Status variant helper
    const getStatusVariant = (status) => {
      const variants = {
        'Active': 'success',
        'Inactive': 'danger',
        'Pending': 'warning'
      }
      return variants[status] || 'neutral'
    }

    // Action handlers
    const handleEdit = (row) => {
      alert(`Edit user: ${row.name}`)
    }

    const handleDelete = (row) => {
      if (confirm(`Delete user: ${row.name}?`)) {
        console.log('Deleted:', row)
      }
    }

    return {
      basicColumns,
      sortableColumns,
      customColumns,
      basicData,
      userData,
      largeDataset,
      selectedUsers,
      isLoading,
      simulateLoading,
      getStatusVariant,
      handleEdit,
      handleDelete
    }
  }
}
</script>

<style lang="stylus" scoped>
.table-demo
  padding: $altrex-spacing-8
  max-width: 1400px
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

  h3
    margin-bottom: $altrex-spacing-3
    color: var(--altrex-colors-neutral-700)
    font-size: $altrex-fontSize-lg

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-secondary)

  .description
    margin-bottom: $altrex-spacing-4
    color: var(--altrex-colors-neutral-600)
    font-size: $altrex-fontSize-sm

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-secondary)

.demo-controls
  margin-bottom: $altrex-spacing-4
  display: flex
  gap: $altrex-spacing-2

.table-link
  color: var(--altrex-colors-primary-500)
  text-decoration: none

  &:hover
    text-decoration: underline

.action-buttons
  display: flex
  gap: $altrex-spacing-2

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
