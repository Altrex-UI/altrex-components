<template>
    <div
        class="altrex-stepper"
        :class="stepperClasses"
        :style="themeVariables"
        role="group"
        :aria-label="ariaLabel"
    >
        <div class="altrex-stepper__track">
            <div
                v-for="(step, index) in steps"
                :key="index"
                class="altrex-stepper__step"
                :class="getStepClasses(index)"
            >
                <!-- Step indicator/number -->
                <button
                    v-if="clickable && !step.disabled"
                    type="button"
                    class="altrex-stepper__step__indicator"
                    :aria-current="index === modelValue ? 'step' : undefined"
                    :aria-label="`${step.label}${step.description ? ': ' + step.description : ''}`"
                    :disabled="step.disabled"
                    @click="handleStepClick(index)"
                    @keydown="handleKeyDown($event, index)"
                >
                    <span class="altrex-stepper__step__indicator__content">
                        <AltrexIcon
                            v-if="index < modelValue && !step.error"
                            icon="generic-check"
                            class="altrex-stepper__step__icon altrex-stepper__step__icon--check"
                        />
                        <AltrexIcon
                            v-else-if="step.error"
                            icon="generic-x-circle"
                            class="altrex-stepper__step__icon altrex-stepper__step__icon--error"
                        />
                        <span v-else class="altrex-stepper__step__number">
                            {{ index + 1 }}
                        </span>
                    </span>
                </button>

                <div
                    v-else
                    class="altrex-stepper__step__indicator altrex-stepper__step__indicator--static"
                    :aria-current="index === modelValue ? 'step' : undefined"
                    :aria-label="`${step.label}${step.description ? ': ' + step.description : ''}`"
                >
                    <span class="altrex-stepper__step__indicator__content">
                        <AltrexIcon
                            v-if="index < modelValue && !step.error"
                            icon="generic-check"
                            class="altrex-stepper__step__icon altrex-stepper__step__icon--check"
                        />
                        <AltrexIcon
                            v-else-if="step.error"
                            icon="generic-x-circle"
                            class="altrex-stepper__step__icon altrex-stepper__step__icon--error"
                        />
                        <span v-else class="altrex-stepper__step__number">
                            {{ index + 1 }}
                        </span>
                    </span>
                </div>

                <!-- Connector line -->
                <div
                    v-if="index < steps.length - 1"
                    class="altrex-stepper__step__connector"
                    :aria-hidden="true"
                />

                <!-- Step label and description -->
                <div class="altrex-stepper__step__content">
                    <div class="altrex-stepper__step__label">
                        {{ step.label }}
                    </div>
                    <div
                        v-if="step.description"
                        class="altrex-stepper__step__description"
                    >
                        {{ step.description }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AltrexIcon from '@/components/Icon/AltrexIcon.vue'
import styling from '@/utils/styling'

export default {
    name: 'AltrexStepper',

    components: {
        AltrexIcon,
    },

    mixins: [styling],

    props: {
        /**
         * Current step index (v-model)
         */
        modelValue: {
            type: Number,
            default: 0,
            validator: (value) => value >= 0,
        },

        /**
         * Array of step objects
         * Each step: { label: string, description?: string, disabled?: boolean, error?: boolean }
         */
        steps: {
            type: Array,
            required: true,
            validator: (steps) =>
                Array.isArray(steps) &&
                steps.length > 0 &&
                steps.every((step) => step.label),
        },

        /**
         * Visual variant
         */
        variant: {
            type: String,
            default: 'default',
            validator: (value) =>
                ['default', 'numbered', 'dots', 'minimal'].includes(value),
        },

        /**
         * Whether steps are clickable (allow navigation)
         */
        clickable: {
            type: Boolean,
            default: false,
        },

        /**
         * ARIA label for the stepper group
         */
        ariaLabel: {
            type: String,
            default: 'Progress steps',
        },

        /**
         * Color variant
         */
        color: {
            type: String,
            default: 'primary',
            validator: (value) =>
                ['primary', 'secondary', 'success', 'warning', 'danger'].includes(
                    value
                ),
        },

        /**
         * Size variant
         */
        size: {
            type: String,
            default: 'm',
            validator: (value) => ['s', 'm', 'l'].includes(value),
        },
    },

    emits: ['update:modelValue', 'change', 'complete'],

    data() {
        return {
            themePrefix: 'altrex-stepper',
        }
    },

    computed: {
        stepperClasses() {
            return {
                [`altrex-stepper--${this.variant}`]: true,
                [`altrex-stepper--${this.color}`]: true,
                [`altrex-stepper--${this.size}`]: true,
                'altrex-stepper--clickable': this.clickable,
            }
        },
    },

    methods: {
        getStepClasses(index) {
            const step = this.steps[index]
            return {
                'altrex-stepper__step--active': index === this.modelValue,
                'altrex-stepper__step--completed': index < this.modelValue,
                'altrex-stepper__step--disabled': step.disabled,
                'altrex-stepper__step--error': step.error,
                'altrex-stepper__step--pending': index > this.modelValue,
            }
        },

        handleStepClick(index) {
            const step = this.steps[index]
            if (step.disabled || !this.clickable) return

            this.$emit('update:modelValue', index)
            this.$emit('change', {
                step: index,
                stepData: step,
            })

            // Emit complete event if navigating to last step
            if (index === this.steps.length - 1) {
                this.$emit('complete')
            }
        },

        handleKeyDown(event, index) {
            const { key } = event

            if (key === 'ArrowRight' || key === 'ArrowDown') {
                event.preventDefault()
                this.focusStep(index + 1)
            } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
                event.preventDefault()
                this.focusStep(index - 1)
            } else if (key === 'Home') {
                event.preventDefault()
                this.focusStep(0)
            } else if (key === 'End') {
                event.preventDefault()
                this.focusStep(this.steps.length - 1)
            }
        },

        focusStep(index) {
            if (index < 0 || index >= this.steps.length) return

            const step = this.steps[index]
            if (step.disabled) return

            // Focus the indicator button
            this.$nextTick(() => {
                const indicators = this.$el.querySelectorAll(
                    '.altrex-stepper__step__indicator[type="button"]'
                )
                if (indicators[index]) {
                    indicators[index].focus()
                }
            })
        },
    },
}
</script>

