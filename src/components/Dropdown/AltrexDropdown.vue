<template>
  <div
    ref="dropdownWrapper"
    class="altrex-dropdown"
    :class="dropdownClasses"
    :style="themeVariables"
    @keydown="handleKeyDown"
  >
    <!-- Trigger slot -->
    <div
      ref="triggerRef"
      class="altrex-dropdown__trigger"
      :aria-expanded="isOpen"
      :aria-haspopup="true"
      :aria-disabled="disabled"
      :tabindex="disabled ? -1 : 0"
      @click="handleTriggerClick"
      @mouseenter="handleTriggerMouseEnter"
      @mouseleave="handleTriggerMouseLeave"
      @keydown.enter.prevent="handleTriggerClick"
      @keydown.space.prevent="handleTriggerClick"
      @keydown.down.prevent="openAndFocusFirst"
    >
      <slot name="trigger">
        <button
          class="altrex-dropdown__default-trigger"
          :disabled="disabled"
          tabindex="-1"
        >
          {{ triggerText }}
          <AltrexIcon
            :icon="isOpen ? 'generic-chevron-up' : 'generic-chevron-down'"
            class="altrex-dropdown__trigger-icon"
          />
        </button>
      </slot>
    </div>

    <!-- Dropdown menu (teleported to body) -->
    <Teleport to="body">
      <Transition name="altrex-dropdown-fade">
        <div
          v-if="isOpen"
          ref="menuRef"
          class="altrex-dropdown__menu"
          :class="menuClasses"
          :style="floatingStyles"
          role="menu"
          @click="handleMenuClick"
          @mouseenter="handleMenuMouseEnter"
          @mouseleave="handleMenuMouseLeave"
        >
          <div
            v-for="(item, index) in items"
            :key="item.value || index"
            :ref="el => setItemRef(el, index)"
            :class="[
              'altrex-dropdown__item',
              {
                'altrex-dropdown__item--disabled': item.disabled,
                'altrex-dropdown__item--divider': item.divider,
                'altrex-dropdown__item--focused': focusedIndex === index
              }
            ]"
            :role="item.divider ? 'separator' : 'menuitem'"
            :aria-disabled="item.disabled"
            :tabindex="item.divider || item.disabled ? -1 : 0"
            @click="!item.divider && !item.disabled && handleItemClick(item, index)"
            @mouseenter="!item.divider && !item.disabled && handleItemMouseEnter(index)"
            @keydown.enter.prevent="!item.divider && !item.disabled && handleItemClick(item, index)"
            @keydown.space.prevent="!item.divider && !item.disabled && handleItemClick(item, index)"
          >
            <template v-if="!item.divider">
              <AltrexIcon
                v-if="item.icon"
                :icon="item.icon"
                class="altrex-dropdown__item-icon"
              />
              <div class="altrex-dropdown__item-content">
                <span class="altrex-dropdown__item-label">
                  <slot :name="`item-${item.value}`" :item="item">
                    {{ item.label }}
                  </slot>
                </span>
                <span v-if="item.description" class="altrex-dropdown__item-description">
                  {{ item.description }}
                </span>
              </div>
            </template>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import AltrexIcon from '../Icon/AltrexIcon.vue'
import { useFloating, offset, flip, shift, autoUpdate } from '@altrex-ui/floating'
import { transformStylesToVariables } from '@/utils/styling'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    validator: (items) => {
      return items.every(item =>
        item.divider || (item.label && item.value !== undefined)
      )
    }
  },
  placement: {
    type: String,
    default: 'bottom-left',
    validator: (value) => [
      'top-left', 'top-right',
      'bottom-left', 'bottom-right',
      'top-start', 'top-end',
      'bottom-start', 'bottom-end'
    ].includes(value)
  },
  trigger: {
    type: String,
    default: 'click',
    validator: (value) => ['click', 'hover'].includes(value)
  },
  maxHeight: {
    type: String,
    default: '320px'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  triggerText: {
    type: String,
    default: 'Menu'
  },
  closeOnClick: {
    type: Boolean,
    default: true
  },
  styleOverrides: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['open', 'close', 'select', 'item-click'])

// Refs
const dropdownWrapper = ref(null)
const triggerRef = ref(null)
const menuRef = ref(null)
const isOpen = ref(false)
const focusedIndex = ref(-1)
const itemRefs = ref({})
const hoverTimeout = ref(null)
const isHovering = ref(false)

