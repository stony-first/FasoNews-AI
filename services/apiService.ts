
import { NewsArticle } from '../types';

const getApiUrl = () => {
  // Priorité à l'URL configurée dans Vercel
  const envUrl = process.env.VITE_API_URL || process.env.NEXT_PUBLIC_API_URL;
  if (envUrl) return envUrl.replace(/\/$/, '');
  
  return 'http://localhost:8000';
};

const API_URL = getApiUrl();

export const fetchRealNews = async (category?: string): Promise<NewsArticle[]> => {
  try {
    const url = category 
      ? `${API_URL}/api/news?category=${encodeURIComponent(category)}`
      : `${API_URL}/api/news`;
      
    const response = await fetch(url, { 
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.warn("Connexion API impossible, mode démo activé.");
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
    
    if (!response.ok) throw new Error("Erreur résumé backend");
    const result = await response.json();
    return result.summary;
  } catch (error) {
    throw error;
  }
};
