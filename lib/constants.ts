export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).+$/
);
export const PASSWORD_REGEX_ERROR =
  "비밀번호가 너무 약합니다. 최소한 하나의 대문자, 하나의 소문자, 그리고 하나의 특수 문자를 포함해야 합니다.";
