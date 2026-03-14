<template>
    <div class="slider-demo">
        <h1>Altrex Slider Component Demo</h1>
        <p class="intro">
            A mobile-first, touch-optimized slider component with WCAG AAA compliant touch targets (44×44px on mobile).
            Features keyboard navigation, tooltips, and full dark mode support.
        </p>

        <!-- Basic Usage -->
        <section class="demo-section">
            <h2>Basic Usage</h2>
            <p class="description">
                Simple slider with default settings. The thumb meets WCAG AAA touch target requirements (44×44px on mobile, 24px on desktop).
            </p>

            <div class="demo-group demo-group--column">
                <AltrexSlider
                    v-model="basicValue"
                    label="Volume"
                />
                <p class="result">Value: {{ basicValue }}</p>
            </div>
        </section>

        <!-- With Value Display -->
        <section class="demo-section">
            <h2>Value Display</h2>
            <p class="description">
                Show the current value in the label or as a tooltip when interacting.
            </p>

            <div class="demo-group demo-group--column">
                <AltrexSlider
                    v-model="valueDisplayValue"
                    label="Brightness"
                    :show-value="true"
                />

                <AltrexSlider
                    v-model="tooltipValue"
                    label="Temperature"
                    :show-tooltip="true"
                />
                <p class="demo-hint">Hover, focus, or drag to see tooltip</p>
            </div>
        </section>

        <!-- Size Variants -->
        <section class="demo-section">
            <h2>Size Variants</h2>
            <p class="description">
                Three sizes available: small, medium (default), and large. All maintain proper touch targets on mobile.
            </p>

            <div class="demo-group demo-group--column">
                <div class="demo-item">
                    <AltrexSlider
                        v-model="sizeSmall"
                        label="Small"
                        size="s"
                        :show-value="true"
                    />
                </div>

                <div class="demo-item">
                    <AltrexSlider
                        v-model="sizeMedium"
                        label="Medium (Default)"
                        size="m"
                        :show-value="true"
                    />
                </div>

                <div class="demo-item">
                    <AltrexSlider
                        v-model="sizeLarge"
                        label="Large"
                        size="l"
                        :show-value="true"
                    />
                </div>
            </div>
        </section>

        <!-- Range and Step -->
        <section class="demo-section">
            <h2>Custom Range and Step</h2>
            <p class="description">
                Configure minimum, maximum, and step values for different use cases.
            </p>

            <div class="demo-group demo-group--column">
                <AltrexSlider
                    v-model="rangeValue1"
                    label="0-10 range, step 0.5"
                    :min="0"
                    :max="10"
                    :step="0.5"
                    :show-value="true"
                />

                <AltrexSlider
                    v-model="rangeValue2"
                    label="Price range ($50-$500)"
                    :min="50"
                    :max="500"
                    :step="10"
                    :show-value="true"
                    :format-value="formatPrice"
                />

                <AltrexSlider
                    v-model="rangeValue3"
                    label="Percentage (0-100%)"
                    :min="0"
                    :max="100"
                    :step="5"
                    :show-value="true"
                    :format-value="formatPercentage"
                />
            </div>
        </section>

        <!-- With Min/Max Labels -->
        <section class="demo-section">
            <h2>Min/Max Labels</h2>
            <p class="description">
                Display minimum and maximum values alongside the slider.
            </p>

            <div class="demo-group demo-group--column">
                <AltrexSlider
                    v-model="minMaxValue"
                    label="With min/max labels"
                    :show-min-max="true"
                    :show-value="true"
                />
            </div>
        </section>

        <!-- With Tick Marks -->
        <section class="demo-section">
            <h2>Tick Marks</h2>
            <p class="description">
                Show visual indicators for step positions.
            </p>

            <div class="demo-group demo-group--column">
                <AltrexSlider
                    v-model="tickValue1"
                    label="Tick marks (step 10)"
                    :step="10"
                    :show-ticks="true"
                    :show-value="true"
                />

                <AltrexSlider
                    v-model="tickValue2"
                    label="Rating (1-5 stars)"
                    :min="1"
                    :max="5"
                    :step="1"
                    :show-ticks="true"
                    :show-value="true"
                    :show-min-max="true"
                    :format-value="formatRating"
                />
            </div>
        </section>

        <!-- Disabled State -->
        <section class="demo-section">
            <h2>Disabled State</h2>
            <p class="description">
                Disabled sliders cannot be interacted with.
            </p>

            <div class="demo-group demo-group--column">
                <AltrexSlider
                    v-model="disabledValue"
                    label="Disabled slider"
                    :disabled="true"
                    :show-value="true"
                />
            </div>
        </section>

        <!-- Keyboard Navigation -->
        <section class="demo-section">
            <h2>Keyboard Navigation</h2>
            <p class="description">
                Full keyboard support for accessibility:
            </p>
            <ul class="keyboard-shortcuts">
                <li><kbd>Arrow Left/Down</kbd> - Decrease by step</li>
                <li><kbd>Arrow Right/Up</kbd> - Increase by step</li>
                <li><kbd>Page Down</kbd> - Decrease by 10% of range</li>
                <li><kbd>Page Up</kbd> - Increase by 10% of range</li>
                <li><kbd>Home</kbd> - Jump to minimum</li>
                <li><kbd>End</kbd> - Jump to maximum</li>
            </ul>

            <div class="demo-group demo-group--column">
                <AltrexSlider
                    v-model="keyboardValue"
                    label="Try keyboard navigation"
                    :show-value="true"
                    :show-tooltip="true"
                />
            </div>
        </section>

        <!-- Style Overrides -->
        <section class="demo-section">
            <h2>Style Overrides</h2>
            <p class="description">
                Customize colors and styles using the styleOverrides prop.
            </p>

            <div class="demo-group demo-group--column">
                <AltrexSlider
                    v-model="styleValue1"
                    label="Custom success colors"
                    :show-value="true"
                    :style-overrides="{
                        fillBackground: '#10b981',
                        thumbBorderColor: '#10b981',
                        thumbBorderColorHover: '#059669',
                        valueColor: '#10b981',
                    }"
                />

                <AltrexSlider
                    v-model="styleValue2"
                    label="Custom warning colors"
                    :show-value="true"
                    :style-overrides="{
                        fillBackground: '#f59e0b',
                        thumbBorderColor: '#f59e0b',
                        thumbBorderColorHover: '#d97706',
                        valueColor: '#f59e0b',
                    }"
                />

                <AltrexSlider
                    v-model="styleValue3"
                    label="Custom danger colors"
                    :show-value="true"
                    :style-overrides="{
                        fillBackground: '#ef4444',
                        thumbBorderColor: '#ef4444',
                        thumbBorderColorHover: '#dc2626',
                        valueColor: '#ef4444',
                    }"
                />
            </div>
        </section>

        <!-- Responsive Behavior -->
        <section class="demo-section">
            <h2>Responsive Behavior</h2>
            <p class="description">
                The slider is mobile-first and touch-optimized:
            </p>
            <ul class="feature-list">
                <li><strong>Mobile (&lt; 768px):</strong> 44×44px thumb (WCAG AAA touch target)</li>
                <li><strong>Desktop (≥ 768px):</strong> 24px thumb (more compact)</li>
                <li><strong>Touch feedback:</strong> Scale animation on mobile devices</li>
                <li><strong>Track click:</strong> Works on both mouse and touch</li>
            </ul>

            <div class="demo-group demo-group--column">
                <AltrexSlider
                    v-model="responsiveValue"
                    label="Resize window to see responsive behavior"
                    :show-value="true"
                    :show-tooltip="true"
                />
            </div>
        </section>

        <!-- Real-World Examples -->
        <section class="demo-section">
            <h2>Real-World Examples</h2>
            <p class="description">
                Common use cases for sliders in applications.
            </p>

            <div class="demo-group demo-group--column">
                <div class="demo-card">
                    <h3>Audio Controls</h3>
                    <AltrexSlider
                        v-model="audioVolume"
                        label="Volume"
                        :min="0"
                        :max="100"
                        :show-value="true"
                        :format-value="formatPercentage"
                    />
                    <AltrexSlider
                        v-model="audioBalance"
                        label="Balance"
                        :min="-100"
                        :max="100"
                        :step="10"
                        :show-value="true"
                        :show-min-max="true"
                        :format-value="formatBalance"
                    />
                </div>

                <div class="demo-card">
                    <h3>Image Editor</h3>
                    <AltrexSlider
                        v-model="imageBrightness"
                        label="Brightness"
                        :min="-100"
                        :max="100"
                        :show-value="true"
                        :format-value="formatAdjustment"
                    />
                    <AltrexSlider
                        v-model="imageContrast"
                        label="Contrast"
                        :min="-100"
                        :max="100"
                        :show-value="true"
                        :format-value="formatAdjustment"
                    />
                    <AltrexSlider
                        v-model="imageSaturation"
                        label="Saturation"
                        :min="0"
                        :max="200"
                        :show-value="true"
                        :format-value="formatPercentage"
                    />
                </div>

                <div class="demo-card">
                    <h3>Temperature Control</h3>
                    <AltrexSlider
                        v-model="temperature"
                        label="Set Temperature"
                        :min="60"
                        :max="80"
                        :step="0.5"
                        :show-value="true"
                        :show-min-max="true"
                        :format-value="formatTemperature"
                        :style-overrides="{
                            fillBackground: getTemperatureColor(temperature),
                            thumbBorderColor: getTemperatureColor(temperature),
                            valueColor: getTemperatureColor(temperature),
                        }"
                    />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import AltrexSlider from '@/components/Slider/AltrexSlider.vue';

