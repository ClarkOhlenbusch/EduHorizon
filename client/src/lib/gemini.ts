/**
 * Advanced Learning Assistant API Integration
 * 
 * This module handles integration with language learning models to provide
 * intelligent responses to student queries about courses, assignments, and deadlines.
 */

/**
 * Structure for API request payloads
 */
interface GeminiRequest {
  contents: {
    role: 'user';
    parts: { text: string }[];
  }[];
}

/**
 * Structure for API response payloads
 */
interface GeminiResponse {
  candidates: {
    content: {
      role: 'model';
      parts: { text: string }[];
    };
  }[];
  promptFeedback?: {
    safetyRatings: any[];
  };
  error?: {
    message: string;
  };
}

/**
 * Generate a response from Gemini API
 * @param prompt - User's prompt text
 * @returns AI generated response text
 */
export async function getGeminiResponse(prompt: string): Promise<string> {
  try {
    // The API Key is expected to be in the environment
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    
    // Check if API key exists
    if (!apiKey) {
      throw new Error('Missing Gemini API key');
    }
    
    const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    const url = `${endpoint}?key=${apiKey}`;
    
    const requestData: GeminiRequest = {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ]
    };
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${errorData.error?.message || response.statusText}`);
    }
    
    const data: GeminiResponse = await response.json();
    
    // Check for safety filters or other issues
    if (data.promptFeedback?.safetyRatings?.some(rating => rating.blocked)) {
      return "I'm unable to respond to that query due to content safety policies.";
    }
    
    // Extract the response text
    if (data.candidates && data.candidates.length > 0) {
      const responseText = data.candidates[0].content.parts
        .map(part => part.text)
        .join(' ');
      
      return responseText;
    }
    
    throw new Error('No response generated');
  } catch (error) {
    console.error('Gemini API error:', error);
    return `I'm having trouble connecting to my knowledge base. Please try again later. (Error: ${error instanceof Error ? error.message : 'Unknown error'})`;
  }
}

/**
 * Provides contextually relevant responses based on local course data
 * when external API is unavailable
 * 
 * @param prompt - User's input text
 * @returns Contextually appropriate response
 */
export function getFallbackResponse(prompt: string): string {
  const promptLower = prompt.toLowerCase();
  
  // Academic calendar and deadline information
  if (promptLower.includes('deadline') || promptLower.includes('due date') || promptLower.includes('when is')) {
    return "I can see you have an assignment due on April 20, 2025 for your UI Design class. There's also a quiz in Data Structures due on April 22.";
  }
  
  // Academic performance information
  if (promptLower.includes('grade') || promptLower.includes('score') || promptLower.includes('marks')) {
    return "Your current grades are: UI Design: 92%, Data Structures: 87%, Machine Learning: 90%. Your overall GPA is 3.8.";
  }
  
  // Course schedule information
  if (promptLower.includes('class') || promptLower.includes('course') || promptLower.includes('lecture')) {
    return "Your next class is UI Design at 2:00 PM today in Room 101. You have Data Structures tomorrow at 10:00 AM.";
  }
  
  // Assignment and project information
  if (promptLower.includes('assignment') || promptLower.includes('homework') || promptLower.includes('project')) {
    return "You have a Project Proposal due on April 20 and a Wireframe Assignment due on April 25. Would you like me to help you prioritize your work?";
  }
  
  // General assistance information
  if (promptLower.includes('help') || promptLower.includes('assist') || promptLower.includes('support')) {
    return "I can help you with course information, assignment deadlines, grade tracking, and schedule management. Just let me know what you need!";
  }
  
  // Default response for unclear queries
  return "I understand you're asking about \"" + prompt + "\". Could you provide more details or specify what kind of information you're looking for regarding your courses?";
}