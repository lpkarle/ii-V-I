import { createContext, ReactNode, useEffect, useState } from 'react';

type RoutingContext = {
  page: string;
  navigate: (to: string) => void;
};

export const RoutingContext = createContext<RoutingContext | null>(null);

export const RoutingProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState('ii-V-I/fretboard-practice');

  useEffect(() => {
    const onPopState = () => {
      setPage(window.location.pathname.slice(1) || 'ii-V-I/home');
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, '', `/${to}`);
    setPage(to);
  };

  return (
    <RoutingContext.Provider value={{ page, navigate }}>
      {children}
    </RoutingContext.Provider>
  );
};
