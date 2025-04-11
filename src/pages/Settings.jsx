import React, { useState } from 'react';
import { 
  BellIcon,
  KeyIcon,
  ShieldCheckIcon,
  LanguageIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('es');
  const [theme, setTheme] = useState('system');

  const settingsSections = [
    {
      title: 'Notificaciones',
      icon: BellIcon,
      settings: [
        {
          name: 'Notificaciones de mensajes',
          description: 'Recibir notificaciones cuando lleguen nuevos mensajes',
          value: notifications,
          onChange: setNotifications,
        },
      ],
    },
    {
      title: 'Seguridad',
      icon: ShieldCheckIcon,
      settings: [
        {
          name: 'Autenticación de dos factores',
          description: 'Añade una capa extra de seguridad a tu cuenta',
          value: false,
          onChange: () => {},
        },
      ],
    },
    {
      title: 'Idioma',
      icon: LanguageIcon,
      settings: [
        {
          name: 'Idioma de la interfaz',
          description: 'Selecciona el idioma en el que quieres usar la aplicación',
          value: language,
          onChange: setLanguage,
          options: [
            { value: 'es', label: 'Español' },
            { value: 'en', label: 'English' },
          ],
        },
      ],
    },
    {
      title: 'Apariencia',
      icon: InformationCircleIcon,
      settings: [
        {
          name: 'Tema',
          description: 'Elige cómo quieres que se vea la aplicación',
          value: theme,
          onChange: setTheme,
          options: [
            { value: 'light', label: 'Claro' },
            { value: 'dark', label: 'Oscuro' },
            { value: 'system', label: 'Sistema' },
          ],
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Configuración</h1>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          Guardar Cambios
        </button>
      </div>

      <div className="space-y-6">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.title} className="bg-white dark:bg-darkGray rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-primary">{section.title}</h2>
              </div>

              <div className="space-y-6">
                {section.settings.map((setting) => (
                  <div key={setting.name} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{setting.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{setting.description}</p>
                    </div>
                    {setting.options ? (
                      <select
                        value={setting.value}
                        onChange={(e) => setting.onChange(e.target.value)}
                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkGray focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {setting.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <button
                        onClick={() => setting.onChange(!setting.value)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          setting.value ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            setting.value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Settings; 