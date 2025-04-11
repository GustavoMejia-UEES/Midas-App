import React from 'react';
import { useAuth } from '../../context/AuthContext';
import BasicDashboard from './dashboards/BasicDashboard';
import PremiumDashboard from './dashboards/PremiumDashboard';
import InstitutionalDashboard from './dashboards/InstitutionalDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.plan) {
      case 'premium':
        return <PremiumDashboard />;
      case 'institutional':
        return <InstitutionalDashboard />;
      default:
        return <BasicDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderDashboard()}
    </div>
  );
};

export default Dashboard; 