export default {
    name: 'AltrexSliderView',
    components: {
        AltrexSlider,
    },
    data() {
        return {
            // Basic
            basicValue: 50,

            // Value display
            valueDisplayValue: 75,
            tooltipValue: 30,

            // Size variants
            sizeSmall: 40,
            sizeMedium: 50,
            sizeLarge: 60,

            // Range and step
            rangeValue1: 5,
            rangeValue2: 250,
            rangeValue3: 75,

            // Min/max
            minMaxValue: 50,

            // Tick marks
            tickValue1: 50,
            tickValue2: 3,

            // Disabled
            disabledValue: 50,

            // Keyboard
            keyboardValue: 50,

            // Style overrides
            styleValue1: 70,
            styleValue2: 60,
            styleValue3: 40,

            // Responsive
            responsiveValue: 50,

            // Real-world examples
            audioVolume: 75,
            audioBalance: 0,
            imageBrightness: 0,
            imageContrast: 0,
            imageSaturation: 100,
            temperature: 72,
        };
    },
    methods: {
        formatPrice(value) {
            return `$${value}`;
        },

        formatPercentage(value) {
            return `${value}%`;
        },

        formatRating(value) {
            return '⭐'.repeat(value);
        },

        formatBalance(value) {
            if (value < 0) return `L ${Math.abs(value)}`;
            if (value > 0) return `R ${value}`;
            return 'Center';
        },

        formatAdjustment(value) {
            return value >= 0 ? `+${value}` : `${value}`;
        },

        formatTemperature(value) {
            return `${value}°F`;
        },

        getTemperatureColor(temp) {
            // Gradient from blue (cold) to red (hot)
            if (temp <= 65) return '#3b82f6'; // blue
            if (temp <= 70) return '#06b6d4'; // cyan
            if (temp <= 75) return '#10b981'; // green
            if (temp <= 78) return '#f59e0b'; // amber
            return '#ef4444'; // red
        },
    },
};
</script>