<style lang="stylus" scoped>
// ========================================
// MOBILE-FIRST BASELINE (< 768px)
// ========================================

.altrex-stepper
    width: 100%
    padding: $altrex-spacing-4

    +above('md')
        padding: $altrex-spacing-6

// ========================================
// TRACK LAYOUT
// ========================================

.altrex-stepper__track
    display: flex
    flex-direction: column
    gap: $altrex-spacing-4

    // Desktop: horizontal layout
    +above('md')
        flex-direction: row
        align-items: flex-start
        gap: 0

// ========================================
// STEP ITEM
// ========================================

.altrex-stepper__step
    display: flex
    flex-direction: row
    align-items: flex-start
    gap: $altrex-spacing-3
    position: relative
    flex: 1

    // Desktop: vertical layout (indicator on top, label below)
    +above('md')
        flex-direction: column
        align-items: center
        gap: $altrex-spacing-2

// ========================================
// STEP INDICATOR (Circle with number/icon)
// ========================================

.altrex-stepper__step__indicator
    position: relative
    z-index: 2
    display: inline-flex
    align-items: center
    justify-content: center
    flex-shrink: 0
    border-radius: 50%
    font-weight: $altrex-fontWeight-semibold
    transition: all $altrex-transition-default
    background: var(--altrex-stepper-indicator-bg, $altrex-colors-neutral-100)
    color: var(--altrex-stepper-indicator-color, $altrex-colors-neutral-600)
    border: 2px solid var(--altrex-stepper-indicator-border, $altrex-colors-neutral-300)
    width: 44px
    height: 44px
    min-width: 44px
    min-height: 44px
    font-size: $altrex-fontSize-base

.altrex-stepper__step__indicator
    +above('md')
        width: 40px
        height: 40px
        min-width: 40px
        min-height: 40px
        font-size: $altrex-fontSize-sm

.altrex-stepper__step__indicator[type="button"]
    cursor: pointer
    border: 2px solid var(--altrex-stepper-indicator-border, $altrex-colors-neutral-300)

.altrex-stepper__step__indicator[type="button"]:hover:not(:disabled)
    background: var(--altrex-stepper-indicator-bg-hover, $altrex-colors-neutral-200)
    border-color: var(--altrex-stepper-indicator-border-hover, $altrex-colors-primary-400)
    transform: scale(1.05)

.altrex-stepper__step__indicator[type="button"]:focus-visible
    outline: 2px solid var(--altrex-stepper-indicator-focus, $altrex-colors-primary-500)
    outline-offset: 2px

.altrex-stepper__step__indicator[type="button"]:disabled
    cursor: not-allowed
    opacity: 0.4

+touch-device()
    .altrex-stepper__step__indicator[type="button"]:active:not(:disabled)
        transform: scale(0.95)

.altrex-stepper__step__indicator--static
    cursor: default

// ========================================
// STEP STATES
// ========================================

