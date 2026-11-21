/**
 * Generates a unique task ID
 */
export function generateTaskId() {
  return `task-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
}

/**
 * Formats date string (YYYY-MM-DD) into display string (e.g. "Nov 22")
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
    }
    const fallback = new Date(dateString);
    if (!isNaN(fallback.getTime())) {
      return fallback.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return dateString;
  } catch {
    return dateString;
  }
}

/**
 * Filters a list of tasks based on status, priority, and case-insensitive search
 */
export function filterTasks(tasks, { search = '', status = 'All', priority = 'All' } = {}) {
  const normalizedSearch = search.trim().toLowerCase();

  return tasks.filter((task) => {
    // 1. Search filter: case-insensitive check against title and description
    if (normalizedSearch) {
      const titleMatch = task.title?.toLowerCase().includes(normalizedSearch);
      const descMatch = task.description?.toLowerCase().includes(normalizedSearch);
      const catMatch = task.category?.toLowerCase().includes(normalizedSearch);
      if (!titleMatch && !descMatch && !catMatch) {
        return false;
      }
    }

    // 2. Status filter
    if (status !== 'All' && task.status !== status) {
      return false;
    }

    // 3. Priority filter
    if (priority !== 'All' && task.priority !== priority) {
      return false;
    }

    return true;
  });
}
