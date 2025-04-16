import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const usePlanRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, loading: authLoading } = useAuth();

  useEffect(() => {
    const checkAndRedirect = async () => {
      if (currentUser && !authLoading) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            
            // Si es admin, no hacemos nada (ya se maneja en useAdmin)
            if (userData.role === 'admin') {
              return;
            }

            // Todos los usuarios van a /dashboard
            const currentPath = location.pathname;
            if (!currentPath.startsWith('/dashboard')) {
              console.log('Redirigiendo usuario a dashboard');
              navigate('/dashboard', { replace: true });
            }
          }
        } catch (error) {
          console.error('Error al verificar el plan:', error);
        }
      }
    };

    checkAndRedirect();
  }, [currentUser, authLoading, navigate, location.pathname]);

  return { loading: authLoading };
}; 