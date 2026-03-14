<template>
    <div class="stepper-demo">
        <h1>Altrex Stepper Component</h1>
        <p class="intro">
            A mobile-first stepper component for multi-step flows, onboarding
            wizards, checkout processes, and progress tracking. Adapts from
            vertical mobile layout to horizontal desktop layout automatically.
        </p>

        <!-- Responsive Demo -->
        <AltrexResponsiveDemo
            title="Mobile-First Responsive Stepper"
            description="The stepper automatically adapts its layout based on screen size. On mobile devices (< 768px), it displays vertically with touch-optimized 44×44px indicators. On desktop, it switches to a horizontal layout."
            notes="Try resizing your browser to see the layout change from vertical (mobile) to horizontal (desktop)."
        >
            <AltrexStepper
                v-model="basicStep"
                :steps="basicSteps"
                clickable
                @change="handleStepChange"
            />

            <div class="demo-controls">
                <AltrexButton
                    label="Previous"
                    variant="outline"
                    :disabled="basicStep === 0"
                    @click="basicStep = Math.max(0, basicStep - 1)"
                />
                <span class="step-indicator"
                    >Step {{ basicStep + 1 }} of {{ basicSteps.length }}</span
                >
                <AltrexButton
                    label="Next"
                    :disabled="basicStep === basicSteps.length - 1"
                    @click="basicStep = Math.min(basicSteps.length - 1, basicStep + 1)"
                />
            </div>
        </AltrexResponsiveDemo>

        <!-- Variants Section -->
        <section class="demo-section">
            <h2>Variants</h2>
            <p class="description">
                Different visual styles for various use cases
            </p>

            <div class="demo-group">
                <div class="demo-item">
                    <h3>Default (Numbered)</h3>
                    <AltrexStepper
                        v-model="variantStep1"
                        :steps="variantSteps"
                        variant="default"
                        clickable
                    />
                </div>

                <div class="demo-item">
                    <h3>Dots Variant</h3>
                    <p class="demo-note">Minimal design with dot indicators</p>
                    <AltrexStepper
                        v-model="variantStep2"
                        :steps="variantSteps"
                        variant="dots"
                        clickable
                    />
                </div>

                <div class="demo-item">
                    <h3>Minimal Variant</h3>
                    <p class="demo-note">Clean design without connectors</p>
                    <AltrexStepper
                        v-model="variantStep3"
                        :steps="variantSteps"
                        variant="minimal"
                        clickable
                    />
                </div>
            </div>
        </section>

        <!-- Sizes Section -->
        <section class="demo-section">
            <h2>Sizes</h2>
            <p class="description">Three size options: small, medium, large</p>

            <div class="demo-group">
                <div class="demo-item">
                    <h3>Small</h3>
                    <AltrexStepper
                        v-model="sizeStep1"
                        :steps="sizeSteps"
                        size="s"
                        clickable
                    />
                </div>

                <div class="demo-item">
                    <h3>Medium (Default)</h3>
                    <AltrexStepper
                        v-model="sizeStep2"
                        :steps="sizeSteps"
                        size="m"
                        clickable
                    />
                </div>

                <div class="demo-item">
                    <h3>Large</h3>
                    <AltrexStepper
                        v-model="sizeStep3"
                        :steps="sizeSteps"
                        size="l"
                        clickable
                    />
                </div>
            </div>
        </section>

        <!-- Color Variants Section -->
        <section class="demo-section">
            <h2>Color Variants</h2>
            <p class="description">Match your brand or use semantic colors</p>

            <div class="demo-group">
                <div class="demo-item">
                    <h3>Primary</h3>
                    <AltrexStepper
                        v-model="colorStep1"
                        :steps="colorSteps"
                        color="primary"
                        clickable
                    />
                </div>

                <div class="demo-item">
                    <h3>Success</h3>
                    <AltrexStepper
                        v-model="colorStep2"
                        :steps="colorSteps"
                        color="success"
                        clickable
                    />
                </div>

                <div class="demo-item">
                    <h3>Warning</h3>
                    <AltrexStepper
                        v-model="colorStep3"
                        :steps="colorSteps"
                        color="warning"
                        clickable
                    />
                </div>

                <div class="demo-item">
                    <h3>Danger</h3>
                    <AltrexStepper
                        v-model="colorStep4"
                        :steps="colorSteps"
                        color="danger"
                        clickable
                    />
                </div>
            </div>
        </section>

        <!-- States Section -->
        <section class="demo-section">
            <h2>Step States</h2>
            <p class="description">
                Steps can have different states: completed, active, pending,
                error, and disabled
            </p>

            <div class="demo-group">
                <div class="demo-item">
                    <h3>With Errors</h3>
                    <p class="demo-note">Error state for validation feedback</p>
                    <AltrexStepper
                        v-model="errorStep"
                        :steps="errorSteps"
                        clickable
                    />
                </div>

                <div class="demo-item">
                    <h3>With Disabled Steps</h3>
                    <p class="demo-note">
                        Some steps can be disabled to prevent navigation
                    </p>
                    <AltrexStepper
                        v-model="disabledStepIndex"
                        :steps="disabledSteps"
                        clickable
                    />
                </div>
            </div>
        </section>

        <!-- Interactivity Section -->
        <section class="demo-section">
            <h2>Interactivity</h2>
            <p class="description">
                Control whether steps are clickable or display-only
            </p>

            <div class="demo-group">
                <div class="demo-item">
                    <h3>Clickable Steps</h3>
                    <p class="demo-note">
                        Users can click to navigate between steps
                    </p>
                    <AltrexStepper
                        v-model="clickableStep"
                        :steps="interactiveSteps"
                        clickable
                    />
                </div>

                <div class="demo-item">
                    <h3>Non-Clickable (Display Only)</h3>
                    <p class="demo-note">
                        Steps show progress but can't be clicked
                    </p>
                    <AltrexStepper
                        v-model="nonClickableStep"
                        :steps="interactiveSteps"
                        :clickable="false"
                    />
                    <div class="demo-controls">
                        <AltrexButton
                            label="Previous"
                            variant="outline"
                            size="s"
                            :disabled="nonClickableStep === 0"
                            @click="
                                nonClickableStep = Math.max(0, nonClickableStep - 1)
                            "
                        />
                        <AltrexButton
                            label="Next"
                            size="s"
                            :disabled="
                                nonClickableStep === interactiveSteps.length - 1
                            "
                            @click="
                                nonClickableStep = Math.min(
                                    interactiveSteps.length - 1,
                                    nonClickableStep + 1
                                )
                            "
                        />
                    </div>
                </div>
            </div>
        </section>

        <!-- Real-World Examples -->
        <section class="demo-section">
            <h2>Real-World Examples</h2>

            <div class="demo-group">
                <!-- Checkout Flow -->
                <div class="demo-item demo-item--wide">
                    <h3>Checkout Flow</h3>
                    <AltrexStepper
                        v-model="checkoutStep"
                        :steps="checkoutSteps"
                        :clickable="false"
                    />
                    <div class="checkout-content">
                        <div v-if="checkoutStep === 0" class="step-content">
                            <h4>Shopping Cart</h4>
                            <p>Review your items and quantities</p>
                            <AltrexButton
                                label="Continue to Shipping"
                                @click="checkoutStep++"
                            />
                        </div>
                        <div v-else-if="checkoutStep === 1" class="step-content">
                            <h4>Shipping Information</h4>
                            <p>Enter your delivery address</p>
                            <div class="button-group">
                                <AltrexButton
                                    label="Back"
                                    variant="outline"
                                    @click="checkoutStep--"
                                />
                                <AltrexButton
                                    label="Continue to Payment"
                                    @click="checkoutStep++"
                                />
                            </div>
                        </div>
                        <div v-else-if="checkoutStep === 2" class="step-content">
                            <h4>Payment Method</h4>
                            <p>Choose your payment option</p>
                            <div class="button-group">
                                <AltrexButton
                                    label="Back"
                                    variant="outline"
                                    @click="checkoutStep--"
                                />
                                <AltrexButton
                                    label="Review Order"
                                    @click="checkoutStep++"
                                />
                            </div>
                        </div>
                        <div v-else class="step-content">
                            <h4>Order Confirmation</h4>
                            <p>Review and confirm your order</p>
                            <div class="button-group">
                                <AltrexButton
                                    label="Back"
                                    variant="outline"
                                    @click="checkoutStep--"
                                />
                                <AltrexButton
                                    label="Place Order"
                                    color="success"
                                    @click="checkoutStep = 0"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Onboarding Flow -->
                <div class="demo-item demo-item--wide">
                    <h3>Onboarding Wizard</h3>
                    <AltrexStepper
                        v-model="onboardingStep"
                        :steps="onboardingSteps"
                        clickable
                        variant="dots"
                    />
                    <div class="onboarding-content">
                        <div v-if="onboardingStep === 0" class="step-content">
                            <h4>Welcome!</h4>
                            <p>Let's get you set up in just a few steps</p>
                            <AltrexButton label="Get Started" @click="onboardingStep++" />
                        </div>
                        <div v-else-if="onboardingStep === 1" class="step-content">
                            <h4>Create Your Profile</h4>
                            <p>Tell us about yourself</p>
                            <AltrexButton label="Continue" @click="onboardingStep++" />
                        </div>
                        <div v-else-if="onboardingStep === 2" class="step-content">
                            <h4>Preferences</h4>
                            <p>Customize your experience</p>
                            <AltrexButton label="Continue" @click="onboardingStep++" />
                        </div>
                        <div v-else class="step-content">
                            <h4>All Done!</h4>
                            <p>You're ready to start using the app</p>
                            <AltrexButton
                                label="Start Exploring"
                                color="success"
                                @click="onboardingStep = 0"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Accessibility Section -->
        <section class="demo-section">
            <h2>Accessibility</h2>
            <p class="description">
                Built with WCAG 2.1 Level AAA compliance in mind
            </p>
            <div class="feature-list">
                <div class="feature-item">
                    <AltrexIcon icon="generic-check-circle" class="feature-icon" />
                    <div>
                        <strong>Keyboard Navigation:</strong> Arrow keys to navigate
                        between steps, Home/End for first/last step
                    </div>
                </div>
                <div class="feature-item">
                    <AltrexIcon icon="generic-check-circle" class="feature-icon" />
                    <div>
                        <strong>Touch Targets:</strong> 44×44px minimum on mobile
                        (WCAG AAA)
                    </div>
                </div>
                <div class="feature-item">
                    <AltrexIcon icon="generic-check-circle" class="feature-icon" />
                    <div>
                        <strong>ARIA Labels:</strong> Proper roles and labels for
                        screen readers
                    </div>
                </div>
                <div class="feature-item">
                    <AltrexIcon icon="generic-check-circle" class="feature-icon" />
                    <div>
                        <strong>Focus Management:</strong> Clear focus indicators and
                        logical tab order
                    </div>
                </div>
                <div class="feature-item">
                    <AltrexIcon icon="generic-check-circle" class="feature-icon" />
                    <div>
                        <strong>Color Contrast:</strong> WCAG AA compliant in both
                        light and dark modes
                    </div>
                </div>
            </div>
        </section>

        <!-- Props Reference -->
        <section class="demo-section">
            <h2>Props Reference</h2>
            <div class="props-table">
                <table>
                    <thead>
                        <tr>
                            <th>Prop</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>modelValue</code></td>
                            <td>Number</td>
                            <td>0</td>
                            <td>Current step index (v-model)</td>
                        </tr>
                        <tr>
                            <td><code>steps</code></td>
                            <td>Array</td>
                            <td>required</td>
                            <td>
                                Array of step objects with label, description,
                                disabled, error properties
                            </td>
                        </tr>
                        <tr>
                            <td><code>variant</code></td>
                            <td>String</td>
                            <td>'default'</td>
                            <td>
                                Visual variant: 'default', 'numbered', 'dots',
                                'minimal'
                            </td>
                        </tr>
                        <tr>
                            <td><code>clickable</code></td>
                            <td>Boolean</td>
                            <td>false</td>
                            <td>Whether steps can be clicked to navigate</td>
                        </tr>
                        <tr>
                            <td><code>color</code></td>
                            <td>String</td>
                            <td>'primary'</td>
                            <td>
                                Color variant: 'primary', 'secondary', 'success',
                                'warning', 'danger'
                            </td>
                        </tr>
                        <tr>
                            <td><code>size</code></td>
                            <td>String</td>
                            <td>'m'</td>
                            <td>Size variant: 's', 'm', 'l'</td>
                        </tr>
                        <tr>
                            <td><code>ariaLabel</code></td>
                            <td>String</td>
                            <td>'Progress steps'</td>
                            <td>ARIA label for the stepper group</td>
                        </tr>
                        <tr>
                            <td><code>styleOverrides</code></td>
                            <td>Object</td>
                            <td>undefined</td>
                            <td>CSS custom property overrides for theming</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Events Reference -->
        <section class="demo-section">
            <h2>Events</h2>
            <div class="props-table">
                <table>
                    <thead>
                        <tr>
                            <th>Event</th>
                            <th>Payload</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>update:modelValue</code></td>
                            <td>Number</td>
                            <td>Emitted when step changes (v-model)</td>
                        </tr>
                        <tr>
                            <td><code>change</code></td>
                            <td>
                                { step: Number, stepData: Object }
                            </td>
                            <td>Emitted when step changes with detailed info</td>
                        </tr>
                        <tr>
                            <td><code>complete</code></td>
                            <td>-</td>
                            <td>Emitted when navigating to the last step</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Step Object Format -->
        <section class="demo-section">
            <h2>Step Object Format</h2>
            <pre><code>{{
                `{
  label: string,           // Required: Step label text
  description?: string,    // Optional: Additional description
  disabled?: boolean,      // Optional: Disable step interaction
  error?: boolean          // Optional: Show error state
}`
            }}</code></pre>
        </section>

        <!-- Usage Example -->
        <section class="demo-section">
            <h2>Usage Example</h2>
            <pre><code>{{
                `<template>
  <AltrexStepper
    v-model="currentStep"
    :steps="steps"
    clickable
    variant="default"
    color="primary"
    size="m"
    @change="handleStepChange"
    @complete="handleComplete"
  />
</template>

<script>
export default {
  data() {
    return {
      currentStep: 0,
      steps: [
        { label: 'Account', description: 'Create your account' },
        { label: 'Profile', description: 'Set up your profile' },
        { label: 'Preferences', description: 'Customize settings' },
        { label: 'Complete', description: 'Review and finish' }
      ]
    }
  },
  methods: {
    handleStepChange(event) {
      console.log('Step changed to:', event.step)
    },
    handleComplete() {
      console.log('Reached final step!')
    }
  }
}
</script>`
            }}</code></pre>
        </section>
    </div>
