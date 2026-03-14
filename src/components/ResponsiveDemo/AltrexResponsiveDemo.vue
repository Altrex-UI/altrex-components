<template>
  <div class="altrex-responsive-demo">
    <div v-if="title" class="altrex-responsive-demo__header">
      <h2>{{ title }}</h2>
      <p v-if="description" class="altrex-responsive-demo__description">
        {{ description }}
      </p>
    </div>

    <div class="altrex-responsive-demo__viewports">
      <!-- Mobile Viewport -->
      <div class="altrex-responsive-demo__viewport altrex-responsive-demo__viewport--mobile">
        <div class="altrex-responsive-demo__viewport-label">
          <span class="altrex-responsive-demo__viewport-icon">📱</span>
          <strong>Mobile</strong>
          <span class="altrex-responsive-demo__viewport-size">&lt; 768px</span>
        </div>
        <div class="altrex-responsive-demo__viewport-content">
          <slot name="mobile">
            <slot />
          </slot>
        </div>
      </div>

      <!-- Desktop Viewport -->
      <div class="altrex-responsive-demo__viewport altrex-responsive-demo__viewport--desktop">
        <div class="altrex-responsive-demo__viewport-label">
          <span class="altrex-responsive-demo__viewport-icon">🖥️</span>
          <strong>Desktop</strong>
          <span class="altrex-responsive-demo__viewport-size">≥ 768px</span>
        </div>
        <div class="altrex-responsive-demo__viewport-content">
          <slot name="desktop">
            <slot />
          </slot>
        </div>
      </div>
    </div>

    <!-- Responsive Behavior Notes -->
    <div v-if="notes || $slots.notes" class="altrex-responsive-demo__notes">
      <div class="altrex-responsive-demo__notes-icon">💡</div>
      <div class="altrex-responsive-demo__notes-content">
        <strong>Responsive Behavior:</strong>
        <slot name="notes">
          <p>{{ notes }}</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AltrexResponsiveDemo',
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    notes: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.altrex-responsive-demo
  margin-bottom: $altrex-spacing-8

.altrex-responsive-demo__header
  margin-bottom: $altrex-spacing-6

  h2
    margin: 0 0 $altrex-spacing-2 0
    color: var(--altrex-colors-neutral-900)
    font-size: $altrex-fontSize-2xl

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-primary)

.altrex-responsive-demo__description
  margin: 0
  color: var(--altrex-colors-neutral-600)
  font-size: $altrex-fontSize-base

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-secondary)

.altrex-responsive-demo__viewports
  display: flex
  gap: $altrex-spacing-6
  margin-bottom: $altrex-spacing-4

  // Stack vertically on small screens
  flex-direction: column

  // Side by side on larger screens
  +above('lg')
    flex-direction: row

.altrex-responsive-demo__viewport
  flex: 1
  border: 2px dashed var(--altrex-colors-neutral-300)
  border-radius: $altrex-borderRadius-lg
  overflow: hidden
  background: var(--altrex-colors-neutral-50)

  [data-theme="dark"] &
    border-color: var(--altrex-colors-dark-border-default)
    background: var(--altrex-colors-dark-bg-surface)

  &--mobile
    // Simulate mobile width
    max-width: 100%

    +above('lg')
      max-width: 375px

  &--desktop
    // Full available width
    max-width: 100%

.altrex-responsive-demo__viewport-label
  display: flex
  align-items: center
  gap: $altrex-spacing-2
  padding: $altrex-spacing-3 $altrex-spacing-4
  background: var(--altrex-colors-neutral-100)
  border-bottom: 1px solid var(--altrex-colors-neutral-300)
  font-size: $altrex-fontSize-sm

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-bg-base)
    border-bottom-color: var(--altrex-colors-dark-border-subtle)

  strong
    color: var(--altrex-colors-neutral-900)

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-primary)

.altrex-responsive-demo__viewport-icon
  font-size: $altrex-fontSize-lg

.altrex-responsive-demo__viewport-size
  margin-left: auto
  color: var(--altrex-colors-neutral-500)
  font-family: monospace
  font-size: $altrex-fontSize-xs

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-tertiary)

.altrex-responsive-demo__viewport-content
  padding: $altrex-spacing-4
  min-height: 100px

.altrex-responsive-demo__notes
  display: flex
  gap: $altrex-spacing-3
  padding: $altrex-spacing-4
  background: var(--altrex-colors-info-50)
  border-left: 4px solid var(--altrex-colors-info-500)
  border-radius: $altrex-borderRadius-default

  [data-theme="dark"] &
    background: var(--altrex-colors-dark-info-bg)
    border-left-color: var(--altrex-colors-dark-info-default)

.altrex-responsive-demo__notes-icon
  font-size: $altrex-fontSize-xl
  flex-shrink: 0

.altrex-responsive-demo__notes-content
  flex: 1

  strong
    display: block
    margin-bottom: $altrex-spacing-1
    color: var(--altrex-colors-info-900)
    font-size: $altrex-fontSize-sm

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-info-default)

  p
    margin: 0
    color: var(--altrex-colors-info-800)
    font-size: $altrex-fontSize-sm
    line-height: 1.6

    [data-theme="dark"] &
      color: var(--altrex-colors-dark-text-secondary)
</style>
