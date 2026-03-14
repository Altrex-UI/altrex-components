/**
 * Touch Target Validator
 *
 * Validates that all interactive elements meet WCAG 2.1 Level AAA
 * touch target size requirements (44x44px minimum).
 *
 * Only runs in development mode to help developers identify
 * accessibility issues during development.
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
 */

const MIN_SIZE = 44; // WCAG 2.1 Level AAA minimum (44x44px)
const COMFORTABLE_SIZE = 48; // Comfortable size
const INTERACTIVE_SELECTORS = [
  'button:not([disabled])',
  'a[href]',
  'input:not([type="hidden"]):not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[role="button"]:not([aria-disabled="true"])',
  '[role="link"]',
  '[role="menuitem"]',
  '[role="tab"]',
  '[role="checkbox"]',
  '[role="radio"]',
  '[role="switch"]',
  '[tabindex]:not([tabindex="-1"]):not([disabled])',
].join(', ');

/**
 * Check if element is actually visible and interactive
 */
function isElementInteractive(element) {
  const style = window.getComputedStyle(element);

  // Skip if hidden
  if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
    return false;
  }

  // Skip if pointer-events disabled
  if (style.pointerEvents === 'none') {
    return false;
  }

  // Skip if element has zero dimensions
  const rect = element.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) {
    return false;
  }

  return true;
}

/**
 * Get a readable selector for logging
 */
function getElementSelector(element) {
  if (element.id) {
    return `#${element.id}`;
  }

  const classes = Array.from(element.classList)
    .filter(c => !c.startsWith('v-')) // Filter out Vue internal classes
    .slice(0, 2) // Limit to first 2 classes
    .join('.');

  if (classes) {
    return `${element.tagName.toLowerCase()}.${classes}`;
  }

  return element.tagName.toLowerCase();
}

/**
 * Get parent component name if available (Vue specific)
 */
function getComponentName(element) {
  let current = element;
  while (current && current !== document.body) {
    // Try to find Vue component name from data attributes or classes
    const componentClass = Array.from(current.classList || [])
      .find(c => c.startsWith('altrex-'));

    if (componentClass) {
      return componentClass;
    }

    current = current.parentElement;
  }
  return null;
}

/**
 * Calculate severity based on how far from minimum
 */
function getSeverity(width, height) {
  const minDimension = Math.min(width, height);

  if (minDimension < 32) {
    return 'critical'; // Very small, likely unusable on mobile
  } else if (minDimension < 40) {
    return 'high'; // Below minimum, difficult to tap
  } else if (minDimension < MIN_SIZE) {
    return 'medium'; // Below WCAG AAA but might be usable
  }

  return 'low';
}

/**
 * Validate touch targets and return violations
 */
export function validateTouchTargets(options = {}) {
  const {
    minSize = MIN_SIZE,
    logResults = true,
    returnViolations = true,
  } = options;

  // Only run in development
  if (import.meta.env.PROD) {
    return [];
  }

  const violations = [];
  const elements = document.querySelectorAll(INTERACTIVE_SELECTORS);

  elements.forEach(element => {
    // Skip if not actually interactive/visible
    if (!isElementInteractive(element)) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);

    // Check if either dimension is below minimum
    if (width < minSize || height < minSize) {
      const violation = {
        element,
        tagName: element.tagName.toLowerCase(),
        selector: getElementSelector(element),
        component: getComponentName(element),
        size: `${width}×${height}px`,
        width,
        height,
        minDimension: Math.min(width, height),
        severity: getSeverity(width, height),
        ariaLabel: element.getAttribute('aria-label'),
        text: element.textContent?.trim().substring(0, 30) || '',
      };

      violations.push(violation);
    }
  });

  // Log results
  if (logResults) {
    logValidationResults(violations, minSize, elements.length);
  }

  return returnViolations ? violations : [];
}

/**
 * Log validation results to console with styling
 */
