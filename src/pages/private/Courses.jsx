import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Courses = () => {
  const { user } = useAuth();

  const courses = [
    {
      id: 1,
      title: 'Introducción a la Programación',
      description: 'Aprende los fundamentos de la programación desde cero',
      instructor: 'Profesor Juan Pérez',
      duration: '8 semanas',
      students: 120,
      rating: 4.8,
      image: '/images/course1.jpg'
    },
    {
      id: 2,
      title: 'Desarrollo Web Moderno',
      description: 'Crea aplicaciones web con las últimas tecnologías',
      instructor: 'Profesora María García',
      duration: '12 semanas',
      students: 85,
      rating: 4.9,
      image: '/images/course2.jpg'
    },
    {
      id: 3,
      title: 'Inteligencia Artificial',
      description: 'Introducción a los conceptos básicos de IA',
      instructor: 'Profesor Carlos López',
      duration: '10 semanas',
      students: 65,
      rating: 4.7,
      image: '/images/course3.jpg'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cursos Disponibles</h1>
        <p className="text-muted-foreground">Explora nuestra selección de cursos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-card rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-secondary flex items-center justify-center">
              <span className="text-4xl text-muted-foreground">Curso {course.id}</span>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-muted-foreground mb-4">{course.description}</p>
              <div className="space-y-2 mb-4">
                <p className="text-sm"><span className="font-medium">Instructor:</span> {course.instructor}</p>
                <p className="text-sm"><span className="font-medium">Duración:</span> {course.duration}</p>
                <p className="text-sm"><span className="font-medium">Estudiantes:</span> {course.students}</p>
                <p className="text-sm"><span className="font-medium">Calificación:</span> {course.rating}/5</p>
              </div>
              <button className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors">
                Ver Curso
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses; 