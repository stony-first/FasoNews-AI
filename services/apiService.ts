
import { NewsArticle } from '../types';

/**
 * Récupère l'URL de l'API de manière sécurisée.
 * En production (Vercel), utilise NEXT_PUBLIC_API_URL.
 * En local, utilise localhost:8000.
 */
const getApiUrl = () => {
  try {
    // Tentative de récupération depuis process.env (injecté par Vercel/Node)
    // @ts-ignore
    const envUrl = typeof process !== 'undefined' ? (process.env.NEXT_PUBLIC_API_URL || process.env.API_URL) : null;
    if (envUrl) return envUrl.replace(/\/$/, '');
    
    // Fallback pour le développement local si rien n'est défini
    return 'http://localhost:8000';
  } catch (e) {
    return 'http://localhost:8000';
  }
};

const API_URL = getApiUrl();

export const fetchRealNews = async (category?: string): Promise<NewsArticle[]> => {
  try {
    const url = category 
      ? `${API_URL}/api/news?category=${encodeURIComponent(category)}`
      : `${API_URL}/api/news`;
      
    console.log(`Tentative de connexion à l'API: ${url}`);
    
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 8000); // 8s de patience pour le réveil de Render

    const response = await fetch(url, { 
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    clearTimeout(id);

    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.warn("L'API Backend est injoignable ou en cours de démarrage sur Render.");
    throw error;
  }
};

export const fetchAISummaryFromBackend = async (article: NewsArticle): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/api/summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article),
    });
    
    if (!response.ok) throw new Error("Erreur lors de l'appel au service de résumé");
    const result = await response.json();
    return result.summary;
  } catch (error) {
    console.error("Erreur Backend Summary:", error);
    throw error;
  }
};
