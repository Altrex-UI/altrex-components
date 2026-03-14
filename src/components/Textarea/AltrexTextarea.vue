<template>
  <div class="altrex-textarea-wrapper" :class="wrapperClasses">
    <label v-if="label" :for="textareaId" class="altrex-textarea-label">
      {{ label }}
      <span v-if="required" class="altrex-textarea-required">*</span>
    </label>

    <div class="altrex-textarea-container">
      <textarea
        :id="textareaId"
        ref="textareaRef"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :rows="computedRows"
        :maxlength="maxlength"
        :required="required"
        class="altrex-textarea"
        :class="textareaClasses"
        :style="textareaStyle"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      ></textarea>
    </div>

    <div v-if="showCharCount || error || success || $slots.hint" class="altrex-textarea-footer">
      <div class="altrex-textarea-message">
        <div v-if="error" class="altrex-textarea-error">
          <AltrexIcon icon="generic-x-circle" size="s" />
          <span>{{ error }}</span>
        </div>
        <div v-else-if="success" class="altrex-textarea-success">
          <AltrexIcon icon="generic-check-circle" size="s" />
          <span>{{ success }}</span>
        </div>
        <div v-else-if="$slots.hint" class="altrex-textarea-hint">
          <slot name="hint"></slot>
        </div>
      </div>

      <div v-if="showCharCount && maxlength" class="altrex-textarea-count">
        {{ charCount }}/{{ maxlength }}
      </div>
    </div>
  </div>
</template>

<script>
import AltrexIcon from '../Icon/AltrexIcon.vue'

let textareaIdCounter = 0

export default {
  name: 'AltrexTextarea',

  components: {
    AltrexIcon
  },

  props: {
    modelValue: {
      type: String,
      default: ''
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
    rows: {
      type: Number,
      default: 3
    },
    maxlength: {
      type: Number,
      default: undefined
    },
    resize: {
      type: String,
      default: 'vertical',
      validator: (value) => ['none', 'both', 'horizontal', 'vertical'].includes(value)
    },
    autosize: {
      type: Boolean,
      default: false
    },
    minRows: {
      type: Number,
      default: 3
    },
    maxRows: {
      type: Number,
      default: undefined
    },
    required: {
      type: Boolean,
      default: false
    },
    showCharCount: {
      type: Boolean,
      default: false
    }
  },

  emits: ['update:modelValue', 'focus', 'blur', 'input'],

  data() {
    return {
      textareaId: `altrex-textarea-${++textareaIdCounter}`,
      isFocused: false,
      computedRows: this.rows
    }
  },

  computed: {
    wrapperClasses() {
      return {
        [`altrex-textarea-size-${this.size}`]: true,
        'altrex-textarea-disabled': this.disabled,
        'altrex-textarea-readonly': this.readonly,
        'altrex-textarea-error-state': this.error,
        'altrex-textarea-success-state': this.success,
        'altrex-textarea-focused': this.isFocused
      }
    },
    textareaClasses() {
      return {
        'altrex-textarea-autosize': this.autosize
      }
    },
    textareaStyle() {
      return {
        resize: this.autosize ? 'none' : this.resize
      }
    },
    charCount() {
      return this.modelValue ? this.modelValue.length : 0
    }
  },

  watch: {
    modelValue() {
      if (this.autosize) {
        this.$nextTick(() => {
          this.adjustHeight()
        })
      }
    }
  },

  mounted() {
    if (this.autosize) {
      this.adjustHeight()
    }
  },

  methods: {
    handleInput(event) {
      const value = event.target.value
      this.$emit('update:modelValue', value)
      this.$emit('input', value)

      if (this.autosize) {
        this.adjustHeight()
      }
    },

    handleFocus(event) {
      this.isFocused = true
      this.$emit('focus', event)
    },

    handleBlur(event) {
      this.isFocused = false
      this.$emit('blur', event)
    },

    adjustHeight() {
      if (!this.autosize || !this.$refs.textareaRef) return

      const textarea = this.$refs.textareaRef

      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto'

      // Calculate new height based on content
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight)
      const minHeight = this.minRows * lineHeight
      const maxHeight = this.maxRows ? this.maxRows * lineHeight : Infinity

      let newHeight = textarea.scrollHeight

      // Apply constraints
      if (newHeight < minHeight) {
        newHeight = minHeight
      }
      if (this.maxRows && newHeight > maxHeight) {
        newHeight = maxHeight
      }

      textarea.style.height = `${newHeight}px`
    },

    focus() {
      this.$refs.textareaRef?.focus()
    },

    blur() {
      this.$refs.textareaRef?.blur()
    }
  }
}
</script>

