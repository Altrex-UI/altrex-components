<template>
    <component :is="element" class="altrex-card" :class="cardClasses" v-bind="$attrs" :style="cssProps">
        <!-- Badge in thumbnail area -->
        <AltrexBadge
            v-if="badge && badgePosition.startsWith('thumbnail-')"
            :content="badge"
            :variant="badgeVariant"
            :size="badgeSize"
            class="altrex-card__badge"
            :class="`altrex-card__badge--${badgePosition}`"
        />

        <div v-if="hasMediaSlot" class="altrex-card__media">
            <slot name="thumbnail" />
        </div>

        <div v-if="isHorizontal" class="altrex-card__body">
            <div class="altrex-card__content">
                <!-- Badge in content area -->
                <AltrexBadge
                    v-if="badge && badgePosition.startsWith('content-')"
                    :content="badge"
                    :variant="badgeVariant"
                    :size="badgeSize"
                    class="altrex-card__badge"
                    :class="`altrex-card__badge--${badgePosition}`"
                />
                <slot name="content" />
            </div>

            <div v-if="hasFooterSlot" class="altrex-card__footer">
                <slot name="footer" />
            </div>
        </div>

        <template v-else>
            <div class="altrex-card__content">
                <!-- Badge in content area -->
                <AltrexBadge
                    v-if="badge && badgePosition.startsWith('content-')"
                    :content="badge"
                    :variant="badgeVariant"
                    :size="badgeSize"
                    class="altrex-card__badge"
                    :class="`altrex-card__badge--${badgePosition}`"
                />
                <slot name="content" />
            </div>

            <div v-if="hasFooterSlot" class="altrex-card__footer">
                <slot name="footer" />
            </div>
        </template>
    </component>
</template>

<script>

import styling from '@/utils/styling';
import AltrexBadge from '@/components/Badge/AltrexBadge.vue';


export default {
    name: 'AltrexCard',
    components: {
        AltrexBadge,
    },
    mixins: [styling],
    props: {
        element: {
            type: String,
            default: 'li',
        },
        cardLabel: {
            type: Object,
        },
        userGenContent: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'm',
            validator: (value) => ['s', 'm', 'l'].includes(value),
        },
        layout: {
            type: String,
            default: 'vertical',
            validator: (value) => ['vertical', 'horizontal-left', 'horizontal-right'].includes(value),
        },
        borderRadius: {
            type: Boolean,
            default: true,
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
         * Badge size
         */
        badgeSize: {
            type: String,
            default: 'small',
            validator: (value) => ['small', 'medium', 'large'].includes(value),
        },
        /**
         * Badge position - can be in thumbnail or content area, at any corner
         */
        badgePosition: {
            type: String,
            default: 'thumbnail-top-right',
            validator: (value) => [
                'thumbnail-top-left', 'thumbnail-top-right', 'thumbnail-bottom-left', 'thumbnail-bottom-right',
                'content-top-left', 'content-top-right', 'content-bottom-left', 'content-bottom-right'
            ].includes(value),
        },
    },
    computed: {
        hasFooterSlot() {
            return !!this.$slots.footer;
        },
        hasMediaSlot() {
            return !!this.$slots.thumbnail;
        },
        isHorizontal() {
            return this.layout === 'horizontal-left' || this.layout === 'horizontal-right';
        },
        cardClasses() {
            return [
                `altrex-card--size-${this.size}`,
                `altrex-card--layout-${this.layout}`,
                {
                    'altrex-card--horizontal': this.isHorizontal,
                    'altrex-card--no-border-radius': !this.borderRadius,
                },
            ];
        },
    },
};
</script>

