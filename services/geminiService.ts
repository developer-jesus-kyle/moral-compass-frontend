
import { GoogleGenAI } from "@google/genai";

export const getBibleContext = async (verse: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

    const prompt = `
      You are an AI-assisted study Bible expert.
      For the following Bible passage: "${verse}", please provide a detailed analysis covering:
      1.  **Historical Context:** What was happening politically, culturally, and socially at the time it was written? Who was the author and intended audience?
      2.  **Original Language Insights:** Analyze key words or phrases in the original Hebrew/Greek. What are their nuances or deeper meanings that might be lost in translation?
      3.  **Cross-References:** List 3-5 other relevant Bible verses that connect to the themes or ideas in this passage.
      4.  **Theological Significance:** What are the main theological points or doctrines being communicated?
      
      Present the information in a clear, well-structured, and easy-to-read format. Use markdown for headings.
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    if (error?.message) {
        // The error object from Gemini often contains a JSON string in the message
        try {
            const errorJson = JSON.parse(error.message);
            return `An error occurred while fetching analysis: ${JSON.stringify(errorJson)}. Please check your API key and network connection.`;
        } catch(e) {
            // Not a JSON string, just return the message
            return `An error occurred while fetching analysis: ${error.message}. Please check your API key and network connection.`;
        }
    }
    return "An unknown error occurred while fetching analysis.";
  }
};
