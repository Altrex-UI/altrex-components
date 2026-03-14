<template>
    <figure
        :class="computedClasses"
        :style="cssProps"
    >
        <div class="altrex-image-container">
            <!-- Loading placeholder -->
            <div
                v-if="isLoading && showPlaceholder"
                class="altrex-image-placeholder"
                :style="placeholderStyle"
            >
                <slot name="placeholder">
                    <div class="altrex-image-placeholder__spinner">
                        <AltrexSpinner size="m" />
                    </div>
                </slot>
            </div>

            <!-- Error state -->
            <div
                v-if="hasError && showError"
                class="altrex-image-error"
                :style="placeholderStyle"
            >
                <slot name="error">
                    <div class="altrex-image-error__content">
                        <AltrexIcon icon="generic-image-off" size="l" />
                        <span class="altrex-image-error__text">
                            {{ errorMessage || 'Failed to load image' }}
                        </span>
                    </div>
                </slot>
            </div>

            <!-- Main image -->
            <img
                v-show="!isLoading && !hasError"
                ref="imageRef"
                :src="src"
                :srcset="srcset"
                :sizes="sizes"
                :alt="alt"
                :width="width"
                :height="height"
                :loading="loading"
                :decoding="decoding"
                :crossorigin="crossorigin"
                :referrerpolicy="referrerpolicy"
                :class="imageClasses"
                @load="handleLoad"
                @error="handleError"
            />
        </div>

        <!-- Caption -->
        <figcaption
            v-if="hasCaption"
            class="altrex-image-caption"
        >
            <slot name="caption">
                {{ caption }}
            </slot>
        </figcaption>
    </figure>
</template>

<script>
import AltrexIcon from '@/components/Icon/AltrexIcon.vue';
import AltrexSpinner from '@/components/Spinner/AltrexSpinner.vue';
import styling from '@/utils/styling';

