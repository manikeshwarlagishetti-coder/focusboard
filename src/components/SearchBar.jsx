import React from 'react';
import { Search, X } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useTasks();

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div className="search-bar-wrapper">
      <label htmlFor="task-search-input" className="sr-only">
        Search tasks by title or description
      </label>
      <div className="search-input-container">
        <Search size={16} className="search-icon" aria-hidden="true" />
        <input
          id="task-search-input"
          type="text"
          className="search-input"
          placeholder="Find a task..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoComplete="off"
        />
        {searchQuery && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={handleClear}
            aria-label="Clear search input"
          >
            <X size={14} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
