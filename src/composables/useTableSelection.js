import { ref, computed } from 'vue'

/**
 * Composable for table row selection
 * @param {Ref<Array>} rows - Table rows
 * @param {String} rowKey - Key to identify rows
 * @param {String} selectMode - 'single' or 'multiple'
 * @returns {Object} Selection state and methods
 */
export function useTableSelection(rows, rowKey, selectMode) {
  const selectedKeys = ref(new Set())

  const selectedRows = computed(() => {
    return rows.value.filter(row => selectedKeys.value.has(row[rowKey]))
  })

  const isSelected = (row) => {
    return selectedKeys.value.has(row[rowKey])
  }

  const isAllSelected = computed(() => {
    if (rows.value.length === 0) return false
    return rows.value.every(row => selectedKeys.value.has(row[rowKey]))
  })

  const isSomeSelected = computed(() => {
    if (rows.value.length === 0) return false
    return rows.value.some(row => selectedKeys.value.has(row[rowKey])) && !isAllSelected.value
  })

  const toggleRow = (row) => {
    const key = row[rowKey]

    if (selectMode === 'single') {
      // Single select: clear all and select this one (or deselect if already selected)
      if (selectedKeys.value.has(key)) {
        selectedKeys.value.clear()
      } else {
        selectedKeys.value.clear()
        selectedKeys.value.add(key)
      }
    } else {
      // Multiple select: toggle this row
      if (selectedKeys.value.has(key)) {
        selectedKeys.value.delete(key)
      } else {
        selectedKeys.value.add(key)
      }
    }
  }

  const selectAll = () => {
    if (selectMode === 'single') return

    if (isAllSelected.value) {
      // Deselect all
      selectedKeys.value.clear()
    } else {
      // Select all
      rows.value.forEach(row => selectedKeys.value.add(row[rowKey]))
    }
  }

  const clearSelection = () => {
    selectedKeys.value.clear()
  }

  const setSelectedKeys = (keys) => {
    selectedKeys.value = new Set(keys)
  }

  return {
    selectedKeys,
    selectedRows,
    isSelected,
    isAllSelected,
    isSomeSelected,
    toggleRow,
    selectAll,
    clearSelection,
    setSelectedKeys
  }
}
