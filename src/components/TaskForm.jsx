import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, ChevronDown } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export default function TaskForm() {
  const { isFormOpen, taskToEdit, closeForm, addTask, updateTask } = useTasks();

  const isEditing = Boolean(taskToEdit);

  // Form local state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To do');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('Design');
  const [errors, setErrors] = useState({});

  const titleInputRef = useRef(null);
  const modalRef = useRef(null);

  // Populate form if editing, or reset if creating
  useEffect(() => {
    if (isFormOpen) {
      if (taskToEdit) {
        setTitle(taskToEdit.title || '');
        setDescription(taskToEdit.description || '');
        setStatus(taskToEdit.status || 'To do');
        setPriority(taskToEdit.priority || 'Medium');
        setDueDate(taskToEdit.dueDate || '');
        setCategory(taskToEdit.category || 'Design');
      } else {
        // Today's date default or empty
        const today = new Date().toISOString().split('T')[0];
        setTitle('');
        setDescription('');
        setStatus('To do');
        setPriority('Medium');
        setDueDate(today);
        setCategory('Design');
      }
      setErrors({});

      // Focus first input after modal opens
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 50);
    }
  }, [isFormOpen, taskToEdit]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFormOpen) {
        closeForm();
      }
    };

    if (isFormOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isFormOpen, closeForm]);

  if (!isFormOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setErrors({ title: 'Task title is required.' });
      titleInputRef.current?.focus();
      return;
    }

    const taskPayload = {
      ...(taskToEdit || {}),
      title: trimmedTitle,
      description: description.trim(),
      status,
      priority,
      dueDate,
      category
    };

    if (isEditing) {
      updateTask(taskPayload);
    } else {
      addTask(taskPayload);
    }

    closeForm();
  };

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeForm();
      }}
    >
      <div
        className="task-form-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
        ref={modalRef}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <h2 id="task-form-title" className="modal-title">
              {isEditing ? 'Edit task' : 'Create new task'}
            </h2>
            <p className="modal-subtitle">
              {isEditing
                ? 'Update your task details to stay on top of your work.'
                : 'Add your task details to stay on top of your work.'}
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={closeForm}
            aria-label="Close task form"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="task-form" noValidate>
          {/* Task Title Field */}
          <div className="form-group">
            <label htmlFor="task-title" className="form-label">
              Task title <span className="required-star">*</span>
            </label>
            <input
              id="task-title"
              ref={titleInputRef}
              type="text"
              className={`form-input ${errors.title ? 'input-error' : ''}`}
              placeholder="e.g. Update pricing page"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
              }}
              required
            />
            {errors.title && (
              <span className="error-message" role="alert">
                {errors.title}
              </span>
            )}
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label htmlFor="task-description" className="form-label">
              Description
            </label>
            <textarea
              id="task-description"
              className="form-textarea"
              placeholder="Add notes about this task..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Row 1: Status & Priority */}
          <div className="form-row-2col">
            <div className="form-group">
              <label htmlFor="task-status" className="form-label">
                Status
              </label>
              <div className="select-input-container">
                <select
                  id="task-status"
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="To do">To do</option>
                  <option value="In progress">In progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <ChevronDown size={14} className="select-chevron-icon" aria-hidden="true" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="task-priority" className="form-label">
                Priority
              </label>
              <div className="select-input-container">
                <select
                  id="task-priority"
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <ChevronDown size={14} className="select-chevron-icon" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Row 2: Due date & Category */}
          <div className="form-row-2col">
            <div className="form-group">
              <label htmlFor="task-duedate" className="form-label">
                Due date
              </label>
              <div className="date-input-container">
                <Calendar size={16} className="date-input-icon" aria-hidden="true" />
                <input
                  id="task-duedate"
                  type="date"
                  className="form-input date-input"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="task-category" className="form-label">
                Category
              </label>
              <div className="select-input-container">
                <select
                  id="task-category"
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Design">Design</option>
                  <option value="Development">Development</option>
                  <option value="Content">Content</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                </select>
                <ChevronDown size={14} className="select-chevron-icon" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="required-helper-note">
            <span>* Required field</span>
          </div>

          <div className="modal-divider" />

          {/* Modal Actions Footer */}
          <div className="modal-footer-actions">
            <button
              type="button"
              className="btn btn-secondary cancel-form-btn"
              onClick={closeForm}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary submit-form-btn"
            >
              {isEditing ? 'Save changes' : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
