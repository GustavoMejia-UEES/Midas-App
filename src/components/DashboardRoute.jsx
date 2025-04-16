import { useUserRedirect } from '../hooks/useUserRedirect';

const DashboardRoute = ({ children }) => {
  const { loading } = useUserRedirect();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return children;
};

export default DashboardRoute; 