"use client";

import { usePathname } from "next/navigation";
import Navigation from "./navigation";

export default function NavigationWrapper() {
  const pathname = usePathname();

  // 경로가 "/register"로 시작하면 내비게이션을 렌더링하지 않음
  if (pathname.startsWith("/register")) {
    return null;
  }

  return <Navigation />;
}
