<template>
    <aside
        class="altrex-side-nav"
        :class="sideNavClasses"
        :style="{ ...cssVariables, width: computedWidth }"
        role="navigation"
        :aria-label="ariaLabel"
    >
        <!-- Navigation Header -->
        <div class="altrex-side-nav__header">
            <slot name="header">
                <!-- Logo -->
                <slot name="logo">
                    <a
                        v-if="computedLogo"
                        :href="computedLogo.href || '/'"
                        class="altrex-side-nav__logo-link"
                        :aria-label="computedLogo.alt || 'Home'"
                    >
                        <AltrexImage
                            :src="logoSrc"
                            :alt="computedLogo.alt || 'Logo'"
                            loading="eager"
                            :show-placeholder="false"
                            class="altrex-side-nav__logo"
                        />
                    </a>
                </slot>

                <!-- Toggle Button -->
                <AltrexButton
                    v-if="collapsible"
                    class="altrex-side-nav__toggle"
                    :aria-label="isOpen ? 'Close navigation' : 'Open navigation'"
                    :aria-expanded="isOpen ? 'true' : 'false'"
                    :right-icon="isOpen ? 'generic-arrow-thick-to-left' : 'generic-arrow-thick-to-right'"
                    size="m"
                    shape="square"
                    @click="toggleNav"

                />
            </slot>
        </div>

        <!-- Navigation Content -->
        <nav class="altrex-side-nav__content">
            <slot>
                <ul class="altrex-side-nav__list" role="list">
                    <template v-for="(item, index) in navigationItems" :key="item.id || index">
                        <!-- Divider -->
                        <li v-if="item.divider" class="altrex-side-nav__divider" role="separator" />

                        <!-- Section with children -->
                        <AltrexNavSection
                            v-else-if="item.section && item.children"
                            :title="item.label"
                            :icon="showIcons ? item.icon : null"
                            :badge="item.badge"
                            :badge-variant="item.badgeVariant"
                            :collapsible="item.collapsible !== false"
                            :default-expanded="item.defaultExpanded"
                            :persist-state="persistState"
                            :storage-key="item.storageKey"
                            :style-overrides="styleOverrides"
                            @toggle="(expanded) => handleSectionToggle(item, expanded)"
                        >
                            <AltrexNavItem
                                v-for="(child, childIndex) in visibleChildren(item.children)"
                                :key="child.id || `${index}-${childIndex}`"
                                :label="child.label"
                                :to="child.to"
                                :href="child.href"
                                :icon="showIcons ? child.icon : null"
                                :icon-right="showIcons ? child.iconRight : null"
                                :badge="child.badge"
                                :badge-variant="child.badgeVariant"
                                :disabled="child.disabled"
                                :active="child.active"
                                :level="1"
                                :router="child.router !== false"
                                :target="child.target"
                                :aria-label="child.ariaLabel"
                                :style-overrides="styleOverrides"
                                @click="(event) => handleItemClick(child, event)"
                            />
                        </AltrexNavSection>

                        <!-- Section title (non-collapsible) -->
                        <li
                            v-else-if="item.section"
                            class="altrex-side-nav__section-title"
                            role="presentation"
                        >
                            {{ item.label }}
                        </li>

                        <!-- Regular navigation item -->
                        <AltrexNavItem
                            v-else-if="isVisible(item)"
                            :label="item.label"
                            :to="item.to"
                            :href="item.href"
                            :icon="showIcons ? item.icon : null"
                            :icon-right="showIcons ? item.iconRight : null"
                            :badge="item.badge"
                            :badge-variant="item.badgeVariant"
                            :disabled="item.disabled"
                            :active="item.active"
                            :router="item.router !== false"
                            :target="item.target"
                            :aria-label="item.ariaLabel"
                            :style-overrides="styleOverrides"
                            @click="(event) => handleItemClick(item, event)"
                        />
                    </template>
                </ul>
            </slot>
        </nav>

        <!-- Footer -->
        <div v-if="$slots.footer" class="altrex-side-nav__footer">
            <slot name="footer" />
        </div>
    </aside>
</template>

<script>
import AltrexNavItem from './AltrexNavItem.vue';
import AltrexNavSection from './AltrexNavSection.vue';
import styling from '@/utils/styling';
import { useThemeStore } from '@/stores/theme';
import AltrexButton from '@/components/Button/AltrexButton.vue';
import AltrexImage from '@/components/Image/AltrexImage.vue';

