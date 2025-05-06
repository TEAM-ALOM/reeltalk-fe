export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).+$/
);
export const PASSWORD_REGEX_ERROR =
  "비밀번호가 너무 약합니다. 최소한 하나의 대문자, 하나의 소문자, 그리고 하나의 특수 문자를 포함해야 합니다.";

// 채팅 관련 상수
export const CHAT_EVENT = {
  NEW_MESSAGE: "new_message",
  DELETE_MESSAGE: "delete_message",
  USER_JOINED: "user_joined",
  USER_LEFT: "user_left",
};

export const CHAT_ERROR_CODE = {
  UNAUTHORIZED: "unauthorized",
  FORBIDDEN: "forbidden",
  RATE_LIMIT: "rate_limit",
};
