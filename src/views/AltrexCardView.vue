<template>
    <div class="card-demo">
        <h1>Altrex Card Component Demo</h1>

        <section class="demo-section">
            <h2>Layouts</h2>
            <p class="description">Three layout options: vertical, horizontal-left, and horizontal-right</p>

            <div class="demo-group demo-group--vertical">
                <div class="demo-item">
                    <AltrexCard size="m" layout="vertical">
                        <template #thumbnail>
                            <AltrexImage
                                src="https://placehold.co/350x200/4A90E2/FFFFFF/png?text=Vertical"
                                alt="Vertical card"
                                aspect-ratio="16/9"
                                object-fit="cover"
                                loading="lazy"
                            />
                        </template>
                        <template #content>
                            <h4>Vertical Layout</h4>
                            <p>Image on top, content below</p>
                        </template>
                        <template #footer>
                            <AltrexButton label="Learn More" variant="ghost" size="s" />
                        </template>
                    </AltrexCard>
                    <span class="demo-label">Vertical - Default layout with stacked content (using AltrexImage)</span>
                </div>

                <div class="demo-item">
                    <AltrexCard size="m" layout="horizontal-left">
                        <template #thumbnail>
                            <img src="https://placehold.co/160x200/7B68EE/FFFFFF/png?text=H-Left" alt="Horizontal left card" />
                        </template>
                        <template #content>
                            <h4>Horizontal Left</h4>
                            <p>Image on left, content on right</p>
                        </template>
                        <template #footer>
                            <AltrexButton label="Learn More" variant="ghost" size="s" />
                        </template>
                    </AltrexCard>
                    <span class="demo-label">Horizontal Left - Image positioned on the left</span>
                </div>

                <div class="demo-item">
                    <AltrexCard size="m" layout="horizontal-right">
                        <template #thumbnail>
                            <img src="https://placehold.co/160x200/50C878/FFFFFF/png?text=H-Right" alt="Horizontal right card" />
                        </template>
                        <template #content>
                            <h4>Horizontal Right</h4>
                            <p>Content on left, image on right</p>
                        </template>
                        <template #footer>
                            <AltrexButton label="Learn More" variant="ghost" size="s" />
                        </template>
                    </AltrexCard>
                    <span class="demo-label">Horizontal Right - Image positioned on the right</span>
                </div>
            </div>
        </section>

        <section class="demo-section">
            <h2>Sizes</h2>
            <p class="description">Three size options: s (small), m (medium - default), l (large)</p>

            <div class="demo-group">
                <AltrexCard size="s">
                    <template #thumbnail>
                        <img src="https://placehold.co/280x150/FF6B6B/FFFFFF/png?text=Small" alt="Small card" />
                    </template>
                    <template #content>
                        <h4>Small Card</h4>
                        <p>Compact size for tight spaces</p>
                    </template>
                    <template #footer>
                        <AltrexButton label="View" variant="fill" size="xs" />
                    </template>
                </AltrexCard>

                <AltrexCard size="m">
                    <template #thumbnail>
                        <img src="https://placehold.co/350x200/4ECDC4/FFFFFF/png?text=Medium" alt="Medium card" />
                    </template>
                    <template #content>
                        <h4>Medium Card</h4>
                        <p>Standard size for most use cases</p>
                    </template>
                    <template #footer>
                        <AltrexButton label="View" variant="fill" size="s" />
                    </template>
                </AltrexCard>

                <AltrexCard size="l">
                    <template #thumbnail>
                        <img src="https://placehold.co/500x280/95E1D3/FFFFFF/png?text=Large" alt="Large card" />
                    </template>
                    <template #content>
                        <h4>Large Card</h4>
                        <p>Spacious layout for featured content</p>
                    </template>
                    <template #footer>
                        <AltrexButton label="View" variant="fill" size="m" />
                    </template>
                </AltrexCard>
            </div>
        </section>

        <section class="demo-section">
            <h2>Content Variations</h2>
            <p class="description">Cards with different content combinations</p>

            <div class="demo-group">
                <AltrexCard size="m">
                    <template #thumbnail>
                        <img src="https://placehold.co/350x200/F38181/FFFFFF/png?text=Full" alt="Full card" />
                    </template>
                    <template #content>
                        <h4>Full Card</h4>
                        <p>Has image, content, and footer</p>
                    </template>
                    <template #footer>
                        <AltrexButton label="Action" variant="ghost" size="s" />
                    </template>
                </AltrexCard>

                <AltrexCard size="m">
                    <template #content>
                        <h4>Content Only</h4>
                        <p>No image or footer, just content area</p>
                    </template>
                </AltrexCard>

                <AltrexCard size="m">
                    <template #thumbnail>
                        <img src="https://placehold.co/350x200/AA96DA/FFFFFF/png?text=No+Footer" alt="Card without footer" />
                    </template>
                    <template #content>
                        <h4>No Footer</h4>
                        <p>Card with image and content, but no footer actions</p>
                    </template>
                </AltrexCard>

                <AltrexCard size="m">
                    <template #content>
                        <h4>Content with Footer</h4>
                        <p>No image, but has footer actions</p>
                    </template>
                    <template #footer>
                        <AltrexButton label="Action" variant="fill" size="s" />
                    </template>
                </AltrexCard>
            </div>
        </section>

        <section class="demo-section">
            <h2>Border Radius</h2>
            <p class="description">Toggle border radius on/off</p>

            <div class="demo-group">
                <div class="demo-item">
                    <AltrexCard size="m" :border-radius="true">
                        <template #thumbnail>
                            <img src="https://placehold.co/350x200/FFB6B9/FFFFFF/png?text=Rounded" alt="Rounded card" />
                        </template>
                        <template #content>
                            <h4>With Border Radius</h4>
                            <p>Default rounded corners</p>
                        </template>
                    </AltrexCard>
                    <span class="demo-label">border-radius: true (default)</span>
                </div>

                <div class="demo-item">
                    <AltrexCard size="m" :border-radius="false">
                        <template #thumbnail>
                            <img src="https://placehold.co/350x200/BAE1FF/FFFFFF/png?text=Square" alt="Square card" />
                        </template>
                        <template #content>
                            <h4>No Border Radius</h4>
                            <p>Sharp, square corners</p>
                        </template>
                    </AltrexCard>
                    <span class="demo-label">border-radius: false</span>
                </div>
            </div>
        </section>

        <section class="demo-section">
            <h2>Horizontal Layouts - All Sizes</h2>
            <p class="description">Horizontal cards in different sizes</p>

            <h3 class="subsection-title">Horizontal Left</h3>
            <div class="demo-group demo-group--column">
                <AltrexCard size="s" layout="horizontal-left">
                    <template #thumbnail>
                        <img src="https://placehold.co/120x150/E8A87C/FFFFFF/png?text=S" alt="Small horizontal left" />
                    </template>
                    <template #content>
                        <h4>Small Horizontal Left</h4>
                        <p>Compact horizontal layout</p>
                    </template>
                    <template #footer>
                        <AltrexButton label="More" variant="flat" size="xs" />
                    </template>
                </AltrexCard>

                <AltrexCard size="m" layout="horizontal-left">
                    <template #thumbnail>
                        <img src="https://placehold.co/160x180/C38D9E/FFFFFF/png?text=M" alt="Medium horizontal left" />
                    </template>
                    <template #content>
                        <h4>Medium Horizontal Left</h4>
                        <p>Standard horizontal layout for lists</p>
                    </template>
                    <template #footer>
                        <AltrexButton label="More" variant="flat" size="s" />
                    </template>
                </AltrexCard>

                <AltrexCard size="l" layout="horizontal-left">
                    <template #thumbnail>
                        <img src="https://placehold.co/220x200/85CDCA/FFFFFF/png?text=L" alt="Large horizontal left" />
                    </template>
                    <template #content>
                        <h4>Large Horizontal Left</h4>
                        <p>Spacious horizontal layout for featured items</p>
                    </template>
                    <template #footer>
                        <AltrexButton label="More" variant="flat" size="m" />
                    </template>
                </AltrexCard>
            </div>

            <h3 class="subsection-title">Horizontal Right</h3>
            <div class="demo-group demo-group--column">
                <AltrexCard size="s" layout="horizontal-right">
                    <template #thumbnail>
                        <img src="https://placehold.co/120x150/FFD6BA/333333/png?text=S" alt="Small horizontal right" />
                    </template>
                    <template #content>
                        <h4>Small Horizontal Right</h4>
                        <p>Image on the right side</p>
                    </template>
                    <template #footer>
                        <AltrexButton label="More" variant="flat" size="xs" />
                    </template>
                </AltrexCard>

                <AltrexCard size="m" layout="horizontal-right">
                    <template #thumbnail>
                        <img src="https://placehold.co/160x180/A8E6CF/333333/png?text=M" alt="Medium horizontal right" />
                    </template>
                    <template #content>
                        <h4>Medium Horizontal Right</h4>
                        <p>Reversed layout for visual variety</p>
                    </template>
                    <template #footer>
                        <AltrexButton label="More" variant="flat" size="s" />
                    </template>
                </AltrexCard>

                <AltrexCard size="l" layout="horizontal-right">
                    <template #thumbnail>
                        <img src="https://placehold.co/220x200/DCEDC1/333333/png?text=L" alt="Large horizontal right" />
                    </template>
                    <template #content>
                        <h4>Large Horizontal Right</h4>
                        <p>Large card with content-first layout</p>
                    </template>
                    <template #footer>
                        <AltrexButton label="More" variant="flat" size="m" />
                    </template>
                </AltrexCard>
            </div>
        </section>

        <section class="demo-section">
            <h2>Multiple Footer Actions</h2>
            <p class="description">Cards can have multiple buttons in the footer</p>

            <div class="demo-group">
                <AltrexCard size="m">
                    <template #thumbnail>
                        <img src="https://placehold.co/350x200/FFA07A/FFFFFF/png?text=Actions" alt="Multiple actions" />
                    </template>
                    <template #content>
                        <h4>Product Card</h4>
                        <p>Card with multiple action buttons</p>
                    </template>
                    <template #footer>
                        <div class="footer-actions">
                            <AltrexButton label="Details" variant="ghost" size="s" />
                            <AltrexButton label="Add to Cart" variant="fill" size="s" left-icon="generic-basket" />
                        </div>
                    </template>
                </AltrexCard>

                <AltrexCard size="m">
                    <template #content>
                        <h4>Article Card</h4>
                        <p>Simple card with social actions</p>
                    </template>
                    <template #footer>
                        <div class="footer-actions">
                            <AltrexButton label="Share" variant="flat" size="s" />
                            <AltrexButton label="Save" variant="flat" size="s" />
                            <AltrexButton label="Read More" variant="fill" size="s" />
                        </div>
                    </template>
                </AltrexCard>
            </div>
        </section>

        <section class="demo-section">
            <h2>Real-World Examples</h2>
            <p class="description">Common card patterns used in applications</p>

            <div class="demo-group">
                <AltrexCard size="m">
                    <template #thumbnail>
                        <img src="https://placehold.co/350x200/87CEEB/FFFFFF/png?text=Product" alt="Product" />
                    </template>
                    <template #content>
                        <h4>Premium Headphones</h4>
                        <p>High-quality wireless headphones with noise cancellation</p>
                        <p style="font-weight: 600; font-size: 1.25rem; margin-top: 0.5rem;">$299.99</p>
                    </template>
                    <template #footer>
                        <AltrexButton label="Add to Cart" variant="fill" size="s" left-icon="generic-basket" />
                    </template>
                </AltrexCard>

                <AltrexCard size="m" layout="horizontal-left">
                    <template #thumbnail>
                        <img src="https://placehold.co/160x180/98D8C8/FFFFFF/png?text=Blog" alt="Blog post" />
                    </template>
                    <template #content>
                        <h4>Getting Started with Vue 3</h4>
                        <p>Learn the basics of Vue 3 composition API and how to build modern web applications.</p>
                        <p style="font-size: 0.875rem; color: #666; margin-top: 0.5rem;">Posted 2 days ago</p>
                    </template>
                    <template #footer>
                        <AltrexButton label="Read Article" variant="ghost" size="s" />
                    </template>
                </AltrexCard>

                <AltrexCard size="l">
                    <template #thumbnail>
                        <img src="https://placehold.co/500x280/F6A5C0/FFFFFF/png?text=Featured" alt="Featured content" />
                    </template>
                    <template #content>
                        <h4>Summer Collection 2026</h4>
                        <p>Discover our latest summer collection featuring vibrant colors and comfortable designs perfect for the season.</p>
                    </template>
                    <template #footer>
                        <div class="footer-actions">
                            <AltrexButton label="Shop Now" variant="fill" size="m" />
                            <AltrexButton label="Learn More" variant="ghost" size="m" />
                        </div>
                    </template>
                </AltrexCard>
            </div>
        </section>

        <section class="demo-section">
            <h2>Cards with Badges</h2>
            <p class="description">Badges can be positioned in 8 different locations on cards</p>

            <h3 class="subsection-title">Thumbnail Badge Positions</h3>
            <div class="demo-group">
                <AltrexCard
                    size="m"
                    badge="New"
                    badgeVariant="success"
                    badgePosition="thumbnail-top-left"
                >
                    <template #thumbnail>
                        <img src="https://placehold.co/350x200/4ECDC4/FFFFFF/png?text=Top+Left" alt="Top left badge" />
                    </template>
                    <template #content>
                        <h4>Top-Left Badge</h4>
                        <p>Badge in thumbnail area, top-left corner</p>
                    </template>
                </AltrexCard>

                <AltrexCard
                    size="m"
                    badge="Sale"
                    badgeVariant="warning"
                    badgePosition="thumbnail-top-right"
                >
                    <template #thumbnail>
                        <img src="https://placehold.co/350x200/F38181/FFFFFF/png?text=Top+Right" alt="Top right badge" />
                    </template>
                    <template #content>
                        <h4>Top-Right Badge</h4>
                        <p>Badge in thumbnail area, top-right corner</p>
                    </template>
                </AltrexCard>

                <AltrexCard
                    size="m"
                    :badge="3"
                    badgeVariant="danger"
                    badgePosition="thumbnail-bottom-left"
                >
                    <template #thumbnail>
                        <img src="https://placehold.co/350x200/AA96DA/FFFFFF/png?text=Bottom+Left" alt="Bottom left badge" />
                    </template>
                    <template #content>
                        <h4>Bottom-Left Badge</h4>
                        <p>Badge in thumbnail area, bottom-left corner</p>
                    </template>
                </AltrexCard>

                <AltrexCard
                    size="m"
                    badge="Featured"
                    badgeVariant="primary"
                    badgePosition="thumbnail-bottom-right"
                >
                    <template #thumbnail>
                        <img src="https://placehold.co/350x200/95E1D3/FFFFFF/png?text=Bottom+Right" alt="Bottom right badge" />
                    </template>
                    <template #content>
                        <h4>Bottom-Right Badge</h4>
                        <p>Badge in thumbnail area, bottom-right corner</p>
                    </template>
                </AltrexCard>
            </div>

            <h3 class="subsection-title">Content Badge Positions</h3>
            <div class="demo-group">
                <AltrexCard
                    size="m"
                    badge="Hot"
                    badgeVariant="danger"
                    badgePosition="content-top-left"
                >
                    <template #thumbnail>
                        <img src="https://placehold.co/350x200/FFD6BA/333333/png?text=Content" alt="Content badge" />
                    </template>
                    <template #content>
                        <h4>Content Top-Left</h4>
                        <p>Badge positioned in content area, top-left corner</p>
                    </template>
                </AltrexCard>

                <AltrexCard
                    size="m"
                    :badge="5"
                    badgeVariant="success"
                    badgePosition="content-top-right"
                >
                    <template #thumbnail>
                        <img src="https://placehold.co/350x200/A8E6CF/333333/png?text=Content" alt="Content badge" />
                    </template>
                    <template #content>
                        <h4>Content Top-Right</h4>
                        <p>Badge positioned in content area, top-right corner</p>
                    </template>
                </AltrexCard>

                <AltrexCard
                    size="m"
                    badge="Limited"
                    badgeVariant="warning"
                    badgePosition="content-bottom-left"
                >
                    <template #thumbnail>
                        <img src="https://placehold.co/350x200/DCEDC1/333333/png?text=Content" alt="Content badge" />
                    </template>
                    <template #content>
                        <h4>Content Bottom-Left</h4>
                        <p>Badge positioned in content area, bottom-left corner</p>
                    </template>
                </AltrexCard>

                <AltrexCard
                    size="m"
                    badge="Pro"
                    badgeVariant="primary"
                    badgePosition="content-bottom-right"
                >
                    <template #thumbnail>
                        <img src="https://placehold.co/350x200/FFA07A/FFFFFF/png?text=Content" alt="Content badge" />
                    </template>
                    <template #content>
                        <h4>Content Bottom-Right</h4>
                        <p>Badge positioned in content area, bottom-right corner</p>
                    </template>
                </AltrexCard>
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
                            <td><code>element</code></td>
                            <td>String</td>
                            <td>'li'</td>
                            <td>HTML element to render as</td>
                        </tr>
                        <tr>
                            <td><code>size</code></td>
                            <td>String</td>
                            <td>'m'</td>
                            <td>Card size: 's', 'm', 'l'</td>
                        </tr>
                        <tr>
                            <td><code>layout</code></td>
                            <td>String</td>
                            <td>'vertical'</td>
                            <td>Layout: 'vertical', 'horizontal-left', 'horizontal-right'</td>
                        </tr>
                        <tr>
                            <td><code>borderRadius</code></td>
                            <td>Boolean</td>
                            <td>true</td>
                            <td>Enable rounded corners</td>
                        </tr>
                        <tr>
                            <td><code>badge</code></td>
                            <td>String, Number</td>
                            <td>null</td>
                            <td>Badge content (text or number)</td>
                        </tr>
                        <tr>
                            <td><code>badgeVariant</code></td>
                            <td>String</td>
                            <td>'primary'</td>
                            <td>Badge color: 'primary', 'success', 'warning', 'danger', 'neutral'</td>
                        </tr>
                        <tr>
                            <td><code>badgeSize</code></td>
                            <td>String</td>
                            <td>'small'</td>
                            <td>Badge size: 'small', 'medium', 'large'</td>
                        </tr>
                        <tr>
                            <td><code>badgePosition</code></td>
                            <td>String</td>
                            <td>'thumbnail-top-right'</td>
                            <td>Badge position: 'thumbnail-[top|bottom]-[left|right]' or 'content-[top|bottom]-[left|right]'</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section class="demo-section">
            <h2>Usage Example</h2>
            <pre class="code-block"><code>&lt;template&gt;
  &lt;AltrexCard
    element="div"
    size="m"
    layout="vertical"
    badge="New"
    badgeVariant="success"
    badgePosition="thumbnail-top-right"
  &gt;
    &lt;template #thumbnail&gt;
      &lt;AltrexImage
        src="..."
        alt="Card image"
        aspect-ratio="16/9"
        object-fit="cover"
      /&gt;
    &lt;/template&gt;
    &lt;template #content&gt;
      &lt;h4&gt;Card Title&lt;/h4&gt;
      &lt;p&gt;Card description goes here...&lt;/p&gt;
    &lt;/template&gt;
    &lt;template #footer&gt;
      &lt;AltrexButton label="Action" variant="fill" size="s" /&gt;
    &lt;/template&gt;
  &lt;/AltrexCard&gt;
