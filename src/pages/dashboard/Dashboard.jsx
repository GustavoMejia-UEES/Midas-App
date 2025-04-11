import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  UserIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user, loading, error } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>Por favor, inicia sesión para ver el dashboard</p>
        </div>
      </div>
    );
  }

  const renderIndividualDashboard = () => (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-foreground mb-4">Bienvenido, {user.name}</h2>
        <p className="text-muted-foreground">Plan: {user.plan}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-xl shadow-lg">
          <div className="flex items-center space-x-4">
            <ChatBubbleLeftRightIcon className="h-8 w-8 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Chats Activos</h3>
          </div>
          <p className="mt-2 text-muted-foreground">Gestiona tus conversaciones</p>
        </div>

        <div className="bg-card p-6 rounded-xl shadow-lg">
          <div className="flex items-center space-x-4">
            <ChartBarIcon className="h-8 w-8 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Estadísticas</h3>
          </div>
          <p className="mt-2 text-muted-foreground">Mira tu actividad</p>
        </div>

        <div className="bg-card p-6 rounded-xl shadow-lg">
          <div className="flex items-center space-x-4">
            <Cog6ToothIcon className="h-8 w-8 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Configuración</h3>
          </div>
          <p className="mt-2 text-muted-foreground">Personaliza tu experiencia</p>
        </div>
      </div>
    </div>
  );

  const renderProfessionalDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">Panel Profesional</h2>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          Configuración
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-foreground">Chats Profesionales</h3>
          <div className="mt-4 space-y-4">
            {/* Lista de chats activos */}
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-foreground">Estadísticas</h3>
          <p className="mt-2 text-muted-foreground">Métricas profesionales</p>
          {/* Gráficos y estadísticas */}
        </div>
      </div>
    </div>
  );

  const renderInstitutionalDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">Panel Institucional</h2>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          Administración
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-foreground">Gestión de Usuarios</h3>
          <div className="mt-4 space-y-4">
            {/* Lista de usuarios */}
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-foreground">Analíticas</h3>
          <p className="mt-2 text-muted-foreground">Reportes institucionales</p>
          {/* Gráficos y reportes */}
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => {
    switch (user.plan) {
      case 'basic':
        return renderIndividualDashboard();
      case 'premium':
        return renderProfessionalDashboard();
      case 'institutional':
        return renderInstitutionalDashboard();
      default:
        return renderIndividualDashboard();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {renderDashboard()}
    </div>
  );
};

export default Dashboard; 