<template>
  <div
    class="altrex-radio-group"
    :class="groupClasses"
    :style="themeVariables"
    role="radiogroup"
    :aria-labelledby="labelId"
    :aria-required="required"
    :aria-invalid="!!error"
  >
    <!-- Group Label -->
    <label
      v-if="label"
      :id="labelId"
      class="altrex-radio-group__label"
    >
      {{ label }}
      <span v-if="required" class="altrex-radio-group__required" aria-label="required">*</span>
    </label>

    <!-- Radio Options -->
    <div class="altrex-radio-group__options">
      <label
        v-for="option in normalizedOptions"
        :key="option.value"
        class="altrex-radio"
        :class="{
          'altrex-radio--checked': isChecked(option.value),
          'altrex-radio--disabled': disabled || option.disabled
        }"
      >
        <input
          type="radio"
          class="altrex-radio__input"
          :name="name"
          :value="option.value"
          :checked="isChecked(option.value)"
          :disabled="disabled || option.disabled"
          :aria-describedby="error ? errorId : undefined"
          @change="handleChange(option.value)"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <span class="altrex-radio__control" aria-hidden="true"></span>
        <span class="altrex-radio__label">
          <slot :name="`label-${option.value}`" :option="option">
            {{ option.label }}
          </slot>
        </span>
      </label>
    </div>

    <!-- Error Message -->
    <div
      v-if="error"
      :id="errorId"
      class="altrex-radio-group__error"
      role="alert"
    >
      <AltrexIcon icon="generic-circle-x" class="altrex-radio-group__error-icon" />
      {{ error }}
    </div>
  </div>
</template>

<script>
import styling from '@/utils/styling'
import AltrexIcon from '../Icon/AltrexIcon.vue'

export default {
  name: 'AltrexRadio',
  components: {
    AltrexIcon
  },
  mixins: [styling],
  props: {
    /**
     * The current selected value (v-model)
     */
    modelValue: {
      type: [String, Number, Boolean],
      default: null
    },
    /**
     * Array of options: [{ label, value, disabled }] or simple array of values
     */
    options: {
      type: Array,
      required: true,
      validator: (value) => value.length > 0
    },
    /**
     * Group label
     */
    label: {
      type: String,
      default: ''
    },
    /**
     * Name attribute for the radio group
     */
    name: {
      type: String,
      required: true
    },
    /**
     * Layout direction: 'vertical' or 'horizontal'
     */
    direction: {
      type: String,
      default: 'vertical',
      validator: (value) => ['vertical', 'horizontal'].includes(value)
    },
    /**
     * Disable all radio buttons
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Mark as required
     */
    required: {
      type: Boolean,
      default: false
    },
    /**
     * Error message
     */
    error: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      themePrefix: 'altrex-radio',
      isFocused: false
    }
  },
  computed: {
    groupClasses() {
      return {
        'altrex-radio-group--horizontal': this.direction === 'horizontal',
        'altrex-radio-group--disabled': this.disabled,
        'altrex-radio-group--error': !!this.error,
        'altrex-radio-group--focused': this.isFocused
      }
    },
    normalizedOptions() {
      return this.options.map(option => {
        if (typeof option === 'object' && option !== null) {
          return {
            label: option.label || option.value,
            value: option.value,
            disabled: option.disabled || false
          }
        }
        return {
          label: String(option),
          value: option,
          disabled: false
        }
      })
    },
    labelId() {
      return `altrex-radio-label-${this._uid}`
    },
    errorId() {
      return `altrex-radio-error-${this._uid}`
    }
  },
  methods: {
    isChecked(value) {
      return this.modelValue === value
    },
    handleChange(value) {
      if (!this.disabled) {
        this.$emit('update:modelValue', value)
        this.$emit('change', value)
      }
    },
    handleFocus() {
      this.isFocused = true
      this.$emit('focus')
    },
    handleBlur() {
      this.isFocused = false
      this.$emit('blur')
    }
  }
}
</script>

<style lang="stylus" scoped>
// ========================================
// RADIO GROUP CONTAINER
// ========================================

