// src/app/page.tsx
import FileUpload from "@/components/FileUpload";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-green-200 flex flex-col items-center justify-center p-6">
      <div className="text-xl font-bold mb-6">Upload an Image or Video</div>
      <FileUpload />
    </div>
  );
}
