
import os
import re
import feedparser
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = os.getenv("API_KEY")
if API_KEY:
    genai.configure(api_key=API_KEY)

class NewsArticle(BaseModel):
    id: str
    title: str
    content: str
    source: str
    date: str
    category: str
    imageUrl: str
    url: str

RSS_FEEDS = {
    "Sidwaya": "https://www.sidwaya.info/feed/",
    "Burkina24": "https://burkina24.com/feed/"
}

@app.get("/api/news")
async def get_news(category: Optional[str] = None):
    articles = []
    for source, url in RSS_FEEDS.items():
        try:
            feed = feedparser.parse(url)
            for entry in feed.entries[:10]:
                content = re.sub(r'<[^>]+>', '', entry.get('summary', ''))
                articles.append({
                    "id": entry.get('id', entry.link),
                    "title": entry.title,
                    "content": content[:500],
                    "source": source,
                    "date": entry.get('published', 'Récemment'),
                    "category": "Burkina Faso",
                    "imageUrl": "https://images.unsplash.com/photo-1504711432869-5d39a110fdd7?q=80&w=800&auto=format&fit=crop",
                    "url": entry.link
                })
        except: continue
    return {"data": articles}

@app.post("/api/summarize")
async def summarize(article: NewsArticle):
    if not API_KEY: raise HTTPException(status_code=500, detail="Clé API absente")
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        prompt = f"Résume cet article en tant que journaliste au Sahel : {article.title}\n\n{article.content}"
        response = model.generate_content(prompt)
        return {"summary": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
