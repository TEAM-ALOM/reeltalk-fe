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
      <body className="box-border">
        <NavigationWrapper />
        {children}
      </body>
    </html>
  );
}