// Normalize placement to Floating UI format
const floatingPlacement = computed(() => {
  const placementMap = {
    'top-left': 'top-start',
    'top-right': 'top-end',
    'bottom-left': 'bottom-start',
    'bottom-right': 'bottom-end'
  }
  return placementMap[props.placement] || props.placement
})

// Setup floating positioning
const { floatingStyles, update } = useFloating(triggerRef, menuRef, {
  placement: floatingPlacement,
  middleware: [
    offset(8),
    flip(),
    shift({ padding: 8 })
  ],
  whileElementsMounted: autoUpdate
})

// Computed
const dropdownClasses = computed(() => ({
  'altrex-dropdown--open': isOpen.value,
  'altrex-dropdown--disabled': props.disabled,
  [`altrex-dropdown--${props.trigger}`]: true
}))

const menuClasses = computed(() => ({
  [`altrex-dropdown__menu--${props.placement}`]: true
}))

const themeVariables = computed(() => {
  return transformStylesToVariables(props.styleOverrides, 'altrex-dropdown')
})

// Methods
const setItemRef = (el, index) => {
  if (el) {
    itemRefs.value[index] = el
  }
}

const open = () => {
  if (props.disabled) return
  isOpen.value = true
  nextTick(() => {
    update()
    emit('open')
  })
}

const close = () => {
  isOpen.value = false
  focusedIndex.value = -1
  emit('close')
}

const toggle = () => {
  if (isOpen.value) {
    close()
  } else {
    open()
  }
}

const openAndFocusFirst = () => {
  if (!isOpen.value) {
    open()
    nextTick(() => {
      focusFirstItem()
    })
  }
}

const handleTriggerClick = () => {
  if (props.trigger === 'click') {
    toggle()
  }
}

const handleTriggerMouseEnter = () => {
  if (props.trigger === 'hover') {
    clearTimeout(hoverTimeout.value)
    isHovering.value = true
    open()
  }
}

const handleTriggerMouseLeave = () => {
  if (props.trigger === 'hover') {
    hoverTimeout.value = setTimeout(() => {
      if (!isHovering.value) {
        close()
      }
    }, 150)
  }
}

const handleMenuMouseEnter = () => {
  if (props.trigger === 'hover') {
    clearTimeout(hoverTimeout.value)
    isHovering.value = true
  }
}

const handleMenuMouseLeave = () => {
  if (props.trigger === 'hover') {
    isHovering.value = false
    hoverTimeout.value = setTimeout(() => {
      close()
    }, 150)
  }
}

const handleItemClick = (item, index) => {
  emit('item-click', { item, index })
  emit('select', item)

  if (props.closeOnClick) {
    close()
    nextTick(() => {
      triggerRef.value?.focus()
    })
  }
}

const handleItemMouseEnter = (index) => {
  focusedIndex.value = index
}

const handleMenuClick = (event) => {
  event.stopPropagation()
}

const handleKeyDown = (event) => {
  if (!isOpen.value && event.key !== 'Enter' && event.key !== ' ' && event.key !== 'ArrowDown') {
    return
  }

  switch (event.key) {
    case 'Escape':
      event.preventDefault()
      close()
      triggerRef.value?.focus()
      break

    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen.value) {
        openAndFocusFirst()
      } else {
        focusNextItem()
      }
      break

    case 'ArrowUp':
      event.preventDefault()
      if (isOpen.value) {
        focusPreviousItem()
      }
      break

    case 'Home':
      event.preventDefault()
      if (isOpen.value) {
        focusFirstItem()
      }
      break

    case 'End':
      event.preventDefault()
      if (isOpen.value) {
        focusLastItem()
      }
      break
  }
}

const focusFirstItem = () => {
  const firstIndex = props.items.findIndex(item => !item.divider && !item.disabled)
  if (firstIndex !== -1) {
    focusedIndex.value = firstIndex
    scrollToFocusedItem()
  }
}

const focusLastItem = () => {
  const lastIndex = [...props.items].reverse().findIndex(item => !item.divider && !item.disabled)
  if (lastIndex !== -1) {
    focusedIndex.value = props.items.length - 1 - lastIndex
    scrollToFocusedItem()
  }
}

const focusNextItem = () => {
  let nextIndex = focusedIndex.value + 1

  while (nextIndex < props.items.length) {
    const item = props.items[nextIndex]
    if (!item.divider && !item.disabled) {
      focusedIndex.value = nextIndex
      scrollToFocusedItem()
      return
    }
    nextIndex++
  }

  // Wrap to first
  focusFirstItem()
}

