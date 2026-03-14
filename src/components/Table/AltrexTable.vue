<template>
  <div class="altrex-table-wrapper" :class="wrapperClasses">
    <!-- Loading Overlay -->
    <div v-if="loading" class="altrex-table-loading">
      <AltrexSpinner size="l" />
      <span>Loading...</span>
    </div>

    <!-- Empty State -->
    <div v-else-if="displayRows.length === 0" class="altrex-table-empty">
      <slot name="empty">
        <AltrexEmptyState
          icon="generic-inbox"
          :message="emptyMessage"
        />
      </slot>
    </div>

    <!-- Table Content -->
    <div v-else>
      <!-- Desktop Table View -->
      <div v-if="!isMobileView" class="altrex-table-container" :class="{ 'altrex-table--sticky-header': stickyHeader }">
        <table class="altrex-table" :class="tableClasses">
          <thead class="altrex-table__thead">
            <tr class="altrex-table__row altrex-table__row--header">
              <!-- Selection Column -->
              <th v-if="selectable" class="altrex-table__th altrex-table__th--checkbox">
                <AltrexCheckbox
                  v-if="selectMode === 'multiple'"
                  :model-value="isAllSelected"
                  :indeterminate="isSomeSelected"
                  @update:modelValue="handleSelectAll"
                  aria-label="Select all rows"
                />
              </th>

              <!-- Data Columns -->
              <th
                v-for="column in visibleColumns"
                :key="column.key"
                class="altrex-table__th"
                :class="[
                  `altrex-table__th--${column.align || 'left'}`,
                  { 'altrex-table__th--sortable': column.sortable }
                ]"
                :style="{ width: column.width }"
                @click="column.sortable && handleSort(column.key)"
              >
                <div class="altrex-table__th-content">
                  <slot :name="`header-${column.key}`" :column="column">
                    {{ column.label }}
                  </slot>
                  <AltrexIcon
                    v-if="column.sortable"
                    :icon="getSortIcon(column.key)"
                    size="s"
                    class="altrex-table__sort-icon"
                    :class="{ 'altrex-table__sort-icon--active': isSorted(column.key) }"
                  />
                </div>
              </th>

              <!-- Actions Column -->
              <th v-if="$slots['row-actions']" class="altrex-table__th altrex-table__th--actions">
                Actions
              </th>
            </tr>
          </thead>

          <tbody class="altrex-table__tbody">
            <template v-for="(row, rowIndex) in displayRows" :key="getRowKey(row)">
              <!-- Main Row -->
              <tr
                class="altrex-table__row altrex-table__row--body"
                :class="{
                  'altrex-table__row--selected': isRowSelected(row),
                  'altrex-table__row--expandable': expandable,
                  'altrex-table__row--expanded': isRowExpanded(row)
                }"
                @click="handleRowClick(row, rowIndex)"
              >
                <!-- Selection Column -->
                <td v-if="selectable" class="altrex-table__td altrex-table__td--checkbox">
                  <AltrexCheckbox
                    :model-value="isRowSelected(row)"
                    @update:modelValue="handleRowSelect(row)"
                    @click.stop
                    :aria-label="`Select row ${rowIndex + 1}`"
                  />
                </td>

                <!-- Data Columns -->
                <td
                  v-for="column in visibleColumns"
                  :key="column.key"
                  class="altrex-table__td"
                  :class="`altrex-table__td--${column.align || 'left'}`"
                >
                  <slot :name="`cell-${column.key}`" :row="row" :value="getCellValue(row, column)" :index="rowIndex">
                    {{ formatCellValue(row, column) }}
                  </slot>
                </td>

                <!-- Actions Column -->
                <td v-if="$slots['row-actions']" class="altrex-table__td altrex-table__td--actions">
                  <slot name="row-actions" :row="row" :index="rowIndex" />
                </td>
              </tr>

              <!-- Expanded Row -->
              <tr v-if="expandable && isRowExpanded(row)" class="altrex-table__row altrex-table__row--expanded-content">
                <td :colspan="columnCount" class="altrex-table__td altrex-table__td--expanded">
                  <slot name="expanded-row" :row="row" />
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Mobile Card View -->
      <div v-else class="altrex-table-cards">
        <div
          v-for="(row, rowIndex) in displayRows"
          :key="getRowKey(row)"
          class="altrex-table-card"
          :class="{
            'altrex-table-card--selected': isRowSelected(row)
          }"
          @click="handleRowClick(row, rowIndex)"
        >
          <!-- Card Header (Selection) -->
          <div v-if="selectable" class="altrex-table-card__header">
            <AltrexCheckbox
              :model-value="isRowSelected(row)"
              @update:modelValue="handleRowSelect(row)"
              @click.stop
              :label="`Row ${rowIndex + 1}`"
            />
          </div>

          <!-- Card Body -->
          <div class="altrex-table-card__body">
            <div
              v-for="column in visibleColumnsForMobile"
              :key="column.key"
              class="altrex-table-card__field"
            >
              <span class="altrex-table-card__label">
                {{ column.mobileLabel || column.label }}:
              </span>
              <span class="altrex-table-card__value">
                <slot :name="`cell-${column.key}`" :row="row" :value="getCellValue(row, column)" :index="rowIndex">
                  {{ formatCellValue(row, column) }}
                </slot>
              </span>
            </div>
          </div>

          <!-- Card Actions -->
          <div v-if="$slots['row-actions']" class="altrex-table-card__actions">
            <slot name="row-actions" :row="row" :index="rowIndex" />
          </div>

          <!-- Expanded Content (Mobile) -->
          <div v-if="expandable && isRowExpanded(row)" class="altrex-table-card__expanded">
            <slot name="expanded-row" :row="row" />
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="paginated && totalRows > 0" class="altrex-table-pagination">
        <AltrexPagination
          :model-value="internalCurrentPage"
          :total="totalRows"
          :per-page="pageSize"
          @update:modelValue="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import AltrexCheckbox from '../Checkbox/AltrexCheckbox.vue'
