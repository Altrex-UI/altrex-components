<template>
    <div class="breadcrumb-demo">
        <h1>Altrex Breadcrumb Component Demo</h1>
        <p class="subtitle">
            Mobile-first navigation breadcrumbs with touch-optimized targets and responsive behavior
        </p>

        <!-- Basic Usage -->
        <section class="demo-section">
            <h2>Basic Usage</h2>
            <p class="description">
                Simple breadcrumb navigation with multiple levels. The last item is automatically styled as the current page.
            </p>

            <div class="demo-group">
                <AltrexBreadcrumb :items="basicItems" />
            </div>
        </section>

        <!-- With Router Links -->
        <section class="demo-section">
            <h2>With Router Links</h2>
            <p class="description">
                Breadcrumbs can use Vue Router for navigation using the <code>to</code> property.
            </p>

            <div class="demo-group">
                <AltrexBreadcrumb :items="routerItems" />
            </div>
        </section>

        <!-- With Icons -->
        <section class="demo-section">
            <h2>With Icons</h2>
            <p class="description">
                Add icons to breadcrumb items for better visual hierarchy and context.
            </p>

            <div class="demo-group">
                <AltrexBreadcrumb :items="iconItems" />
            </div>
        </section>

        <!-- Custom Separator -->
        <section class="demo-section">
            <h2>Custom Separator</h2>
            <p class="description">
                Customize the separator icon between breadcrumb items.
            </p>

            <div class="demo-group demo-group--column">
                <div class="demo-item">
                    <AltrexBreadcrumb
                        :items="basicItems"
                        separator-icon="generic-arrow-right"
                    />
                    <span class="demo-label">Arrow separator</span>
                </div>

                <div class="demo-item">
                    <AltrexBreadcrumb :items="basicItems">
                        <template #separator>
                            <span class="custom-separator">/</span>
                        </template>
                    </AltrexBreadcrumb>
                    <span class="demo-label">Custom slash separator</span>
                </div>

                <div class="demo-item">
                    <AltrexBreadcrumb :items="basicItems">
                        <template #separator>
                            <span class="custom-separator">→</span>
                        </template>
                    </AltrexBreadcrumb>
                    <span class="demo-label">Custom arrow character</span>
                </div>
            </div>
        </section>

        <!-- Collapsed Breadcrumbs -->
        <section class="demo-section">
            <h2>Collapsed Breadcrumbs</h2>
            <p class="description">
                Long breadcrumb trails can be collapsed to save space using the <code>maxItems</code> prop.
            </p>

            <div class="demo-group demo-group--column">
                <div class="demo-item">
                    <AltrexBreadcrumb
                        :items="longItems"
                        :max-items="4"
                        collapse-from="middle"
                    />
                    <span class="demo-label">Collapse from middle (default)</span>
                </div>

                <div class="demo-item">
                    <AltrexBreadcrumb
                        :items="longItems"
                        :max-items="4"
                        collapse-from="start"
                    />
                    <span class="demo-label">Collapse from start</span>
                </div>

                <div class="demo-item">
                    <AltrexBreadcrumb
                        :items="longItems"
                        :max-items="4"
                        collapse-from="end"
                    />
                    <span class="demo-label">Collapse from end</span>
                </div>
            </div>
        </section>

        <!-- Disabled Items -->
        <section class="demo-section">
            <h2>Disabled Items</h2>
            <p class="description">
                Items can be disabled to indicate unavailable navigation paths.
            </p>

            <div class="demo-group">
                <AltrexBreadcrumb :items="disabledItems" />
            </div>
        </section>

        <!-- Dark Mode -->
        <section class="demo-section">
            <h2>Dark Mode</h2>
            <p class="description">
                Breadcrumbs automatically adapt to dark mode with appropriate color contrast.
            </p>

            <div class="demo-group">
                <div class="dark-mode-preview">
                    <AltrexBreadcrumb :items="iconItems" />
                </div>
            </div>
        </section>

        <!-- Custom Styling -->
        <section class="demo-section">
            <h2>Custom Styling</h2>
            <p class="description">
                Use the <code>styleOverrides</code> prop to customize colors, spacing, and other visual properties.
            </p>

            <div class="demo-group demo-group--column">
                <div class="demo-item">
                    <AltrexBreadcrumb
                        :items="basicItems"
                        :style-overrides="{
                            color: '#2563eb',
                            colorHover: '#1d4ed8',
                            backgroundHover: '#dbeafe',
                            fontWeight: '600'
                        }"
                    />
                    <span class="demo-label">Blue theme</span>
                </div>

                <div class="demo-item">
                    <AltrexBreadcrumb
                        :items="basicItems"
                        :style-overrides="{
                            color: '#059669',
                            colorHover: '#047857',
                            backgroundHover: '#d1fae5',
                            gap: '16px',
                            fontSize: '18px'
                        }"
                    />
                    <span class="demo-label">Green theme with larger spacing</span>
                </div>
            </div>
        </section>

        <!-- Responsive Behavior -->
        <section class="demo-section">
            <h2>Responsive Behavior</h2>
            <p class="description">
                <strong>Mobile:</strong> 44×44px touch targets, 16px font, truncated text (150px max)<br>
                <strong>Tablet:</strong> More compact (32px height), base font size, 200px text max<br>
                <strong>Desktop:</strong> Full layout with 300px text max width
            </p>

            <div class="demo-group">
                <AltrexBreadcrumb :items="longTextItems" />
            </div>
        </section>

        <!-- Accessibility -->
        <section class="demo-section">
            <h2>Accessibility Features</h2>
            <ul class="feature-list">
                <li><code>aria-label</code> on nav element (default: "Breadcrumb navigation")</li>
                <li><code>aria-current="page"</code> on the current/last item</li>
                <li>Semantic <code>&lt;nav&gt;</code> and <code>&lt;ol&gt;</code> structure</li>
                <li>Keyboard navigation support via links</li>
                <li>Focus visible outlines for keyboard users</li>
                <li>WCAG AAA touch targets (44×44px minimum on mobile)</li>
                <li>Proper color contrast in both light and dark modes</li>
            </ul>
        </section>

        <!-- Props API -->
        <section class="demo-section">
            <h2>Props</h2>
            <table class="props-table">
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
                        <td><code>items</code></td>
                        <td>Array</td>
                        <td>required</td>
                        <td>Array of breadcrumb items (label, href/to, icon, disabled)</td>
                    </tr>
                    <tr>
                        <td><code>separatorIcon</code></td>
                        <td>String</td>
                        <td>'generic-chevron-right'</td>
                        <td>Icon name for separator between items</td>
                    </tr>
                    <tr>
                        <td><code>maxItems</code></td>
                        <td>Number</td>
                        <td>null</td>
                        <td>Maximum number of visible items before collapsing</td>
                    </tr>
                    <tr>
                        <td><code>collapseFrom</code></td>
                        <td>String</td>
                        <td>'middle'</td>
                        <td>Where to collapse: 'start', 'middle', or 'end'</td>
                    </tr>
                    <tr>
                        <td><code>ariaLabel</code></td>
                        <td>String</td>
                        <td>'Breadcrumb navigation'</td>
                        <td>Accessible label for the nav element</td>
                    </tr>
                    <tr>
                        <td><code>styleOverrides</code></td>
                        <td>Object</td>
                        <td>{}</td>
                        <td>Custom CSS variable overrides</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <!-- Item Object Structure -->
        <section class="demo-section">
            <h2>Item Object Structure</h2>
            <pre class="code-block">{{ itemStructure }}</pre>
        </section>
    </div>
