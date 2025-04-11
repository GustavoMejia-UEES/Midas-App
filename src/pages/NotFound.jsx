import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300">Página no encontrada</p>
      <Link 
        to="/" 
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound; 