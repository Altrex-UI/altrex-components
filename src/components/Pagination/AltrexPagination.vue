<template>
  <nav
    class="altrex-pagination"
    :class="paginationClasses"
    :style="themeVariables"
    role="navigation"
    aria-label="Pagination"
  >
    <!-- Total Items Display -->
    <div v-if="showTotal" class="altrex-pagination__total">
      {{ totalText }}
    </div>

    <!-- Pagination Controls -->
    <div class="altrex-pagination__controls">
      <!-- First Button (optional) -->
      <button
        v-if="showFirstLast"
        class="altrex-pagination__button altrex-pagination__first"
        :disabled="isFirstPage"
        :aria-label="'Go to first page'"
        @click="goToPage(1)"
      >
        <AltrexIcon icon="generic-chevron-double-left" />
      </button>

      <!-- Previous Button -->
      <button
        class="altrex-pagination__button altrex-pagination__prev"
        :disabled="isFirstPage"
        :aria-label="'Go to previous page'"
        @click="goToPrevious"
      >
        <AltrexIcon icon="generic-chevron-left" />
        <span class="altrex-pagination__button-text">Previous</span>
      </button>

      <!-- Page Numbers -->
      <div class="altrex-pagination__pages">
        <button
          v-for="page in visiblePages"
          :key="page.value"
          :class="[
            'altrex-pagination__button',
            'altrex-pagination__page',
            {
              'altrex-pagination__button--active': page.value === currentPage,
              'altrex-pagination__ellipsis': page.isEllipsis
            }
          ]"
          :disabled="page.isEllipsis"
          :aria-label="page.isEllipsis ? undefined : `Go to page ${page.value}`"
          :aria-current="page.value === currentPage ? 'page' : undefined"
          @click="!page.isEllipsis && goToPage(page.value)"
        >
          {{ page.label }}
        </button>
      </div>

      <!-- Next Button -->
      <button
        class="altrex-pagination__button altrex-pagination__next"
        :disabled="isLastPage"
        :aria-label="'Go to next page'"
        @click="goToNext"
      >
        <span class="altrex-pagination__button-text">Next</span>
        <AltrexIcon icon="generic-chevron-right" />
      </button>

      <!-- Last Button (optional) -->
      <button
        v-if="showFirstLast"
        class="altrex-pagination__button altrex-pagination__last"
        :disabled="isLastPage"
        :aria-label="'Go to last page'"
        @click="goToPage(totalPages)"
      >
        <AltrexIcon icon="generic-chevron-double-right" />
      </button>
    </div>

    <!-- Jump to Page (optional) -->
    <div v-if="showJumper" class="altrex-pagination__jumper">
      <span>Go to</span>
      <input
        v-model.number="jumpValue"
        type="number"
        min="1"
        :max="totalPages"
        class="altrex-pagination__jumper-input"
        :aria-label="'Jump to page number'"
        @keyup.enter="handleJump"
      />
      <button
        class="altrex-pagination__jumper-button"
        @click="handleJump"
      >
        Go
      </button>
    </div>
  </nav>
</template>

<script>
import styling from '@/utils/styling'
import AltrexIcon from '../Icon/AltrexIcon.vue'

