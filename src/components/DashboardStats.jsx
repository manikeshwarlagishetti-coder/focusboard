import React from 'react';
import { ListTodo, Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import StatCard from './StatCard';

export default function DashboardStats() {
  const { stats } = useTasks();

  return (
    <section className="dashboard-stats" aria-label="Dashboard Statistics">
      <div className="stats-grid">
        {/* Total Tasks Card (Desktop & Mobile) */}
        <StatCard
          icon={ListTodo}
          label="Total tasks"
          value={stats.total}
          subtext="Across all projects"
          iconTheme="purple"
        />

        {/* In Progress Card (Desktop) */}
        <div className="desktop-stat-wrapper">
          <StatCard
            icon={Clock}
            label="In progress"
            value={stats.inProgress}
            subtext="Keep the momentum"
            iconTheme="blue"
          />
        </div>

        {/* Completed Card (Desktop & Mobile) */}
        <StatCard
          icon={CheckCircle2}
          label="Completed"
          value={stats.completed}
          subtext="Great work this week"
          iconTheme="green"
        />

        {/* Completion Rate Card (Desktop) */}
        <div className="desktop-stat-wrapper">
          <StatCard
            icon={TrendingUp}
            label="Completion rate"
            value={`${stats.completionPercentage}%`}
            subtext={stats.total === 0 ? 'No tasks yet' : `${stats.completed} of ${stats.total} finished`}
            iconTheme="amber"
          />
        </div>
      </div>
    </section>
  );
}
