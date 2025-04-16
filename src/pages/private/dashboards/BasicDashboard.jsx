import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { BookOpenIcon, ChartBarIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const BasicDashboard = () => {
    const { currentUser } = useAuth();

    const stats = [
        {
            name: 'Lecciones Completadas',
            value: '0',
            icon: BookOpenIcon,
            description: 'Total de lecciones que has completado'
        },
        {
            name: 'Progreso General',
            value: '0%',
            icon: ChartBarIcon,
            description: 'Tu progreso en el curso'
        },
        {
            name: 'Próxima Lección',
            value: 'Introducción',
            icon: AcademicCapIcon,
            description: 'Tu próxima lección por completar'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="bg-card p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-foreground mb-2">Bienvenido, {currentUser?.email}</h2>
                <p className="text-muted-foreground">Plan Básico</p>
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

            <div className="bg-card p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-foreground mb-4">Próximos Pasos</h3>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <p className="text-muted-foreground">Completa tu primera lección</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <p className="text-muted-foreground">Explora los recursos básicos</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <p className="text-muted-foreground">Actualiza tu perfil</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasicDashboard; 