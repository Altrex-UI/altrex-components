<template>
    <div
        class="altrex-theme-toggle"
        :class="computedClasses"
        :style="cssProps"
        role="radiogroup"
        :aria-label="ariaLabel"
    >
        <AltrexButton
            v-for="mode in modes"
            :key="mode.value"
            class="altrex-theme-toggle__option"
            :class="{ 'altrex-theme-toggle__option--active': themeStore.theme === mode.value }"
            role="radio"
            :aria-checked="themeStore.theme === mode.value ? 'true' : 'false'"
            :aria-label="mode.ariaLabel"
            :left-icon="mode.icon"
            :label="showLabels ? mode.label : null"
            :size="size"
            variant="flat"
            @click="handleThemeChange(mode.value)"
        />
    </div>
</template>

<script>
import { useThemeStore } from '@/stores/theme';
import styling from '@/utils/styling';
import AltrexButton from '../Button/AltrexButton.vue';

export default {
    name: 'AltrexThemeToggle',
    components: {
        AltrexButton,
    },
    mixins: [styling],
    props: {
        /**
         * Show text labels alongside icons
         */
        showLabels: {
            type: Boolean,
            default: false,
        },
        /**
         * Size variant
         */
        size: {
            type: String,
            default: 'm',
            validator: (value) => ['s', 'm', 'l'].includes(value),
        },
        /**
         * Visual style variant
         */
        variant: {
            type: String,
            default: 'segmented',
            validator: (value) => ['buttons', 'segmented'].includes(value),
        },
        /**
         * ARIA label for the toggle group
         */
        ariaLabel: {
            type: String,
            default: 'Theme selection',
        },
    },
    data() {
        return {
            themePrefix: 'altrex-theme-toggle',
            themeStore: useThemeStore(),
            modes: [
                {
                    value: 'light',
                    icon: 'generic-sun',
                    label: 'Light',
                    ariaLabel: 'Light theme',
                },
                {
                    value: 'dark',
                    icon: 'generic-moon',
                    label: 'Dark',
                    ariaLabel: 'Dark theme',
                },
                {
                    value: 'auto',
                    icon: 'generic-monitor',
                    label: 'Auto',
                    ariaLabel: 'Auto theme (follows system preference)',
                },
            ],
        };
    },
    computed: {
        computedClasses() {
            return [
                `altrex-theme-toggle--${this.size}`,
                `altrex-theme-toggle--${this.variant}`,
                {
                    'altrex-theme-toggle--with-labels': this.showLabels,
                },
            ];
        },
        iconSize() {
            const sizeMap = {
                s: 's',
                m: 'm',
                l: 'l',
            };
            return sizeMap[this.size] || 'm';
        },
        cssProps() {
            return this.themeVariables;
        },
    },
    methods: {
        handleThemeChange(theme) {
            this.themeStore.setTheme(theme);
        },
    },
};
</script>

<style lang="stylus" scoped>
.altrex-theme-toggle {
    display: inline-flex;
    align-items: center;
    gap: var(--altrex-theme-toggle-gap, 0);
    background-color: var(--altrex-theme-toggle-background, transparent);
    border-radius: var(--altrex-theme-toggle-border-radius, 9999px);
    padding: var(--altrex-theme-toggle-padding, 0);
    transition: background-color 0.2s ease;

    &.altrex-theme-toggle--segmented {
        --altrex-theme-toggle-background: var(--altrex-border-color);
        --altrex-theme-toggle-padding: 0.25rem;
        --altrex-theme-toggle-gap: 0.25rem;
    }

    &.altrex-theme-toggle--buttons {
        --altrex-theme-toggle-gap: 0.5rem;
    }

    // Size variants
    &.altrex-theme-toggle--s {
        --altrex-theme-toggle-option-padding: 0.375rem;

        &.altrex-theme-toggle--with-labels .altrex-theme-toggle__option {
            --altrex-theme-toggle-option-padding: 0.375rem 0.75rem;
        }
    }

    &.altrex-theme-toggle--m {
        --altrex-theme-toggle-option-padding: 0.5rem;

        &.altrex-theme-toggle--with-labels .altrex-theme-toggle__option {
            --altrex-theme-toggle-option-padding: 0.5rem 1rem;
        }
    }

    &.altrex-theme-toggle--l {
        --altrex-theme-toggle-option-padding: 0.625rem;

        &.altrex-theme-toggle--with-labels .altrex-theme-toggle__option {
            --altrex-theme-toggle-option-padding: 0.625rem 1.25rem;
        }
    }
}

.altrex-theme-toggle__option {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--altrex-theme-toggle-option-background, transparent);
    border: var(--altrex-theme-toggle-option-border, none);
    border-radius: var(--altrex-theme-toggle-option-border-radius, 9999px);
    color: var(--altrex-theme-toggle-option-color, var(--altrex-text-secondary));
    cursor: pointer;
    font-family: inherit;
    font-size: var(--altrex-theme-toggle-option-font-size, 0.875rem);
    font-weight: var(--altrex-theme-toggle-option-font-weight, 500);
    padding: var(--altrex-theme-toggle-option-padding, 0.5rem);
    transition: background-color 0.2s ease, color 0.2s ease, transform 0.1s ease;
    white-space: nowrap;

    &:hover:not(&--active) {
        background-color: var(--altrex-theme-toggle-option-background-hover, rgba(0, 0, 0, 0.05));
        color: var(--altrex-theme-toggle-option-color-hover, var(--altrex-text-primary));
    }

    &:focus-visible {
        outline: 2px solid var(--altrex-theme-toggle-option-focus-color, #3498db);
        outline-offset: 2px;
    }

    &:active {
        transform: scale(0.95);
    }

    &--active {
        background-color: var(--altrex-theme-toggle-option-background-active, var(--altrex-bg-primary));
        color: var(--altrex-theme-toggle-option-color-active, var(--altrex-text-primary));
        box-shadow: var(--altrex-theme-toggle-option-shadow-active, 0 1px 3px rgba(0, 0, 0, 0.1));
    }
}

.altrex-theme-toggle__label {
    display: inline-block;
}

// Dark theme adjustments
html[data-theme="dark"] {
    .altrex-theme-toggle__option {
        &:hover:not(.altrex-theme-toggle__option--active) {
            background-color: var(--altrex-theme-toggle-option-background-hover, rgba(255, 255, 255, 0.1));
        }
    }
}
</style>
