/**
 * Determines if a todo is overdue based on its due date and completion status.
 * A todo is considered overdue if:
 * - It has a due date
 * - The due date is in the past (before today)
 * - It is not completed
 *
 * @param {string|null|undefined} dueDate - ISO 8601 date string (YYYY-MM-DD) or null/undefined
 * @param {boolean} completed - Whether the todo is marked as complete
 * @returns {boolean} True if the todo is overdue, false otherwise
 */
export function isOverdue(dueDate, completed) {
  // Return false if no due date or if completed
  if (!dueDate || completed) {
    return false;
  }

  try {
    // Parse due date and current date
    const due = new Date(dueDate);
    const today = new Date();

    // Reset time to midnight for date-only comparison
    due.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // Compare dates: overdue if due date is before today
    return due < today;
  } catch (error) {
    // If date parsing fails, return false
    return false;
  }
}