</template>

<script>
import AltrexBreadcrumb from '@/components/Breadcrumb/AltrexBreadcrumb.vue';

export default {
    name: 'AltrexBreadcrumbView',
    components: {
        AltrexBreadcrumb,
    },
    data() {
        return {
            basicItems: [
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' },
                { label: 'Electronics', href: '/products/electronics' },
                { label: 'Laptops' },
            ],
            routerItems: [
                { label: 'Home', to: '/homepage' },
                { label: 'Components', to: '/AltrexButton' },
                { label: 'Breadcrumb' },
            ],
            iconItems: [
                { label: 'Home', href: '/', icon: 'generic-home' },
                { label: 'Documents', href: '/documents', icon: 'generic-folder' },
                { label: 'Reports', href: '/documents/reports', icon: 'generic-file' },
                { label: 'Annual Report 2024', icon: 'generic-file-text' },
            ],
            longItems: [
                { label: 'Home', href: '/' },
                { label: 'Category', href: '/category' },
                { label: 'Subcategory', href: '/category/subcategory' },
                { label: 'Section', href: '/category/subcategory/section' },
                { label: 'Subsection', href: '/category/subcategory/section/subsection' },
                { label: 'Item', href: '/category/subcategory/section/subsection/item' },
                { label: 'Current Page' },
            ],
            disabledItems: [
                { label: 'Home', href: '/' },
                { label: 'Products', disabled: true },
                { label: 'Electronics', href: '/products/electronics' },
                { label: 'Laptops' },
            ],
            longTextItems: [
                { label: 'Home', href: '/' },
                { label: 'Very Long Category Name That Might Need Truncation', href: '/long-category' },
                { label: 'Another Really Long Subcategory Name', href: '/long-category/long-sub' },
                { label: 'Current Page With Long Name' },
            ],
            itemStructure: `{
  label: 'Item Label',      // Required: Display text
  href: '/path',            // Optional: Regular link
  to: '/route',             // Optional: Vue Router link
  icon: 'generic-home',     // Optional: Icon name
  disabled: false,          // Optional: Disable interaction
  target: '_blank'          // Optional: Link target
}`,
        };
    },
};
</script>

<style lang="stylus" scoped>
.breadcrumb-demo
    padding: $altrex-spacing-8
    max-width: 1200px
    margin: 0 auto

    +above('md')
        padding: $altrex-spacing-10

