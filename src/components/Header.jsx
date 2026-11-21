import React from 'react';
import { Plus } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export default function Header() {
  const { openCreateForm } = useTasks();

  return (
    <header className="dashboard-header">
      {/* Top Bar with Workspace Breadcrumb & Profile Avatar */}
      <div className="header-top-bar">
        {/* Mobile Logo Brand */}
        <div className="mobile-brand-display">
          <div className="brand-logo" aria-hidden="true">
            <span className="logo-dot"></span>
            <span className="logo-dot"></span>
            <span className="logo-dot"></span>
            <span className="logo-dot"></span>
          </div>
          <span className="brand-title">FocusBoard</span>
        </div>

        {/* Desktop Breadcrumbs */}
        <div className="desktop-breadcrumb" aria-label="Breadcrumb">
          <span className="breadcrumb-category">WORKSPACE</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Overview</span>
        </div>

        {/* User Profile Avatar */}
        <div className="user-profile">
          <div className="user-avatar" title="Jane Doe (JD)" aria-label="User profile Jane Doe">
            <span>JD</span>
          </div>
        </div>
      </div>

      {/* Main Banner Heading and Primary Action */}
      <div className="header-banner">
        <div className="header-text-group">
          <h1 className="header-title">Your work, in focus.</h1>
          <p className="header-subtitle desktop-only-text">
            Plan your day, stay organized, and celebrate small wins.
          </p>
          <p className="header-subtitle mobile-only-text">
            Stay organized and keep moving forward.
          </p>
        </div>

        {/* Desktop New Task Button */}
        <div className="header-actions desktop-action-wrap">
          <button
            type="button"
            className="btn btn-primary new-task-btn"
            onClick={openCreateForm}
            aria-label="Create new task"
          >
            <Plus size={18} aria-hidden="true" />
            <span>New task</span>
          </button>
        </div>
      </div>
    </header>
  );
}