&lt;/template&gt;

&lt;script setup&gt;
import AltrexCard from '@/components/Card/AltrexCard.vue';
import AltrexButton from '@/components/Button/AltrexButton.vue';
import AltrexImage from '@/components/Image/AltrexImage.vue';
&lt;/script&gt;</code></pre>
        </section>
    </div>
</template>

<script>
import AltrexCard from '@/components/Card/AltrexCard.vue';
import AltrexButton from '@/components/Button/AltrexButton.vue';
import AltrexImage from '@/components/Image/AltrexImage.vue';

export default {
    name: 'AltrexCardView',
    components: {
        AltrexCard,
        AltrexImage,
        AltrexButton,
    },
};
</script>

<style scoped>
.card-demo {
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
}

h1 {
    margin-bottom: 2rem;
    color: #212529;
}

.demo-section {
    margin-bottom: 4rem;
}

.demo-section h2 {
    margin-bottom: 0.5rem;
    color: #343a40;
}

.subsection-title {
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #495057;
    font-size: 1.25rem;
}

.description {
    margin-bottom: 1.5rem;
    color: #868e96;
    font-size: 0.875rem;
}

.demo-group {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: flex-start;
}

.demo-group--vertical {
    flex-direction: row;
}

.demo-group--column {
    flex-direction: column;
    align-items: stretch;
}

.demo-item {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
}

.demo-label {
    font-size: 0.75rem;
    color: #868e96;
    max-width: 350px;
}

.footer-actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

h4 {
    margin: 0 0 0.5rem 0;
    color: #212529;
}

.demo-group p {
    margin: 0;
    color: #495057;
    font-size: 0.875rem;
    line-height: 1.5;
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
