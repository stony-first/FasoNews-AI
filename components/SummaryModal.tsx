
import React from 'react';
import { NewsArticle } from '../types';

interface SummaryModalProps {
  article: NewsArticle | null;
  summary: string | null;
  isLoading: boolean;
  onClose: () => void;
}

export const SummaryModal: React.FC<SummaryModalProps> = ({ article, summary, isLoading, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[40px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-lg uppercase tracking-tight">Analyse de la Dépêche</h4>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">IA Certifiée</span>
                <span className="text-[10px] text-slate-400 font-medium">Rédaction Virtuelle FasoNews</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors shadow-sm"
          >
            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-10 overflow-y-auto flex-1 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]">
          {isLoading ? (
            <div className="py-12 space-y-8">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="relative">
                   <div className="w-16 h-16 border-4 border-emerald-500/10 border-t-emerald-600 rounded-full animate-spin"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-8 h-8 bg-emerald-600/10 rounded-full animate-pulse"></div>
                   </div>
                </div>
                <p className="mt-6 text-slate-900 font-black uppercase tracking-widest text-xs animate-pulse">
                  Analyse journalistique en cours...
                </p>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-slate-100 rounded-full w-full"></div>
                <div className="h-4 bg-slate-100 rounded-full w-11/12"></div>
                <div className="h-4 bg-slate-100 rounded-full w-10/12"></div>
                <div className="h-4 bg-slate-100 rounded-full w-9/12"></div>
              </div>
            </div>
          ) : (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-900 leading-tight mb-2 serif-font">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Source: {article.source}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>
              </div>
              
              <div className="bg-white/60 p-8 rounded-3xl border border-emerald-100/50 shadow-inner">
                <p className="text-xl text-slate-800 leading-relaxed font-serif italic selection:bg-emerald-100">
                  "{summary}"
                </p>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                   <button 
                    onClick={() => {
                      navigator.clipboard.writeText(summary || "");
                      alert("Résumé copié !");
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-all shadow-lg"
                   >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copier le résumé
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
                    Partager sur WhatsApp
                  </button>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase italic">
                  * Résumé factuel généré pour le Burkina Faso
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
