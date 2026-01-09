
import { GoogleGenAI } from "@google/genai";

// Always initialize with the apiKey from process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getChatResponse = async (history: { role: string; parts: string[] }[], message: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.parts[0] }] })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: `You are a sales assistant for "BWB Shop". 
        BWB Shop sells:
        1. Auto Top Up Website (3000 tk, with hosting).
        2. Tournament Website (2500 tk, with hosting).
        3. Auto Payment Gateway Script (2000 tk).
        4. Domain Hosting Script (2000 tk).
        5. Auto Top Up API Packs (ranging from 250 to 4000 tk). 
        All API packs have a 30-day validity and a one-time setup charge of 200 tk.
        Be helpful, professional, and guide users to the right product based on their needs.`,
        temperature: 0.7,
      },
    });

    // Access the text property directly on GenerateContentResponse
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Our assistant is currently resting. Please try again later or contact support directly.";
  }
};