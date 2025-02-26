"use client";

import { fetchReviewCount } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Footer() {
  const [reviewCount, setReviewCount] = useState<number | null>(0);

  useEffect(() => {
    async function getReviewCount() {
      const count = await fetchReviewCount();
      setReviewCount(count);
    }
    getReviewCount();
  }, []);
  return (
    <footer className="w-full bg-gray-900 text-gray-400 text-sm">
      {/* 상단: 평가 개수 표시 */}
      <div className="flex justify-center items-center py-4 border-b border-gray-700 text-lg">
        지금까지
        <span className="text-red-500 font-bold mx-1">{`★${reviewCount}`}</span>{" "}
        개의 리뷰가 작성되었습니다.
      </div>

      {/* 중간: 서비스 링크 및 회사 정보 */}
      <div className="max-w-[1350px] mx-auto px-6 py-8">
        {/* 서비스 이용 약관, 개인정보 처리방침 */}
        <div className="flex flex-wrap justify-between border-b border-gray-700 pb-4">
          <div className="flex space-x-6">
            <a href="/terms" className="hover:text-white">
              서비스 이용약관
            </a>
            <a href="/privacy" className="hover:text-white">
              개인정보 처리방침
            </a>
            <a href="/company" className="hover:text-white">
              회사 안내
            </a>
          </div>
        </div>

        {/* 고객센터 및 회사 정보 */}
        <div className="flex flex-wrap justify-between mt-4">
          <div>
            <p>
              고객센터:{" "}
              <a href="mailto:support@reeltalk.com" className="text-white">
                support@reeltalk.com
              </a>
            </p>
            <p>
              광고 문의:{" "}
              <a href="mailto:ads@reeltalk.com" className="text-white">
                ads@reeltalk.com
              </a>
            </p>
            <p>
              제휴 문의:{" "}
              <a href="https://reeltalk.com/contact" className="text-white">
                제휴 및 협력
              </a>
            </p>
          </div>
          <div>
            <p>ReelTalk Inc.</p>
            <p>서울특별시 광진구 능동로 209</p>
            <p>사업자 등록번호: ALOM</p>
          </div>
        </div>
      </div>

      {/* 하단: 저작권 정보 및 SNS 아이콘 */}
      <div className="flex flex-wrap justify-between items-center max-w-[1350px] mx-auto px-6 py-4 border-t border-gray-700">
        <p>© 2025 ReelTalk, Inc. All rights reserved.</p>
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            🌐 X
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            🐦 Thread
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            📸 Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
