import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAdmin } from './useAdmin';

export const useUserRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();

  useEffect(() => {
    // No hacer nada si aún estamos cargando
    if (authLoading || adminLoading) {
      console.log('Cargando... authLoading:', authLoading, 'adminLoading:', adminLoading);
      return;
    }

    const currentPath = location.pathname;
    console.log('Ruta actual:', currentPath);

    // Si el usuario no está autenticado
    if (!currentUser) {
      if (!['/login', '/register'].includes(currentPath)) {
        console.log('Redirigiendo a login - Usuario no autenticado');
        navigate('/login', { replace: true });
      }
      return;
    }

    console.log('Usuario autenticado:', currentUser.uid);
    console.log('Rol del usuario:', currentUser.role);
    console.log('Es admin?', isAdmin);

    // Verificar si es admin usando tanto el hook como el rol del usuario
    const userIsAdmin = isAdmin || currentUser.role === 'admin';
    console.log('Verificación final de admin:', userIsAdmin);

    // Si el usuario está autenticado
    if (userIsAdmin) {
      if (!currentPath.startsWith('/admin')) {
        console.log('Redirigiendo a admin dashboard - Usuario admin');
        navigate('/admin/dashboard', { replace: true });
      }
    } else {
      if (!currentPath.startsWith('/dashboard')) {
        console.log('Redirigiendo a dashboard - Usuario normal');
        navigate('/dashboard', { replace: true });
      }
    }
  }, [currentUser, isAdmin, authLoading, adminLoading, navigate, location.pathname]);

  return { loading: authLoading || adminLoading };
}; 