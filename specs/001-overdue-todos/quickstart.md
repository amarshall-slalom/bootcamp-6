# Quickstart Guide: Overdue Todo Items Support

**Feature**: 001-overdue-todos
**Date**: 2025-12-12
**Audience**: Developers implementing this feature

## Quick Summary

Add visual indicators, duration text, and optional sorting for overdue todos. Frontend-only feature using client-side date calculations. No backend changes required.

## Prerequisites

- Node.js 16+ installed
- Existing todo app running (backend + frontend)
- Familiarity with React hooks and JavaScript Date API

## Development Setup

### 1. Checkout Feature Branch

```bash
git checkout 001-overdue-todos
```

### 2. Install Dependencies (if needed)

```bash
# From repository root
npm install
```

**Note**: No new dependencies required for this feature!

### 3. Verify Existing App Works

```bash
# Start backend and frontend
npm run start

# Open browser to http://localhost:3000
# Create a few test todos with past, current, and future due dates
```

## Implementation Order (TDD Approach)

Follow this sequence to implement the feature using test-first development:

### Phase 1: Date Utilities (Foundation)

**Goal**: Create and test overdue calculation logic

1. **Create test file first** (RED):
   ```bash
   # Create directory
   mkdir -p packages/frontend/src/utils/__tests__

   # Create test file
   touch packages/frontend/src/utils/__tests__/dateUtils.test.js
   ```

2. **Write failing tests** for:
   - `isOverdue()` function (various scenarios)
   - `formatOverdueDuration()` function (days/weeks/months)

3. **Create implementation** (GREEN):
   ```bash
   touch packages/frontend/src/utils/dateUtils.js
   ```

4. **Run tests**:
   ```bash
   npm test --workspace=packages/frontend -- dateUtils.test.js
   ```

5. **Refactor** once tests pass

### Phase 2: Visual Indicators (User Story 1 - P1)

**Goal**: Display badge/icon next to overdue todos

1. **Update TodoCard tests first** (RED):
   ```bash
   # Edit existing test file
   packages/frontend/src/components/__tests__/TodoCard.test.js
   ```

2. **Add tests for**:
   - Badge appears for overdue incomplete todos
   - Badge does NOT appear for completed todos
   - Badge does NOT appear for future/today due dates
   - Badge does NOT appear when no due date

3. **Implement TodoCard changes** (GREEN):
   ```bash
   # Edit existing component
   packages/frontend/src/components/TodoCard.js
   ```

4. **Run tests**:
   ```bash
   npm test --workspace=packages/frontend -- TodoCard.test.js
   ```

### Phase 3: Duration Text (User Story 2 - P2)

**Goal**: Show "X days/weeks/months overdue" text

1. **Update TodoCard tests** (RED):
   - Add tests for duration text display
   - Verify auto-switching units (days → weeks → months)

2. **Implement duration display** (GREEN):
   - Add duration text rendering in TodoCard.js

3. **Run tests** and verify

### Phase 4: Sorting (User Story 3 - P3)

**Goal**: Optional sort-to-top functionality

1. **Update TodoList tests first** (RED):
   ```bash
   # Edit existing test file
   packages/frontend/src/components/__tests__/TodoList.test.js
   ```

2. **Add tests for**:
   - Sorting toggle functionality
   - Overdue todos appear first when enabled
   - Most overdue appear first within overdue group
   - Preference persists in localStorage

3. **Implement TodoList changes** (GREEN):
   ```bash
   # Edit existing component
   packages/frontend/src/components/TodoList.js
   ```

4. **Run tests**

## Testing the Feature

### Manual Testing Checklist

Create these test scenarios:

```javascript
// Test todos to create manually via UI:
1. "Overdue by 2 days" - due date: [today - 2 days]
2. "Overdue by 10 days" - due date: [today - 10 days]
3. "Overdue by 45 days" - due date: [today - 45 days]
4. "Due today" - due date: [today]
5. "Due tomorrow" - due date: [today + 1 day]
6. "No due date" - due date: null
```