function logValidationResults(violations, minSize, totalElements) {
  const passedCount = totalElements - violations.length;

  console.group(
    `%c🎯 Touch Target Validation (WCAG 2.1 Level AAA: ${minSize}×${minSize}px)`,
    'font-size: 14px; font-weight: bold; color: #007cff;'
  );

  if (violations.length === 0) {
    console.log(
      `%c✅ Perfect! All ${totalElements} interactive elements meet the ${minSize}×${minSize}px minimum.`,
      'color: #10b981; font-weight: bold;'
    );
  } else {
    console.log(
      `%c⚠️ Found ${violations.length} violation${violations.length === 1 ? '' : 's'} (${passedCount} passed)`,
      'color: #f59e0b; font-weight: bold;'
    );

    // Group by severity
    const critical = violations.filter(v => v.severity === 'critical');
    const high = violations.filter(v => v.severity === 'high');
    const medium = violations.filter(v => v.severity === 'medium');

    if (critical.length > 0) {
      console.group(`%c🔴 Critical (${critical.length}) - Very small, likely unusable on mobile`, 'color: #ef4444; font-weight: bold;');
      critical.forEach(v => logViolation(v, minSize));
      console.groupEnd();
    }

    if (high.length > 0) {
      console.group(`%c🟠 High (${high.length}) - Below minimum, difficult to tap`, 'color: #f59e0b; font-weight: bold;');
      high.forEach(v => logViolation(v, minSize));
      console.groupEnd();
    }

    if (medium.length > 0) {
      console.group(`%c🟡 Medium (${medium.length}) - Below WCAG AAA`, 'color: #eab308; font-weight: bold;');
      medium.forEach(v => logViolation(v, minSize));
      console.groupEnd();
    }

    // Summary recommendations
    console.groupCollapsed('%c💡 How to Fix', 'color: #3b82f6; font-weight: bold;');
    console.log('1. Use the touch-target() mixin: touch-target(\'minimum\') for 44×44px');
    console.log('2. Add min-height: $altrex-touchTarget-minimum to mobile styles');
    console.log('3. Use padding to increase hit area while keeping visual size small');
    console.log('4. Check if element is hidden/disabled - validation skips these');
    console.groupEnd();
  }

  console.groupEnd();
}

/**
 * Log individual violation
 */
function logViolation(violation, minSize) {
  const { selector, component, size, width, height, ariaLabel, text } = violation;

  const shortText = text ? `"${text.substring(0, 20)}${text.length > 20 ? '...' : ''}"` : '';
  const label = ariaLabel ? `[aria-label="${ariaLabel}"]` : '';
  const componentInfo = component ? `in ${component}` : '';

  console.log(
    `%c${selector}%c ${componentInfo} ${label} ${shortText}`,
    'font-weight: bold; color: #6366f1;',
    'font-weight: normal; color: #64748b;'
  );
  console.log(`  ❌ Size: ${size} (need ${minSize}×${minSize}px)`);
  console.log(`  📏 Deficit: width ${Math.max(0, minSize - width)}px, height ${Math.max(0, minSize - height)}px`);
  console.log('  ', violation.element);
}

/**
 * Setup automatic validation on route change (for Vue Router)
 */
export function setupAutoValidation(router, options = {}) {
  if (import.meta.env.PROD) {
    return;
  }

  const { delay = 1000 } = options;

  // Validate on initial load
  setTimeout(() => {
    validateTouchTargets(options);
  }, delay);

  // Validate after each route change
  if (router) {
    router.afterEach(() => {
      setTimeout(() => {
        validateTouchTargets(options);
      }, delay);
    });
  }
}

/**
 * Manual trigger for testing specific elements
 */
export function validateElement(element, options = {}) {
  if (import.meta.env.PROD) {
    return null;
  }

  const { minSize = MIN_SIZE } = options;

  if (!isElementInteractive(element)) {
    console.warn('Element is not interactive or visible:', element);
    return null;
  }

  const rect = element.getBoundingClientRect();
  const width = Math.round(rect.width);
  const height = Math.round(rect.height);

  const passes = width >= minSize && height >= minSize;

  console.log(
    `%c${passes ? '✅' : '❌'} Touch Target Check`,
    `font-weight: bold; color: ${passes ? '#10b981' : '#ef4444'};`
  );
  console.log(`Size: ${width}×${height}px (need ${minSize}×${minSize}px)`);
  console.log(element);

  return {
    passes,
    width,
    height,
    minSize,
  };
}

/**
 * Get statistics about touch targets
 */
export function getTouchTargetStats() {
  if (import.meta.env.PROD) {
    return null;
  }

  const violations = validateTouchTargets({ logResults: false });
  const elements = document.querySelectorAll(INTERACTIVE_SELECTORS);
  const interactiveCount = Array.from(elements).filter(isElementInteractive).length;

  return {
    total: interactiveCount,
    passed: interactiveCount - violations.length,
    failed: violations.length,
    passRate: ((interactiveCount - violations.length) / interactiveCount * 100).toFixed(1) + '%',
    violations,
    bySeverity: {
      critical: violations.filter(v => v.severity === 'critical').length,
      high: violations.filter(v => v.severity === 'high').length,
      medium: violations.filter(v => v.severity === 'medium').length,
      low: violations.filter(v => v.severity === 'low').length,
    },
  };
}

// Export for use in browser console
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  window.__altrex_validateTouchTargets = validateTouchTargets;
  window.__altrex_validateElement = validateElement;
  window.__altrex_getTouchTargetStats = getTouchTargetStats;

  console.log(
    '%c🎯 Altrex Touch Target Validator loaded',
    'color: #007cff; font-weight: bold;'
  );
  console.log('Available commands:');
  console.log('  __altrex_validateTouchTargets() - Run validation');
  console.log('  __altrex_validateElement(element) - Check specific element');
  console.log('  __altrex_getTouchTargetStats() - Get statistics');
}

export default {
  validateTouchTargets,
  setupAutoValidation,
  validateElement,
  getTouchTargetStats,
};
