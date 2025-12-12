# Research: Overdue Todo Items Support

**Feature**: 001-overdue-todos
**Date**: 2025-12-12
**Status**: Complete

## Overview

Research for implementing visual overdue indicators, duration display, and optional sorting for past-due todos in the existing React/Express todo application.

## Research Areas

### 1. Date Comparison & Calculation in JavaScript

**Decision**: Use native JavaScript `Date` object with date-only comparison

**Rationale**:
- No external libraries needed (lightweight, no added dependencies)
- Built-in `Date` object is well-supported across all modern browsers
- Date-only comparison can be achieved by setting time to midnight
- Aligns with KISS principle (simple, straightforward solution)

**Alternatives Considered**:
- **date-fns**: Full-featured date library with good tree-shaking. Rejected because we only need simple date comparison - adding a dependency is overkill.
- **Moment.js**: Powerful but large and deprecated. Rejected due to size and deprecated status.
- **Dayjs**: Lightweight alternative to Moment. Rejected because native Date object is sufficient for our needs.

**Implementation Pattern**:
```javascript
// Compare dates ignoring time
function isOverdue(dueDate, today = new Date()) {
  const due = new Date(dueDate);
  const current = new Date(today);

  // Reset time to midnight for date-only comparison
  due.setHours(0, 0, 0, 0);
  current.setHours(0, 0, 0, 0);

  return due < current;
}
```

### 2. Duration Calculation & Formatting

**Decision**: Calculate difference in milliseconds, convert to days/weeks/months with auto-switching logic

**Rationale**:
- Simple arithmetic using JavaScript's built-in Date methods
- Auto-switching provides best readability (per clarification: <7 days use days, 7-29 use weeks, 30+ use months)
- No complex date math libraries needed
- Handles edge cases (month length variations) with simple approximations (30 days = 1 month)

**Alternatives Considered**:
- **Always show days**: Rejected per clarification - "45 days overdue" is less readable than "1 month overdue"
- **Exact calendar math**: Rejected as overly complex for approximate durations

**Implementation Pattern**:
```javascript
function formatOverdueDuration(dueDate) {
  const due = new Date(dueDate);
  const today = new Date();
  const diffMs = today - due;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} overdue`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks !== 1 ? 's' : ''} overdue`;
  } else {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months !== 1 ? 's' : ''} overdue`;
  }
}
```

### 3. LocalStorage for Sorting Preference

**Decision**: Use browser localStorage API with JSON serialization

**Rationale**:
- Built-in browser API, no dependencies
- Persists across sessions (per clarification requirement)
- Simple key-value storage perfect for boolean preference
- Already used in app for theme preference (dark/light mode)
- Synchronous API suitable for simple preference reads

**Alternatives Considered**:
- **sessionStorage**: Rejected - doesn't persist across browser sessions
- **IndexedDB**: Rejected - overkill for a single boolean value
- **Cookies**: Rejected - localStorage is more appropriate for client-only data

**Implementation Pattern**:
```javascript
const STORAGE_KEY = 'overdueSortEnabled';

function getSortPreference() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : false;
}

function setSortPreference(enabled) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(enabled));
}
```

### 4. React Component Patterns for Conditional Rendering

**Decision**: Use conditional rendering with ternary operators and early returns

**Rationale**:
- Standard React pattern for showing/hiding UI elements
- Aligns with existing codebase patterns
- Clean, readable conditional logic
- No additional libraries needed

**Implementation Pattern**:
```javascript
function TodoCard({ todo }) {
  const isOverdue = checkIfOverdue(todo.dueDate, todo.completed);

  return (
    <div className="todo-card">
      <input type="checkbox" checked={todo.completed} />

      {isOverdue && (
        <span className="overdue-badge" aria-label="Overdue indicator">
          ⚠️
        </span>
      )}

      <div className="todo-content">
        <span className="todo-title">{todo.title}</span>
        {todo.dueDate && (
          <span className="due-date">
            {formatDueDate(todo.dueDate)}
            {isOverdue && (
              <span className="overdue-text">
                {formatOverdueDuration(todo.dueDate)}
              </span>
            )}
          </span>
        )}
      </div>
    </div>
  );
}
```

### 5. Array Sorting in React

**Decision**: Use Array.prototype.sort() with custom comparator function

**Rationale**:
- Built-in JavaScript method, performant for small arrays
- Supports stable sorting in modern browsers
- Custom comparator allows complex sort logic (overdue status + overdue duration)
- No need for external sorting libraries

**Implementation Pattern**:
```javascript
function sortTodos(todos, sortByOverdue) {
  if (!sortByOverdue) return todos;

  return [...todos].sort((a, b) => {
    const aOverdue = isOverdue(a.dueDate, a.completed);
    const bOverdue = isOverdue(b.dueDate, b.completed);

    // Overdue items first
    if (aOverdue && !bOverdue) return -1;
    if (!aOverdue && bOverdue) return 1;

    // If both overdue, sort by most overdue first
    if (aOverdue && bOverdue) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }

    // Maintain original order for non-overdue
    return 0;
  });
}
```

### 6. Accessibility for Visual Indicators

**Decision**: Use aria-label on badge, ensure color contrast, maintain keyboard navigation

**Rationale**:
- WCAG AA compliance required by constitution
- Icon/emoji alone insufficient for screen readers
- aria-label provides context for assistive technologies
- Color contrast with danger/red tones from design system

**Best Practices Applied**:
- Badge has descriptive aria-label ("Overdue indicator")
- Duration text is regular text (screen reader accessible)
- Danger color meets WCAG AA contrast ratio
- No color-only communication (icon + text)

## Technology Stack Confirmation

- **Frontend**: React 18.x with standard hooks (useState, useEffect)
- **Testing**: Jest + React Testing Library (existing setup)
- **Styling**: CSS with existing theme system (Halloween colors)
- **No new dependencies required** - all functionality uses native APIs

## Performance Considerations

- **Calculation Timing**: On page load only (no real-time updates per clarification)
- **Rendering**: Conditional rendering with minimal DOM updates
- **Sorting**: In-memory array sorting - negligible performance impact for <100 todos
- **localStorage**: Synchronous reads acceptable for single boolean value

## Edge Cases Handled

1. **Midnight transitions**: Requires page refresh (clarified, documented)
2. **No due date**: Not marked as overdue (null check in utility)
3. **Completed todos**: Never marked overdue (completion status check)
4. **Invalid dates**: Graceful handling with try-catch in date parsing
5. **localStorage unavailable**: Fallback to default (no sorting)

## Conclusion

All research complete with no external dependencies needed. Feature can be implemented using:
- Native JavaScript Date API
- Standard React patterns
- Existing design system
- Built-in browser localStorage

Ready to proceed to Phase 1 (Data Model & Contracts).
