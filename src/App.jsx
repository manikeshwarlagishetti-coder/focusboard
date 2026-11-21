import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FocusNotes from './components/FocusNotes';
import DashboardStats from './components/DashboardStats';
import TaskSection from './components/TaskSection';
import TaskForm from './components/TaskForm';
import ConfirmDialog from './components/ConfirmDialog';
import Toast from './components/Toast';
import MobileNavigation from './components/MobileNavigation';

export default function App() {
  const [activeNavTab, setActiveNavTab] = useState('overview');

  return (
    <TaskProvider>
      <div className="app-layout">
        {/* Desktop Sidebar Navigation */}
        <Sidebar activeTab={activeNavTab} onTabChange={setActiveNavTab} />

        {/* Main Dashboard Content Area */}
        <div className="main-viewport">
          <main className="dashboard-content" id="main-content">
            <Header />
            <FocusNotes />
            <DashboardStats />
            <TaskSection />
          </main>
        </div>

        {/* Modals and Overlays */}
        <TaskForm />
        <ConfirmDialog />
        <Toast />

        {/* Mobile Fixed Bottom Navigation */}
        <MobileNavigation activeTab={activeNavTab} onTabChange={setActiveNavTab} />
      </div>
    </TaskProvider>
  );
}
