"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChatMessage } from "@/lib/chat-api";
import { useState } from "react";

interface ChatMessageItemProps {
  message: ChatMessage;
  isMine: boolean;
  onDelete?: (id: number) => void;
}

export default function ChatMessageItem({
  message,
  isMine,
  onDelete,
}: ChatMessageItemProps) {
  const [showOptions, setShowOptions] = useState(false);

  // 시간 포맷팅
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: isMine ? 100 : -100 }}
      transition={{ duration: 0.3 }}
      className={`w-full flex ${isMine ? "justify-end" : "justify-start"}`}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      {!isMine && (
        <div className="self-start">
          <Image
            src={message.profileImage || "/icons/profile.jpg"}
            alt={`${message.nickname}의 프로필`}
            width={50}
            height={50}
            className="border rounded-full bg-white m-3"
          />
        </div>
      )}

      <div className="flex flex-col m-3">
        {!isMine && (
          <span className="text-sm text-gray-600 ml-2 mb-1">
            {message.nickname}
          </span>
        )}

        <div
          className={`relative p-4 rounded-[25px] border max-w-xs flex flex-col
          ${
            isMine
              ? "bg-[#FFC107] bg-opacity-20 rounded-tr-none"
              : "bg-white rounded-tl-none"
          }`}
        >
          <div className="text-[14px]">{message.content}</div>
          <div className="text-[10px] text-gray-500 mt-1 self-end">
            {formatTime(message.createdAt)}
          </div>

          {isMine && showOptions && onDelete && (
            <button
              onClick={() => onDelete(message.id)}
              className="absolute -top-7 right-0 text-sm text-red-500 bg-white p-1 rounded-md shadow"
            >
              삭제
            </button>
          )}

          {/* 말풍선 화살표 */}
          <div
            className={`absolute top-0 w-4 h-4 
              ${
                isMine
                  ? "bg-[#FFC107] bg-opacity-20 -right-2 rotate-45"
                  : "bg-white -left-2 rotate-45"
              }`}
          />
        </div>
      </div>
    </motion.li>
  );
}
