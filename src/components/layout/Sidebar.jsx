import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { 
    ArrowLeftOnRectangleIcon, 
    HomeIcon,
    UserIcon,
    Cog6ToothIcon,
    UsersIcon,
    BookOpenIcon,
    CalendarIcon,
    AcademicCapIcon,
    ChatBubbleLeftRightIcon,
    FolderIcon,
    ChartBarIcon,
    MoonIcon,
    SunIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ user, onLogout, navigationItems = [] }) => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    const getRoleBadge = () => {
        switch (user?.role) {
            case 'admin':
                return <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Admin</span>;
            case 'teacher':
                return <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Docente</span>;
            case 'premium':
                return <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Premium</span>;
            case 'institutional':
                return <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Institucional</span>;
            default:
                return <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Estudiante</span>;
        }
    };

    const getIconForPath = (path) => {
        switch (path) {
            case '/dashboard':
                return <HomeIcon className="h-5 w-5" />;
            case '/profile':
                return <UserIcon className="h-5 w-5" />;
            case '/settings':
                return <Cog6ToothIcon className="h-5 w-5" />;
            case '/admin/users':
            case '/teacher/students':
                return <UsersIcon className="h-5 w-5" />;
            case '/admin/guides':
            case '/teacher/courses':
                return <BookOpenIcon className="h-5 w-5" />;
            case '/admin/lessons':
            case '/teacher/lessons':
            case '/lessons':
                return <AcademicCapIcon className="h-5 w-5" />;
            case '/teacher/calendar':
                return <CalendarIcon className="h-5 w-5" />;
            case '/premium-lessons':
                return <AcademicCapIcon className="h-5 w-5" />;
            case '/chats':
                return <ChatBubbleLeftRightIcon className="h-5 w-5" />;
            case '/resources':
                return <FolderIcon className="h-5 w-5" />;
            case '/reports':
                return <ChartBarIcon className="h-5 w-5" />;
            default:
                return <HomeIcon className="h-5 w-5" />;
        }
    };

    return (
        <div className="w-64 fixed h-full bg-white dark:bg-card shadow-lg border-r border-border">
            <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                    <Link to="/dashboard" className="flex items-center">
                        <span className="text-2xl font-bold text-primary">MIDAS</span>
                    </Link>
                    {getRoleBadge()}
                </div>
                <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
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
                {navigationItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                            location.pathname === item.path
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                        }`}
                    >
                        <span className="mr-3">
                            {getIconForPath(item.path)}
                        </span>
                        {item.name}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-border">
                <button
                    onClick={onLogout}
                    className="flex items-center w-full px-4 py-3 text-muted-foreground hover:bg-secondary/50 hover:text-foreground rounded-lg transition-colors"
                >
                    <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default Sidebar; 