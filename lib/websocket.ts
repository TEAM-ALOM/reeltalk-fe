import { Client, IMessage, Frame } from "@stomp/stompjs";
import SockJS from "sockjs-client";
// 테스트를 위해 인증 관련 임포트 주석 처리
// import { getAccessToken, isLoggedIn } from "./api";
import { ChatMessage } from "./chat-api";

// 임시 데이터가 있는 테스트 서버 URL로 변경
const WS_BASE_URL = "http://3.39.19.42:8080/ws";

// 테스트용 토큰 (임시)
const TEST_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6MSwidXNlcm5hbWUiOiJ0ZXN0MSIsInJvbGUiOiJST0xFX0FETUlOIiwiaWF0IjoxNzQ2NTQyMzgxLCJleHAiOjE3NDY1NDQxODF9.Z-hkkNoy0BXVwYI9tPKfUiIe_5yOjjaO9HzRxbtIV1s";

interface WSConfig {
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error | Frame) => void;
}

export interface MessageHandler {
  onNewMessage: (message: ChatMessage) => void;
  onDeleteMessage: (messageId: number) => void;
}

export class ChatSocketClient {
  private client: Client;
  private contentId: string | number;
  private handlers: MessageHandler;
  private connected: boolean = false;

  constructor(
    contentId: string | number,
    handlers: MessageHandler,
    config?: WSConfig
  ) {
    this.contentId = contentId;
    this.handlers = handlers;

    // STOMP 클라이언트 생성
    this.client = new Client({
      webSocketFactory: () => new SockJS(WS_BASE_URL),
      connectHeaders: {
        // 항상 테스트 토큰 사용
        Authorization: `Bearer ${TEST_TOKEN}`,
      },
      debug: function (str) {
        // 프로덕션에서는 console.log 비활성화
        if (process.env.NODE_ENV !== "production") {
          console.log(str);
        }
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // 연결 성공 핸들러
    this.client.onConnect = () => {
      this.connected = true;

      // 새 메시지 구독
      this.client.subscribe(
        `/topic/${this.contentId}/messages`,
        (message: IMessage) => {
          this.handlers.onNewMessage(JSON.parse(message.body));
        }
      );

      // 삭제된 메시지 구독
      this.client.subscribe(
        `/topic/${this.contentId}/messages/delete`,
        (message: IMessage) => {
          this.handlers.onDeleteMessage(JSON.parse(message.body));
        }
      );

      // 사용자 정의 연결 콜백 실행
      if (config?.onConnect) {
        config.onConnect();
      }
    };

    // 연결 해제 핸들러
    this.client.onDisconnect = () => {
      this.connected = false;
      if (config?.onDisconnect) {
        config.onDisconnect();
      }
    };

    // 에러 핸들러
    this.client.onStompError = (frame) => {
      console.error("STOMP 에러:", frame);
      if (config?.onError) {
        config.onError(frame);
      }
    };
  }

  // 채팅방 연결
  connect() {
    if (!this.connected) {
      this.client.activate();
    }
  }

  // 채팅방 연결 해제
  disconnect() {
    if (this.connected) {
      this.client.deactivate();
      this.connected = false;
    }
  }

  // 메시지 전송
  sendMessage(content: string) {
    if (!this.connected) {
      throw new Error("웹소켓이 연결되어 있지 않습니다");
    }

    this.client.publish({
      destination: `/app/api/contents/${this.contentId}/talks`,
      body: JSON.stringify({ content }),
      headers: {
        // 항상 테스트 토큰 사용
        Authorization: `Bearer ${TEST_TOKEN}`,
      },
    });
  }

  // 연결 상태 확인
  isConnected() {
    return this.connected;
  }
}

// 편의를 위한 인스턴스 생성 함수
export function createChatClient(
  contentId: string | number,
  handlers: MessageHandler,
  config?: WSConfig
): ChatSocketClient {
  return new ChatSocketClient(contentId, handlers, config);
}
