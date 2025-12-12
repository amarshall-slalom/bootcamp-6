# Data Model: Overdue Todo Items Support

**Feature**: 001-overdue-todos
**Date**: 2025-12-12
**Status**: Complete

## Overview

This feature adds computed overdue status to existing Todo entities. No database schema changes required - overdue status is calculated client-side from existing `dueDate` and `completed` fields.

## Entities

### Todo (Existing Entity - No Schema Changes)

**Description**: Represents a single todo item with task details and completion status

**Existing Attributes**:
- `id` (string): Unique identifier for the todo
- `title` (string, required, max 255 chars): The todo task description
- `dueDate` (ISO 8601 date string, optional): When the todo should be completed
- `completed` (boolean): Whether the todo has been marked as done
- `createdAt` (ISO 8601 datetime string): When the todo was created

**Computed Attributes** (not stored, calculated on frontend):
- `isOverdue` (boolean): Whether the todo is past due and incomplete
  - Calculation: `dueDate < currentDate AND completed === false AND dueDate !== null`
  - Recalculated: On page load/refresh
- `overdueDuration` (string): Human-readable overdue duration
  - Format: "[N] day(s) overdue", "[N] week(s) overdue", or "[N] month(s) overdue"
  - Calculation: Difference between currentDate and dueDate with auto-switching units
  - Only present when `isOverdue === true`

**Example**:
```json
{
  "id": "todo-123",
  "title": "Review pull request",
  "dueDate": "2025-12-05",
  "completed": false,
  "createdAt": "2025-12-01T10:00:00Z",

  // Computed on frontend (not in API response):
  "isOverdue": true,
  "overdueDuration": "1 week overdue"
}
```

### UserPreferences (New - localStorage Only)

**Description**: User interface preferences stored in browser localStorage

**Attributes**:
- `overdueSortEnabled` (boolean, default: false): Whether overdue todos should sort to top
- `theme` (string, existing): Dark/light mode preference (already exists in app)

**Storage Location**: Browser localStorage (key: `overdueSortEnabled`)

**Example**:
```javascript
// localStorage.getItem('overdueSortEnabled')
"true"  // or "false"
```

## Data Flow

### Overdue Status Calculation

```
1. User loads page
2. Frontend fetches todos from backend API
3. Frontend calculates isOverdue for each todo:
   - Parse dueDate as Date object
   - Compare with current date (date-only, ignore time)
   - Check completed status
4. Frontend renders badges/duration text based on isOverdue
```

### Sorting Flow

```
1. User toggles "Sort by Overdue" option
2. Frontend saves preference to localStorage
3. Frontend re-sorts todo array:
   - Overdue todos first (sorted by most overdue)
   - Non-overdue todos after (maintain original order)
4. React re-renders with new sort order
```

## Validation Rules

### Overdue Calculation
- `dueDate` must be valid ISO 8601 date string or null
- If `dueDate` is null → never overdue
- If `completed` is true → never overdue
- If `dueDate` is today or future → not overdue
- If `dueDate` is before today AND not completed → overdue

### Duration Formatting
- 0-6 days: Show days ("1 day overdue", "5 days overdue")
- 7-29 days: Show weeks ("1 week overdue", "3 weeks overdue")
- 30+ days: Show months ("1 month overdue", "2 months overdue")
- Singular vs plural handled ("1 day" vs "2 days")

## State Transitions

### Todo Overdue Status

```
┌─────────────┐
│   Created   │
│ (not overdue)│
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Before Due  │◄───────────┐
│ (not overdue)│             │
└──────┬──────┘             │
       │                    │
       │ Due date passes    │
       │ & not completed    │ User completes
       ▼                    │
┌─────────────┐             │
│  Overdue    │─────────────┘
│ (show badge)│
└─────────────┘
```

**Note**: Once a todo is marked completed, it leaves the overdue flow permanently and is never marked as overdue again, even if completed after the due date.

## Data Integrity

### No Backend Changes Required
- Backend todos service remains unchanged
- Backend API endpoints unchanged
- All overdue logic lives in frontend utilities
- No migration scripts needed

### Client-Side Data Consistency
- Overdue status recalculated on every page load (ensures accuracy)
- Sort preference persisted but never sent to backend
- No cached overdue status (always fresh calculation)

## Relationships

No new entity relationships. This feature operates on the existing Todo entity with computed fields only.

## Scalability Considerations

- Overdue calculation: O(n) where n = number of todos
- Sorting: O(n log n) worst case (JavaScript Array.sort)
- Performance target: <100 todos (single-user app)
- No performance issues expected for target scale

## Future Considerations

**Not in Scope for This Feature** (but documented for future reference):
- Server-side overdue calculation (could add `isOverdue` field to API response)
- Real-time updates (currently requires refresh)
- Overdue notifications/reminders
- Custom overdue threshold (e.g., "due today" counts as overdue)
