"use client";

import { Suspense } from "react";
import ChatRoom from "@/src/components/chat/chat-room";

export default function LiveChat() {
  // 컨텐츠 ID는 실제로는 동적으로 설정되어야 함 (예: URL 파라미터)
  const contentId = "1"; // 임시값, 실제로는 props 또는 useParams()로 받아야 함

  return (
    <main className="flex flex-col justify-center items-center w-full relative">
      <div className="w-[89%] bg-[#D9D9D9] my-5 border rounded-[20px] overflow-hidden flex flex-col">
        <div className="sticky top-0 w-full h-[60px] bg-[#1E88E5] bg-opacity-50 rounded-t-[20px] z-20 text-[22px] text-white font-bold flex items-center pl-5">
          실시간 Talk
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
