import { renderToString } from 'react-dom/server';
import App from './App';
import LegalPage from './legal/LegalPage';

/** Used only at build time (scripts/prerender.mjs) to write the page's HTML. Never shipped to the browser. */
export function render(page = 'home') {
  return renderToString(page === 'home' ? <App /> : <LegalPage doc={page} />);
}
