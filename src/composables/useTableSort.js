import { ref, computed } from 'vue'

/**
 * Composable for table sorting functionality
 * @param {Ref<Array>} rows - Table rows
 * @param {Ref<String>} sortByProp - Column key to sort by
 * @param {Ref<String>} sortOrderProp - Sort order ('asc' or 'desc')
 * @returns {Object} Sorting state and methods
 */
export function useTableSort(rows, sortByProp, sortOrderProp) {
  const internalSortBy = ref(sortByProp?.value || null)
  const internalSortOrder = ref(sortOrderProp?.value || 'asc')

  const sortedRows = computed(() => {
    if (!internalSortBy.value) {
      return rows.value
    }

    return [...rows.value].sort((a, b) => {
      const aVal = a[internalSortBy.value]
      const bVal = b[internalSortBy.value]

      // Handle null/undefined
      if (aVal == null && bVal == null) return 0
      if (aVal == null) return 1
      if (bVal == null) return -1

      // Compare values
      let comparison = 0
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.localeCompare(bVal)
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal
      } else if (aVal instanceof Date && bVal instanceof Date) {
        comparison = aVal.getTime() - bVal.getTime()
      } else {
        comparison = String(aVal).localeCompare(String(bVal))
      }

      return internalSortOrder.value === 'asc' ? comparison : -comparison
    })
  })

  const toggleSort = (columnKey) => {
    if (internalSortBy.value === columnKey) {
      // Toggle order
      internalSortOrder.value = internalSortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      // New column
      internalSortBy.value = columnKey
      internalSortOrder.value = 'asc'
    }
  }

  const getSortIcon = (columnKey) => {
    if (internalSortBy.value !== columnKey) {
      return 'generic-chevron-up-down'
    }
    return internalSortOrder.value === 'asc' ? 'generic-chevron-up' : 'generic-chevron-down'
  }

  const isSorted = (columnKey) => {
    return internalSortBy.value === columnKey
  }

  return {
    sortedRows,
    internalSortBy,
    internalSortOrder,
    toggleSort,
    getSortIcon,
    isSorted
  }
}
