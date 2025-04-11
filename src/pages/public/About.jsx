import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LightBulbIcon, 
  UserGroupIcon, 
  RocketLaunchIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const About = () => {
  const teamMembers = [
    {
      name: 'Juan Pérez',
      role: 'Fundador & CEO',
      description: 'Experto en finanzas y educación con más de 10 años de experiencia.',
      icon: LightBulbIcon,
    },
    {
      name: 'María García',
      role: 'Directora de Educación',
      description: 'Especialista en pedagogía y desarrollo de contenido educativo.',
      icon: UserGroupIcon,
    },
    {
      name: 'Carlos López',
      role: 'CTO',
      description: 'Desarrollador senior con experiencia en IA y gamificación.',
      icon: RocketLaunchIcon,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Sobre{' '}
              <span className="text-primary">MIDAS</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Nuestra misión es democratizar la educación financiera a través de
              tecnología innovadora y experiencias de aprendizaje gamificadas.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Nuestra Misión
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                En MIDAS, creemos que la educación financiera es un derecho fundamental.
                Nuestra plataforma combina inteligencia artificial y gamificación para
                hacer el aprendizaje financiero accesible, divertido y efectivo para todos.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90"
              >
                Contáctanos
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="bg-background p-8 rounded-lg border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Nuestros Valores
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <LightBulbIcon className="h-6 w-6 text-primary mr-3 mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground">Innovación</h4>
                    <p className="text-muted-foreground">
                      Utilizamos tecnología de vanguardia para transformar la educación.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <UserGroupIcon className="h-6 w-6 text-primary mr-3 mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground">Accesibilidad</h4>
                    <p className="text-muted-foreground">
                      Hacemos que el aprendizaje financiero sea accesible para todos.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <RocketLaunchIcon className="h-6 w-6 text-primary mr-3 mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground">Impacto</h4>
                    <p className="text-muted-foreground">
                      Buscamos generar un impacto positivo en la vida de nuestros usuarios.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-xl text-muted-foreground">
              Conoce a las personas detrás de MIDAS
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="p-6 rounded-lg bg-background border border-border hover:border-primary transition-colors"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <member.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-primary mb-2">{member.role}</p>
                <p className="text-muted-foreground">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 