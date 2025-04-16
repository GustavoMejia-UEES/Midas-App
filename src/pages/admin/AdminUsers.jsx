import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle, Loader2 } from 'lucide-react';

const AdminUsers = () => {
    const { currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError(null);
                const usersSnapshot = await getDocs(collection(db, 'users'));
                const usersData = usersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Error al cargar los usuarios. Por favor, intenta nuevamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        if (!window.confirm('¿Estás seguro de que deseas cambiar el rol de este usuario?')) {
            return;
        }

        try {
            setUpdating(true);
            setError(null);
            const userRef = doc(db, 'users', userId);
            await updateDoc(userRef, {
                role: newRole,
                updatedAt: new Date()
            });
            
            setUsers(users.map(user => 
                user.id === userId ? { ...user, role: newRole } : user
            ));
        } catch (error) {
            console.error('Error updating user role:', error);
            setError('Error al actualizar el rol del usuario. Por favor, intenta nuevamente.');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="mt-2 text-muted-foreground">Cargando usuarios...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
                <p className="text-sm text-muted-foreground">
                    Total: {users.length} usuarios
                </p>
            </div>

            {error && (
                <div className="mb-6 p-4 rounded-lg bg-destructive/10 text-destructive flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    {error}
                </div>
            )}

            <div className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Usuario</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Rol</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Último acceso</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-secondary/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <span className="text-primary font-medium">
                                                    {user.email?.[0]?.toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="font-medium">{user.name || 'Sin nombre'}</div>
                                                <div className="text-sm text-muted-foreground">@{user.username || 'sin_usuario'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            user.role === 'admin'
                                                ? 'bg-primary/10 text-primary'
                                                : 'bg-secondary/50 text-muted-foreground'
                                        }`}>
                                            {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.lastLogin
                                            ? new Date(user.lastLogin.toDate()).toLocaleDateString()
                                            : 'Nunca'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleRoleChange(user.id, user.role === 'admin' ? 'user' : 'admin')}
                                            disabled={updating}
                                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                                                user.role === 'admin'
                                                    ? 'bg-destructive/10 text-destructive hover:bg-destructive/20'
                                                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                                            }`}
                                        >
                                            {updating ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : user.role === 'admin' ? (
                                                'Quitar Admin'
                                            ) : (
                                                'Hacer Admin'
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers; 