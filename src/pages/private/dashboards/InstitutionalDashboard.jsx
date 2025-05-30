import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { 
    BookOpenIcon, 
    ChartBarIcon, 
    AcademicCapIcon, 
    ChatBubbleLeftRightIcon,
    DocumentTextIcon,
    UserGroupIcon,
    BuildingOfficeIcon,
    ChartPieIcon
} from '@heroicons/react/24/outline';

const InstitutionalDashboard = () => {
    const { currentUser } = useAuth();

    const stats = [
        {
            name: 'Miembros del Equipo',
            value: '25',
            icon: UserGroupIcon,
            description: 'Total de usuarios en tu organización'
        },
        {
            name: 'Progreso Institucional',
            value: '68%',
            icon: ChartBarIcon,
            description: 'Progreso general de la organización'
        },
        {
            name: 'Cursos Activos',
            value: '8',
            icon: BookOpenIcon,
            description: 'Cursos en progreso'
        },
        {
            name: 'Chats de Equipo',
            value: '12',
            icon: ChatBubbleLeftRightIcon,
            description: 'Conversaciones activas'
        },
        {
            name: 'Recursos Compartidos',
            value: '45',
            icon: DocumentTextIcon,
            description: 'Recursos disponibles para el equipo'
        },
        {
            name: 'Departamentos',
            value: '5',
            icon: BuildingOfficeIcon,
            description: 'Departamentos activos'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="bg-card p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-foreground mb-2">Bienvenido, {currentUser?.email}</h2>
                <p className="text-muted-foreground">Plan Institucional - {currentUser?.companyName}</p>
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
                    <h3 className="text-lg font-semibold text-foreground mb-4">Reportes de Equipo</h3>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <p className="text-muted-foreground">Progreso por departamento</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <p className="text-muted-foreground">Actividad de usuarios</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <p className="text-muted-foreground">Tasas de finalización</p>
                        </div>
                    </div>
                </div>

                <div className="bg-card p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Gestión Institucional</h3>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <p className="text-muted-foreground">Administrar departamentos</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <p className="text-muted-foreground">Asignar cursos</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <p className="text-muted-foreground">Configurar permisos</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstitutionalDashboard; 