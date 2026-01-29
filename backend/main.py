
import os
import re
import feedparser
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

app = FastAPI(title="FasoNews AI - API de Presse")

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration Gemini
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

def clean_text(text: str):
    if not text: return ""
    text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def extract_image(entry):
    if 'media_content' in entry and len(entry.media_content) > 0:
        return entry.media_content[0]['url']
    if 'links' in entry:
        for link in entry.links:
            if 'image' in link.get('type', ''):
                return link.get('href')
    desc = entry.get('summary', '')
    img_match = re.search(r'src="([^"]+)"', desc)
    if img_match:
        return img_match.group(1)
    return "https://images.unsplash.com/photo-1504711432869-5d39a110fdd7?q=80&w=800&auto=format&fit=crop"

def detect_category(title: str, content: str):
    text = (title + " " + content).lower()
    if any(w in text for w in ["sport", "étalons", "football", "can", "match"]):
        return "Sport"
    if any(w in text for w in ["économie", "fcfa", "marché", "douane", "impôts", "banque"]):
        return "Économie"
    if any(w in text for w in ["mali", "niger", "aes", "cédéao", "sahel", "terroriste", "vdp"]):
        return "Afrique de l'Ouest"
    return "Burkina Faso"

@app.get("/api/news")
async def get_news(category: Optional[str] = None):
    articles = []
    for source, url in RSS_FEEDS.items():
        try:
            feed = feedparser.parse(url)
            for entry in feed.entries[:10]:
                content = clean_text(entry.get('summary', entry.get('description', '')))
                cat = detect_category(entry.title, content)
                
                articles.append({
                    "id": entry.get('id', entry.link),
                    "title": entry.title,
                    "content": content,
                    "source": source,
                    "date": entry.get('published', 'Récemment'),
                    "category": cat,
                    "imageUrl": extract_image(entry),
                    "url": entry.link
                })
        except Exception as e:
            print(f"Erreur RSS {source}: {e}")
    
    if category and category != "Toute l'actu":
        articles = [a for a in articles if a["category"] == category]
    
    return {"data": articles}

@app.post("/api/summarize")
async def summarize(article: NewsArticle):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="API_KEY manquante sur le serveur.")
    
    try:
        # En Python, 'gemini-1.5-flash' est stable
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        system_prompt = (
            "Tu es un journaliste expert du Sahel. Résume l'article suivant en 5 phrases maximum. "
            "Sois factuel, neutre et professionnel. "
            "Respecte les 7 règles d'or du journalisme africain."
        )
        
        prompt = f"{system_prompt}\n\nTITRE: {article.title}\nCONTENU: {article.content}"
        
        response = model.generate_content(prompt)
        return {"summary": response.text}
    except Exception as e:
        print(f"Erreur IA: {e}")
        raise HTTPException(status_code=500, detail="Erreur lors de la génération du résumé.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
