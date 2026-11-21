import React from 'react';
import { useTasks } from '../context/TaskContext';

export default function FilterTabs() {
  const { statusFilter, setStatusFilter, stats } = useTasks();

  const tabs = [
    { id: 'All', label: 'All tasks', mobileLabel: 'All', count: stats.total },
    { id: 'To do', label: 'To do', mobileLabel: 'To do', count: stats.todo },
    { id: 'In progress', label: 'In progress', mobileLabel: 'In progress', count: stats.inProgress },
    { id: 'Completed', label: 'Completed', mobileLabel: 'Completed', count: stats.completed },
  ];

  return (
    <div className="filter-tabs-container" role="tablist" aria-label="Task Status Filters">
      {tabs.map((tab) => {
        const isActive = statusFilter === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`filter-tab-btn ${isActive ? 'active' : ''}`}
            onClick={() => setStatusFilter(tab.id)}
          >
            <span className="tab-label desktop-tab-text">
              {tab.label} {tab.id === 'All' ? tab.count : ''}
            </span>
            <span className="tab-label mobile-tab-text">
              {tab.mobileLabel} {tab.id === 'All' ? tab.count : ''}
            </span>
          </button>
        );
      })}
    </div>
  );
}
