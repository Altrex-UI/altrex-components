<template>
    <nav
        :aria-label="ariaLabel"
        class="altrex-breadcrumb"
        :style="cssProps"
    >
        <ol class="altrex-breadcrumb__list">
            <li
                v-for="(item, index) in items"
                :key="index"
                class="altrex-breadcrumb__item"
            >
                <component
                    :is="getLinkComponent(item, index)"
                    :class="getLinkClasses(item, index)"
                    v-bind="getLinkAttributes(item, index)"
                >
                    <AltrexIcon
                        v-if="item.icon"
                        :icon="item.icon"
                        class="altrex-breadcrumb__icon"
                    />
                    <span class="altrex-breadcrumb__text">{{ item.label }}</span>
                </component>

                <span
                    v-if="index < items.length - 1"
                    class="altrex-breadcrumb__separator"
                    aria-hidden="true"
                >
                    <slot name="separator">
                        <AltrexIcon
                            :icon="separatorIcon"
                            class="altrex-breadcrumb__separator-icon"
                        />
                    </slot>
                </span>
            </li>
        </ol>
    </nav>
</template>

<script>
import AltrexIcon from '@/components/Icon/AltrexIcon.vue';
import styling from '@/utils/styling';

export default {
    name: 'AltrexBreadcrumb',
    components: {
        AltrexIcon,
    },
    mixins: [styling],
    props: {
        ariaLabel: {
            type: String,
            default: 'Breadcrumb navigation',
        },
        items: {
            type: Array,
            required: true,
            validator: (items) => {
                return items.every(item =>
                    item && typeof item === 'object' && item.label
                );
            },
        },
        separatorIcon: {
            type: String,
            default: 'generic-chevron-right',
        },
        maxItems: {
            type: Number,
            default: null,
        },
        collapseFrom: {
            type: String,
            default: 'middle',
            validator: (value) => ['start', 'middle', 'end'].includes(value),
        },
    },
    data() {
        return {
            themePrefix: 'altrex-breadcrumb',
        };
    },
    computed: {
        processedItems() {
            if (!this.maxItems || this.items.length <= this.maxItems) {
                return this.items;
            }

            // Collapse items based on maxItems
            const collapsed = { label: '...', disabled: true };

            if (this.collapseFrom === 'start') {
                return [
                    this.items[0],
                    collapsed,
                    ...this.items.slice(-(this.maxItems - 2))
                ];
            } else if (this.collapseFrom === 'end') {
                return [
                    ...this.items.slice(0, this.maxItems - 2),
                    collapsed,
                    this.items[this.items.length - 1]
                ];
            } else {
                // middle
                const keep = Math.floor((this.maxItems - 1) / 2);
                return [
                    ...this.items.slice(0, keep),
                    collapsed,
                    ...this.items.slice(-(this.maxItems - keep - 1))
                ];
            }
        },
    },
    methods: {
        getLinkComponent(item, index) {
            const isLast = index === this.items.length - 1;
            const isDisabled = item.disabled || isLast;

            if (isDisabled || (!item.href && !item.to)) {
                return 'span';
            }

            if (item.to) {
                return 'router-link';
            }

            return 'a';
        },

        getLinkClasses(item, index) {
            const isLast = index === this.items.length - 1;
            return {
                'altrex-breadcrumb__link': true,
                'altrex-breadcrumb__link--active': isLast,
                'altrex-breadcrumb__link--disabled': item.disabled,
            };
        },

        getLinkAttributes(item, index) {
            const isLast = index === this.items.length - 1;
            const attrs = {
                'aria-current': isLast ? 'page' : null,
            };

            if (item.href && !item.disabled && !isLast) {
                attrs.href = item.href;
                if (item.target) {
                    attrs.target = item.target;
                }
            }

            if (item.to && !item.disabled && !isLast) {
                attrs.to = item.to;
            }

            return attrs;
        },
    },
};
</script>

<style lang="stylus">
.altrex-breadcrumb
    width: 100%

