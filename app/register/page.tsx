"use client";

import { Sansita } from "next/font/google";
import { createAccount } from "./action";
import { useFormState } from "react-dom";
import Input from "../components/input";
import Button from "../components/button";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import {
  AtSymbolIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

const sansita = Sansita({
  weight: ["800", "700"],
  subsets: ["latin"],
  style: ["italic", "normal"],
  display: "swap",
});

export default function Register() {
  const [state, action] = useFormState(createAccount, {});

  return (
    <main>
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-ReelTalk_LightBlue">
        <div className="flex flex-col justify-center mb-10 space-y-2">
          <div className="flex items-end ">
            <span
              className={`mr-1 text-7xl italic font-bold text-ReelTalk_DeepBlue ${sansita.className}`}
            >
              ReelTalk
            </span>
            <span className="text-xl font-semibold text-ReelTalk_DeepBlue">
              에 오신걸 환영해요 :)
            </span>
          </div>
          <span className="text-xl font-semibold text-ReelTalk_DeepBlue">
            보고 느낀 모든 것, 릴톡에서 나눠요!
          </span>
        </div>
        {state?.success ? (
          <div className="flex flex-col items-center">
            <p className="mb-6 text-lg text-green-500">
              🎉 회원가입이 완료되었습니다! 로그인해주세요.
            </p>

            <Link
              href="/"
              className="px-6 py-3 text-white transition-all bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105"
            >
              🏠 홈으로 가기
            </Link>
          </div>
        ) : (
          <>
            <form action={action} className="flex flex-col w-96">
              <Input
                name="email"
                text="이메일"
                type="email"
                placeholder="이메일을 입력해주세요"
                required={true}
                errors={state?.fieldErrors?.email}
                icon={
                  <AtSymbolIcon className="w-5 h-5 text-ReelTalk_DeepBlue" />
                }
              />

              <div className="flex items-center self-end mt-2">
                <input
                  type="checkbox"
                  className="rounded-sm border-ReelTalk_DeepBlue"
                />
                <span className="ml-1 text-sm text-gray-400">
                  아이디 중복확인
                </span>
              </div>
              <Input
                name="username"
                text="이름"
                type="text"
                placeholder="이름을 입력해주세요"
                required={true}
                errors={state?.fieldErrors?.username}
                icon={<UserIcon className="w-5 h-5 text-ReelTalk_DeepBlue" />}
              />

              <Input
                name="password"
                text="비밀번호"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                required={true}
                errors={state?.fieldErrors?.password}
                minLength={PASSWORD_MIN_LENGTH}
                icon={
                  <LockClosedIcon className="w-5 h-5 text-ReelTalk_DeepBlue" />
                }
              />

              <Input
                name="confirm_password"
                text="비밀번호 확인"
                type="password"
                placeholder="비밀번호를 다시 입력해주세요"
                required={true}
                errors={state?.fieldErrors?.confirm_password}
                minLength={PASSWORD_MIN_LENGTH}
                icon={
                  <LockClosedIcon className="w-5 h-5 text-ReelTalk_DeepBlue" />
                }
              />

              <Button text="가입하기" />
            </form>
            {/* SNS 로그인 */}

            <p className="mb-4 text-sm mt-14 text-ReelTalk_DeepBlue">
              SNS 계정 연결하기
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
          </>
        )}
      </div>
    </main>
  );
}
