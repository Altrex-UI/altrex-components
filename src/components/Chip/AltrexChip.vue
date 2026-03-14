<template>
  <div
    class="altrex-chip"
    :class="chipClasses"
    :style="themeVariables"
    :aria-disabled="disabled || null"
    :tabindex="isClickable ? 0 : null"
    :role="isClickable ? 'button' : null"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <slot name="icon">
      <AltrexIcon
        v-if="icon"
        :icon="icon"
        class="altrex-chip__icon"
      />
    </slot>

    <span class="altrex-chip__label">
      <slot>{{ label }}</slot>
    </span>

    <button
      v-if="dismissible"
      class="altrex-chip__close"
      type="button"
      :aria-label="closeAriaLabel"
      :disabled="disabled"
      @click.stop="handleClose"
    >
      <AltrexIcon
        icon="generic-x"
        class="altrex-chip__close-icon"
      />
    </button>
  </div>
</template>

<script>
import AltrexIcon from '@/components/Icon/AltrexIcon.vue';
import styling from '@/utils/styling';

export default {
  name: 'AltrexChip',
  components: {
    AltrexIcon,
  },
  mixins: [styling],
  props: {
    /**
     * Chip label text
     */
    label: {
      type: String,
      default: null,
    },
    /**
     * Chip variant style
     */
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'primary', 'success', 'warning', 'danger', 'info'].includes(value),
    },
    /**
     * Chip size
     */
    size: {
      type: String,
      default: 'm',
      validator: (value) => ['s', 'm', 'l'].includes(value),
    },
    /**
     * Optional icon name
     */
    icon: {
      type: String,
      default: null,
    },
    /**
     * Whether chip can be dismissed/removed
     */
    dismissible: {
      type: Boolean,
      default: false,
    },
    /**
     * Whether chip is clickable
     */
    clickable: {
      type: Boolean,
      default: false,
    },
    /**
     * Whether chip is selected (for filter chips)
     */
    selected: {
      type: Boolean,
      default: false,
    },
    /**
     * Whether chip is disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Aria label for close button
     */
    closeAriaLabel: {
      type: String,
      default: 'Remove',
    },
  },
  data() {
    return {
      themePrefix: 'altrex-chip',
    };
  },
  computed: {
    chipClasses() {
      return {
        [`altrex-chip--${this.variant}`]: true,
        [`altrex-chip--${this.size}`]: true,
        'altrex-chip--clickable': this.isClickable,
        'altrex-chip--selected': this.selected,
        'altrex-chip--disabled': this.disabled,
        'altrex-chip--with-icon': this.hasIcon,
        'altrex-chip--dismissible': this.dismissible,
      };
    },
    isClickable() {
      return this.clickable && !this.disabled;
    },
    hasIcon() {
      return this.icon || this.$slots.icon;
    },
  },
  methods: {
    handleClick(event) {
      if (!this.isClickable) return;
      this.$emit('click', event);
    },
    handleClose(event) {
      if (this.disabled) return;
      this.$emit('close', event);
    },
  },
};
</script>

<style lang="stylus" scoped>
.altrex-chip {
  // ========================================
  // MOBILE-FIRST BASELINE (< 768px)
  // ========================================

  // Touch-optimized height
  min-height: $altrex-touchTarget-minimum;

  // Layout
  display: inline-flex;
  align-items: center;
  gap: $altrex-spacing-2;

  // Spacing
  padding: var(--altrex-chip-padding, $altrex-spacing-3 $altrex-spacing-4);

  // Typography (16px prevents iOS zoom on interactive elements)
  font-size: 16px;
  font-weight: var(--altrex-chip-font-weight, $altrex-fontWeight-medium);
  line-height: 1;
  white-space: nowrap;

  // Colors
  background: var(--altrex-chip-background, $altrex-colors-neutral-100);
  color: var(--altrex-chip-text-color, $altrex-colors-neutral-900);
  border: var(--altrex-chip-border, 1px solid transparent);
  border-color: var(--altrex-chip-border-color, $altrex-colors-neutral-300);
  border-radius: var(--altrex-chip-border-radius, $altrex-borderRadius-pill);

  // Transition
  transition: var(--altrex-chip-transition, all $altrex-transition-default);

  // Cursor
  cursor: default;
  user-select: none;

  // Dark mode
  [data-theme="dark"] & {
    background: var(--altrex-chip-background, $altrex-colors-dark-bg-elevated);
    color: var(--altrex-chip-text-color, $altrex-colors-dark-text-primary);
    border-color: var(--altrex-chip-border-color, $altrex-colors-dark-border-default);
  }

  // ========================================
  // DESKTOP ENHANCEMENTS (≥ 768px)
  // ========================================
  +above('md') {
    min-height: 32px;
    font-size: $altrex-fontSize-sm;
    padding: var(--altrex-chip-padding, $altrex-spacing-2 $altrex-spacing-3);
  }
}

