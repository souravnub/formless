import { GenerateContentResult, GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GOOGLE_AI_TOKEN || ""
);

type GenerateDataResponse = {
    success: false,
    message: string
} | {
    success: true, 
    result: GenerateContentResult
}

export async function generateData(prompt: string, schema: any): Promise<GenerateDataResponse> {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });
    
        const result = await model.generateContent(prompt);
        return {success: true, result};
    }catch(err) {
        return {
            success: false, 
            message: 'Error while generating response with AI'
        }
    }
}