const focusPreviousItem = () => {
  let prevIndex = focusedIndex.value - 1

  while (prevIndex >= 0) {
    const item = props.items[prevIndex]
    if (!item.divider && !item.disabled) {
      focusedIndex.value = prevIndex
      scrollToFocusedItem()
      return
    }
    prevIndex--
  }

  // Wrap to last
  focusLastItem()
}

const scrollToFocusedItem = () => {
  nextTick(() => {
    const focusedElement = itemRefs.value[focusedIndex.value]
    if (focusedElement) {
      focusedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  })
}

const handleClickOutside = (event) => {
  if (!isOpen.value) return

  const triggerEl = triggerRef.value
  const menuEl = menuRef.value

  if (
    triggerEl && !triggerEl.contains(event.target) &&
    menuEl && !menuEl.contains(event.target)
  ) {
    close()
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  clearTimeout(hoverTimeout.value)
})

// Watch for items changes and update position
watch(() => props.items, () => {
  if (isOpen.value) {
    nextTick(() => update())
  }
})
</script>

<style lang="stylus" scoped>
// ========================================
// DROPDOWN WRAPPER
// ========================================
.altrex-dropdown
  position: relative
  display: inline-block

  &--disabled
    opacity: 0.5
    cursor: not-allowed
    pointer-events: none

// ========================================
// TRIGGER
// ========================================
.altrex-dropdown__trigger
  display: inline-block
  cursor: pointer

  &:focus-visible
    outline: 2px solid $altrex-colors-primary-500
    outline-offset: 2px
    border-radius: $altrex-borderRadius-default

.altrex-dropdown__default-trigger
  // Mobile-first: touch-optimized
  min-height: $altrex-touchTarget-minimum
  display: inline-flex
  align-items: center
  gap: $altrex-spacing-2
  padding: $altrex-spacing-3 $altrex-spacing-4
  background: var(--altrex-dropdown-trigger-background, var(--altrex-colors-neutral-50))
  color: var(--altrex-dropdown-trigger-color, var(--altrex-colors-neutral-900))
  border: 1px solid var(--altrex-dropdown-trigger-border, var(--altrex-colors-neutral-300))
  border-radius: $altrex-borderRadius-default
  font-size: 16px  // Prevents iOS zoom
  font-weight: $altrex-fontWeight-medium
  cursor: pointer
  transition: all $altrex-transition-default
  user-select: none

  [data-theme="dark"] &
    background: var(--altrex-dropdown-trigger-background, var(--altrex-colors-dark-bg-input))
    color: var(--altrex-dropdown-trigger-color, var(--altrex-colors-dark-text-primary))
    border-color: var(--altrex-dropdown-trigger-border, var(--altrex-colors-dark-border-default))

  +above('md')
    min-height: 40px
    font-size: $altrex-fontSize-base

  &:hover:not(:disabled)
    background: var(--altrex-dropdown-trigger-background-hover, var(--altrex-colors-neutral-100))
    border-color: var(--altrex-dropdown-trigger-border-hover, $altrex-colors-primary-500)

    [data-theme="dark"] &
      background: var(--altrex-dropdown-trigger-background-hover, var(--altrex-colors-dark-bg-hover))

  &:disabled
    opacity: 0.5
    cursor: not-allowed

  +touch-device()
    &:active:not(:disabled)
      transform: scale(0.98)

.altrex-dropdown__trigger-icon
  altrex-icon-s()
  transition: transform $altrex-transition-default
  color: var(--altrex-dropdown-trigger-icon-color, var(--altrex-colors-neutral-600))

  [data-theme="dark"] &
    color: var(--altrex-dropdown-trigger-icon-color, var(--altrex-colors-dark-text-secondary))

  .altrex-dropdown--open &
    transform: rotate(180deg)

// ========================================
// MENU (FLOATING)
// ========================================
.altrex-dropdown__menu
  z-index: 1000

  // Mobile: full width with margins
  width: calc(100vw - 16px)
  max-width: 320px

  // Desktop: auto width, constrained
  +above('md')
    width: auto
    min-width: 200px

  max-height: v-bind(maxHeight)
  overflow-y: auto
  background: var(--altrex-dropdown-menu-background, var(--altrex-colors-neutral-50))
  border: 1px solid var(--altrex-dropdown-menu-border, var(--altrex-colors-neutral-200))
  border-radius: $altrex-borderRadius-lg
  box-shadow: var(--altrex-dropdown-menu-shadow, $altrex-shadow-lg)
  padding: $altrex-spacing-2

  [data-theme="dark"] &
    background: var(--altrex-dropdown-menu-background, var(--altrex-colors-dark-bg-elevated))
    border-color: var(--altrex-dropdown-menu-border, var(--altrex-colors-dark-border-default))

  // Custom scrollbar
  &::-webkit-scrollbar
    width: 8px

  &::-webkit-scrollbar-track
    background: transparent

  &::-webkit-scrollbar-thumb
    background: var(--altrex-colors-neutral-300)
    border-radius: 4px

    [data-theme="dark"] &
      background: var(--altrex-colors-dark-border-default)

    &:hover
      background: var(--altrex-colors-neutral-400)

      [data-theme="dark"] &
        background: var(--altrex-colors-dark-text-tertiary)

// ========================================
// MENU ITEMS
// ========================================
.altrex-dropdown__item
  // Mobile: touch-optimized height
  min-height: $altrex-touchTarget-minimum
  display: flex
  align-items: center
  gap: $altrex-spacing-3
  padding: $altrex-spacing-3 $altrex-spacing-4
  border-radius: $altrex-borderRadius-default
  cursor: pointer
  transition: background $altrex-transition-default
  user-select: none
  outline: none
  position: relative

  +above('md')
    min-height: 40px
    padding: $altrex-spacing-2 $altrex-spacing-3

  &:hover:not(&--disabled):not(&--divider)
    background: var(--altrex-dropdown-item-background-hover, var(--altrex-colors-neutral-100))

    [data-theme="dark"] &
      background: var(--altrex-dropdown-item-background-hover, var(--altrex-colors-dark-bg-hover))

  &--focused:not(&--disabled):not(&--divider)
    background: var(--altrex-dropdown-item-background-focus, var(--altrex-colors-neutral-100))

    [data-theme="dark"] &
      background: var(--altrex-dropdown-item-background-focus, var(--altrex-colors-dark-bg-hover))

  &--disabled
    opacity: 0.5
    cursor: not-allowed
    pointer-events: none

  &--divider
    height: 1px
    min-height: 1px
    padding: 0
    margin: $altrex-spacing-2 0
    background: var(--altrex-dropdown-divider-color, var(--altrex-colors-neutral-200))
    cursor: default
    pointer-events: none

    [data-theme="dark"] &
      background: var(--altrex-dropdown-divider-color, var(--altrex-colors-dark-border-subtle))

  +touch-device()
    &:active:not(&--disabled):not(&--divider)
      transform: scale(0.98)

.altrex-dropdown__item-icon
  altrex-icon-s()
  flex-shrink: 0
  color: var(--altrex-dropdown-item-icon-color, var(--altrex-colors-neutral-600))

  [data-theme="dark"] &
    color: var(--altrex-dropdown-item-icon-color, var(--altrex-colors-dark-text-secondary))

.altrex-dropdown__item-content
  flex: 1
  display: flex
  flex-direction: column
  gap: $altrex-spacing-1
  min-width: 0  // Allow text truncation

.altrex-dropdown__item-label
  font-size: $altrex-fontSize-sm
  font-weight: $altrex-fontWeight-medium
  color: var(--altrex-dropdown-item-label-color, var(--altrex-colors-neutral-900))
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis

  [data-theme="dark"] &
    color: var(--altrex-dropdown-item-label-color, var(--altrex-colors-dark-text-primary))

  +above('md')
    font-size: $altrex-fontSize-base

.altrex-dropdown__item-description
  font-size: $altrex-fontSize-xs
  color: var(--altrex-dropdown-item-description-color, var(--altrex-colors-neutral-600))
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis

  [data-theme="dark"] &
    color: var(--altrex-dropdown-item-description-color, var(--altrex-colors-dark-text-secondary))

  +above('md')
    font-size: $altrex-fontSize-sm

// ========================================
// TRANSITIONS
// ========================================
.altrex-dropdown-fade-enter-active,
.altrex-dropdown-fade-leave-active
  transition: opacity 0.2s ease, transform 0.2s ease

.altrex-dropdown-fade-enter-from,
.altrex-dropdown-fade-leave-to
  opacity: 0
  transform: translateY(-8px) scale(0.95)

.altrex-dropdown-fade-enter-to,
.altrex-dropdown-fade-leave-from
  opacity: 1
  transform: translateY(0) scale(1)
</style>