h1
    font-size: $altrex-fluidTypography-h1
    font-weight: $altrex-font-weight-bold
    color: $altrex-colors-neutral-900
    margin-bottom: $altrex-spacing-3

    [data-theme="dark"] &
        color: var(--altrex-colors-dark-text-primary)

.subtitle
    font-size: $altrex-fontSize-lg
    color: $altrex-colors-neutral-600
    margin-bottom: $altrex-spacing-8

    [data-theme="dark"] &
        color: var(--altrex-colors-dark-text-secondary)

h2
    font-size: $altrex-fluidTypography-h3
    font-weight: $altrex-font-weight-semibold
    color: $altrex-colors-neutral-900
    margin-bottom: $altrex-spacing-3

    [data-theme="dark"] &
        color: var(--altrex-colors-dark-text-primary)

.demo-section
    margin-bottom: $altrex-spacing-10
    padding-bottom: $altrex-spacing-8
    border-bottom: 1px solid $altrex-colors-neutral-200

    [data-theme="dark"] &
        border-bottom-color: var(--altrex-colors-dark-border-default)

    &:last-child
        border-bottom: none

.description
    color: $altrex-colors-neutral-600
    margin-bottom: $altrex-spacing-5
    line-height: 1.6

    [data-theme="dark"] &
        color: var(--altrex-colors-dark-text-secondary)

    code
        background: $altrex-colors-neutral-100
        padding: 2px 6px
        border-radius: $altrex-borderRadius-sm
        font-family: monospace
        font-size: 0.9em

        [data-theme="dark"] &
            background: var(--altrex-colors-dark-bg-elevated)

.demo-group
    display: flex
    gap: $altrex-spacing-6
    flex-wrap: wrap
    padding: $altrex-spacing-5
    background: $altrex-colors-neutral-50
    border-radius: $altrex-borderRadius-lg

    [data-theme="dark"] &
        background: var(--altrex-colors-dark-bg-subtle)

    &--column
        flex-direction: column

.demo-item
    display: flex
    flex-direction: column
    gap: $altrex-spacing-3
    flex: 1
    min-width: 300px

.demo-label
    font-size: $altrex-fontSize-sm
    color: $altrex-colors-neutral-600
    font-style: italic

    [data-theme="dark"] &
        color: var(--altrex-colors-dark-text-tertiary)

.custom-separator
    font-size: 18px
    font-weight: bold
    color: $altrex-colors-neutral-400

    [data-theme="dark"] &
        color: var(--altrex-colors-dark-text-tertiary)

.dark-mode-preview
    padding: $altrex-spacing-6
    background: #1a1a1a
    border-radius: $altrex-borderRadius-lg

    &:deep(.altrex-breadcrumb__link)
        color: #e5e5e5

        &:not(.altrex-breadcrumb__link--active):hover
            color: #60a5fa
            background: rgba(96, 165, 250, 0.1)

.feature-list
    list-style: none
    padding: 0
    margin: 0

    li
        padding: $altrex-spacing-2 0
        padding-left: $altrex-spacing-5
        position: relative
        color: $altrex-colors-neutral-700

        [data-theme="dark"] &
            color: var(--altrex-colors-dark-text-secondary)

        &::before
            content: '✓'
            position: absolute
            left: 0
            color: $altrex-colors-success-500
            font-weight: bold

        code
            background: $altrex-colors-neutral-100
            padding: 2px 6px
            border-radius: $altrex-borderRadius-sm
            font-family: monospace
            font-size: 0.9em

            [data-theme="dark"] &
                background: var(--altrex-colors-dark-bg-elevated)

.props-table
    width: 100%
    border-collapse: collapse
    margin-top: $altrex-spacing-4

    th, td
        text-align: left
        padding: $altrex-spacing-3
        border-bottom: 1px solid $altrex-colors-neutral-200

        [data-theme="dark"] &
            border-bottom-color: var(--altrex-colors-dark-border-default)

    th
        font-weight: $altrex-font-weight-semibold
        color: $altrex-colors-neutral-900
        background: $altrex-colors-neutral-100

        [data-theme="dark"] &
            color: var(--altrex-colors-dark-text-primary)
            background: var(--altrex-colors-dark-bg-subtle)

    td
        color: $altrex-colors-neutral-700

        [data-theme="dark"] &
            color: var(--altrex-colors-dark-text-secondary)

    code
        background: $altrex-colors-neutral-100
        padding: 2px 6px
        border-radius: $altrex-borderRadius-sm
        font-family: monospace
        font-size: 0.9em

        [data-theme="dark"] &
            background: var(--altrex-colors-dark-bg-elevated)

.code-block
    background: $altrex-colors-neutral-900
    color: $altrex-colors-neutral-100
    padding: $altrex-spacing-5
    border-radius: $altrex-borderRadius-lg
    overflow-x: auto
    font-family: monospace
    font-size: 14px
    line-height: 1.6

    [data-theme="dark"] &
        background: var(--altrex-colors-dark-bg-elevated)
</style>
