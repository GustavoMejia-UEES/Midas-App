import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Home, BookOpen, GraduationCap, BarChart2, Settings, Sun, Moon, LogOut } from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Inicio', path: '/dashboard', icon: Home },
    { name: 'Lecciones', path: '/dashboard/lessons', icon: BookOpen },
    { name: 'Cursos', path: '/dashboard/courses', icon: GraduationCap },
    { name: 'Progreso', path: '/dashboard/progress', icon: BarChart2 },
    { name: 'Configuración', path: '/dashboard/settings', icon: Settings }
  ];

  const handleNavigation = (path) => {
    navigate(path, { replace: true });
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h2 className="text-xl font-semibold">Midas</h2>
          <p className="text-sm text-muted-foreground">Bienvenido, {user?.name}</p>
        </div>

        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 space-y-2 border-t border-border">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-full px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-5 h-5 mr-2" />
                <span>Modo Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-5 h-5 mr-2" />
                <span>Modo Oscuro</span>
              </>
            )}
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-2" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 