export default {
    name: 'AltrexImage',
    components: {
        AltrexIcon,
        AltrexSpinner,
    },
    mixins: [styling],
    props: {
        // Image source (required)
        src: {
            type: String,
            required: true,
        },

        // Responsive image sources
        srcset: {
            type: String,
            default: null,
        },

        // Sizes attribute for responsive images
        sizes: {
            type: String,
            default: null,
        },

        // Alt text (required for accessibility)
        alt: {
            type: String,
            required: true,
        },

        // Image width
        width: {
            type: [String, Number],
            default: null,
        },

        // Image height
        height: {
            type: [String, Number],
            default: null,
        },

        // Loading strategy
        loading: {
            type: String,
            default: 'lazy',
            validator: (value) => ['lazy', 'eager'].includes(value),
        },

        // Decoding strategy
        decoding: {
            type: String,
            default: 'async',
            validator: (value) => ['async', 'sync', 'auto'].includes(value),
        },

        // Object fit behavior
        objectFit: {
            type: String,
            default: 'cover',
            validator: (value) => ['cover', 'contain', 'fill', 'none', 'scale-down'].includes(value),
        },

        // Object position
        objectPosition: {
            type: String,
            default: 'center',
        },

        // Aspect ratio (e.g., '16/9', '4/3', '1/1')
        aspectRatio: {
            type: String,
            default: null,
        },

        // Border radius variant
        rounded: {
            type: String,
            default: 'default',
            validator: (value) => ['none', 'sm', 'default', 'lg', 'xl', 'full'].includes(value),
        },

        // Show placeholder while loading
        showPlaceholder: {
            type: Boolean,
            default: true,
        },

        // Show error state on load failure
        showError: {
            type: Boolean,
            default: true,
        },

        // Error message
        errorMessage: {
            type: String,
            default: null,
        },

        // Caption text
        caption: {
            type: String,
            default: null,
        },

        // CORS settings
        crossorigin: {
            type: String,
            default: null,
            validator: (value) => [null, 'anonymous', 'use-credentials'].includes(value),
        },

        // Referrer policy
        referrerpolicy: {
            type: String,
            default: null,
            validator: (value) => [
                null,
                'no-referrer',
                'no-referrer-when-downgrade',
                'origin',
                'origin-when-cross-origin',
                'same-origin',
                'strict-origin',
                'strict-origin-when-cross-origin',
                'unsafe-url',
            ].includes(value),
        },

        // Draggable
        draggable: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['load', 'error'],
    data() {
        return {
            themePrefix: 'altrex-image',
            isLoading: true,
            hasError: false,
        };
    },
    computed: {
        computedClasses() {
            return [
                'altrex-image',
                `altrex-image--object-fit-${this.objectFit}`,
                `altrex-image--rounded-${this.rounded}`,
                {
                    'altrex-image--loading': this.isLoading,
                    'altrex-image--error': this.hasError,
                    'altrex-image--has-caption': this.hasCaption,
                },
            ];
        },

        imageClasses() {
            return [
                'altrex-image__img',
                {
                    'altrex-image__img--not-draggable': !this.draggable,
                },
            ];
        },

        hasCaption() {
            return !!this.caption || !!this.$slots.caption;
        },

        placeholderStyle() {
            const styles = {};

            if (this.aspectRatio) {
                styles.aspectRatio = this.aspectRatio;
            } else if (this.width && this.height) {
                styles.aspectRatio = `${this.width} / ${this.height}`;
            }

            return styles;
        },

        cssProps() {
            const props = {};

            if (this.objectFit) {
                props['--altrex-image-object-fit'] = this.objectFit;
            }

            if (this.objectPosition) {
                props['--altrex-image-object-position'] = this.objectPosition;
            }

            if (this.aspectRatio) {
                props['--altrex-image-aspect-ratio'] = this.aspectRatio;
            } else if (this.width && this.height) {
                props['--altrex-image-aspect-ratio'] = `${this.width} / ${this.height}`;
            }

            return {
                ...props,
                ...this.themeVariables,
            };
        },
    },
    methods: {
        handleLoad(event) {
            this.isLoading = false;
            this.hasError = false;
            this.$emit('load', event);
        },

        handleError(event) {
            this.isLoading = false;
            this.hasError = true;
            this.$emit('error', event);
        },
    },
};
</script>

<style lang="stylus" scoped>
.altrex-image
    position: relative
    margin: 0
    display: inline-block
    max-width: 100%

.altrex-image-container
    position: relative
    overflow: hidden
    display: block
    width: 100%
    aspect-ratio: var(--altrex-image-aspect-ratio, auto)

.altrex-image__img
    display: block
    width: 100%
    height: auto
    object-fit: var(--altrex-image-object-fit, cover)
    object-position: var(--altrex-image-object-position, center)

    &.altrex-image__img--not-draggable
        user-select: none
        -webkit-user-drag: none
        -webkit-touch-callout: none

// ========================================
// BORDER RADIUS VARIANTS
// ========================================

.altrex-image--rounded-none
    .altrex-image-container
        border-radius: 0

.altrex-image--rounded-sm
    .altrex-image-container
        border-radius: $altrex-borderRadius-sm

.altrex-image--rounded-default
    .altrex-image-container
        border-radius: $altrex-borderRadius-default

.altrex-image--rounded-lg
    .altrex-image-container
        border-radius: $altrex-borderRadius-lg

.altrex-image--rounded-xl
    .altrex-image-container
        border-radius: $altrex-borderRadius-xl

.altrex-image--rounded-full
    .altrex-image-container
        border-radius: $altrex-borderRadius-full

// ========================================
// PLACEHOLDER STATE
// ========================================

.altrex-image-placeholder
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    display: flex
    align-items: center
    justify-content: center
    background: $altrex-colors-neutral-100

    [data-theme="dark"] &
        background: var(--altrex-colors-dark-bg-elevated)

.altrex-image-placeholder__spinner
    display: flex
    align-items: center
    justify-content: center

// ========================================
// ERROR STATE
// ========================================

.altrex-image-error
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    display: flex
    align-items: center
    justify-content: center
    background: $altrex-colors-neutral-100
    border: 2px dashed $altrex-colors-neutral-300

    [data-theme="dark"] &
        background: var(--altrex-colors-dark-bg-elevated)
        border-color: var(--altrex-colors-dark-border-default)

.altrex-image-error__content
    display: flex
    flex-direction: column
    align-items: center
    gap: $altrex-spacing-2
    padding: $altrex-spacing-4
    text-align: center

    :deep(.altrex-icon)
        color: $altrex-colors-neutral-400

        [data-theme="dark"] &
            color: var(--altrex-colors-dark-text-tertiary)

.altrex-image-error__text
    font-size: $altrex-fontSize-sm
    color: $altrex-colors-neutral-600

    [data-theme="dark"] &
        color: var(--altrex-colors-dark-text-secondary)

// ========================================
// CAPTION
// ========================================

.altrex-image-caption
    // Mobile: comfortable padding
    margin-top: $altrex-spacing-2
    padding: 0 $altrex-spacing-1
    font-size: $altrex-fontSize-sm
    color: $altrex-colors-neutral-700
    text-align: center

    // Desktop: slightly larger
    +above('md')
        margin-top: $altrex-spacing-3
        font-size: $altrex-fontSize-base

    [data-theme="dark"] &
        color: var(--altrex-colors-dark-text-secondary)

// ========================================
// OBJECT FIT VARIANTS
// ========================================

.altrex-image--object-fit-cover
    .altrex-image__img
        object-fit: cover

.altrex-image--object-fit-contain
    .altrex-image__img
        object-fit: contain

.altrex-image--object-fit-fill
    .altrex-image__img
        object-fit: fill

.altrex-image--object-fit-none
    .altrex-image__img
        object-fit: none

.altrex-image--object-fit-scale-down
    .altrex-image__img
        object-fit: scale-down
</style>