import AltrexIcon from '../Icon/AltrexIcon.vue'
import AltrexPagination from '../Pagination/AltrexPagination.vue'
import AltrexSpinner from '../Spinner/AltrexSpinner.vue'
import AltrexEmptyState from '../EmptyState/AltrexEmptyState.vue'
import { useTableSort } from '@/composables/useTableSort'
import { useTablePagination } from '@/composables/useTablePagination'
import { useTableSelection } from '@/composables/useTableSelection'

export default {
  name: 'AltrexTable',

  components: {
    AltrexCheckbox,
    AltrexIcon,
    AltrexPagination,
    AltrexSpinner,
    AltrexEmptyState
  },

  props: {
    // Data
    columns: {
      type: Array,
      required: true,
      default: () => []
    },
    rows: {
      type: Array,
      required: true,
      default: () => []
    },
    rowKey: {
      type: String,
      default: 'id'
    },

    // Selection
    selectable: {
      type: Boolean,
      default: false
    },
    selectMode: {
      type: String,
      default: 'single',
      validator: (value) => ['single', 'multiple'].includes(value)
    },
    selectedRows: {
      type: Array,
      default: () => []
    },

    // Sorting
    sortable: {
      type: Boolean,
      default: false
    },
    sortBy: {
      type: String,
      default: null
    },
    sortOrder: {
      type: String,
      default: 'asc',
      validator: (value) => ['asc', 'desc'].includes(value)
    },

    // Pagination
    paginated: {
      type: Boolean,
      default: false
    },
    paginationMode: {
      type: String,
      default: 'client',
      validator: (value) => ['client', 'server'].includes(value)
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    totalRows: {
      type: Number,
      default: null
    },

    // States & Behavior
    loading: {
      type: Boolean,
      default: false
    },
    emptyMessage: {
      type: String,
      default: 'No data available'
    },
    stickyHeader: {
      type: Boolean,
      default: false
    },
    expandable: {
      type: Boolean,
      default: false
    },

    // Mobile
    mobileBreakpoint: {
      type: Number,
      default: 768
    },
    mobileCardMode: {
      type: Boolean,
      default: true
    },

    // Styling
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    hoverable: {
      type: Boolean,
      default: true
    },
    compact: {
      type: Boolean,
      default: false
    }
  },

  emits: [
    'update:selectedRows',
    'update:sortBy',
    'update:sortOrder',
    'update:currentPage',
    'rowClick',
    'rowSelect',
    'sort',
    'pageChange'
  ],

  setup(props, { emit }) {
    // Responsive
    const isMobileView = ref(false)

    const checkViewport = () => {
      isMobileView.value = props.mobileCardMode && window.innerWidth < props.mobileBreakpoint
    }

    onMounted(() => {
      checkViewport()
      window.addEventListener('resize', checkViewport)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', checkViewport)
    })

    // Sorting
    const sortByRef = ref(props.sortBy)
    const sortOrderRef = ref(props.sortOrder)
    const { sortedRows, internalSortBy, internalSortOrder, toggleSort, getSortIcon, isSorted } = useTableSort(
      computed(() => props.rows),
      sortByRef,
      sortOrderRef
    )

    // Pagination
    const internalCurrentPage = ref(props.currentPage)
    const totalRowsCount = computed(() => {
      return props.paginationMode === 'server'
        ? (props.totalRows || 0)
        : sortedRows.value.length
    })

    const { paginatedRows } = useTablePagination(
      sortedRows,
      computed(() => props.pageSize),
      internalCurrentPage
    )

    // Selection
    const { selectedKeys, isSelected: isRowSelected, isAllSelected, isSomeSelected, toggleRow, selectAll } = useTableSelection(
      computed(() => displayRows.value),
      props.rowKey,
      props.selectMode
    )

    // Expandable rows
    const expandedKeys = ref(new Set())

    const isRowExpanded = (row) => {
      return expandedKeys.value.has(row[props.rowKey])
    }

    const toggleRowExpansion = (row) => {
      const key = row[props.rowKey]
      if (expandedKeys.value.has(key)) {
        expandedKeys.value.delete(key)
      } else {
        expandedKeys.value.add(key)
      }
    }

    // Display rows (after sorting and pagination)
    const displayRows = computed(() => {
      if (props.paginated && props.paginationMode === 'client') {
        return paginatedRows.value
      }
      return sortedRows.value
    })

    // Columns
    const visibleColumns = computed(() => {
      return props.columns
    })

    const visibleColumnsForMobile = computed(() => {
      return props.columns.filter(col => !col.hideOnMobile)
    })

    const columnCount = computed(() => {
      let count = visibleColumns.value.length
      if (props.selectable) count++
      if (props.$slots['row-actions']) count++
      return count
    })

    // Computed Classes
    const wrapperClasses = computed(() => ({
      'altrex-table-wrapper--loading': props.loading,
      'altrex-table-wrapper--mobile': isMobileView.value
    }))

    const tableClasses = computed(() => ({
      'altrex-table--striped': props.striped,
      'altrex-table--bordered': props.bordered,
      'altrex-table--hoverable': props.hoverable,
      'altrex-table--compact': props.compact
    }))

    // Methods
    const getRowKey = (row) => {
      return row[props.rowKey]
    }

    const getCellValue = (row, column) => {
      return row[column.key]
    }

    const formatCellValue = (row, column) => {
      const value = getCellValue(row, column)
      if (column.formatter) {
        return column.formatter(value, row)
      }
      return value
    }

    const handleSort = (columnKey) => {
      toggleSort(columnKey)
      emit('update:sortBy', internalSortBy.value)
      emit('update:sortOrder', internalSortOrder.value)
      emit('sort', { column: columnKey, order: internalSortOrder.value })
    }

    const handleRowSelect = (row) => {
      toggleRow(row)
      const selected = displayRows.value.filter(r => isRowSelected(r))
      emit('update:selectedRows', selected)
      emit('rowSelect', row, isRowSelected(row))
    }

    const handleSelectAll = () => {
      selectAll()
      const selected = displayRows.value.filter(r => isRowSelected(r))
      emit('update:selectedRows', selected)
    }

    const handleRowClick = (row, index) => {
      emit('rowClick', row, index)
      if (props.expandable) {
        toggleRowExpansion(row)
      }
    }

    const handlePageChange = (page) => {
      internalCurrentPage.value = page
      emit('update:currentPage', page)
      emit('pageChange', page)
    }

    // Watch for external changes
    watch(() => props.sortBy, (newVal) => {
      if (newVal !== internalSortBy.value) {
        internalSortBy.value = newVal
      }
    })

    watch(() => props.sortOrder, (newVal) => {
      if (newVal !== internalSortOrder.value) {
        internalSortOrder.value = newVal
      }
    })

    watch(() => props.currentPage, (newVal) => {
      if (newVal !== internalCurrentPage.value) {
        internalCurrentPage.value = newVal
      }
    })

    return {
      isMobileView,
      displayRows,
      visibleColumns,
      visibleColumnsForMobile,
      columnCount,
      wrapperClasses,
      tableClasses,
      internalCurrentPage,
      totalRowsCount,
      isRowSelected,
      isAllSelected,
      isSomeSelected,
      isRowExpanded,
      getSortIcon,
      isSorted,
      getRowKey,
      getCellValue,
      formatCellValue,
      handleSort,
      handleRowSelect,
      handleSelectAll,
      handleRowClick,
      handlePageChange
    }
  }
}
</script>

<style lang="stylus" scoped>
// ========================================
// WRAPPER
// ========================================
.altrex-table-wrapper
  position: relative
  width: 100%

  &--loading
    min-height: 300px

// ========================================
// LOADING OVERLAY
// ========================================
.altrex-table-loading
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  gap: $altrex-spacing-3
  padding: $altrex-spacing-8
  color: var(--altrex-colors-neutral-600)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-secondary)

