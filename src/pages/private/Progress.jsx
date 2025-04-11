import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Progress = () => {
  const { user } = useAuth();

  const stats = {
    totalCourses: 5,
    completedCourses: 2,
    inProgressCourses: 2,
    totalLessons: 30,
    completedLessons: 12,
    averageScore: 85,
    timeSpent: '45 horas'
  };

  const recentAchievements = [
    {
      id: 1,
      title: 'Curso Completado',
      description: 'Has completado el curso de React Fundamentals',
      date: '2024-03-10',
      icon: '🏆'
    },
    {
      id: 2,
      title: 'Lección Destacada',
      description: 'Obtuviste 100% en la lección de Hooks',
      date: '2024-03-08',
      icon: '⭐'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Mi Progreso</h1>
        <p className="text-muted-foreground">Sigue tu avance en el aprendizaje</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-2">Cursos</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold text-foreground">{stats.completedCourses}/{stats.totalCourses}</p>
              <p className="text-sm text-muted-foreground">Completados</p>
            </div>
            <div className="h-16 w-16">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeDasharray={`${(stats.completedCourses / stats.totalCourses) * 100}, 100`}
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-2">Lecciones</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold text-foreground">{stats.completedLessons}/{stats.totalLessons}</p>
              <p className="text-sm text-muted-foreground">Completadas</p>
            </div>
            <div className="h-16 w-16">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeDasharray={`${(stats.completedLessons / stats.totalLessons) * 100}, 100`}
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-2">Puntuación Promedio</h3>
          <div className="flex items-center">
            <p className="text-3xl font-bold text-foreground">{stats.averageScore}%</p>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-2">Tiempo de Estudio</h3>
          <div className="flex items-center">
            <p className="text-3xl font-bold text-foreground">{stats.timeSpent}</p>
          </div>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg border border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">Logros Recientes</h2>
        <div className="space-y-4">
          {recentAchievements.map((achievement) => (
            <div key={achievement.id} className="flex items-start">
              <span className="text-2xl mr-4">{achievement.icon}</span>
              <div>
                <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                <p className="text-muted-foreground">{achievement.description}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(achievement.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress; 