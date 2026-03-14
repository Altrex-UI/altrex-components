import { ref, computed } from 'vue'

/**
 * Composable for client-side table pagination
 * @param {Ref<Array>} rows - Table rows
 * @param {Ref<Number>} pageSizeProp - Items per page
 * @param {Ref<Number>} currentPageProp - Current page number
 * @returns {Object} Pagination state and methods
 */
export function useTablePagination(rows, pageSizeProp, currentPageProp) {
  const internalPageSize = ref(pageSizeProp?.value || 10)
  const internalCurrentPage = ref(currentPageProp?.value || 1)

  const totalPages = computed(() => {
    return Math.ceil(rows.value.length / internalPageSize.value)
  })

  const paginatedRows = computed(() => {
    const start = (internalCurrentPage.value - 1) * internalPageSize.value
    const end = start + internalPageSize.value
    return rows.value.slice(start, end)
  })

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      internalCurrentPage.value = page
    }
  }

  const goToFirstPage = () => {
    internalCurrentPage.value = 1
  }

  const goToLastPage = () => {
    internalCurrentPage.value = totalPages.value
  }

  const nextPage = () => {
    if (internalCurrentPage.value < totalPages.value) {
      internalCurrentPage.value++
    }
  }

  const prevPage = () => {
    if (internalCurrentPage.value > 1) {
      internalCurrentPage.value--
    }
  }

  return {
    paginatedRows,
    internalPageSize,
    internalCurrentPage,
    totalPages,
    goToPage,
    goToFirstPage,
    goToLastPage,
    nextPage,
    prevPage
  }
}