export default {
  name: 'AltrexPagination',
  components: {
    AltrexIcon
  },
  mixins: [styling],
  props: {
    /**
     * Current page number (v-model)
     */
    modelValue: {
      type: Number,
      default: 1,
      validator: (value) => value >= 1
    },
    /**
     * Total number of items
     */
    total: {
      type: Number,
      required: true,
      validator: (value) => value >= 0
    },
    /**
     * Items per page
     */
    perPage: {
      type: Number,
      default: 10,
      validator: (value) => value > 0
    },
    /**
     * Show first/last page buttons
     */
    showFirstLast: {
      type: Boolean,
      default: false
    },
    /**
     * Show "Jump to page" input
     */
    showJumper: {
      type: Boolean,
      default: false
    },
    /**
     * Show total items text
     */
    showTotal: {
      type: Boolean,
      default: false
    },
    /**
     * Maximum number of page buttons to show
     * Mobile: 3 recommended, Desktop: 7 recommended
     */
    maxButtons: {
      type: Number,
      default: null // Will auto-detect based on viewport
    },
    /**
     * Size variant: 's', 'm', 'l'
     */
    size: {
      type: String,
      default: 'm',
      validator: (value) => ['s', 'm', 'l'].includes(value)
    }
  },
  data() {
    return {
      themePrefix: 'altrex-pagination',
      jumpValue: this.modelValue,
      isMobile: false
    }
  },
  computed: {
    currentPage() {
      return this.modelValue
    },
    totalPages() {
      return Math.ceil(this.total / this.perPage)
    },
    isFirstPage() {
      return this.currentPage === 1
    },
    isLastPage() {
      return this.currentPage === this.totalPages
    },
    totalText() {
      const start = (this.currentPage - 1) * this.perPage + 1
      const end = Math.min(this.currentPage * this.perPage, this.total)
      return `${start}-${end} of ${this.total} items`
    },
    paginationClasses() {
      return [
        `altrex-pagination--${this.size}`
      ]
    },
    effectiveMaxButtons() {
      if (this.maxButtons !== null) {
        return this.maxButtons
      }
      // Auto-detect based on viewport
      return this.isMobile ? 3 : 7
    },
    visiblePages() {
      const total = this.totalPages
      const current = this.currentPage
      const maxButtons = this.effectiveMaxButtons

      if (total <= maxButtons) {
        // Show all pages if total is less than max
        return Array.from({ length: total }, (_, i) => ({
          value: i + 1,
          label: String(i + 1),
          isEllipsis: false
        }))
      }

      const pages = []
      const sidePages = Math.floor((maxButtons - 3) / 2) // Pages on each side of current

      // Always show first page
      pages.push({ value: 1, label: '1', isEllipsis: false })

      // Calculate range around current page
      let startPage = Math.max(2, current - sidePages)
      let endPage = Math.min(total - 1, current + sidePages)

      // Adjust range if near start or end
      if (current <= sidePages + 2) {
        endPage = Math.min(total - 1, maxButtons - 1)
      }
      if (current >= total - sidePages - 1) {
        startPage = Math.max(2, total - maxButtons + 2)
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push({ value: 'ellipsis-1', label: '...', isEllipsis: true })
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push({ value: i, label: String(i), isEllipsis: false })
      }

      // Add ellipsis before last page if needed
      if (endPage < total - 1) {
        pages.push({ value: 'ellipsis-2', label: '...', isEllipsis: true })
      }

      // Always show last page
      if (total > 1) {
        pages.push({ value: total, label: String(total), isEllipsis: false })
      }

      return pages
    }
  },
  watch: {
    modelValue(newVal) {
      this.jumpValue = newVal
    }
  },
  mounted() {
    this.checkViewport()
    window.addEventListener('resize', this.checkViewport)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkViewport)
  },
  methods: {
    goToPage(page) {
      if (page < 1 || page > this.totalPages || page === this.currentPage) {
        return
      }
      this.$emit('update:modelValue', page)
      this.$emit('change', {
        page,
        perPage: this.perPage
      })
    },
    goToPrevious() {
      if (!this.isFirstPage) {
        this.goToPage(this.currentPage - 1)
      }
    },
    goToNext() {
      if (!this.isLastPage) {
        this.goToPage(this.currentPage + 1)
      }
    },
    handleJump() {
      const page = parseInt(this.jumpValue)
      if (!isNaN(page) && page >= 1 && page <= this.totalPages) {
        this.goToPage(page)
      } else {
        // Reset to current page if invalid
        this.jumpValue = this.currentPage
      }
    },
    checkViewport() {
      this.isMobile = window.innerWidth < 768
    }
  }
}
</script>