.altrex-radio-group
  display: flex
  flex-direction: column
  gap: $altrex-spacing-3

  // Horizontal layout (mobile-first: still vertical)
  &--horizontal
    flex-direction: column

    // Tablet+: horizontal
    +above('md')
      .altrex-radio-group__options
        flex-direction: row
        gap: $altrex-spacing-6

  &--disabled
    opacity: 0.6
    cursor: not-allowed

  // Group label
  &__label
    font-size: 16px
    font-weight: $altrex-fontWeight-medium
    color: var(--altrex-radio-label-color, var(--altrex-colors-neutral-900))
    margin-bottom: $altrex-spacing-1

    [data-theme="dark"] &
      color: var(--altrex-radio-label-color, var(--altrex-colors-dark-text-primary))

    +above('md')
      font-size: $altrex-fontSize-base

  &__required
    color: var(--altrex-radio-required-color, $altrex-colors-danger-500)
    margin-left: $altrex-spacing-1

  // Options container
  &__options
    display: flex
    flex-direction: column
    gap: $altrex-spacing-3

  // Error message
  &__error
    display: flex
    align-items: center
    gap: $altrex-spacing-2
    font-size: $altrex-fontSize-sm
    color: var(--altrex-radio-error-color, $altrex-colors-danger-500)
    margin-top: $altrex-spacing-1

  &__error-icon
    flex-shrink: 0
    altrex-icon-s()

// ========================================
// INDIVIDUAL RADIO BUTTON
// ========================================

.altrex-radio
  // Mobile: Large touch area
  display: flex
  align-items: center
  min-height: $altrex-touchTarget-minimum
  cursor: pointer
  user-select: none
  position: relative

  // Desktop: More compact
  +above('md')
    min-height: 32px

  // Disabled state
  &--disabled
    cursor: not-allowed
    opacity: 0.6

  // Hide native radio input
  &__input
    position: absolute
    opacity: 0
    width: 0
    height: 0
    pointer-events: none

  // Custom radio control (visual circle)
  &__control
    // Mobile: Larger visual radio
    width: 24px
    height: 24px
    border: 2px solid var(--altrex-radio-border-color, $altrex-colors-neutral-400)
    border-radius: 50%
    flex-shrink: 0
    display: flex
    align-items: center
    justify-content: center
    transition: all $altrex-transition-default
    background: var(--altrex-radio-background, $altrex-colors-neutral-50)
    position: relative

    [data-theme="dark"] &
      border-color: var(--altrex-radio-border-color, var(--altrex-colors-dark-border-default))
      background: var(--altrex-radio-background, var(--altrex-colors-dark-bg-input))

    // Desktop: Slightly smaller
    +above('md')
      width: 20px
      height: 20px

    // Inner dot when checked (using ::after)
    &::after
      content: ''
      width: 12px
      height: 12px
      border-radius: 50%
      background: var(--altrex-radio-dot-color, $altrex-colors-primary-500)
      transform: scale(0)
      transition: transform $altrex-transition-default

      +above('md')
        width: 10px
        height: 10px

  // Checked state
  &--checked &__control
    border-color: var(--altrex-radio-border-color-checked, $altrex-colors-primary-500)

    &::after
      transform: scale(1)

  // Focus state
  &__input:focus-visible + &__control
    outline: 2px solid var(--altrex-radio-outline-color, $altrex-colors-primary-500)
    outline-offset: 2px

  // Hover state (desktop only)
  &:hover:not(&--disabled) &__control
    border-color: var(--altrex-radio-border-color-hover, $altrex-colors-primary-400)

    [data-theme="dark"] &
      border-color: var(--altrex-radio-border-color-hover, $altrex-colors-primary-400)

  // Radio label text
  &__label
    margin-left: $altrex-spacing-3
    font-size: 16px
    color: var(--altrex-radio-text-color, var(--altrex-colors-neutral-900))
    line-height: 1.5

    [data-theme="dark"] &
      color: var(--altrex-radio-text-color, var(--altrex-colors-dark-text-primary))

    +above('md')
      font-size: $altrex-fontSize-base

  // Touch feedback
  +touch-device()
    &:active:not(.altrex-radio--disabled)
      .altrex-radio__control
        background: var(--altrex-radio-background-active, rgba(0, 0, 0, 0.05))

        [data-theme="dark"] &
          background: var(--altrex-radio-background-active, rgba(255, 255, 255, 0.1))

// ========================================
// REDUCED MOTION
// ========================================

@media (prefers-reduced-motion: reduce)
  .altrex-radio__control
    transition: none

    &::after
      transition: none
</style>
