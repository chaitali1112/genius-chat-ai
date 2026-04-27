import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { ChatInput } from "@/components/ChatInput";
import { ChatMessage, TypingIndicator, type Message } from "@/components/ChatMessage";

export const Route = createFileRoute("/")({
  component: ChatPage,
  head: () => ({
    meta: [
      { title: "Genius — Smart AI Assistant" },
      { name: "description", content: "A clean, minimal AI chat assistant. Ask anything." },
    ],
  }),
});

const WEBHOOK_URL = "https://taskflow.app.n8n.cloud/webhook/mychatapp";

const GREETING = "How can I help you today? I'm a smart genius assistant.";

function extractText(data: unknown): string {
  if (typeof data === "string") return data;
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    for (const key of ["output", "response", "reply", "message", "text", "content", "answer"]) {
      const v = obj[key];
      if (typeof v === "string") return v;
    }
    if (Array.isArray(data) && data.length > 0) return extractText(data[0]);
    return JSON.stringify(data, null, 2);
  }
  return String(data ?? "");
}

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const hasStarted = messages.length > 0;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    const userMsg: Message = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setIsLoading(true);

    try {
  const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const ct = res.headers.get("content-type") || "";
      let reply: string;
      if (ct.includes("application/json")) {
        const data = await res.json();
        reply = extractText(data);
      } else {
        reply = await res.text();
      }

      if (!reply.trim()) reply = "_(No response received from the assistant.)_";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't reach the assistant right now. Please try again in a moment.",
        },
      ]);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col bg-background overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[500px] opacity-60"
        style={{ background: "var(--gradient-glow)" }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-center border-b border-border/40 px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground">
            <Sparkles className="h-4 w-4 text-background" strokeWidth={2.5} />
          </div>
          <span className="text-base font-semibold tracking-tight">Genius</span>
        </div>
      </header>

      {/* Main */}
      {!hasStarted ? (
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4">
          <div className="w-full max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground shadow-[var(--shadow-soft)]">
              <Sparkles className="h-7 w-7 text-background" strokeWidth={2.5} />
            </div>
            <h1 className="mb-10 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {GREETING}
            </h1>
            <ChatInput onSend={handleSend} disabled={isLoading} autoFocus />
            <p className="mt-4 text-xs text-muted-foreground">
              Press Enter to send · Shift + Enter for newline
            </p>
          </div>
        </div>
      ) : (
        <>
          <div ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto">
            <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8">
              {messages.map((m, i) => (
                <ChatMessage key={i} message={m} />
              ))}
              {isLoading && <TypingIndicator />}
            </div>
          </div>
          <div className="relative z-10 border-t border-border/40 bg-background/80 backdrop-blur-md">
            <div className="mx-auto max-w-3xl px-4 py-4">
              <ChatInput onSend={handleSend} disabled={isLoading} autoFocus />
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Genius can make mistakes. Verify important info.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
