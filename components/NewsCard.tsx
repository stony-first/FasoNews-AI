
import React from 'react';
import { NewsArticle } from '../types';

interface NewsCardProps {
  article: NewsArticle;
  onSummarize: (article: NewsArticle) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, onSummarize }) => {
  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider">
            {article.category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <span className="font-semibold text-slate-600">{article.source}</span>
          <span>•</span>
          <span>{article.date}</span>
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-emerald-700 transition-colors">
          {article.title}
        </h3>
        
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
          {article.content}
        </p>
        
        <button 
          onClick={() => onSummarize(article)}
          className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-emerald-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors shadow-lg shadow-slate-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Résumé IA
        </button>
      </div>
    </article>
  );
};
