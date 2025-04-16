import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Loader2 } from 'lucide-react';

const PlanDashboard = ({ children }) => {
  const { currentUser } = useAuth();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlan = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setPlan(userData.plan || 'basic');
          }
        } catch (error) {
          console.error('Error al cargar el plan:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadPlan();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Renderizar contenido según el plan
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {plan === 'basic' && 'Dashboard Básico'}
          {plan === 'basic_enhanced' && 'Dashboard Premium Personal'}
          {plan === 'professional' && 'Dashboard Profesional'}
          {plan === 'institutional' && 'Dashboard Institucional'}
        </h1>
        <div className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
          {plan === 'basic' && 'Plan Básico'}
          {plan === 'basic_enhanced' && 'Plan Premium Personal'}
          {plan === 'professional' && 'Plan Profesional'}
          {plan === 'institutional' && 'Plan Institucional'}
        </div>
      </div>
      
      {/* Contenido específico por plan */}
      <div className="grid gap-6">
        {plan === 'basic' && (
          <>
            {/* Contenido para plan básico */}
            <div className="bg-card p-4 rounded-lg border border-border">
              <h2 className="text-lg font-semibold mb-2">Límites del Plan Básico</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 3 chats diarios con IA</li>
                <li>• Acceso a lecciones básicas</li>
                <li>• Estadísticas básicas</li>
              </ul>
            </div>
            {children}
          </>
        )}
        
        {plan === 'basic_enhanced' && (
          <>
            {/* Contenido para plan premium personal */}
            <div className="bg-card p-4 rounded-lg border border-border">
              <h2 className="text-lg font-semibold mb-2">Beneficios Premium</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Chats ilimitados con IA</li>
                <li>• Acceso a todas las lecciones</li>
                <li>• Estadísticas avanzadas</li>
                <li>• Soporte prioritario</li>
              </ul>
            </div>
            {children}
          </>
        )}
        
        {plan === 'professional' && (
          <>
            {/* Contenido para plan profesional */}
            <div className="bg-card p-4 rounded-lg border border-border">
              <h2 className="text-lg font-semibold mb-2">Herramientas Profesionales</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Gestión de estudiantes</li>
                <li>• Creación de contenido</li>
                <li>• Análisis de progreso</li>
                <li>• Chats ilimitados con IA</li>
              </ul>
            </div>
            {children}
          </>
        )}
        
        {plan === 'institutional' && (
          <>
            {/* Contenido para plan institucional */}
            <div className="bg-card p-4 rounded-lg border border-border">
              <h2 className="text-lg font-semibold mb-2">Herramientas Institucionales</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Gestión de múltiples clases</li>
                <li>• Análisis de rendimiento</li>
                <li>• API de integración</li>
                <li>• Soporte 24/7</li>
                <li>• Chats ilimitados con IA</li>
              </ul>
            </div>
            {children}
          </>
        )}
      </div>
    </div>
  );
};

export default PlanDashboard; 