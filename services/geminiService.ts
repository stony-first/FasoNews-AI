
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export const summarizeArticle = async (content: string): Promise<string> => {
  try {
    // Vérification sécurisée de l'existence de process et de la clé
    // @ts-ignore
    const key = typeof process !== 'undefined' ? process.env.API_KEY : undefined;
    
    if (!key) {
      console.warn("Clé API manquante dans le frontend. Le résumé direct est désactivé.");
      throw new Error("API_KEY non configurée dans l'environnement.");
    }

    const ai = new GoogleGenAI({ apiKey: key });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `En tant que journaliste professionnel, résume cet article de presse en respectant scrupuleusement ta charte éditoriale. Va droit à l'essentiel : \n\n ${content}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.1,
        topP: 0.95,
      },
    });

    const text = response.text;
    if (!text) throw new Error("Le modèle a retourné une réponse vide.");

    return text;
  } catch (error) {
    console.error("Erreur de l'IA Journaliste (Frontend):", error);
    throw error;
  }
};
