// app/components/ChatInterface.tsx
"use client";

interface ChatInterfaceProps {
  userPrompt: string;
  setUserPrompt: (val: string) => void;
  onSend: () => void;
  loading: boolean;
}

export default function ChatInterface({ userPrompt, setUserPrompt, onSend, loading }: ChatInterfaceProps) {
  return (
    <div className="flex gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
      <input
        autoFocus
        type="text"
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !loading && onSend()}
        disabled={loading}
        placeholder={loading ? "" : "Query knowledge base"}
        className="flex-1 bg-transparent border-none outline-none px-2 text-sm text-slate-200 disabled:opacity-50"
      />
      <button
        onClick={onSend}
        disabled={loading || !userPrompt.trim()}
        className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 px-5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center min-w-[80px]"
      >
        {loading ? "..." : "Send"}
      </button>
    </div>
  );
}