</template>

<script>
import AltrexStepper from '@/components/Stepper/AltrexStepper.vue'
import AltrexButton from '@/components/Button/AltrexButton.vue'
import AltrexIcon from '@/components/Icon/AltrexIcon.vue'
import AltrexResponsiveDemo from '@/components/ResponsiveDemo/AltrexResponsiveDemo.vue'

export default {
    name: 'AltrexStepperView',

    components: {
        AltrexStepper,
        AltrexButton,
        AltrexIcon,
        AltrexResponsiveDemo,
    },

    data() {
        return {
            // Basic demo
            basicStep: 1,
            basicSteps: [
                { label: 'Account', description: 'Create your account' },
                { label: 'Profile', description: 'Set up your profile' },
                { label: 'Preferences', description: 'Choose your settings' },
                { label: 'Complete', description: 'Review and finish' },
            ],

            // Variant demos
            variantStep1: 1,
            variantStep2: 1,
            variantStep3: 1,
            variantSteps: [
                { label: 'Step One' },
                { label: 'Step Two' },
                { label: 'Step Three' },
            ],

            // Size demos
            sizeStep1: 1,
            sizeStep2: 1,
            sizeStep3: 1,
            sizeSteps: [
                { label: 'First' },
                { label: 'Second' },
                { label: 'Third' },
            ],

            // Color demos
            colorStep1: 1,
            colorStep2: 1,
            colorStep3: 1,
            colorStep4: 1,
            colorSteps: [
                { label: 'Start' },
                { label: 'Process' },
                { label: 'Finish' },
            ],

            // Error demo
            errorStep: 1,
            errorSteps: [
                { label: 'Personal Info', description: 'Basic details' },
                {
                    label: 'Validation',
                    description: 'Please fix errors',
                    error: true,
                },
                { label: 'Confirmation', description: 'Review and submit' },
            ],

            // Disabled demo
            disabledStepIndex: 1,
            disabledSteps: [
                { label: 'Available', description: 'You can access this step' },
                { label: 'Current', description: 'Current step' },
                {
                    label: 'Locked',
                    description: 'Complete previous steps first',
                    disabled: true,
                },
            ],

            // Interactive demos
            clickableStep: 1,
            nonClickableStep: 1,
            interactiveSteps: [
                { label: 'Introduction' },
                { label: 'Configuration' },
                { label: 'Summary' },
            ],

            // Checkout flow
            checkoutStep: 0,
            checkoutSteps: [
                { label: 'Cart', description: 'Review items' },
                { label: 'Shipping', description: 'Delivery address' },
                { label: 'Payment', description: 'Payment method' },
                { label: 'Confirm', description: 'Place order' },
            ],

            // Onboarding flow
            onboardingStep: 0,
            onboardingSteps: [
                { label: 'Welcome' },
                { label: 'Profile' },
                { label: 'Preferences' },
                { label: 'Complete' },
            ],
        }
    },

    methods: {
        handleStepChange(event) {
            console.log('Step changed:', event)
        },
    },
}
</script>

