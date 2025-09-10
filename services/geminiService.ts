import { GoogleGenAI, Chat, Type } from '@google/genai';
import { ChatMessage, DailySessionPlan } from '../types';
import { GEMINI_SYSTEM_INSTRUCTION } from '../constants';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: GEMINI_SYSTEM_INSTRUCTION,
  },
});

export const getTurkishExplanation = async (textToTranslate: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are a helpful language assistant. Provide a simple and natural Turkish translation for the following English sentence, which is for a beginner English learner. Do not add any extra text or quotation marks, just the translation itself. The sentence is: "${textToTranslate}"`
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching translation from Gemini API:", error);
        throw new Error("Failed to get translation from AI.");
    }
};

export const sendMessageToAI = async (history: ChatMessage[]): Promise<string> => {
  try {
    const lastUserMessage = history[history.length - 1];
    
    if (lastUserMessage.role !== 'user') {
        throw new Error("Last message must be from the user.");
    }
    
    const response = await chat.sendMessage({ message: lastUserMessage.parts[0].text });
    
    return response.text;
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    throw new Error("Failed to get a response from the AI.");
  }
};


export const generateDailySession = async (topic?: string): Promise<DailySessionPlan> => {
  try {
      const prompt = `
          Create a daily English lesson plan for a Turkish speaker named Cengo. He's a beginner (A2/B1 level) learner preparing for an eyewear trade fair.
          Your personality is Captain Jack Sparrow, as defined in the system instructions. Make the explanation fun and pirate-themed.
          The vocabulary and sentences should relate to business, eyewear, or Cengo's interests (sailing, diving).

          The lesson must be structured around this grammar topic: ${topic || 'a randomly chosen but simple, fundamental topic for an A2 learner'}.
          
          The 'detailedExplanation' section MUST be an array of interactive parts. Break down the grammar topic into small, digestible chunks.
          - Use 'text' parts for simple explanations.
          - Use 'example' parts to show the rule in action. ALWAYS provide a Turkish translation.
          - Use 'quiz' parts to embed 1-2 simple multiple-choice questions directly within the explanation to check understanding immediately. The quiz should be very easy.

          Please generate the lesson in the following JSON format.
      `;

      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
              responseMimeType: "application/json",
              responseSchema: {
                  type: Type.OBJECT,
                  properties: {
                      grammarTopic: { type: Type.STRING, description: "The English grammar topic for the lesson." },
                      explanation: { type: Type.STRING, description: "A very brief, pirate-themed intro to the grammar topic for an A2/B1 level beginner. Keep it under 50 words." },
                      detailedExplanation: {
                          type: Type.ARRAY,
                          description: "An array of interactive parts to explain the grammar.",
                          items: {
                              type: Type.OBJECT,
                              properties: {
                                  type: { type: Type.STRING, enum: ['text', 'example', 'quiz'] },
                                  content: { type: Type.STRING, description: "Text content if type is 'text'." },
                                  english: { type: Type.STRING, description: "English sentence if type is 'example'." },
                                  turkish: { type: Type.STRING, description: "Turkish translation if type is 'example'." },
                                  question: { type: Type.STRING, description: "Question if type is 'quiz'." },
                                  options: {
                                      type: Type.ARRAY,
                                      items: { type: Type.STRING },
                                      description: "An array of 3-4 options for the quiz."
                                  },
                                  answer: { type: Type.STRING, description: "The correct answer string from the options." }
                              },
                              required: ['type']
                          }
                      },
                      vocabulary: {
                          type: Type.ARRAY,
                          items: {
                              type: Type.OBJECT,
                              properties: {
                                  english: { type: Type.STRING },
                                  turkish: { type: Type.STRING },
                                  category: { type: Type.STRING, enum: ['Eyewear', 'Business', 'Marine', 'Diving', 'Sailboats', 'AI & Tech', 'Global News'] }
                              },
                              required: ['english', 'turkish', 'category']
                          },
                          description: "An array of 5-7 vocabulary words related to the grammar topic and Cengo's interests."
                      },
                      fillInBlanks: {
                          type: Type.ARRAY,
                          items: {
                              type: Type.OBJECT,
                              properties: {
                                  sentence: { type: Type.STRING, description: "A sentence with '___' for the blank, using the grammar topic." },
                                  turkish: { type: Type.STRING, description: "The Turkish translation of the sentence." },
                                  blank: { type: Type.STRING, description: "The correct word for the blank." },
                                  options: {
                                      type: Type.ARRAY,
                                      items: { type: Type.STRING },
                                      description: "An array of 4 options, including the correct one."
                                  }
                              },
                              required: ['sentence', 'turkish', 'blank', 'options']
                          },
                          description: "An array of 3-4 fill-in-the-blank questions to practice the grammar."
                      },
                      conversationPrompt: { type: Type.STRING, description: "A starting prompt for a conversation with Captain Jack to practice the grammar topic." },
                      summary: { type: Type.STRING, description: "A one-sentence congratulatory message from Captain Jack summarizing what was learned." }
                  },
                  required: ['grammarTopic', 'explanation', 'detailedExplanation', 'vocabulary', 'fillInBlanks', 'conversationPrompt', 'summary']
              },
          },
      });

      const rawText = response.text;
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);

      if (jsonMatch && jsonMatch[0]) {
          let jsonText = jsonMatch[0];
          
          // Fix: Clean the JSON string to remove common LLM-generated errors like trailing commas.
          // This prevents JSON.parse() from crashing on slightly malformed, but recoverable, JSON.
          jsonText = jsonText.replace(/,(?=\s*\])/g, '').replace(/,(?=\s*\})/g, '');

          return JSON.parse(jsonText) as DailySessionPlan;
      } else {
          console.error("No valid JSON object found in Gemini response:", rawText);
          throw new Error("AI response did not contain a valid lesson plan.");
      }

  } catch (error) {
      console.error("Error generating daily session from Gemini API:", error);
      throw new Error("Failed to generate daily session.");
  }
};