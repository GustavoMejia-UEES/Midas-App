import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Dashboard = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className={`glass-card ${isDarkMode ? 'glass-card-dark' : 'glass-card-light'}`}>
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-secondary'} mb-2`}>
          ¡Bienvenido a MIDAS!
        </h1>
        <p className={isDarkMode ? 'text-textLight' : 'text-textLight'}>
          Tu asistente financiero personal
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Daily Progress */}
        <div className={`glass-card ${isDarkMode ? 'glass-card-dark' : 'glass-card-light'}`}>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-secondary'} mb-2`}>
            Progreso Diario
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">3/5</span>
            <span className={isDarkMode ? 'text-textLight' : 'text-textLight'}>
              tareas completadas
            </span>
          </div>
        </div>

        {/* AI Credits */}
        <div className={`glass-card ${isDarkMode ? 'glass-card-dark' : 'glass-card-light'}`}>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-secondary'} mb-2`}>
            Consultas IA
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-deepBlue">2/3</span>
            <span className={isDarkMode ? 'text-textLight' : 'text-textLight'}>
              consultas disponibles
            </span>
          </div>
        </div>

        {/* Learning Level */}
        <div className={`glass-card ${isDarkMode ? 'glass-card-dark' : 'glass-card-light'}`}>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-secondary'} mb-2`}>
            Nivel de Aprendizaje
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-emerald">Nivel 3</span>
            <span className={isDarkMode ? 'text-textLight' : 'text-textLight'}>
              intermedio
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`glass-card ${isDarkMode ? 'glass-card-dark' : 'glass-card-light'}`}>
        <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-secondary'} mb-4`}>
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="bg-primary/90 hover:bg-primary text-secondary p-4 rounded-lg transition-colors">
            Consultar Asistente
          </button>
          <button className="bg-deepBlue/90 hover:bg-deepBlue text-white p-4 rounded-lg transition-colors">
            Continuar Lección
          </button>
          <button className="bg-emerald/90 hover:bg-emerald text-white p-4 rounded-lg transition-colors">
            Ver Progreso
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 