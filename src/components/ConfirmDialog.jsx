import React, { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export default function ConfirmDialog() {
  const { taskToDelete, closeDeleteDialog, confirmDelete } = useTasks();
  const cancelBtnRef = useRef(null);

  useEffect(() => {
    if (taskToDelete) {
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeDeleteDialog();
      };
      document.addEventListener('keydown', handleKeyDown);
      cancelBtnRef.current?.focus();
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [taskToDelete, closeDeleteDialog]);

  if (!taskToDelete) return null;

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeDeleteDialog();
      }}
    >
      <div
        className="confirm-dialog-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-desc"
      >
        <div className="confirm-icon-box" aria-hidden="true">
          <AlertTriangle size={24} className="confirm-warning-icon" />
        </div>

        <div className="confirm-content">
          <h3 id="confirm-dialog-title" className="confirm-title">
            Delete task?
          </h3>
          <p id="confirm-dialog-desc" className="confirm-description">
            Are you sure you want to delete &ldquo;<strong>{taskToDelete.title}</strong>&rdquo;? This action cannot be undone.
          </p>
        </div>

        <div className="confirm-actions">
          <button
            ref={cancelBtnRef}
            type="button"
            className="btn btn-secondary cancel-delete-btn"
            onClick={closeDeleteDialog}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger confirm-delete-btn"
            onClick={confirmDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
