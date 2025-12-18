
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the ESG/HSE AI Assistant. 
Your primary goal is to provide expert guidance on:
1. Environmental, Social, and Governance (ESG) standards and reporting.
2. Health, Safety, and Environment (HSE) management systems and safety protocols.
Keep your tone professional, helpful, and concise. 
Provide responses in the language requested by the user.
If a user asks about something unrelated to ESG/HSE, politely redirect them back to your area of expertise.
`;

export const getGeminiResponse = async (prompt: string, language: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `${SYSTEM_INSTRUCTION} Please respond primarily in ${language}.`,
        temperature: 0.7,
        topP: 0.95,
      },
    });
    
    return response.text || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while communicating with the AI. Please try again later.";
  }
};