import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loginLoading, setLoginLoading] = useState(false);

    const updateUserData = useCallback(async (user) => {
        try {
            if (!user) {
                setCurrentUser(null);
                return;
            }

            console.log('Actualizando datos del usuario:', user.uid);
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            
            if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log('Datos del usuario encontrados:', userData);
                const updatedUser = { 
                    ...user, 
                    ...userData,
                    role: userData.role || 'user'
                };
                console.log('Usuario actualizado con rol:', updatedUser.role);
                setCurrentUser(updatedUser);
            } else {
                console.log('Creando nuevo documento de usuario');
                await setDoc(doc(db, 'users', user.uid), {
                    email: user.email,
                    role: 'user',
                    createdAt: serverTimestamp(),
                    lastLogin: serverTimestamp()
                });
                setCurrentUser({ ...user, role: 'user' });
            }
        } catch (error) {
            console.error('Error al cargar datos del usuario:', error);
            setError('Error al cargar los datos del usuario');
            setCurrentUser(null);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            try {
                if (user) {
                    await updateUserData(user);
                } else {
                    setCurrentUser(null);
                }
            } catch (error) {
                console.error('Error en onAuthStateChanged:', error);
                setCurrentUser(null);
            } finally {
                setLoading(false);
            }
        });

        return unsubscribe;
    }, [updateUserData]);

    const login = useCallback(async (email, password) => {
        try {
            setLoginLoading(true);
            setError(null);
            
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Actualizar lastLogin
            await setDoc(doc(db, 'users', user.uid), {
                lastLogin: serverTimestamp()
            }, { merge: true });

            // Actualizar datos del usuario
            await updateUserData(user);
            
            return { success: true };
        } catch (error) {
            console.error('Error en login:', error);
            let errorMessage = 'Error al iniciar sesión';
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = 'Usuario no encontrado';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Contraseña incorrecta';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Correo electrónico inválido';
                    break;
                default:
                    errorMessage = error.message;
            }
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoginLoading(false);
        }
    }, [updateUserData]);

    const logout = useCallback(async () => {
        try {
            await signOut(auth);
            setCurrentUser(null);
        } catch (error) {
            console.error('Error en logout:', error);
            setError('Error al cerrar sesión');
        }
    }, []);

    const value = {
        currentUser,
        loading,
        loginLoading,
        error,
        login,
        logout,
        updateUserData
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 