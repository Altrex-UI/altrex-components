<template>
    <li class="altrex-nav-section" :class="sectionClasses">
        <!-- Section Header (clickable if collapsible) -->
        <component
            :is="headerTag"
            class="altrex-nav-section__header"
            :class="headerClasses"
            :aria-expanded="isExpanded ? 'true' : 'false'"
            :aria-controls="sectionId"
            :tabindex="collapsible ? 0 : null"
            :style="themeVariables"
            @click="handleToggle"
            @keydown.enter.prevent="handleToggle"
            @keydown.space.prevent="handleToggle"
            @keydown.arrow-right.prevent="expand"
            @keydown.arrow-left.prevent="collapse"
        >
            <!-- Section Icon -->
            <slot name="icon">
                <AltrexIcon
                    v-if="icon"
                    :icon="icon"
                    class="altrex-nav-section__icon"
                />
            </slot>

            <!-- Section Title -->
            <span class="altrex-nav-section__title">
                <slot name="title">{{ title }}</slot>
            </span>

            <!-- Badge -->
            <AltrexBadge
                v-if="badge"
                :content="badge"
                :variant="badgeVariant"
                size="small"
            >
                <template v-if="$slots.badge">
                    <slot name="badge" />
                </template>
            </AltrexBadge>

            <!-- Expand/Collapse Icon -->
            <AltrexIcon
                v-if="collapsible"
                :icon="expandIcon"
                class="altrex-nav-section__expand-icon"
                :class="{ 'altrex-nav-section__expand-icon--expanded': isExpanded }"
            />
        </component>

        <!-- Section Content (collapsible) -->
        <transition
            name="altrex-nav-section-collapse"
            @enter="onEnter"
            @after-enter="onAfterEnter"
            @leave="onLeave"
            @after-leave="onAfterLeave"
        >
            <ul
                v-show="isExpanded"
                :id="sectionId"
                class="altrex-nav-section__content"
                role="group"
                :aria-labelledby="sectionId + '-header'"
            >
                <slot />
            </ul>
        </transition>
    </li>
</template>

<script>
import AltrexIcon from '@/components/Icon/AltrexIcon.vue';
import AltrexBadge from '@/components/Badge/AltrexBadge.vue';
import styling from '@/utils/styling';

let sectionCounter = 0;

export default {
    name: 'AltrexNavSection',
    components: {
        AltrexIcon,
        AltrexBadge,
    },
    mixins: [styling],
    props: {
        /**
         * Section title
         */
        title: {
            type: String,
            required: true,
        },
        /**
         * Icon for the section
         */
        icon: {
            type: String,
            default: null,
        },
        /**
         * Badge content
         */
        badge: {
            type: [String, Number],
            default: null,
        },
        /**
         * Badge variant
         */
        badgeVariant: {
            type: String,
            default: 'primary',
            validator: (value) => ['primary', 'success', 'warning', 'danger', 'neutral'].includes(value),
        },
        /**
         * Whether section can be collapsed
         */
        collapsible: {
            type: Boolean,
            default: true,
        },
        /**
         * Default expanded state
         */
        defaultExpanded: {
            type: Boolean,
            default: false,
        },
        /**
         * Controlled expanded state (v-model:expanded)
         */
        expanded: {
            type: Boolean,
            default: null,
        },
        /**
         * Icon for expand indicator
         */
        expandIcon: {
            type: String,
            default: 'chevron-right',
        },
        /**
         * Indentation level
         */
        level: {
            type: Number,
            default: 0,
        },
        /**
         * Persist expanded state in localStorage
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
            default: null,
        },
    },
    emits: ['update:expanded', 'toggle'],
    data() {
        return {
            themePrefix: 'altrex-nav-section',
            internalExpanded: this.defaultExpanded,
            sectionId: `altrex-nav-section-${++sectionCounter}`,
        };
    },
    computed: {
        /**
         * Determine if section is expanded (controlled or uncontrolled)
         */
        isExpanded() {
            return this.expanded !== null ? this.expanded : this.internalExpanded;
        },

        /**
         * Header element tag (button if collapsible, div otherwise)
         */
        headerTag() {
            return this.collapsible ? 'button' : 'div';
        },

        /**
         * Section container classes
         */
        sectionClasses() {
            return {
                'altrex-nav-section--expanded': this.isExpanded,
                'altrex-nav-section--collapsed': !this.isExpanded,
                'altrex-nav-section--collapsible': this.collapsible,
                [`altrex-nav-section--level-${this.level}`]: this.level > 0,
            };
        },

        /**
         * Header classes
         */
        headerClasses() {
            return {
                'altrex-nav-section__header--collapsible': this.collapsible,
                'altrex-nav-section__header--expanded': this.isExpanded,
            };
        },

        /**
         * Storage key for persistence
         */
        computedStorageKey() {
            return this.storageKey || `altrex-nav-section-${this.title.toLowerCase().replace(/\s+/g, '-')}`;
        },
    },
    watch: {
        /**
         * Watch for external expanded changes
         */
        expanded(newValue) {
            if (newValue !== null && newValue !== this.internalExpanded) {
                this.internalExpanded = newValue;
                this.saveState();
            }
        },
    },
    mounted() {
        // Restore persisted state
        if (this.persistState && this.expanded === null) {
            this.loadState();
        }
    },
    methods: {
        /**
         * Toggle section expansion
         */
        handleToggle() {
            if (!this.collapsible) {
                return;
            }

            const newExpanded = !this.isExpanded;

            // Update internal state
            this.internalExpanded = newExpanded;

            // Emit events
            this.$emit('update:expanded', newExpanded);
            this.$emit('toggle', newExpanded);

            // Persist state
            if (this.persistState) {
                this.saveState();
            }
        },

        /**
         * Expand the section
         */
        expand() {
            if (!this.collapsible || this.isExpanded) {
                return;
            }
            this.handleToggle();
        },

        /**
         * Collapse the section
         */
        collapse() {
            if (!this.collapsible || !this.isExpanded) {
                return;
            }
            this.handleToggle();
        },

        /**
         * Save expanded state to localStorage
         */
        saveState() {
            if (!this.persistState) {
                return;
            }

            try {
                localStorage.setItem(this.computedStorageKey, JSON.stringify(this.isExpanded));
            } catch (error) {
                console.warn('Failed to save nav section state:', error);
            }
        },

        /**
         * Load expanded state from localStorage
         */
        loadState() {
            if (!this.persistState) {
                return;
            }

            try {
                const saved = localStorage.getItem(this.computedStorageKey);
                if (saved !== null) {
                    this.internalExpanded = JSON.parse(saved);
                }
            } catch (error) {
                console.warn('Failed to load nav section state:', error);
            }
        },

        /**
         * Transition hooks for smooth collapse animation
         */
        onEnter(element) {
            element.style.height = '0';
            element.style.opacity = '0';
        },

        onAfterEnter(element) {
            element.style.height = 'auto';
            element.style.opacity = '1';
        },

        onLeave(element) {
            element.style.height = `${element.scrollHeight}px`;
            element.style.opacity = '1';
            // Force reflow
            element.offsetHeight;
            element.style.height = '0';
            element.style.opacity = '0';
        },

        onAfterLeave(element) {
            element.style.height = '';
            element.style.opacity = '';
        },
    },
};
</script>

