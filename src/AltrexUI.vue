<template>
  <div v-html="svgSprite" style="display: none;"></div>
  <div class="app-container">
    <AltrexSideNav
      :navigation-items="navigationItems"
      :logo="logoConfig"
      width="250px"
      :show-icons="true"
      :collapsible="true"
      :default-open="true"
    >
      <template #footer>
        <div class="nav-footer">
          <AltrexThemeToggle size="s" variant="segmented" :show-labels="false" />
        </div>
      </template>
    </AltrexSideNav>
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AltrexSideNav from './components/Navigation/AltrexSideNav.vue';
import AltrexThemeToggle from './components/ThemeToggle/AltrexThemeToggle.vue';
import { navigationConfig } from './config/navigation.js';
import LightLogo from './assets/AltrexLogoLight.svg';
import DarkLogo from './assets/AltrexLogoDark.svg';

const logoConfig = {
  light: LightLogo,
  dark: DarkLogo,
  alt: 'Altrex UI',
  href: '/'
};

// Use centralized navigation config
const navigationItems = ref(navigationConfig);
</script>

<style>
* {
  box-sizing: border-box;
}

:root {
  /* Light theme (default) */
  --altrex-bg-primary: #ffffff;
  --altrex-bg-secondary: #f8f9fa;
  --altrex-text-primary: #2c3e50;
  --altrex-text-secondary: #6c757d;
  --altrex-border-color: rgba(44, 62, 80, 0.15);
}

html[data-theme="dark"] {
  /* Dark theme overrides - using design system tokens */
  --altrex-bg-primary: var(--altrex-colors-dark-bg-base);
  --altrex-bg-secondary: var(--altrex-colors-dark-bg-surface);
  --altrex-text-primary: var(--altrex-colors-dark-text-primary);
  --altrex-text-secondary: var(--altrex-colors-dark-text-secondary);
  --altrex-border-color: var(--altrex-colors-dark-border-default);
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--altrex-bg-secondary);
  color: var(--altrex-text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

#app {
  min-height: 100vh;
}
</style>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  padding: 0;
  transition: margin-left 0.3s ease;
  background-color: var(--altrex-bg-secondary);
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}

.nav-footer {
  display: flex;
  justify-content: center;
}
</style>
