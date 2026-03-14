<template>
    <div class="badge-demo">
        <h1>Altrex Badge Component</h1>
        <p class="intro">A versatile micro-component for displaying badges, labels, and status indicators throughout your application.</p>

        <section class="demo-section">
            <h2>Basic Variants</h2>
            <p class="description">Badge supports five color variants for different contexts</p>

            <div class="demo-preview">
                <div class="badge-group">
                    <AltrexBadge content="Primary" variant="primary" />
                    <AltrexBadge content="Success" variant="success" />
                    <AltrexBadge content="Warning" variant="warning" />
                    <AltrexBadge content="Danger" variant="danger" />
                    <AltrexBadge content="Neutral" variant="neutral" />
                </div>
            </div>

            <pre class="code-block"><code>&lt;AltrexBadge content="Primary" variant="primary" /&gt;
&lt;AltrexBadge content="Success" variant="success" /&gt;
&lt;AltrexBadge content="Warning" variant="warning" /&gt;
&lt;AltrexBadge content="Danger" variant="danger" /&gt;
&lt;AltrexBadge content="Neutral" variant="neutral" /&gt;</code></pre>
        </section>

        <section class="demo-section">
            <h2>Sizes</h2>
            <p class="description">Three size options for different use cases</p>

            <div class="demo-preview">
                <div class="badge-group">
                    <AltrexBadge content="Small" variant="primary" size="small" />
                    <AltrexBadge content="Medium" variant="primary" size="medium" />
                    <AltrexBadge content="Large" variant="primary" size="large" />
                </div>
            </div>

            <pre class="code-block"><code>&lt;AltrexBadge content="Small" variant="primary" size="small" /&gt;
&lt;AltrexBadge content="Medium" variant="primary" size="medium" /&gt;
&lt;AltrexBadge content="Large" variant="primary" size="large" /&gt;</code></pre>
        </section>

        <section class="demo-section">
            <h2>Number Badges</h2>
            <p class="description">Perfect for notification counts and counters</p>

            <div class="demo-preview">
                <div class="badge-group">
                    <AltrexBadge :content="1" variant="danger" />
                    <AltrexBadge :content="5" variant="success" />
                    <AltrexBadge :content="99" variant="warning" />
                    <AltrexBadge :content="999" variant="primary" size="small" />
                </div>
            </div>

            <pre class="code-block"><code>&lt;AltrexBadge :content="1" variant="danger" /&gt;
&lt;AltrexBadge :content="5" variant="success" /&gt;
&lt;AltrexBadge :content="99" variant="warning" /&gt;</code></pre>
        </section>

        <section class="demo-section">
            <h2>Outlined Style</h2>
            <p class="description">Subtle outlined variant for lighter visual weight</p>

            <div class="demo-preview">
                <div class="badge-group">
                    <AltrexBadge content="Primary" variant="primary" outlined />
                    <AltrexBadge content="Success" variant="success" outlined />
                    <AltrexBadge content="Warning" variant="warning" outlined />
                    <AltrexBadge content="Danger" variant="danger" outlined />
                    <AltrexBadge content="Neutral" variant="neutral" outlined />
                </div>
            </div>

            <pre class="code-block"><code>&lt;AltrexBadge content="Primary" variant="primary" outlined /&gt;
&lt;AltrexBadge content="Success" variant="success" outlined /&gt;
&lt;AltrexBadge content="Warning" variant="warning" outlined /&gt;</code></pre>
        </section>

        <section class="demo-section">
            <h2>Dot Indicators</h2>
            <p class="description">Small status indicators without text</p>

            <div class="demo-preview">
                <div class="badge-group">
                    <AltrexBadge variant="primary" dot />
                    <AltrexBadge variant="success" dot />
                    <AltrexBadge variant="warning" dot />
                    <AltrexBadge variant="danger" dot />
                    <AltrexBadge variant="neutral" dot />
                </div>
            </div>

            <pre class="code-block"><code>&lt;AltrexBadge variant="primary" dot /&gt;