<style lang="stylus" scoped>
.slider-demo
    container-width($altrex-breakpoints-xl)
    padding-top: $altrex-spacing-8
    padding-bottom: $altrex-spacing-8

h1
    color: $altrex-colors-neutral-900
    font-size: $altrex-fluid-typography-h1
    margin-bottom: $altrex-spacing-4

    [data-theme="dark"] &
        color: var(--altrex-colors-dark-text-primary)

.intro
    color: $altrex-colors-neutral-700
    font-size: $altrex-font-size-body-1
    line-height: 1.6
    margin-bottom: $altrex-spacing-8

    [data-theme="dark"] &
        color: var(--altrex-colors-dark-text-secondary)

.demo-section
    margin-bottom: $altrex-spacing-10

h2
    color: $altrex-colors-neutral-900
    font-size: $altrex-fluid-typography-h2
    margin-bottom: $altrex-spacing-3

    [data-theme="dark"] &
        color: var(--altrex-colors-dark-text-primary)

.description
    color: $altrex-colors-neutral-700
    font-size: $altrex-font-size-body-2
    line-height: 1.6
    margin-bottom: $altrex-spacing-4

    [data-theme="dark"] &
        color: var(--altrex-colors-dark-text-secondary)

.demo-group
    display: flex
    gap: $altrex-spacing-6

    &.demo-group--column
        flex-direction: column

