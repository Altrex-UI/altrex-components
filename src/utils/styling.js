/**
 * Transforms camelCase style object to CSS variables
 * @param {Object} styles - Style object with camelCase keys
 * @param {String} namespace - CSS variable prefix (default: 'altrex')
 * @param {Function} callback - Optional callback function
 * @returns {Object} CSS variables object
 */
export function transformStylesToVariables(styles, namespace = 'altrex', callback) {
    const cssVariables = {};

    if (!styles) {
        return callback && typeof callback === 'function'
            ? (callback(cssVariables), cssVariables)
            : cssVariables;
    }

    for (const [key, value] of Object.entries(styles)) {
        const kebabCaseKey = key.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);
        const variableName = `--${namespace}-${kebabCaseKey}`;
        cssVariables[variableName] = value;
    }

    if (callback && typeof callback === 'function') {
        callback(cssVariables);
    }

    return cssVariables;
}

/**
 * Vue Options API mixin for styling support
 * Provides styleOverrides prop and themeVariables computed property
 */
export default {
    props: {
        styleOverrides: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            themePrefix: 'altrex',
        };
    },
    methods: {
        transformStylesToVariables,
    },
    computed: {
        themeVariables() {
            return this.transformStylesToVariables(this.styleOverrides, this.themePrefix);
        },
    },
};
