
import { GoogleGenAI, Type } from "@google/genai";
import { EmailValidationResult } from '../types';

const validationSchema = {
  type: Type.OBJECT,
  properties: {
    email: {
      type: Type.STRING,
      description: "The email address that was validated.",
    },
    status: {
      type: Type.STRING,
      enum: ["valid", "invalid", "risky"],
      description: "The overall validation status.",
    },
    reason: {
      type: Type.STRING,
      description: "A brief explanation for the status.",
    },
    syntax_correct: {
      type: Type.BOOLEAN,
      description: "Whether the email syntax is correct (e.g., has '@' and a domain).",
    },
    domain_exists: {
      type: Type.BOOLEAN,
      description: "Whether the domain of the email has valid DNS records (like MX or A).",
    },
    disposable: {
      type: Type.BOOLEAN,
      description: "Whether the email is from a known disposable or temporary email provider.",
    },
  },
  required: ["email", "status", "reason", "syntax_correct", "domain_exists", "disposable"],
};

const bulkValidationSchema = {
    type: Type.ARRAY,
    items: validationSchema
};


export const validateSingleEmail = async (email: string): Promise<EmailValidationResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `Please validate the email address: ${email}. Provide a detailed analysis based on syntax, domain validity, and potential risk factors (like being a disposable email). Respond in the specified JSON format.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: validationSchema,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result as EmailValidationResult;
  } catch (error) {
    console.error("Error validating single email:", error);
    throw new Error("Failed to get a valid response from the AI model.");
  }
};

export const validateBulkEmails = async (emails: string[]): Promise<EmailValidationResult[]> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `Please validate the following list of email addresses:\n${emails.join('\n')}\nProvide a detailed analysis for each email based on syntax, domain validity, and potential risk factors (like being a disposable email). Respond with an array of objects in the specified JSON format.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: bulkValidationSchema,
            },
        });

        const jsonText = response.text.trim();
        const results = JSON.parse(jsonText);
        return results as EmailValidationResult[];
    } catch (error) {
        console.error("Error validating bulk emails:", error);
        throw new Error("Failed to get a valid response from the AI model for the bulk request.");
    }
};
