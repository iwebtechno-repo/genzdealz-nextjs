"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIconWeight } from "@/lib/morphy-ui/icon-theme-context";
import {
  PlusIcon,
  TrashIcon,
  DotsThreeOutlineIcon,
  GiftIcon,
  CaretLeftIcon,
} from "@phosphor-icons/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";

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
    const iconWeight = useIconWeight();

    return (
      <SidebarProvider className="h-full">
        <Sidebar
          collapsible="icon"
          className={cn(
            "bg-sidebar text-sidebar-foreground flex flex-col mb-0 h-full max-h-[calc(100vh-5rem)] w-64 sm:w-72",
            className
          )}
          ref={ref}
        >
          <SidebarHeader className="flex items-center justify-between gap-2 flex-shrink-0">
            <SidebarTrigger
              variant="none"
              effect="glass"
              size="icon"
              showRipple
              aria-label="Toggle sidebar"
              className="ml-auto"
            >
              <CaretLeftIcon className="h-4 w-4" weight={iconWeight} />
            </SidebarTrigger>
            <div className="flex items-center justify-between w-full">
              <Button
                variant="gradient"
                effect="glass"
                size="lg"
                onClick={onNewChat}
                showRipple
                icon={{ icon: PlusIcon, title: "New Chat" }}
                aria-label="New Chat"
                className="w-full justify-start"
              >
                <span className="group-data-[collapsible=icon]:hidden flex items-center gap-2">
                  New Chat
                  <span className="text-xs text-muted-foreground">
                    ({chatHistory.length})
                  </span>
                </span>
              </Button>
            </div>
          </SidebarHeader>
          <SidebarContent className="flex-1 overflow-y-auto px-2 min-h-0">
            <SidebarMenu>
              {chatHistory.map((chat, index) => (
                <SidebarMenuItem key={chat.id} className="py-0.5">
                  <SidebarMenuButton
                    isActive={chat.isActive}
                    onClick={() => onSelectChat(chat.id)}
                    tooltip={chat.title}
                    variant={chat.isActive ? "outline" : "default"}
                    size="lg"
                    className={cn(
                      "w-full text-left flex items-center p-3 rounded-lg transition-all duration-200 cursor-pointer",
                      chat.isActive
                        ? "bg-primary/20 border-primary/50 text-primary shadow-md hover:bg-primary/25"
                        : "hover:bg-muted/50 hover:text-foreground"
                    )}
                    aria-label={chat.title}
                  >
                    <span
                      className={cn(
                        "flex items-center justify-center w-5 h-5 rounded-full text-xs font-medium flex-shrink-0",
                        chat.isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted text-muted-foreground group-hover:bg-foreground/10"
                      )}
                    >
                      {chatHistory.length - index}
                    </span>
                    <div className="group-data-[collapsible=icon]:hidden flex-1 min-w-0 text-left">
                      <p
                        className={cn(
                          "text-sm font-medium truncate",
                          chat.isActive
                            ? "text-primary font-semibold"
                            : "text-foreground group-hover:text-foreground"
                        )}
                      >
                        {chat.title}
                      </p>
                      <p className="text-xs text-muted-foreground font-normal leading-none">
                        {chat.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div
                          className="opacity-0 group-hover:opacity-100 flex-shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                          role="button"
                          tabIndex={0}
                          aria-label="More actions"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              e.currentTarget.click();
                            }
                          }}
                        >
                          <DotsThreeOutlineIcon
                            className="h-4 w-4"
                            weight={iconWeight}
                          />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-32 p-1">
                        <Button
                          variant="none"
                          effect="glass"
                          size="sm"
                          onClick={() => onDeleteChat(chat.id)}
                          className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
                          showRipple
                          icon={{ icon: TrashIcon }}
                          aria-label="Delete chat"
                        >
                          Delete
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 space-y-2 flex-shrink-0">
            <Button
              variant="gradient"
              effect="fill"
              size="lg"
              onClick={onDealOfTheDay}
              showRipple
              icon={{ icon: GiftIcon, title: "Deal of the Day" }}
              aria-label="Deal of the Day"
              className="w-full justify-start"
            >
              <div className="group-data-[collapsible=icon]:hidden flex-1 min-w-0 text-left">
                <p className="text-base font-semibold">Deal of the Day</p>
              </div>
            </Button>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    );
  }
);

ChatSidebar.displayName = "ChatSidebar";

export { ChatSidebar };
