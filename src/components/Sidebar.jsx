import React from 'react';
import { LayoutGrid, CheckSquare, Calendar, Settings } from 'lucide-react';

export default function Sidebar({ activeTab = 'overview', onTabChange = () => {} }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'tasks', label: 'My tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="sidebar" aria-label="Main Navigation">
      {/* Brand / Logo */}
      <div className="sidebar-brand">
        <div className="brand-logo" aria-hidden="true">
          <span className="logo-dot"></span>
          <span className="logo-dot"></span>
          <span className="logo-dot"></span>
          <span className="logo-dot"></span>
        </div>
        <span className="brand-title">FocusBoard</span>
      </div>

      {/* Navigation Section */}
      <div className="sidebar-section">
        <nav className="sidebar-nav" aria-label="Sidebar Menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => onTabChange(item.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="nav-icon" size={18} aria-hidden="true" />
                <span className="nav-label">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Workspace footnote */}
      <div className="sidebar-footer">
        <div className="workspace-badge">
          <span className="workspace-label">WORKSPACE</span>
          <span className="workspace-name">Personal Workspace</span>
        </div>
      </div>
    </aside>
  );
}