// ========================================
// EMPTY STATE
// ========================================
.altrex-table-empty
  padding: $altrex-spacing-6

// ========================================
// TABLE CONTAINER
// ========================================
.altrex-table-container
  width: 100%
  overflow-x: auto
  border: 1px solid var(--altrex-colors-neutral-200)
  border-radius: $altrex-borderRadius-default

  [data-theme="dark"] &
    border-color: var(--altrex-colors-dark-border-default)

  &.altrex-table--sticky-header
    max-height: 600px
    overflow-y: auto

    .altrex-table__thead
      position: sticky
      top: 0
      z-index: 10

// ========================================
// TABLE
// ========================================
.altrex-table
  width: 100%
  border-collapse: collapse

  &--striped
    .altrex-table__row--body:nth-child(even)
      background: var(--altrex-colors-neutral-50)

      [data-theme="dark"] &
        background: var(--altrex-colors-dark-bg-subtle)

  &--bordered
    .altrex-table__th,
    .altrex-table__td
      border-right: 1px solid var(--altrex-colors-neutral-200)

      [data-theme="dark"] &
        border-color: var(--altrex-colors-dark-border-subtle)

      &:last-child
        border-right: none

  &--hoverable
    .altrex-table__row--body:hover
      background: var(--altrex-colors-neutral-100)
      cursor: pointer

      [data-theme="dark"] &
        background: var(--altrex-colors-dark-bg-hover)

  &--compact
    .altrex-table__th,
    .altrex-table__td
      padding: $altrex-spacing-2 $altrex-spacing-3

