import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export default function Toast() {
  const { toast, hideToast } = useTasks();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  if (!toast) return null;

  return (
    <div className={`toast-container toast-${toast.type || 'success'}`} role="status" aria-live="polite">
      <div className="toast-icon-wrapper" aria-hidden="true">
        {toast.type === 'error' ? (
          <AlertCircle size={18} className="toast-icon error" />
        ) : (
          <CheckCircle2 size={18} className="toast-icon success" />
        )}
      </div>
      <span className="toast-message">{toast.message}</span>
      <button
        type="button"
        className="toast-close-btn"
        onClick={hideToast}
        aria-label="Dismiss message"
      >
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  );
}
