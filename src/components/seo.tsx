
import { useEffect } from 'react';
import { updateMetaTags } from '../main';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string;
}

export const SEO = ({ 
  title = 'Locklify - Gerenciador de Senhas Seguro', 
  description = 'Proteja suas senhas com o Locklify, um gerenciador de senhas seguro com criptografia de ponta a ponta.',
  path = '',
  keywords = 'gerenciador de senhas, segurança online, proteção de dados, criptografia, senhas seguras, senhas únicas'
}: SEOProps) => {
  useEffect(() => {
    // Update document title and meta tags
    updateMetaTags(title, description, keywords);
    
    // Update canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', `https://locklify.com${path}`);
    }
  }, [title, description, path, keywords]);

  return null;
};

export default SEO;
