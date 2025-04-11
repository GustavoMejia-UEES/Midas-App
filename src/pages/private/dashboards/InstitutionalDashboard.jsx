import React from 'react';
import { useAuth } from '../../../context/AuthContext';

const InstitutionalDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Bienvenido, {user?.name}</h1>
        <p className="text-muted-foreground">Plan Institucional - {user?.companyName}</p>
        <p className="text-sm text-muted-foreground">Departamento: {user?.department}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Estadísticas institucionales */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-2">Estadísticas Institucionales</h2>
          <div className="space-y-4">
            <div>
              <p className="text-muted-foreground">Total Estudiantes</p>
              <p className="text-2xl font-bold text-foreground">156</p>
            </div>
            <div>
              <p className="text-muted-foreground">Profesores Activos</p>
              <p className="text-2xl font-bold text-foreground">12</p>
            </div>
            <div>
              <p className="text-muted-foreground">Cursos Activos</p>
              <p className="text-2xl font-bold text-foreground">24</p>
            </div>
          </div>
        </div>

        {/* Departamentos */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-2">Departamentos</h2>
          <ul className="space-y-4">
            <li>
              <div className="flex justify-between items-center">
                <span className="text-foreground">Desarrollo de Software</span>
                <span className="text-primary">45 estudiantes</span>
              </div>
              <div className="h-2 bg-secondary rounded-full mt-2">
                <div className="h-2 bg-primary rounded-full w-3/4"></div>
              </div>
            </li>
            <li>
              <div className="flex justify-between items-center">
                <span className="text-foreground">Base de Datos</span>
                <span className="text-primary">32 estudiantes</span>
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
              <span className="text-foreground">Nuevo profesor registrado</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
              <span className="text-foreground">Curso completado por 15 estudiantes</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
              <span className="text-foreground">Nuevo departamento creado</span>
            </li>
          </ul>
        </div>

        {/* Reportes pendientes */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-2">Reportes Pendientes</h2>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span className="text-foreground">Reporte Mensual</span>
              <span className="text-primary">Pendiente</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-foreground">Evaluación de Profesores</span>
              <span className="text-primary">Pendiente</span>
            </li>
          </ul>
        </div>

        {/* Próximas reuniones */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-2">Próximas Reuniones</h2>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span className="text-foreground">Reunión de Departamentos</span>
              <span className="text-muted-foreground">Lunes 10:00 AM</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-foreground">Evaluación de Cursos</span>
              <span className="text-muted-foreground">Miércoles 2:00 PM</span>
            </li>
          </ul>
        </div>

        {/* Estadísticas de rendimiento */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-2">Rendimiento General</h2>
          <div className="space-y-4">
            <div>
              <p className="text-muted-foreground">Tasa de Completación</p>
              <div className="h-2 bg-secondary rounded-full mt-2">
                <div className="h-2 bg-primary rounded-full w-4/5"></div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">80%</p>
            </div>
            <div>
              <p className="text-muted-foreground">Satisfacción Estudiantil</p>
              <div className="h-2 bg-secondary rounded-full mt-2">
                <div className="h-2 bg-primary rounded-full w-9/10"></div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">90%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionalDashboard; 