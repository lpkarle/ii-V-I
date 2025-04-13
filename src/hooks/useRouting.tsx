import { useContext } from 'react';
import { RoutingContext } from '../contexts/routingContext';

export const useRouting = () => {
  const context = useContext(RoutingContext);

  if (!context) {
    throw new Error('useRouting must be used within a RoutingProvider');
  }

  return context;
};
