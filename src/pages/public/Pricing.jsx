import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Pricing = () => {
  const { theme } = useTheme();

  const plans = [
    {
      name: 'Básico',
      price: 'Gratis',
      features: [
        'Acceso a lecciones básicas',
        'Progreso limitado',
        'Soporte por correo electrónico',
        'Contenido básico'
      ]
    },
    {
      name: 'Premium',
      price: '$9.99/mes',
      features: [
        'Acceso a todas las lecciones',
        'Progreso ilimitado',
        'Soporte prioritario',
        'Contenido premium',
        'Certificados de finalización'
      ]
    },
    {
      name: 'Institucional',
      price: 'Personalizado',
      features: [
        'Acceso completo para equipos',
        'Panel de administración',
        'Soporte dedicado',
        'Contenido personalizado',
        'Analíticas avanzadas',
        'API de integración'
      ]
    }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">Planes y Precios</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Elige el plan que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg border border-border p-6 ${
                theme === 'dark' ? 'bg-card/50' : 'bg-card'
              }`}
            >
              <h2 className="text-2xl font-bold text-foreground">{plan.name}</h2>
              <p className="mt-4 text-3xl font-bold text-primary">{plan.price}</p>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-foreground">
                    <svg
                      className="h-5 w-5 text-primary mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 w-full py-2 px-4 rounded-lg ${
                  plan.name === 'Premium'
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'border border-primary text-primary hover:bg-primary/10'
                }`}
              >
                {plan.name === 'Premium' ? 'Comenzar ahora' : 'Más información'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing; 