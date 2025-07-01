"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import React from "react";
import { ChatSidebar } from "@/components/ui/chat-sidebar";
import { ChatMessage } from "@/components/ui/chat-message";
import { ChatInput } from "@/components/ui/chat-input";
import { ChatLoading } from "@/components/ui/chat-loading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SparkleIcon, ChatCircleIcon, GiftIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import DealsGrid from "@/components/ui/deals-grid";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  deals?: DealData[]; // Store deals data with the message
}

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  isActive?: boolean;
  messageCount?: number;
}

interface DealData {
  title: string;
  description: string;
  image: string;
  discount: string;
  validUntil: string;
  code: string;
}

const GenZGPT = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen] = useState(true);
  const [showDealOfTheDay, setShowDealOfTheDay] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [currentChatId, setCurrentChatId] = useState("");
  const [showDealsGrid, setShowDealsGrid] = useState<React.ReactNode>(null);

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const loadChatHistory = () => {
      try {
        const savedHistory = localStorage.getItem("genzgpt_chat_history");
        if (savedHistory) {
          const parsedHistory = JSON.parse(savedHistory).map(
            (chat: ChatHistory) => ({
              ...chat,
              timestamp: new Date(chat.timestamp),
            })
          );
          // Sort by timestamp in descending order (newest first)
          const sortedHistory = parsedHistory.sort(
            (a: ChatHistory, b: ChatHistory) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          setChatHistory(sortedHistory);

          // Set current chat to the active one or the first one
          const activeChat = parsedHistory.find(
            (chat: ChatHistory) => chat.isActive
          );
          if (activeChat) {
            setCurrentChatId(activeChat.id);
            loadMessagesForChat(activeChat.id);
          } else if (parsedHistory.length > 0) {
            setCurrentChatId(parsedHistory[0].id);
            loadMessagesForChat(parsedHistory[0].id);
          }
        } else {
          // Create default chat if no history exists
          const defaultChat: ChatHistory = {
            id: Date.now().toString(),
            title: "New Chat",
            timestamp: new Date(),
            isActive: true,
            messageCount: 0,
          };
          setChatHistory([defaultChat]);
          setCurrentChatId(defaultChat.id);
          saveChatHistory([defaultChat]);
        }
      } catch (error) {
        console.error("Error loading chat history:", error);
        // Create default chat on error
        const defaultChat: ChatHistory = {
          id: Date.now().toString(),
          title: "New Chat",
          timestamp: new Date(),
          isActive: true,
          messageCount: 0,
        };
        setChatHistory([defaultChat]);
        setCurrentChatId(defaultChat.id);
      }
    };

    loadChatHistory();
  }, []);

  // Load messages for a specific chat
  const loadMessagesForChat = (chatId: string) => {
    try {
      const savedMessages = localStorage.getItem(`genzgpt_messages_${chatId}`);
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages).map(
          (msg: Message) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })
        );
        setMessages(parsedMessages);

        // Check if the last assistant message has deals and recreate the grid
        const lastAssistantMessage = parsedMessages
          .filter((msg: Message) => msg.role === "assistant")
          .pop();

        if (
          lastAssistantMessage?.deals &&
          lastAssistantMessage.deals.length > 0
        ) {
          setShowDealsGrid(<DealsGrid deals={lastAssistantMessage.deals} />);
        } else {
          setShowDealsGrid(null);
        }
      } else {
        setMessages([]);
        setShowDealsGrid(null);
      }
    } catch (error) {
      console.error("Error loading messages:", error);
      setMessages([]);
      setShowDealsGrid(null);
    }
  };

  // Save chat history to localStorage
  const saveChatHistory = (history: ChatHistory[]) => {
    try {
      localStorage.setItem("genzgpt_chat_history", JSON.stringify(history));
    } catch (error) {
      console.error("Error saving chat history:", error);
    }
  };

  // Save messages for a specific chat
  const saveMessagesForChat = (chatId: string, messages: Message[]) => {
    try {
      localStorage.setItem(
        `genzgpt_messages_${chatId}`,
        JSON.stringify(messages)
      );
    } catch (error) {
      console.error("Error saving messages:", error);
    }
  };

  // Update chat title based on first user message
  const updateChatTitle = (chatId: string, firstMessage: string) => {
    const newTitle =
      firstMessage.trim().slice(0, 30) +
      (firstMessage.length > 30 ? "..." : "");
    setChatHistory((prev) => {
      const updated = prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              title: newTitle,
              messageCount: (chat.messageCount || 0) + 1,
            }
          : chat
      );
      saveChatHistory(updated);
      return updated;
    });
  };

  // Deal of the Day data
  const dealOfTheDay: DealData = {
    title: "Exclusive Student Discount",
    description: "Get 50% off on premium courses and certifications!",
    image: "/images/deal-of-the-day.jpg",
    discount: "50% OFF",
    validUntil: "2024-12-31",
    code: "STUDENT50",
  };

  // Dynamic Deal Template - this will be replaced with actual metadata later
  const renderDealCard = (deal: DealData) => {
    return (
      <div className="flex flex-col p-4 space-y-4">
        {/* Deal Header */}
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#d0427f]/10 to-[#303293]/10 rounded-lg">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#d0427f] to-[#303293] flex items-center justify-center">
            <GiftIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#d0427f]">
              Deal of the Day
            </h2>
            <p className="text-sm text-muted-foreground">Limited time offer</p>
          </div>
        </div>

        {/* Main Content Area - Split into two columns */}
        <div className="flex gap-6">
          {/* Left Column - Deal Details with Thumbnail */}
          <div className="w-1/2 space-y-4">
            {/* Thumbnail Image */}
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-[#d0427f]/20 to-[#303293]/20 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-[#d0427f] to-[#303293] rounded-full flex items-center justify-center mx-auto mb-3">
                      <GiftIcon className="h-10 w-10 text-white" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Deal Thumbnail
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Deal Information */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-2">{deal.title}</h3>
              <p className="text-muted-foreground mb-4">{deal.description}</p>

              {/* Deal Badges */}
              <div className="flex items-center justify-between mb-4">
                <div className="bg-[#d0427f] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {deal.discount}
                </div>
                <div className="text-sm text-muted-foreground">
                  Valid until: {new Date(deal.validUntil).toLocaleDateString()}
                </div>
              </div>

              {/* Promo Code */}
              <div className="bg-muted rounded-lg p-3 mb-4">
                <p className="text-sm text-muted-foreground mb-1">Use code:</p>
                <div className="flex items-center gap-2">
                  <code className="bg-background px-3 py-1 rounded text-sm font-mono font-semibold text-[#d0427f]">
                    {deal.code}
                  </code>
                  <Button
                    variant="none"
                    effect="glass"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => navigator.clipboard.writeText(deal.code)}
                  >
                    Copy
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="gradient"
                  size="lg"
                  showRipple={true}
                  className="flex-1"
                >
                  Claim Deal
                </Button>
                <Button
                  variant="none"
                  effect="glass"
                  size="lg"
                  showRipple={true}
                  className="flex-1"
                  onClick={handleNewChat}
                >
                  New Chat
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column - Rich Text Area */}
          <div className="w-1/2">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#d0427f] to-[#303293] flex items-center justify-center">
                  <GiftIcon className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-semibold">Deal Details</h3>
              </div>

              {/* Rich Text Area */}
              <div className="bg-muted/50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="prose prose-sm max-w-none">
                  <h4 className="text-base font-semibold mb-3">
                    About This Deal
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    This exclusive student discount offers incredible savings on
                    premium courses and certifications. Perfect for students
                    looking to enhance their skills and advance their careers.
                  </p>

                  <h4 className="text-base font-semibold mb-3">
                    What's Included
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#d0427f] rounded-full"></div>
                      Access to premium course content
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#d0427f] rounded-full"></div>
                      Professional certifications
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#d0427f] rounded-full"></div>
                      Lifetime access to materials
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#d0427f] rounded-full"></div>
                      Student support and guidance
                    </li>
                  </ul>

                  <h4 className="text-base font-semibold mb-3">
                    How to Redeem
                  </h4>
                  <ol className="text-sm text-muted-foreground space-y-2 mb-4">
                    <li>1. Click the &quot;Claim Deal&quot; button above</li>
                    <li>
                      2. Enter the promo code:{" "}
                      <code className="bg-background px-2 py-1 rounded text-xs">
                        {deal.code}
                      </code>
                    </li>
                    <li>3. Complete your purchase</li>
                    <li>4. Start learning immediately!</li>
                  </ol>

                  <div className="bg-gradient-to-r from-[#d0427f]/10 to-[#303293]/10 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">
                      <strong>Note:</strong> This offer is valid for students
                      only. Please have your student ID ready for verification.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleDealOfTheDay = () => {
    setShowDealOfTheDay(true);
    setMessages([]);
  };

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Update chat title if it's the first message
    if (messages.length === 0) {
      updateChatTitle(currentChatId, input.trim());
    }

    // Secure API call to our backend
    try {
      const userId = localStorage.getItem("userId") || "";

      const response = await fetch("/api/genzgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-id": userId,
        },
        body: JSON.stringify({
          message: userMessage.content,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = data.message; // Get the bot message if available
      const deals = data.deals; // Get deals if available
      const textResponse = data.response; // Get response text if available

      let assistantContent = "";
      let dealsGrid = null;

      if (Array.isArray(deals) && deals.length > 0) {
        // Handle deals response
        assistantContent = botMessage || "Here are some deals for you:";
        dealsGrid = <DealsGrid deals={deals} />;
      } else if (textResponse) {
        assistantContent = textResponse;
      } else {
        assistantContent =
          "No deals available right now. How else can I help you?";
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: assistantContent,
        timestamp: new Date(),
        deals: deals, // Store deals data with the message
      };

      setMessages((prev) => [...prev, assistantMessage]);
      // Show deals grid if deals exist and not showDealOfTheDay
      if (dealsGrid && !showDealOfTheDay) {
        setShowDealsGrid(() => dealsGrid);
      } else {
        setShowDealsGrid(null);
      }

      // Save messages to localStorage
      const updatedMessages = [...messages, userMessage, assistantMessage];
      saveMessagesForChat(currentChatId, updatedMessages);
    } catch (error) {
      console.error("GenZGPT API error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, something went wrong. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);

      // Save error message to localStorage
      const updatedMessages = [...messages, userMessage, errorMessage];
      saveMessagesForChat(currentChatId, updatedMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    // Check if the first chat is already a "New Chat" with no messages
    const firstChat = chatHistory[0];
    if (
      firstChat &&
      firstChat.title === "New Chat" &&
      firstChat.messageCount === 0
    ) {
      // If there's already an empty "New Chat" at the top, just make it active
      setChatHistory((prev) => {
        const updated = prev.map((chat) => ({
          ...chat,
          isActive: chat.id === firstChat.id,
        }));
        saveChatHistory(updated);
        return updated;
      });
      setCurrentChatId(firstChat.id);
      setMessages([]);
      setShowDealOfTheDay(false);
      setShowDealsGrid(null);
      return;
    }

    // Otherwise, create a new chat
    const newChatId = Date.now().toString();
    const newChat: ChatHistory = {
      id: newChatId,
      title: "New Chat",
      timestamp: new Date(),
      isActive: true,
      messageCount: 0,
    };

    setChatHistory((prev) => {
      const updated = [
        newChat,
        ...prev.map((chat) => ({ ...chat, isActive: false })),
      ];
      saveChatHistory(updated);
      return updated;
    });
    setCurrentChatId(newChatId);
    setMessages([]);
    setShowDealOfTheDay(false);
    setShowDealsGrid(null);
  };

  const handleSelectChat = (chatId: string) => {
    setChatHistory((prev) => {
      const updated = prev.map((chat) => ({
        ...chat,
        isActive: chat.id === chatId,
      }));
      saveChatHistory(updated);
      return updated;
    });
    setCurrentChatId(chatId);
    loadMessagesForChat(chatId);
    setShowDealOfTheDay(false);
  };

  const handleDeleteChat = (chatId: string) => {
    setChatHistory((prev) => {
      const updated = prev.filter((chat) => chat.id !== chatId);
      saveChatHistory(updated);
      return updated;
    });

    // Remove messages from localStorage
    localStorage.removeItem(`genzgpt_messages_${chatId}`);

    if (currentChatId === chatId) {
      const remainingChats = chatHistory.filter((chat) => chat.id !== chatId);
      if (remainingChats.length > 0) {
        handleSelectChat(remainingChats[0].id);
      } else {
        handleNewChat();
      }
    }
  };

  return (
    <div className="flex bg-background h-[calc(100vh-5rem)]">
      {/* Sidebar */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out flex-shrink-0 h-full",
          sidebarOpen ? "w-64 sm:w-72" : "w-0"
        )}
      >
        <ChatSidebar
          chatHistory={chatHistory}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          onDeleteChat={handleDeleteChat}
          onDealOfTheDay={handleDealOfTheDay}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col px-2 sm:px-4 pt-2 sm:pt-4">
        {/* Messages Area */}
        <div
          className={cn(
            "flex-1 p-1 sm:p-2 space-y-3 sm:space-y-4 overflow-y-auto",
            messages.length === 0 &&
              !showDealOfTheDay &&
              "flex items-center justify-center"
          )}
        >
          {messages.length === 0 && !showDealOfTheDay ? (
            <Card
              className="max-w-md text-center"
              variant="multi"
              showRipple={true}
              icon={{ icon: SparkleIcon }}
            >
              <p className="text-muted-foreground mb-4">
                Your AI assistant ready to help with anything you need. Start a
                conversation below!
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <ChatCircleIcon className="h-4 w-4" />
                <span>Powered by advanced AI</span>
              </div>
            </Card>
          ) : showDealOfTheDay ? (
            renderDealCard(dealOfTheDay)
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && <ChatLoading />}
              {showDealsGrid}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area - Fixed at bottom */}
        {!showDealOfTheDay && (
          <div className="flex-shrink-0 pt-4">
            <ChatInput
              value={input}
              onChange={setInput}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenZGPT;
