import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GOOGLE_AI_TOKEN || ""
);

export async function generateData(prompt: string, schema: any) {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
        },
    });

    const result = await model.generateContent(prompt);
    return result;
}
