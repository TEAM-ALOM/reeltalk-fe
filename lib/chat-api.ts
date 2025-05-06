import { getAccessToken, isLoggedIn } from "./api";

export interface ChatMessage {
  id: number;
  userId: number;
  contentId: number;
  nickname: string;
  content: string;
  createdAt: string;
  profileImage?: string;
}

export interface NewChatMessage {
  content: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.reeltalk.com";

/**
 * 특정 콘텐츠의 모든 채팅 메시지를 가져옵니다
 */
export async function fetchChatMessages(
  contentId: string | number
): Promise<ChatMessage[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/contents/${contentId}/talks`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(isLoggedIn() && { Authorization: `Bearer ${getAccessToken()}` }),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`메시지 조회 실패: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("채팅 메시지 조회 오류:", error);
    throw error;
  }
}

/**
 * 채팅 메시지를 삭제합니다 (권한 필요)
 */
export async function deleteChatMessage(
  contentId: string | number,
  messageId: number
): Promise<boolean> {
  if (!isLoggedIn()) {
    throw new Error("로그인이 필요합니다");
  }

  try {
    const response = await fetch(
      `${BASE_URL}/api/contents/${contentId}/talks/${messageId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`메시지 삭제 실패: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("채팅 메시지 삭제 오류:", error);
    throw error;
  }
}

/**
 * REST API로 채팅 메시지를 전송합니다
 * (일반적으로는 WebSocket을 사용하지만 대체 수단으로 제공)
 */
export async function sendChatMessage(
  contentId: string | number,
  message: NewChatMessage
): Promise<ChatMessage> {
  if (!isLoggedIn()) {
    throw new Error("로그인이 필요합니다");
  }

  try {
    const response = await fetch(
      `${BASE_URL}/api/contents/${contentId}/talks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify(message),
      }
    );

    if (!response.ok) {
      throw new Error(`메시지 전송 실패: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("채팅 메시지 전송 오류:", error);
    throw error;
  }
}
