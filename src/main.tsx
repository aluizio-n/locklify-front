
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add SEO meta updater
export const updateMetaTags = (
  title = 'Locklify - Gerenciador de Senhas Seguro',
  description = 'Proteja suas senhas com o Locklify, um gerenciador de senhas seguro com criptografia de ponta a ponta.'
) => {
  document.title = title;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }
  
  // Update OG tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  
  if (ogTitle) {
    ogTitle.setAttribute('content', title);
  }
  
  if (ogDescription) {
    ogDescription.setAttribute('content', description);
  }
};

createRoot(document.getElementById("root")!).render(<App />);
