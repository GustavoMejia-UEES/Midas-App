import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAdmin } from '../hooks/useAdmin';
import { Loader2 } from 'lucide-react';

const AdminRoute = ({ children }) => {
    const { currentUser, loading: authLoading } = useAuth();
    const { isAdmin, loading: adminLoading, error } = useAdmin();

    if (authLoading || adminLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="mt-2 text-muted-foreground">Verificando permisos...</p>
                </div>
            </div>
        );
    }

    if (error) {
        console.error('Error en AdminRoute:', error);
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-destructive text-center">
                    <p>Error al verificar permisos de administrador</p>
                    <p className="text-sm text-muted-foreground">Por favor, intenta nuevamente</p>
                </div>
            </div>
        );
    }

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default AdminRoute; 