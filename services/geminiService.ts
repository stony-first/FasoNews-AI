
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export const summarizeArticle = async (content: string): Promise<string> => {
  try {
    // Utilisation de process.env.API_KEY comme requis par les instructions
    // @ts-ignore
    const key = process.env.API_KEY;
    if (!key) throw new Error("API_KEY non configurée.");

    // Initialisation correcte selon la règle : new GoogleGenAI({ apiKey: ... })
    const ai = new GoogleGenAI({ apiKey: key });
    
    // Utilisation directe de ai.models.generateContent avec le modèle gemini-3-flash-preview
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `En tant que journaliste professionnel, résume cet article de presse en respectant scrupuleusement ta charte éditoriale. Va droit à l'essentiel : \n\n ${content}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.1, // Plus bas pour plus de neutralité
        topP: 0.95,
      },
    });

    // Extraction sécurisée via la propriété .text (pas de méthode .text())
    const text = response.text;
    if (!text) throw new Error("Le modèle a retourné une réponse vide.");

    return text;
  } catch (error) {
    console.error("Erreur de l'IA Journaliste (Frontend):", error);
    throw error;
  }
};
