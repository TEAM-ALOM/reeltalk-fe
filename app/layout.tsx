import type { Metadata } from "next";
import "./styles/globals.css";
import Navigation from "./components/navigation";
import { usePathname } from "next/navigation";

export const metadata: Metadata = {
  title: {
    template: "%s | ReelTalk",
    default: "ReelTalk",
  },
  description: "ALOM Team Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideNavPaths = ["/register"];
  return (
    <html lang="en">
      <body>
        {!hideNavPaths.includes(pathname) && <Navigation />}
        {children}
      </body>
    </html>
  );
}
