<template>
    <component
        :is="renderTag"
        :class="computedClasses"
        :aria-disabled="shouldDisable || null"
        :aria-label="ariaLabel || null"
        :target="linkTarget"
        :type="elementType"
        :role="ariaRole"
        :tabindex="linkDisabled ? 0 : null"
        v-bind="{
            ...navigationAttributes,
            ...$attrs,
        }"
        :style="cssProps"
    >
        <slot name="iconLeft">
            <AltrexIcon
                v-if="leftIcon"
                :icon="leftIcon"
                class="altrex-button__icon"
            />
        </slot>
        <span
            v-if="label"
            class="altrex-button__text"
            :aria-hidden="ariaLabel ? 'true' : null"
        >{{ label }}</span>
        <slot name="iconRight">
            <AltrexIcon
                v-if="rightIcon"
                :icon="rightIcon"
                class="altrex-button__icon"
            />
        </slot>
        <div v-if="hasBadgeSlot" class="altrex-button__badge-with-text">
            <slot name="badgeWithText" />
        </div>
    </component>
</template>

<script>

import AltrexIcon from '@/components/Icon/AltrexIcon.vue';
import styling from '@/utils/styling';

export default {
    name: 'AltrexButton',
    components: {
        AltrexIcon,
    },
    mixins: [styling],
    props: {
        ariaLabel: {
            type: String,
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        href: {
            type: [String, Object],
            default: '',
        },
        label: {
            type: [String, Number],
            default: null,
        },
        leftIcon: {
            type: String,
            default: null,
        },
        linkDisabled: {
            type: Boolean,
            default: false,
        },
        pushState: {
            type: Boolean,
            default: false,
        },
        rightIcon: {
            type: String,
            default: null,
        },
        role: {
            type: String,
            default: null,
        },
        router: {
            type: Boolean,
            default: false,
        },
        shape: {
            type: String,
            default: 'square',
            enum: ['square', 'pill'],
        },
        size: {
            type: String,
            default: 'm',
            enum: ['xs', 's', 'm', 'l'],
        },
        static: {
            type: Boolean,
            default: false,
        },
        submit: {
            type: Boolean,
            default: false,
        },
        target: {
            type: [String, Boolean],
            default: null,
            enum: ['_blank', '_parent', '_self', '_top'],
        },
        variant: {
            type: String,
            default: 'fill',
            enum: ['fill', 'flat', 'ghost'],
        },
    },
    computed: {
        ariaRole() {
            return this.role || (this.linkDisabled ? 'link' : null);
        },

        computedClasses() {
            const classes = [
                'altrex-button',
                `altrex-button--${this.size}`,
                `altrex-button--${this.shape}`,
                `altrex-button--${this.variant}`,
                {
                    'altrex-button--icon-left': this.hasLeftIcon,
                    'altrex-button--icon-right': this.hasRightIcon,
                    'altrex-button--icon-only': this.isIconOnly,
                },
            ];

            if (this.pushState) {
                classes.push('do-push-state');
            }

            return classes;
        },

        elementType() {
            if (this.submit) {
                return 'submit';
            }

            if (this.isNavigationElement) {
                return null;
            }

            return 'button';
        },

        hasBadgeSlot() {
            return !!this.$slots.badgeWithText;
        },

        hasLeftIcon() {
            return this.leftIcon || this.hasLeftIconSlot;
        },

        hasLeftIconSlot() {
            return !!this.$slots.iconLeft;
        },

        hasRightIcon() {
            return this.rightIcon || this.hasRightIconSlot;
        },

        hasRightIconSlot() {
            return !!this.$slots.iconRight;
        },

        isIconOnly() {
            return !this.label;
        },

        isNavigationElement() {
            return this.router || this.href || this.linkDisabled || this.static;
        },

        linkTarget() {
            return (this.disabled || !this.target) ? null : this.target;
        },

        navigationAttributes() {
            if (this.linkDisabled) {
                return {};
            }

            const tag = this.renderTag;

            if (tag === 'a') {
                return { href: this.href };
            }

            if (tag === 'routerLink') {
                return { to: this.href };
            }

            return {};
        },

        renderTag() {
            if (this.router && !this.linkDisabled) {
                return 'routerLink';
            }

            if (this.static) {
                return 'div';
            }

            if (this.href || this.linkDisabled) {
                return 'a';
            }

            return 'button';
        },

        shouldDisable() {
            return this.disabled || this.linkDisabled;
        },
    },
};
</script>

<style lang="stylus">

.altrex-button
    align-items: center
    background: var(--altrex-button-background)
    border: var(--altrex-button-border, none)
    border-color: var(--altrex-button-border-color)
    border-radius: var(--altrex-button-border-radius, $altrex-border-radius-button-default)
    color: var(--altrex-button-text-color)
    cursor: pointer
    display: flex
    flex-shrink: 0
    font-family: var(--altrex-button-font-family, $altrex-font-family-body)
    font-size: var(--altrex-button-font-size, $altrex-font-size-body-1)
    font-style: var(--altrex-button-font-style, normal)
    font-weight: var(--altrex-button-font-weight, 600)
    line-height: var(--altrex-button-line-height, 1)
    text-decoration: none
    transition: var(--altrex-button-transition, all $altrex-transition-default)
    width: max-content

    // Mobile-first: WCAG AAA touch target (44px minimum)
    min-height: $altrex-touchTarget-minimum
    padding: var(--altrex-button-padding, $altrex-spacing-3 $altrex-spacing-5)

    // Desktop: allow more compact sizing
    +above('md')
        min-height: 40px
        padding: var(--altrex-button-padding, 11px $altrex-spacing-4)

    .altrex-button__icon
        fill: var(--altrex-button-text-color)
        transition: var(--altrex-button-transition, all $altrex-transition-default)
        vertical-align: middle
        altrex-icon-m()

    &.altrex-button--icon-only
        // Always meet touch target on all devices
        touch-target('minimum')
        padding: 0

    &.altrex-button--ghost
        --altrex-button-padding: 11px $altrex-spacing-5 // Mobile padding minus 1px for border

        +above('md')
            --altrex-button-padding: 10px $altrex-spacing-4

        &.altrex-button--icon-only
            padding: 0 // Touch target mixin handles sizing

    /* Placed here before other pseudo-classes as other pseudo-classes should override 'visited'. */
    &:visited
        color: var(--altrex-button-text-color)

    &:hover
        cursor: pointer

    &:hover,
    &:focus-visible
        background: var(--altrex-button-background-hover)
        border-color: var(--altrex-button-border-color-hover)
        color: var(--altrex-button-text-color-hover)

        .altrex-button__icon
            fill: var(--altrex-button-text-color-hover)

    &:active
        background: var(--altrex-button-background-active)
        border-color: var(--altrex-button-border-color-active)
        color: var(--altrex-button-text-color-active)

        .altrex-button__icon
            fill: var(--altrex-button-text-color-active)

    &:disabled,
    &[aria-disabled='true']
        background: var(--altrex-button-background-disabled, rgb, 0.3)
        border-color: var(--altrex-button-border-color-disabled, rgb, 0.3)
        color: var(--altrex-button-text-color-disabled)
        pointer-events: none

        .altrex-button__icon
            fill: var(--altrex-button-text-color-disabled)

// Touch device feedback
touch-device() {
    .altrex-button:active {
        transform: scale(0.98);
        transition: transform 0.1s ease;
    }
}

.altrex-button--xs
    // Mobile: still meet touch target
    min-height: $altrex-touchTarget-minimum
    font-size: $altrex-font-size-caption
    --altrex-button-padding: $altrex-spacing-3 $altrex-spacing-3

    // Desktop: allow compact sizing
    +above('md')
        min-height: 32px
        --altrex-button-padding: 5px $altrex-spacing-2

    .altrex-button__icon
        altrex-icon-s()

    &.altrex-button--icon-only
        padding: 0 // Touch target mixin handles sizing

    &.altrex-button--ghost
        --altrex-button-padding: 11px $altrex-spacing-3

        +above('md')
            --altrex-button-padding: 4px $altrex-spacing-2

        &.altrex-button--icon-only
            padding: 0


.altrex-button--s
    // Mobile: touch-optimized
    min-height: $altrex-touchTarget-minimum
    --altrex-button-font-size: $altrex-font-size-body-2
    --altrex-button-padding: $altrex-spacing-3 $altrex-spacing-4

    // Desktop: compact sizing
    +above('md')
        min-height: 36px
        --altrex-button-padding: $altrex-spacing-2 $altrex-spacing-4

    .altrex-button__icon
        altrex-icon-s()

    &.altrex-button--icon-only
        padding: 0

    &.altrex-button--ghost
        --altrex-button-padding: 11px $altrex-spacing-4

        +above('md')
            --altrex-button-padding: 7px $altrex-spacing-4

        &.altrex-button--icon-only
            padding: 0


.altrex-button--l
    // Mobile-first: comfortable touch target
    min-height: $altrex-touchTarget-comfortable
    --altrex-button-padding: $altrex-spacing-4 $altrex-spacing-6

    // Desktop: slightly more compact
    +above('md')
        min-height: 48px
        --altrex-button-padding: 15px $altrex-spacing-6

    .altrex-button__icon
        altrex-icon-m()

    &.altrex-button--icon-only
        padding: 0

    &.altrex-button--ghost
        --altrex-button-padding: 15px $altrex-spacing-6

        +above('md')
            --altrex-button-padding: 14px $altrex-spacing-6

        &.altrex-button--icon-only
            padding: 0


.altrex-button--pill {
    --altrex-button-border-radius: $altrex-border-radius-button-pill;
}

.altrex-button--fill {
    --altrex-button-background: $altrex-colors-primary-500;
    --altrex-button-background-hover: $altrex-colors-primary-600;
    --altrex-button-background-active: $altrex-colors-primary-700;
    --altrex-button-background-disabled: $altrex-colors-neutral-300;
    --altrex-button-border-color: $altrex-colors-primary-500;
    --altrex-button-border-color-hover: $altrex-colors-primary-600;
    --altrex-button-border-color-active: $altrex-colors-primary-700;
    --altrex-button-border-color-disabled: $altrex-colors-neutral-300;
    --altrex-button-text-color: $altrex-colors-neutral-50;
    --altrex-button-text-color-hover: $altrex-colors-neutral-50;
    --altrex-button-text-color-active: $altrex-colors-neutral-50;
    --altrex-button-text-color-disabled: $altrex-colors-neutral-600;
}

.altrex-button--ghost {
    --altrex-button-background: transparent;
    --altrex-button-background-hover: $altrex-colors-primary-50;
    --altrex-button-background-active: $altrex-colors-primary-100;
    --altrex-button-background-disabled: transparent;
    --altrex-button-border: 1px solid;
    --altrex-button-border-color: $altrex-colors-primary-500;
    --altrex-button-border-color-hover: $altrex-colors-primary-600;
    --altrex-button-border-color-active: $altrex-colors-primary-700;
    --altrex-button-border-color-disabled: $altrex-colors-neutral-300;
    --altrex-button-text-color: $altrex-colors-primary-500;
    --altrex-button-text-color-hover: $altrex-colors-primary-600;
    --altrex-button-text-color-active: $altrex-colors-primary-700;
    --altrex-button-text-color-disabled: $altrex-colors-neutral-400;
}

.altrex-button--flat {
    --altrex-button-background: transparent;
    --altrex-button-background-hover: $altrex-colors-primary-50;
    --altrex-button-background-active: $altrex-colors-primary-100;
    --altrex-button-background-disabled: transparent;
    --altrex-button-text-color: $altrex-colors-primary-500;
    --altrex-button-text-color-hover: $altrex-colors-primary-600;
    --altrex-button-text-color-active: $altrex-colors-primary-700;
    --altrex-button-text-color-disabled: $altrex-colors-neutral-400;
}

.altrex-button__text {
    vertical-align: middle;

    .altrex-button--icon-left & {
        margin-inline-start: $altrex-spacing-2;
    }

    .altrex-button--icon-right & {
        margin-inline-end: $altrex-spacing-2;
    }
}
</style>
