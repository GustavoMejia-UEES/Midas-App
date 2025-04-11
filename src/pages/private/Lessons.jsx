import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Lessons = () => {
  const { user } = useAuth();

  const lessons = [
    {
      id: 1,
      title: 'Introducción a React',
      description: 'Aprende los fundamentos de React y su ecosistema',
      progress: 75,
      status: 'En progreso',
      lastAccessed: '2024-03-15'
    },
    {
      id: 2,
      title: 'Hooks en React',
      description: 'Domina el uso de hooks para el manejo de estado',
      progress: 30,
      status: 'En progreso',
      lastAccessed: '2024-03-14'
    },
    {
      id: 3,
      title: 'Context API',
      description: 'Aprende a manejar el estado global con Context',
      progress: 0,
      status: 'No iniciado',
      lastAccessed: null
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Mis Lecciones</h1>
        <p className="text-muted-foreground">Continúa tu aprendizaje</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-2">{lesson.title}</h2>
            <p className="text-muted-foreground mb-4">{lesson.description}</p>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Progreso</span>
                <span className="text-foreground">{lesson.progress}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div 
                  className="h-2 bg-primary rounded-full" 
                  style={{ width: `${lesson.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className={`px-2 py-1 rounded ${
                lesson.status === 'En progreso' ? 'bg-yellow-100 text-yellow-800' :
                lesson.status === 'No iniciado' ? 'bg-gray-100 text-gray-800' :
                'bg-green-100 text-green-800'
              }`}>
                {lesson.status}
              </span>
              {lesson.lastAccessed && (
                <span className="text-muted-foreground">
                  Último acceso: {new Date(lesson.lastAccessed).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lessons; 