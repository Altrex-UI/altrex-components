<template>
  <Teleport to="body">
    <Transition name="altrex-modal-fade">
      <div
        v-if="modelValue"
        class="altrex-modal-overlay"
        :class="{ 'altrex-modal-persistent': persistent }"
        @click="handleOverlayClick"
        @keydown.esc="handleEscKey"
      >
        <div
          class="altrex-modal"
          :class="[
            `altrex-modal--${size}`,
            { 'altrex-modal--no-padding': noPadding }
          ]"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="ariaLabelledby"
          :aria-describedby="ariaDescribedby"
          @click.stop
        >
          <!-- Close button -->
          <button
            v-if="showClose"
            class="altrex-modal__close"
            type="button"
            aria-label="Close modal"
            @click="handleClose"
          >
            <AltrexIcon icon="generic-x" size="m" />
          </button>

          <!-- Header -->
          <div v-if="$slots.header || title" class="altrex-modal__header">
            <slot name="header">
              <h2 :id="ariaLabelledby" class="altrex-modal__title">
                {{ title }}
              </h2>
            </slot>
          </div>

          <!-- Body -->
          <div :id="ariaDescribedby" class="altrex-modal__body">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="altrex-modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import { nextTick } from 'vue'
import AltrexIcon from '../Icon/AltrexIcon.vue'

export default {
  name: 'AltrexModal',
  components: {
    AltrexIcon
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'm',
      validator: (value) => ['s', 'm', 'l', 'xl', 'full'].includes(value)
    },
    persistent: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: true
    },
    noPadding: {
      type: Boolean,
      default: false
    },
    ariaLabelledby: {
      type: String,
      default: 'modal-title'
    },
    ariaDescribedby: {
      type: String,
      default: 'modal-body'
    }
  },
  emits: ['update:modelValue', 'close', 'open'],
  watch: {
    modelValue(newVal) {
      if (newVal) {
        this.handleOpen()
      } else {
        this.handleModalClose()
      }
    }
  },
  mounted() {
    if (this.modelValue) {
      this.handleOpen()
    }
  },
  beforeUnmount() {
    this.handleModalClose()
  },
  methods: {
    handleOpen() {
      nextTick(() => {
        document.body.style.overflow = 'hidden'
        this.$emit('open')
      })
    },
    handleModalClose() {
      document.body.style.overflow = ''
    },
    handleClose() {
      this.$emit('update:modelValue', false)
      this.$emit('close')
    },
    handleOverlayClick() {
      if (!this.persistent) {
        this.handleClose()
      }
    },
    handleEscKey(event) {
      if (!this.persistent && this.modelValue) {
        event.preventDefault()
        this.handleClose()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.altrex-modal-overlay
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 1000
  display: flex
  align-items: center
  justify-content: center
  background-color: rgba(0, 0, 0, 0.5)
  overflow-y: auto

  // Mobile: minimal padding
  padding: $altrex-spacing-2

  // Desktop: more comfortable spacing
  +above('md')
    padding: $altrex-spacing-6;

  [data-theme="dark"] &
    background-color: var(--altrex-colors-dark-bg-overlay)

.altrex-modal
  position: relative
  background: var(--altrex-colors-neutral-50)
  border-radius: $altrex-borderRadius-lg
  box-shadow: $altrex-shadows-xl
  display: flex
  flex-direction: column
  width: 100%
  margin: auto

  // Mobile: full width, max 95vh height
  max-width: 100%;
  max-height: 95vh;
  overflow-y: auto;

  // Desktop: enable size variants and adjust height
  +above('lg')
    max-height: 90vh

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-elevated)
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5)

  // Size variants - only apply on tablet+
  &--s
    +above('md')
      max-width: 400px

  &--m
    +above('md')
      max-width: 600px

  &--l
    +above('md')
      max-width: 800px

  &--xl
    +above('md')
      max-width: 1000px

  &--full {
    max-width: 95vw;
    max-height: 95vh;
  }

  &--no-padding {
    .altrex-modal__body {
      padding: 0;
    }
  }

.altrex-modal__close
  position: absolute
  z-index: 10
  display: flex
  align-items: center
  justify-content: center
  padding: 0
  background: transparent
  border: none
  border-radius: $altrex-borderRadius-default
  color: var(--altrex-colors-neutral-500)
  cursor: pointer
  transition: all 0.2s ease

  // Mobile: large touch target
  width: 48px
  height: 48px
  top: $altrex-spacing-2
  right: $altrex-spacing-2

  // Desktop: more compact
  +above('md')
    width: 32px
    height: 32px
    top: $altrex-spacing-4
    right: $altrex-spacing-4

  // Icon visual stays 16px
  :deep(.altrex-icon)
    altrex-icon-s()

  &:hover
    background: var(--altrex-colors-neutral-100)
    color: var(--altrex-colors-neutral-700)

    [data-theme="dark"] &
      background: var(--altrex-colors-dark-bg-hover)
      color: var(--altrex-colors-dark-text-primary)

  &:focus
    outline: 2px solid var(--altrex-colors-primary-500)
    outline-offset: 2px

  &:active
    transform: scale(0.95)

.altrex-modal__header
  // Mobile: comfortable padding
  padding: $altrex-spacing-4
  border-bottom: 1px solid var(--altrex-colors-neutral-200)

  // Desktop: more spacious
  +above('md')
    padding: $altrex-spacing-6

  [data-theme="dark"] & {
    border-bottom-color: var(--altrex-colors-dark-border-subtle);
  }

.altrex-modal__title
  margin: 0
  font-weight: $altrex-fontWeight-semibold
  color: var(--altrex-colors-neutral-900)

  // Mobile: readable size
  font-size: $altrex-fontSize-lg

  // Desktop: larger
  +above('md')
    font-size: $altrex-fontSize-xl

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-primary)

.altrex-modal__body
  overflow-y: auto
  flex: 1
  color: var(--altrex-colors-neutral-700)

  // Mobile: comfortable padding
  padding: $altrex-spacing-4

  // Desktop: more spacious
  +above('md')
    padding: $altrex-spacing-6

  [data-theme="dark"] & {
    color: var(--altrex-colors-dark-text-secondary);
  }

.altrex-modal__footer
  border-top: 1px solid var(--altrex-colors-neutral-200)
  display: flex
  gap: $altrex-spacing-3
  justify-content: flex-end

  // Mobile: comfortable padding
  padding: $altrex-spacing-4

  // Desktop: more spacious
  +above('md')
    padding: $altrex-spacing-6

  [data-theme="dark"] & {
    border-top-color: var(--altrex-colors-dark-border-subtle);
  }

// Transition animations
.altrex-modal-fade-enter-active,
.altrex-modal-fade-leave-active
  transition: opacity 0.2s ease

.altrex-modal-fade-enter-active .altrex-modal,
.altrex-modal-fade-leave-active .altrex-modal
  transition: transform 0.2s ease, opacity 0.2s ease

.altrex-modal-fade-enter-from,
.altrex-modal-fade-leave-to
  opacity: 0

.altrex-modal-fade-enter-from .altrex-modal
  transform: scale(0.95)
  opacity: 0

.altrex-modal-fade-leave-to .altrex-modal
  transform: scale(0.95)
  opacity: 0
</style>
