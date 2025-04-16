import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const features = [
    {
        title: 'Análisis Inteligente',
        description: 'Obtén insights detallados sobre tus finanzas con la ayuda de IA',
        icon: ArrowRightIcon
    },
    {
        title: 'Recomendaciones Personalizadas',
        description: 'Sugerencias adaptadas a tu perfil financiero y objetivos',
        icon: ArrowRightIcon
    },
    {
        title: 'Seguimiento en Tiempo Real',
        description: 'Monitorea tus finanzas y recibe alertas importantes',
        icon: ArrowRightIcon
    }
];

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="text-center py-20">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                    Tu Asistente Financiero Inteligente
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    MIDAS te ayuda a tomar mejores decisiones financieras con la potencia de la inteligencia artificial
                </p>
                <div className="flex justify-center space-x-4">
                    <Link
                        to="/register"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90"
                    >
                        Comenzar Ahora
                        <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                        to="/pricing"
                        className="inline-flex items-center px-6 py-3 border border-primary text-base font-medium rounded-md text-primary hover:bg-primary/5"
                    >
                        Ver Planes
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-card">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            Características Principales
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Todo lo que necesitas para mejorar tus finanzas
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="p-6 rounded-lg bg-background border border-border hover:border-primary transition-colors"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <feature.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home; 