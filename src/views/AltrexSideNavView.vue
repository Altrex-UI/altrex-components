<template>
    <div class="side-nav-demo">
        <h1>Altrex Side Navigation Component Demo</h1>

        <section class="demo-section">
            <h2>Basic Navigation with Sections</h2>
            <p class="description">Dynamic navigation with collapsible sections, icons, and badges</p>

            <div class="demo-preview">
                <div class="demo-container">
                    <AltrexSideNav
                        :navigation-items="basicNavItems"
                        :logo="logoConfig"
                        width="280px"
                        :show-icons="true"
                        :collapsible="true"
                        :default-open="true"
                        position="static"
                        @item-click="handleItemClick"
                        @section-toggle="handleSectionToggle"
                    />
                    <div class="demo-content">
                        <p>This is a demo of the basic navigation. Click items to see events in console.</p>
                        <p>Features:</p>
                        <ul>
                            <li>Collapsible sections with icons</li>
                            <li>Badge support with variants</li>
                            <li>Keyboard navigation</li>
                            <li>Router integration</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section class="demo-section">
            <h2>Without Icons</h2>
            <p class="description">Simplified navigation without icons</p>

            <div class="demo-preview">
                <div class="demo-container">
                    <AltrexSideNav
                        :navigation-items="basicNavItems"
                        :logo="logoConfig"
                        width="250px"
                        :show-icons="false"
                        position="static"
                    />
                    <div class="demo-content">
                        <p>Navigation without icons for a cleaner, text-only look.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="demo-section">
            <h2>With Footer Slot</h2>
            <p class="description">Custom footer content using the footer slot</p>

            <div class="demo-preview">
                <div class="demo-container">
                    <AltrexSideNav
                        :navigation-items="basicNavItems"
                        :logo="logoConfig"
                        width="280px"
                        position="static"
                    >
                        <template #footer>
                            <div class="nav-footer-content">
                                <AltrexButton
                                    label="Sign Out"
                                    variant="ghost"
                                    size="s"
                                    left-icon="generic-logout"
                                    style="width: 100%"
                                />
                            </div>
                        </template>
                    </AltrexSideNav>
                    <div class="demo-content">
                        <p>Navigation with custom footer slot for actions like sign out.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="demo-section">
            <h2>Advanced Features</h2>
            <p class="description">Navigation with dividers, badges, and nested sections</p>

            <div class="demo-preview">
                <div class="demo-container">
                    <AltrexSideNav
                        :navigation-items="advancedNavItems"
                        :logo="logoConfig"
                        width="300px"
                        :show-icons="true"
                        :persist-state="false"
                        position="static"
                    />
                    <div class="demo-content">
                        <p>Advanced navigation features:</p>
                        <ul>
                            <li>Dividers for visual separation</li>
                            <li>Multiple badge variants (danger, success, warning)</li>
                            <li>Multiple collapsible sections</li>
                            <li>State persistence (disabled for demo)</li>
                        </ul>
                    </div>
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
                            <td><code>navigationItems</code></td>
                            <td>Array</td>
                            <td>[]</td>
                            <td>Array of navigation item objects</td>
                        </tr>
                        <tr>
                            <td><code>logo</code></td>
                            <td>Object</td>
                            <td>null</td>
                            <td>Logo configuration with light/dark paths</td>
                        </tr>
                        <tr>
                            <td><code>width</code></td>
                            <td>String</td>
                            <td>'250px'</td>
                            <td>Width of the sidebar</td>
                        </tr>
                        <tr>
                            <td><code>collapsible</code></td>
                            <td>Boolean</td>
                            <td>true</td>
                            <td>Whether sidebar can be collapsed</td>
                        </tr>
                        <tr>
                            <td><code>defaultOpen</code></td>
                            <td>Boolean</td>
                            <td>true</td>
                            <td>Default open state</td>
                        </tr>
                        <tr>
                            <td><code>showIcons</code></td>
                            <td>Boolean</td>
                            <td>true</td>
                            <td>Show icons in navigation items</td>
                        </tr>
                        <tr>
                            <td colspan="4" style="background-color: #f8f9fa; font-style: italic; padding: 0.75rem;">
                                <strong>Note:</strong> Theme is now controlled globally via the AltrexThemeToggle component. The side navigation automatically adapts to the current theme.
                            </td>
                        </tr>
                        <tr>
                            <td><code>persistState</code></td>
                            <td>Boolean</td>
                            <td>false</td>
                            <td>Persist state in localStorage</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section class="demo-section">
            <h2>Navigation Items with Badges</h2>
            <p class="description">Add badges to navigation items to display counts, status, or labels</p>

            <div class="demo-preview">
                <div class="demo-container">
                    <AltrexSideNav
                        :navigation-items="badgeNavItems"
                        :logo="logoConfig"
                        width="280px"
                        :show-icons="true"
                        position="static"
                    />
                    <div class="demo-content">
                        <p>Badges can display:</p>
                        <ul>
                            <li><strong>Text labels</strong> like "New", "Beta", "Pro"</li>
                            <li><strong>Numbers</strong> for notification counts</li>
                            <li><strong>Different variants</strong> for different meanings</li>
                        </ul>
                        <h4>Badge Variants</h4>
                        <ul>
                            <li><code>primary</code> - Default blue color</li>
                            <li><code>success</code> - Green for new features or success states</li>
                            <li><code>warning</code> - Orange for warnings or important notices</li>
                            <li><code>danger</code> - Red for alerts or critical notifications</li>
                            <li><code>neutral</code> - Gray for neutral information</li>
                        </ul>
                    </div>
                </div>
            </div>

            <pre class="code-block"><code>// Navigation item with badge
{
  label: 'Dashboard',
  icon: 'generic-home',
  badge: 3,                // Number badge
  badgeVariant: 'danger'   // Color variant
}

