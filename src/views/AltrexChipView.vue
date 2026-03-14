<template>
  <div class="chip-demo">
    <h1>Altrex Chip Component</h1>
    <p class="intro">Interactive chips/tags for filters, selections, categories, and multi-select displays. Unlike badges, chips are interactive elements that can be clicked, selected, or dismissed.</p>

    <section class="demo-section">
      <h2>Basic Variants</h2>
      <p class="description">Six color variants for different contexts</p>

      <div class="demo-preview">
        <div class="chip-group">
          <AltrexChip label="Default" variant="default" />
          <AltrexChip label="Primary" variant="primary" />
          <AltrexChip label="Success" variant="success" />
          <AltrexChip label="Warning" variant="warning" />
          <AltrexChip label="Danger" variant="danger" />
          <AltrexChip label="Info" variant="info" />
        </div>
      </div>

      <pre class="code-block"><code>&lt;AltrexChip label="Default" variant="default" /&gt;
&lt;AltrexChip label="Primary" variant="primary" /&gt;
&lt;AltrexChip label="Success" variant="success" /&gt;
&lt;AltrexChip label="Warning" variant="warning" /&gt;
&lt;AltrexChip label="Danger" variant="danger" /&gt;
&lt;AltrexChip label="Info" variant="info" /&gt;</code></pre>
    </section>

    <section class="demo-section">
      <h2>Sizes</h2>
      <p class="description">Three size options for different contexts. All sizes maintain touch-friendly targets on mobile (44px minimum).</p>

      <div class="demo-preview">
        <div class="chip-group">
          <AltrexChip label="Small" variant="primary" size="s" />
          <AltrexChip label="Medium" variant="primary" size="m" />
          <AltrexChip label="Large" variant="primary" size="l" />
        </div>
      </div>

      <pre class="code-block"><code>&lt;AltrexChip label="Small" variant="primary" size="s" /&gt;
&lt;AltrexChip label="Medium" variant="primary" size="m" /&gt;
&lt;AltrexChip label="Large" variant="primary" size="l" /&gt;</code></pre>
    </section>

    <section class="demo-section">
      <h2>Dismissible Chips</h2>
      <p class="description">Chips with close buttons for removable tags and selections</p>

      <div class="demo-preview">
        <div class="chip-group">
          <AltrexChip
            v-for="(tag, index) in dismissibleTags"
            :key="tag"
            :label="tag"
            variant="primary"
            dismissible
            @close="removeDismissibleTag(index)"
          />
        </div>
        <AltrexButton
          v-if="dismissibleTags.length === 0"
          label="Reset Tags"
          size="s"
          variant="ghost"
          @click="resetDismissibleTags"
        />
      </div>

      <pre class="code-block"><code>&lt;AltrexChip
  label="JavaScript"
  variant="primary"
  dismissible
  @close="handleRemove"
/&gt;</code></pre>
    </section>

    <section class="demo-section">
      <h2>Clickable Chips</h2>
      <p class="description">Interactive chips that respond to clicks. Click counter: {{ clickCount }}</p>

      <div class="demo-preview">
        <div class="chip-group">
          <AltrexChip
            label="Click me"
            variant="primary"
            clickable
            @click="incrementClickCount"
          />
          <AltrexChip
            label="Or me"
            variant="success"
            clickable
            @click="incrementClickCount"
          />
          <AltrexChip
            label="Or me!"
            variant="info"
            clickable
            @click="incrementClickCount"
          />
        </div>
      </div>

      <pre class="code-block"><code>&lt;AltrexChip
  label="Click me"
  variant="primary"
  clickable
  @click="handleClick"
/&gt;</code></pre>
    </section>

    <section class="demo-section">
      <h2>Selected State (Filter Chips)</h2>
      <p class="description">Toggle chips for filters and active selections</p>

      <div class="demo-preview">
        <div class="chip-group">
          <AltrexChip
            v-for="filter in filters"
            :key="filter.id"
            :label="filter.label"
            :variant="filter.variant"
            :selected="filter.selected"
            clickable
            @click="toggleFilter(filter.id)"
          />
        </div>
      </div>

      <pre class="code-block"><code>&lt;AltrexChip
  label="JavaScript"
  variant="primary"
  :selected="isSelected"
  clickable
  @click="toggleSelection"
