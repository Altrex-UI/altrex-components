<template>
  <div
    class="altrex-accordion"
    :class="accordionClasses"
    :style="themeVariables"
  >
    <slot />
  </div>
</template>

<script>
import styling from '@/utils/styling'

export default {
  name: 'AltrexAccordion',
  mixins: [styling],
  props: {
    /**
     * Visual variant
     */
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'bordered', 'filled'].includes(value)
    }
  },
  data() {
    return {
      themePrefix: 'altrex-accordion'
    }
  },
  computed: {
    accordionClasses() {
      return {
        [`altrex-accordion--${this.variant}`]: true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.altrex-accordion
  background: var(--altrex-accordion-background, $altrex-colors-neutral-50)
  border-radius: var(--altrex-accordion-border-radius, $altrex-borderRadius-lg)

  [data-theme="dark"] &
    background: var(--altrex-accordion-background, $altrex-colors-dark-bg-default)

  // Mobile-first: full width
  width: 100%

// Default variant
.altrex-accordion--default
  background: transparent

// Bordered variant
.altrex-accordion--bordered
  border: 1px solid var(--altrex-accordion-border-color, $altrex-colors-neutral-200)

  [data-theme="dark"] &
    border-color: var(--altrex-accordion-border-color, $altrex-colors-dark-border-default)

// Filled variant
.altrex-accordion--filled
  background: var(--altrex-accordion-background, $altrex-colors-neutral-50)
  box-shadow: var(--altrex-accordion-box-shadow, $altrex-shadow-sm)

  [data-theme="dark"] &
    background: var(--altrex-accordion-background, $altrex-colors-dark-bg-elevated)
</style>
