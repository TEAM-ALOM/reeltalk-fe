"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import ChatRoom from "@/src/components/chat/chat-room";

export default function LiveChat() {
  // 라우팅에서 contentId 파라미터 가져오기
  const params = useParams();
  // params.id가 배열인 경우 첫번째 요소 사용, 아니면 그대로 사용
  const contentId = Array.isArray(params.id) ? params.id[0] : params.id;

  // 페이지 타이틀 가져오기 (임시 데이터용 콘텐츠 ID가 575265)
  let title = "실시간 Talk";
  if (contentId === "575265") {
    title = "블랙 아담 실시간 Talk";
  }

  return (
    <main className="flex flex-col justify-center items-center w-full relative">
      <div className="w-[89%] bg-[#D9D9D9] my-5 border rounded-[20px] overflow-hidden flex flex-col">
        <div className="sticky top-0 w-full h-[60px] bg-[#1E88E5] bg-opacity-50 rounded-t-[20px] z-20 text-[22px] text-white font-bold flex items-center pl-5">
          {title}
        </div>

        <div className="h-[954px] flex flex-col overflow-hidden">
          <Suspense
            fallback={
              <div className="flex-1 flex items-center justify-center">
                로딩중...
              </div>
            }
          >
            <ChatRoom contentId={contentId} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
