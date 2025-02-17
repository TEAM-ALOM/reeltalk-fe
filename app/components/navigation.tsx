"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { Sansita } from "next/font/google"; // Sansita 폰트 불러오기
import LoginCard from "./loginCard";
import { motion } from "framer-motion";

const sansita = Sansita({
  weight: ["800", "700"],
  subsets: ["latin"],
  style: ["italic", "normal"],
  display: "swap",
});

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();

  const handleNavigation = (href: string) => {
    if (path !== href) {
      router.push(href);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container flex items-center justify-between max-w-full p-4 px-2 py-3 bg-ReelTalk_LightBlue">
        {/* 왼쪽 섹션: 로고 + 네비게이션 메뉴 */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => handleNavigation("/")}
            className={`ml-5 mr-10 text-3xl italic font-bold text-ReelTalk_DeepBlue ${sansita.className}`}
          >
            ReelTalk
          </button>
          {/* 네비게이션 메뉴 (PC 화면에서만 보임) */}
          <nav className="hidden space-x-4 md:flex">
            {["/", "/movies", "/series", "/top-reviews"].map((href, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(href)}
                className={`text-blue-400 text-lg font-extrabold hover:text-gray-700 ${
                  path === href ? "font-bold text-yellow-400" : ""
                }`}
              >
                {href === "/"
                  ? "홈"
                  : href === "/movies"
                  ? "영화"
                  : href === "/series"
                  ? "시리즈"
                  : "TOP리뷰"}
              </button>
            ))}
          </nav>
        </div>

        {/* 오른쪽 섹션: 검색창 + 로그인 + My Page */}
        <div className="flex items-center mr-5 space-x-4">
          {/* 검색 입력창 */}
          <div className="relative items-center hidden md:flex">
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              className="px-4 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <AiOutlineSearch className="absolute text-gray-500 right-3" />
          </div>

          {/* 로그인 버튼 (팝업 열기) */}
          <button
            onClick={() => setIsLoginOpen(true)}
            className="text-xs text-gray-400 hover:text-blue-500"
          >
            로그인/회원가입
          </button>

          <button
            onClick={() => handleNavigation("/my-page")}
            className="text-xl font-bold text-ReelTalk_Yellow"
          >
            My Page
          </button>
        </div>

        {/* 햄버거 메뉴 (모바일) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl text-gray-600 md:hidden"
        >
          <AiOutlineMenu />
        </button>
      </div>

      {/* 로그인 모달 */}
      {isLoginOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative p-6 bg-white rounded-2xl shadow-lg w-[520px]"
          >
            <button
              className="absolute text-gray-400 top-2 right-2 hover:text-gray-600"
              onClick={() => setIsLoginOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            <LoginCard />
          </motion.div>
        </div>
      )}

      {/* 모바일 네비게이션 */}
      {isMenuOpen && (
        <nav className="p-4 space-y-4 bg-white border-t border-gray-200 md:hidden">
          {["/", "/movies", "/series", "/top-reviews"].map((href, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(href)}
              className="block w-full text-left text-gray-700 hover:text-blue-500"
            >
              {href === "/"
                ? "홈"
                : href === "/movies"
                ? "영화"
                : href === "/series"
                ? "시리즈"
                : "TOP리뷰"}
            </button>
          ))}
          <hr />
          <button
            onClick={() => handleNavigation("/login")}
            className="block w-full text-left text-gray-600 hover:text-blue-500"
          >
            로그인/회원가입
          </button>
          <button
            onClick={() => handleNavigation("/mypage")}
            className="block w-full font-bold text-left text-yellow-500"
          >
            My Page
          </button>
        </nav>
      )}
    </header>
  );
}
