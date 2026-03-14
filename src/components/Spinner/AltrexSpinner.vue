<template>
  <div
    class="altrex-spinner"
    :class="[
      `altrex-spinner--${size}`,
      `altrex-spinner--${variant}`
    ]"
    role="status"
    :aria-label="ariaLabel"
  >
    <svg
      class="altrex-spinner__svg"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="altrex-spinner__circle"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="4"
      />
    </svg>
    <span v-if="label" class="altrex-spinner__label">{{ label }}</span>
  </div>
</template>

<script>
export default {
  name: 'AltrexSpinner',
  props: {
    size: {
      type: String,
      default: 'm',
      validator: (value) => ['xs', 's', 'm', 'l', 'xl'].includes(value)
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'].includes(value)
    },
    label: {
      type: String,
      default: ''
    },
    ariaLabel: {
      type: String,
      default: 'Loading'
    }
  }
}
</script>

<style lang="stylus" scoped>
.altrex-spinner
  display: inline-flex
  flex-direction: column
  align-items: center
  gap: $altrex-spacing-2

  // Size variants
  &--xs
    .altrex-spinner__svg
      width: 16px
      height: 16px

    .altrex-spinner__label
      font-size: $altrex-fontSize-xs

  &--s
    .altrex-spinner__svg
      width: 24px
      height: 24px

    .altrex-spinner__label
      font-size: $altrex-fontSize-sm

  &--m
    .altrex-spinner__svg
      width: 32px
      height: 32px

    .altrex-spinner__label
      font-size: $altrex-fontSize-base

  &--l
    .altrex-spinner__svg
      width: 48px
      height: 48px

    .altrex-spinner__label
      font-size: $altrex-fontSize-lg

  &--xl
    .altrex-spinner__svg
      width: 64px
      height: 64px

    .altrex-spinner__label
      font-size: $altrex-fontSize-xl

  // Variant colors
  &--primary
    .altrex-spinner__circle
      stroke: var(--altrex-colors-primary-500)

  &--secondary
    .altrex-spinner__circle
      stroke: var(--altrex-colors-secondary-500)

  &--success
    .altrex-spinner__circle
      stroke: var(--altrex-colors-success-500)

  &--warning
    .altrex-spinner__circle
      stroke: var(--altrex-colors-warning-500)

  &--danger
    .altrex-spinner__circle
      stroke: var(--altrex-colors-danger-500)

  &--info
    .altrex-spinner__circle
      stroke: var(--altrex-colors-info-500)

  &--neutral
    .altrex-spinner__circle
      stroke: var(--altrex-colors-neutral-500)

.altrex-spinner__svg
  animation: altrex-spinner-rotate 2s linear infinite

.altrex-spinner__circle
  stroke-linecap: round
  animation: altrex-spinner-dash 1.5s ease-in-out infinite

.altrex-spinner__label
  font-weight: $altrex-fontWeight-medium
  color: var(--altrex-colors-neutral-700)

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-secondary)

// Animations
@keyframes altrex-spinner-rotate
  100%
    transform: rotate(360deg)

@keyframes altrex-spinner-dash
  0%
    stroke-dasharray: 1, 150
    stroke-dashoffset: 0
  50%
    stroke-dasharray: 90, 150
    stroke-dashoffset: -35
  100%
    stroke-dasharray: 90, 150
    stroke-dashoffset: -124
</style>
