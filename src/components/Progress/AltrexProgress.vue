<template>
  <div
    class="altrex-progress"
    :class="[
      `altrex-progress--${variant}`,
      `altrex-progress--${type}`,
      { 'altrex-progress--striped': striped },
      { 'altrex-progress--animated': animated }
    ]"
    role="progressbar"
    :aria-valuenow="value"
    :aria-valuemin="0"
    :aria-valuemax="max"
    :aria-label="ariaLabel"
  >
    <!-- Linear Progress -->
    <template v-if="type === 'linear'">
      <div class="altrex-progress__track">
        <div
          class="altrex-progress__fill"
          :style="{ width: percentage + '%' }"
        >
          <span v-if="showLabel" class="altrex-progress__label">
            {{ labelText }}
          </span>
        </div>
      </div>
      <span v-if="showLabel && labelPosition === 'outside'" class="altrex-progress__label-outside">
        {{ labelText }}
      </span>
    </template>

    <!-- Circular Progress -->
    <template v-else-if="type === 'circular'">
      <svg
        class="altrex-progress__circle"
        :width="circularSize"
        :height="circularSize"
        :viewBox="`0 0 ${circularSize} ${circularSize}`"
      >
        <!-- Background circle -->
        <circle
          class="altrex-progress__circle-bg"
          :cx="circularSize / 2"
          :cy="circularSize / 2"
          :r="radius"
          :stroke-width="strokeWidth"
          fill="none"
        />
        <!-- Progress circle -->
        <circle
          class="altrex-progress__circle-fill"
          :cx="circularSize / 2"
          :cy="circularSize / 2"
          :r="radius"
          :stroke-width="strokeWidth"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeDashoffset"
          fill="none"
        />
      </svg>
      <div v-if="showLabel" class="altrex-progress__circle-label">
        {{ labelText }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'AltrexProgress',
  props: {
    value: {
      type: Number,
      default: 0,
      validator: (value) => value >= 0
    },
    max: {
      type: Number,
      default: 100,
      validator: (value) => value > 0
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'success', 'warning', 'danger', 'info'].includes(value)
    },
    type: {
      type: String,
      default: 'linear',
      validator: (value) => ['linear', 'circular'].includes(value)
    },
    size: {
      type: String,
      default: 'm',
      validator: (value) => ['s', 'm', 'l'].includes(value)
    },
    striped: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: false
    },
    showLabel: {
      type: Boolean,
      default: false
    },
    labelPosition: {
      type: String,
      default: 'inside',
      validator: (value) => ['inside', 'outside'].includes(value)
    },
    labelFormat: {
      type: String,
      default: 'percentage',
      validator: (value) => ['percentage', 'value', 'custom'].includes(value)
    },
    customLabel: {
      type: String,
      default: ''
    },
    ariaLabel: {
      type: String,
      default: 'Progress'
    },
    // Circular specific props
    circularSize: {
      type: Number,
      default: 120
    },
    strokeWidth: {
      type: Number,
      default: 8
    }
  },
  computed: {
    percentage() {
      return Math.min(Math.max((this.value / this.max) * 100, 0), 100)
    },
    labelText() {
      if (this.customLabel) {
        return this.customLabel
      }
      switch (this.labelFormat) {
        case 'percentage':
          return `${Math.round(this.percentage)}%`
        case 'value':
          return `${this.value} / ${this.max}`
        default:
          return `${Math.round(this.percentage)}%`
      }
    },
    radius() {
      return (this.circularSize - this.strokeWidth) / 2
    },
    circumference() {
      return 2 * Math.PI * this.radius
    },
    strokeDashoffset() {
      return this.circumference - (this.percentage / 100) * this.circumference
    }
  }
}
</script>

<style lang="stylus" scoped>
.altrex-progress
  position: relative
  width: 100%

  // Linear type
  &--linear
    display: flex
    align-items: center
    gap: $altrex-spacing-3

    &.altrex-progress--s
      .altrex-progress__track
        height: 4px

    &.altrex-progress--m
      .altrex-progress__track
        height: 8px

    &.altrex-progress--l
      .altrex-progress__track
        height: 12px

  // Circular type
  &--circular
    display: inline-flex
    position: relative
    align-items: center
    justify-content: center
    width: auto

  // Variant colors
  &--primary
    --altrex-progress-color $altrex-colors-primary-500

  &--success
    --altrex-progress-color $altrex-colors-success-500

  &--warning
    --altrex-progress-color $altrex-colors-warning-500

  &--danger
    --altrex-progress-color $altrex-colors-danger-500

  &--info
    --altrex-progress-color $altrex-colors-info-500

.altrex-progress__track
  flex: 1
  background: var(--altrex-colors-neutral-200)
  border-radius: 999px
  overflow: hidden
  position: relative

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-border-subtle)

.altrex-progress__fill
  height: 100%
  background: var(--altrex-progress-color)
  border-radius: 999px
  transition: width 0.3s ease
  display: flex
  align-items: center
  justify-content: center
  position: relative

  // Striped pattern
  .altrex-progress--striped &
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    )
    background-size: 1rem 1rem

  // Animated stripes
  .altrex-progress--animated.altrex-progress--striped &
    animation: altrex-progress-stripes 1s linear infinite

.altrex-progress__label
  font-size: $altrex-fontSize-xs
  font-weight: $altrex-fontWeight-semibold
  color: var(--altrex-colors-neutral-50)
  white-space: nowrap
  padding: 0 $altrex-spacing-2

.altrex-progress__label-outside
  font-size: $altrex-fontSize-sm
  font-weight: $altrex-fontWeight-medium
  color: var(--altrex-colors-neutral-700)
  white-space: nowrap

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-secondary)

// Circular progress
.altrex-progress__circle
  transform: rotate(-90deg)

.altrex-progress__circle-bg
  stroke: var(--altrex-colors-neutral-200)

  [data-theme="dark"] &
    stroke: var(--altrex-colors-dark-border-subtle)

.altrex-progress__circle-fill
  stroke: var(--altrex-progress-color)
  stroke-linecap: round
  transition: stroke-dashoffset 0.3s ease

.altrex-progress__circle-label
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  font-size: $altrex-fontSize-lg
  font-weight: $altrex-fontWeight-semibold
  color: var(--altrex-colors-neutral-700)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-secondary)

// Animations
@keyframes altrex-progress-stripes
  from
    background-position: 1rem 0
  to
    background-position: 0 0
</style>