// ========================================
// ICON
// ========================================
.altrex-chip__icon {
  flex-shrink: 0;
  fill: currentColor;
  altrex-icon-s();
}

// ========================================
// LABEL
// ========================================
.altrex-chip__label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

// ========================================
// CLOSE BUTTON
// ========================================
.altrex-chip__close {
  // Mobile: Large touch target
  touch-target('minimum');

  // Reset button styles
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  color: inherit;
  flex-shrink: 0;

  // Transition
  transition: opacity $altrex-transition-default;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  // Desktop: Can be smaller
  +above('md') {
    width: 20px;
    height: 20px;
    min-width: auto;
    min-height: auto;
  }
}

.altrex-chip__close-icon {
  fill: currentColor;
  altrex-icon-s();
}

// ========================================
// CLICKABLE STATE
// ========================================
.altrex-chip--clickable {
  cursor: pointer;

  &:hover:not(.altrex-chip--disabled) {
    background: var(--altrex-chip-background-hover, $altrex-colors-neutral-200);
    border-color: var(--altrex-chip-border-color-hover, $altrex-colors-neutral-400);

    [data-theme="dark"] & {
      background: var(--altrex-chip-background-hover, $altrex-colors-dark-bg-hover);
    }
  }

  &:active:not(.altrex-chip--disabled) {
    background: var(--altrex-chip-background-active, $altrex-colors-neutral-300);

    [data-theme="dark"] & {
      background: var(--altrex-chip-background-active, $altrex-colors-dark-bg-active);
    }
  }

  &:focus-visible {
    outline: 2px solid $altrex-colors-primary-500;
    outline-offset: 2px;
  }
}

// Touch device feedback
+touch-device() {
  .altrex-chip--clickable:active:not(.altrex-chip--disabled) {
    transform: scale(0.98);
    transition: transform 0.1s ease;
  }
}

// ========================================
// SELECTED STATE
// ========================================
.altrex-chip--selected {
  background: var(--altrex-chip-background-selected, $altrex-colors-primary-100);
  color: var(--altrex-chip-text-color-selected, $altrex-colors-primary-700);
  border-color: var(--altrex-chip-border-color-selected, $altrex-colors-primary-500);

  [data-theme="dark"] & {
    background: var(--altrex-chip-background-selected, $altrex-colors-primary-900);
    color: var(--altrex-chip-text-color-selected, $altrex-colors-primary-200);
    border-color: var(--altrex-chip-border-color-selected, $altrex-colors-primary-500);
  }
}

// ========================================
// DISABLED STATE
// ========================================
.altrex-chip--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

// ========================================
// SIZE VARIANTS
// ========================================
.altrex-chip--s {
  // Mobile: still touch-friendly
  min-height: $altrex-touchTarget-minimum;
  font-size: 14px;
  --altrex-chip-padding: $altrex-spacing-2 $altrex-spacing-3;
  gap: $altrex-spacing-1;

  // Desktop: compact
  +above('md') {
    min-height: 28px;
    font-size: $altrex-fontSize-xs;
  }

  .altrex-chip__icon,
  .altrex-chip__close-icon {
    altrex-icon-s();
  }
}

.altrex-chip--l {
  // Mobile: comfortable touch
  min-height: $altrex-touchTarget-comfortable;
  font-size: 18px;
  --altrex-chip-padding: $altrex-spacing-4 $altrex-spacing-5;
  gap: $altrex-spacing-3;

  // Desktop: larger
  +above('md') {
    min-height: 40px;
    font-size: $altrex-fontSize-base;
  }

  .altrex-chip__icon,
  .altrex-chip__close-icon {
    altrex-icon-m();
  }
}

