"use client";

import { useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // State for preview URL
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile)); // Generate preview URL
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/process", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResponse(data.message);
    } catch (err) {
      console.error("Error during file processing:", err);
      setResponse("An error occurred while processing the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </form>

      {/* Display the preview */}
      {previewUrl && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Preview:</h3>
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-xs rounded shadow"
          />
        </div>
      )}

      {/* Center the button */}
      {previewUrl && (
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Analyze
          </button>
        </div>
      )}

      {loading && <p className="mt-4 text-center">Analyzing frame...</p>}

      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">Gemini Feedback:</h3>
          <p className="whitespace-pre-line">{response}</p>
        </div>
      )}
    </div>
  );
}