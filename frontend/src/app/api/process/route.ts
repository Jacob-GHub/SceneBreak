import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file: File | null = formData.get("file") as unknown as File;

  if (!file) {
    return new Response("No file uploaded", { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const base64Image = Buffer.from(arrayBuffer).toString("base64");

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent([
    {
      inlineData: {
        mimeType: file.type, // "image/png" or similar
        data: base64Image,
      },
    },
    {
      text: "Analyze the cinematic composition of this frame.",
    },
  ]);

  const text = await result.response.text();

  return new Response(JSON.stringify({ message: text }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
