"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LiveChatRedirect() {
  const router = useRouter();

  useEffect(() => {
    // 기본 페이지에 접근했을 때 오류 메시지를 표시하거나
    // 다른 페이지로 리디렉션할 수 있습니다.
    console.error("콘텐츠 ID가 필요합니다. URL 예시: /livechat/1");
  }, []);

  return (
    <main className="flex flex-col justify-center items-center w-full p-8">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded shadow-md max-w-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              콘텐츠 ID가 지정되지 않았습니다.
            </p>
            <p className="mt-2 text-xs text-yellow-700">
              실시간 톡을 보려면 특정 콘텐츠의 ID가 필요합니다. 영화 상세
              페이지에서 '실시간 Talk' 섹션의 'more+' 버튼을 클릭해주세요.
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-3 px-4 py-1 text-sm text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200"
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
