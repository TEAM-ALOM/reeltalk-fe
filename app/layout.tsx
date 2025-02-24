// /app/layout.tsx
import type { Metadata } from "next";
import "./styles/globals.css";
import NavigationWrapper from "./components/navigationWrapper";

export const metadata: Metadata = {
  title: {
    template: "%s | ReelTalk",
    default: "ReelTalk",
  },
  description: "ALOM Team Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="box-border w-full">
        {/* ✅ 네비게이션 바 (고정 크기 X) */}
        <NavigationWrapper />

        {/* ✅ 본문 컨테이너 (고정 크기) */}
        <div className="w-[1350px] min-h-screen mx-auto">{children}</div>
      </body>
    </html>
  );
}
