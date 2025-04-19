// src/app/page.tsx
import FileUpload from "@/components/FileUpload";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Upload an Image or Video</h1>
      <FileUpload />
    </main>
  );
}
