import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Use your API key directly as a string
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);  // <-- Pass the API key directly

export async function callGeminiAPI(filePath: string) {
  // 1. Read the file from the server
  const fileBuffer = fs.readFileSync(filePath);
  const fileBase64 = fileBuffer.toString("base64");

  // 2. Call Gemini API with the file
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "image/png", // Adjust for file type (e.g., video, png, jpeg)
          data: fileBase64,
        },
      },
      "Describe what's in this image.",
    ]);

    // Handle the response
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to process image with Gemini.");
  }
}