// Section with badge
{
  label: 'Components',
  section: true,
  icon: 'generic-puzzle',
  badge: 'New',            // Text badge
  badgeVariant: 'success',
  children: [...]
}</code></pre>
        </section>

        <section class="demo-section">
            <h2>Navigation Item Structure</h2>
            <pre class="code-block"><code>{{navItemExample}}</code></pre>
        </section>

        <section class="demo-section">
            <h2>Usage Example</h2>
            <pre class="code-block"><code>{{usageExample}}</code></pre>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import AltrexSideNav from '@/components/Navigation/AltrexSideNav.vue';
import AltrexButton from '@/components/Button/AltrexButton.vue';
import LightLogo from '@/assets/AltrexLogoLight.svg';
import DarkLogo from '@/assets/AltrexLogoDark.svg';

const logoConfig = {
    light: LightLogo,
    dark: DarkLogo,
    alt: 'Altrex UI',
    href: '/'
};

const basicNavItems = ref([
    {
        label: 'Home',
        icon: 'generic-home',
        onClick: () => console.log('Home clicked')
    },
    {
        label: 'Components',
        section: true,
        icon: 'generic-puzzle',
        defaultExpanded: true,
        children: [
            {
                label: 'Button',
                icon: 'generic-click',
                onClick: () => console.log('Button clicked')
            },
            {
                label: 'Card',
                icon: 'generic-card',
                onClick: () => console.log('Card clicked')
            },
            {
                label: 'Side Navigation',
                icon: 'generic-menu',
                badge: 'New',
                badgeVariant: 'success',
                onClick: () => console.log('Side Navigation clicked')
            }
        ]
    },
    {
        label: 'Settings',
        icon: 'generic-settings',
        onClick: () => console.log('Settings clicked')
    }
]);

const badgeNavItems = ref([
    {
        label: 'Dashboard',
        icon: 'generic-home',
        badge: 5,
        badgeVariant: 'danger',
        onClick: () => console.log('Dashboard clicked')
    },
    {
        label: 'Messages',
        icon: 'generic-mail',
        badge: 12,
        badgeVariant: 'primary',
        onClick: () => console.log('Messages clicked')
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
                label: 'Badge',
                icon: 'generic-tag',
                badge: 'New',
                badgeVariant: 'success',
                onClick: () => console.log('Badge clicked')
            },
            {
                label: 'Forms',
                icon: 'generic-edit',
                badge: 'Beta',
                badgeVariant: 'warning',
                onClick: () => console.log('Forms clicked')
            },
            {
                label: 'Tables',
                icon: 'generic-table',
                onClick: () => console.log('Tables clicked')
            }
        ]
    },
    {
        label: 'Settings',
        icon: 'generic-settings',
        badge: 1,
        badgeVariant: 'warning',
        onClick: () => console.log('Settings clicked')
    }
]);

