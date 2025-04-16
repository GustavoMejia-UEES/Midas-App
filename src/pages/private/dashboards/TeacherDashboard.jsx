import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { 
    BookOpenIcon, 
    UserGroupIcon, 
    AcademicCapIcon, 
    DocumentTextIcon,
    ChartBarIcon,
    CalendarIcon
} from '@heroicons/react/24/outline';

const TeacherDashboard = () => {
    const { currentUser } = useAuth();

    const stats = [
        {
            name: 'Cursos Activos',
            value: '3',
            icon: BookOpenIcon,
            description: 'Cursos que estás impartiendo'
        },
        {
            name: 'Estudiantes',
            value: '45',
            icon: UserGroupIcon,
            description: 'Total de estudiantes en tus cursos'
        },
        {
            name: 'Lecciones Creadas',
            value: '12',
            icon: AcademicCapIcon,
            description: 'Lecciones que has creado'
        },
        {
            name: 'Recursos',
            value: '8',
            icon: DocumentTextIcon,
            description: 'Recursos compartidos'
        },
        {
            name: 'Progreso Promedio',
            value: '75%',
            icon: ChartBarIcon,
            description: 'Progreso promedio de tus estudiantes'
        },
        {
            name: 'Próxima Clase',
            value: 'Lun 10:00',
            icon: CalendarIcon,
            description: 'Tu próxima clase programada'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="bg-card p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-foreground mb-2">Bienvenido, {currentUser?.email}</h2>
                <p className="text-muted-foreground">Panel de Docente</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-card p-6 rounded-xl shadow-lg">
                        <div className="flex items-center space-x-4">
                            <stat.icon className="h-8 w-8 text-primary" />
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">{stat.name}</h3>
                                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                            </div>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{stat.description}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Acciones Rápidas</h3>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <p className="text-muted-foreground">Crear nueva lección</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <p className="text-muted-foreground">Programar clase</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <p className="text-muted-foreground">Subir recursos</p>
                        </div>
                    </div>
                </div>

                <div className="bg-card p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Próximas Actividades</h3>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <p className="text-muted-foreground">Revisión de tareas pendientes</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <p className="text-muted-foreground">Sesión de tutoría</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <p className="text-muted-foreground">Reunión de docentes</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard; 