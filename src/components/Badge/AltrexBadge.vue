<template>
    <span
        class="altrex-badge"
        :class="badgeClasses"
        :style="themeVariables"
    >
        <slot>{{ content }}</slot>
    </span>
</template>

<script>
import styling from '@/utils/styling';

export default {
    name: 'AltrexBadge',
    mixins: [styling],
    props: {
        /**
         * Badge content (text or number)
         */
        content: {
            type: [String, Number],
            default: null,
        },
        /**
         * Badge variant style
         */
        variant: {
            type: String,
            default: 'primary',
            validator: (value) => ['primary', 'success', 'warning', 'danger', 'neutral'].includes(value),
        },
        /**
         * Badge size
         */
        size: {
            type: String,
            default: 'medium',
            validator: (value) => ['small', 'medium', 'large'].includes(value),
        },
        /**
         * Display as a dot/pill with no content
         */
        dot: {
            type: Boolean,
            default: false,
        },
        /**
         * Display as outlined style
         */
        outlined: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            themePrefix: 'altrex-badge',
        };
    },
    computed: {
        /**
         * Badge CSS classes
         */
        badgeClasses() {
            return {
                [`altrex-badge--${this.variant}`]: true,
                [`altrex-badge--${this.size}`]: true,
                'altrex-badge--dot': this.dot,
                'altrex-badge--outlined': this.outlined,
            };
        },
    },
};
</script>

<style lang="stylus" scoped>
.altrex-badge {
    align-items: center;
    background-color: var(--altrex-badge-background, #3498db);
    border-radius: var(--altrex-badge-border-radius, 12px);
    color: var(--altrex-badge-color, #ffffff);
    display: inline-flex;
    font-size: var(--altrex-badge-font-size, 0.75rem);
    font-weight: var(--altrex-badge-font-weight, 600);
    justify-content: center;
    line-height: 1;
    min-height: var(--altrex-badge-height, 20px);
    min-width: var(--altrex-badge-width, 20px);
    padding: var(--altrex-badge-padding, 0.125rem 0.5rem);
    transition: var(--altrex-badge-transition, background-color 0.2s, color 0.2s);
    vertical-align: middle;
    white-space: nowrap;

    // Variants
    &.altrex-badge--primary {
        background-color: var(--altrex-badge-background-primary, #3498db);
    }

    &.altrex-badge--success {
        background-color: var(--altrex-badge-background-success, #2ecc71);
    }

    &.altrex-badge--warning {
        background-color: var(--altrex-badge-background-warning, #f39c12);
    }

    &.altrex-badge--danger {
        background-color: var(--altrex-badge-background-danger, #e74c3c);
    }

    &.altrex-badge--neutral {
        background-color: var(--altrex-badge-background-neutral, #95a5a6);
    }

    // Sizes
    &.altrex-badge--small {
        font-size: var(--altrex-badge-font-size-small, 0.625rem);
        min-height: var(--altrex-badge-height-small, 16px);
        min-width: var(--altrex-badge-width-small, 16px);
        padding: var(--altrex-badge-padding-small, 0.125rem 0.375rem);
    }

    &.altrex-badge--medium {
        font-size: var(--altrex-badge-font-size-medium, 0.75rem);
        min-height: var(--altrex-badge-height-medium, 20px);
        min-width: var(--altrex-badge-width-medium, 20px);
        padding: var(--altrex-badge-padding-medium, 0.125rem 0.5rem);
    }

    &.altrex-badge--large {
        font-size: var(--altrex-badge-font-size-large, 0.875rem);
        min-height: var(--altrex-badge-height-large, 24px);
        min-width: var(--altrex-badge-width-large, 24px);
        padding: var(--altrex-badge-padding-large, 0.25rem 0.625rem);
    }

    // Dot variant
    &.altrex-badge--dot {
        border-radius: 50%;
        height: var(--altrex-badge-dot-size, 8px);
        min-height: var(--altrex-badge-dot-size, 8px);
        min-width: var(--altrex-badge-dot-size, 8px);
        padding: 0;
        width: var(--altrex-badge-dot-size, 8px);
    }

    // Outlined variant
    &.altrex-badge--outlined {
        background-color: transparent;
        border: 1px solid currentColor;

        &.altrex-badge--primary {
            color: var(--altrex-badge-background-primary, #3498db);
        }

        &.altrex-badge--success {
            color: var(--altrex-badge-background-success, #2ecc71);
        }

        &.altrex-badge--warning {
            color: var(--altrex-badge-background-warning, #f39c12);
        }

        &.altrex-badge--danger {
            color: var(--altrex-badge-background-danger, #e74c3c);
        }

        &.altrex-badge--neutral {
            color: var(--altrex-badge-background-neutral, #95a5a6);
        }
    }
}

// When badge is used in a clickable context (e.g., inside a button)
// Note: Badges are not interactive by default, so they don't need touch targets
// unless wrapped in an interactive element that already provides touch area
</style>