const advancedNavItems = ref([
    {
        label: 'Dashboard',
        icon: 'generic-home',
        badge: 3,
        badgeVariant: 'danger',
        onClick: () => console.log('Dashboard clicked')
    },
    {
        divider: true
    },
    {
        label: 'UI Components',
        section: true,
        icon: 'generic-puzzle',
        badge: 3,
        badgeVariant: 'primary',
        defaultExpanded: true,
        children: [
            {
                label: 'Button',
                icon: 'generic-click',
                onClick: () => console.log('Button clicked')
            },
            {
                label: 'Card',
                icon: 'generic-card',
                onClick: () => console.log('Card clicked')
            },
            {
                label: 'Navigation',
                icon: 'generic-menu',
                badge: 'New',
                badgeVariant: 'success',
                onClick: () => console.log('Navigation clicked')
            }
        ]
    },
    {
        label: 'Advanced',
        section: true,
        icon: 'generic-settings',
        defaultExpanded: false,
        children: [
            {
                label: 'Configuration',
                icon: 'generic-settings',
                onClick: () => console.log('Configuration clicked')
            },
            {
                label: 'API Keys',
                icon: 'generic-key',
                badge: 1,
                badgeVariant: 'warning',
                onClick: () => console.log('API Keys clicked')
            }
        ]
    },
    {
        divider: true
    },
    {
        label: 'Help & Support',
        icon: 'generic-help',
        onClick: () => console.log('Help clicked')
    }
]);

const navItemExample = `{
  label: 'Home',              // Display text
  to: '/homepage',            // Router path
  icon: 'generic-home',       // Icon name
  badge: 'New',               // Badge text/number
  badgeVariant: 'success',    // Badge color variant
  disabled: false,            // Disabled state
  visible: true,              // Visibility
  section: false,             // Is section title
  children: [],               // Nested items
  defaultExpanded: false,     // Section expanded
  divider: false,             // Render as divider
  onClick: () => {}           // Custom click handler
}`;

const usageExample = `<template>
  <AltrexSideNav
    :navigation-items="navItems"
    :logo="logoConfig"
    width="280px"
    variant="dark"
    :show-icons="true"
    :collapsible="true"
    :persist-state="true"
    @item-click="handleItemClick"
  >
    <template #footer>
      <AltrexButton
        label="Sign Out"
        variant="ghost"
        size="s"
        left-icon="generic-logout"
      />
    </template>
  </AltrexSideNav>
</template>

<script setup>
import { ref } from 'vue';
import AltrexSideNav from '@/components/Navigation/AltrexSideNav.vue';

const logoConfig = {
  light: '/path/to/light-logo.svg',
  dark: '/path/to/dark-logo.svg',
  alt: 'Company Logo',
  href: '/'
};

const navItems = ref([
  { label: 'Home', to: '/', icon: 'home' },
  {
    label: 'Components',
    section: true,
    icon: 'puzzle',
    children: [
      { label: 'Button', to: '/button', icon: 'click' },
      { label: 'Card', to: '/card', icon: 'card' }
    ]
  }
]);

const handleItemClick = (item, event) => {
  console.log('Clicked:', item.label);
};
</scrpt>`;

const handleItemClick = (item) => {
    console.log('Navigation item clicked:', item.label);
};

const handleSectionToggle = (item, expanded) => {
    console.log(`Section "${item.label}" ${expanded ? 'expanded' : 'collapsed'}`);
};
</script>

<style lang="stylus" scoped>
.side-nav-demo {
    margin-left: 0;
    max-width: 1400px;
    padding: 2rem;
}

h1 {
    color: #2c3e50;
    font-size: 2.5rem;
    margin-bottom: 1rem;
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
    min-height: 500px;
    overflow: hidden;
    position: relative;
}

.demo-container {
    display: flex;
    min-height: 500px;
}

.demo-content {
    flex: 1;
    padding: 2rem;

    p {
        color: #2c3e50;
        line-height: 1.6;
        margin-bottom: 1rem;
    }

    ul {
        color: #2c3e50;
        line-height: 1.8;
        padding-left: 1.5rem;

        li {
            margin-bottom: 0.5rem;
        }
    }

    h4 {
        color: #2c3e50;
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
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

.nav-footer-content {
    padding: 0.5rem;
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
