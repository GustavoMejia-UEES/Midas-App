import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
  IdentificationIcon,
  CreditCardIcon,
  UserGroupIcon,
  GlobeAltIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Paso 1: Información Personal
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    idCard: '',
    birthDate: '',
    address: '',
    country: '',
    city: '',
    
    // Paso 2: Información de Pago
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    plan: 'basic', // basic, premium, institutional
    
    // Paso 3: Información específica del plan
    companyName: '',
    companyId: '',
    department: '',
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateIdCard = (id) => {
    // Validación básica de cédula ecuatoriana (10 dígitos)
    if (id.length !== 10 || !/^\d+$/.test(id)) {
      return false;
    }
    return true;
  };

  const validateRUC = (ruc) => {
    // Validación básica de RUC ecuatoriano (13 dígitos)
    if (ruc.length !== 13 || !/^\d+$/.test(ruc)) {
      return false;
    }
    return true;
  };

  const validateBirthDate = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    return birthDate < today;
  };

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || 
        !formData.phone || !formData.idCard || !formData.country || !formData.city) {
      setError('Todos los campos son obligatorios');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    if (!validateIdCard(formData.idCard)) {
      setError('La cédula debe tener 10 dígitos');
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
      setError('Todos los campos de pago son obligatorios');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (formData.plan === 'premium' || formData.plan === 'institutional') {
      if (!validateRUC(formData.companyId)) {
        setError('El RUC debe tener 13 dígitos');
        return false;
      }
    }

    if (formData.plan === 'basic') {
      if (!formData.birthDate || !formData.address) {
        setError('Para usuarios básicos, todos los campos son obligatorios');
        return false;
      }
      if (!validateBirthDate(formData.birthDate)) {
        setError('La fecha de nacimiento no puede ser futura');
        return false;
      }
    }

    if (formData.plan === 'premium') {
      if (!formData.companyName || !formData.companyId) {
        setError('Para usuarios premium, el nombre y RUC de la institución son obligatorios');
        return false;
      }
    }

    if (formData.plan === 'institutional') {
      if (!formData.companyName || !formData.companyId || !formData.department) {
        setError('Para usuarios institucionales, todos los campos son obligatorios');
        return false;
      }
    }

    return true;
  };

  const nextStep = () => {
    setError('');
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Solo proceder si estamos en el último paso y se hizo clic en "Crear cuenta"
    if (step !== 3) {
      return;
    }

    // Validar todos los pasos antes de proceder
    if (!validateStep1() || !validateStep2() || !validateStep3()) {
      return;
    }

    setLoading(true);

    try {
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
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Error al crear la cuenta. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      <div className="flex space-x-4">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`flex items-center ${
              s <= step ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                s <= step ? 'bg-primary text-white' : 'bg-muted'
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`w-16 h-1 mx-2 ${
                  s < step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground">
                Nombre completo
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Nombre completo"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="idCard" className="block text-sm font-medium text-foreground">
                Cédula de Identidad
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IdentificationIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="idCard"
                  name="idCard"
                  type="text"
                  required
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Cédula de Identidad"
                  value={formData.idCard}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Correo electrónico
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground">
                Teléfono
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Contraseña
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
                Confirmar contraseña
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-foreground">
                País
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <GlobeAltIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <select
                  id="country"
                  name="country"
                  required
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="">Selecciona un país</option>
                  <option value="EC">Ecuador</option>
                  <option value="CO">Colombia</option>
                  <option value="PE">Perú</option>
                  <option value="CL">Chile</option>
                  <option value="AR">Argentina</option>
                  <option value="MX">México</option>
                  <option value="ES">España</option>
                  <option value="US">Estados Unidos</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-foreground">
                Ciudad
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ciudad"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-4">
                Selecciona tu plan
              </label>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'basic', name: 'Básico', price: '$9.99/mes', features: ['Chat básico', '5GB almacenamiento'] },
                  { id: 'premium', name: 'Premium', price: '$19.99/mes', features: ['Chat avanzado', '20GB almacenamiento', 'Soporte prioritario'] },
                  { id: 'institutional', name: 'Institucional', price: 'Personalizado', features: ['Chat ilimitado', 'Almacenamiento ilimitado', 'Soporte 24/7'] },
                ].map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative rounded-lg border p-4 cursor-pointer ${
                      formData.plan === plan.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleChange({ target: { name: 'plan', value: plan.id } })}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground">{plan.price}</p>
                      </div>
                      {formData.plan === plan.id && (
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                          <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <ul className="mt-2 text-sm text-muted-foreground">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <svg className="h-4 w-4 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <label className="block text-sm font-medium text-foreground mb-4">
                Información de pago
              </label>
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-foreground">
                    Nombre del titular
                  </label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="cardName"
                      name="cardName"
                      type="text"
                      required
                      className="appearance-none block w-full pl-10 px-3 py-2 border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Nombre como aparece en la tarjeta"
                      value={formData.cardName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-foreground">
                    Número de tarjeta
                  </label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CreditCardIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="cardNumber"
                      name="cardNumber"
                      type="text"
                      required
                      className="appearance-none block w-full pl-10 px-3 py-2 border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-foreground">
                      Fecha de expiración
                    </label>
                    <input
                      id="expiryDate"
                      name="expiryDate"
                      type="text"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-foreground">
                      CVV
                    </label>
                    <input
                      id="cvv"
                      name="cvv"
                      type="text"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            {formData.plan === 'basic' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Información Adicional</h3>
                <div>
                  <label htmlFor="birthDate" className="block text-sm font-medium text-foreground">
                    Fecha de nacimiento
                  </label>
                  <input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={formData.birthDate}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-foreground">
                    Dirección
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Dirección completa"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {formData.plan === 'premium' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Información Profesional</h3>
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-foreground">
                    Nombre de la institución
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Nombre de la institución"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="companyId" className="block text-sm font-medium text-foreground">
                    RUC de la institución
                  </label>
                  <input
                    id="companyId"
                    name="companyId"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="RUC de la institución"
                    value={formData.companyId}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {formData.plan === 'institutional' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Información Institucional</h3>
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-foreground">
                    Nombre de la institución
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Nombre de la institución"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="companyId" className="block text-sm font-medium text-foreground">
                    RUC de la institución
                  </label>
                  <input
                    id="companyId"
                    name="companyId"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="RUC de la institución"
                    value={formData.companyId}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-foreground">
                    Departamento
                  </label>
                  <input
                    id="department"
                    name="department"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Departamento o área"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-2xl w-full space-y-8 p-8 bg-card rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
            Crear Cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {step === 1 && 'Información personal'}
            {step === 2 && 'Selección de plan y pago'}
            {step === 3 && 'Tipo de usuario'}
          </p>
        </div>

        {renderStepIndicator()}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {renderStepContent()}

          <div className="flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                Anterior
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 border border-transparent rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Siguiente
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creando cuenta...' : 'Crear cuenta'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm; 