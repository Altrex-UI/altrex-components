<template>
    <div
        class="altrex-avatar-wrapper"
        :class="avatarClasses"
        :aria-label="ariaLabel || alt || 'Avatar'"
        role="img"
    >
        <div
            class="altrex-avatar"
            :style="themeVariables"
        >
            <!-- Image avatar -->
            <AltrexImage
                v-if="src"
                :src="src"
                :alt="alt || 'Avatar'"
                :object-fit="objectFit"
                :rounded="shape === 'circle' ? 'full' : (shape === 'rounded' ? 'default' : 'none')"
                :show-placeholder="showPlaceholder"
                :show-error="showError"
                class="altrex-avatar__image"
                @error="handleImageError"
            />

            <!-- Initials fallback -->
            <span
                v-else-if="initials"
                class="altrex-avatar__initials"
            >{{ computedInitials }}</span>

            <!-- Icon fallback -->
            <AltrexIcon
                v-else
                :icon="icon"
                class="altrex-avatar__icon"
            />
        </div>

        <!-- Badge overlay (optional) - outside overflow container -->
        <AltrexBadge
            v-if="badge"
            v-bind="badgeProps"
            class="altrex-avatar__badge"
            :class="[
                `altrex-avatar__badge--${badgePosition}`,
                `altrex-avatar__badge--size-${badgeSize}`
            ]"
        />
    </div>
</template>

<script>
import styling from '@/utils/styling';
import AltrexIcon from '@/components/Icon/AltrexIcon.vue';
import AltrexImage from '@/components/Image/AltrexImage.vue';
import AltrexBadge from '@/components/Badge/AltrexBadge.vue';

export default {
    name: 'AltrexAvatar',
    components: {
        AltrexIcon,
        AltrexImage,
        AltrexBadge,
    },
    mixins: [styling],
    props: {
        /**
         * Avatar image source URL
         */
        src: {
            type: String,
            default: null,
        },
        /**
         * Alt text for image
         */
        alt: {
            type: String,
            default: null,
        },
        /**
         * Initials to display (up to 2 characters)
         */
        initials: {
            type: String,
            default: null,
        },
        /**
         * Icon name for fallback (e.g., 'generic-user')
         */
        icon: {
            type: String,
            default: 'generic-user',
        },
        /**
         * Avatar size
         */
        size: {
            type: String,
            default: 'm',
            validator: (value) => ['xs', 's', 'm', 'l', 'xl', '2xl'].includes(value),
        },
        /**
         * Avatar shape
         */
        shape: {
            type: String,
            default: 'circle',
            validator: (value) => ['circle', 'square', 'rounded'].includes(value),
        },
        /**
         * Background variant (only affects initials/icon avatars)
         */
        variant: {
            type: String,
            default: 'primary',
            validator: (value) => ['primary', 'secondary', 'neutral', 'success', 'warning', 'error'].includes(value),
        },
        /**
         * ARIA label for accessibility
         */
        ariaLabel: {
            type: String,
            default: null,
        },
        /**
         * Badge configuration (replaces status indicator)
         * Can be:
         * - Boolean (true): shows a dot badge with 'primary' variant
         * - String: badge content
         * - Object: full badge props { content, variant, size, dot, outlined }
         */
        badge: {
            type: [Boolean, String, Object],
            default: null,
        },
        /**
         * Badge position
         */
        badgePosition: {
            type: String,
            default: 'bottom-right',
            validator: (value) => ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(value),
        },
        /**
         * Badge size
         */
        badgeSize: {
            type: String,
            default: 's',
            validator: (value) => ['s', 'm', 'l'].includes(value),
        },
        /**
         * Image object fit behavior
         */
        objectFit: {
            type: String,
            default: 'cover',
            validator: (value) => ['cover', 'contain', 'fill', 'none', 'scale-down'].includes(value),
        },
        /**
         * Show loading placeholder for image
         */
        showPlaceholder: {
            type: Boolean,
            default: true,
        },
        /**
         * Show error state if image fails to load
         */
        showError: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            themePrefix: 'altrex-avatar',
            imageError: false,
        };
    },
    computed: {
        avatarClasses() {
            return {
                [`altrex-avatar-wrapper--${this.size}`]: true,
                [`altrex-avatar-wrapper--${this.shape}`]: true,
                [`altrex-avatar-wrapper--${this.variant}`]: !this.src || this.imageError,
                'altrex-avatar-wrapper--with-badge': this.badge,
            };
        },
        computedInitials() {
            if (!this.initials) return '';
            // Take up to 2 characters and uppercase
            return this.initials.slice(0, 2).toUpperCase();
        },
        badgeProps() {
            if (!this.badge) return null;

            // Map badgeSize to AltrexBadge size
            const sizeMap = {
                s: 'small',
                m: 'medium',
                l: 'large',
            };
            const mappedSize = sizeMap[this.badgeSize] || 'small';

            // Boolean: show dot badge
            if (this.badge === true) {
                return {
                    dot: true,
                    variant: 'primary',
                    size: mappedSize,
                };
            }

            // String: handle status-like values or badge content
            if (typeof this.badge === 'string') {
                // Map status-like strings to badge variants
                const statusMap = {
                    online: { dot: true, variant: 'success', size: mappedSize },
                    offline: { dot: true, variant: 'neutral', size: mappedSize },
                    busy: { dot: true, variant: 'danger', size: mappedSize },
                    away: { dot: true, variant: 'warning', size: mappedSize },
                };

                // If it's a status-like value, use mapped config
                if (statusMap[this.badge.toLowerCase()]) {
                    return statusMap[this.badge.toLowerCase()];
                }

                // Otherwise, treat as badge content
                return {
                    content: this.badge,
                    variant: 'primary',
                    size: mappedSize,
                };
            }

            // Object: pass through props (allow size override)
            return {
                size: mappedSize,
                ...this.badge,
            };
        },
    },
    methods: {
        handleImageError() {
            this.imageError = true;
            this.$emit('error');
        },
    },
};
</script>

