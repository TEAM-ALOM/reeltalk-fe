import { Client, IMessage, Frame } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getAccessToken, isLoggedIn } from "./api";
import { ChatMessage } from "./chat-api";

const WS_BASE_URL =
  process.env.NEXT_PUBLIC_WS_URL || "https://api.reeltalk.com/ws";

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
      connectHeaders: isLoggedIn()
        ? {
            Authorization: `Bearer ${getAccessToken()}`,
          }
        : {},
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
      headers: isLoggedIn()
        ? {
            Authorization: `Bearer ${getAccessToken()}`,
          }
        : {},
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
