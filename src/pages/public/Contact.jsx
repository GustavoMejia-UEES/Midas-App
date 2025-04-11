import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const Contact = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Form data:', formData);
  };

  const inputClassName = `mt-1 block w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
    theme === 'dark' ? 'bg-background text-foreground' : 'bg-white text-gray-900'
  }`;

  const contactMethods = [
    {
      title: 'Email',
      description: 'info@midas.com',
      icon: EnvelopeIcon,
    },
    {
      title: 'Teléfono',
      description: '+123 456 7890',
      icon: PhoneIcon,
    },
    {
      title: 'Dirección',
      description: 'Av. Principal 123, Ciudad',
      icon: MapPinIcon,
    },
    {
      title: 'Soporte',
      description: 'soporte@midas.com',
      icon: ChatBubbleLeftRightIcon,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">Contáctanos</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`rounded-lg border border-border p-6 ${theme === 'dark' ? 'bg-card/50' : 'bg-card'}`}>
            <h2 className="text-2xl font-bold text-foreground mb-4">Información de Contacto</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg
                  className="h-6 w-6 text-primary mr-3 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-foreground">Correo Electrónico</h3>
                  <p className="text-muted-foreground">soporte@midas.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg
                  className="h-6 w-6 text-primary mr-3 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-foreground">Teléfono</h3>
                  <p className="text-muted-foreground">+593 99 999 9999</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg
                  className="h-6 w-6 text-primary mr-3 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-foreground">Dirección</h3>
                  <p className="text-muted-foreground">Guayaquil, Ecuador</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`rounded-lg border border-border p-6 ${theme === 'dark' ? 'bg-card/50' : 'bg-card'}`}>
            <h2 className="text-2xl font-bold text-foreground mb-4">Envíanos un Mensaje</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={inputClassName}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 