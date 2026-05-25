// app/upload/page.tsx
"use client";

import { useState, ChangeEvent, useRef } from "react";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // 1. Create a holster wire for the native HTML input element
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setUploadStatus("");
    }
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select a valid document to index first.");
      return;
    }

    setIsUploading(true);
    setUploadStatus("Streaming binary chunk profiles to FastAPI storage engine...");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("FastAPI index routing failed handling file stream.");

      setUploadStatus(`Success! "${selectedFile.name}" parsed, split, and embedded into vector memory storage.`);
      
      // 2. Clear out the React state container
      setSelectedFile(null);

      // 3. Force the physical browser element to reset its value string completely
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
      setUploadStatus("Upload failed. Verify local FastAPI upload endpoint is mapped cleanly at route /upload.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="border border-dashed border-slate-800 bg-slate-900/50 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 text-center">
        <div className="bg-slate-800 p-4 rounded-full text-2xl text-emerald-400">📁</div>
        
        <div className="flex flex-col gap-1">
          <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-700">
            Choose Target File
            <input 
              ref={fileInputRef} // <--- Connect the ref wire
              type="file" 
              accept=".pdf,.txt,.csv" 
              onChange={handleFileChange} 
              className="sr-only" // <--- Swapped from hidden to sr-only so it stays fully reactive
            />
          </label>
        </div>

        {selectedFile && (
          <div className="text-sm font-medium text-slate-300 bg-slate-900 px-3 py-1.5 rounded-md border border-slate-800">
            🎯 Selected: <span className="text-emerald-400">{selectedFile.name}</span> ({(selectedFile.size / 1024).toFixed(1)} KB)
          </div>
        )}
      </div>

      <button
        onClick={handleUploadSubmit}
        disabled={isUploading || !selectedFile}
        className="w-full md:w-auto self-center bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 py-2.5 px-6 rounded-xl font-semibold text-sm transition-colors"
      >
        {isUploading ? "Processing Vector Embeddings..." : "Upload and Index Document"}
      </button>

      {uploadStatus && (
        <div className="p-4 rounded-xl text-sm bg-slate-900 border border-slate-800 text-slate-300 leading-relaxed animate-fade-in">
          {uploadStatus}
        </div>
      )}
    </div>
  );
}