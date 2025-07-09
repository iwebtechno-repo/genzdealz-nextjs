"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { RobotIcon } from "@phosphor-icons/react";
import { LoadingSpinner } from "@/components/ui/loading-bars";

interface ChatLoadingProps {
  className?: string;
}

const ChatLoading = React.forwardRef<HTMLDivElement, ChatLoadingProps>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={cn("flex justify-start", className)}>
        <div className="flex gap-3 max-w-[80%] lg:max-w-[70%]">
          {/* Avatar */}
          <Card
            variant="multi"
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center p-0"
            showRipple={false}
          >
            <RobotIcon className="h-4 w-4" />
          </Card>

          {/* Loading Content */}
          <div className="flex-1 min-w-0">
            <Card variant="none" className="p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <LoadingSpinner size="sm" text="" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-muted-foreground">
                    GenZGPT is thinking...
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
);

ChatLoading.displayName = "ChatLoading";

export { ChatLoading };
