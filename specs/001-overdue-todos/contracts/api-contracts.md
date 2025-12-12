# API Contracts: Overdue Todo Items Support

**Feature**: 001-overdue-todos
**Date**: 2025-12-12
**Status**: No API Changes Required

## Overview

This feature requires **NO backend API changes**. All overdue functionality is implemented client-side using existing todo data from current API endpoints.

## Existing API Endpoints (Unchanged)

### GET /api/todos

**Description**: Retrieve all todos (existing endpoint, no modifications)

**Response** (unchanged):
```json
{
  "todos": [
    {
      "id": "string",
      "title": "string",
      "dueDate": "YYYY-MM-DD" | null,
      "completed": boolean,
      "createdAt": "ISO 8601 datetime"
    }
  ]
}
```

**Usage for Overdue Feature**:
- Frontend receives all todos with existing `dueDate` and `completed` fields
- Frontend calculates `isOverdue` and `overdueDuration` client-side
- No changes to response format

### POST /api/todos

**Description**: Create a new todo (existing endpoint, no modifications)

**Request Body** (unchanged):
```json
{
  "title": "string (required, max 255)",
  "dueDate": "YYYY-MM-DD (optional)"
}
```

**Response** (unchanged):
```json
{
  "id": "string",
  "title": "string",
  "dueDate": "YYYY-MM-DD" | null,
  "completed": false,
  "createdAt": "ISO 8601 datetime"
}
```

### PATCH /api/todos/:id

**Description**: Update a todo (existing endpoint, no modifications)

**Request Body** (unchanged):
```json
{
  "title": "string (optional)",
  "dueDate": "YYYY-MM-DD (optional)",
  "completed": boolean (optional)
}
```

**Response** (unchanged):
```json
{
  "id": "string",
  "title": "string",
  "dueDate": "YYYY-MM-DD" | null,
  "completed": boolean,
  "createdAt": "ISO 8601 datetime"
}
```

### DELETE /api/todos/:id

**Description**: Delete a todo (existing endpoint, no modifications)

**Response** (unchanged):
```json
{
  "success": boolean
}
```

## Frontend-Only Contracts

### localStorage Contract

**Key**: `overdueSortEnabled`

**Value Format**: JSON boolean string

**Operations**:
```javascript
// Read preference
const enabled = JSON.parse(localStorage.getItem('overdueSortEnabled') || 'false');

// Write preference
localStorage.setItem('overdueSortEnabled', JSON.stringify(true));
```

**Error Handling**:
- If localStorage unavailable (private browsing): Fall back to default (false)
- If stored value invalid JSON: Fall back to default (false)

## Client-Side Computed Fields

While not part of API contracts, these are the computed fields added to todos on the frontend:

### isOverdue (boolean)

**Calculation**:
```javascript
function isOverdue(todo) {
  if (!todo.dueDate || todo.completed) return false;

  const due = new Date(todo.dueDate);
  const today = new Date();

  due.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return due < today;
}
```

### overdueDuration (string)

**Format**: `"[N] day(s) overdue"` | `"[N] week(s) overdue"` | `"[N] month(s) overdue"`

**Calculation**: See [research.md](../research.md) for full implementation

## Backward Compatibility

- ✅ No breaking changes to existing API
- ✅ All existing API consumers unaffected
- ✅ Backend code requires no modifications
- ✅ Database schema unchanged
- ✅ Existing tests for API endpoints remain valid

## Future API Enhancements (Out of Scope)

If performance becomes an issue or server-side overdue status is needed in the future, consider:

### Potential: GET /api/todos?includeOverdue=true

**Response** (future enhancement only):
```json
{
  "todos": [
    {
      "id": "string",
      "title": "string",
      "dueDate": "YYYY-MM-DD" | null,
      "completed": boolean,
      "createdAt": "ISO 8601 datetime",
      "isOverdue": boolean,              // Calculated server-side
      "overdueDuration": "string" | null // Calculated server-side
    }
  ]
}
```

**Not implementing now because**:
- Current client-side approach is simpler
- Performance is adequate for target scale (<100 todos)
- No server-side timezone considerations needed
- Follows KISS principle

## Contract Testing

No new contract tests required since no API changes. Existing todo API contract tests remain valid.

Client-side logic will be covered by:
- Unit tests for `dateUtils.js` (overdue calculation)
- Component tests for `TodoCard.js` (rendering badges/duration)
- Integration tests for sorting functionality
