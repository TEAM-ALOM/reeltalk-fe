import type { Metadata } from "next";
import "./styles/globals.css";
import Navigation from "./components/navigation";

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
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
