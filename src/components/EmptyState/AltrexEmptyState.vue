<template>
  <div
    class="altrex-empty-state"
    :class="emptyStateClasses"
    :style="themeVariables"
  >
    <div v-if="showIcon || $slots.icon" class="altrex-empty-state__icon">
      <slot name="icon">
        <AltrexIcon
          v-if="icon"
          :icon="icon"
          :size="iconSize"
        />
      </slot>
    </div>

    <div class="altrex-empty-state__content">
      <h3 v-if="heading || $slots.heading" class="altrex-empty-state__heading">
        <slot name="heading">{{ heading }}</slot>
      </h3>

      <p v-if="message || $slots.message" class="altrex-empty-state__message">
        <slot name="message">{{ message }}</slot>
      </p>

      <div v-if="$slots.default" class="altrex-empty-state__body">
        <slot />
      </div>
    </div>

    <div v-if="$slots.action || showAction" class="altrex-empty-state__action">
      <slot name="action">
        <AltrexButton
          v-if="actionLabel"
          :variant="actionVariant"
          :size="actionSize"
          :left-icon="actionIcon"
          @click="handleAction"
        >
          {{ actionLabel }}
        </AltrexButton>
      </slot>
    </div>
  </div>
</template>

<script>
import AltrexIcon from '../Icon/AltrexIcon.vue'
import AltrexButton from '../Button/AltrexButton.vue'
import styling from '@/utils/styling'

export default {
  name: 'AltrexEmptyState',
  components: {
    AltrexIcon,
    AltrexButton
  },
  mixins: [styling],
  props: {
    /**
     * Icon name to display
     */
    icon: {
      type: String,
      default: 'generic-inbox'
    },
    /**
     * Icon size
     */
    iconSize: {
      type: String,
      default: 'xxl',
      validator: (value) => ['m', 'l', 'xl', 'xxl'].includes(value)
    },
    /**
     * Show icon (when using icon prop)
     */
    showIcon: {
      type: Boolean,
      default: true
    },
    /**
     * Heading text
     */
    heading: {
      type: String,
      default: ''
    },
    /**
     * Message/description text
     */
    message: {
      type: String,
      default: ''
    },
    /**
     * Action button label
     */
    actionLabel: {
      type: String,
      default: ''
    },
    /**
     * Action button variant
     */
    actionVariant: {
      type: String,
      default: 'fill',
      validator: (value) => ['fill', 'outline', 'ghost'].includes(value)
    },
    /**
     * Action button size
     */
    actionSize: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    /**
     * Action button icon
     */
    actionIcon: {
      type: String,
      default: null
    },
    /**
     * Size variant
     */
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    /**
     * Compact mode (reduced spacing)
     */
    compact: {
      type: Boolean,
      default: false
    }
  },
  emits: ['action'],
  data() {
    return {
      themePrefix: 'altrex-empty-state'
    }
  },
  computed: {
    emptyStateClasses() {
      return {
        [`altrex-empty-state--${this.size}`]: true,
        'altrex-empty-state--compact': this.compact
      }
    },
    showAction() {
      return !!this.actionLabel
    }
  },
  methods: {
    handleAction() {
      this.$emit('action')
    }
  }
}
</script>

<style lang="stylus" scoped>
.altrex-empty-state
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  text-align: center
  padding: var(--altrex-empty-state-padding, $altrex-spacing-12)
  min-height: var(--altrex-empty-state-min-height, 300px)

  &--compact
    padding: var(--altrex-empty-state-padding, $altrex-spacing-8)
    min-height: var(--altrex-empty-state-min-height, 200px)

  &--small
    padding: var(--altrex-empty-state-padding, $altrex-spacing-8)
    min-height: var(--altrex-empty-state-min-height, 200px)

    .altrex-empty-state__heading
      font-size: $altrex-fontSize-lg

    .altrex-empty-state__message
      font-size: $altrex-fontSize-sm

  &--large
    padding: var(--altrex-empty-state-padding, $altrex-spacing-16)
    min-height: var(--altrex-empty-state-min-height, 400px)

    .altrex-empty-state__heading
      font-size: $altrex-fontSize-3xl

    .altrex-empty-state__message
      font-size: $altrex-fontSize-lg

.altrex-empty-state__icon
  margin-bottom: var(--altrex-empty-state-icon-margin, $altrex-spacing-6)
  color: var(--altrex-empty-state-icon-color, $altrex-colors-neutral-400)
  opacity: 0.7

  [data-theme="dark"] &
    color: var(--altrex-empty-state-icon-color, $altrex-colors-neutral-600)

.altrex-empty-state__content
  max-width: var(--altrex-empty-state-content-max-width, 500px)

.altrex-empty-state__heading
  font-size: var(--altrex-empty-state-heading-font-size, $altrex-fontSize-2xl)
  font-weight: var(--altrex-empty-state-heading-font-weight, $altrex-fontWeight-semibold)
  color: var(--altrex-empty-state-heading-color, $altrex-colors-neutral-900)
  margin: 0 0 $altrex-spacing-3 0
  line-height: 1.3

  [data-theme="dark"] &
    color: var(--altrex-empty-state-heading-color, $altrex-colors-dark-text-primary)

.altrex-empty-state__message
  font-size: var(--altrex-empty-state-message-font-size, $altrex-fontSize-base)
  color: var(--altrex-empty-state-message-color, $altrex-colors-neutral-600)
  margin: 0 0 $altrex-spacing-6 0
  line-height: 1.6

  [data-theme="dark"] &
    color: var(--altrex-empty-state-message-color, $altrex-colors-dark-text-secondary)

.altrex-empty-state__body
  margin-bottom: $altrex-spacing-6
  color: $altrex-colors-neutral-700

  [data-theme="dark"] &
    color: $altrex-colors-dark-text-secondary

.altrex-empty-state__action
  margin-top: var(--altrex-empty-state-action-margin, $altrex-spacing-2)

// Compact mode adjustments
.altrex-empty-state--compact
  .altrex-empty-state__icon
    margin-bottom: $altrex-spacing-4

  .altrex-empty-state__heading
    margin-bottom: $altrex-spacing-2
    font-size: $altrex-fontSize-xl

  .altrex-empty-state__message
    margin-bottom: $altrex-spacing-4
    font-size: $altrex-fontSize-sm
</style>