// ========================================
// TABLE HEAD
// ========================================
.altrex-table__thead
  background: var(--altrex-colors-neutral-50)

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-elevated)

.altrex-table__th
  padding: $altrex-spacing-3 $altrex-spacing-4
  text-align: left
  font-weight: $altrex-fontWeight-semibold
  color: var(--altrex-colors-neutral-900)
  border-bottom: 2px solid var(--altrex-colors-neutral-200)
  white-space: nowrap

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-primary)
    border-color: var(--altrex-colors-dark-border-default)

  &--left
    text-align: left

  &--center
    text-align: center

  &--right
    text-align: right

  &--sortable
    cursor: pointer
    user-select: none

    &:hover
      background: var(--altrex-colors-neutral-100)

      [data-theme="dark"] &
        background: var(--altrex-colors-dark-bg-hover)

  &--checkbox,
  &--actions
    width: 60px
    text-align: center

.altrex-table__th-content
  display: flex
  align-items: center
  gap: $altrex-spacing-2
  justify-content: flex-start

.altrex-table__sort-icon
  color: var(--altrex-colors-neutral-400)
  transition: color 0.2s ease

  &--active
    color: var(--altrex-colors-primary-500)

// ========================================
// TABLE BODY
// ========================================
.altrex-table__tbody
  background: white

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-default)

