# Implementation Plan: Overdue Todo Items Support

**Branch**: `001-overdue-todos` | **Date**: 2025-12-12 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-overdue-todos/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Add visual indicators and sorting functionality to help users identify and prioritize todos that are past their due date. This feature enhances the existing todo app by displaying a warning icon/badge next to overdue items, showing how long each todo has been overdue in human-readable text, and optionally sorting overdue todos to the top of the list. All overdue calculations happen on page load using client-side date comparisons.

## Technical Context

**Language/Version**: JavaScript (ES6+), React 18.x, Node.js 16+
**Primary Dependencies**: React, React DOM, Express.js, Jest
**Storage**: In-memory (backend), localStorage for user preferences (frontend)
**Testing**: Jest with React Testing Library (frontend), Jest (backend)
**Target Platform**: Web browser (desktop-focused), Node.js server
**Project Type**: Web application (frontend + backend monorepo)
**Performance Goals**: Instant visual feedback on page load (<100ms for overdue calculation), smooth UI rendering
**Constraints**: Client-side date calculations, no real-time updates (refresh required), 80% test coverage minimum
**Scale/Scope**: Single-user application, ~100 todos maximum, desktop browser focus

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ✅ Principle I: Test-First Development
- **Status**: PASS
- **Verification**: Feature requires unit tests for overdue calculation utility, component tests for visual indicators, and integration tests for sorting functionality. All aligned with 80% coverage requirement.

### ✅ Principle II: Single Responsibility & Separation of Concerns
- **Status**: PASS
- **Verification**: Overdue logic will be in utility functions (date comparison), visual display in UI components, sorting preference in localStorage service. Clear separation maintained.

### ✅ Principle III: Code Consistency & Standards
- **Status**: PASS
- **Verification**: Will follow existing project conventions (camelCase, PascalCase, import organization, ESLint compliance).

### ✅ Principle IV: DRY (Don't Repeat Yourself)
- **Status**: PASS
- **Verification**: Overdue calculation logic will be centralized in a shared utility. Duration formatting will be reusable. No duplication planned.

### ✅ Principle V: Simple & Readable Code (KISS)
- **Status**: PASS
- **Verification**: Straightforward date comparison logic, simple conditional rendering for badges, standard localStorage API usage. No complex abstractions needed.

### ✅ Principle VI: Independent & Testable User Stories
- **Status**: PASS
- **Verification**: Feature has 3 independently deliverable user stories (P1: Visual indicator, P2: Duration text, P3: Sorting). Each can be tested and deployed separately.

**Overall Gate Status**: ✅ **PASS** - All principles satisfied. No violations to justify.

## Project Structure

### Documentation (this feature)

```text
specs/001-overdue-todos/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
├── checklists/          # Quality validation checklists
│   └── requirements.md  # Requirements checklist (already exists)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
packages/
├── backend/
│   ├── src/
│   │   ├── app.js                    # Express app (no changes needed)
│   │   ├── index.js                  # Server entry point (no changes needed)
│   │   └── services/
│   │       └── todoService.js        # Existing service (no backend changes for this feature)
│   └── __tests__/
│       └── app.test.js               # Existing tests
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TodoCard.js           # MODIFY: Add overdue badge/icon, duration text
    │   │   ├── TodoList.js           # MODIFY: Add sorting logic
    │   │   └── __tests__/
    │   │       ├── TodoCard.test.js  # MODIFY: Add overdue display tests
    │   │       └── TodoList.test.js  # MODIFY: Add sorting tests
    │   ├── utils/                    # NEW DIRECTORY
    │   │   ├── dateUtils.js          # NEW: Overdue calculation, duration formatting
    │   │   └── __tests__/
    │   │       └── dateUtils.test.js # NEW: Utility function tests
    │   ├── services/
    │   │   └── todoService.js        # No changes needed
    │   └── App.js                    # No changes needed
    └── __tests__/
        └── App.test.js               # Potential integration test updates
```

**Structure Decision**: Web application monorepo structure (Option 2 from template). This feature is **frontend-only** - no backend API changes required since overdue status is computed client-side from existing todo due dates. New `utils/` directory needed for date calculation logic following DRY principle.

## Post-Design Constitution Re-Check