<style lang="stylus">
:root {
    --altrex-card-background-color: $altrex-colors-neutral-50;
    --altrex-card-border-color: $altrex-colors-neutral-200;
    --altrex-card-border-radius: $altrex-borderRadius-lg;
    --altrex-card-border-width: 0;
    --altrex-card-box-shadow: $altrex-shadow-md;
    --altrex-card-content-padding: $altrex-spacing-2 $altrex-spacing-4 $altrex-spacing-4;
    --altrex-card-margin: 0 0 $altrex-spacing-4;
    --altrex-card-max-width: 350px;
    --altrex-card-min-width: 250px;

    // Size variants - Small
    --altrex-card-size-s-min-width: 200px;
    --altrex-card-size-s-max-width: 280px;
    --altrex-card-size-s-padding: $altrex-spacing-2 $altrex-spacing-5;
    --altrex-card-size-s-thumbnail-height: 150px;
    --altrex-card-size-s-thumbnail-width-horizontal: 120px;

    // Size variants - Medium
    --altrex-card-size-m-min-width: 250px;
    --altrex-card-size-m-max-width: 350px;
    --altrex-card-size-m-padding: $altrex-spacing-2 $altrex-spacing-4 $altrex-spacing-4;
    --altrex-card-size-m-thumbnail-height: 200px;
    --altrex-card-size-m-thumbnail-width-horizontal: 160px;

    // Size variants - Large
    --altrex-card-size-l-min-width: 350px;
    --altrex-card-size-l-max-width: 500px;
    --altrex-card-size-l-padding: $altrex-spacing-4 $altrex-spacing-6;
    --altrex-card-size-l-thumbnail-height: 280px;
    --altrex-card-size-l-thumbnail-width-horizontal: 220px;
}

.altrex-card {
    background-color: var(--altrex-card-background-color);
    border-color: var(--altrex-card-border-color);
    border-radius: var(--altrex-card-border-radius);
    border-style: solid;
    border-width: var(--altrex-card-border-width);
    box-shadow: var(--altrex-card-box-shadow);
    display: flex;
    flex-direction: column;
    font-family: var(--altrex-font-family-body);
    margin: var(--altrex-card-margin);
    overflow: hidden;
    position: relative;

    // Mobile-first: full width, natural flow
    width: 100%;
    min-width: 0;
    max-width: 100%;
}

.altrex-card__media {
    display: flex;
    position: relative;

    .altrex-card__embed-button {
        position: absolute;
        inset-inline-end: $altrex-spacing-4;
        inset-block-start: $altrex-spacing-4;
    }
}

// Content - Responsive padding

.altrex-card__content
    // Mobile: comfortable padding
    padding: $altrex-spacing-4

    // Desktop: use size-based padding
    +above('md')
        padding: var(--altrex-card-content-padding)


// Footer - Responsive padding

.altrex-card__footer
    // Mobile: match content padding
    padding: 0 $altrex-spacing-4 $altrex-spacing-4

    // Desktop: size-based
    +above('md')
        padding: 0 $altrex-spacing-4 $altrex-spacing-4


// Size variants - Mobile-first

.altrex-card--size-s
    // Mobile: full width
    width: 100%

    // Tablet+: constrained width
    +above('md')
        min-width: var(--altrex-card-size-s-min-width)
        max-width: var(--altrex-card-size-s-max-width)

    .altrex-card__content
        padding: $altrex-spacing-4

        +above('md')
            padding: var(--altrex-card-size-s-padding)

    .altrex-card__footer
        padding: 0 $altrex-spacing-4 $altrex-spacing-4

        +above('md')
            padding: 0 $altrex-spacing-5 $altrex-spacing-5

    .altrex-card__media
        height: var(--altrex-card-size-s-thumbnail-height)

        img
            height: 100%
            width: 100%
            object-fit: cover


.altrex-card--size-m
    // Mobile: full width
    width: 100%

    // Tablet+: constrained width
    +above('md')
        min-width: var(--altrex-card-size-m-min-width)
        max-width: var(--altrex-card-size-m-max-width)

    .altrex-card__content
        padding: $altrex-spacing-4

        +above('md')
            padding: var(--altrex-card-size-m-padding)

    .altrex-card__media
        height: var(--altrex-card-size-m-thumbnail-height)

        img
            height: 100%
            width: 100%
            object-fit: cover


