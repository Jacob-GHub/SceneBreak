"use client";

import { useState } from "react";
import AI_Analizer from "./AI_Analizer";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Upload an Image or Video</h1>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {previewUrl && file && (
        <div className="mt-4">
          {file.type.startsWith("image") ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-md rounded shadow"
            />
          ) : (
            <video
              src={previewUrl}
              controls
              className="max-w-md rounded shadow"
            />
          )}
        </div>
      )}
      <AI_Analizer file={file} />
    </div>
  );
}