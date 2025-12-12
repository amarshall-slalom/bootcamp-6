<!--
Sync Impact Report
==================
Version Change: N/A → 1.0.0
Rationale: Initial constitution creation based on existing project guidelines

Modified Principles: N/A (new creation)
Added Sections:
  - Core Principles (6 principles)
  - Code Quality Standards
  - Development Workflow
  - Governance

Removed Sections: N/A

Templates Requiring Updates:
  ✅ plan-template.md - Constitution Check section aligns with principles
  ✅ spec-template.md - Requirements align with functional requirements principle
  ✅ tasks-template.md - Task structure supports test-first and independent delivery principles

Follow-up TODOs: None
-->

# Todo App Project Constitution

## Core Principles

### I. Test-First Development (NON-NEGOTIABLE)

Tests MUST be written before implementation code. All tests MUST fail initially, then pass after implementation. This principle applies to:
- Unit tests for all components and services
- Integration tests for component interactions and API communication
- Contract tests for API endpoints
- Minimum 80% code coverage across all packages

**Rationale**: Test-first development ensures code quality, reduces bugs, validates requirements before implementation, and creates living documentation. The red-green-refactor cycle catches issues early and makes refactoring safer.

### II. Single Responsibility & Separation of Concerns

Every module, component, function, and class MUST have exactly one well-defined responsibility. Components MUST be focused and reusable. Business logic MUST be separated from presentation logic.
- React components handle UI only, not data fetching or business logic
- Services handle API communication and business logic
- Utilities are pure functions with clear, focused purposes
- Backend routes, controllers, and services have distinct responsibilities

**Rationale**: Single responsibility makes code easier to understand, test, maintain, and refactor. It enables parallel development and reduces coupling between modules.

### III. Code Consistency & Standards

All code MUST follow established formatting and naming conventions:
- 2-space indentation for all file types
- camelCase for variables and functions
- PascalCase for React components and classes
- UPPER_SNAKE_CASE for constants
- Organized imports: external libraries → internal modules → styles
- ESLint rules enforced with zero warnings in production code
- Maximum 100 character line length

**Rationale**: Consistent code style reduces cognitive load, makes code reviews faster, prevents style debates, and ensures the codebase looks like it was written by one person.

### IV. DRY (Don't Repeat Yourself)

Code duplication MUST be eliminated through extraction and reuse:
- Repeated code blocks MUST be extracted into shared functions or utilities
- Common UI patterns MUST become reusable components
- Shared data transformations MUST be centralized in utility modules
- Test fixtures and mock data MUST be shared via dedicated files

**Rationale**: DRY reduces maintenance burden, ensures consistency, makes bug fixes apply everywhere, and keeps the codebase size manageable.

### V. Simple & Readable Code (KISS)

Code MUST prioritize simplicity and readability over cleverness:
- Prefer straightforward solutions over complex abstractions
- Code should be self-documenting with clear variable and function names
- Complex logic MUST be broken into smaller, understandable functions
- Comments explain "why" not "what" - only when the reason is non-obvious
- Avoid premature optimization - optimize only when proven necessary

**Rationale**: Simple code is easier to understand, debug, and maintain. New team members can onboard faster. Bugs are easier to spot and fix.

### VI. Independent & Testable User Stories

Features MUST be decomposed into independently deliverable user stories:
- Each user story MUST be implementable without blocking other stories
- Each user story MUST be testable in isolation
- Each user story MUST deliver measurable value
- User stories MUST be prioritized (P1, P2, P3) for incremental delivery
- Foundation/infrastructure work MUST be completed before story implementation begins

**Rationale**: Independent stories enable parallel development, incremental delivery, faster feedback, easier testing, and the ability to pivot priorities without disrupting completed work.

## Code Quality Standards

### Error Handling
- All async operations MUST include try-catch blocks
- User-facing error messages MUST be clear and actionable
- All errors MUST be logged appropriately
- API errors MUST be handled gracefully with user feedback

### Performance
- React hooks (useMemo, useCallback) MUST be used appropriately to prevent unnecessary renders
- Lazy loading MUST be employed where appropriate
- Bundle sizes MUST be kept reasonable
- API responses MUST be optimized

### Documentation
- Public functions and components MUST use JSDoc comments
- README files MUST be kept current
- Complex logic MUST include explanatory comments about "why"
- API endpoints MUST be documented

### Accessibility
- All interactive elements MUST be keyboard accessible
- Color contrast MUST meet WCAG AA standards
- Form labels MUST be properly associated with inputs
- Icon buttons MUST have descriptive aria-labels

## Development Workflow

### Version Control
- Atomic commits: one logical change per commit
- Clear commit messages explaining the "why"
- Feature branches for all new work (feature/*, bugfix/*)
- Pull requests required for all changes
- Code review approval required before merge

### Testing Workflow
- Write failing tests first (Red)
- Implement minimal code to pass tests (Green)
- Refactor while keeping tests green (Refactor)
- Run all tests before committing
- Ensure all tests pass before creating pull requests
- Review coverage reports to identify gaps

### Code Review Requirements
- Code follows naming conventions
- Imports are organized correctly
- No linting errors or warnings
- Code is DRY and avoids repetition
- Functions/components have single responsibility
- Error handling is implemented
- Comments are clear and helpful
- Tests are written for new functionality
- No console.log statements in production code

### Pre-commit Checklist
All code MUST pass this checklist before commit:
- ESLint shows zero errors and warnings
- All tests pass
- Code coverage meets 80% threshold
- No commented-out code blocks remain
- Imports are organized
- Trailing whitespace removed

## Governance

### Constitution Authority
This constitution supersedes all other development practices and guidelines. All code changes, architectural decisions, and feature implementations MUST comply with these principles.

### Amendment Process
1. Amendments MUST be proposed with clear justification
2. Amendments require team review and approval
3. Version bump MUST follow semantic versioning:
   - MAJOR: Breaking changes to principles or removal of principles
   - MINOR: New principles added or material expansions
   - PATCH: Clarifications, wording fixes, typo corrections
4. All amendments MUST include migration plan for existing code
5. Amendment date MUST be recorded in Last Amended field

### Compliance Verification
- All pull requests MUST verify compliance with constitution
- Code reviews MUST explicitly check for principle violations
- Complexity or deviations MUST be explicitly justified in writing
- Constitution compliance is a blocking gate for merging

### Versioning Policy
This constitution follows semantic versioning (MAJOR.MINOR.PATCH):
- Changes are tracked in the Sync Impact Report
- Version number appears at the bottom of this document
- Breaking changes require major version bump and migration plan

**Version**: 1.0.0 | **Ratified**: 2025-12-12 | **Last Amended**: 2025-12-12
