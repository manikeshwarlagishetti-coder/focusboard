import React from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export default function PriorityFilter() {
  const { priorityFilter, setPriorityFilter } = useTasks();

  return (
    <div className="priority-filter-wrapper">
      <label htmlFor="priority-filter-select" className="sr-only">
        Filter tasks by priority
      </label>
      <div className="priority-select-container">
        <Filter size={14} className="filter-leading-icon" aria-hidden="true" />
        <select
          id="priority-filter-select"
          className="priority-select"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">Priority: All</option>
          <option value="High">Priority: High</option>
          <option value="Medium">Priority: Medium</option>
          <option value="Low">Priority: Low</option>
        </select>
        <ChevronDown size={14} className="select-chevron" aria-hidden="true" />
      </div>
    </div>
  );
}