export default {
    name: 'AltrexSideNav',
    components: {
        AltrexButton,
        AltrexImage,
        AltrexNavItem,
        AltrexNavSection,
    },
    mixins: [styling],
    props: {
        /**
         * Array of navigation items
         */
        navigationItems: {
            type: Array,
            default: () => [],
        },
        /**
         * Logo configuration
         */
        logo: {
            type: Object,
            default: null,
            validator: (value) => {
                if (!value) return true;
                return typeof value === 'object' && (value.light || value.dark);
            },
        },
        /**
         * Width of the sidebar
         */
        width: {
            type: String,
            default: '250px',
        },
        /**
         * Whether the sidebar can be collapsed
         */
        collapsible: {
            type: Boolean,
            default: true,
        },
        /**
         * Default open state
         */
        defaultOpen: {
            type: Boolean,
            default: true,
        },
        /**
         * Controlled open state (v-model:open)
         */
        open: {
            type: Boolean,
            default: null,
        },
        /**
         * Position type
         */
        position: {
            type: String,
            default: 'fixed',
            validator: (value) => ['fixed', 'sticky', 'static'].includes(value),
        },
        /**
         * Show icons in navigation items
         */
        showIcons: {
            type: Boolean,
            default: true,
        },
        /**
         * Persist open/closed state in localStorage
         */
        persistState: {
            type: Boolean,
            default: false,
        },
        /**
         * Storage key for persisted state
         */
        storageKey: {
            type: String,
            default: 'altrex-side-nav-open',
        },
        /**
         * ARIA label for navigation
         */
        ariaLabel: {
            type: String,
            default: 'Main navigation',
        },
        /**
         * Mobile breakpoint in pixels
         */
        mobileBreakpoint: {
            type: Number,
            default: 768,
        },
    },
    emits: ['update:open', 'item-click', 'section-toggle'],
    data() {
        return {
            themePrefix: 'altrex-side-nav',
            internalOpen: this.defaultOpen,
        };
    },
    computed: {
        /**
         * Determine if sidebar is open (controlled or uncontrolled)
         */
        isOpen() {
            return this.open !== null ? this.open : this.internalOpen;
        },

        /**
         * Computed sidebar classes
         */
        sideNavClasses() {
            return [
                `altrex-side-nav--${this.position}`,
                {
                    'altrex-side-nav--open': this.isOpen,
                    'altrex-side-nav--closed': !this.isOpen,
                    'altrex-side-nav--collapsible': this.collapsible,
                },
            ];
        },

        /**
         * Computed width based on open state
         */
        computedWidth() {
            return this.width;
        },

        /**
         * Compute logo configuration
         */
        computedLogo() {
            return this.logo;
        },

        /**
         * Determine logo source based on theme
         */
        logoSrc() {
            if (!this.computedLogo) {
                return null;
            }

            const themeStore = useThemeStore();
            return themeStore.isDark ? this.computedLogo.dark : this.computedLogo.light;
        },

        /**
         * CSS variables for theming
         */
        cssVariables() {
            return this.themeVariables;
        },
    },
    watch: {
        /**
         * Watch for external open changes
         */
        open(newValue) {
            if (newValue !== null && newValue !== this.internalOpen) {
                this.internalOpen = newValue;
                this.saveOpenState();
            }
        },
    },
    mounted() {
        // Restore persisted state
        if (this.persistState && this.open === null) {
            this.loadOpenState();
        }

        // Add mobile breakpoint media query listener
        this.setupMobileListener();
    },
    beforeUnmount() {
        // Clean up media query listener
        if (this.mediaQueryList) {
            this.mediaQueryList.removeEventListener('change', this.handleMobileChange);
        }
    },
    methods: {
        /**
         * Toggle sidebar open/closed
         */
        toggleNav() {
            if (!this.collapsible) {
                return;
            }

            const newOpen = !this.isOpen;
            this.internalOpen = newOpen;
            this.$emit('update:open', newOpen);

            if (this.persistState) {
                this.saveOpenState();
            }
        },

        /**
         * Handle navigation item click
         */
        handleItemClick(item, event) {
            // Execute custom onClick handler if provided
            if (item.onClick && typeof item.onClick === 'function') {
                item.onClick(event);
            }

            // Emit item-click event
            this.$emit('item-click', item, event);
        },

        /**
         * Handle section toggle
         */
        handleSectionToggle(item, expanded) {
            this.$emit('section-toggle', item, expanded);
        },

        /**
         * Check if item is visible
         */
        isVisible(item) {
            return item.visible !== false;
        },

        /**
         * Filter visible children
         */
        visibleChildren(children) {
            if (!children) {
                return [];
            }
            return children.filter((child) => this.isVisible(child));
        },

        /**
         * Save open state to localStorage
         */
        saveOpenState() {
            if (!this.persistState) {
                return;
            }

            try {
                localStorage.setItem(this.storageKey, JSON.stringify(this.isOpen));
            } catch (error) {
                console.warn('Failed to save side nav state:', error);
            }
        },

        /**
         * Load open state from localStorage
         */
        loadOpenState() {
            if (!this.persistState) {
                return;
            }

            try {
                const saved = localStorage.getItem(this.storageKey);
                if (saved !== null) {
                    this.internalOpen = JSON.parse(saved);
                }
            } catch (error) {
                console.warn('Failed to load side nav state:', error);
            }
        },

        /**
         * Setup mobile breakpoint listener
         */
        setupMobileListener() {
            this.mediaQueryList = window.matchMedia(`(max-width: ${this.mobileBreakpoint}px)`);
            this.mediaQueryList.addEventListener('change', this.handleMobileChange);
            this.handleMobileChange(this.mediaQueryList);
        },

        /**
         * Handle mobile breakpoint changes
         */
        handleMobileChange(event) {
            if (event.matches && this.open === null) {
                // On mobile, default to closed
                this.internalOpen = false;
            }
        },
    },
};
</script>

