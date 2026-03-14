<template>
    <div class="homepage">
        <div class="hero">
            <h1 class="hero-title">Altrex UI Components</h1>
            <p class="hero-subtitle">A modern Vue 3 component library built with Vite</p>
        </div>

        <div class="content">
            <section class="section">
                <h2>About</h2>
                <p>
                    Altrex UI is a collection of reusable Vue 3 components designed to help you build
                    beautiful and functional web applications quickly. Built with modern development
                    practices and powered by Vite for lightning-fast development experience.
                </p>
            </section>

            <div class="setup-step">
                 <section class="section">
                <h2>Installation</h2>
                <p>
                    In your repo, install the npm packages necessary to use Altrex UI.
                </p>
                <div class="code-block">
                    <code>npm i @altrex-ui/icons @altrex-ui/styling @altrex-ui/components @altrex-ui/floating</code>
                </div>
                <h2>Usage</h2>
                <p>
                    Import the library and use the component directly in the template.
                </p>
                <h3>Import the component</h3>
                <div class="code-block">
                    <code>import { AltrexButton } from '@altrex-ui/components'</code>
                </div>
                <h3>Use in template</h3>
                <div class="code-block">
                    <code>&lt;AltrexButton label="Click me" variant="primary" @click="handleClick" /&gt;</code>
                </div>
                <h3>Complete example</h3>
                <div class="code-block">
                    <pre><code>&lt;script setup&gt;
import { AltrexButton } from '@altrex-ui/components'

const handleClick = () => {
  console.log('Button clicked!')
}
&lt;/script&gt;

&lt;template&gt;
  &lt;AltrexButton label="Primary" variant="primary" /&gt;
  &lt;AltrexButton label="Secondary" variant="secondary" /&gt;
  &lt;AltrexButton label="Disabled" :disabled="true" /&gt;
&lt;/template&gt;</code></pre>
                </div>
            </section>
            </div>

            <section class="section">
                <h2>Configuration</h2>
                <p>
                    For more information on customizing your Vite configuration, see the
                    <a href="https://vite.dev/config/" target="_blank" rel="noopener">Vite Configuration Reference</a>.
                </p>
            </section>
        </div>
    </div>
</template>

<style scoped>
.homepage {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.hero {
    text-align: center;
    padding: 3rem 1rem;
    margin-bottom: 2rem;
}

.hero-title {
    font-size: 3rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 0 0 1rem 0;
}

.hero-subtitle {
    font-size: 1.25rem;
    color: #7f8c8d;
    margin: 0;
}

.content {
    padding: 1rem 0;
}

.section {
    margin-bottom: 3rem;
}

.section h2 {
    font-size: 2rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #3498db;
}

.section h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #34495e;
    margin: 1rem 0 0.5rem 0;
}

.section p {
    font-size: 1rem;
    line-height: 1.6;
    color: #555;
    margin: 0.5rem 0;
}

.section ul {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
}

.section li {
    margin: 0.5rem 0;
    line-height: 1.6;
    color: #555;
}

.section a {
    color: #3498db;
    text-decoration: none;
    transition: color 0.2s;
}

.section a:hover {
    color: #2980b9;
    text-decoration: underline;
}

.setup-step {
    margin: 1.5rem 0;
}

.code-block {
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 1rem 1.5rem;
    border-radius: 6px;
    margin: 1rem 0;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    overflow-x: auto;
}

.code-block code {
    font-size: 0.95rem;
}

.component-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
}

.component-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1.5rem;
    background: #ffffff;
    border: 2px solid #ecf0f1;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.3s ease;
    text-align: center;
}

.component-card:hover {
    border-color: #3498db;
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.15);
    transform: translateY(-2px);
}

.component-card h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 0.5rem 0;
}

.component-card p {
    font-size: 0.95rem;
    color: #7f8c8d;
    margin: 0;
    line-height: 1.5;
}

@media (max-width: 768px) {
    .hero-title {
        font-size: 2rem;
    }

    .hero-subtitle {
        font-size: 1rem;
    }

    .section h2 {
        font-size: 1.5rem;
    }

    .component-grid {
        grid-template-columns: 1fr;
    }
}
</style>
