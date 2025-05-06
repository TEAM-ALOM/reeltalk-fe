"use client";

import { useState, FormEvent, KeyboardEvent } from "react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function ChatInput({
  onSend,
  placeholder = "메시지를 입력하세요...",
  disabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim() === "" || disabled || isSending) return;

    try {
      setIsSending(true);
      await onSend(message);
      setMessage("");
    } catch (error) {
      console.error("메시지 전송 오류:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form)
        form.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
    }
  };

  return (
    <motion.form
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="border-t py-2 px-3 flex items-center space-x-3 bg-white bg-opacity-95 backdrop-blur-sm"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full min-h-[50px] px-4 border-none rounded-[30px] text-[16px] bg-[#EDEDED] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        disabled={disabled || message.trim() === "" || isSending}
        className="h-[50px] min-w-[70px] border rounded-[30px] bg-[#FFC107] text-[16px] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSending ? "전송중..." : "입력"}
      </motion.button>
    </motion.form>
  );
}