.demo-item
    flex: 1
    min-width: 0

.result
    background: $altrex-colors-neutral-100
    border-radius: $altrex-border-radius-default
    color: $altrex-colors-neutral-900
    font-family: $altrex-font-family-mono
    font-size: $altrex-font-size-body-2
    margin-top: $altrex-spacing-2
    padding: $altrex-spacing-3

    [data-theme="dark"] &
        background: var(--altrex-colors-dark-bg-elevated)
        color: var(--altrex-colors-dark-text-primary)

.demo-hint
    color: $altrex-colors-neutral-600
    font-size: $altrex-font-size-caption
    font-style: italic
    margin-top: $altrex-spacing-2

    [data-theme="dark"] &
        color: var(--altrex-colors-dark-text-tertiary)

.keyboard-shortcuts
    background: $altrex-colors-neutral-100
    border-radius: $altrex-border-radius-default
    list-style: none
    margin-bottom: $altrex-spacing-4
    padding: $altrex-spacing-4

    [data-theme="dark"] &
        background: var(--altrex-colors-dark-bg-elevated)

    li
        color: $altrex-colors-neutral-900
        font-size: $altrex-font-size-body-2
        margin-bottom: $altrex-spacing-2
        padding-left: $altrex-spacing-4
        position: relative

        [data-theme="dark"] &
            color: var(--altrex-colors-dark-text-primary)

        &::before
            color: $altrex-colors-primary-500
            content: '▸'
            left: 0
            position: absolute

            [data-theme="dark"] &
                color: var(--altrex-colors-dark-primary-400)

        &:last-child
            margin-bottom: 0

kbd
    background: $altrex-colors-neutral-200
    border: 1px solid $altrex-colors-neutral-400
    border-radius: $altrex-border-radius-sm
    color: $altrex-colors-neutral-900
    font-family: $altrex-font-family-mono
    font-size: $altrex-font-size-caption
    padding: 2px 6px

    [data-theme="dark"] &
        background: var(--altrex-colors-dark-bg-elevated)
        border-color: var(--altrex-colors-dark-border-default)
        color: var(--altrex-colors-dark-text-primary)

.feature-list
    background: $altrex-colors-neutral-100
    border-radius: $altrex-border-radius-default
    list-style: none
    margin-bottom: $altrex-spacing-4
    padding: $altrex-spacing-4

    [data-theme="dark"] &
        background: var(--altrex-colors-dark-bg-elevated)

    li
        color: $altrex-colors-neutral-900
        font-size: $altrex-font-size-body-2
        margin-bottom: $altrex-spacing-2
        padding-left: $altrex-spacing-4
        position: relative

        [data-theme="dark"] &
            color: var(--altrex-colors-dark-text-primary)

        &::before
            color: $altrex-colors-primary-500
            content: '✓'
            font-weight: $altrex-font-weight-bold
            left: 0
            position: absolute

            [data-theme="dark"] &
                color: var(--altrex-colors-dark-primary-400)

        &:last-child
            margin-bottom: 0

.demo-card
    background: $altrex-colors-neutral-100
    border-radius: $altrex-border-radius-lg
    padding: $altrex-spacing-5

    [data-theme="dark"] &
        background: var(--altrex-colors-dark-bg-elevated)

    h3
        color: $altrex-colors-neutral-900
        font-size: $altrex-font-size-h3
        font-weight: $altrex-font-weight-semibold
        margin-bottom: $altrex-spacing-4

        [data-theme="dark"] &
            color: var(--altrex-colors-dark-text-primary)

    .altrex-slider
        margin-bottom: $altrex-spacing-4

        &:last-child
            margin-bottom: 0
</style>