&lt;AltrexBadge variant="success" dot /&gt;
&lt;AltrexBadge variant="danger" dot /&gt;</code></pre>
        </section>

        <section class="demo-section">
            <h2>In Navigation</h2>
            <p class="description">Badges automatically integrate with navigation components</p>

            <div class="demo-preview">
                <div class="demo-container">
                    <AltrexSideNav
                        :navigation-items="navItemsWithBadges"
                        :logo="logoConfig"
                        width="280px"
                        variant="dark"
                        :show-icons="true"
                        position="static"
                    />
                    <div class="demo-content">
                        <p>Navigation items support badges through the <code>badge</code> and <code>badgeVariant</code> props:</p>
                        <pre class="code-snippet"><code>{{navBadgeExample}}</code></pre>
                    </div>
                </div>
            </div>
        </section>

        <section class="demo-section">
            <h2>In Cards</h2>
            <p class="description">Cards support badges in all corners of thumbnail and content areas</p>

            <div class="demo-preview">
                <div class="cards-grid">
                    <AltrexCard
                        element="div"
                        size="m"
                        badge="New"
                        badgeVariant="success"
                        badgePosition="thumbnail-top-right"
                    >
                        <template #thumbnail>
                            <img src="https://picsum.photos/350/200?random=1" alt="Card thumbnail">
                        </template>
                        <template #content>
                            <h3>Badge on Thumbnail</h3>
                            <p>Badge positioned in top-right corner of thumbnail area</p>
                        </template>
                    </AltrexCard>

                    <AltrexCard
                        element="div"
                        size="m"
                        :badge="5"
                        badgeVariant="danger"
                        badgePosition="content-top-right"
                    >
                        <template #thumbnail>
                            <img src="https://picsum.photos/350/200?random=2" alt="Card thumbnail">
                        </template>
                        <template #content>
                            <h3>Badge on Content</h3>
                            <p>Badge positioned in top-right corner of content area</p>
                        </template>
                    </AltrexCard>

                    <AltrexCard
                        element="div"
                        size="m"
                        badge="Sale"
                        badgeVariant="warning"
                        badgePosition="thumbnail-top-left"
                    >
                        <template #thumbnail>
                            <img src="https://picsum.photos/350/200?random=3" alt="Card thumbnail">
                        </template>
                        <template #content>
                            <h3>Top-Left Position</h3>
                            <p>Badge positioned in top-left corner of thumbnail</p>
                        </template>
                    </AltrexCard>

                    <AltrexCard
                        element="div"
                        size="m"
                        badge="Featured"
                        badgeVariant="primary"
                        badgePosition="thumbnail-bottom-right"
                    >
                        <template #thumbnail>
                            <img src="https://picsum.photos/350/200?random=4" alt="Card thumbnail">
                        </template>
                        <template #content>
                            <h3>Bottom-Right Position</h3>
                            <p>Badge positioned in bottom-right corner</p>
                        </template>
                    </AltrexCard>
                </div>
            </div>

            <pre class="code-block"><code>&lt;AltrexCard
  badge="New"
  badgeVariant="success"
  badgePosition="thumbnail-top-right"
&gt;
  &lt;template #thumbnail&gt;
    &lt;img src="..." alt="Card thumbnail"&gt;
  &lt;/template&gt;
  &lt;template #content&gt;
    &lt;h3&gt;Card Title&lt;/h3&gt;
    &lt;p&gt;Card content...&lt;/p&gt;
  &lt;/template&gt;
&lt;/AltrexCard&gt;</code></pre>

            <h3>Available Badge Positions</h3>
            <div class="position-options">
                <div class="position-group">
                    <h4>Thumbnail Positions</h4>
                    <ul>
                        <li><code>thumbnail-top-left</code></li>
                        <li><code>thumbnail-top-right</code></li>
                        <li><code>thumbnail-bottom-left</code></li>
                        <li><code>thumbnail-bottom-right</code></li>
                    </ul>
                </div>
                <div class="position-group">
                    <h4>Content Positions</h4>
                    <ul>
                        <li><code>content-top-left</code></li>
                        <li><code>content-top-right</code></li>
                        <li><code>content-bottom-left</code></li>
                        <li><code>content-bottom-right</code></li>
                    </ul>
                </div>
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
                            <td><code>content</code></td>
                            <td>String, Number</td>
                            <td>null</td>
                            <td>Badge text or number content</td>
                        </tr>
                        <tr>
                            <td><code>variant</code></td>
                            <td>String</td>
                            <td>'primary'</td>
                            <td>Color variant: primary, success, warning, danger, neutral</td>
                        </tr>
                        <tr>
                            <td><code>size</code></td>
                            <td>String</td>
                            <td>'medium'</td>
                            <td>Size: small, medium, large</td>
                        </tr>
                        <tr>
                            <td><code>dot</code></td>
                            <td>Boolean</td>
                            <td>false</td>
                            <td>Display as a small dot indicator</td>
                        </tr>
                        <tr>
                            <td><code>outlined</code></td>
                            <td>Boolean</td>
                            <td>false</td>
                            <td>Display with outlined style</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section class="demo-section">
            <h2>Usage with Slot</h2>
            <p class="description">Custom content via default slot</p>

            <div class="demo-preview">
                <div class="badge-group">
                    <AltrexBadge variant="primary">
                        <span style="font-weight: bold;">★ VIP</span>
                    </AltrexBadge>
                    <AltrexBadge variant="success">
                        <span>✓ Verified</span>
                    </AltrexBadge>
                    <AltrexBadge variant="warning">
                        <span>⚠ Alert</span>
                    </AltrexBadge>
                </div>
            </div>

            <pre class="code-block"><code>&lt;AltrexBadge variant="primary"&gt;
  &lt;span style="font-weight: bold;"&gt;★ VIP&lt;/span&gt;
&lt;/AltrexBadge&gt;</code></pre>
        </section>

        <section class="demo-section">
            <h2>Import</h2>
            <pre class="code-block"><code>import AltrexBadge from '@/components/Badge/AltrexBadge.vue';</code></pre>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import AltrexBadge from '@/components/Badge/AltrexBadge.vue';
