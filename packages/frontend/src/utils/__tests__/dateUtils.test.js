import { isOverdue } from '../dateUtils';

describe('dateUtils - isOverdue', () => {
  // T003: Test for overdue incomplete todo
  test('should return true for incomplete todo with past due date', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dueDate = yesterday.toISOString().split('T')[0]; // YYYY-MM-DD format
    const completed = false;

    expect(isOverdue(dueDate, completed)).toBe(true);
  });

  // T004: Test for future due date
  test('should return false for todo with future due date', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dueDate = tomorrow.toISOString().split('T')[0];
    const completed = false;

    expect(isOverdue(dueDate, completed)).toBe(false);
  });

  // T005: Test for today's due date
  test('should return false for todo due today', () => {
    const today = new Date();
    const dueDate = today.toISOString().split('T')[0];
    const completed = false;

    expect(isOverdue(dueDate, completed)).toBe(false);
  });

  // T006: Test for null due date
  test('should return false when due date is null', () => {
    const dueDate = null;
    const completed = false;

    expect(isOverdue(dueDate, completed)).toBe(false);
  });

  // T007: Test for completed overdue todo
  test('should return false for completed todo even if past due date', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dueDate = yesterday.toISOString().split('T')[0];
    const completed = true;

    expect(isOverdue(dueDate, completed)).toBe(false);
  });

  // Additional edge cases
  test('should return false when due date is undefined', () => {
    const dueDate = undefined;
    const completed = false;

    expect(isOverdue(dueDate, completed)).toBe(false);
  });

  test('should handle date comparison correctly at midnight boundary', () => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const dueDate = twoDaysAgo.toISOString().split('T')[0];
    const completed = false;

    expect(isOverdue(dueDate, completed)).toBe(true);
  });
});
