<template>
  <div class="altrex-toggle-wrapper" :class="wrapperClasses">
    <label :for="toggleId" class="altrex-toggle-container">
      <span v-if="leftLabel || $slots.leftLabel" class="altrex-toggle-left-label">
        <slot name="leftLabel">{{ leftLabel }}</slot>
      </span>

      <div class="altrex-toggle-switch">
        <input
          :id="toggleId"
          ref="toggleRef"
          type="checkbox"
          :checked="modelValue"
          :disabled="disabled"
          :required="required"
          class="altrex-toggle-input"
          @change="handleChange"
        />

        <span class="altrex-toggle-track">
          <span class="altrex-toggle-thumb"></span>
        </span>
      </div>

      <span v-if="label || rightLabel || $slots.default || $slots.rightLabel" class="altrex-toggle-right-label">
        <slot name="rightLabel">
          <slot>{{ label || rightLabel }}</slot>
        </slot>
      </span>
    </label>

    <div v-if="error || $slots.hint" class="altrex-toggle-message">
      <div v-if="error" class="altrex-toggle-error">
        <AltrexIcon icon="generic-x-circle" size="s" />
        <span>{{ error }}</span>
      </div>
      <div v-else class="altrex-toggle-hint">
        <slot name="hint"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import AltrexIcon from '../Icon/AltrexIcon.vue'

let toggleIdCounter = 0

export default {
  name: 'AltrexToggle',

  components: {
    AltrexIcon
  },

  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    leftLabel: {
      type: String,
      default: ''
    },
    rightLabel: {
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
    }
  },

  emits: ['update:modelValue', 'change'],

  data() {
    return {
      toggleId: `altrex-toggle-${++toggleIdCounter}`
    }
  },

  computed: {
    wrapperClasses() {
      return {
        [`altrex-toggle-size-${this.size}`]: true,
        'altrex-toggle-disabled': this.disabled,
        'altrex-toggle-error-state': this.error,
        'altrex-toggle-checked': this.modelValue
      }
    }
  },

  methods: {
    handleChange(event) {
      const checked = event.target.checked
      this.$emit('update:modelValue', checked)
      this.$emit('change', checked)
    }
  }
}
</script>

<style lang="stylus" scoped>
.altrex-toggle-wrapper
  display: flex
  flex-direction: column
  gap: $altrex-spacing-2

.altrex-toggle-container
  display: inline-flex
  align-items: center
  gap: $altrex-spacing-3
  cursor: pointer
  user-select: none

  // Mobile-first: WCAG AAA touch target
  // Visual toggle stays same size, but container has 44px min-height
  min-height: $altrex-touchTarget-minimum
  padding: 10px 0 // Add padding for touch area

  // Desktop: more compact
  +above('md')
    min-height: auto;
    padding: $altrex-spacing-1 0;

  .altrex-toggle-disabled &
    cursor: not-allowed
    opacity: 0.6

.altrex-toggle-input
  position: absolute
  opacity: 0
  width: 0
  height: 0
  pointer-events: none

.altrex-toggle-switch
  position: relative
  display: flex
  align-items: center

.altrex-toggle-track
  position: relative
  display: block
  background: var(--altrex-colors-neutral-300)
  border-radius: 9999px
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1)
  transition: background 0.2s ease
  flex-shrink: 0

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-border-subtle)
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3)

  // Checked state
  .altrex-toggle-checked &
    background: var(--altrex-colors-primary-500)

    [data-theme="dark"] &
      background: var(--altrex-colors-primary-600)

  // Hover state
  .altrex-toggle-container:hover:not(.altrex-toggle-disabled &) &
    background: var(--altrex-colors-neutral-400)

    [data-theme="dark"] &
      background: var(--altrex-colors-dark-border-default)

  .altrex-toggle-checked .altrex-toggle-container:hover:not(.altrex-toggle-disabled &) &
    background: var(--altrex-colors-primary-600)

    [data-theme="dark"] &
      background: var(--altrex-colors-primary-700)

  // Focus state
  .altrex-toggle-input:focus + &
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1)

  // Error state
  .altrex-toggle-error-state &
    background: var(--altrex-colors-danger-400)

  // Sizes
  .altrex-toggle-size-s &
    width: 32px
    height: 18px

  .altrex-toggle-size-m &
    width: 44px
    height: 24px

  .altrex-toggle-size-l &
    width: 56px
    height: 30px

.altrex-toggle-thumb
  position: absolute
  top: 2px
  left: 2px
  background: white
  border-radius: 50%
  transition: transform 0.2s ease
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.15)

  // Checked state
  .altrex-toggle-checked &
    transform: translateX(100%)

  // Sizes
  .altrex-toggle-size-s &
    width: 14px
    height: 14px

  .altrex-toggle-size-m &
    width: 20px
    height: 20px

  .altrex-toggle-size-l &
    width: 26px
    height: 26px

.altrex-toggle-left-label,
.altrex-toggle-right-label
  color: var(--altrex-colors-neutral-900)
  line-height: 1.5

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-primary)

  .altrex-toggle-size-s &
    font-size: $altrex-fontSize-sm

  .altrex-toggle-size-m &
    font-size: $altrex-fontSize-base

  .altrex-toggle-size-l &
    font-size: $altrex-fontSize-lg

.altrex-toggle-message
  padding-left: calc(44px + $altrex-spacing-3)
  font-size: $altrex-fontSize-sm

  .altrex-toggle-size-s &
    padding-left: calc(32px + $altrex-spacing-3)
    font-size: $altrex-fontSize-xs

  .altrex-toggle-size-l &
    padding-left: calc(56px + $altrex-spacing-3)

.altrex-toggle-error,
.altrex-toggle-hint
  display: flex
  align-items: center
  gap: $altrex-spacing-2

.altrex-toggle-error
  color: var(--altrex-colors-danger-600)

  [data-theme="dark"] &
    color: var(--altrex-colors-danger-400)

.altrex-toggle-hint
  color: var(--altrex-colors-neutral-600)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-tertiary)
</style>
