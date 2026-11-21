/**
 * Computes dashboard statistics dynamically from task list
 */
export function calculateStatistics(tasks = []) {
  const total = tasks.length;
  const inProgress = tasks.filter((t) => t.status === 'In progress').length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const todo = tasks.filter((t) => t.status === 'To do').length;
  const completionPercentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return {
    total,
    inProgress,
    completed,
    todo,
    completionPercentage
  };
}
