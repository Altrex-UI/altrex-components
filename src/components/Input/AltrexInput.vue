<template>
  <div class="altrex-input-wrapper" :class="wrapperClasses">
    <label v-if="label" :for="inputId" class="altrex-input-label">
      {{ label }}
      <span v-if="required" class="altrex-input-required">*</span>
    </label>

    <div class="altrex-input-container">
      <div v-if="$slots.leftIcon || leftIcon" class="altrex-input-icon-left">
        <slot name="leftIcon">
          <AltrexIcon v-if="leftIcon" :icon="leftIcon" size="s" />
        </slot>
      </div>

      <div v-if="$slots.prefix" class="altrex-input-prefix">
        <slot name="prefix"></slot>
      </div>

      <input
        :id="inputId"
        ref="inputRef"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :min="min"
        :max="max"
        :step="step"
        :maxlength="maxlength"
        :required="required"
        class="altrex-input"
        :class="inputClasses"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.enter="$emit('enter', $event)"
      />

      <div v-if="$slots.suffix" class="altrex-input-suffix">
        <slot name="suffix"></slot>
      </div>

      <button
        v-if="clearable && modelValue && !disabled && !readonly"
        type="button"
        class="altrex-input-clear"
        @click="handleClear"
        tabindex="-1"
      >
        <AltrexIcon icon="generic-x" size="s" />
      </button>

      <div v-if="$slots.rightIcon || rightIcon" class="altrex-input-icon-right">
        <slot name="rightIcon">
          <AltrexIcon v-if="rightIcon" :icon="rightIcon" size="s" />
        </slot>
      </div>
    </div>

    <div v-if="error || success || $slots.hint" class="altrex-input-message">
      <div v-if="error" class="altrex-input-error">
        <AltrexIcon icon="generic-x-circle" size="s" />
        <span>{{ error }}</span>
      </div>
      <div v-else-if="success" class="altrex-input-success">
        <AltrexIcon icon="generic-check-circle" size="s" />
        <span>{{ success }}</span>
      </div>
      <div v-else class="altrex-input-hint">
        <slot name="hint"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import AltrexIcon from '../Icon/AltrexIcon.vue'

let inputIdCounter = 0

export default {
  name: 'AltrexInput',

  components: {
    AltrexIcon
  },

  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text',
      validator: (value) => ['text', 'number', 'email', 'password', 'tel', 'url', 'search'].includes(value)
    },
    size: {
      type: String,
      default: 'm',
      validator: (value) => ['s', 'm', 'l'].includes(value)
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    success: {
      type: String,
      default: ''
    },
    leftIcon: {
      type: String,
      default: ''
    },
    rightIcon: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: undefined
    },
    max: {
      type: Number,
      default: undefined
    },
    step: {
      type: Number,
      default: undefined
    },
    maxlength: {
      type: Number,
      default: undefined
    },
    required: {
      type: Boolean,
      default: false
    }
  },

  emits: ['update:modelValue', 'focus', 'blur', 'input', 'clear', 'enter'],

  data() {
    return {
      inputId: `altrex-input-${++inputIdCounter}`,
      isFocused: false
    }
  },

  computed: {
    wrapperClasses() {
      return {
        [`altrex-input-size-${this.size}`]: true,
        'altrex-input-disabled': this.disabled,
        'altrex-input-readonly': this.readonly,
        'altrex-input-error-state': this.error,
        'altrex-input-success-state': this.success,
        'altrex-input-focused': this.isFocused
      }
    },
    inputClasses() {
      return {
        'has-left-icon': this.$slots.leftIcon || this.leftIcon,
        'has-right-icon': this.$slots.rightIcon || this.rightIcon || (this.clearable && this.modelValue),
        'has-prefix': this.$slots.prefix,
        'has-suffix': this.$slots.suffix
      }
    }
  },

  methods: {
    handleInput(event) {
      let value = event.target.value

      if (this.type === 'number' && value !== '') {
        value = parseFloat(value)
        if (isNaN(value)) {
          value = this.modelValue
        }
      }

      this.$emit('update:modelValue', value)
      this.$emit('input', value)
    },

    handleFocus(event) {
      this.isFocused = true
      this.$emit('focus', event)
    },

    handleBlur(event) {
      this.isFocused = false
      this.$emit('blur', event)
    },

    handleClear() {
      this.$emit('update:modelValue', '')
      this.$emit('clear')
      this.$refs.inputRef.focus()
    },

    focus() {
      this.$refs.inputRef?.focus()
    },

    blur() {
      this.$refs.inputRef?.blur()
    }
  }
}
</script>

<style lang="stylus" scoped>
.altrex-input-wrapper
  display: flex
  flex-direction: column
  gap: $altrex-spacing-2
  width: 100%

.altrex-input-label
  font-size: $altrex-fontSize-sm
  font-weight: $altrex-fontWeight-medium
  color: var(--altrex-colors-neutral-700)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-secondary)

  .altrex-input-required
    color: var(--altrex-colors-danger-500)
    margin-left: $altrex-spacing-1