<style lang="stylus" scoped>
.altrex-textarea-wrapper
  display: flex
  flex-direction: column
  gap: $altrex-spacing-2
  width: 100%

.altrex-textarea-label
  font-size: $altrex-fontSize-sm
  font-weight: $altrex-fontWeight-medium
  color: var(--altrex-colors-neutral-700)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-secondary)

  .altrex-textarea-required
    color: var(--altrex-colors-danger-500)
    margin-left: $altrex-spacing-1

.altrex-textarea-container
  position: relative

.altrex-textarea
  width: 100%
  border: 2px solid var(--altrex-colors-neutral-300)
  border-radius: $altrex-borderRadius-default
  background: #ffffff
  color: var(--altrex-colors-neutral-900)
  font-family: inherit
  outline: none
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08)
  transition: all 0.2s ease
  resize: vertical

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-elevated)
    border-color: var(--altrex-colors-dark-border-default)
    color: var(--altrex-colors-dark-text-primary)
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3)

  &::placeholder
    color: var(--altrex-colors-neutral-400)

  &:hover:not(:disabled):not(:readonly)
    border-color: var(--altrex-colors-primary-400)
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12)

    [data-theme="dark"] &
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4)

  &:focus
    border-color: var(--altrex-colors-primary-500)
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1), 0 2px 8px rgba(0, 0, 0, 0.12)

    [data-theme="dark"] &
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2), 0 2px 8px rgba(0, 0, 0, 0.4)

  .altrex-textarea-error-state &
    border-color: var(--altrex-colors-danger-500)

    &:focus
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1)

  .altrex-textarea-success-state &
    border-color: var(--altrex-colors-success-500)

  &:disabled
    cursor: not-allowed
    opacity: 0.6
    background: var(--altrex-colors-neutral-100)

    [data-theme="dark"] &
      background: var(--altrex-colors-dark-bg-base)

  &:readonly
    cursor: default

  .altrex-textarea-size-s &
    padding: $altrex-spacing-2 $altrex-spacing-3
    font-size: $altrex-fontSize-sm
    line-height: 1.5

  .altrex-textarea-size-m &
    padding: $altrex-spacing-3 $altrex-spacing-4
    font-size: $altrex-fontSize-base
    line-height: 1.5

  .altrex-textarea-size-l &
    padding: $altrex-spacing-4 $altrex-spacing-5
    font-size: $altrex-fontSize-lg
    line-height: 1.5

.altrex-textarea-footer
  display: flex
  justify-content: space-between
  align-items: flex-start
  gap: $altrex-spacing-4

.altrex-textarea-message
  flex: 1
  font-size: $altrex-fontSize-sm

  .altrex-textarea-size-s &
    font-size: $altrex-fontSize-xs

.altrex-textarea-error,
.altrex-textarea-success,
.altrex-textarea-hint
  display: flex
  align-items: center
  gap: $altrex-spacing-2

.altrex-textarea-error
  color: var(--altrex-colors-danger-600)

  [data-theme="dark"] &
    color: var(--altrex-colors-danger-400)

.altrex-textarea-success
  color: var(--altrex-colors-success-600)

  [data-theme="dark"] &
    color: var(--altrex-colors-success-400)

.altrex-textarea-hint
  color: var(--altrex-colors-neutral-600)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-tertiary)

.altrex-textarea-count
  font-size: $altrex-fontSize-xs
  color: var(--altrex-colors-neutral-500)
  white-space: nowrap
  font-variant-numeric: tabular-nums

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-tertiary)

  .altrex-textarea-error-state &
    color: var(--altrex-colors-danger-500)
</style>
