<template>
    <div class="side-nav-demo">
        <h1>Altrex Theme Toggle Component Demo</h1>

        <section class="demo-section">
            <h2>Theme Toggle</h2>
            <p class="description">Global theme control with Light, Dark, and Auto modes</p>

            <div class="demo-preview" style="padding: 2rem;">
                <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
                    <div>
                        <h3 style="margin-top: 0;">Segmented Toggle (Default)</h3>
                        <AltrexThemeToggle size="m" variant="segmented" />
                    </div>

                    <div>
                        <h3 style="margin-top: 0;">With Labels</h3>
                        <AltrexThemeToggle size="m" variant="segmented" :show-labels="true" />
                    </div>

                    <div>
                        <h3 style="margin-top: 0;">Button Variant</h3>
                        <AltrexThemeToggle size="m" variant="buttons" />
                    </div>

                    <div>
                        <h3 style="margin-top: 0;">Size Variants</h3>
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <AltrexThemeToggle size="s" variant="segmented" />
                            <AltrexThemeToggle size="m" variant="segmented" />
                            <AltrexThemeToggle size="l" variant="segmented" />
                        </div>
                    </div>
                </div>
                <div style="margin-top: 2rem;">
                    <p><strong>Note:</strong> The theme toggle controls the global theme for the entire application. The side navigation automatically adapts to the selected theme, displaying the appropriate logo and colors.</p>
                    <p>Theme preference is persisted in localStorage and respects system preferences when set to "Auto".</p>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import AltrexThemeToggle from '@/components/ThemeToggle/AltrexThemeToggle.vue';

    export default {
        name: 'AltrexThemeToggle',
        components: {
            AltrexThemeToggle,
        },
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