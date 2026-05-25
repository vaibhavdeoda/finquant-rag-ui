// app/page.tsx
"use client";

import { useState } from "react";
import ChatInterface from "./components/ChatInterface";

export default function Home() {
  const [message, setMessage] = useState("");
  const [apiResult, setApiResult] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleExecuteRAG = async () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    setIsExpanded(false); // Collapse box completely when loading a new fresh prompt
    setApiResult("");

    try {
      const response = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message }),
      });

      if (!response.ok) throw new Error("FastAPI engine failed processing request");
      
      const data = await response.json();
      setApiResult(data.answer || data); // Catch string or fallback object data
      setIsExpanded(true); // Open drawer seamlessly when result arrives
    } catch (error) {
      console.error(error);
      setApiResult("Failed to reach out to the FastAPI engine. Make sure your local terminal is running port :8000.");
      setIsExpanded(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
     

      {/* Answer Box Wrapper Component */}
      <div 
        className={`
          transition-all duration-300 ease-in-out overflow-y-auto border border-slate-800 bg-slate-900 rounded-xl
          ${isExpanded ? "max-h-[400px] p-4 opacity-100" : "max-h-0 p-0 border-none opacity-0"}
        `}
      >
        <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
          {apiResult}
        </p>
      </div>

      {/* Chat Execution Module */}
      <ChatInterface 
        userPrompt={message} 
        setUserPrompt={setMessage} 
        onSend={handleExecuteRAG}
        loading={isLoading}
      />
    </div>
  );
}