import React from 'react';
import { Plus } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import FilterTabs from './FilterTabs';
import SearchBar from './SearchBar';
import PriorityFilter from './PriorityFilter';
import TaskItem from './TaskItem';
import EmptyState from './EmptyState';

export default function TaskSection() {
  const { filteredTasks, tasks, openCreateForm, setStatusFilter, statusFilter, searchQuery, priorityFilter } = useTasks();

  const isFiltered = Boolean(searchQuery.trim() || statusFilter !== 'All' || priorityFilter !== 'All');

  return (
    <section className="task-section" aria-label="Task Management">
      {/* Section Header */}
      <div className="task-section-header">
        <div className="section-title-wrap">
          <h2 className="section-title">My tasks</h2>
          <p className="section-subtitle desktop-subtext">
            Manage and track everything in one place.
          </p>
          <p className="section-subtitle mobile-subtext">
            Your priorities for this week
          </p>
        </div>

        {/* Action Controls */}
        <div className="section-actions">
          {/* Desktop "View all tasks" toggle/counter */}
          <button
            type="button"
            className="view-all-tasks-btn desktop-only-btn"
            onClick={() => setStatusFilter('All')}
          >
            <span>View all tasks</span>
          </button>

          {/* Mobile "+" Button */}
          <button
            type="button"
            className="mobile-add-task-btn"
            onClick={openCreateForm}
            aria-label="Create new task"
          >
            <Plus size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="task-controls-bar">
        <div className="controls-left">
          <FilterTabs />
        </div>
        <div className="controls-right">
          <SearchBar />
          <PriorityFilter />
        </div>
      </div>

      {/* Task List or Empty State */}
      <div className="task-list-wrapper">
        {filteredTasks.length > 0 ? (
          <div className="task-items-list" role="feed" aria-label="Tasks List">
            {filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <EmptyState isFiltered={isFiltered && tasks.length > 0} />
        )}
      </div>
    </section>
  );
}
