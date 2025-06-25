"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  PaperPlaneTiltIcon,
  PaperclipIcon,
  MicrophoneIcon,
  SparkleIcon,
  StopCircleIcon,
} from "@phosphor-icons/react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
}

const ChatInput = React.forwardRef<HTMLDivElement, ChatInputProps>(
  (
    {
      value,
      onChange,
      onSubmit,
      isLoading = false,
      placeholder = "Message GenZGPT...",
      className,
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!value.trim() || isLoading) return;
      onSubmit();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    };

    const autoResize = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
      }
    };

    React.useEffect(() => {
      autoResize();
    }, [value]);

    return (
      <div
        ref={ref}
        className={cn("border-t border-border bg-background p-4", className)}
      >
        {/* Quick Actions */}
        <div className="mb-4 flex flex-wrap gap-3">
          {[
            "What's the latest in tech?",
            "Help me with my studies",
            "Tell me a joke",
            "Explain quantum physics",
          ].map((suggestion) => (
            <Button
              key={suggestion}
              variant="none"
              effect="glass"
              size="default"
              showRipple={true}
              onClick={() => onChange(suggestion)}
              className="rounded-full border-border hover:border-primary/50 hover:bg-accent/20 cursor-pointer"
              icon={{ icon: SparkleIcon }}
            >
              {suggestion}
            </Button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={isLoading}
              rows={3}
              className="w-full min-h-[60px] max-h-[200px] rounded-2xl border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/20 bg-background px-4 py-3 pr-20 text-sm resize-none outline-none transition-colors"
            />

            {/* Input Actions */}
            <div className="absolute right-2 bottom-2 flex items-center gap-1">
              <Button
                variant="none"
                effect="glass"
                size="icon"
                showRipple={true}
                icon={{ icon: PaperclipIcon }}
              />
              <Button
                variant="none"
                effect="glass"
                size="icon"
                showRipple={true}
                icon={{ icon: MicrophoneIcon }}
              />
            </div>
          </div>

          <Button
            type="submit"
            variant={isLoading ? "none" : "gradient"}
            effect={isLoading ? "glass" : "fill"}
            size="lg"
            showRipple={true}
            disabled={!value.trim() || isLoading}
            className="rounded-full flex-shrink-0 h-12 w-12"
          >
            {isLoading ? (
              <StopCircleIcon className="h-5 w-5" weight="regular" />
            ) : (
              <PaperPlaneTiltIcon className="h-5 w-5" weight="regular" />
            )}
          </Button>
        </form>
      </div>
    );
  }
);

ChatInput.displayName = "ChatInput";

export { ChatInput };
