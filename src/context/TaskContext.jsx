import React, { createContext, useContext, useState, useReducer, useEffect, useMemo } from 'react';
import { INITIAL_TASKS } from '../data/initialTasks';
import { calculateStatistics } from '../utils/statistics';
import { filterTasks, generateTaskId } from '../utils/taskHelpers';

const STORAGE_KEY = 'focusboard_tasks';

const TaskContext = createContext(null);

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_TASKS':
      return {
        ...state,
        tasks: action.payload
      };

    case 'ADD_TASK': {
      const newTask = {
        ...action.payload,
        id: action.payload.id || generateTaskId(),
        createdAt: new Date().toISOString()
      };
      return {
        ...state,
        tasks: [newTask, ...state.tasks]
      };
    }

    case 'UPDATE_TASK': {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );
      return {
        ...state,
        tasks: updatedTasks
      };
    }

    case 'DELETE_TASK': {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload)
      };
    }

    case 'UPDATE_TASK_STATUS': {
      const { id, status } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, status } : task
        )
      };
    }

    default:
      return state;
  }
};

export function TaskProvider({ children }) {
  // Load tasks from localStorage initially, or fallback to INITIAL_TASKS
  const [initialState] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return { tasks: parsed };
          }
        }
      }
    } catch (e) {
      console.warn('Error reading tasks from localStorage:', e);
    }
    return { tasks: INITIAL_TASKS };
  });

  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Sync state.tasks to localStorage on changes
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
      }
    } catch (e) {
      console.error('Error saving tasks to localStorage:', e);
    }
  }, [state.tasks]);

  // UI state for search & filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Modal & Dialog state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Toast state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  // Actions
  const addTask = (taskData) => {
    dispatch({ type: 'ADD_TASK', payload: taskData });
    showToast(`Task "${taskData.title}" created successfully.`);
  };

  const updateTask = (taskData) => {
    dispatch({ type: 'UPDATE_TASK', payload: taskData });
    showToast(`Task "${taskData.title}" updated successfully.`);
  };

  const deleteTask = (id) => {
    const task = state.tasks.find((t) => t.id === id);
    dispatch({ type: 'DELETE_TASK', payload: id });
    showToast(`Task "${task?.title || 'Task'}" deleted.`);
  };

  const updateTaskStatus = (id, newStatus) => {
    dispatch({ type: 'UPDATE_TASK_STATUS', payload: { id, status: newStatus } });
    showToast(`Status updated to "${newStatus}".`);
  };

  const openCreateForm = () => {
    setTaskToEdit(null);
    setIsFormOpen(true);
  };

  const openEditForm = (task) => {
    setTaskToEdit(task);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setTaskToEdit(null);
    setIsFormOpen(false);
  };

  const openDeleteDialog = (task) => {
    setTaskToDelete(task);
  };

  const closeDeleteDialog = () => {
    setTaskToDelete(null);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      closeDeleteDialog();
    }
  };

  // Dynamically derived stats and filtered tasks
  const stats = useMemo(() => calculateStatistics(state.tasks), [state.tasks]);

  const filteredTasks = useMemo(() => {
    return filterTasks(state.tasks, {
      search: searchQuery,
      status: statusFilter,
      priority: priorityFilter
    });
  }, [state.tasks, searchQuery, statusFilter, priorityFilter]);

  const value = {
    tasks: state.tasks,
    filteredTasks,
    stats,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    isFormOpen,
    taskToEdit,
    taskToDelete,
    openCreateForm,
    openEditForm,
    closeForm,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    toast,
    showToast,
    hideToast
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
