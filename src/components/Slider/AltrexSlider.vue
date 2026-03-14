<template>
    <div
        :class="computedClasses"
        :style="cssProps"
    >
        <label
            v-if="label"
            :for="inputId"
            class="altrex-slider__label"
        >
            {{ label }}
            <span
                v-if="showValue"
                class="altrex-slider__value"
            >{{ displayValue }}</span>
        </label>

        <div class="altrex-slider__container">
            <span
                v-if="showMinMax"
                class="altrex-slider__min"
            >{{ min }}</span>

            <div
                ref="trackContainer"
                class="altrex-slider__track-container"
                @mousedown="handleTrackClick"
                @touchstart="handleTrackClick"
            >
                <!-- Track -->
                <div class="altrex-slider__track">
                    <!-- Filled portion -->
                    <div
                        class="altrex-slider__track-fill"
                        :style="fillStyle"
                    />
                </div>

                <!-- Thumb -->
                <div
                    ref="thumb"
                    class="altrex-slider__thumb"
                    :style="thumbStyle"
                    :aria-label="thumbAriaLabel"
                    role="slider"
                    :aria-valuemin="min"
                    :aria-valuemax="max"
                    :aria-valuenow="internalValue"
                    :aria-valuetext="ariaValueText"
                    :aria-disabled="disabled || null"
                    :tabindex="disabled ? -1 : 0"
                    @mousedown="handleThumbMouseDown"
                    @touchstart="handleThumbTouchStart"
                    @keydown="handleKeyDown"
                    @focus="handleFocus"
                    @blur="handleBlur"
                >
                    <div
                        v-if="showTooltip && (isFocused || isDragging)"
                        class="altrex-slider__tooltip"
                    >
                        {{ displayValue }}
                    </div>
                </div>

                <!-- Tick marks (optional) -->
                <div
                    v-if="showTicks"
                    class="altrex-slider__ticks"
                >
                    <span
                        v-for="tick in tickMarks"
                        :key="tick"
                        class="altrex-slider__tick"
                        :style="{ left: `${((tick - min) / (max - min)) * 100}%` }"
                    />
                </div>
            </div>

            <span
                v-if="showMinMax"
                class="altrex-slider__max"
            >{{ max }}</span>
        </div>
    </div>
</template>

<script>
import styling from '@/utils/styling';

let uniqueId = 0;