<style lang="stylus">
// Wrapper: position container for badge overlay
.altrex-avatar-wrapper {
    display: inline-block;
    position: relative;
    vertical-align: middle;

    // Default size (medium)
    width: var(--altrex-avatar-size, 40px);
    height: var(--altrex-avatar-size, 40px);
}

// Inner avatar: contains the actual content with overflow hidden
.altrex-avatar {
    align-items: center;
    background: var(--altrex-avatar-background, $altrex-colors-neutral-300);
    border-radius: var(--altrex-avatar-border-radius, 50%);
    color: var(--altrex-avatar-color, $altrex-colors-neutral-50);
    display: flex;
    flex-shrink: 0;
    font-weight: $altrex-fontWeight-semibold;
    justify-content: center;
    overflow: hidden;
    position: relative;
    user-select: none;
    width: 100%;
    height: 100%;
    font-size: var(--altrex-avatar-font-size, $altrex-fontSize-base);
}

// Image handling
.altrex-avatar__image {
    width: 100%;
    height: 100%;

    :deep(.altrex-image-container) {
        width: 100%;
        height: 100%;
    }

    :deep(.altrex-image__img) {
        width: 100%;
        height: 100%;
    }
}

// Initials
.altrex-avatar__initials {
    line-height: 1;
    letter-spacing: 0.02em;
}

// Icon
.altrex-avatar__icon {
    fill: currentColor;
}

