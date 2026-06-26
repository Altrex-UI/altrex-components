/**
 * Navigation Configuration for Altrex UI Components
 *
 * This file centralizes all navigation items for the Altrex component library.
 * Add new components here to automatically include them in the side navigation.
 */

export const navigationConfig = [
  {
    label: 'Home',
    to: '/homepage',
    icon: 'generic-home'
  },
  {
    label: 'Form Components',
    section: true,
    defaultExpanded: true,
    children: [
      {
        label: 'Input',
        to: '/AltrexInput',
        description: 'Text and number input fields'
      },
      {
        label: 'Textarea',
        to: '/AltrexTextarea',
        description: 'Multi-line text input'
      },
      {
        label: 'Select',
        to: '/AltrexSelect',
        description: 'Dropdown select with search'
      },
      {
        label: 'Checkbox',
        to: '/AltrexCheckbox',
        description: 'Single and group checkboxes'
      },
      {
        label: 'Toggle',
        to: '/AltrexToggle',
        description: 'On/off switch'
      },
      {
        label: 'Radio',
        to: '/AltrexRadio',
        description: 'Radio button groups'
      },
      {
        label: 'Slider',
        to: '/AltrexSlider',
        description: 'Range slider for numeric values'
      },
      {
        label: 'Autocomplete',
        to: '/AltrexAutocomplete',
        description: 'Searchable dropdown with suggestions'
      },
      {
        label: 'Date Picker',
        to: '/AltrexDatePicker',
        description: 'Calendar-based date selection'
      }
    ]
  },
  {
    label: 'Display Components',
    section: true,
    defaultExpanded: false,
    children: [
      {
        label: 'Accordion',
        to: '/AltrexAccordion',
        description: 'Expandable content panels for FAQs and settings'
      },
      {
        label: 'Avatar',
        to: '/AltrexAvatar',
        description: 'User profile images, initials, and icons'
      },
      {
        label: 'Badge',
        to: '/AltrexBadge',
        description: 'Status indicators and labels'
      },
      {
        label: 'Chip',
        to: '/AltrexChip',
        description: 'Interactive tags and filter chips'
      },
      {
        label: 'Card',
        to: '/AltrexCard',
        description: 'Content containers'
      },
      {
        label: 'Empty State',
        to: '/AltrexEmptyState',
        description: 'Empty list and collection states'
      },
      {
        label: 'Image',
        to: '/AltrexImage',
        description: 'Optimized images with lazy loading and placeholders'
      },
      {
        label: 'Table',
        to: '/AltrexTable',
        description: 'Data table with sorting and selection'
      }
    ]
  },
  {
    label: 'Action Components',
    section: true,
    defaultExpanded: false,
    children: [
      {
        label: 'Button',
        to: '/AltrexButton',
        description: 'Clickable action buttons'
      },
      {
        label: 'Dropdown',
        to: '/AltrexDropdown',
        description: 'Dropdown menus with keyboard navigation'
      }
    ]
  },
  {
    label: 'Navigation Components',
    section: true,
    defaultExpanded: false,
    children: [
      {
        label: 'Breadcrumb',
        to: '/AltrexBreadcrumb',
        description: 'Hierarchical page navigation trail'
      },
      {
        label: 'Drawer',
        to: '/AltrexDrawer',
        description: 'Slide-out panel for navigation or content'
      },
      {
        label: 'Pagination',
        to: '/AltrexPagination',
        description: 'Page navigation component'
      },
      {
        label: 'Side Navigation',
        to: '/AltrexSideNav',
        description: 'Sidebar navigation menu'
      },
      {
        label: 'Stepper',
        to: '/AltrexStepper',
        description: 'Multi-step progress indicator for wizards and checkouts'
      },
      {
        label: 'Tabs',
        to: '/AltrexTabs',
        description: 'Content organization with tabs'
      }
    ]
  },
  {
    label: 'Feedback Components',
    section: true,
    defaultExpanded: false,
    children: [
      {
        label: 'Alert',
        to: '/AltrexAlert',
        description: 'Static alert messages'
      },
      {
        label: 'Modal',
        to: '/AltrexModal',
        description: 'Overlay dialog component'
      },
      {
        label: 'Progress',
        to: '/AltrexProgress',
        description: 'Progress indicators'
      },
      {
        label: 'Spinner',
        to: '/AltrexSpinner',
        description: 'Loading spinners'
      },
      {
        label: 'Toast',
        to: '/AltrexToast',
        description: 'Notification system'
      }
    ]
  },
  {
    label: 'Utility Components',
    section: true,
    defaultExpanded: false,
    children: [
      {
        label: 'Theme Toggle',
        to: '/AltrexThemeToggle',
        description: 'Light/dark theme switcher'
      },
      {
        label: 'Tooltip',
        to: '/AltrexTooltip',
        description: 'Contextual information on hover'
      },
      {
        label: 'Timer',
        to: '/AltrexTimer',
        description: 'Countdown timer for workouts'
      },
      {
        label: 'Calendar',
        to: '/AltrexCalendar',
        description: 'Date picker for scheduling'
      },
      {
        label: 'Icons',
        to: '/AltrexIcon',
        description: 'Icon library sink — browse all icons'
      }
    ]
  }
]

/**
 * Helper function to get all routes from navigation config
 * Useful for generating router configuration
 */
export function getAllRoutes() {
  const routes = []

  function extractRoutes(items) {
    items.forEach(item => {
      if (item.to) {
        routes.push({
          path: item.to,
          label: item.label
        })
      }
      if (item.children) {
        extractRoutes(item.children)
      }
    })
  }

  extractRoutes(navigationConfig)
  return routes
}

/**
 * Helper function to find a navigation item by route
 */
export function findItemByRoute(route) {
  function search(items) {
    for (const item of items) {
      if (item.to === route) {
        return item
      }
      if (item.children) {
        const found = search(item.children)
        if (found) return found
      }
    }
    return null
  }

  return search(navigationConfig)
}
