import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error: authError } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  const inputClassName = `mt-1 block w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
    theme === 'dark' ? 'bg-background text-foreground' : 'bg-white text-gray-900'
  }`;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className={`max-w-md w-full space-y-8 p-8 rounded-lg border border-border ${theme === 'dark' ? 'bg-card/50' : 'bg-card'}`}>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            O{' '}
            <button
              onClick={() => navigate('/register')}
              className="font-medium text-primary hover:text-primary/80"
            >
              crea una cuenta nueva
            </button>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClassName}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClassName}
              />
            </div>
          </div>

          {authError && (
            <div className="text-destructive text-sm text-center">
              {authError}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 