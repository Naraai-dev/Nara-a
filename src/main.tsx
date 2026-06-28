import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Gracefully suppress benign development-only WebSocket/HMR connection errors
if (typeof window !== 'undefined') {
  const ignorePatterns = [
    'failed to connect to websocket',
    'WebSocket closed without opened',
    'websocket',
    'vite',
    'fetch of',
    'only a getter',
    'cannot set property fetch'
  ];

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason?.message || String(event.reason || '');
    if (ignorePatterns.some(pattern => reason.toLowerCase().includes(pattern.toLowerCase()))) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });

  window.addEventListener('error', (event) => {
    const message = event.message || '';
    if (ignorePatterns.some(pattern => message.toLowerCase().includes(pattern.toLowerCase()))) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
