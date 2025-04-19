"use client";

import { useState } from "react";

interface AIAnalizerProps {
  file: File | null;
}

export default function AI_Analizer({ file }: AIAnalizerProps) {
  const [apiResponse, setApiResponse] = useState<string | null>(null);

  const handleApiCall = async () => {
    if (!file) {
      setApiResponse("No file provided.");
      return;
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDIkgVbHH8MQjLoOyHOZGwuo8w-A2nzeDk`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: `Analyze the file: ${file.name}` }],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const data = await response.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error making API call:", error);
      setApiResponse("Error making API call");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">AI Analyzer</h1>
      <p className="mb-4">Click the button below to analyze the uploaded file.</p>
      <button
        onClick={handleApiCall}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Analyze File
      </button>
      {apiResponse && (
        <pre className="mt-4 bg-gray-200 p-4 rounded max-w-md overflow-auto">
          {apiResponse}
        </pre>
      )}
    </div>
  );
}