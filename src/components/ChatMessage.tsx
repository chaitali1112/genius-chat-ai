import ReactMarkdown from "react-markdown";
import { Sparkles } from "lucide-react";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-4 animate-fade-in-up ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent ring-1 ring-border">
          <Sparkles className="h-4 w-4 text-foreground" />
        </div>
      )}
      <div
        className={
          isUser
            ? "max-w-[80%] rounded-2xl rounded-tr-sm bg-accent px-4 py-2.5 text-sm text-foreground"
            : "max-w-[85%] text-sm text-foreground/95 leading-relaxed"
        }
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none prose-p:my-2 prose-pre:bg-secondary prose-pre:border prose-pre:border-border prose-code:text-foreground">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-4 animate-fade-in-up">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent ring-1 ring-border">
        <Sparkles className="h-4 w-4 text-foreground" />
      </div>
      <div className="flex items-center gap-1.5 pt-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animation: "pulse-dot 1.4s infinite ease-in-out" }} />
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animation: "pulse-dot 1.4s infinite ease-in-out 0.2s" }} />
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animation: "pulse-dot 1.4s infinite ease-in-out 0.4s" }} />
      </div>
    </div>
  );
}
