<template>
    <li class="altrex-nav-item" :class="itemClasses">
        <component
            :is="renderTag"
            :class="linkClasses"
            :aria-disabled="disabled || null"
            :aria-label="ariaLabel || label"
            :aria-current="isActive ? 'page' : null"
            :target="linkTarget"
            :tabindex="disabled ? -1 : 0"
            v-bind="navigationAttributes"
            :style="themeVariables"
            @click="handleClick"
            @keydown.enter.prevent="handleClick"
            @keydown.space.prevent="handleClick"
        >
            <!-- Left Icon -->
            <slot name="icon-left">
                <AltrexIcon
                    v-if="icon"
                    :icon="icon"
                    class="altrex-nav-item__icon altrex-nav-item__icon--left"
                />
            </slot>

            <!-- Label -->
            <span class="altrex-nav-item__label">
                <slot>{{ label }}</slot>
            </span>

            <!-- Right Icon -->
            <slot name="icon-right">
                <AltrexIcon
                    v-if="iconRight"
                    :icon="iconRight"
                    class="altrex-nav-item__icon altrex-nav-item__icon--right"
                />
            </slot>

            <!-- Badge -->
            <AltrexBadge
                v-if="badge"
                :content="badge"
                :variant="badgeVariant"
                size="medium"
            >
                <template v-if="$slots.badge">
                    <slot name="badge" />
                </template>
            </AltrexBadge>

            <!-- Expand Icon (for items with children) -->
            <AltrexIcon
                v-if="hasChildren && showExpandIcon"
                :icon="expandIcon"
                class="altrex-nav-item__expand-icon"
                :class="{ 'altrex-nav-item__expand-icon--expanded': expanded }"
            />
        </component>
    </li>
</template>

<script>
import AltrexIcon from '@/components/Icon/AltrexIcon.vue';
import AltrexBadge from '@/components/Badge/AltrexBadge.vue';
import styling from '@/utils/styling';

export default {
    name: 'AltrexNavItem',
    components: {
        AltrexIcon,
        AltrexBadge,
    },
    mixins: [styling],
    props: {
        /**
         * Display label for the navigation item
         */
        label: {
            type: String,
            required: true,
        },
        /**
         * Router destination (string path or route object)
         */
        to: {
            type: [String, Object],
            default: null,
        },
        /**
         * External link href
         */
        href: {
            type: String,
            default: null,
        },
        /**
         * Left icon name from altrex-icons
         */
        icon: {
            type: String,
            default: null,
        },
        /**
         * Right icon name from altrex-icons
         */
        iconRight: {
            type: String,
            default: null,
        },
        /**
         * Badge content (text or number)
         */
        badge: {
            type: [String, Number],
            default: null,
        },
        /**
         * Badge variant style
         */
        badgeVariant: {
            type: String,
            default: 'primary',
            validator: (value) => ['primary', 'success', 'warning', 'danger', 'neutral'].includes(value),
        },
        /**
         * Disabled state
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Whether this item is currently active
         */
        active: {
            type: Boolean,
            default: false,
        },
        /**
         * Indentation level for nested items
         */
        level: {
            type: Number,
            default: 0,
        },
        /**
         * Whether this item has children (affects styling)
         */
        hasChildren: {
            type: Boolean,
            default: false,
        },
        /**
         * Whether children are expanded (for items with children)
         */
        expanded: {
            type: Boolean,
            default: false,
        },
        /**
         * Show expand/collapse icon
         */
        showExpandIcon: {
            type: Boolean,
            default: true,
        },
        /**
         * Icon to use for expand indicator
         */
        expandIcon: {
            type: String,
            default: 'chevron-right',
        },
        /**
         * ARIA label for accessibility
         */
        ariaLabel: {
            type: String,
            default: null,
        },
        /**
         * Link target attribute
         */
        target: {
            type: String,
            default: null,
            validator: (value) => ['_blank', '_self', '_parent', '_top'].includes(value),
        },
        /**
         * Use router-link component
         */
        router: {
            type: Boolean,
            default: true,
        },
    },
    emits: ['click', 'toggle'],
    data() {
        return {
            themePrefix: 'altrex-nav-item',
        };
    },
    computed: {
        /**
         * Determine which HTML element/component to render
         */
        renderTag() {
            if (this.hasChildren && !this.to && !this.href) {
                return 'button';
            }
            if (this.router && this.to) {
                return 'router-link';
            }
            if (this.href) {
                return 'a';
            }
            return 'button';
        },

        /**
         * Check if this is a navigation element (link)
         */
        isNavigationElement() {
            return this.to || this.href;
        },

        /**
         * Determine if item is active (for router-link)
         */
        isActive() {
            if (this.active) {
                return true;
            }
            // Let router-link handle active-class automatically
            return false;
        },

        /**
         * Item container classes
         */
        itemClasses() {
            return {
                'altrex-nav-item--has-children': this.hasChildren,
                'altrex-nav-item--expanded': this.expanded,
                [`altrex-nav-item--level-${this.level}`]: this.level > 0,
            };
        },

        /**
         * Link/button classes
         */
        linkClasses() {
            return [
                'altrex-nav-item__link',
                {
                    'altrex-nav-item__link--active': this.isActive,
                    'altrex-nav-item__link--disabled': this.disabled,
                    'altrex-nav-item__link--has-icon': this.icon || this.iconRight,
                    'altrex-nav-item__link--has-badge': this.badge,
                },
            ];
        },

        /**
         * Navigation attributes for router-link or anchor
         */
        navigationAttributes() {
            const tag = this.renderTag;

            if (tag === 'router-link' && this.to) {
                return {
                    to: this.to,
                    activeClass: 'altrex-nav-item__link--active',
                };
            }

            if (tag === 'a' && this.href) {
                return {
                    href: this.href,
                };
            }

            if (tag === 'button') {
                return {
                    type: 'button',
                };
            }

            return {};
        },

        /**
         * Link target (only for external links)
         */
        linkTarget() {
            return this.href && this.target ? this.target : null;
        },
    },
    methods: {
        /**
         * Handle click on navigation item
         */
        handleClick(event) {
            if (this.disabled) {
                event.preventDefault();
                return;
            }

            // If item has children, toggle expansion
            if (this.hasChildren && !this.isNavigationElement) {
                event.preventDefault();
                this.$emit('toggle', !this.expanded);
            }

            // Emit click event
            this.$emit('click', event);
        },
    },
};
</script>