.altrex-input-container
  position: relative
  display: flex
  align-items: center
  gap: $altrex-spacing-2
  background: #ffffff
  border: 2px solid var(--altrex-colors-neutral-300)
  border-radius: $altrex-borderRadius-default
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08)
  transition: all 0.2s ease

  // Mobile-first: WCAG AAA touch target
  min-height: $altrex-touchTarget-minimum

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-elevated)
    border-color: var(--altrex-colors-dark-border-default)
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3)

  &:hover:not(.altrex-input-disabled .altrex-input-container)
    border-color: var(--altrex-colors-primary-400)
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12)

    [data-theme="dark"] &
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4)

  .altrex-input-focused &
    border-color: var(--altrex-colors-primary-500)
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1), 0 2px 8px rgba(0, 0, 0, 0.12)

    [data-theme="dark"] &
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2), 0 2px 8px rgba(0, 0, 0, 0.4)

  .altrex-input-error-state &
    border-color: var(--altrex-colors-danger-500)

    &:focus-within
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1)

  .altrex-input-success-state &
    border-color: var(--altrex-colors-success-500)

.altrex-input
  flex: 1
  min-width: 0
  border: none
  outline: none
  background: transparent
  color: var(--altrex-colors-neutral-900)
  font-family: inherit

  // Mobile: 16px minimum to prevent iOS zoom
  font-size: 16px
  padding: $altrex-spacing-3

  // Desktop: use base font size
  +above('md')
    font-size: $altrex-fontSize-base
    padding: $altrex-spacing-3 $altrex-spacing-4

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-primary)

  &::placeholder
    color: var(--altrex-colors-neutral-400)

  &:disabled
    cursor: not-allowed
    opacity: 0.6

  &:readonly
    cursor: default

  .altrex-input-size-s &
    // Mobile: still 16px to prevent zoom
    font-size: 16px
    padding: $altrex-spacing-3

    // Desktop: allow smaller
    +above('md')
      font-size: $altrex-fontSize-sm
      padding: $altrex-spacing-2 $altrex-spacing-3

  .altrex-input-size-m &
    font-size: 16px
    padding: $altrex-spacing-3 $altrex-spacing-4

    +above('md')
      font-size: $altrex-fontSize-base

  .altrex-input-size-l &
    font-size: 16px
    padding: $altrex-spacing-4 $altrex-spacing-5

    +above('md')
      font-size: $altrex-fontSize-lg

  &.has-left-icon
    padding-left: 0

  &.has-right-icon
    padding-right: 0

  &.has-prefix
    padding-left: 0

  &.has-suffix
    padding-right: 0

.altrex-input-icon-left,
.altrex-input-icon-right
  display: flex
  align-items: center
  justify-content: center
  color: var(--altrex-colors-neutral-500)
  flex-shrink: 0

  // Mobile: touch-friendly padding
  padding: 0 $altrex-spacing-3

  // Desktop: size-based padding
  +above('md')
    .altrex-input-size-s &
      padding: 0 $altrex-spacing-2

    .altrex-input-size-m &
      padding: 0 $altrex-spacing-3

    .altrex-input-size-l &
      padding: 0 $altrex-spacing-4

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-tertiary)

.altrex-input-prefix,
.altrex-input-suffix
  display: flex
  align-items: center
  color: var(--altrex-colors-neutral-600)
  font-size: $altrex-fontSize-sm
  white-space: nowrap
  flex-shrink: 0

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-tertiary)

  .altrex-input-size-s &
    padding: 0 $altrex-spacing-2

  .altrex-input-size-m &
    padding: 0 $altrex-spacing-3

  .altrex-input-size-l &
    padding: 0 $altrex-spacing-4

.altrex-input-clear
  // Always meet touch target
  touch-target('minimum')
  border: none
  background: transparent
  color: var(--altrex-colors-neutral-500)
  cursor: pointer
  flex-shrink: 0
  transition: color 0.2s ease

  // Icon visual size stays 16px
  :deep(.altrex-icon)
    altrex-icon-s()

  &:hover
    color: var(--altrex-colors-neutral-700)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-tertiary)

    &:hover
      color: var(--altrex-colors-dark-text-secondary)

  // Mobile: consistent margin
  margin-right: $altrex-spacing-2

  // Desktop: size-based margin
  +above('md')
    .altrex-input-size-s &
      margin-right: $altrex-spacing-2

    .altrex-input-size-m &
      margin-right: $altrex-spacing-3

    .altrex-input-size-l &
      margin-right: $altrex-spacing-4


.altrex-input-message
  font-size: $altrex-fontSize-sm

  .altrex-input-size-s &
    font-size: $altrex-fontSize-xs

.altrex-input-error,
.altrex-input-success,
.altrex-input-hint
  display: flex
  align-items: center
  gap: $altrex-spacing-2

.altrex-input-error
  color: var(--altrex-colors-danger-600)

  [data-theme="dark"] &
    color: var(--altrex-colors-danger-400)

.altrex-input-success
  color: var(--altrex-colors-success-600)

  [data-theme="dark"] &
    color: var(--altrex-colors-success-400)

.altrex-input-hint
  color: var(--altrex-colors-neutral-600)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-tertiary)

.altrex-input-disabled
  opacity: 0.6
  cursor: not-allowed

  .altrex-input-container
    background: var(--altrex-colors-neutral-100)

    [data-theme="dark"] &
      background: var(--altrex-colors-dark-bg-base)
</style>