// Active step
.altrex-stepper__step--active .altrex-stepper__step__indicator {
    --altrex-stepper-indicator-bg: $altrex-colors-primary-500;
    --altrex-stepper-indicator-color: #ffffff;
    --altrex-stepper-indicator-border: $altrex-colors-primary-500;
}
.altrex-stepper__step--active .altrex-stepper__step__indicator:hover:not(:disabled) {
    --altrex-stepper-indicator-bg-hover: $altrex-colors-primary-600;
    --altrex-stepper-indicator-border-hover: $altrex-colors-primary-600;
}
.altrex-stepper__step--active .altrex-stepper__step__label {
    font-weight: $altrex-fontWeight-semibold;
    color: var(--altrex-stepper-label-active, $altrex-colors-neutral-900);
}

// Completed step
.altrex-stepper__step--completed .altrex-stepper__step__indicator {
    --altrex-stepper-indicator-bg: $altrex-colors-success-500;
    --altrex-stepper-indicator-color: #ffffff;
    --altrex-stepper-indicator-border: $altrex-colors-success-500;
}
.altrex-stepper__step--completed .altrex-stepper__step__indicator:hover:not(:disabled) {
    --altrex-stepper-indicator-bg-hover: $altrex-colors-success-600;
    --altrex-stepper-indicator-border-hover: $altrex-colors-success-600;
}
.altrex-stepper__step--completed .altrex-stepper__step__label {
    color: var(--altrex-stepper-label-completed, $altrex-colors-neutral-700);
}

// Error step
.altrex-stepper__step--error .altrex-stepper__step__indicator {
    --altrex-stepper-indicator-bg: $altrex-colors-danger-500;
    --altrex-stepper-indicator-color: #ffffff;
    --altrex-stepper-indicator-border: $altrex-colors-danger-500;
}
.altrex-stepper__step--error .altrex-stepper__step__label {
    color: var(--altrex-stepper-label-error, $altrex-colors-danger-600);
}

// Disabled step
.altrex-stepper__step--disabled .altrex-stepper__step__indicator {
    --altrex-stepper-indicator-bg: $altrex-colors-neutral-100;
    --altrex-stepper-indicator-color: $altrex-colors-neutral-400;
    --altrex-stepper-indicator-border: $altrex-colors-neutral-200;
}
.altrex-stepper__step--disabled .altrex-stepper__step__label,
.altrex-stepper__step--disabled .altrex-stepper__step__description {
    color: var(--altrex-stepper-label-disabled, $altrex-colors-neutral-400);
}

// Pending step (not reached yet)
.altrex-stepper__step--pending .altrex-stepper__step__label {
    color: var(--altrex-stepper-label-pending, $altrex-colors-neutral-600);
}

// ========================================
// STEP INDICATOR CONTENT
// ========================================

.altrex-stepper__step__indicator__content
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    height: 100%

.altrex-stepper__step__number
    font-size: inherit
    font-weight: inherit
    line-height: 1

.altrex-stepper__step__icon
    :deep(svg)
        altrex-icon-m()

    +above('md')
        :deep(svg)
            altrex-icon-s()

// ========================================
// CONNECTOR LINE
// ========================================

.altrex-stepper__step__connector
    position: absolute
    background: var(--altrex-stepper-connector-bg, $altrex-colors-neutral-300)
    transition: background $altrex-transition-default

    // Mobile: vertical connector (left of indicator)
    left: 21px
    top: 48px
    width: 2px
    height: calc(100% + $altrex-spacing-4)

    // Desktop: horizontal connector (below indicator)
    +above('md')
        left: 50%
        top: 20px
        width: 100%
        height: 2px
        transform: translateX(0)

// Completed step connector
.altrex-stepper__step--completed .altrex-stepper__step__connector
    --altrex-stepper-connector-bg: $altrex-colors-success-500

// Active step connector
.altrex-stepper__step--active .altrex-stepper__step__connector
    --altrex-stepper-connector-bg: $altrex-colors-primary-300

// ========================================
// STEP CONTENT (Label & Description)
// ========================================

.altrex-stepper__step__content
    display: flex
    flex-direction: column
    gap: $altrex-spacing-1
    flex: 1

    // Mobile: aligned to left of indicator
    padding-top: 10px

    // Desktop: centered below indicator
    +above('md')
        text-align: center
        padding-top: 0

.altrex-stepper__step__label
    font-size: $altrex-fontSize-base
    font-weight: $altrex-fontWeight-medium
    color: var(--altrex-stepper-label, $altrex-colors-neutral-900)
    line-height: 1.4

    +above('md')
        font-size: $altrex-fontSize-sm

.altrex-stepper__step__description
    font-size: $altrex-fontSize-sm
    color: var(--altrex-stepper-description, $altrex-colors-neutral-600)
    line-height: 1.4

    +above('md')
        font-size: $altrex-fontSize-xs

