import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { 
    ChartBarIcon, 
    UserGroupIcon, 
    BookOpenIcon, 
    AcademicCapIcon,
    ArrowLeftOnRectangleIcon,
    SunIcon,
    MoonIcon
} from '@heroicons/react/24/outline';

const AdminLayout = ({ children }) => {
    const { currentUser, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    const navigationItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: ChartBarIcon },
        { name: 'Usuarios', path: '/admin/users', icon: UserGroupIcon },
        { name: 'Guías', path: '/admin/guides', icon: BookOpenIcon },
        { name: 'Lecciones', path: '/admin/lessons', icon: AcademicCapIcon }
    ];

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div className="flex h-screen bg-background text-foreground">
            {/* Sidebar */}
            <div className={`w-64 fixed h-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg border-r border-border`}>
                <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between">
                        <Link to="/admin/dashboard" className="flex items-center">
                            <span className="text-2xl font-bold text-primary">MIDAS</span>
                        </Link>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Admin</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">{currentUser?.email}</p>
                        <button
                            onClick={toggleTheme}
                            className="p-1.5 rounded-lg text-muted-foreground hover:bg-secondary/50"
                            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                        >
                            {theme === 'dark' ? (
                                <SunIcon className="h-4 w-4" />
                            ) : (
                                <MoonIcon className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                                    location.pathname === item.path
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                                }`}
                            >
                                <Icon className="h-5 w-5 mr-3" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-border">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-muted-foreground hover:bg-secondary/50 hover:text-foreground rounded-lg transition-colors"
                    >
                        <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
                        Cerrar Sesión
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-64 overflow-auto">
                <div className="p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout; 