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
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";

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
        className={cn("bg-background p-1 border-t border-border/50", className)}
      >
        {/* Quick Actions */}
        <div className="mb-2 flex flex-wrap gap-1 sm:gap-2">
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
              className="rounded-full border-border hover:border-primary/50 hover:bg-accent/20 cursor-pointer text-xs sm:text-sm"
              icon={{ icon: SparkleIcon }}
            >
              {suggestion}
            </Button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <div className="flex-1 flex items-end gap-2">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                onChange(e.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={isLoading}
              rows={2}
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="none"
                  effect="glass"
                  size="icon"
                  showRipple={true}
                  icon={{ icon: PaperclipIcon }}
                  tabIndex={-1}
                  aria-label="Attach file"
                />
              </TooltipTrigger>
              <TooltipContent>Attach file</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="none"
                  effect="glass"
                  size="icon"
                  showRipple={true}
                  icon={{ icon: MicrophoneIcon }}
                  tabIndex={-1}
                  aria-label="Record voice"
                />
              </TooltipTrigger>
              <TooltipContent>Record voice</TooltipContent>
            </Tooltip>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                variant={isLoading ? "none" : "gradient"}
                effect={isLoading ? "glass" : "fill"}
                size="icon"
                showRipple={true}
                disabled={!value.trim() || isLoading}
                className="rounded-full flex-shrink-0"
                aria-label="Send"
              >
                {isLoading ? (
                  <StopCircleIcon className="h-4 w-4" weight="regular" />
                ) : (
                  <PaperPlaneTiltIcon className="h-4 w-4" weight="regular" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </form>
      </div>
    );
  }
);

ChatInput.displayName = "ChatInput";

export { ChatInput };
