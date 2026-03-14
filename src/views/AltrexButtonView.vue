<template>
    <div class="button-demo">
        <h1>Altrex Button Component Demo</h1>

        <!-- Mobile-First Responsive Demo -->
        <AltrexResponsiveDemo
            title="Mobile-First Touch Targets"
            description="Buttons automatically adapt for optimal touch on mobile devices"
            notes="On mobile (< 768px): Buttons have a minimum 44px height for WCAG AAA touch targets. On desktop: Buttons can be more compact (40px default). Icon-only buttons always maintain 44x44px touch area."
        >
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <AltrexButton label="Primary Button" variant="fill" />
                <AltrexButton label="With Icon" left-icon="generic-basket" variant="ghost" />
                <AltrexButton aria-label="Icon Only" left-icon="generic-basket" />
            </div>
        </AltrexResponsiveDemo>

        <section class="demo-section">
            <h2>Variants</h2>
            <p class="description">Three button variants for different use cases</p>

            <div class="demo-group">
                <div class="demo-item">
                    <AltrexButton
                        label="Fill Button"
                        variant="fill"
                    />
                    <span class="demo-label">Fill - Primary actions with solid background</span>
                </div>

                <div class="demo-item">
                    <AltrexButton
                        label="Ghost Button"
                        variant="ghost"
                    />
                    <span class="demo-label">Ghost - Secondary actions with border</span>
                </div>

                <div class="demo-item">
                    <AltrexButton
                        label="Flat Button"
                        variant="flat"
                    />
                    <span class="demo-label">Flat - Tertiary actions, text only</span>
                </div>
            </div>
        </section>

        <section class="demo-section">
            <h2>Sizes</h2>
            <p class="description">Four size options: xs, s, m (default), l</p>

            <div class="demo-group">
                <AltrexButton label="Extra Small" size="xs" />
                <AltrexButton label="Small" size="s" />
                <AltrexButton label="Medium" size="m" />
                <AltrexButton label="Large" size="l" />
            </div>
        </section>

        <section class="demo-section">
            <h2>Shapes</h2>
            <p class="description">Square (default) or pill-shaped buttons</p>

            <div class="demo-group">
                <AltrexButton label="Square" shape="square" />
                <AltrexButton label="Pill" shape="pill" />
            </div>
        </section>

        <section class="demo-section">
            <h2>With Icons</h2>
            <p class="description">Add icons to the left, right, or use icon-only buttons</p>

            <div class="demo-group">
                <AltrexButton
                    label="Left Icon"
                    left-icon="generic-basket"
                />
                <AltrexButton
                    label="Right Icon"
                    right-icon="generic-basket"
                />
                <AltrexButton
                    aria-label="Icon Only"
                    left-icon="generic-basket"
                />
            </div>
        </section>

        <section class="demo-section">
            <h2>States</h2>
            <p class="description">Hover, active, and disabled states</p>

            <div class="demo-group">
                <div class="demo-item">
                    <AltrexButton label="Normal" />
                    <span class="demo-label">Hover and click to see states</span>
                </div>

                <div class="demo-item">
                    <AltrexButton label="Disabled" :disabled="true" />
                    <span class="demo-label">Disabled state</span>
                </div>
            </div>
        </section>

        <section class="demo-section">
            <h2>Combined Examples</h2>
            <p class="description">Various combinations of size, shape, variant, and icons</p>

            <div class="demo-group">
                <AltrexButton
                    label="Small Pill Ghost"
                    size="s"
                    shape="pill"
                    variant="ghost"
                    left-icon="generic-basket"
                />
                <AltrexButton
                    label="Large Square Fill"
                    size="l"
                    shape="square"
                    variant="fill"
                    right-icon="generic-basket"
                />
                <AltrexButton
                    label="Medium Pill Flat"
                    size="m"
                    shape="pill"
                    variant="flat"
                    left-icon="generic-basket"
                />
            </div>
        </section>

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
                            <td><code>label</code></td>
                            <td>String</td>
                            <td>-</td>
                            <td>Button text label</td>
                        </tr>
                        <tr>
                            <td><code>variant</code></td>
                            <td>String</td>
                            <td>'fill'</td>
                            <td>Visual style: 'fill', 'ghost', 'flat'</td>
                        </tr>
                        <tr>
                            <td><code>size</code></td>
                            <td>String</td>
                            <td>'m'</td>
                            <td>Button size: 'xs', 's', 'm', 'l'</td>
                        </tr>
                        <tr>
                            <td><code>shape</code></td>
                            <td>String</td>
                            <td>'square'</td>
                            <td>Border radius: 'square', 'pill'</td>
                        </tr>
                        <tr>
                            <td><code>leftIcon</code></td>
                            <td>String</td>
                            <td>null</td>
                            <td>Icon name to display on the left</td>
                        </tr>
                        <tr>
                            <td><code>rightIcon</code></td>
                            <td>String</td>
                            <td>null</td>
                            <td>Icon name to display on the right</td>
                        </tr>
                        <tr>
                            <td><code>disabled</code></td>
                            <td>Boolean</td>
                            <td>false</td>
                            <td>Disable button interactions</td>
                        </tr>
                        <tr>
                            <td><code>ariaLabel</code></td>
                            <td>String</td>
                            <td>null</td>
                            <td>Accessible label for screen readers</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section class="demo-section">
            <h2>Usage Example</h2>
            <pre class="code-block"><code>&lt;template&gt;
  &lt;AltrexButton
    label="Click Me"
    variant="fill"
    size="m"
    shape="pill"
    left-icon="generic-basket"
    @click="handleClick"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import AltrexButton from '@/components/Button/AltrexButton.vue';

const handleClick = () => {
  console.log('Button clicked!');
};
&lt;/script&gt;</code></pre>
        </section>
    </div>
</template>

<script>
import AltrexButton from '@/components/Button/AltrexButton.vue';
import AltrexResponsiveDemo from '@/components/ResponsiveDemo/AltrexResponsiveDemo.vue';

export default {
    name: 'AltrexButtonView',
    components: {
        AltrexButton,
        AltrexResponsiveDemo,
    },
};
</script>

<style scoped>
.button-demo {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

h1 {
    margin-bottom: 2rem;
    color: #212529;
}

.demo-section {
    margin-bottom: 3rem;
}

.demo-section h2 {
    margin-bottom: 0.5rem;
    color: #343a40;
}

.description {
    margin-bottom: 1.5rem;
    color: #868e96;
    font-size: 0.875rem;
}

.demo-group {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
}

.demo-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
}

.demo-label {
    font-size: 0.75rem;
    color: #868e96;
    max-width: 150px;
}

.props-table {
    overflow-x: auto;
}

.props-table table {
    border-collapse: collapse;
    width: 100%;
}

.props-table th,
.props-table td {
    border: 1px solid #e0e0e0;
    padding: 0.75rem;
    text-align: left;
}

.props-table th {
    background-color: #f8f9fa;
    color: #2c3e50;
    font-weight: 600;
}

.props-table code {
    background-color: #f1f3f5;
    border-radius: 3px;
    color: #e74c3c;
    font-family: 'Courier New', monospace;
    font-size: 0.875rem;
    padding: 0.125rem 0.375rem;
}

.props-table tr:nth-child(even) {
    background-color: #fafbfc;
}

.code-block {
    background-color: #2c3e50;
    border-radius: 4px;
    color: #ecf0f1;
    overflow-x: auto;
    padding: 1.5rem;
}

.code-block code {
    font-family: 'Courier New', monospace;
    font-size: 0.875rem;
    line-height: 1.6;
    white-space: pre;
}
</style>