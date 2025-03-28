
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add SEO meta updater
export const updateMetaTags = (
  title = 'Locklify - Gerenciador de Senhas Seguro',
  description = 'Proteja suas senhas com o Locklify, um gerenciador de senhas seguro com criptografia de ponta a ponta.',
  keywords = 'gerenciador de senhas, segurança online, proteção de dados, criptografia, senhas seguras, senhas únicas'
) => {
  document.title = title;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }
  
  // Update meta keywords
  const metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metaKeywords) {
    metaKeywords.setAttribute('content', keywords);
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

// Get root element and create root if it doesn't exist
const rootElement = document.getElementById("root");
if (rootElement && !rootElement.hasAttribute('data-react-root')) {
  const root = createRoot(rootElement);
  rootElement.setAttribute('data-react-root', 'true');
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