.altrex-card--size-l
    // Mobile: full width
    width: 100%

    // Tablet+: constrained width
    +above('md')
        min-width: var(--altrex-card-size-l-min-width)
        max-width: var(--altrex-card-size-l-max-width)

    .altrex-card__content
        padding: $altrex-spacing-4

        +above('md')
            padding: var(--altrex-card-size-l-padding)

    .altrex-card__footer
        padding: 0 $altrex-spacing-4 $altrex-spacing-4

        +above('md')
            padding: 0 $altrex-spacing-6 $altrex-spacing-6

    .altrex-card__media
        height: var(--altrex-card-size-l-thumbnail-height)

        img
            height: 100%
            width: 100%
            object-fit: cover


// Horizontal layouts - Mobile-first (stack on mobile)

.altrex-card--horizontal
    // Mobile: force vertical stacking
    flex-direction: column

    .altrex-card__media
        width: 100%
        height: 200px

        img
            height: 100%
            width: 100%
            object-fit: cover

    // Tablet+: enable horizontal layout
    +above('md')
        flex-direction: row

        .altrex-card__media
            width: 200px
            height: auto
            flex-shrink: 0

            img
                height: 100%
                width: 100%

    .altrex-card__body
        display: flex
        flex-direction: column
        flex: 1

    .altrex-card__content
        flex: 1


.altrex-card--layout-horizontal-left
    // Mobile: natural order (media on top)
    flex-direction: column

    // Desktop: horizontal with media on left
    +above('md')
        flex-direction: row

    .altrex-card__media
        order: 1

    .altrex-card__content
        order: 2

    .altrex-card__footer
        order: 3


.altrex-card--layout-horizontal-right
    // Mobile: natural order (media on top)
    flex-direction: column

    // Desktop: horizontal with media on right
    +above('md')
        flex-direction: row-reverse

    .altrex-card__media
        order: 1

    .altrex-card__content
        order: 2

    .altrex-card__footer
        order: 3


// Horizontal size-specific widths

.altrex-card--horizontal.altrex-card--size-s {
    gap: $altrex-spacing-4;

    .altrex-card__media {
        width: var(--altrex-card-size-s-thumbnail-width-horizontal);
        height: auto;
    }
}

.altrex-card--horizontal.altrex-card--size-m {
    gap: $altrex-spacing-4;

    .altrex-card__media {
        width: var(--altrex-card-size-m-thumbnail-width-horizontal);
        height: auto;
    }
}

.altrex-card--horizontal.altrex-card--size-l {
    gap: $altrex-spacing-10;

    .altrex-card__media {
        width: var(--altrex-card-size-l-thumbnail-width-horizontal);
        height: auto;
    }
}

// Border radius control

.altrex-card--no-border-radius {
    border-radius: 0;

    .altrex-card__media img {
        border-radius: 0;
    }
}

// Badge positioning

.altrex-card__badge {
    position: absolute;
    z-index: 10;

    // Thumbnail positions
    &.altrex-card__badge--thumbnail-top-left {
        top: $altrex-spacing-2;
        left: $altrex-spacing-2;
    }

    &.altrex-card__badge--thumbnail-top-right {
        top: $altrex-spacing-2;
        right: $altrex-spacing-2;
    }

    &.altrex-card__badge--thumbnail-bottom-left {
        bottom: $altrex-spacing-2;
        left: $altrex-spacing-2;
    }

    &.altrex-card__badge--thumbnail-bottom-right {
        bottom: $altrex-spacing-2;
        right: $altrex-spacing-2;
    }

    // Content positions
    &.altrex-card__badge--content-top-left {
        top: $altrex-spacing-2;
        left: $altrex-spacing-2;
    }

    &.altrex-card__badge--content-top-right {
        top: $altrex-spacing-2;
        right: $altrex-spacing-2;
    }

    &.altrex-card__badge--content-bottom-left {
        bottom: $altrex-spacing-2;
        left: $altrex-spacing-2;
    }

    &.altrex-card__badge--content-bottom-right {
        bottom: $altrex-spacing-2;
        right: $altrex-spacing-2;
    }
}

// Make content area relative for badge positioning
.altrex-card__content {
    position: relative;
}

</style>
