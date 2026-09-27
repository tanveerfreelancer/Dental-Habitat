import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '../styles/index.css';
import LegalPage from './LegalPage';

const doc = document.documentElement.dataset.page; // 'privacy' | 'terms'
const root = document.getElementById('root');
const app = (
  <StrictMode>
    <LegalPage doc={doc} />
  </StrictMode>
);

if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
