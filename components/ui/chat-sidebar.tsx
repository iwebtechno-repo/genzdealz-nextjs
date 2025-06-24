"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  PlusIcon,
  ClockIcon,
  GearIcon,
  TrashIcon,
  DotsThreeOutlineIcon,
  GiftIcon,
} from "@phosphor-icons/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  isActive?: boolean;
}

interface ChatSidebarProps {
  chatHistory: ChatHistory[];
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  onDealOfTheDay: () => void;
  className?: string;
}

const ChatSidebar = React.forwardRef<HTMLDivElement, ChatSidebarProps>(
  (
    {
      chatHistory,
      onNewChat,
      onSelectChat,
      onDeleteChat,
      onDealOfTheDay,
      className,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col h-full min-h-0 bg-card border-r border-border",
          className
        )}
      >
        {/* Header */}
        <div className="p-4">
          {/* Deal of the Day Section */}
          <div className="mb-4">
            <Button
              variant="glass"
              size="lg"
              onClick={onDealOfTheDay}
              className="w-full justify-start"
              showRipple
              icon={{ icon: GiftIcon }}
            >
              <div className="flex-1 text-left">
                <p className="text-base font-semibold">Deal of the Day</p>
                <p className="text-xs text-muted-foreground">
                  Special offers just for you
                </p>
              </div>
            </Button>
          </div>

          <Button
            variant="gradient"
            size="lg"
            onClick={onNewChat}
            className="w-full justify-start"
            showRipple
            icon={{ icon: PlusIcon }}
          >
            New Chat
          </Button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-2 min-h-0">
          <div className="space-y-2">
            {chatHistory.map((chat, index) => (
              <div
                key={chat.id}
                className={cn(
                  "group relative rounded-lg transition-all duration-200",
                  chat.isActive
                    ? "bg-accent/30 border border-accent/50"
                    : "hover:bg-accent/10 border border-transparent"
                )}
              >
                <button
                  onClick={() => onSelectChat(chat.id)}
                  className={cn(
                    "w-full p-3 text-left rounded-lg transition-all duration-200 flex items-center",
                    chat.isActive
                      ? "bg-accent/20 text-accent-foreground"
                      : "hover:bg-accent/5"
                  )}
                >
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-primary flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0 ml-3">
                    <p className="text-sm font-medium truncate">{chat.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {chat.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                </button>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="glass"
                        size="icon-sm"
                        className="opacity-0 group-hover:opacity-100"
                        showRipple
                        icon={{ icon: DotsThreeOutlineIcon }}
                      />
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-32 p-1">
                      <Button
                        variant="glass"
                        size="sm"
                        onClick={() => onDeleteChat(chat.id)}
                        className="w-full justify-start text-destructive"
                        showRipple
                        icon={{ icon: TrashIcon }}
                      >
                        Delete
                      </Button>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="space-y-2">
            <Button
              variant="glass"
              size="sm"
              className="w-full justify-start text-muted-foreground hover:text-foreground"
              showRipple
              icon={{ icon: ClockIcon }}
            >
              History
            </Button>
            <Button
              variant="glass"
              size="sm"
              className="w-full justify-start text-muted-foreground hover:text-foreground"
              showRipple
              icon={{ icon: GearIcon }}
            >
              Settings
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

ChatSidebar.displayName = "ChatSidebar";

export { ChatSidebar };
