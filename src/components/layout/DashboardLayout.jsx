import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Sidebar from './Sidebar';
import { Loader2 } from 'lucide-react';
import { usePlanRedirect } from '../../hooks/usePlanRedirect';

const DashboardLayout = () => {
    const { currentUser, logout } = useAuth();
    const { theme } = useTheme();
    const navigate = useNavigate();
    const { loading } = usePlanRedirect();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    if (loading || !currentUser) {
        return null;
    }

    const getNavigationItems = () => {
        const baseItems = [
            { name: 'Dashboard', path: '/dashboard', icon: '📊' },
            { name: 'Perfil', path: '/profile', icon: '👤' },
            { name: 'Configuración', path: '/settings', icon: '⚙️' },
        ];

        switch (currentUser.role) {
            case 'admin':
                return [
                    ...baseItems,
                    { name: 'Usuarios', path: '/admin/users', icon: '👥' },
                    { name: 'Guías', path: '/admin/guides', icon: '📚' },
                    { name: 'Lecciones', path: '/admin/lessons', icon: '📖' }
                ];
            case 'teacher':
                return [
                    ...baseItems,
                    { name: 'Mis Cursos', path: '/teacher/courses', icon: '📚' },
                    { name: 'Estudiantes', path: '/teacher/students', icon: '👥' },
                    { name: 'Lecciones', path: '/teacher/lessons', icon: '📖' },
                    { name: 'Calendario', path: '/teacher/calendar', icon: '📅' }
                ];
            case 'premium':
                return [
                    ...baseItems,
                    { name: 'Lecciones Premium', path: '/premium-lessons', icon: '🎓' },
                    { name: 'Chats', path: '/chats', icon: '💬' },
                    { name: 'Recursos', path: '/resources', icon: '📚' }
                ];
            case 'institutional':
                return [
                    ...baseItems,
                    { name: 'Equipo', path: '/team', icon: '👥' },
                    { name: 'Reportes', path: '/reports', icon: '📈' },
                    { name: 'Chats', path: '/chats', icon: '💬' },
                    { name: 'Recursos', path: '/resources', icon: '📚' }
                ];
            default:
                return [
                    ...baseItems,
                    { name: 'Lecciones', path: '/lessons', icon: '📖' }
                ];
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-background text-foreground' : 'bg-gray-50 text-gray-900'}`}>
            <div className="flex">
                <Sidebar 
                    user={currentUser} 
                    onLogout={handleLogout} 
                    navigationItems={getNavigationItems()}
                />
                <main className="flex-1 ml-64 p-6">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout; 