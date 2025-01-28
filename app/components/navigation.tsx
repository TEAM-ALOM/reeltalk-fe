"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();

  const handleNavigation = (href: string) => {
    if (path !== href) {
      router.push(href);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container max-w-full flex justify-between items-center px-2 py-3 bg-blue-100 p-4">
        {/* 왼쪽 섹션: 로고 + 네비게이션 메뉴 */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => handleNavigation("/")}
            className="text-2xl font-bold text-blue-600 italic ml-5 mr-10"
          >
            ReelTalk
          </button>

          {/* 네비게이션 메뉴 (PC 화면에서만 보임) */}
          <nav className="hidden md:flex space-x-4">
            {["/", "/movies", "/series", "/top-reviews"].map((href, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(href)}
                className={`text-blue-400 text-lg font-extrabold hover:text-gray-700 ${
                  path === href ? "font-bold text-blue-600" : ""
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
        <div className="flex items-center space-x-4 mr-5">
          {/* 검색 입력창 */}
          <div className="relative hidden md:flex items-center">
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              className="border border-gray-300 rounded-full px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <AiOutlineSearch className="absolute right-3 text-gray-500" />
          </div>

          <button
            onClick={() => handleNavigation("/login")}
            className="text-gray-400 hover:text-blue-500 text-xs"
          >
            로그인/회원가입
          </button>

          <button
            onClick={() => handleNavigation("/mypage")}
            className="text-yellow-500 font-bold text-xl"
          >
            My Page
          </button>
        </div>

        {/* 햄버거 메뉴 (모바일) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-600 text-2xl"
        >
          <AiOutlineMenu />
        </button>
      </div>

      {/* 모바일 네비게이션 */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 p-4 space-y-4">
          {["/", "/movies", "/series", "/top-reviews"].map((href, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(href)}
              className="block text-gray-700 hover:text-blue-500 w-full text-left"
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
            className="block text-gray-600   hover:text-blue-500 w-full text-left"
          >
            로그인/회원가입
          </button>
          <button
            onClick={() => handleNavigation("/mypage")}
            className="block text-yellow-500 font-bold w-full text-left"
          >
            My Page
          </button>
        </nav>
      )}
    </header>
  );
}
