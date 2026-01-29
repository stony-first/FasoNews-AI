
# FasoNews AI - Guide de Déploiement

## Structure du projet
- `/` : Racine (Frontend Vercel)
- `/backend` : Dossier API (Render)

## 1. Backend (Render)
- Crée un Web Service sur Render.
- Connecte ton GitHub.
- **Root Directory**: `backend` (Très important !)
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Env Var**: `API_KEY` (ta clé Gemini).

## 2. Frontend (Vercel)
- Importe le projet sur Vercel.
- Configure la variable d'environnement :
  - `NEXT_PUBLIC_API_URL`: L'URL fournie par Render (ex: `https://fasonews-api.onrender.com`).
