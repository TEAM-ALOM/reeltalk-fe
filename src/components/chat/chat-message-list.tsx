"use client";

import { useRef, useEffect } from "react";
import { ChatMessage } from "@/lib/chat-api";
import ChatMessageItem from "./chat-message";
import { AnimatePresence } from "framer-motion";

interface ChatMessageListProps {
  messages: ChatMessage[];
  userId: number;
  onDelete?: (id: number) => void;
}

export default function ChatMessageList({
  messages,
  userId,
  onDelete,
}: ChatMessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 새 메시지가 추가될 때 자동 스크롤
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex-1 overflow-y-auto px-2">
      <AnimatePresence>
        <ul className="space-y-4 py-4">
          {messages.map((message) => (
            <ChatMessageItem
              key={message.id}
              message={message}
              isMine={message.userId === userId}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </div>
  );
}
