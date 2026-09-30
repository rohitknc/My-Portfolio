import React from 'react';
import { createRoot } from 'react-dom/client';

const root = document.getElementById('root');

function showError(error) {
  const message = error instanceof Error ? error.message : String(error);
  root.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px;background:#f7f9fc;font-family:Inter,Arial,sans-serif;color:#172033">
      <div style="max-width:720px;width:100%;background:#fff;border:1px solid #e5eaf1;border-radius:16px;padding:28px;box-shadow:0 18px 50px rgba(31,55,86,.10)">
        <div style="font-size:13px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#c62828">Portfolio startup error</div>
        <h1 style="margin:10px 0 8px;font-size:28px">The app could not start.</h1>
        <p style="margin:0 0 16px;color:#5f6b7a;line-height:1.6">Refresh the page once. If this message remains, the exact error below identifies the failing module.</p>
        <pre style="margin:0;padding:16px;border-radius:10px;background:#f3f5f8;overflow:auto;white-space:pre-wrap;color:#263238">${message.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre>
      </div>
    </div>`;
}

window.addEventListener('error', (event) => showError(event.error || event.message));
window.addEventListener('unhandledrejection', (event) => showError(event.reason));

if (!root) {
  throw new Error('React root element #root was not found in index.html.');
}

import('./App.jsx')
  .then(({ default: App }) => createRoot(root).render(<App />))
  .catch(showError);