<style lang="stylus" scoped>
.altrex-side-nav
    background-color: var(--altrex-side-nav-background, var(--altrex-bg-primary))
    box-shadow: var(--altrex-side-nav-shadow, 2px 0 5px rgba(0, 0, 0, 0.1))
    color: var(--altrex-side-nav-color, var(--altrex-text-primary))
    display: flex
    flex-direction: column
    height: 100vh
    transition: var(--altrex-side-nav-transition, transform 0.3s ease, background-color 0.3s ease, color 0.3s ease)

    // Mobile: hidden drawer (overlay, 80vw width)
    position: fixed
    top: 0
    left: 0
    width: 80vw
    max-width: 320px
    transform: translateX(-100%)
    z-index: 1000

    &.altrex-side-nav--open
        transform: translateX(0)

    // Tablet+: persistent sidebar
    +above('md')
        position: relative
        transform: translateX(0)
        width: 250px
        max-width: none

        &.altrex-side-nav--closed
            transform: translateX(-100%)

    // Desktop: wider option
    +above('lg')
        width: 300px

    &.altrex-side-nav--fixed
        +above('md')
            position: fixed

    &.altrex-side-nav--sticky
        +above('md')
            position: sticky

    &.altrex-side-nav--static
        +above('md')
            position: static


.altrex-side-nav__header {
    align-items: center;
    border-bottom: 1px solid var(--altrex-side-nav-border-color, var(--altrex-border-color));
    display: flex;
    flex-shrink: 0;
    justify-content: space-between;
    padding: var(--altrex-side-nav-header-padding, 1.5rem 0);
}

.altrex-side-nav__logo-link {
    display: block;
    text-decoration: none;
}

.altrex-side-nav__logo {
    display: block;
    max-width: var(--altrex-side-nav-logo-max-width, 250px);
    padding: var(--altrex-side-nav-logo-padding, 10px);
}

.altrex-side-nav__toggle {
    background: none;
    border: none;
    color: var(--altrex-side-nav-color, var(--altrex-text-primary));
    cursor: pointer;
    display: flex;
    transition: color 0.2s, opacity 0.2s;
    border-radius: 0.25rem;
    margin-left: 1rem;

    &:hover {
        color: var(--altrex-side-nav-toggle-color-hover, #3498db);
        background-color: var(--altrex-side-nav-toggle-background-hover, var(--altrex-border-color));
    }

    &:focus-visible {
        outline: 2px solid var(--altrex-side-nav-focus-color, #3498db);
        outline-offset: 2px;
    }
}

.altrex-side-nav__content {
    flex: 1;
    overflow-y: auto;
    padding: var(--altrex-side-nav-content-padding, 1rem 0);

    // Scrollbar styling
    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(236, 240, 241, 0.05);
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(236, 240, 241, 0.2);
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: rgba(236, 240, 241, 0.3);
    }
}

.altrex-side-nav__list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.altrex-side-nav__section-title {
    color: var(--altrex-side-nav-section-title-color, var(--altrex-text-secondary));
    font-size: var(--altrex-side-nav-section-title-font-size, 0.75rem);
    font-weight: var(--altrex-side-nav-section-title-font-weight, 600);
    letter-spacing: var(--altrex-side-nav-section-title-letter-spacing, 0.05em);
    padding: var(--altrex-side-nav-section-title-padding, 1rem 1.5rem 0.5rem);
    text-transform: var(--altrex-side-nav-section-title-text-transform, uppercase);
}

.altrex-side-nav__divider {
    background-color: var(--altrex-side-nav-divider-color, var(--altrex-border-color));
    height: var(--altrex-side-nav-divider-height, 1px);
    list-style: none;
    margin: var(--altrex-side-nav-divider-margin, 0.5rem 1.5rem);
}

.altrex-side-nav__footer {
    border-top: 1px solid var(--altrex-side-nav-border-color, var(--altrex-border-color));
    flex-shrink: 0;
    padding: var(--altrex-side-nav-footer-padding, 1rem);
}

// Mobile-only backdrop overlay
// NOTE: Backdrop element needs to be added to template:
// <div v-if="isOpen" class="altrex-side-nav-backdrop" @click="toggleNav" />
.altrex-side-nav-backdrop
    position: fixed
    inset: 0
    background: rgba(0, 0, 0, 0.5)
    z-index: 999

    // No backdrop on desktop (sidebar is always visible)
    +above('md')
        display: none

</style>