// ========================================
// VARIANT: DOTS
// ========================================

.altrex-stepper--dots
    .altrex-stepper__step__indicator
        width: 16px
        height: 16px
        min-width: 16px
        min-height: 16px
        border-width: 0

        +above('md')
            width: 12px
            height: 12px
            min-width: 12px
            min-height: 12px

    .altrex-stepper__step__number
        display: none

    .altrex-stepper__step__icon
        display: none

    .altrex-stepper__step__connector
        // Mobile
        left: 7px
        top: 20px

        // Desktop
        +above('md')
            top: 6px

// ========================================
// VARIANT: MINIMAL
// ========================================

.altrex-stepper--minimal
    .altrex-stepper__step__indicator
        border: none
        background: transparent
        color: var(--altrex-stepper-indicator-color, $altrex-colors-neutral-700)

    .altrex-stepper__step--active .altrex-stepper__step__indicator
        --altrex-stepper-indicator-color: $altrex-colors-primary-600

    .altrex-stepper__step--completed .altrex-stepper__step__indicator
        --altrex-stepper-indicator-color: $altrex-colors-success-600

    .altrex-stepper__step__connector
        display: none

// ========================================
// SIZE VARIANTS
// ========================================

// Small
.altrex-stepper--s
    .altrex-stepper__step__indicator
        width: 36px
        height: 36px
        min-width: 36px
        min-height: 36px
        font-size: $altrex-fontSize-sm

        +above('md')
            width: 32px
            height: 32px
            min-width: 32px
            min-height: 32px

    .altrex-stepper__step__label
        font-size: $altrex-fontSize-sm

    .altrex-stepper__step__description
        font-size: $altrex-fontSize-xs

// Large
.altrex-stepper--l
    .altrex-stepper__step__indicator
        width: 56px
        height: 56px
        min-width: 56px
        min-height: 56px
        font-size: $altrex-fontSize-lg

        +above('md')
            width: 48px
            height: 48px
            min-width: 48px
            min-height: 48px

    .altrex-stepper__step__label
        font-size: $altrex-fontSize-lg

    .altrex-stepper__step__description
        font-size: $altrex-fontSize-base

// ========================================
// COLOR VARIANTS
// ========================================

.altrex-stepper--secondary
    .altrex-stepper__step--active .altrex-stepper__step__indicator
        --altrex-stepper-indicator-bg: $altrex-colors-secondary-500
        --altrex-stepper-indicator-border: $altrex-colors-secondary-500

.altrex-stepper--success
    .altrex-stepper__step--active .altrex-stepper__step__indicator
        --altrex-stepper-indicator-bg: $altrex-colors-success-500
        --altrex-stepper-indicator-border: $altrex-colors-success-500

.altrex-stepper--warning
    .altrex-stepper__step--active .altrex-stepper__step__indicator
        --altrex-stepper-indicator-bg: $altrex-colors-warning-500
        --altrex-stepper-indicator-border: $altrex-colors-warning-500

.altrex-stepper--danger
    .altrex-stepper__step--active .altrex-stepper__step__indicator
        --altrex-stepper-indicator-bg: $altrex-colors-danger-500
        --altrex-stepper-indicator-border: $altrex-colors-danger-500

// ========================================
// DARK MODE
// ========================================

[data-theme="dark"] .altrex-stepper .altrex-stepper__step__label {
    --altrex-stepper-label: var(--altrex-colors-dark-text-primary);
    --altrex-stepper-label-active: var(--altrex-colors-dark-text-primary);
    --altrex-stepper-label-completed: var(--altrex-colors-dark-text-secondary);
    --altrex-stepper-label-pending: var(--altrex-colors-dark-text-tertiary);
    --altrex-stepper-label-disabled: var(--altrex-colors-dark-text-disabled);
}
[data-theme="dark"] .altrex-stepper .altrex-stepper__step__description {
    --altrex-stepper-description: var(--altrex-colors-dark-text-secondary);
}
[data-theme="dark"] .altrex-stepper .altrex-stepper__step__indicator {
    --altrex-stepper-indicator-bg: var(--altrex-colors-dark-bg-elevated);
    --altrex-stepper-indicator-color: var(--altrex-colors-dark-text-secondary);
    --altrex-stepper-indicator-border: var(--altrex-colors-dark-border-default);
}
[data-theme="dark"] .altrex-stepper .altrex-stepper__step__indicator:hover:not(:disabled) {
    --altrex-stepper-indicator-bg-hover: var(--altrex-colors-dark-bg-hover);
}
[data-theme="dark"] .altrex-stepper .altrex-stepper__step__connector {
    --altrex-stepper-connector-bg: var(--altrex-colors-dark-border-default);
}
</style>
