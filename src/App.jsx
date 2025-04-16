import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import PublicLayout from './components/layout/PublicLayout';
import AdminRoute from './components/AdminRoute';
import DashboardRoute from './components/DashboardRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import AdminLayout from './components/admin/AdminLayout';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/private/Dashboard';
import Lessons from './pages/private/Lessons';
import Courses from './pages/private/Courses';
import Progress from './pages/private/Progress';
import Settings from './pages/private/Settings';
import NotFound from './pages/NotFound';
import Pricing from './pages/public/Pricing';
import Contact from './pages/public/Contact';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminGuides from './pages/admin/AdminGuides';
import AdminLessons from './pages/admin/AdminLessons';

const AdminLayoutWrapper = () => {
    return (
        <AdminRoute>
            <AdminLayout>
                <Outlet />
            </AdminLayout>
        </AdminRoute>
    );
};

const App = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    <Routes>
                        {/* Public Routes */}
                        <Route element={<PublicLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/pricing" element={<Pricing />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Route>

                        {/* Admin Routes */}
                        <Route element={<AdminLayoutWrapper />}>
                            <Route path="/admin/dashboard" element={<AdminDashboard />} />
                            <Route path="/admin/users" element={<AdminUsers />} />
                            <Route path="/admin/guides" element={<AdminGuides />} />
                            <Route path="/admin/lessons" element={<AdminLessons />} />
                        </Route>

                        {/* Private Routes */}
                        <Route element={<DashboardLayout />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/lessons" element={<Lessons />} />
                            <Route path="/courses" element={<Courses />} />
                            <Route path="/progress" element={<Progress />} />
                            <Route path="/settings" element={<Settings />} />
                        </Route>

                        {/* 404 Route */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