.altrex-table__row--body
  border-bottom: 1px solid var(--altrex-colors-neutral-200)
  transition: background 0.15s ease

  [data-theme="dark"] &
    border-color: var(--altrex-colors-dark-border-subtle)

  &--selected
    background: var(--altrex-colors-primary-50)

    [data-theme="dark"] &
      background: var(--altrex-colors-dark-bg-hover)
      border-left: 3px solid var(--altrex-colors-primary-500)

  &--expanded
    border-bottom-width: 0

.altrex-table__td
  padding: $altrex-spacing-3 $altrex-spacing-4
  color: var(--altrex-colors-neutral-700)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-secondary)

  &--left
    text-align: left

  &--center
    text-align: center

  &--right
    text-align: right

  &--checkbox,
  &--actions
    text-align: center

  &--expanded
    padding: $altrex-spacing-4
    background: var(--altrex-colors-neutral-50)

    [data-theme="dark"] &
      background: var(--altrex-colors-dark-bg-subtle)

// ========================================
// MOBILE CARDS
// ========================================
.altrex-table-cards
  display: flex
  flex-direction: column
  gap: $altrex-spacing-3

.altrex-table-card
  border: 1px solid var(--altrex-colors-neutral-200)
  border-radius: $altrex-borderRadius-default
  background: white
  overflow: hidden

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-elevated)
    border-color: var(--altrex-colors-dark-border-default)

  &--selected
    border-color: var(--altrex-colors-primary-500)
    background: var(--altrex-colors-primary-50)

    [data-theme="dark"] &
      background: var(--altrex-colors-dark-bg-hover)
      border-left: 3px solid var(--altrex-colors-primary-500)

.altrex-table-card__header
  padding: $altrex-spacing-3
  border-bottom: 1px solid var(--altrex-colors-neutral-200)
  background: var(--altrex-colors-neutral-50)

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-subtle)
    border-color: var(--altrex-colors-dark-border-subtle)

.altrex-table-card__body
  padding: $altrex-spacing-4

.altrex-table-card__field
  display: flex
  padding: $altrex-spacing-2 0
  border-bottom: 1px solid var(--altrex-colors-neutral-100)

  &:last-child
    border-bottom: none

  [data-theme="dark"] &
    border-color: var(--altrex-colors-dark-border-subtle)

.altrex-table-card__label
  flex: 0 0 120px
  font-weight: $altrex-fontWeight-medium
  color: var(--altrex-colors-neutral-600)
  font-size: $altrex-fontSize-sm

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-tertiary)

.altrex-table-card__value
  flex: 1
  color: var(--altrex-colors-neutral-900)
  font-size: $altrex-fontSize-sm

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-primary)

.altrex-table-card__actions
  padding: $altrex-spacing-3
  border-top: 1px solid var(--altrex-colors-neutral-200)
  background: var(--altrex-colors-neutral-50)
  display: flex
  gap: $altrex-spacing-2
  justify-content: flex-end

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-subtle)
    border-color: var(--altrex-colors-dark-border-subtle)

.altrex-table-card__expanded
  padding: $altrex-spacing-4
  border-top: 1px solid var(--altrex-colors-neutral-200)
  background: var(--altrex-colors-neutral-50)

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-subtle)
    border-color: var(--altrex-colors-dark-border-subtle)

// ========================================
// PAGINATION
// ========================================
.altrex-table-pagination
  margin-top: $altrex-spacing-4
  display: flex
  justify-content: center
</style>
