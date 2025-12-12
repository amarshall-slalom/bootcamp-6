# Feature Specification: Overdue Todo Items Support

**Feature Branch**: `001-overdue-todos`
**Created**: 2025-12-12
**Status**: Draft
**Input**: User description: "Support for Overdue Todo Items - Users need a clear, visual way to identify which todos have not been completed by their due date."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visual Identification of Overdue Items (Priority: P1)

Users can visually distinguish overdue todos from other todos in their list at a glance, allowing them to immediately identify tasks that are past their due date.

**Why this priority**: This is the core value proposition - users need to quickly spot overdue items without manual date checking. This is the minimum viable feature that delivers immediate value.

**Independent Test**: Can be fully tested by creating todos with past due dates and verifying they are visually distinct from current or future-dated todos. Delivers immediate value by making overdue tasks stand out.

**Acceptance Scenarios**:

1. **Given** I have a todo with a due date in the past and the todo is not completed, **When** I view my todo list, **Then** the overdue todo is visually distinguished from other todos (different color, styling, or indicator)
2. **Given** I have a todo with a due date of today, **When** I view my todo list, **Then** the todo is NOT marked as overdue
3. **Given** I have a todo with a due date in the past but the todo is marked as completed, **When** I view my todo list, **Then** the todo is NOT marked as overdue (completed tasks are not overdue)
4. **Given** I have a todo with no due date, **When** I view my todo list, **Then** the todo is NOT marked as overdue
5. **Given** I have a todo with a future due date, **When** I view my todo list, **Then** the todo is NOT marked as overdue

---

### User Story 2 - Overdue Indicator Text (Priority: P2)

Users can see how long a todo has been overdue with clear, human-readable text (e.g., "2 days overdue", "1 week overdue") to understand the urgency of each overdue task.

**Why this priority**: While visual distinction (P1) helps users spot overdue items, knowing HOW overdue an item is helps with prioritization. This is a value-add on top of basic visual identification.

**Independent Test**: Can be tested independently by creating todos with various past due dates and verifying the overdue duration text is accurate and human-readable. Delivers additional context for task prioritization.

**Acceptance Scenarios**:

1. **Given** I have an overdue todo that is 1 day past its due date, **When** I view the todo, **Then** I see text indicating "1 day overdue"
2. **Given** I have an overdue todo that is 5 days past its due date, **When** I view the todo, **Then** I see text indicating "5 days overdue"
3. **Given** I have an overdue todo that is 2 weeks past its due date, **When** I view the todo, **Then** I see text indicating "2 weeks overdue" or equivalent
4. **Given** I have a todo that is due today but not completed, **When** I view the todo, **Then** I do NOT see overdue duration text (only marked as due today)

---

### User Story 3 - Overdue Sorting Option (Priority: P3)

Users can optionally sort their todo list to show overdue items at the top, making it even easier to focus on what needs immediate attention.

**Why this priority**: This is a convenience feature that builds on P1 and P2. Users who have many todos will benefit from automatic sorting, but it's not essential if visual distinction and overdue text are already present.

**Independent Test**: Can be tested independently by creating a mix of overdue, current, and future todos and verifying the sort order puts overdue items first. Delivers workflow optimization for users with many todos.

**Acceptance Scenarios**:

1. **Given** I have a mix of overdue, current, and future todos, **When** I enable overdue sorting, **Then** all overdue todos appear at the top of my list before other todos
2. **Given** I have multiple overdue todos, **When** I enable overdue sorting, **Then** overdue todos are sorted by how overdue they are (most overdue first)
3. **Given** I enable overdue sorting, **When** I complete an overdue todo, **Then** it is removed from the top of the list (as it's no longer overdue)

---

### Edge Cases

- What happens when a todo becomes overdue while the user is viewing the list (date changes from today to yesterday at midnight)?
- How does the system handle todos with due dates set to midnight vs end of day?
- What happens when a user's system clock is incorrect?
- How are overdue todos displayed when the user has no overdue items?
- What happens when a user marks an overdue todo as complete? Should the overdue indicator remain visible or disappear immediately?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST compare each todo's due date with the current date to determine if it is overdue
- **FR-002**: System MUST visually distinguish overdue todos from non-overdue todos in the todo list
- **FR-003**: System MUST NOT mark completed todos as overdue, regardless of their due date
- **FR-004**: System MUST NOT mark todos without a due date as overdue
- **FR-005**: System MUST consider a todo overdue only when the due date is in the past (before today)
- **FR-006**: System MUST calculate and display the duration a todo has been overdue in human-readable format (days, weeks)
- **FR-007**: System MUST update overdue status in real-time or on page load/refresh to reflect current date
- **FR-008**: System MUST provide an option to sort todos with overdue items appearing first

### Key Entities

- **Todo**: Existing entity with attributes including title, due date, completion status, and creation date. Now enhanced with computed overdue status based on due date comparison with current date.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can identify overdue todos within 2 seconds of viewing the todo list without reading individual due dates
- **SC-002**: 100% of incomplete todos with past due dates are visually marked as overdue
- **SC-003**: 0% of completed todos are marked as overdue, regardless of due date
- **SC-004**: Overdue duration text accurately reflects the time difference between due date and current date with less than 1 day margin of error
- **SC-005**: Users can distinguish between todos that are 1 day overdue vs 1 week overdue vs 1 month overdue through visual cues or text

## Assumptions

- "Overdue" is defined as having a due date that is before the current date (not including today)
- A todo due "today" is NOT considered overdue until tomorrow
- Completed todos are never considered overdue, even if completed after their due date
- The system uses client-side date/time for overdue calculations (assumes user's local timezone)
- Visual distinction will follow the existing UI theme and design system (Halloween theme with orange/purple accents)
- Overdue indicator will use existing danger/warning colors from the design system (red tones)
- Human-readable overdue duration will use common time units (days, weeks, months) rather than precise hours/minutes
- Default sorting (newest first) remains unchanged unless user explicitly enables overdue sorting
