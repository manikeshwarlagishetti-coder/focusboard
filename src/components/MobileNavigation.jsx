import React from 'react';
import { LayoutGrid, CheckSquare, Calendar, Settings } from 'lucide-react';

export default function MobileNavigation({ activeTab = 'overview', onTabChange = () => {} }) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      <div className="mobile-nav-items">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="nav-icon-container">
                <Icon size={20} className="mobile-nav-icon" aria-hidden="true" />
                {isActive && <span className="nav-indicator-line" />}
              </div>
              <span className="mobile-nav-label">{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div className="mobile-home-indicator" aria-hidden="true" />
    </nav>
  );
}
