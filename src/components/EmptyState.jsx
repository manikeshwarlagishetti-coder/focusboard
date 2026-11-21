import React from 'react';
import { ClipboardList, Plus, RotateCcw } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export default function EmptyState({ isFiltered = false }) {
  const { openCreateForm, setSearchQuery, setStatusFilter, setPriorityFilter } = useTasks();

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
  };

  return (
    <div className="empty-state-card" role="status" aria-live="polite">
      <div className="empty-state-icon-box" aria-hidden="true">
        <ClipboardList size={36} className="empty-state-icon" />
      </div>

      <h3 className="empty-state-title">
        {isFiltered ? 'No matching tasks found' : 'No tasks in your workspace yet'}
      </h3>

      <p className="empty-state-description">
        {isFiltered
          ? "No tasks match your active search terms or filters. Try clearing your filters or search keywords."
          : 'Stay on top of your priorities by creating your first task.'}
      </p>

      <div className="empty-state-actions">
        {isFiltered ? (
          <button
            type="button"
            className="btn btn-secondary reset-filters-btn"
            onClick={handleResetFilters}
          >
            <RotateCcw size={16} aria-hidden="true" />
            <span>Reset filters</span>
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary create-first-task-btn"
            onClick={openCreateForm}
          >
            <Plus size={16} aria-hidden="true" />
            <span>Create new task</span>
          </button>
        )}
      </div>
    </div>
  );
}
