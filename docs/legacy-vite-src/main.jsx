import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('React root element #root was not found in index.html.');
}

// Let React/Vite surface genuine startup exceptions normally. Do not replace the
// whole root DOM from global window error events; doing so can cause screen flashes
// and leaves React mounted against a DOM it no longer owns.
createRoot(rootElement).render(<App />);