*Re-evaluated after Phase 1 design completion*

### ✅ Principle I: Test-First Development
- **Status**: PASS
- **Design Verification**:
  - dateUtils.test.js created before dateUtils.js
  - TodoCard.test.js updated before TodoCard.js modifications
  - TodoList.test.js updated before TodoList.js modifications
  - Test coverage target maintained at 80%+

### ✅ Principle II: Single Responsibility & Separation of Concerns
- **Status**: PASS
- **Design Verification**:
  - dateUtils.js: Pure functions for date calculations only
  - TodoCard.js: UI rendering only (receives computed isOverdue prop)
  - TodoList.js: Sorting logic only (uses dateUtils for comparison)
  - localStorage handling isolated in separate utility pattern
  - No business logic in UI components

### ✅ Principle III: Code Consistency & Standards
- **Status**: PASS
- **Design Verification**:
  - Function names follow camelCase (isOverdue, formatOverdueDuration)
  - Component names follow PascalCase (TodoCard, TodoList)
  - Constants use UPPER_SNAKE_CASE (STORAGE_KEY)
  - Import organization: React → utils → styles
  - All code samples in research.md demonstrate proper formatting

### ✅ Principle IV: DRY (Don't Repeat Yourself)
- **Status**: PASS
- **Design Verification**:
  - Overdue calculation centralized in dateUtils.isOverdue()
  - Duration formatting centralized in dateUtils.formatOverdueDuration()
  - localStorage access wrapped in reusable functions
  - No duplication between components
  - Shared test fixtures can be created in __mocks__ if needed

### ✅ Principle V: Simple & Readable Code (KISS)
- **Status**: PASS
- **Design Verification**:
  - Native Date API used (no external libraries)
  - Simple conditional rendering (ternary operators)
  - Straightforward Array.sort() for sorting
  - Built-in localStorage API
  - Clear, descriptive function names
  - No complex abstractions or over-engineering

### ✅ Principle VI: Independent & Testable User Stories
- **Status**: PASS
- **Design Verification**:
  - P1 (Visual indicator): Standalone, testable via badge presence
  - P2 (Duration text): Builds on P1, independently testable via text content
  - P3 (Sorting): Completely independent, testable via array order
  - Each story can be deployed separately
  - Each story delivers measurable value alone

**Overall Post-Design Status**: ✅ **PASS** - All principles maintained through detailed design. No deviations from constitution.

## Planning Phase Complete

### Artifacts Generated

✅ **Phase 0: Research**
- [research.md](research.md) - Technology decisions, implementation patterns, edge cases

✅ **Phase 1: Design & Contracts**
- [data-model.md](data-model.md) - Data structures, computed fields, validation rules
- [contracts/api-contracts.md](contracts/api-contracts.md) - API documentation (no changes required)
- [quickstart.md](quickstart.md) - Developer implementation guide with TDD workflow
- [.github/agents/copilot-instructions.md](../../.github/agents/copilot-instructions.md) - Updated with feature context

### Key Decisions Summary

| Decision Area | Choice | Rationale |
|--------------|--------|-----------|
| Date Library | Native JavaScript Date API | No dependencies needed, sufficient for date-only comparison |
| Calculation Timing | Page load only | Simpler implementation, aligns with clarification |
| Storage | localStorage for preferences | Browser built-in, persists across sessions |
| Sorting Algorithm | Array.sort() with comparator | Native, performant for <100 items |
| Visual Treatment | Icon/badge next to checkbox | Clarified requirement, high visibility |
| Duration Units | Auto-switch (days→weeks→months) | Improved readability per clarification |

### Next Steps

**Ready for**: `/speckit.tasks` - Generate detailed task breakdown

**Implementation Approach**:
1. Start with P1 (Visual indicators) - Delivers core value
2. Add P2 (Duration text) - Enhances P1
3. Add P3 (Sorting) - Optional convenience feature

**Estimated Effort**:
- P1: Small (1-2 hours)
- P2: Small (1 hour)
- P3: Small (1-2 hours)
- Total: ~4-5 hours including tests

**Risk Level**: ✅ Low
- No backend changes
- No new dependencies
- Well-defined requirements
- Clear test strategy
- All edge cases documented
