"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIconWeight } from "@/lib/morphy-ui/icon-theme-context";
import { TruncateText } from "@/lib/morphy-ui/morphy";
import {
  PlusIcon,
  ClockIcon,
  GearIcon,
  TrashIcon,
  DotsThreeOutlineIcon,
  GiftIcon,
  ListIcon,
  ChatCircleIcon,
  RobotIcon,
  CodeIcon,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    // Function to get appropriate icon based on chat title
    const getChatIcon = (title: string) => {
      const lowerTitle = title.toLowerCase();
      if (lowerTitle.includes("getting started") || lowerTitle.includes("ai")) {
        return <RobotIcon className="h-5 w-5 flex-shrink-0" />;
      }
      if (
        lowerTitle.includes("coding") ||
        lowerTitle.includes("code") ||
        lowerTitle.includes("project")
      ) {
        return <CodeIcon className="h-5 w-5 flex-shrink-0" />;
      }
      return <ChatCircleIcon className="h-5 w-5 flex-shrink-0" />;
    };

    return (
      <SidebarProvider>
        <Sidebar
          collapsible="icon"
          className={cn("bg-sidebar text-sidebar-foreground pt-28", className)}
          ref={ref}
        >
          <SidebarHeader className="flex items-center justify-between gap-2">
            <SidebarTrigger
              variant="none"
              effect="glass"
              size="icon"
              showRipple
              aria-label="Toggle sidebar"
              className="ml-auto"
            >
              <CaretLeftIcon className="h-4 w-4" weight={useIconWeight()} />
            </SidebarTrigger>
            <div className="flex items-center justify-between w-full mt-2">
              <Button
                variant="none"
                effect="glass"
                size="lg"
                onClick={onNewChat}
                showRipple
                icon={{ icon: PlusIcon, title: "New Chat" }}
                aria-label="New Chat"
                className="flex-1 justify-start"
              >
                <span className="group-data-[collapsible=icon]:hidden">
                  New Chat
                </span>
              </Button>
              <span className="group-data-[collapsible=icon]:hidden text-xs text-muted-foreground ml-2">
                {chatHistory.length} chats
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent className="flex-1 overflow-y-auto px-2 space-y-2">
            <SidebarMenu>
              {chatHistory.map((chat, index) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton
                    isActive={chat.isActive}
                    onClick={() => onSelectChat(chat.id)}
                    tooltip={chat.title}
                    className="w-full text-left flex items-center gap-3 p-3 rounded-lg"
                    aria-label={chat.title}
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-muted text-muted-foreground text-xs font-medium flex-shrink-0">
                      {index + 1}
                    </span>
                    <div className="group-data-[collapsible=icon]:hidden flex-1 min-w-0 text-left">
                      <TruncateText as="p" className="text-sm font-medium">
                        {chat.title}
                      </TruncateText>
                      <p className="text-xs text-muted-foreground">
                        {chat.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="none"
                          effect="glass"
                          size="icon-sm"
                          className="opacity-0 group-hover:opacity-100 flex-shrink-0"
                          showRipple
                          icon={{ icon: DotsThreeOutlineIcon }}
                          aria-label="More actions"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-32 p-1">
                        <Button
                          variant="none"
                          effect="glass"
                          size="sm"
                          onClick={() => onDeleteChat(chat.id)}
                          className="w-full justify-start text-destructive"
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
          <SidebarFooter className="p-4 space-y-2">
            <Button
              variant="none"
              effect="glass"
              size="lg"
              onClick={onDealOfTheDay}
              showRipple
              icon={{ icon: GiftIcon, title: "Deal of the Day" }}
              aria-label="Deal of the Day"
              className="w-full justify-start"
            >
              <div className="group-data-[collapsible=icon]:hidden flex-1 min-w-0 text-left">
                <TruncateText as="p" className="text-base font-semibold">
                  Deal of the Day
                </TruncateText>
                <TruncateText as="p" className="text-xs text-muted-foreground">
                  Special offers just for you
                </TruncateText>
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
