import React from 'react';
import { useAuth } from '../../../context/AuthContext';

const PremiumDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Bienvenido, {user?.name}</h1>
        <p className="text-muted-foreground">Plan Premium - {user?.companyName}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Estadísticas generales */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-2">Estadísticas Generales</h2>
          <div className="space-y-4">
            <div>
              <p className="text-muted-foreground">Total Estudiantes</p>
              <p className="text-2xl font-bold text-foreground">24</p>
            </div>
            <div>
              <p className="text-muted-foreground">Cursos Activos</p>
              <p className="text-2xl font-bold text-foreground">5</p>
            </div>
          </div>
        </div>

        {/* Cursos activos */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-2">Cursos Activos</h2>
          <ul className="space-y-4">
            <li>
              <div className="flex justify-between items-center">
                <span className="text-foreground">Programación Web</span>
                <span className="text-primary">12 estudiantes</span>
              </div>
              <div className="h-2 bg-secondary rounded-full mt-2">
                <div className="h-2 bg-primary rounded-full w-3/4"></div>
              </div>
            </li>
            <li>
              <div className="flex justify-between items-center">
                <span className="text-foreground">Base de Datos</span>
                <span className="text-primary">8 estudiantes</span>
              </div>
              <div className="h-2 bg-secondary rounded-full mt-2">
                <div className="h-2 bg-primary rounded-full w-1/2"></div>
              </div>
            </li>
          </ul>
        </div>

        {/* Actividad reciente */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-2">Actividad Reciente</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
              <span className="text-foreground">Nuevo estudiante registrado</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
              <span className="text-foreground">Curso completado por 3 estudiantes</span>
            </li>
          </ul>
        </div>

        {/* Calificaciones pendientes */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-2">Calificaciones Pendientes</h2>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span className="text-foreground">Tarea de JavaScript</span>
              <span className="text-primary">5 pendientes</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-foreground">Proyecto Final</span>
              <span className="text-primary">3 pendientes</span>
            </li>
          </ul>
        </div>

        {/* Próximas clases */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-2">Próximas Clases</h2>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span className="text-foreground">Clase de React</span>
              <span className="text-muted-foreground">Mañana 10:00 AM</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-foreground">Revisión de Proyectos</span>
              <span className="text-muted-foreground">Viernes 2:00 PM</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PremiumDashboard; 