<style lang="stylus" scoped>
.altrex-nav-section {
    list-style: none;
    margin: 0;

    // Indentation for nested levels
    &.altrex-nav-section--level-1 {
        .altrex-nav-section__header {
            padding-left: calc(var(--altrex-nav-section-padding-left, 1.5rem) + 1rem);
        }
    }

    &.altrex-nav-section--level-2 {
        .altrex-nav-section__header {
            padding-left: calc(var(--altrex-nav-section-padding-left, 1.5rem) + 2rem);
        }
    }
}

.altrex-nav-section__header {
    align-items: center;
    background-color: var(--altrex-nav-section-header-background, transparent);
    border: none;
    color: var(--altrex-nav-section-header-color, var(--altrex-text-secondary));
    cursor: default;
    display: flex;
    font-family: inherit;
    font-size: var(--altrex-nav-section-header-font-size, 0.75rem);
    font-weight: var(--altrex-nav-section-header-font-weight, 600);
    gap: var(--altrex-nav-section-header-gap, 0.5rem);
    letter-spacing: var(--altrex-nav-section-header-letter-spacing, 0.05em);
    padding: var(--altrex-nav-section-header-padding, 1rem 1.5rem 0.5rem);
    text-align: left;
    text-transform: var(--altrex-nav-section-header-text-transform, uppercase);
    transition: var(--altrex-nav-section-header-transition, background-color 0.2s, color 0.2s);
    width: 100%;

    &.altrex-nav-section__header--collapsible {
        cursor: pointer;

        &:hover {
            background-color: var(--altrex-nav-section-header-background-hover, var(--altrex-border-color));
            color: var(--altrex-nav-section-header-color-hover, var(--altrex-text-primary));
        }

        &:focus-visible {
            outline: 2px solid var(--altrex-nav-section-focus-color, #3498db);
            outline-offset: -2px;
        }
    }
}

.altrex-nav-section__icon {
    fill: currentColor;
    flex-shrink: 0;
    height: var(--altrex-nav-section-icon-size, 16px);
    width: var(--altrex-nav-section-icon-size, 16px);
}

.altrex-nav-section__title {
    flex: 1;
}

.altrex-nav-section__expand-icon {
    fill: currentColor;
    flex-shrink: 0;
    height: var(--altrex-nav-section-expand-icon-size, 14px);
    transition: transform 0.2s ease;
    width: var(--altrex-nav-section-expand-icon-size, 14px);

    &.altrex-nav-section__expand-icon--expanded {
        transform: rotate(90deg);
    }
}

.altrex-nav-section__content {
    list-style: none;
    margin: 0;
    overflow: hidden;
    padding: 0;
}

// Collapse animation
.altrex-nav-section-collapse-enter-active,
.altrex-nav-section-collapse-leave-active {
    overflow: hidden;
    transition: height 0.3s ease, opacity 0.2s ease;
}

.altrex-nav-section-collapse-enter-from,
.altrex-nav-section-collapse-leave-to {
    height: 0 !important;
    opacity: 0;
}
</style>