export default {
    name: 'AltrexSlider',
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
        formatValue: {
            type: Function,
            default: null,
        },
        label: {
            type: String,
            default: null,
        },
        max: {
            type: Number,
            default: 100,
        },
        min: {
            type: Number,
            default: 0,
        },
        modelValue: {
            type: Number,
            default: 0,
        },
        showMinMax: {
            type: Boolean,
            default: false,
        },
        showTicks: {
            type: Boolean,
            default: false,
        },
        showTooltip: {
            type: Boolean,
            default: true,
        },
        showValue: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'm',
            validator: (value) => ['s', 'm', 'l'].includes(value),
        },
        step: {
            type: Number,
            default: 1,
        },
    },
    emits: ['update:modelValue', 'change'],
    data() {
        return {
            themePrefix: 'altrex-slider',
            internalValue: this.modelValue,
            isDragging: false,
            isFocused: false,
            inputId: `altrex-slider-${++uniqueId}`,
        };
    },
    computed: {
        ariaValueText() {
            return this.formatValue ? this.formatValue(this.internalValue) : String(this.internalValue);
        },

        computedClasses() {
            return [
                'altrex-slider',
                `altrex-slider--${this.size}`,
                {
                    'altrex-slider--disabled': this.disabled,
                    'altrex-slider--dragging': this.isDragging,
                    'altrex-slider--focused': this.isFocused,
                },
            ];
        },

        displayValue() {
            return this.formatValue ? this.formatValue(this.internalValue) : this.internalValue;
        },

        fillStyle() {
            const percentage = ((this.internalValue - this.min) / (this.max - this.min)) * 100;
            return {
                width: `${percentage}%`,
            };
        },

        thumbAriaLabel() {
            return this.ariaLabel || this.label || 'Slider';
        },

        thumbStyle() {
            const percentage = ((this.internalValue - this.min) / (this.max - this.min)) * 100;
            return {
                left: `${percentage}%`,
            };
        },

        tickMarks() {
            if (!this.showTicks) return [];

            const marks = [];
            for (let i = this.min; i <= this.max; i += this.step) {
                marks.push(i);
            }
            return marks;
        },
    },
    watch: {
        modelValue(newValue) {
            this.internalValue = this.clampValue(newValue);
        },
    },
    mounted() {
        this.internalValue = this.clampValue(this.modelValue);
    },
    methods: {
        clampValue(value) {
            const clamped = Math.max(this.min, Math.min(this.max, value));
            return Math.round(clamped / this.step) * this.step;
        },

        handleBlur() {
            this.isFocused = false;
        },

        handleFocus() {
            this.isFocused = true;
        },

        handleKeyDown(event) {
            if (this.disabled) return;

            let newValue = this.internalValue;
            const largeStep = (this.max - this.min) / 10;

            switch (event.key) {
                case 'ArrowLeft':
                case 'ArrowDown':
                    event.preventDefault();
                    newValue -= this.step;
                    break;
                case 'ArrowRight':
                case 'ArrowUp':
                    event.preventDefault();
                    newValue += this.step;
                    break;
                case 'PageDown':
                    event.preventDefault();
                    newValue -= largeStep;
                    break;
                case 'PageUp':
                    event.preventDefault();
                    newValue += largeStep;
                    break;
                case 'Home':
                    event.preventDefault();
                    newValue = this.min;
                    break;
                case 'End':
                    event.preventDefault();
                    newValue = this.max;
                    break;
                default:
                    return;
            }

            this.updateValue(newValue);
        },

        handleThumbMouseDown(event) {
            if (this.disabled) return;

            event.preventDefault();
            this.isDragging = true;

            document.addEventListener('mousemove', this.handleMouseMove);
            document.addEventListener('mouseup', this.handleMouseUp);
        },

        handleThumbTouchStart(event) {
            if (this.disabled) return;

            event.preventDefault();
            this.isDragging = true;

            document.addEventListener('touchmove', this.handleTouchMove, { passive: false });
            document.addEventListener('touchend', this.handleTouchEnd);
        },

        handleTrackClick(event) {
            if (this.disabled || this.isDragging) return;

            const clientX = event.type.includes('touch') ? event.touches[0].clientX : event.clientX;
            this.updateValueFromPosition(clientX);
        },

        handleMouseMove(event) {
            if (!this.isDragging) return;
            event.preventDefault();
            this.updateValueFromPosition(event.clientX);
        },

        handleTouchMove(event) {
            if (!this.isDragging) return;
            event.preventDefault();
            this.updateValueFromPosition(event.touches[0].clientX);
        },

        handleMouseUp() {
            if (!this.isDragging) return;

            this.isDragging = false;
            document.removeEventListener('mousemove', this.handleMouseMove);
            document.removeEventListener('mouseup', this.handleMouseUp);
            this.$emit('change', this.internalValue);
        },

        handleTouchEnd() {
            if (!this.isDragging) return;

            this.isDragging = false;
            document.removeEventListener('touchmove', this.handleTouchMove);
            document.removeEventListener('touchend', this.handleTouchEnd);
            this.$emit('change', this.internalValue);
        },

        updateValue(newValue) {
            const clampedValue = this.clampValue(newValue);
            if (clampedValue === this.internalValue) return;

            this.internalValue = clampedValue;
            this.$emit('update:modelValue', this.internalValue);
        },

        updateValueFromPosition(clientX) {
            const rect = this.$refs.trackContainer.getBoundingClientRect();
            const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
            const rawValue = this.min + percentage * (this.max - this.min);
            this.updateValue(rawValue);
        },
    },
};
</script>

