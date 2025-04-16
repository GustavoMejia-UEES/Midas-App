import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import AdminRoute from '../../components/AdminRoute';
import CreateGuideForm from '../../components/admin/CreateGuideForm';

const AdminDashboard = () => {
    const { currentUser } = useAuth();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalGuides: 0,
        totalLessons: 0,
        activeUsers: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch total users
                const usersSnapshot = await getDocs(collection(db, 'users'));
                const totalUsers = usersSnapshot.size;

                // Fetch total guides
                const guidesSnapshot = await getDocs(collection(db, 'guides'));
                const totalGuides = guidesSnapshot.size;

                // Fetch total lessons
                const lessonsSnapshot = await getDocs(collection(db, 'lessons'));
                const totalLessons = lessonsSnapshot.size;

                // Calculate active users (users who logged in within last 30 days)
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                
                const activeUsersQuery = query(
                    collection(db, 'users'),
                    where('lastLogin', '>=', thirtyDaysAgo)
                );
                const activeUsersSnapshot = await getDocs(activeUsersQuery);
                const activeUsers = activeUsersSnapshot.size;

                setStats({
                    totalUsers,
                    totalGuides,
                    totalLessons,
                    activeUsers
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <AdminRoute>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-card p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Total Usuarios</h3>
                        <p className="text-3xl font-bold">{stats.totalUsers}</p>
                    </div>
                    <div className="bg-card p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Total Guías</h3>
                        <p className="text-3xl font-bold">{stats.totalGuides}</p>
                    </div>
                    <div className="bg-card p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Total Lecciones</h3>
                        <p className="text-3xl font-bold">{stats.totalLessons}</p>
                    </div>
                    <div className="bg-card p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Usuarios Activos</h3>
                        <p className="text-3xl font-bold">{stats.activeUsers}</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <button className="bg-primary text-primary-foreground p-4 rounded-lg hover:bg-primary/90">
                        Crear Nueva Guía
                    </button>
                    <button className="bg-primary text-primary-foreground p-4 rounded-lg hover:bg-primary/90">
                        Crear Nueva Lección
                    </button>
                    <button className="bg-primary text-primary-foreground p-4 rounded-lg hover:bg-primary/90">
                        Gestionar Usuarios
                    </button>
                </div>
            </div>
        </AdminRoute>
    );
};

export default AdminDashboard; 