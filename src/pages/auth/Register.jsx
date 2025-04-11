import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    idCard: '',
    plan: 'basic',
    country: '',
    city: '',
    companyName: '',
    companyId: '',
    department: ''
  });

  const { register, error: authError } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(
      formData.email,
      formData.password,
      formData.name,
      formData.idCard,
      formData.plan,
      formData.country,
      formData.city,
      formData.companyName,
      formData.companyId,
      formData.department
    );
    if (result.success) {
      navigate('/dashboard');
    }
  };

  const inputClassName = `mt-1 block w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
    theme === 'dark' ? 'bg-background text-foreground' : 'bg-white text-gray-900'
  }`;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className={`max-w-2xl w-full space-y-8 p-8 rounded-lg border border-border ${theme === 'dark' ? 'bg-card/50' : 'bg-card'}`}>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
            Crear una cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            O{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-medium text-primary hover:text-primary/80"
            >
              inicia sesión si ya tienes una cuenta
            </button>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground">
                Nombre completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="idCard" className="block text-sm font-medium text-foreground">
                Cédula o Pasaporte
              </label>
              <input
                id="idCard"
                name="idCard"
                type="text"
                required
                value={formData.idCard}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="plan" className="block text-sm font-medium text-foreground">
                Plan
              </label>
              <select
                id="plan"
                name="plan"
                required
                value={formData.plan}
                onChange={handleChange}
                className={inputClassName}
              >
                <option value="basic">Básico</option>
                <option value="premium">Premium</option>
                <option value="institutional">Institucional</option>
              </select>
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-foreground">
                País
              </label>
              <input
                id="country"
                name="country"
                type="text"
                required
                value={formData.country}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-foreground">
                Ciudad
              </label>
              <input
                id="city"
                name="city"
                type="text"
                required
                value={formData.city}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>

            {formData.plan !== 'basic' && (
              <>
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-foreground">
                    Nombre de la Empresa
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required={formData.plan !== 'basic'}
                    value={formData.companyName}
                    onChange={handleChange}
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="companyId" className="block text-sm font-medium text-foreground">
                    RUC o ID de Empresa
                  </label>
                  <input
                    id="companyId"
                    name="companyId"
                    type="text"
                    required={formData.plan !== 'basic'}
                    value={formData.companyId}
                    onChange={handleChange}
                    className={inputClassName}
                  />
                </div>
              </>
            )}

            {formData.plan === 'institutional' && (
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-foreground">
                  Departamento
                </label>
                <input
                  id="department"
                  name="department"
                  type="text"
                  required
                  value={formData.department}
                  onChange={handleChange}
                  className={inputClassName}
                />
              </div>
            )}
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
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register; 