import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const useAdmin = () => {
    const { currentUser } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAdminStatus = async () => {
            if (!currentUser) {
                console.log('No hay usuario actual');
                setIsAdmin(false);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                
                console.log('Verificando rol de admin para:', currentUser.uid);
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    console.log('Datos del usuario en Firestore:', userData);
                    const isUserAdmin = userData.role === 'admin';
                    console.log('Es admin?', isUserAdmin);
                    setIsAdmin(isUserAdmin);
                } else {
                    console.warn('No se encontró el documento del usuario');
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error('Error al verificar el estado de administrador:', error);
                setError('Error al verificar permisos');
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        checkAdminStatus();
    }, [currentUser]);

    return { isAdmin, loading, error };
}; 