<style lang="stylus" scoped>
.altrex-slider
    display: flex
    flex-direction: column
    gap: $altrex-spacing-2
    width: 100%

    // ========================================
    // LABEL
    // ========================================
    .altrex-slider__label
        color: var(--altrex-slider-label-color, $altrex-colors-neutral-900)
        display: flex
        font-size: var(--altrex-slider-label-font-size, $altrex-font-size-body-2)
        font-weight: var(--altrex-slider-label-font-weight, $altrex-font-weight-medium)
        justify-content: space-between
        margin-bottom: $altrex-spacing-1

        [data-theme="dark"] &
            color: var(--altrex-slider-label-color, var(--altrex-colors-dark-text-primary))

    .altrex-slider__value
        color: var(--altrex-slider-value-color, $altrex-colors-primary-500)
        font-weight: $altrex-font-weight-semibold

        [data-theme="dark"] &
            color: var(--altrex-slider-value-color, var(--altrex-colors-dark-primary-400))

    // ========================================
    // CONTAINER (TRACK + MIN/MAX)
    // ========================================
    .altrex-slider__container
        align-items: center
        display: flex
        gap: $altrex-spacing-3
        width: 100%

    .altrex-slider__min,
    .altrex-slider__max
        color: var(--altrex-slider-minmax-color, $altrex-colors-neutral-600)
        flex-shrink: 0
        font-size: $altrex-font-size-caption
        user-select: none

        [data-theme="dark"] &
            color: var(--altrex-slider-minmax-color, var(--altrex-colors-dark-text-secondary))

    // ========================================
    // TRACK CONTAINER
    // ========================================
    .altrex-slider__track-container
        cursor: pointer
        flex: 1
        position: relative
        touch-action: none
        user-select: none

        // Mobile-first: larger touch area
        padding: $altrex-spacing-3 0

        +above('md')
            padding: $altrex-spacing-2 0

    // ========================================
    // TRACK
    // ========================================
    .altrex-slider__track
        background: var(--altrex-slider-track-background, $altrex-colors-neutral-300)
        border-radius: var(--altrex-slider-track-border-radius, $altrex-border-radius-pill)
        height: var(--altrex-slider-track-height, 6px)
        overflow: hidden
        position: relative
        width: 100%

        [data-theme="dark"] &
            background: var(--altrex-slider-track-background, var(--altrex-colors-dark-border-default))

    .altrex-slider__track-fill
        background: var(--altrex-slider-fill-background, $altrex-colors-primary-500)
        border-radius: var(--altrex-slider-track-border-radius, $altrex-border-radius-pill)
        height: 100%
        transition: width 0.1s ease

        [data-theme="dark"] &
            background: var(--altrex-slider-fill-background, var(--altrex-colors-dark-primary-500))

    // ========================================
    // THUMB (MOBILE-FIRST TOUCH TARGET)
    // ========================================
    .altrex-slider__thumb
        align-items: center
        background: var(--altrex-slider-thumb-background, $altrex-colors-neutral-50)
        border: var(--altrex-slider-thumb-border, 2px solid $altrex-colors-primary-500)
        border-radius: 50%
        box-shadow: var(--altrex-slider-thumb-shadow, $altrex-shadow-md)
        cursor: grab
        display: flex
        justify-content: center
        outline: none
        position: absolute
        top: 50%
        transform: translate(-50%, -50%)
        transition: var(--altrex-slider-thumb-transition, all $altrex-transition-default)

        // Mobile: WCAG AAA touch target (44×44px)
        height: $altrex-touchTarget-minimum
        width: $altrex-touchTarget-minimum

        // Desktop: smaller but still accessible
        +above('md')
            height: 24px
            width: 24px

        [data-theme="dark"] &
            background: var(--altrex-slider-thumb-background, var(--altrex-colors-dark-bg-elevated))
            border-color: var(--altrex-slider-thumb-border-color, var(--altrex-colors-dark-primary-500))

        &:hover
            border-color: var(--altrex-slider-thumb-border-color-hover, $altrex-colors-primary-600)
            box-shadow: var(--altrex-slider-thumb-shadow-hover, $altrex-shadow-lg)
            transform: translate(-50%, -50%) scale(1.1)

            [data-theme="dark"] &
                border-color: var(--altrex-slider-thumb-border-color-hover, var(--altrex-colors-dark-primary-400))

        &:focus-visible
            border-color: var(--altrex-slider-thumb-border-color-focus, $altrex-colors-primary-600)
            box-shadow: var(--altrex-slider-thumb-shadow-focus, 0 0 0 4px rgba(0, 124, 255, 0.2))

            [data-theme="dark"] &
                border-color: var(--altrex-slider-thumb-border-color-focus, var(--altrex-colors-dark-primary-400))
                box-shadow: var(--altrex-slider-thumb-shadow-focus, 0 0 0 4px rgba(99, 179, 255, 0.3))

    // ========================================
    // TOOLTIP
    // ========================================
    .altrex-slider__tooltip
        background: var(--altrex-slider-tooltip-background, $altrex-colors-neutral-900)
        border-radius: $altrex-border-radius-default
        bottom: 100%
        color: var(--altrex-slider-tooltip-color, $altrex-colors-neutral-50)
        font-size: $altrex-font-size-caption
        font-weight: $altrex-font-weight-medium
        left: 50%
        margin-bottom: $altrex-spacing-2
        padding: $altrex-spacing-1 $altrex-spacing-2
        pointer-events: none
        position: absolute
        transform: translateX(-50%)
        white-space: nowrap

        [data-theme="dark"] &
            background: var(--altrex-slider-tooltip-background, var(--altrex-colors-dark-bg-elevated))
            color: var(--altrex-slider-tooltip-color, var(--altrex-colors-dark-text-primary))

        // Tooltip arrow
        &::after
            border-color: var(--altrex-slider-tooltip-background, $altrex-colors-neutral-900) transparent transparent transparent
            border-style: solid
            border-width: 4px
            content: ''
            left: 50%
            position: absolute
            top: 100%
            transform: translateX(-50%)

            [data-theme="dark"] &
                border-color: var(--altrex-slider-tooltip-background, var(--altrex-colors-dark-bg-elevated)) transparent transparent transparent

    // ========================================
    // TICK MARKS
    // ========================================
    .altrex-slider__ticks
        height: 100%
        left: 0
        pointer-events: none
        position: absolute
        top: 0
        width: 100%

    .altrex-slider__tick
        background: var(--altrex-slider-tick-background, $altrex-colors-neutral-400)
        height: 8px
        position: absolute
        top: 50%
        transform: translate(-50%, -50%)
        width: 2px

        [data-theme="dark"] &
            background: var(--altrex-slider-tick-background, var(--altrex-colors-dark-border-subtle))