/&gt;</code></pre>
    </section>

    <section class="demo-section">
      <h2>Chips with Icons</h2>
      <p class="description">Add visual context with leading icons</p>

      <div class="demo-preview">
        <div class="chip-group">
          <AltrexChip label="Home" icon="generic-home" variant="primary" />
          <AltrexChip label="Search" icon="generic-search" variant="info" />
          <AltrexChip label="Settings" icon="generic-settings" variant="default" />
          <AltrexChip label="User" icon="generic-user" variant="success" />
          <AltrexChip label="Star" icon="generic-star" variant="warning" />
        </div>
      </div>

      <pre class="code-block"><code>&lt;AltrexChip label="Home" icon="generic-home" variant="primary" /&gt;
&lt;AltrexChip label="Search" icon="generic-search" variant="info" /&gt;
&lt;AltrexChip label="Settings" icon="generic-settings" variant="default" /&gt;</code></pre>
    </section>

    <section class="demo-section">
      <h2>Icons + Dismissible</h2>
      <p class="description">Combine icons with close buttons</p>

      <div class="demo-preview">
        <div class="chip-group">
          <AltrexChip
            v-for="(item, index) in iconDismissibleTags"
            :key="item.label"
            :label="item.label"
            :icon="item.icon"
            :variant="item.variant"
            dismissible
            @close="removeIconDismissibleTag(index)"
          />
        </div>
        <AltrexButton
          v-if="iconDismissibleTags.length === 0"
          label="Reset"
          size="s"
          variant="ghost"
          @click="resetIconDismissibleTags"
        />
      </div>

      <pre class="code-block"><code>&lt;AltrexChip
  label="JavaScript"
  icon="generic-code"
  variant="primary"
  dismissible
  @close="handleRemove"
/&gt;</code></pre>
    </section>

    <section class="demo-section">
      <h2>Disabled State</h2>
      <p class="description">Disabled chips are non-interactive</p>

      <div class="demo-preview">
        <div class="chip-group">
          <AltrexChip label="Disabled" variant="default" disabled />
          <AltrexChip label="Disabled Primary" variant="primary" disabled />
          <AltrexChip label="Disabled Clickable" variant="success" clickable disabled />
          <AltrexChip label="Disabled Dismissible" variant="warning" dismissible disabled />
        </div>
      </div>

      <pre class="code-block"><code>&lt;AltrexChip label="Disabled" variant="primary" disabled /&gt;
