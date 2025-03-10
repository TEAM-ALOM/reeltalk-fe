import { Sansita } from "next/font/google";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import { loginUser } from "@/lib/api";

const sansita = Sansita({
  weight: ["800", "700"],
  subsets: ["latin"],
  style: ["italic", "normal"],
  display: "swap",
});
export default function LoginCard({
  onLogin,
}: {
  onLogin: (username: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginClick = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    console.log("로그인 시도 (컴포넌트):", { email }); // 비밀번호는 보안상 로깅하지 않음

    try {
      const data = await loginUser(email, password);
      console.log("로그인 성공:", data);
      // 로그인 성공 - 토큰은 이미 api.ts에서 저장됨
      onLogin(data.username);
    } catch (error: unknown) {
      console.error("로그인 실패 (컴포넌트):", error);
      if (error instanceof Error) {
        setError(error.message); // 로그인 실패
      } else {
        setError("로그인 중 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="flex flex-col items-center p-6 ">
      {/* 제목 */}
      <h2
        className={`text-7xl italic font-bold text-blue-600 ${sansita.className}`}
      >
        ReelTalk
      </h2>
      {/* "로그인 하기" 아래 마진 추가 */}
      <p className="mb-12 text-2xl text-ReelTalk_DeepBlue">로그인 하기</p>
      {error && <p className="text-red-500">{error}</p>}
      <div className="self-start pl-1 mb-1 font-semibold text-ReelTalk_DeepBlue">
        이메일
      </div>
      {/* 이메일 입력 필드 */}
      <div className="relative w-full mb-4">
        <UserIcon className="absolute w-5 h-5 text-white transform -translate-y-1/2 left-3 top-1/2" />
        <input
          type="email"
          placeholder="이메일을 입력해주세요"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-10 py-4 placeholder-white bg-blue-100 border-none rounded-2xl focus:outline-blue-500 placeholder:text-sm"
        />
      </div>
      {/* 비밀번호 입력 필드 */}
      <div className="self-start pl-1 mb-1 font-semibold text-ReelTalk_DeepBlue">
        비밀번호
      </div>
      <div className="relative w-full mb-4">
        <LockClosedIcon className="absolute w-5 h-5 text-white transform -translate-y-1/2 left-3 top-1/2" />
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-10 py-4 placeholder-white bg-blue-100 border-none rounded-2xl focus:outline-blue-500 placeholder:text-sm"
        />
      </div>
      {/* 아이디/비밀번호 찾기 */}
      <p className="w-full mb-10 text-xs text-right text-gray-500 cursor-pointer hover:underline">
        아이디/비밀번호 찾기
      </p>
      {/* 로그인 버튼 아래 마진 추가 */}
      <button
        type="submit"
        onClick={handleLoginClick}
        disabled={isLoading}
        className="w-full py-3 text-xl font-semibold text-white bg-blue-600 rounded-2xl hover:bg-blue-700 mb-14 disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        {isLoading ? "로그인 중..." : "로그인"}
      </button>
      {/* SNS 로그인 */}
      <p className="mb-4 text-sm text-ReelTalk_DeepBlue">
        SNS 계정으로 간편 로그인
      </p>
      <div className="flex space-x-4">
        {/* 카카오 로그인 */}
        <button className="flex items-center justify-center p-2 bg-[#FEE906] rounded-full w-14 h-14">
          <Image
            src="/icons/KakaoTalk_logo.png"
            alt="Kakao Login"
            width={32}
            height={32}
            className="w-10 h-10"
          />
        </button>

        {/* 구글 로그인 */}
        <button className="flex items-center justify-center p-2 bg-white border rounded-full w-14 h-14">
          <Image
            src="/icons/Google__G__logo.png"
            alt="Google Login"
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </button>

        {/* 애플 로그인 */}
        <button className="flex items-center justify-center p-2 text-white bg-black rounded-full w-14 h-14">
          <Image
            src="/icons/Apple_logo_white.png"
            alt="Apple Login"
            width={32}
            height={32}
            className="w-6 pb-[1px] h-7"
          />
        </button>
      </div>
    </form>
  );
}