// Badge overlay (positioned outside the overflow container)
.altrex-avatar__badge {
    position: absolute;
    border: 2px solid var(--altrex-avatar-badge-border, #ffffff);
    box-shadow: $altrex-shadow-sm;
    z-index: 1;

    [data-theme="dark"] & {
        border-color: var(--altrex-colors-dark-bg-surface);
    }
}

// Badge size variants (for dot sizing)
.altrex-avatar__badge--size-s {
    --altrex-badge-dot-size: 16px;
}

.altrex-avatar__badge--size-m {
    --altrex-badge-dot-size: 20px;
}

.altrex-avatar__badge--size-l {
    --altrex-badge-dot-size: 24px;
}

// Badge positions - closer to avatar edge
.altrex-avatar__badge--top-left {
    top: 0;
    left: 0;
}

.altrex-avatar__badge--top-right {
    top: 0;
    right: 0;
}

.altrex-avatar__badge--bottom-left {
    bottom: 0;
    left: 0;
}

.altrex-avatar__badge--bottom-right {
    bottom: 0;
    right: 0;
}

// ========================================
// SIZE VARIANTS
// ========================================

.altrex-avatar-wrapper--xs {
    --altrex-avatar-size: 24px;
    --altrex-avatar-font-size: $altrex-fontSize-xs;

    :deep(.altrex-avatar__icon) {
        altrex-icon-s();
    }
}

.altrex-avatar-wrapper--s {
    --altrex-avatar-size: 32px;
    --altrex-avatar-font-size: $altrex-fontSize-sm;

    :deep(.altrex-avatar__icon) {
        altrex-icon-s();
    }
}

.altrex-avatar-wrapper--m {
    --altrex-avatar-size: 40px;
    --altrex-avatar-font-size: $altrex-fontSize-base;

    :deep(.altrex-avatar__icon) {
        altrex-icon-m();
    }
}

.altrex-avatar-wrapper--l {
    --altrex-avatar-size: 48px;
    --altrex-avatar-font-size: $altrex-fontSize-lg;

    :deep(.altrex-avatar__icon) {
        altrex-icon-m();
    }
}

.altrex-avatar-wrapper--xl {
    --altrex-avatar-size: 64px;
    --altrex-avatar-font-size: $altrex-fontSize-xl;

    :deep(.altrex-avatar__icon) {
        altrex-icon-l();
    }
}

.altrex-avatar-wrapper--2xl {
    --altrex-avatar-size: 96px;
    --altrex-avatar-font-size: $altrex-fontSize-3xl;

    :deep(.altrex-avatar__icon) {
        altrex-icon-xl();
    }
}

// ========================================
// SHAPE VARIANTS
// ========================================

.altrex-avatar-wrapper--circle {
    --altrex-avatar-border-radius: 50%;
}

.altrex-avatar-wrapper--square {
    --altrex-avatar-border-radius: 0;
}

.altrex-avatar-wrapper--rounded {
    --altrex-avatar-border-radius: $altrex-borderRadius-md;
}

// ========================================
// COLOR VARIANTS (for initials/icon only)
// ========================================

.altrex-avatar-wrapper--primary {
    --altrex-avatar-background: $altrex-colors-primary-500;
    --altrex-avatar-color: $altrex-colors-neutral-50;

    [data-theme="dark"] & {
        --altrex-avatar-background: var(--altrex-colors-dark-primary-default);
        --altrex-avatar-color: var(--altrex-colors-dark-text-inverse);
    }
}

.altrex-avatar-wrapper--secondary {
    --altrex-avatar-background: $altrex-colors-secondary-500;
    --altrex-avatar-color: $altrex-colors-neutral-50;

    [data-theme="dark"] & {
        --altrex-avatar-background: var(--altrex-colors-dark-secondary-default);
        --altrex-avatar-color: var(--altrex-colors-dark-text-inverse);
    }
}

.altrex-avatar-wrapper--neutral {
    --altrex-avatar-background: $altrex-colors-neutral-400;
    --altrex-avatar-color: $altrex-colors-neutral-900;

    [data-theme="dark"] & {
        --altrex-avatar-background: var(--altrex-colors-dark-bg-hover);
        --altrex-avatar-color: var(--altrex-colors-dark-text-primary);
    }
}

.altrex-avatar-wrapper--success {
    --altrex-avatar-background: $altrex-colors-success-500;
    --altrex-avatar-color: $altrex-colors-neutral-50;

    [data-theme="dark"] & {
        --altrex-avatar-background: var(--altrex-colors-dark-success-default);
        --altrex-avatar-color: var(--altrex-colors-dark-text-inverse);
    }
}

.altrex-avatar-wrapper--warning {
    --altrex-avatar-background: $altrex-colors-warning-500;
    --altrex-avatar-color: $altrex-colors-neutral-50;

    [data-theme="dark"] & {
        --altrex-avatar-background: var(--altrex-colors-dark-warning-default);
        --altrex-avatar-color: var(--altrex-colors-dark-text-inverse);
    }
}

.altrex-avatar-wrapper--error {
    --altrex-avatar-background: $altrex-colors-error-500;
    --altrex-avatar-color: $altrex-colors-neutral-50;

    [data-theme="dark"] & {
        --altrex-avatar-background: var(--altrex-colors-dark-error-default);
        --altrex-avatar-color: var(--altrex-colors-dark-text-inverse);
    }
}
</style>
