
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export const summarizeArticle = async (content: string): Promise<string> => {
  try {
    // Initialisation selon les directives strictes
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `En tant que journaliste professionnel, résume cet article : \n\n ${content}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.1,
      },
    });

    return response.text || "Impossible de générer le résumé.";
  } catch (error) {
    console.error("Erreur Gemini Frontend:", error);
    throw error;
  }
};
