import React, { useState, useRef, useEffect } from 'react';
import { Calendar, MoreHorizontal, Check, Edit2, Trash2, Clock, CheckCircle } from 'lucide-react';
import { formatDate } from '../utils/taskHelpers';
import { useTasks } from '../context/TaskContext';

export default function TaskItem({ task }) {
  const { openEditForm, openDeleteDialog, updateTaskStatus } = useTasks();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const isCompleted = task.status === 'Completed';

  // Toggle completed status when clicking checkbox
  const handleToggleCompleted = () => {
    const nextStatus = isCompleted ? 'In progress' : 'Completed';
    updateTaskStatus(task.id, nextStatus);
  };

  // Close menu on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  // Priority color class
  const getPriorityClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'badge-priority-high';
      case 'medium':
        return 'badge-priority-medium';
      case 'low':
        return 'badge-priority-low';
      default:
        return 'badge-priority-medium';
    }
  };

  // Category color class
  const getCategoryClass = (category) => {
    switch (category?.toLowerCase()) {
      case 'design':
        return 'badge-category-design';
      case 'development':
        return 'badge-category-dev';
      case 'content':
        return 'badge-category-content';
      case 'work':
        return 'badge-category-work';
      default:
        return 'badge-category-default';
    }
  };

  return (
    <article
      className={`task-item-card ${isCompleted ? 'task-completed' : ''}`}
      aria-label={`Task: ${task.title}`}
    >
      <div className="task-item-inner">
        {/* Main Content Row: Checkbox, Titles, and Actions (on mobile) */}
        <div className="task-left-section">
          <button
            type="button"
            className={`task-checkbox-btn ${isCompleted ? 'checked' : ''}`}
            onClick={handleToggleCompleted}
            aria-label={isCompleted ? `Mark "${task.title}" as incomplete` : `Mark "${task.title}" as complete`}
          >
            {isCompleted ? (
              <Check size={14} className="checkbox-check-icon" aria-hidden="true" />
            ) : (
              <span className="checkbox-empty" aria-hidden="true" />
            )}
          </button>

          <div className="task-content-block">
            <h3 className="task-title">
              <span className={isCompleted ? 'title-text-completed' : 'title-text'}>
                {task.title}
              </span>
            </h3>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
          </div>
        </div>

        {/* Badges: Category, Priority, Due Date */}
        <div className="task-meta-group">
          {task.category && (
            <span className={`task-badge ${getCategoryClass(task.category)}`}>
              {task.category}
            </span>
          )}

          <span className={`task-badge ${getPriorityClass(task.priority)}`}>
            {task.priority || 'Medium'}
          </span>

          {task.dueDate && (
            <div className="task-due-date" title={`Due date: ${task.dueDate}`}>
              <Calendar size={13} className="calendar-icon" aria-hidden="true" />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}
        </div>

        {/* Actions Menu (Three dots dropdown) */}
        <div className="task-actions-wrapper" ref={menuRef}>
          <button
            type="button"
            className="task-menu-trigger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-haspopup="true"
            aria-label={`More actions for task "${task.title}"`}
          >
            <MoreHorizontal size={18} aria-hidden="true" />
          </button>

          {menuOpen && (
            <div className="task-dropdown-menu" role="menu">
              <button
                type="button"
                className="dropdown-menu-item"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  openEditForm(task);
                }}
              >
                <Edit2 size={14} className="menu-item-icon" aria-hidden="true" />
                <span>Edit task</span>
              </button>

              {/* Status quick toggle options */}
              <div className="dropdown-divider" />
              <div className="dropdown-section-title">Change Status</div>
              {['To do', 'In progress', 'Completed'].map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`dropdown-menu-item ${task.status === s ? 'active-status' : ''}`}
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    updateTaskStatus(task.id, s);
                  }}
                >
                  {s === 'Completed' ? (
                    <CheckCircle size={14} className="menu-item-icon" aria-hidden="true" />
                  ) : (
                    <Clock size={14} className="menu-item-icon" aria-hidden="true" />
                  )}
                  <span>{s}</span>
                </button>
              ))}

              <div className="dropdown-divider" />
              <button
                type="button"
                className="dropdown-menu-item delete-item"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  openDeleteDialog(task);
                }}
              >
                <Trash2 size={14} className="menu-item-icon text-danger" aria-hidden="true" />
                <span>Delete task</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
