import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

const MainLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen bg-background">
      {!isDashboardRoute && <Navbar />}
      <div className="flex">
        {user && isDashboardRoute && <Sidebar />}
        <main 
          className={`flex-1 transition-all duration-300 ${
            user && isDashboardRoute ? 'ml-64' : ''
          } max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 