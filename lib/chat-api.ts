// 테스트를 위해 인증 관련 임포트 제거
// import { getAccessToken, isLoggedIn } from "./api";

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

// 임시 데이터가 있는 테스트 서버 URL로 변경
const BASE_URL = "http://3.39.19.42:8080";

// 테스트용 토큰 (임시)
const TEST_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6MSwidXNlcm5hbWUiOiJ0ZXN0MSIsInJvbGUiOiJST0xFX0FETUlOIiwiaWF0IjoxNzQ2NTQyMzgxLCJleHAiOjE3NDY1NDQxODF9.Z-hkkNoy0BXVwYI9tPKfUiIe_5yOjjaO9HzRxbtIV1s";

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
          // 테스트를 위해 항상 토큰 전송
          Authorization: `Bearer ${TEST_TOKEN}`,
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
  try {
    const response = await fetch(
      `${BASE_URL}/api/contents/${contentId}/talks/${messageId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TEST_TOKEN}`,
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
  try {
    const response = await fetch(
      `${BASE_URL}/api/contents/${contentId}/talks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TEST_TOKEN}`,
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
