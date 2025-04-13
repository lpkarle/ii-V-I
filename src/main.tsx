import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './components/App.tsx';
import { RoutingProvider } from './contexts/routingContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RoutingProvider>
      <App />
    </RoutingProvider>
  </StrictMode>
);
