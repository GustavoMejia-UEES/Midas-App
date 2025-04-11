import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
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

const DashboardLayout = () => {
    return (
        <ProtectedRoute>
            <div className="flex">
                <Outlet />
            </div>
        </ProtectedRoute>
    );
};

const AppContent = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="contact" element={<Contact />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="dashboard" element={<DashboardLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="lessons" element={<Lessons />} />
                    <Route path="courses" element={<Courses />} />
                    <Route path="progress" element={<Progress />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <ThemeProvider>
                    <AppContent />
                </ThemeProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;
