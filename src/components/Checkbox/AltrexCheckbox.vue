<template>
  <div class="altrex-checkbox-wrapper" :class="wrapperClasses">
    <label :for="checkboxId" class="altrex-checkbox-container">
      <input
        :id="checkboxId"
        ref="checkboxRef"
        type="checkbox"
        :checked="isChecked"
        :value="value"
        :disabled="disabled"
        :required="required"
        class="altrex-checkbox-input"
        @change="handleChange"
      />

      <span class="altrex-checkbox-box">
        <AltrexIcon
          v-if="isChecked && !indeterminate"
          icon="generic-check"
          size="s"
          class="altrex-checkbox-icon"
        />
        <span
          v-else-if="indeterminate"
          class="altrex-checkbox-indeterminate"
        ></span>
      </span>

      <span v-if="label || $slots.default" class="altrex-checkbox-label">
        <slot>{{ label }}</slot>
      </span>
    </label>

    <div v-if="error || $slots.hint" class="altrex-checkbox-message">
      <div v-if="error" class="altrex-checkbox-error">
        <AltrexIcon icon="generic-x-circle" size="s" />
        <span>{{ error }}</span>
      </div>
      <div v-else class="altrex-checkbox-hint">
        <slot name="hint"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import AltrexIcon from '../Icon/AltrexIcon.vue'

let checkboxIdCounter = 0

export default {
  name: 'AltrexCheckbox',

  components: {
    AltrexIcon
  },

  props: {
    modelValue: {
      type: [Boolean, Array],
      default: false
    },
    value: {
      type: [String, Number, Boolean, Object],
      default: undefined
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'm',
      validator: (value) => ['s', 'm', 'l'].includes(value)
    },
    error: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    }
  },

  emits: ['update:modelValue', 'change'],

  data() {
    return {
      checkboxId: `altrex-checkbox-${++checkboxIdCounter}`
    }
  },

  computed: {
    wrapperClasses() {
      return {
        [`altrex-checkbox-size-${this.size}`]: true,
        'altrex-checkbox-disabled': this.disabled,
        'altrex-checkbox-error-state': this.error,
        'altrex-checkbox-checked': this.isChecked,
        'altrex-checkbox-indeterminate': this.indeterminate
      }
    },

    isChecked() {
      if (Array.isArray(this.modelValue)) {
        return this.modelValue.includes(this.value)
      }
      return this.modelValue === true
    }
  },

  watch: {
    indeterminate(val) {
      if (this.$refs.checkboxRef) {
        this.$refs.checkboxRef.indeterminate = val
      }
    }
  },

  mounted() {
    if (this.$refs.checkboxRef && this.indeterminate) {
      this.$refs.checkboxRef.indeterminate = true
    }
  },

  methods: {
    handleChange(event) {
      const checked = event.target.checked

      if (Array.isArray(this.modelValue)) {
        // Checkbox group behavior
        const newValue = [...this.modelValue]

        if (checked) {
          if (!newValue.includes(this.value)) {
            newValue.push(this.value)
          }
        } else {
          const index = newValue.indexOf(this.value)
          if (index > -1) {
            newValue.splice(index, 1)
          }
        }

        this.$emit('update:modelValue', newValue)
        this.$emit('change', newValue)
      } else {
        // Single checkbox behavior
        this.$emit('update:modelValue', checked)
        this.$emit('change', checked)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.altrex-checkbox-wrapper
  display: flex
  flex-direction: column
  gap: $altrex-spacing-2

.altrex-checkbox-container
  display: inline-flex
  align-items: center
  gap: $altrex-spacing-2
  cursor: pointer
  user-select: none
  position: relative

  // Mobile-first: WCAG AAA touch target for checkbox area
  // Visual checkbox stays ~20px, but hit area is 44px
  min-height: $altrex-touchTarget-minimum
  padding: 12px 0 // Add vertical padding for touch area

  // Desktop: more compact
  +above('md')
    min-height: auto;
    padding: $altrex-spacing-1 0;

  .altrex-checkbox-disabled &
    cursor: not-allowed
    opacity: 0.6

.altrex-checkbox-input
  position: absolute
  opacity: 0
  width: 0
  height: 0
  pointer-events: none

.altrex-checkbox-box
  display: flex
  align-items: center
  justify-content: center
  border: 2px solid var(--altrex-colors-neutral-400)
  border-radius: $altrex-borderRadius-sm
  background: #ffffff
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05)
  transition: all 0.2s ease
  flex-shrink: 0

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-elevated)
    border-color: var(--altrex-colors-dark-border-default)
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2)

  .altrex-checkbox-size-s &
    width: 16px
    height: 16px

  .altrex-checkbox-size-m &
    width: 20px
    height: 20px

  .altrex-checkbox-size-l &
    width: 24px
    height: 24px

  // Hover state
  .altrex-checkbox-container:hover:not(.altrex-checkbox-disabled &) &
    border-color: var(--altrex-colors-primary-500)

  // Checked state
  .altrex-checkbox-checked &
    background: var(--altrex-colors-primary-500)
    border-color: var(--altrex-colors-primary-500)

    [data-theme="dark"] &
      background: var(--altrex-colors-primary-600)
      border-color: var(--altrex-colors-primary-600)

  // Indeterminate state
  .altrex-checkbox-indeterminate &
    background: var(--altrex-colors-primary-500)
    border-color: var(--altrex-colors-primary-500)

  // Error state
  .altrex-checkbox-error-state &
    border-color: var(--altrex-colors-danger-500)

  // Focus state
  .altrex-checkbox-input:focus + &
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1)

.altrex-checkbox-icon
  color: white

.altrex-checkbox-indeterminate
  width: 10px
  height: 2px
  background: white
  border-radius: 1px

  .altrex-checkbox-size-s &
    width: 8px

  .altrex-checkbox-size-l &
    width: 12px

.altrex-checkbox-label
  color: var(--altrex-colors-neutral-900)
  line-height: 1.5

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-primary)

  .altrex-checkbox-size-s &
    font-size: $altrex-fontSize-sm

  .altrex-checkbox-size-m &
    font-size: $altrex-fontSize-base

  .altrex-checkbox-size-l &
    font-size: $altrex-fontSize-lg

.altrex-checkbox-message
  padding-left: calc(20px + $altrex-spacing-2)
  font-size: $altrex-fontSize-sm

  .altrex-checkbox-size-s &
    padding-left: calc(16px + $altrex-spacing-2)
    font-size: $altrex-fontSize-xs

  .altrex-checkbox-size-l &
    padding-left: calc(24px + $altrex-spacing-2)

.altrex-checkbox-error,
.altrex-checkbox-hint
  display: flex
  align-items: center
  gap: $altrex-spacing-2

.altrex-checkbox-error
  color: var(--altrex-colors-danger-600)

  [data-theme="dark"] &
    color: var(--altrex-colors-danger-400)

.altrex-checkbox-hint
  color: var(--altrex-colors-neutral-600)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-tertiary)
</style>