.altrex-breadcrumb__list
    display: flex
    flex-wrap: wrap
    align-items: center
    list-style: none
    margin: 0
    padding: 0
    gap: var(--altrex-breadcrumb-gap, $altrex-spacing-2)

.altrex-breadcrumb__item
    display: flex
    align-items: center
    gap: var(--altrex-breadcrumb-gap, $altrex-spacing-2)

.altrex-breadcrumb__link
    // Mobile-first: Touch-optimized targets
    display: inline-flex
    align-items: center
    gap: $altrex-spacing-2
    min-height: $altrex-touchTarget-minimum
    padding: $altrex-spacing-2 $altrex-spacing-3

    // Typography
    color: var(--altrex-breadcrumb-color, $altrex-colors-neutral-700)
    font-size: var(--altrex-breadcrumb-font-size, 16px)
    font-weight: var(--altrex-breadcrumb-font-weight, $altrex-font-weight-normal)
    line-height: 1.5
    text-decoration: none

    // Visual styling
    border-radius: var(--altrex-breadcrumb-border-radius, $altrex-borderRadius-default)
    transition: var(--altrex-breadcrumb-transition, all $altrex-transition-default)

    // Desktop: more compact sizing
    +above('md')
        min-height: 32px
        padding: $altrex-spacing-1 $altrex-spacing-2
        font-size: var(--altrex-breadcrumb-font-size, $altrex-fontSize-base)

    // Interactive states for links
    &:not(.altrex-breadcrumb__link--active):not(.altrex-breadcrumb__link--disabled)
        cursor: pointer

        &:hover
            color: var(--altrex-breadcrumb-color-hover, $altrex-colors-primary-600)
            background: var(--altrex-breadcrumb-background-hover, $altrex-colors-primary-50)

            [data-theme="dark"] &
                color: var(--altrex-colors-dark-primary-400)
                background: var(--altrex-colors-dark-bg-hover)

        &:focus-visible
            outline: 2px solid var(--altrex-breadcrumb-outline-color, $altrex-colors-primary-500)
            outline-offset: 2px

            [data-theme="dark"] &
                outline-color: var(--altrex-colors-dark-primary-400)

        // Touch feedback
        +touch-device()
            &:active
                transform: scale(0.98)
                background: var(--altrex-breadcrumb-background-active, $altrex-colors-primary-100)

                [data-theme="dark"] &
                    background: var(--altrex-colors-dark-bg-active)

    // Current page (last item)
    &.altrex-breadcrumb__link--active
        color: var(--altrex-breadcrumb-color-active, $altrex-colors-neutral-900)
        font-weight: var(--altrex-breadcrumb-font-weight-active, $altrex-font-weight-medium)
        cursor: default

        [data-theme="dark"] &
            color: var(--altrex-colors-dark-text-primary)

    // Disabled items
    &.altrex-breadcrumb__link--disabled
        color: var(--altrex-breadcrumb-color-disabled, $altrex-colors-neutral-400)
        cursor: not-allowed
        pointer-events: none

        [data-theme="dark"] &
            color: var(--altrex-colors-dark-text-disabled)

.altrex-breadcrumb__icon
    flex-shrink: 0
    fill: currentColor
    altrex-icon-s()

.altrex-breadcrumb__text
    // Truncate long text on mobile
    max-width: 150px
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap

    // Allow more space on larger screens
    +above('md')
        max-width: 200px

    +above('lg')
        max-width: 300px

.altrex-breadcrumb__separator
    display: inline-flex
    align-items: center
    color: var(--altrex-breadcrumb-separator-color, $altrex-colors-neutral-400)
    user-select: none

    [data-theme="dark"] &
        color: var(--altrex-colors-dark-text-tertiary)

.altrex-breadcrumb__separator-icon
    flex-shrink: 0
    fill: currentColor
    altrex-icon-s()

// Dark mode overrides
[data-theme="dark"]
    .altrex-breadcrumb__link
        color: var(--altrex-colors-dark-text-secondary)

        &.altrex-breadcrumb__link--active
            color: var(--altrex-colors-dark-text-primary)
</style>