**Expected Results**:
- ✅ Todos 1, 2, 3 show overdue badge
- ✅ Todo 1 shows "2 days overdue"
- ✅ Todo 2 shows "1 week overdue"  (or "2 weeks" depending on exact date)
- ✅ Todo 3 shows "1 month overdue"
- ✅ Todos 4, 5, 6 show NO overdue indicator
- ✅ Completing Todo 1 removes overdue badge immediately
- ✅ Enabling sort puts Todos 1, 2, 3 at top (3 first as most overdue)

### Automated Test Coverage

Run all tests to verify 80% coverage:

```bash
# Run all frontend tests with coverage
npm test --workspace=packages/frontend -- --coverage

# Verify coverage thresholds met
# Look for utils/dateUtils.js, components/TodoCard.js, components/TodoList.js
```

## File Checklist

By the end of implementation, these files should exist or be modified:

### New Files
- ✅ `packages/frontend/src/utils/dateUtils.js`
- ✅ `packages/frontend/src/utils/__tests__/dateUtils.test.js`

### Modified Files
- ✅ `packages/frontend/src/components/TodoCard.js`
- ✅ `packages/frontend/src/components/__tests__/TodoCard.test.js`
- ✅ `packages/frontend/src/components/TodoList.js`
- ✅ `packages/frontend/src/components/__tests__/TodoList.test.js`

### Unchanged Files
- ✅ Backend files (no changes needed)
- ✅ `packages/frontend/src/services/todoService.js` (no changes)
- ✅ API endpoints (no changes)

## Common Pitfalls & Solutions

### Pitfall 1: Date Comparison Includes Time
**Problem**: `new Date('2025-12-12')` creates date with time component, causing incorrect comparisons

**Solution**: Always reset hours to midnight:
```javascript
const date = new Date(dateString);
date.setHours(0, 0, 0, 0);
```

### Pitfall 2: Completed Todos Show as Overdue
**Problem**: Forgot to check `completed` status in `isOverdue()` logic

**Solution**: Always check both due date AND completion status:
```javascript
if (!todo.dueDate || todo.completed) return false;
```

### Pitfall 3: Sort Mutates Original Array
**Problem**: Using `todos.sort()` directly mutates state

**Solution**: Always create a copy:
```javascript
const sorted = [...todos].sort((a, b) => /* comparator */);
```

### Pitfall 4: localStorage Not Available
**Problem**: App crashes in private browsing mode

**Solution**: Wrap in try-catch with fallback:
```javascript
try {
  return JSON.parse(localStorage.getItem(key)) || defaultValue;
} catch {
  return defaultValue;
}
```

## Verification Commands

```bash
# Run linter
npm run lint --workspace=packages/frontend

# Run all tests
npm test --workspace=packages/frontend

# Run tests in watch mode (during development)
npm test --workspace=packages/frontend -- --watch

# Check test coverage
npm test --workspace=packages/frontend -- --coverage

# Start app for manual testing
npm run start
```

## Definition of Done

- [x] All tests written (following TDD approach)
- [x] All tests passing
- [x] Test coverage ≥ 80% for new/modified files
- [x] ESLint shows zero warnings/errors
- [x] Manual testing checklist completed
- [x] Code review completed
- [x] Visual design matches Halloween theme
- [x] Accessibility requirements met (WCAG AA)
- [x] localStorage preference persists across sessions
- [x] No console errors in browser
- [x] Feature works with 0 todos, 1 todo, and 100+ todos

## Next Steps

After implementation is complete:

1. Run full test suite: `npm test`
2. Manual QA with test scenarios above
3. Create pull request with checklist
4. Address code review feedback
5. Merge to main branch
6. Deploy to production

## Need Help?

- Review [spec.md](spec.md) for requirements
- Check [research.md](research.md) for implementation patterns
- See [data-model.md](data-model.md) for data structures
- Review [constitution.md](../../.specify/memory/constitution.md) for coding standards