import AltrexSideNav from '@/components/Navigation/AltrexSideNav.vue';
import AltrexCard from '@/components/Card/AltrexCard.vue';
import LightLogo from '@/assets/AltrexLogoLight.svg';
import DarkLogo from '@/assets/AltrexLogoDark.svg';

const logoConfig = {
    light: LightLogo,
    dark: DarkLogo,
    alt: 'Altrex UI',
    href: '/'
};

const navItemsWithBadges = ref([
    {
        label: 'Dashboard',
        icon: 'generic-home',
        badge: 3,
        badgeVariant: 'danger'
    },
    {
        label: 'Components',
        section: true,
        icon: 'generic-puzzle',
        badge: 'New',
        badgeVariant: 'success',
        defaultExpanded: true,
        children: [
            {
                label: 'Button',
                icon: 'generic-click'
            },
            {
                label: 'Card',
                icon: 'generic-card'
            },
            {
                label: 'Badge',
                icon: 'generic-tag',
                badge: 'New',
                badgeVariant: 'success'
            }
        ]
    },
    {
        label: 'Settings',
        icon: 'generic-settings',
        badge: 1,
        badgeVariant: 'warning'
    }
]);

const navBadgeExample = `{
  label: 'Dashboard',
  icon: 'generic-home',
  badge: 3,                // Number or string
  badgeVariant: 'danger'   // Color variant
}`;
</script>

<style lang="stylus" scoped>
.badge-demo {
    margin-left: 0;
    max-width: 1400px;
    padding: 2rem;
}

h1 {
    color: #2c3e50;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

.intro {
    color: #7f8c8d;
    font-size: 1.125rem;
    margin-bottom: 2rem;
}

.demo-section {
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-bottom: 3rem;
    padding: 2rem;

    h2 {
        color: #2c3e50;
        font-size: 1.75rem;
        margin-bottom: 0.5rem;
        margin-top: 0;
    }

    h3 {
        color: #2c3e50;
        font-size: 1.25rem;
        margin-bottom: 1rem;
        margin-top: 2rem;
    }

    h4 {
        color: #2c3e50;
        font-size: 1rem;
        margin-bottom: 0.5rem;
        margin-top: 0;
    }

    .description {
        color: #7f8c8d;
        font-size: 1rem;
        margin-bottom: 1.5rem;
    }
}

.demo-preview {
    background: #f8f9fa;
    border: 1px dashed #d0d0d0;
    border-radius: 4px;
    margin-bottom: 1rem;
    padding: 2rem;
}

.badge-group {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.demo-container {
    display: flex;
    min-height: 400px;
}

.demo-content {
    flex: 1;
    padding: 2rem;

    p {
        color: #2c3e50;
        line-height: 1.6;
        margin-bottom: 1rem;
    }

    code {
        background-color: #f1f3f5;
        border-radius: 3px;
        color: #e74c3c;
        font-family: 'Courier New', monospace;
        font-size: 0.875rem;
        padding: 0.125rem 0.375rem;
    }
}

.code-snippet {
    background-color: #2c3e50;
    border-radius: 4px;
    color: #ecf0f1;
    font-family: 'Courier New', monospace;
    font-size: 0.875rem;
    line-height: 1.6;
    margin-top: 1rem;
    overflow-x: auto;
    padding: 1rem;
    white-space: pre;
}

.cards-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

    h3 {
        color: #2c3e50;
        font-size: 1.125rem;
        margin: 0 0 0.5rem;
    }

    p {
        color: #7f8c8d;
        font-size: 0.875rem;
        margin: 0;
    }
}

.position-options {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    margin-top: 1.5rem;

    .position-group {
        ul {
            list-style: none;
            padding: 0;

            li {
                margin-bottom: 0.5rem;

                code {
                    background-color: #f1f3f5;
                    border-radius: 3px;
                    color: #e74c3c;
                    font-family: 'Courier New', monospace;
                    font-size: 0.875rem;
                    padding: 0.25rem 0.5rem;
                }
            }
        }
    }
}

.props-table {
    overflow-x: auto;

    table {
        border-collapse: collapse;
        width: 100%;

        th,
        td {
            border: 1px solid #e0e0e0;
            padding: 0.75rem;
            text-align: left;
        }

        th {
            background-color: #f8f9fa;
            color: #2c3e50;
            font-weight: 600;
        }

        code {
            background-color: #f1f3f5;
            border-radius: 3px;
            color: #e74c3c;
            font-family: 'Courier New', monospace;
            font-size: 0.875rem;
            padding: 0.125rem 0.375rem;
        }

        tr:nth-child(even) {
            background-color: #fafbfc;
        }
    }
}

.code-block {
    background-color: #2c3e50;
    border-radius: 4px;
    color: #ecf0f1;
    margin-top: 1rem;
    overflow-x: auto;
    padding: 1.5rem;

    code {
        font-family: 'Courier New', monospace;
        font-size: 0.875rem;
        line-height: 1.6;
        white-space: pre;
    }
}
</style>
