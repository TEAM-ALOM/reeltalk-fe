"use client";

import { useEffect, useState, useRef } from "react";
import {
  fetchChatMessages,
  deleteChatMessage,
  ChatMessage,
} from "@/lib/chat-api";
import { ChatSocketClient, createChatClient } from "@/lib/websocket";
import ChatMessageList from "./chat-message-list";
import ChatInput from "./chat-input";

interface ChatRoomProps {
  contentId: string | number;
  userId?: number;
}

export default function ChatRoom({ contentId, userId }: ChatRoomProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const chatClientRef = useRef<ChatSocketClient | null>(null);

  // 현재 로그인 유저 ID 가져오기 (임시로 1을 사용하거나 props로 전달받은 userId 사용)
  const currentUserId = userId || 1;

  useEffect(() => {
    // 1. 초기 메시지 목록 불러오기
    const loadInitialMessages = async () => {
      try {
        setIsLoading(true);
        const fetchedMessages = await fetchChatMessages(contentId);
        setMessages(fetchedMessages);
        setError(null);
      } catch (err) {
        console.error("채팅 메시지 로드 오류:", err);
        setError("채팅 메시지를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialMessages();

    // 2. WebSocket 클라이언트 생성 및 연결
    chatClientRef.current = createChatClient(
      contentId,
      {
        onNewMessage: (message) => {
          setMessages((prev) => [...prev, message]);
        },
        onDeleteMessage: (messageId) => {
          setMessages((prev) => prev.filter((m) => m.id !== messageId));
        },
      },
      {
        onConnect: () => {
          setIsConnected(true);
          setError(null);
        },
        onDisconnect: () => {
          setIsConnected(false);
        },
        onError: (err) => {
          console.error("WebSocket 연결 오류:", err);
          setError("채팅 서버 연결에 오류가 발생했습니다.");
        },
      }
    );

    chatClientRef.current.connect();

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (chatClientRef.current) {
        chatClientRef.current.disconnect();
      }
    };
  }, [contentId]);

  // 메시지 전송 핸들러
  const handleSendMessage = async (content: string) => {
    if (!chatClientRef.current) {
      throw new Error("채팅 클라이언트가 초기화되지 않았습니다.");
    }

    if (!isConnected) {
      throw new Error("채팅 서버에 연결되어 있지 않습니다.");
    }

    // WebSocket으로 메시지 전송
    chatClientRef.current.sendMessage(content);
    return true;
  };

  // 메시지 삭제 핸들러
  const handleDeleteMessage = async (messageId: number) => {
    try {
      await deleteChatMessage(contentId, messageId);
      return true;
    } catch (err) {
      console.error("메시지 삭제 오류:", err);
      throw err;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {error && (
        <div className="p-3 mb-2 text-center text-white bg-red-500 rounded">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <svg
              className="animate-spin mx-auto h-8 w-8 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="mt-2 text-gray-500">채팅 내용을 불러오는 중...</p>
          </div>
        </div>
      ) : (
        <ChatMessageList
          messages={messages}
          userId={currentUserId}
          onDelete={handleDeleteMessage}
        />
      )}

      <ChatInput
        onSend={handleSendMessage}
        disabled={!isConnected || isLoading}
        placeholder={isConnected ? "메시지를 입력하세요..." : "연결 중..."}
      />

      {!isConnected && !isLoading && (
        <div className="text-center py-1 bg-yellow-100 text-yellow-800 text-sm">
          채팅 서버에 연결 중입니다...
        </div>
      )}
    </div>
  );
}
