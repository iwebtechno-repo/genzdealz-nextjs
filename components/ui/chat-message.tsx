"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Robot,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
} from "@phosphor-icons/react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  className?: string;
}

const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ message, className }, ref) => {
    const [copied, setCopied] = React.useState(false);
    const [feedback, setFeedback] = React.useState<"up" | "down" | null>(null);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    };

    const handleFeedback = (type: "up" | "down") => {
      setFeedback(type);
      // TODO: Send feedback to backend
    };

    const isUser = message.role === "user";

    return (
      <div
        ref={ref}
        className={cn(
          "group relative",
          isUser ? "flex justify-end" : "flex justify-start",
          className
        )}
      >
        <div className="max-w-[85%]">
          <Card
            showRipple={true}
            variant={isUser ? "multi" : "none"}
            icon={{
              icon: isUser ? User : Robot,
              position: isUser ? "top-right" : "top-left",
            }}
            className="rounded-2xl relative group/message"
          >
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-wrap leading-relaxed">
                {message.content}
              </p>
            </div>

            {/* Message Actions */}
            {!isUser && (
              <div className="absolute -bottom-2 right-2 opacity-0 group-hover/message:opacity-100 transition-opacity duration-200 flex items-center gap-1 bg-background border border-border rounded-lg p-1 shadow-lg">
                <Button
                  variant="none"
                  effect="glass"
                  size="icon-sm"
                  onClick={handleCopy}
                  className="hover:bg-accent"
                  showRipple={true}
                  icon={{ icon: copied ? Check : Copy }}
                />
                <Button
                  variant="none"
                  effect="glass"
                  size="icon-sm"
                  onClick={() => handleFeedback("up")}
                  className={cn(
                    "hover:bg-accent",
                    feedback === "up" && "text-green-500"
                  )}
                  showRipple={true}
                  icon={{ icon: ThumbsUp }}
                />
                <Button
                  variant="none"
                  effect="glass"
                  size="icon-sm"
                  onClick={() => handleFeedback("down")}
                  className={cn(
                    "hover:bg-accent",
                    feedback === "down" && "text-red-500"
                  )}
                  showRipple={true}
                  icon={{ icon: ThumbsDown }}
                />
              </div>
            )}
          </Card>

          {/* Timestamp */}
          <div
            className={cn(
              "text-xs text-muted-foreground mt-2",
              isUser ? "text-right" : "text-left"
            )}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    );
  }
);

ChatMessage.displayName = "ChatMessage";

export { ChatMessage };