<style lang="stylus" scoped>
// ========================================
// PAGINATION CONTAINER
// ========================================

.altrex-pagination
  display: flex
  flex-direction: column
  align-items: center
  gap: $altrex-spacing-4
  width: 100%

  // Desktop: horizontal layout
  +above('md')
    flex-direction: row
    justify-content: center
    flex-wrap: wrap

  // Size variants
  &--s
    font-size: $altrex-fontSize-sm

  &--m
    font-size: 16px

    +above('md')
      font-size: $altrex-fontSize-base

  &--l
    font-size: $altrex-fontSize-lg

// ========================================
// TOTAL ITEMS TEXT
// ========================================

.altrex-pagination__total
  font-size: $altrex-fontSize-sm
  color: var(--altrex-pagination-total-color, var(--altrex-colors-neutral-600))
  order: -1
  width: 100%
  text-align: center

  [data-theme="dark"] &
    color: var(--altrex-pagination-total-color, var(--altrex-colors-dark-text-secondary))

  +above('md')
    width: auto
    order: 0
    margin-right: $altrex-spacing-4

// ========================================
// CONTROLS CONTAINER
// ========================================

.altrex-pagination__controls
  display: flex
  align-items: center
  gap: $altrex-spacing-2
  flex-wrap: wrap
  justify-content: center

  +above('md')
    gap: $altrex-spacing-3

// ========================================
// PAGE NUMBERS CONTAINER
// ========================================

.altrex-pagination__pages
  display: flex
  align-items: center
  gap: $altrex-spacing-2

// ========================================
// BUTTONS
// ========================================

.altrex-pagination__button
  // Mobile: Touch-optimized
  min-width: $altrex-touchTarget-minimum
  min-height: $altrex-touchTarget-minimum
  display: inline-flex
  align-items: center
  justify-content: center
  padding: 0 $altrex-spacing-3
  gap: $altrex-spacing-2
  background: var(--altrex-pagination-button-background, transparent)
  border: 1px solid var(--altrex-pagination-button-border, var(--altrex-colors-neutral-300))
  border-radius: $altrex-borderRadius-default
  font-size: inherit
  font-weight: $altrex-fontWeight-medium
  color: var(--altrex-pagination-button-color, var(--altrex-colors-neutral-700))
  cursor: pointer
  transition: all $altrex-transition-default
  user-select: none

  [data-theme="dark"] &
    border-color: var(--altrex-pagination-button-border, var(--altrex-colors-dark-border-default))
    color: var(--altrex-pagination-button-color, var(--altrex-colors-dark-text-primary))

  // Desktop: More compact
  +above('md')
    min-width: 36px
    min-height: 36px
    padding: 0 $altrex-spacing-2

  &:hover:not(:disabled):not(.altrex-pagination__button--active)
    background: var(--altrex-pagination-button-background-hover, var(--altrex-colors-neutral-100))
    border-color: var(--altrex-pagination-button-border-hover, $altrex-colors-primary-500)

    [data-theme="dark"] &
      background: var(--altrex-pagination-button-background-hover, var(--altrex-colors-dark-bg-hover))

  &:focus-visible
    outline: 2px solid $altrex-colors-primary-500
    outline-offset: 2px

  &:disabled
    opacity: 0.5
    cursor: not-allowed

  // Touch feedback
  +touch-device()
    &:active:not(:disabled):not(.altrex-pagination__button--active)
      transform: scale(0.98)

  // Active page button
  &--active
    background: var(--altrex-pagination-button-active-background, $altrex-colors-primary-500)
    border-color: var(--altrex-pagination-button-active-border, $altrex-colors-primary-500)
    color: var(--altrex-pagination-button-active-color, $altrex-colors-neutral-50)

    &:hover
      background: var(--altrex-pagination-button-active-background-hover, $altrex-colors-primary-600)
      border-color: var(--altrex-pagination-button-active-border-hover, $altrex-colors-primary-600)

  // Icon in buttons
  :deep(.altrex-icon)
    altrex-icon-s()

