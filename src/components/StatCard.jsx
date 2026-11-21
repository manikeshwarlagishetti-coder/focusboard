import React from 'react';

export default function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
  iconTheme = 'purple', // 'purple' | 'blue' | 'green' | 'amber'
  extraBadge
}) {
  return (
    <div className={`stat-card stat-theme-${iconTheme}`}>
      <div className="stat-card-header">
        <div className={`stat-icon-container theme-${iconTheme}`} aria-hidden="true">
          {Icon && <Icon size={20} className="stat-icon" />}
        </div>
        <div className="stat-label-wrap">
          <span className="stat-label">{label}</span>
          {extraBadge && <span className="stat-badge">{extraBadge}</span>}
        </div>
      </div>
      <div className="stat-card-body">
        <span className="stat-value">{value}</span>
        {subtext && <span className="stat-subtext">{subtext}</span>}
      </div>
    </div>
  );
}