&lt;AltrexChip label="Disabled Clickable" variant="success" clickable disabled /&gt;</code></pre>
    </section>

    <section class="demo-section">
      <h2>Interactive Filter Example</h2>
      <p class="description">Real-world example: Filter items by category. Click chips to toggle filters.</p>

      <div class="demo-preview">
        <div class="filter-demo">
          <div class="filter-chips">
            <AltrexChip
              v-for="category in categories"
              :key="category.id"
              :label="`${category.label} (${category.count})`"
              :variant="category.variant"
              :selected="category.selected"
              clickable
              @click="toggleCategory(category.id)"
            />
          </div>

          <div class="filtered-results">
            <p class="results-count">{{ filteredItems.length }} items found</p>
            <div class="item-list">
              <div v-for="item in filteredItems" :key="item.id" class="item">
                <AltrexChip
                  :label="item.category"
                  :variant="getCategoryVariant(item.category)"
                  size="s"
                />
                <span class="item-name">{{ item.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Tag Input Example</h2>
      <p class="description">Real-world example: Multi-select tag input with dismissible chips</p>

      <div class="demo-preview">
        <div class="tag-input-demo">
          <div class="tag-input-container">
            <div class="tag-input-chips">
              <AltrexChip
                v-for="(tag, index) in selectedTags"
                :key="tag"
                :label="tag"
                variant="primary"
                size="s"
                dismissible
                @close="removeTag(index)"
              />
            </div>
            <input
              v-model="newTag"
              type="text"
              placeholder="Type and press Enter to add tag..."
              class="tag-input"
              @keydown.enter.prevent="addTag"
            />
          </div>
          <div class="available-tags">
            <p class="available-tags-label">Quick add:</p>
            <AltrexChip
              v-for="tag in availableTags"
              :key="tag"
              :label="tag"
              variant="default"
              size="s"
              clickable
              @click="addQuickTag(tag)"
            />
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
              <td><code>label</code></td>
              <td>String</td>
              <td>null</td>
              <td>Chip text content</td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td>String</td>
              <td>'default'</td>
              <td>Color variant: 'default', 'primary', 'success', 'warning', 'danger', 'info'</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>String</td>
              <td>'m'</td>
              <td>Size: 's', 'm', 'l'</td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td>String</td>
              <td>null</td>
              <td>Leading icon name (e.g., 'generic-home')</td>
            </tr>
            <tr>
              <td><code>dismissible</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Show close button</td>
            </tr>
            <tr>
              <td><code>clickable</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Enable click interaction</td>
            </tr>
            <tr>
              <td><code>selected</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Show selected state (for filters)</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>Disable all interactions</td>
            </tr>
            <tr>
              <td><code>closeAriaLabel</code></td>
              <td>String</td>
              <td>'Remove'</td>
              <td>Aria label for close button</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

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
              <td><code>@click</code></td>
              <td>MouseEvent</td>
              <td>Emitted when chip is clicked (only if <code>clickable</code> is true)</td>
            </tr>
            <tr>
              <td><code>@close</code></td>
              <td>MouseEvent</td>
              <td>Emitted when close button is clicked (only if <code>dismissible</code> is true)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="demo-section">
      <h2>Accessibility</h2>
      <ul class="feature-list">
        <li>✅ <strong>Touch targets:</strong> Minimum 44×44px on mobile (WCAG AAA)</li>
        <li>✅ <strong>Keyboard navigation:</strong> Clickable chips respond to Enter and Space</li>
        <li>✅ <strong>Focus indicators:</strong> Visible outline on focus</li>
        <li>✅ <strong>ARIA labels:</strong> Proper roles and labels for close buttons</li>
        <li>✅ <strong>Disabled state:</strong> Properly communicated to assistive tech</li>
        <li>✅ <strong>Color contrast:</strong> WCAG AA compliant in all variants</li>
      </ul>
    </section>

    <section class="demo-section">
      <h2>Mobile-First Responsive Behavior</h2>
      <ul class="feature-list">
        <li><strong>Mobile (&lt; 768px):</strong> 44px minimum height, 16px font size (prevents iOS zoom)</li>
        <li><strong>Desktop (≥ 768px):</strong> 32px height, 14px font size (more compact)</li>
        <li><strong>Close button:</strong> 44×44px touch area on mobile, 20×20px on desktop</li>
        <li><strong>Touch feedback:</strong> Scale down effect on active state (touch devices only)</li>
      </ul>
    </section>
  </div>
</template>

<script>
import AltrexChip from '@/components/Chip/AltrexChip.vue';
import AltrexButton from '@/components/Button/AltrexButton.vue';

export default {
  name: 'AltrexChipView',
  components: {
    AltrexChip,
    AltrexButton,
  },
  data() {
    return {
      // Dismissible tags demo
      dismissibleTags: ['JavaScript', 'Vue.js', 'React', 'Angular', 'Svelte'],

      // Click counter
      clickCount: 0,

      // Filter chips demo
      filters: [
        { id: 1, label: 'JavaScript', variant: 'primary', selected: false },
        { id: 2, label: 'TypeScript', variant: 'info', selected: false },
        { id: 3, label: 'Python', variant: 'success', selected: false },
        { id: 4, label: 'Rust', variant: 'warning', selected: false },
        { id: 5, label: 'Go', variant: 'danger', selected: false },
      ],

      // Icon + dismissible demo
      iconDismissibleTags: [
        { label: 'Home', icon: 'generic-home', variant: 'primary' },
        { label: 'Search', icon: 'generic-search', variant: 'info' },
        { label: 'Settings', icon: 'generic-settings', variant: 'default' },
      ],

      // Category filter demo
      categories: [
        { id: 'frontend', label: 'Frontend', variant: 'primary', selected: false, count: 5 },
        { id: 'backend', label: 'Backend', variant: 'success', selected: false, count: 4 },
        { id: 'mobile', label: 'Mobile', variant: 'info', selected: false, count: 3 },
        { id: 'devops', label: 'DevOps', variant: 'warning', selected: false, count: 2 },
      ],
      allItems: [
        { id: 1, name: 'React', category: 'Frontend' },
        { id: 2, name: 'Vue.js', category: 'Frontend' },
        { id: 3, name: 'Angular', category: 'Frontend' },
        { id: 4, name: 'Svelte', category: 'Frontend' },
        { id: 5, name: 'Next.js', category: 'Frontend' },
        { id: 6, name: 'Node.js', category: 'Backend' },
        { id: 7, name: 'Django', category: 'Backend' },
        { id: 8, name: 'Express', category: 'Backend' },
        { id: 9, name: 'FastAPI', category: 'Backend' },
        { id: 10, name: 'React Native', category: 'Mobile' },
        { id: 11, name: 'Flutter', category: 'Mobile' },
        { id: 12, name: 'Swift', category: 'Mobile' },
        { id: 13, name: 'Docker', category: 'DevOps' },
        { id: 14, name: 'Kubernetes', category: 'DevOps' },
      ],

      // Tag input demo
      selectedTags: ['Vue', 'JavaScript', 'CSS'],
      newTag: '',
      availableTags: ['HTML', 'TypeScript', 'Node.js', 'Python', 'React', 'Angular'],
    };
  },
  computed: {
    filteredItems() {
      const selectedCategories = this.categories
        .filter(cat => cat.selected)
        .map(cat => cat.label);

      if (selectedCategories.length === 0) {
        return this.allItems;
      }

      return this.allItems.filter(item =>
        selectedCategories.includes(item.category)
      );
    },
  },
  methods: {
    // Dismissible tags
    removeDismissibleTag(index) {
      this.dismissibleTags.splice(index, 1);
    },
    resetDismissibleTags() {
      this.dismissibleTags = ['JavaScript', 'Vue.js', 'React', 'Angular', 'Svelte'];
    },

    // Click counter
    incrementClickCount() {
      this.clickCount++;
    },

    // Filters
    toggleFilter(id) {
      const filter = this.filters.find(f => f.id === id);
      if (filter) {
        filter.selected = !filter.selected;
      }
    },

    // Icon + dismissible
    removeIconDismissibleTag(index) {
      this.iconDismissibleTags.splice(index, 1);
    },
    resetIconDismissibleTags() {
      this.iconDismissibleTags = [
        { label: 'Home', icon: 'generic-home', variant: 'primary' },
        { label: 'Search', icon: 'generic-search', variant: 'info' },
        { label: 'Settings', icon: 'generic-settings', variant: 'default' },
      ];
    },

    // Category filter
    toggleCategory(id) {
      const category = this.categories.find(c => c.id === id);
      if (category) {
        category.selected = !category.selected;
      }
    },
    getCategoryVariant(categoryName) {
      const category = this.categories.find(c => c.label === categoryName);
      return category ? category.variant : 'default';
    },

    // Tag input
    addTag() {
      const tag = this.newTag.trim();
      if (tag && !this.selectedTags.includes(tag)) {
        this.selectedTags.push(tag);
        this.newTag = '';
      }
    },
    removeTag(index) {
      this.selectedTags.splice(index, 1);
    },
    addQuickTag(tag) {
      if (!this.selectedTags.includes(tag)) {
        this.selectedTags.push(tag);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.chip-demo {
  container-width($altrex-breakpoints-xl);
  padding-top: $altrex-spacing-8;
  padding-bottom: $altrex-spacing-8;
}

h1 {
  font-size: $altrex-fluidTypography-h1;
  font-weight: $altrex-fontWeight-bold;
  margin-bottom: $altrex-spacing-4;
  color: $altrex-colors-neutral-900;

  [data-theme="dark"] & {
    color: $altrex-colors-dark-text-primary;
  }
}

.intro {
  font-size: $altrex-fontSize-lg;
  color: $altrex-colors-neutral-700;
  margin-bottom: $altrex-spacing-8;
  max-width: 800px;

  [data-theme="dark"] & {
    color: $altrex-colors-dark-text-secondary;
  }
}

.demo-section {
  margin-bottom: $altrex-spacing-10;
}

h2 {
  font-size: $altrex-fluidTypography-h2;
  font-weight: $altrex-fontWeight-semibold;
  margin-bottom: $altrex-spacing-3;
  color: $altrex-colors-neutral-900;

  [data-theme="dark"] & {
    color: $altrex-colors-dark-text-primary;
  }
}

.description {
  color: $altrex-colors-neutral-600;
  margin-bottom: $altrex-spacing-4;

  [data-theme="dark"] & {
    color: $altrex-colors-dark-text-secondary;
  }
}

.demo-preview {
  background: $altrex-colors-neutral-50;
  border: 1px solid $altrex-colors-neutral-200;
  border-radius: $altrex-borderRadius-default;
  padding: $altrex-spacing-6;
  margin-bottom: $altrex-spacing-4;

  [data-theme="dark"] & {
    background: $altrex-colors-dark-bg-elevated;
    border-color: $altrex-colors-dark-border-default;
  }
}

.chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: $altrex-spacing-3;
  align-items: center;
}

.code-block {
  background: $altrex-colors-neutral-900;
  color: $altrex-colors-neutral-100;
  padding: $altrex-spacing-4;
  border-radius: $altrex-borderRadius-default;
  overflow-x: auto;
  margin-bottom: $altrex-spacing-4;

  [data-theme="dark"] & {
    background: $altrex-colors-neutral-950;
  }

  code {
    font-family: 'Monaco', 'Courier New', monospace;
    font-size: $altrex-fontSize-sm;
    line-height: 1.5;
  }
}

// Filter demo
.filter-demo {
  display: flex;
  flex-direction: column;
  gap: $altrex-spacing-6;
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: $altrex-spacing-3;
}

.filtered-results {
  border-top: 1px solid $altrex-colors-neutral-200;
  padding-top: $altrex-spacing-4;

  [data-theme="dark"] & {
    border-color: $altrex-colors-dark-border-default;
  }
}

.results-count {
  font-weight: $altrex-fontWeight-semibold;
  color: $altrex-colors-neutral-700;
  margin-bottom: $altrex-spacing-3;

  [data-theme="dark"] & {
    color: $altrex-colors-dark-text-secondary;
  }
}

.item-list {
  display: flex;
  flex-direction: column;
  gap: $altrex-spacing-2;
}

.item {
  display: flex;
  align-items: center;
  gap: $altrex-spacing-3;
  padding: $altrex-spacing-2;
  background: white;
  border-radius: $altrex-borderRadius-default;

  [data-theme="dark"] & {
    background: $altrex-colors-dark-bg-default;
  }
}

.item-name {
  color: $altrex-colors-neutral-900;

  [data-theme="dark"] & {
    color: $altrex-colors-dark-text-primary;
  }
}

// Tag input demo
.tag-input-demo {
  display: flex;
  flex-direction: column;
  gap: $altrex-spacing-4;
}

.tag-input-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: $altrex-spacing-2;
  padding: $altrex-spacing-3;
  background: white;
  border: 1px solid $altrex-colors-neutral-300;
  border-radius: $altrex-borderRadius-default;
  min-height: 52px;

  [data-theme="dark"] & {
    background: $altrex-colors-dark-bg-default;
    border-color: $altrex-colors-dark-border-default;
  }

  &:focus-within {
    outline: 2px solid $altrex-colors-primary-500;
    outline-offset: 0;
  }
}

.tag-input-chips {
  display: flex;
  flex-wrap: wrap;
  gap: $altrex-spacing-2;
}

.tag-input {
  flex: 1;
  min-width: 200px;
  border: none;
  outline: none;
  font-size: $altrex-fontSize-base;
  background: transparent;
  color: $altrex-colors-neutral-900;

  [data-theme="dark"] & {
    color: $altrex-colors-dark-text-primary;
  }

  &::placeholder {
    color: $altrex-colors-neutral-500;

    [data-theme="dark"] & {
      color: $altrex-colors-dark-text-tertiary;
    }
  }
}

.available-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: $altrex-spacing-2;
}

.available-tags-label {
  font-size: $altrex-fontSize-sm;
  font-weight: $altrex-fontWeight-medium;
  color: $altrex-colors-neutral-600;

  [data-theme="dark"] & {
    color: $altrex-colors-dark-text-secondary;
  }
}

// Props table
.props-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: $altrex-fontSize-sm;

    th,
    td {
      text-align: left;
      padding: $altrex-spacing-3;
      border: 1px solid $altrex-colors-neutral-200;

      [data-theme="dark"] & {
        border-color: $altrex-colors-dark-border-default;
      }
    }

    th {
      background: $altrex-colors-neutral-100;
      font-weight: $altrex-fontWeight-semibold;
      color: $altrex-colors-neutral-900;

      [data-theme="dark"] & {
        background: $altrex-colors-dark-bg-elevated;
        color: $altrex-colors-dark-text-primary;
      }
    }

    td {
      color: $altrex-colors-neutral-700;

      [data-theme="dark"] & {
        color: $altrex-colors-dark-text-secondary;
      }
    }

    code {
      background: $altrex-colors-neutral-100;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: $altrex-fontSize-xs;

      [data-theme="dark"] & {
        background: $altrex-colors-dark-bg-elevated;
      }
    }
  }
}

// Feature list
.feature-list {
  list-style: none;
  padding: 0;

  li {
    padding: $altrex-spacing-2 0;
    color: $altrex-colors-neutral-700;

    [data-theme="dark"] & {
      color: $altrex-colors-dark-text-secondary;
    }

    strong {
      color: $altrex-colors-neutral-900;

      [data-theme="dark"] & {
        color: $altrex-colors-dark-text-primary;
      }
    }
  }
}
</style>
