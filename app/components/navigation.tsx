"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { Sansita } from "next/font/google"; // Sansita 폰트 불러오기
import LoginCard from "./loginCard";
import { motion } from "framer-motion";
import {
  getUserInfo,
  removeTokens,
  removeUserInfo,
  isLoggedIn,
} from "@/lib/api";

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

  const [user, setUser] = useState<string | null>(null);

  // 컴포넌트 마운트 시 로그인 상태 확인
  useEffect(() => {
    // 로그인 상태 확인 및 사용자 정보 불러오기
    if (isLoggedIn()) {
      const username = getUserInfo();
      if (username) {
        setUser(username);
      }
    }
  }, []);

  /** ✅ 로그인 핸들러 (백엔드 연동 시 수정 예정) */
  const handleLogin = (username: string) => {
    setUser(username); // 로그인한 유저 정보 저장
    setIsLoginOpen(false); // 로그인 모달 닫기
  };

  /** ✅ 로그아웃 핸들러 */
  const handleLogout = () => {
    removeTokens(); // 토큰 삭제
    removeUserInfo(); // 사용자 정보 삭제
    setUser(null); // 유저 정보 제거 (로그아웃)
  };

  const handleNavigation = (href: string) => {
    if (path !== href) {
      router.push(href);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container flex items-center justify-between max-w-full p-4 px-2 py-5 bg-ReelTalk_LightBlue">
        {/* 왼쪽 섹션: 로고 + 네비게이션 메뉴 */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => handleNavigation("/")}
            className={`ml-5 mr-10 text-5xl italic font-bold text-ReelTalk_DeepBlue ${sansita.className}`}
          >
            ReelTalk
          </button>
          {/* 네비게이션 메뉴 (PC 화면에서만 보임) */}
          <nav className="hidden space-x-9 md:flex">
            {["/", "/movies", "/series", "/top-reviews"].map((href, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(href)}
                className={`text-blue-400 text-3xl font-semibold hover:text-gray-700 ${
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
        <div className="flex items-center mr-5 space-x-7">
          {/* 검색 입력창 */}
          <div className="relative items-center hidden md:flex">
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              className="px-4 py-1 border placeholder-gray-400 bg-slate-200 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <AiOutlineSearch className="absolute text-gray-400 right-3" />
          </div>

          {/* 로그인 버튼 (팝업 열기) */}
          {user ? (
            <button
              onClick={handleLogout}
              className="text-lg text-gray-400 hover:text-red-600"
            >
              {user}/로그아웃
            </button>
          ) : (
            <div className="flex space-x-1">
              {/* 로그인 버튼 (팝업) */}
              <button
                onClick={() => setIsLoginOpen(true)}
                className="text-lg text-gray-400 hover:text-blue-500"
              >
                로그인
              </button>
              <span className="text-gray-400">/</span>
              {/* 회원가입 버튼 (/register 이동) */}
              <button
                onClick={() => handleNavigation("/register")}
                className="text-lg text-gray-400 hover:text-blue-500"
              >
                회원가입
              </button>
            </div>
          )}

          <button
            onClick={() => handleNavigation("/my-page")}
            className="text-2xl font-bold text-ReelTalk_Yellow"
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
            <LoginCard onLogin={handleLogin} />
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