<style lang="stylus" scoped>
.altrex-nav-item {
    list-style: none;
    margin: 0;
    position: relative;

    // Indentation for nested levels
    &.altrex-nav-item--level-1 {
        .altrex-nav-item__link {
            padding-left: calc(var(--altrex-nav-item-padding-left, 1.5rem) + 1rem);
        }
    }

    &.altrex-nav-item--level-2 {
        .altrex-nav-item__link {
            padding-left: calc(var(--altrex-nav-item-padding-left, 1.5rem) + 2rem);
        }
    }

    &.altrex-nav-item--level-3 {
        .altrex-nav-item__link {
            padding-left: calc(var(--altrex-nav-item-padding-left, 1.5rem) + 3rem);
        }
    }
}

.altrex-nav-item__link {
    align-items: center;
    background-color: var(--altrex-nav-item-background, transparent);
    border: none;
    border-left: var(--altrex-nav-item-border-left, 3px solid transparent);
    color: var(--altrex-nav-item-color, var(--altrex-text-primary));
    cursor: pointer;
    display: flex;
    font-family: inherit;
    font-size: var(--altrex-nav-item-font-size, 1rem);
    font-weight: var(--altrex-nav-item-font-weight, 500);
    gap: var(--altrex-nav-item-gap, 0.75rem);
    padding: var(--altrex-nav-item-padding, 0.75rem 1.5rem);
    text-align: left;
    text-decoration: none;
    transition: var(--altrex-nav-item-transition, background-color 0.2s, color 0.2s);
    width: 100%;

    &:hover {
        background-color: var(--altrex-nav-item-background-hover, var(--altrex-border-color));
        color: var(--altrex-nav-item-color-hover, #3498db);
    }

    &:focus-visible {
        outline: 2px solid var(--altrex-nav-item-focus-color, #3498db);
        outline-offset: -2px;
    }

    &.altrex-nav-item__link--active {
        background-color: var(--altrex-nav-item-background-active, rgba(52, 152, 219, 0.2));
        border-left-color: var(--altrex-nav-item-border-active-color, #3498db);
        color: var(--altrex-nav-item-color-active, #3498db);
        padding-left: calc(var(--altrex-nav-item-padding-left, 1.5rem) - 3px);

        .altrex-nav-item__icon {
            fill: var(--altrex-nav-item-color-active, #3498db);
        }
    }

    &.altrex-nav-item__link--disabled {
        color: var(--altrex-nav-item-color-disabled, #95a5a6);
        cursor: not-allowed;
        opacity: 0.5;
        pointer-events: none;
    }
}

.altrex-nav-item__icon {
    fill: currentColor;
    flex-shrink: 0;
    height: var(--altrex-nav-item-icon-size, 18px);
    transition: fill 0.2s;
    width: var(--altrex-nav-item-icon-size, 18px);
}

.altrex-nav-item__label {
    flex: 1;
    vertical-align: middle;
}

.altrex-nav-item__expand-icon {
    fill: currentColor;
    flex-shrink: 0;
    height: var(--altrex-nav-item-expand-icon-size, 16px);
    margin-left: auto;
    transition: transform 0.2s ease;
    width: var(--altrex-nav-item-expand-icon-size, 16px);

    &.altrex-nav-item__expand-icon--expanded {
        transform: rotate(90deg);
    }
}
</style>