// ========================================
// VARIANT STYLES
// ========================================
.altrex-chip--primary {
  --altrex-chip-background: $altrex-colors-primary-100;
  --altrex-chip-text-color: $altrex-colors-primary-700;
  --altrex-chip-border-color: $altrex-colors-primary-300;
  --altrex-chip-background-hover: $altrex-colors-primary-200;
  --altrex-chip-border-color-hover: $altrex-colors-primary-400;
  --altrex-chip-background-active: $altrex-colors-primary-300;
  --altrex-chip-background-selected: $altrex-colors-primary-500;
  --altrex-chip-text-color-selected: $altrex-colors-neutral-50;
  --altrex-chip-border-color-selected: $altrex-colors-primary-500;

  [data-theme="dark"] & {
    --altrex-chip-background: $altrex-colors-primary-900;
    --altrex-chip-text-color: $altrex-colors-primary-200;
    --altrex-chip-border-color: $altrex-colors-primary-700;
  }
}

.altrex-chip--success {
  --altrex-chip-background: $altrex-colors-success-100;
  --altrex-chip-text-color: $altrex-colors-success-700;
  --altrex-chip-border-color: $altrex-colors-success-300;
  --altrex-chip-background-hover: $altrex-colors-success-200;
  --altrex-chip-border-color-hover: $altrex-colors-success-400;
  --altrex-chip-background-active: $altrex-colors-success-300;
  --altrex-chip-background-selected: $altrex-colors-success-500;
  --altrex-chip-text-color-selected: $altrex-colors-neutral-50;
  --altrex-chip-border-color-selected: $altrex-colors-success-500;

  [data-theme="dark"] & {
    --altrex-chip-background: $altrex-colors-success-900;
    --altrex-chip-text-color: $altrex-colors-success-200;
    --altrex-chip-border-color: $altrex-colors-success-700;
  }
}

.altrex-chip--warning {
  --altrex-chip-background: $altrex-colors-warning-100;
  --altrex-chip-text-color: $altrex-colors-warning-700;
  --altrex-chip-border-color: $altrex-colors-warning-300;
  --altrex-chip-background-hover: $altrex-colors-warning-200;
  --altrex-chip-border-color-hover: $altrex-colors-warning-400;
  --altrex-chip-background-active: $altrex-colors-warning-300;
  --altrex-chip-background-selected: $altrex-colors-warning-500;
  --altrex-chip-text-color-selected: $altrex-colors-neutral-50;
  --altrex-chip-border-color-selected: $altrex-colors-warning-500;

  [data-theme="dark"] & {
    --altrex-chip-background: $altrex-colors-warning-900;
    --altrex-chip-text-color: $altrex-colors-warning-200;
    --altrex-chip-border-color: $altrex-colors-warning-700;
  }
}

.altrex-chip--danger {
  --altrex-chip-background: $altrex-colors-danger-100;
  --altrex-chip-text-color: $altrex-colors-danger-700;
  --altrex-chip-border-color: $altrex-colors-danger-300;
  --altrex-chip-background-hover: $altrex-colors-danger-200;
  --altrex-chip-border-color-hover: $altrex-colors-danger-400;
  --altrex-chip-background-active: $altrex-colors-danger-300;
  --altrex-chip-background-selected: $altrex-colors-danger-500;
  --altrex-chip-text-color-selected: $altrex-colors-neutral-50;
  --altrex-chip-border-color-selected: $altrex-colors-danger-500;

  [data-theme="dark"] & {
    --altrex-chip-background: $altrex-colors-danger-900;
    --altrex-chip-text-color: $altrex-colors-danger-200;
    --altrex-chip-border-color: $altrex-colors-danger-700;
  }
}

.altrex-chip--info {
  --altrex-chip-background: $altrex-colors-info-100;
  --altrex-chip-text-color: $altrex-colors-info-700;
  --altrex-chip-border-color: $altrex-colors-info-300;
  --altrex-chip-background-hover: $altrex-colors-info-200;
  --altrex-chip-border-color-hover: $altrex-colors-info-400;
  --altrex-chip-background-active: $altrex-colors-info-300;
  --altrex-chip-background-selected: $altrex-colors-info-500;
  --altrex-chip-text-color-selected: $altrex-colors-neutral-50;
  --altrex-chip-border-color-selected: $altrex-colors-info-500;

  [data-theme="dark"] & {
    --altrex-chip-background: $altrex-colors-info-900;
    --altrex-chip-text-color: $altrex-colors-info-200;
    --altrex-chip-border-color: $altrex-colors-info-700;
  }
}
</style>
