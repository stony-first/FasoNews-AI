
import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { NewsCard } from './components/NewsCard';
import { SummaryModal } from './components/SummaryModal';
import { NewsArticle, Category } from './types';
import { MOCK_NEWS } from './constants';
import { fetchRealNews, fetchAISummaryFromBackend } from './services/apiService';
import { summarizeArticle as directSummarize } from './services/geminiService';

const App: React.FC = () => {
  // On initialise avec les mocks pour que le site ne soit jamais vide
  const [articles, setArticles] = useState<NewsArticle[]>(MOCK_NEWS as NewsArticle[]);
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  useEffect(() => {
    loadNews();
  }, [selectedCategory]);

  const loadNews = async () => {
    setIsLoading(true);
    try {
      const data = await fetchRealNews(selectedCategory === Category.ALL ? undefined : selectedCategory);
      if (data && data.length > 0) {
        setArticles(data);
      }
    } catch (error) {
      console.log("Backend offline, affichage des mocks filtrés.");
      // Filtrage manuel des mocks si le backend est absent
      const filteredMocks = MOCK_NEWS.filter(m => 
        selectedCategory === Category.ALL || m.category === selectedCategory
      );
      setArticles(filteredMocks as NewsArticle[]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredArticles = useMemo(() => {
    return articles.filter(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [articles, searchQuery]);

  const handleSummarize = async (article: NewsArticle) => {
    setActiveArticle(article);
    setSummary(null);
    setIsSummarizing(true);
    try {
      // 1. Essayer le backend (Production)
      const result = await fetchAISummaryFromBackend(article);
      setSummary(result);
    } catch (error) {
      console.warn("Backend AI Error, tentative de résumé direct...");
      try {
        // 2. Fallback direct (Mode preview/développement)
        const directResult = await directSummarize(article.content);
        setSummary(directResult);
      } catch (err) {
        setSummary("Le service de résumé est momentanément indisponible. Vérifiez votre connexion.");
      }
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onSearch={setSearchQuery} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured Section */}
        {articles.length > 0 && !searchQuery && selectedCategory === Category.ALL && (
          <div className="mb-12">
            <div className="relative h-[450px] rounded-[40px] overflow-hidden shadow-2xl group">
              <img 
                src={articles[0].imageUrl} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                alt="A la une"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
              <div className="absolute bottom-0 p-8 md:p-12">
                <span className="bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter mb-4 inline-block">
                  A LA UNE • {articles[0].source}
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 max-w-3xl leading-tight">
                  {articles[0].title}
                </h2>
                <button 
                  onClick={() => handleSummarize(articles[0])}
                  className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all flex items-center gap-2"
                >
                  <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Lire le résumé IA
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {Object.values(Category).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'bg-slate-900 text-white shadow-xl' 
                    : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button 
            onClick={loadNews}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-emerald-600 transition-colors"
            title="Rafraîchir"
          >
            <svg className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map(article => (
            <NewsCard key={article.id} article={article} onSummarize={handleSummarize} />
          ))}
        </div>
      </main>

      <SummaryModal 
        article={activeArticle} 
        summary={summary} 
        isLoading={isSummarizing} 
        onClose={() => setActiveArticle(null)} 
      />
    </div>
  );
};

export default App;
