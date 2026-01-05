
import { GoogleGenAI, Type } from "@google/genai";
import { Category, NewsItem, ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const fetchGlobalNews = async (category: Category): Promise<NewsItem[]> => {
  const query = `Latest major news events in ${category} today. Provide at least 5 distinct stories with clear titles and simple explanations. Focus on accuracy and a professional news tone.`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              explanation: { type: Type.STRING },
              whyItMatters: { type: Type.STRING },
            },
            required: ["title", "summary", "explanation", "whyItMatters"]
          }
        }
      }
    });

    const results = JSON.parse(response.text || "[]");
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map(chunk => ({
      title: chunk.web?.title || 'Source',
      uri: chunk.web?.uri || '#'
    })) || [];

    return results.map((item: any, index: number) => ({
      id: `${category}-${index}-${Date.now()}`,
      title: item.title,
      category,
      summary: item.summary,
      explanation: item.explanation,
      whyItMatters: item.whyItMatters,
      imageUrl: `https://picsum.photos/seed/${encodeURIComponent(item.title)}/800/600`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      sources: sources.slice(0, 3)
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

export const askAiAssistant = async (userMessage: string, chatHistory: ChatMessage[]) => {
  try {
    const contents = [
      ...chatHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      })),
      { role: 'user', parts: [{ text: userMessage }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: contents as any,
      config: {
        systemInstruction: "You are the 'World Today AI Assistant'. Your goal is to provide neutral, simple, and professional explanations of global news and conflicts. Use Google Search to get the most up-to-date facts. Always cite your sources.",
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.text || "I couldn't process that request.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map(chunk => ({
      title: chunk.web?.title || 'Source',
      uri: chunk.web?.uri || '#'
    })) || [];

    return { text, sources };
  } catch (error) {
    console.error("AI Assistant Error:", error);
    throw error;
  }
};