// ========================================
// PREV/NEXT BUTTONS
// ========================================

.altrex-pagination__prev,
.altrex-pagination__next
  // Mobile: Prominent navigation
  min-width: $altrex-touchTarget-comfortable
  padding: 0 $altrex-spacing-4

  +above('md')
    min-width: auto
    padding: 0 $altrex-spacing-3

.altrex-pagination__button-text
  // Mobile: Hide text, show icon only
  display: none

  // Desktop: Show text with icon
  +above('md')
    display: inline

// ========================================
// FIRST/LAST BUTTONS
// ========================================

.altrex-pagination__first,
.altrex-pagination__last
  // Show only icon
  padding: 0 $altrex-spacing-2

// ========================================
// ELLIPSIS
// ========================================

.altrex-pagination__ellipsis
  border: none
  background: transparent
  color: var(--altrex-pagination-ellipsis-color, var(--altrex-colors-neutral-500))
  cursor: default
  min-width: auto
  padding: 0 $altrex-spacing-2

  [data-theme="dark"] &
    color: var(--altrex-pagination-ellipsis-color, var(--altrex-colors-dark-text-tertiary))

  &:hover
    background: transparent
    border: none

// ========================================
// JUMPER
// ========================================

.altrex-pagination__jumper
  display: flex
  align-items: center
  gap: $altrex-spacing-2
  font-size: $altrex-fontSize-sm
  color: var(--altrex-colors-neutral-700)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-primary)

  +above('md')
    margin-left: $altrex-spacing-4

.altrex-pagination__jumper-input
  width: 60px
  min-height: $altrex-touchTarget-minimum
  padding: $altrex-spacing-2
  text-align: center
  border: 1px solid var(--altrex-colors-neutral-300)
  border-radius: $altrex-borderRadius-default
  font-size: 16px
  background: var(--altrex-colors-neutral-50)
  color: var(--altrex-colors-neutral-900)

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

  // Remove spinner on number input
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button
    -webkit-appearance: none
    margin: 0

  &[type="number"]
    -moz-appearance: textfield

.altrex-pagination__jumper-button
  min-height: $altrex-touchTarget-minimum
  padding: 0 $altrex-spacing-4
  background: $altrex-colors-primary-500
  color: white
  border: none
  border-radius: $altrex-borderRadius-default
  font-size: 16px
  font-weight: $altrex-fontWeight-medium
  cursor: pointer
  transition: all $altrex-transition-default

  +above('md')
    min-height: 36px
    padding: 0 $altrex-spacing-3
    font-size: $altrex-fontSize-sm

  &:hover
    background: $altrex-colors-primary-600

  &:focus-visible
    outline: 2px solid $altrex-colors-primary-500
    outline-offset: 2px

  +touch-device()
    &:active
      transform: scale(0.98)

// ========================================
// SIZE VARIANTS
// ========================================

.altrex-pagination--s
  .altrex-pagination__button
    min-height: 36px
    padding: 0 $altrex-spacing-2

    +above('md')
      min-height: 32px

  .altrex-pagination__jumper-input,
  .altrex-pagination__jumper-button
    min-height: 36px

    +above('md')
      min-height: 32px

.altrex-pagination--l
  .altrex-pagination__button
    min-height: $altrex-touchTarget-comfortable
    padding: 0 $altrex-spacing-4

    +above('md')
      min-height: 44px

  .altrex-pagination__jumper-input,
  .altrex-pagination__jumper-button
    min-height: $altrex-touchTarget-comfortable

    +above('md')
      min-height: 44px

// ========================================
// REDUCED MOTION
// ========================================

@media (prefers-reduced-motion: reduce)
  .altrex-pagination__button
    transition: none
</style>
