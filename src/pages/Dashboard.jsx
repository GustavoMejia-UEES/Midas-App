import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpenIcon, 
  AcademicCapIcon, 
  ChartBarIcon, 
  ClockIcon,
  TrophyIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const stats = [
    {
      name: 'Lecciones Completadas',
      value: '12',
      icon: BookOpenIcon,
      change: '+2 esta semana',
      changeType: 'positive'
    },
    {
      name: 'Puntos de Experiencia',
      value: '1,234',
      icon: TrophyIcon,
      change: '+150 hoy',
      changeType: 'positive'
    },
    {
      name: 'Tiempo de Estudio',
      value: '8.5h',
      icon: ClockIcon,
      change: '+2h esta semana',
      changeType: 'positive'
    },
    {
      name: 'Racha Actual',
      value: '5 días',
      icon: SparklesIcon,
      change: '¡Nuevo récord!',
      changeType: 'positive'
    }
  ];

  const recentLessons = [
    {
      id: 1,
      title: 'Introducción a la Programación',
      progress: 75,
      nextLesson: 'Variables y Tipos de Datos',
      icon: AcademicCapIcon
    },
    {
      id: 2,
      title: 'Estructuras de Control',
      progress: 50,
      nextLesson: 'Bucles y Condicionales',
      icon: AcademicCapIcon
    },
    {
      id: 3,
      title: 'Funciones y Métodos',
      progress: 25,
      nextLesson: 'Parámetros y Retorno',
      icon: AcademicCapIcon
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Bienvenido de vuelta, Estudiante</h1>
        <p className="mt-2 text-muted-foreground">Continúa tu aprendizaje donde lo dejaste</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-card p-6 shadow-sm border border-border"
          >
            <dt>
              <div className="absolute rounded-md bg-primary/10 p-3">
                <stat.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-muted-foreground">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
              <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                stat.changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Recent Lessons */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">Lecciones Recientes</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="relative overflow-hidden rounded-lg bg-card p-6 shadow-sm border border-border"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-md bg-primary/10 p-3">
                  <lesson.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">{lesson.title}</h3>
                  <p className="text-sm text-muted-foreground">Siguiente: {lesson.nextLesson}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progreso</span>
                  <span className="font-medium text-foreground">{lesson.progress}%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${lesson.progress}%` }}
                  />
                </div>
              </div>
              <Link
                to={`/lessons/${lesson.id}`}
                className="mt-4 block w-full rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                Continuar Lección
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Acciones Rápidas</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/lessons"
            className="flex items-center gap-4 rounded-lg bg-card p-4 shadow-sm border border-border hover:bg-secondary/50"
          >
            <BookOpenIcon className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-medium text-foreground">Explorar Lecciones</h3>
              <p className="text-sm text-muted-foreground">Descubre nuevas lecciones</p>
            </div>
          </Link>
          <Link
            to="/practice"
            className="flex items-center gap-4 rounded-lg bg-card p-4 shadow-sm border border-border hover:bg-secondary/50"
          >
            <ChartBarIcon className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-medium text-foreground">Práctica</h3>
              <p className="text-sm text-muted-foreground">Ejercicios y desafíos</p>
            </div>
          </Link>
          <Link
            to="/progress"
            className="flex items-center gap-4 rounded-lg bg-card p-4 shadow-sm border border-border hover:bg-secondary/50"
          >
            <TrophyIcon className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-medium text-foreground">Mi Progreso</h3>
              <p className="text-sm text-muted-foreground">Ver estadísticas</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 