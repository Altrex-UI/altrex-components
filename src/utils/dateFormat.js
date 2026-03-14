/**
 * Date formatting and parsing utilities
 */

/**
 * Format a date according to a format string
 * @param {Date} date - Date to format
 * @param {String} format - Format string (MM/DD/YYYY, DD/MM/YYYY, etc.)
 * @returns {String} Formatted date string
 */
export function formatDate(date, format = 'MM/DD/YYYY') {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return ''
  }

  const map = {
    'YYYY': date.getFullYear(),
    'YY': String(date.getFullYear()).slice(-2),
    'MM': String(date.getMonth() + 1).padStart(2, '0'),
    'M': date.getMonth() + 1,
    'DD': String(date.getDate()).padStart(2, '0'),
    'D': date.getDate()
  }

  let result = format
  Object.keys(map).forEach(key => {
    result = result.replace(key, map[key])
  })

  return result
}

/**
 * Parse a date string according to a format
 * @param {String} dateString - Date string to parse
 * @param {String} format - Format string
 * @returns {Date|null} Parsed date or null if invalid
 */
export function parseDate(dateString, format = 'MM/DD/YYYY') {
  if (!dateString || typeof dateString !== 'string') {
    return null
  }

  // Create regex pattern from format
  let pattern = format
    .replace(/YYYY/g, '(\\d{4})')
    .replace(/YY/g, '(\\d{2})')
    .replace(/MM/g, '(\\d{1,2})')
    .replace(/DD/g, '(\\d{1,2})')
    .replace(/M/g, '(\\d{1,2})')
    .replace(/D/g, '(\\d{1,2})')

  const regex = new RegExp(`^${pattern}$`)
  const match = dateString.match(regex)

  if (!match) {
    return null
  }

  // Extract parts based on format
  const formatParts = format.match(/YYYY|YY|MM|M|DD|D/g) || []
  const parts = {}

  formatParts.forEach((part, index) => {
    parts[part] = match[index + 1]
  })

  // Build date
  let year = parseInt(parts['YYYY'] || parts['YY'] || new Date().getFullYear())
  if (parts['YY'] && !parts['YYYY']) {
    year = year < 50 ? 2000 + year : 1900 + year
  }

  const month = parseInt(parts['MM'] || parts['M'] || 1) - 1
  const day = parseInt(parts['DD'] || parts['D'] || 1)

  const date = new Date(year, month, day)

  // Validate
  if (isNaN(date.getTime()) ||
      date.getFullYear() !== year ||
      date.getMonth() !== month ||
      date.getDate() !== day) {
    return null
  }

  return date
}

/**
 * Check if a date is within a range
 * @param {Date} date - Date to check
 * @param {Date} minDate - Minimum date
 * @param {Date} maxDate - Maximum date
 * @returns {Boolean}
 */
export function isDateInRange(date, minDate, maxDate) {
  if (!date || !(date instanceof Date)) return false

  const time = date.getTime()

  if (minDate && time < minDate.getTime()) {
    return false
  }

  if (maxDate && time > maxDate.getTime()) {
    return false
  }

  return true
}

/**
 * Check if a date is disabled
 * @param {Date} date - Date to check
 * @param {Array|Function} disabledDates - Array of disabled dates or function
 * @param {Array} disabledDaysOfWeek - Array of disabled day numbers (0=Sunday)
 * @returns {Boolean}
 */
export function isDateDisabled(date, disabledDates, disabledDaysOfWeek) {
  if (!date || !(date instanceof Date)) return false

  // Check disabled days of week
  if (disabledDaysOfWeek && Array.isArray(disabledDaysOfWeek)) {
    const dayOfWeek = date.getDay()
    if (disabledDaysOfWeek.includes(dayOfWeek)) {
      return true
    }
  }

  // Check disabled dates
  if (disabledDates) {
    // Function
    if (typeof disabledDates === 'function') {
      return disabledDates(date)
    }

    // Array of dates
    if (Array.isArray(disabledDates)) {
      const time = date.setHours(0, 0, 0, 0)
      return disabledDates.some(disabledDate => {
        if (disabledDate instanceof Date) {
          return disabledDate.setHours(0, 0, 0, 0) === time
        }
        return false
      })
    }
  }

  return false
}

/**
 * Format a date range
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @param {String} format - Format string
 * @returns {String} Formatted range string
 */
export function formatDateRange(startDate, endDate, format = 'MM/DD/YYYY') {
  if (!startDate) return ''
  if (!endDate) return formatDate(startDate, format)
  return `${formatDate(startDate, format)} - ${formatDate(endDate, format)}`
}

/**
 * Get today's date at midnight
 * @returns {Date}
 */
export function getToday() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

/**
 * Check if two dates are the same day
 * @param {Date} date1
 * @param {Date} date2
 * @returns {Boolean}
 */
export function isSameDay(date1, date2) {
  if (!date1 || !date2) return false
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}
