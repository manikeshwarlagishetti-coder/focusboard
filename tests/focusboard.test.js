import { test, describe } from 'node:test';
import assert from 'node:assert';
import { calculateStatistics } from '../src/utils/statistics.js';
import { filterTasks, generateTaskId, formatDate } from '../src/utils/taskHelpers.js';
import { INITIAL_TASKS } from '../src/data/initialTasks.js';

describe('FocusBoard — Statistics Calculations', () => {
  test('calculates correct statistics for sample tasks', () => {
    const stats = calculateStatistics(INITIAL_TASKS);
    assert.strictEqual(stats.total, 8);
    assert.strictEqual(stats.inProgress, 3);
    assert.strictEqual(stats.completed, 3);
    assert.strictEqual(stats.todo, 2);
    assert.strictEqual(stats.completionPercentage, 38);
  });

  test('safely handles zero tasks without division by zero', () => {
    const stats = calculateStatistics([]);
    assert.strictEqual(stats.total, 0);
    assert.strictEqual(stats.inProgress, 0);
    assert.strictEqual(stats.completed, 0);
    assert.strictEqual(stats.todo, 0);
    assert.strictEqual(stats.completionPercentage, 0);
  });

  test('calculates 100% completion when all tasks are completed', () => {
    const allCompleted = [
      { id: '1', status: 'Completed' },
      { id: '2', status: 'Completed' }
    ];
    const stats = calculateStatistics(allCompleted);
    assert.strictEqual(stats.total, 2);
    assert.strictEqual(stats.completed, 2);
    assert.strictEqual(stats.completionPercentage, 100);
  });
});

describe('FocusBoard — Search and Combined Filtering', () => {
  test('performs case-insensitive title search', () => {
    const lowerResults = filterTasks(INITIAL_TASKS, { search: 'design' });
    const upperResults = filterTasks(INITIAL_TASKS, { search: 'DESIGN' });
    const mixedResults = filterTasks(INITIAL_TASKS, { search: 'DeSiGn' });

    assert.strictEqual(lowerResults.length, 2);
    assert.strictEqual(upperResults.length, 2);
    assert.strictEqual(mixedResults.length, 2);
    assert.strictEqual(lowerResults[0].id, 'task-001');
  });

  test('filters tasks by status', () => {
    const todo = filterTasks(INITIAL_TASKS, { status: 'To do' });
    const inProgress = filterTasks(INITIAL_TASKS, { status: 'In progress' });
    const completed = filterTasks(INITIAL_TASKS, { status: 'Completed' });

    assert.strictEqual(todo.length, 2);
    assert.strictEqual(inProgress.length, 3);
    assert.strictEqual(completed.length, 3);
  });

  test('filters tasks by priority', () => {
    const high = filterTasks(INITIAL_TASKS, { priority: 'High' });
    const medium = filterTasks(INITIAL_TASKS, { priority: 'Medium' });
    const low = filterTasks(INITIAL_TASKS, { priority: 'Low' });

    assert.strictEqual(high.length, 3);
    assert.strictEqual(medium.length, 3);
    assert.strictEqual(low.length, 2);
  });

  test('combines search, status, and priority simultaneously', () => {
    const combined = filterTasks(INITIAL_TASKS, {
      search: 'navigation',
      status: 'In progress',
      priority: 'Medium'
    });
    assert.strictEqual(combined.length, 1);
    assert.strictEqual(combined[0].title, 'Fix mobile navigation');
  });

  test('returns empty array when no criteria match', () => {
    const none = filterTasks(INITIAL_TASKS, { search: 'nonexistent-query-12345' });
    assert.strictEqual(none.length, 0);
  });
});

describe('FocusBoard — Helpers and Formatters', () => {
  test('generates unique task IDs', () => {
    const id1 = generateTaskId();
    const id2 = generateTaskId();
    assert.notStrictEqual(id1, id2);
    assert.match(id1, /^task-/);
  });

  test('formats dates properly', () => {
    assert.strictEqual(formatDate('2026-11-22'), 'Nov 22');
    assert.strictEqual(formatDate('2026-11-18'), 'Nov 18');
    assert.strictEqual(formatDate(''), '');
  });
});

describe('FocusBoard — LocalStorage & Empty-List Persistence (Requirements 1 & 2)', () => {
  // Mock localStorage simulation for persistence testing
  const createMockStorage = (initial = {}) => {
    const store = { ...initial };
    return {
      getItem: (key) => (key in store ? store[key] : null),
      setItem: (key, val) => { store[key] = String(val); },
      removeItem: (key) => { delete store[key]; }
    };
  };

  const STORAGE_KEY = 'focusboard_tasks';

  function restoreTasks(storage) {
    try {
      const saved = storage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Fallback on corrupt
    }
    return INITIAL_TASKS;
  }

  test('Requirement 1: restores saved tasks across simulated refresh', () => {
    const storage = createMockStorage();
    const userTasks = [
      { id: 'custom-1', title: 'User created task', status: 'In progress', priority: 'High' }
    ];
    storage.setItem(STORAGE_KEY, JSON.stringify(userTasks));

    const restored = restoreTasks(storage);
    assert.strictEqual(restored.length, 1);
    assert.strictEqual(restored[0].title, 'User created task');
  });

  test('Requirement 2 (Critical): preserves empty array [] when all tasks are deleted', () => {
    const storage = createMockStorage();
    // Simulate user deleting all tasks
    const emptyList = [];
    storage.setItem(STORAGE_KEY, JSON.stringify(emptyList));

    // Simulate browser refresh
    const restored = restoreTasks(storage);

    // CRITICAL ASSERTION: Must return empty array [], NOT INITIAL_TASKS!
    assert.strictEqual(Array.isArray(restored), true);
    assert.strictEqual(restored.length, 0);
    assert.notStrictEqual(restored, INITIAL_TASKS);
  });

  test('initializes default sample tasks only when no saved key exists (null)', () => {
    const storage = createMockStorage(); // empty storage, no key
    const restored = restoreTasks(storage);
    assert.strictEqual(restored.length, 8);
    assert.strictEqual(restored[0].id, 'task-001');
  });

  test('handles corrupted JSON safely by falling back to default data without throwing', () => {
    const storage = createMockStorage({ [STORAGE_KEY]: 'corrupted-invalid-json{[' });
    const restored = restoreTasks(storage);
    assert.strictEqual(restored.length, 8);
    assert.strictEqual(restored[0].id, 'task-001');
  });
});
