import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { 
    BookOpenIcon, 
    ChartBarIcon, 
    AcademicCapIcon, 
    ChatBubbleLeftRightIcon,
    DocumentTextIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';

const PremiumDashboard = () => {
    const { currentUser } = useAuth();

    const stats = [
        {
            name: 'Lecciones Premium',
            value: '12',
            icon: BookOpenIcon,
            description: 'Lecciones exclusivas disponibles'
        },
        {
            name: 'Progreso Premium',
            value: '45%',
            icon: ChartBarIcon,
            description: 'Tu progreso en contenido premium'
        },
        {
            name: 'Chats Activos',
            value: '3',
            icon: ChatBubbleLeftRightIcon,
            description: 'Conversaciones en curso'
        },
        {
            name: 'Recursos Premium',
            value: '25',
            icon: DocumentTextIcon,
            description: 'Recursos exclusivos disponibles'
        },
        {
            name: 'Comunidad',
            value: '150+',
            icon: UserGroupIcon,
            description: 'Miembros en la comunidad premium'
        },
        {
            name: 'Próxima Lección',
            value: 'Avanzada',
            icon: AcademicCapIcon,
            description: 'Tu próxima lección premium'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="bg-card p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-foreground mb-2">Bienvenido, {currentUser?.email}</h2>
                <p className="text-muted-foreground">Plan Premium</p>
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
                    <h3 className="text-lg font-semibold text-foreground mb-4">Beneficios Premium</h3>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <p className="text-muted-foreground">Acceso a todas las lecciones premium</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <p className="text-muted-foreground">Soporte prioritario en chats</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <p className="text-muted-foreground">Recursos exclusivos descargables</p>
                        </div>
                    </div>
                </div>

                <div className="bg-card p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Próximos Eventos</h3>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <p className="text-muted-foreground">Webinar: Técnicas Avanzadas</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <p className="text-muted-foreground">Sesión de Q&A con Expertos</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <p className="text-muted-foreground">Taller Práctico Premium</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PremiumDashboard; 