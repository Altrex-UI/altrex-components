<template>
  <div
    v-if="visible"
    class="altrex-alert"
    :class="alertClasses"
    :style="themeVariables"
    role="alert"
  >
    <AltrexIcon
      v-if="showIcon"
      :icon="iconName"
      size="m"
      class="altrex-alert__icon"
    />
    <div class="altrex-alert__content">
      <div v-if="title" class="altrex-alert__title">{{ title }}</div>
      <div class="altrex-alert__message">
        <slot>{{ message }}</slot>
      </div>
    </div>
    <button
      v-if="closable"
      class="altrex-alert__close"
      type="button"
      aria-label="Close alert"
      @click="handleClose"
    >
      <AltrexIcon icon="generic-x" size="s" />
    </button>
  </div>
</template>

<script>
import AltrexIcon from '../Icon/AltrexIcon.vue'
import styling from '@/utils/styling'

export default {
  name: 'AltrexAlert',
  components: {
    AltrexIcon
  },
  mixins: [styling],
  props: {
    /**
     * Alert message text
     */
    message: {
      type: String,
      default: ''
    },
    /**
     * Alert title (optional)
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * Alert variant style
     */
    variant: {
      type: String,
      default: 'info',
      validator: (value) => ['success', 'warning', 'danger', 'info'].includes(value)
    },
    /**
     * Alert style type
     */
    style: {
      type: String,
      default: 'filled',
      validator: (value) => ['filled', 'outlined', 'soft'].includes(value)
    },
    /**
     * Show icon
     */
    showIcon: {
      type: Boolean,
      default: true
    },
    /**
     * Custom icon name (overrides default variant icon)
     */
    icon: {
      type: String,
      default: null
    },
    /**
     * Show close button
     */
    closable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  data() {
    return {
      visible: true,
      themePrefix: 'altrex-alert'
    }
  },
  computed: {
    alertClasses() {
      return {
        [`altrex-alert--${this.variant}`]: true,
        [`altrex-alert--${this.style}`]: true
      }
    },
    iconName() {
      if (this.icon) {
        return this.icon
      }
      const icons = {
        success: 'generic-check-circle',
        warning: 'generic-alert-triangle',
        danger: 'generic-x-circle',
        info: 'generic-info'
      }
      return icons[this.variant]
    }
  },
  methods: {
    handleClose() {
      this.visible = false
      this.$emit('close')
    }
  }
}
</script>

<style lang="stylus" scoped>
.altrex-alert
  position: relative
  display: flex
  align-items: flex-start
  border-radius: var(--altrex-alert-border-radius, $altrex-borderRadius-lg)
  border: 1px solid transparent
  transition: all $altrex-transition-default

  // Mobile-first: comfortable spacing
  gap: $altrex-spacing-2
  padding: var(--altrex-alert-padding, $altrex-spacing-3)

  // Desktop: more spacious
  +above('md')
    gap: $altrex-spacing-3;
    padding: var(--altrex-alert-padding, $altrex-spacing-4);

  // Filled style variants
  &--filled
    &.altrex-alert--success
      background: var(--altrex-alert-background, $altrex-colors-success-500)
      color: var(--altrex-alert-color, #ffffff)

      [data-theme="dark"] &
        background: var(--altrex-alert-background, $altrex-colors-dark-success-bg)
        color: var(--altrex-alert-color, $altrex-colors-dark-success-default)
        border-color: $altrex-colors-dark-success-border

      .altrex-alert__icon
        color: currentColor

    &.altrex-alert--warning
      background: var(--altrex-alert-background, $altrex-colors-warning-500)
      color: var(--altrex-alert-color, #ffffff)

      [data-theme="dark"] &
        background: var(--altrex-alert-background, $altrex-colors-dark-warning-bg)
        color: var(--altrex-alert-color, $altrex-colors-dark-warning-default)
        border-color: $altrex-colors-dark-warning-border

      .altrex-alert__icon
        color: currentColor

    &.altrex-alert--danger
      background: var(--altrex-alert-background, $altrex-colors-error-500)
      color: var(--altrex-alert-color, #ffffff)

      [data-theme="dark"] &
        background: var(--altrex-alert-background, $altrex-colors-dark-error-bg)
        color: var(--altrex-alert-color, $altrex-colors-dark-error-default)
        border-color: $altrex-colors-dark-error-border

      .altrex-alert__icon
        color: currentColor

    &.altrex-alert--info
      background: var(--altrex-alert-background, $altrex-colors-info-500)
      color: var(--altrex-alert-color, #ffffff)

      [data-theme="dark"] &
        background: var(--altrex-alert-background, $altrex-colors-dark-info-bg)
        color: var(--altrex-alert-color, $altrex-colors-dark-info-default)
        border-color: $altrex-colors-dark-info-border

      .altrex-alert__icon
        color: currentColor

  // Outlined style variants
  &--outlined
    background: transparent

    &.altrex-alert--success
      color: var(--altrex-alert-color, $altrex-colors-success-900)
      border-color: var(--altrex-alert-border-color, $altrex-colors-success-500)

      [data-theme="dark"] &
        color: var(--altrex-alert-color, $altrex-colors-dark-success-default)
        border-color: var(--altrex-alert-border-color, $altrex-colors-dark-success-border)

      .altrex-alert__icon
        color: $altrex-colors-success-500

        [data-theme="dark"] &
          color: $altrex-colors-dark-success-default

    &.altrex-alert--warning
      color: var(--altrex-alert-color, $altrex-colors-warning-900)
      border-color: var(--altrex-alert-border-color, $altrex-colors-warning-500)

      [data-theme="dark"] &
        color: var(--altrex-alert-color, $altrex-colors-dark-warning-default)
        border-color: var(--altrex-alert-border-color, $altrex-colors-dark-warning-border)

      .altrex-alert__icon
        color: $altrex-colors-warning-500

        [data-theme="dark"] &
          color: $altrex-colors-dark-warning-default

    &.altrex-alert--danger
      color: var(--altrex-alert-color, $altrex-colors-error-900)
      border-color: var(--altrex-alert-border-color, $altrex-colors-error-500)

      [data-theme="dark"] &
        color: var(--altrex-alert-color, $altrex-colors-dark-error-default)
        border-color: var(--altrex-alert-border-color, $altrex-colors-dark-error-border)

      .altrex-alert__icon
        color: $altrex-colors-error-500

        [data-theme="dark"] &
          color: $altrex-colors-dark-error-default

    &.altrex-alert--info
      color: var(--altrex-alert-color, $altrex-colors-info-900)
      border-color: var(--altrex-alert-border-color, $altrex-colors-info-500)

      [data-theme="dark"] &
        color: var(--altrex-alert-color, $altrex-colors-dark-info-default)
        border-color: var(--altrex-alert-border-color, $altrex-colors-dark-info-border)

      .altrex-alert__icon
        color: $altrex-colors-info-500

        [data-theme="dark"] &
          color: $altrex-colors-dark-info-default

  // Soft style variants
  &--soft
    &.altrex-alert--success
      background: var(--altrex-alert-background, $altrex-colors-success-50)
      color: var(--altrex-alert-color, $altrex-colors-success-900)
      border-color: var(--altrex-alert-border-color, $altrex-colors-success-500)

      [data-theme="dark"] &
        background: var(--altrex-alert-background, $altrex-colors-dark-success-bg)
        color: var(--altrex-alert-color, $altrex-colors-dark-success-default)
        border-color: var(--altrex-alert-border-color, $altrex-colors-dark-success-border)

      .altrex-alert__icon
        color: $altrex-colors-success-500

        [data-theme="dark"] &
          color: $altrex-colors-dark-success-default

    &.altrex-alert--warning
      background: var(--altrex-alert-background, $altrex-colors-warning-50)
      color: var(--altrex-alert-color, $altrex-colors-warning-900)
      border-color: var(--altrex-alert-border-color, $altrex-colors-warning-500)

      [data-theme="dark"] &
        background: var(--altrex-alert-background, $altrex-colors-dark-warning-bg)
        color: var(--altrex-alert-color, $altrex-colors-dark-warning-default)
        border-color: var(--altrex-alert-border-color, $altrex-colors-dark-warning-border)

      .altrex-alert__icon
        color: $altrex-colors-warning-500

        [data-theme="dark"] &
          color: $altrex-colors-dark-warning-default

    &.altrex-alert--danger
      background: var(--altrex-alert-background, $altrex-colors-error-50)
      color: var(--altrex-alert-color, $altrex-colors-error-900)
      border-color: var(--altrex-alert-border-color, $altrex-colors-error-500)

      [data-theme="dark"] &
        background: var(--altrex-alert-background, $altrex-colors-dark-error-bg)
        color: var(--altrex-alert-color, $altrex-colors-dark-error-default)
        border-color: var(--altrex-alert-border-color, $altrex-colors-dark-error-border)

      .altrex-alert__icon
        color: $altrex-colors-error-500

        [data-theme="dark"] &
          color: $altrex-colors-dark-error-default

    &.altrex-alert--info
      background: var(--altrex-alert-background, $altrex-colors-info-50)
      color: var(--altrex-alert-color, $altrex-colors-info-900)
      border-color: var(--altrex-alert-border-color, $altrex-colors-info-500)

      [data-theme="dark"] &
        background: var(--altrex-alert-background, $altrex-colors-dark-info-bg)
        color: var(--altrex-alert-color, $altrex-colors-dark-info-default)
        border-color: var(--altrex-alert-border-color, $altrex-colors-dark-info-border)

      .altrex-alert__icon
        color: $altrex-colors-info-500

        [data-theme="dark"] &
          color: $altrex-colors-dark-info-default

.altrex-alert__icon
  flex-shrink: 0
  margin-top: 2px
  altrex-icon-m()

.altrex-alert__content
  flex: 1
  min-width: 0

.altrex-alert__title
  font-size: var(--altrex-alert-title-font-size, $altrex-fontSize-base)
  font-weight: var(--altrex-alert-title-font-weight, $altrex-fontWeight-semibold)
  margin-bottom: $altrex-spacing-1
  line-height: 1.5

.altrex-alert__message
  font-size: var(--altrex-alert-message-font-size, $altrex-fontSize-sm)
  line-height: 1.5
  opacity: 0.95

.altrex-alert__close
  flex-shrink: 0
  background: transparent
  border: none
  border-radius: $altrex-borderRadius-default
  color: currentColor
  cursor: pointer
  transition: all $altrex-transition-default
  opacity: 0.7

  // Mobile: touch-optimized (44x44px)
  touch-target('minimum')
  margin-top: 0

  // Desktop: smaller (32x32px)
  +above('md')
    width: 32px;
    height: 32px;
    min-width: auto;
    min-height: auto;
    margin-top: 2px;

  // Icon visual stays 16px
  :deep(.altrex-icon)
    altrex-icon-s()

  &:hover
    opacity: 1
    background: rgba(255, 255, 255, 0.2)

    [data-theme="dark"] &
      background: rgba(0, 0, 0, 0.2)

  &:focus-visible
    outline: 2px solid currentColor
    outline-offset: 2px
    opacity: 1

  &:active
    transform: scale(0.95)
</style>