<style scoped>
.stepper-demo {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #1a1a1a;
}

.intro {
    font-size: 1.125rem;
    line-height: 1.6;
    color: #666;
    margin-bottom: 3rem;
}

.demo-section {
    margin: 4rem 0;
}

h2 {
    font-size: 1.875rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #1a1a1a;
}

.description {
    font-size: 1rem;
    color: #666;
    margin-bottom: 2rem;
}

.demo-group {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
}

.demo-item {
    padding: 1.5rem;
    background: #f9fafb;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
}

.demo-item--wide {
    grid-column: 1 / -1;
}

.demo-item h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #1a1a1a;
}

.demo-note {
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 1rem;
}

.demo-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;
}

.step-indicator {
    font-size: 0.875rem;
    color: #666;
    font-weight: 500;
}

.step-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    margin-top: 1.5rem;
    border: 1px solid #e5e7eb;
}

.step-content h4 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.step-content p {
    color: #666;
    margin-bottom: 1.5rem;
}

.button-group {
    display: flex;
    gap: 1rem;
}

.checkout-content,
.onboarding-content {
    margin-top: 1.5rem;
}

.feature-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.feature-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 8px;
}

.feature-icon {
    flex-shrink: 0;
    margin-top: 2px;
}

.feature-icon :deep(svg) {
    width: 20px;
    height: 20px;
    fill: #10b981;
}

