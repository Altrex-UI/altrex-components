import { createRouter, createWebHistory } from 'vue-router'
import AltrexAccordion from '../AltrexAccordionView.vue'
import AltrexAlert from '../AltrexAlertView.vue'
import AltrexButton from '../AltrexButtonView.vue'
import AltrexCard from '../AltrexCardView.vue'
import AltrexEmptyState from '../AltrexEmptyStateView.vue'
import AltrexSideNav from '../AltrexSideNavView.vue'
import AltrexTabs from '../AltrexTabsView.vue'
import AltrexBadge from '../AltrexBadgeView.vue'
import AltrexChip from '../AltrexChipView.vue'
import AltrexThemeToggle from '@/components/ThemeToggle/AltrexThemeToggle.vue'
import AltrexTooltip from '../AltrexTooltipView.vue'
import AltrexInput from '../AltrexInputView.vue'
import AltrexTextarea from '../AltrexTextareaView.vue'
import AltrexSelect from '../AltrexSelectView.vue'
import AltrexCheckbox from '../AltrexCheckboxView.vue'
import AltrexToggle from '../AltrexToggleView.vue'
import AltrexSlider from '../AltrexSliderView.vue'
import AltrexRadio from '../AltrexRadioView.vue'
import AltrexModal from '../AltrexModalView.vue'
import AltrexProgress from '../AltrexProgressView.vue'
import AltrexSpinner from '../AltrexSpinnerView.vue'
import AltrexStepper from '../AltrexStepperView.vue'
import AltrexToast from '../AltrexToastView.vue'
import AltrexTimer from '../AltrexTimerView.vue'
import AltrexCalendar from '../AltrexCalendarView.vue'
import AltrexPagination from '../AltrexPaginationView.vue'
import AltrexDropdown from '../AltrexDropdownView.vue'
import AltrexDrawer from '../AltrexDrawerView.vue'
import AltrexAutocomplete from '../AltrexAutocompleteView.vue'
import AltrexAvatar from '../AltrexAvatarView.vue'
import AltrexTable from '../AltrexTableView.vue'
import AltrexDatePicker from '../AltrexDatePickerView.vue'
import AltrexBreadcrumb from '../AltrexBreadcrumbView.vue'
import AltrexImage from '../AltrexImageView.vue'
import AltrexIcon from '../AltrexIconView.vue'
import Homepage from '../Homepage.vue'

const routes = [
  {
    path: '/',
    redirect: '/homepage'
  },
  {
    path: '/homepage',
    name: 'Home',
    component: Homepage,
  },
  {
    path: '/AltrexAccordion',
    name: 'Altrex Accordion',
    component: AltrexAccordion
  },
  {
    path: '/AltrexAlert',
    name: 'Altrex Alert',
    component: AltrexAlert
  },
  {
    path: '/AltrexButton',
    name: 'Altrex Button',
    component: AltrexButton
  },
  {
    path: '/AltrexCard',
    name: 'Altrex Card',
    component: AltrexCard
  },
  {
    path: '/AltrexEmptyState',
    name: 'Altrex Empty State',
    component: AltrexEmptyState
  },
  {
    path: '/AltrexSideNav',
    name: 'Altrex Side Nav',
    component: AltrexSideNav
  },
  {
    path: '/AltrexBadge',
    name: 'Altrex Badge',
    component: AltrexBadge
  },
  {
    path: '/AltrexChip',
    name: 'Altrex Chip',
    component: AltrexChip
  },
  {
    path: '/AltrexThemeToggle',
    name: 'Altrex Theme Toggle',
    component: AltrexThemeToggle
  },
  {
    path: '/AltrexTooltip',
    name: 'Altrex Tooltip',
    component: AltrexTooltip
  },
  {
    path: '/AltrexInput',
    name: 'Altrex Input',
    component: AltrexInput
  },
  {
    path: '/AltrexTextarea',
    name: 'Altrex Textarea',
    component: AltrexTextarea
  },
  {
    path: '/AltrexSelect',
    name: 'Altrex Select',
    component: AltrexSelect
  },
  {
    path: '/AltrexSlider',
    name: 'Altrex Slider',
    component: AltrexSlider
  },
  {
    path: '/AltrexCheckbox',
    name: 'Altrex Checkbox',
    component: AltrexCheckbox
  },
  {
    path: '/AltrexToggle',
    name: 'Altrex Toggle',
    component: AltrexToggle
  },
  {
    path: '/AltrexRadio',
    name: 'Altrex Radio',
    component: AltrexRadio
  },
  {
    path: '/AltrexModal',
    name: 'Altrex Modal',
    component: AltrexModal
  },
  {
    path: '/AltrexProgress',
    name: 'Altrex Progress',
    component: AltrexProgress
  },
  {
    path: '/AltrexSpinner',
    name: 'Altrex Spinner',
    component: AltrexSpinner
  },
  {
    path: '/AltrexStepper',
    name: 'Altrex Stepper',
    component: AltrexStepper
  },
  {
    path: '/AltrexToast',
    name: 'Altrex Toast',
    component: AltrexToast
  },
  {
    path: '/AltrexTimer',
    name: 'Altrex Timer',
    component: AltrexTimer
  },
  {
    path: '/AltrexTabs',
    name: 'Altrex Tabs',
    component: AltrexTabs
  },
  {
    path: '/AltrexCalendar',
    name: 'Altrex Calendar',
    component: AltrexCalendar
  },
  {
    path: '/AltrexPagination',
    name: 'Altrex Pagination',
    component: AltrexPagination
  },
  {
    path: '/AltrexDropdown',
    name: 'Altrex Dropdown',
    component: AltrexDropdown
  },
  {
    path: '/AltrexDrawer',
    name: 'Altrex Drawer',
    component: AltrexDrawer
  },
  {
    path: '/AltrexAutocomplete',
    name: 'Altrex Autocomplete',
    component: AltrexAutocomplete
  },
  {
    path: '/AltrexAvatar',
    name: 'Altrex Avatar',
    component: AltrexAvatar
  },
  {
    path: '/AltrexTable',
    name: 'Altrex Table',
    component: AltrexTable
  },
  {
    path: '/AltrexDatePicker',
    name: 'Altrex Date Picker',
    component: AltrexDatePicker
  },
  {
    path: '/AltrexBreadcrumb',
    name: 'Altrex Breadcrumb',
    component: AltrexBreadcrumb
  },
  {
    path: '/AltrexImage',
    name: 'Altrex Image',
    component: AltrexImage
  },
  {
    path: '/AltrexIcon',
    name: 'Altrex Icon',
    component: AltrexIcon
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