// ========================================
// SIZE VARIANTS
// ========================================

.altrex-slider--s
    .altrex-slider__track
        --altrex-slider-track-height: 4px

    .altrex-slider__thumb
        height: $altrex-touchTarget-minimum
        width: $altrex-touchTarget-minimum

        +above('md')
            height: 20px
            width: 20px

    .altrex-slider__label
        --altrex-slider-label-font-size: $altrex-font-size-caption

.altrex-slider--l
    .altrex-slider__track
        --altrex-slider-track-height: 8px

    .altrex-slider__thumb
        height: $altrex-touchTarget-comfortable
        width: $altrex-touchTarget-comfortable

        +above('md')
            height: 28px
            width: 28px

    .altrex-slider__label
        --altrex-slider-label-font-size: $altrex-font-size-body-1

// ========================================
// DISABLED STATE
// ========================================
.altrex-slider--disabled
    opacity: 0.5
    pointer-events: none

    .altrex-slider__track-container
        cursor: not-allowed

    .altrex-slider__thumb
        cursor: not-allowed

// Touch device feedback
+touch-device()
    .altrex-slider:active .altrex-slider__thumb
        cursor: grabbing
        transform: translate(-50%, -50%) scale(1.15)

.altrex-slider--dragging .altrex-slider__thumb
    cursor: grabbing
    transform: translate(-50%, -50%) scale(1.15)
    transition: none
</style>