.props-table {
    overflow-x: auto;
}

.props-table table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
}

.props-table th {
    text-align: left;
    padding: 0.75rem 1rem;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    font-weight: 600;
}

.props-table td {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
}

.props-table code {
    background: #f3f4f6;
    padding: 0.125rem 0.375rem;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 0.875em;
}

pre {
    background: #1f2937;
    color: #e5e7eb;
    padding: 1.5rem;
    border-radius: 8px;
    overflow-x: auto;
    font-size: 0.875rem;
    line-height: 1.5;
}

pre code {
    font-family: 'Courier New', monospace;
}

/* Dark mode */
[data-theme='dark'] h1,
[data-theme='dark'] h2,
[data-theme='dark'] .demo-item h3,
[data-theme='dark'] .step-content h4 {
    color: #f9fafb;
}

[data-theme='dark'] .intro,
[data-theme='dark'] .description,
[data-theme='dark'] .demo-note,
[data-theme='dark'] .step-indicator,
[data-theme='dark'] .step-content p {
    color: #d1d5db;
}

[data-theme='dark'] .demo-item,
[data-theme='dark'] .feature-item {
    background: #1f2937;
    border-color: #374151;
}

[data-theme='dark'] .step-content {
    background: #111827;
    border-color: #374151;
}

[data-theme='dark'] .props-table th {
    background: #1f2937;
    border-color: #374151;
    color: #f9fafb;
}

[data-theme='dark'] .props-table td {
    border-color: #374151;
    color: #d1d5db;
}

[data-theme='dark'] .props-table code {
    background: #374151;
    color: #e5e7eb;
}
</style>
