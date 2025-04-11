import React from 'react';
import { useAuth } from '../../../context/AuthContext';

const BasicDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Bienvenido, {user?.name}</h1>
        <p className="text-muted-foreground">Plan Básico</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Estadísticas básicas */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-2">Progreso General</h2>
          <p className="text-muted-foreground">Tu progreso en las lecciones</p>
          <div className="mt-4">
            <div className="h-2 bg-secondary rounded-full">
              <div className="h-2 bg-primary rounded-full w-1/3"></div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">33% completado</p>
          </div>
        </div>

        {/* Lecciones recientes */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-2">Lecciones Recientes</h2>
          <ul className="space-y-2">
            <li className="flex items-center justify-between">
              <span className="text-foreground">Introducción a la programación</span>
              <span className="text-primary">En progreso</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-foreground">Fundamentos de HTML</span>
              <span className="text-primary">Completado</span>
            </li>
          </ul>
        </div>

        {/* Próximas actividades */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-2">Próximas Actividades</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="text-foreground">Próxima lección: CSS Básico</span>
            </li>
            <li className="flex items-center">
              <span className="text-foreground">Ejercicio práctico pendiente</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BasicDashboard; 