import "./globals.css";
import type { Metadata } from "next";
import GlobalBackground from "./components/GlobalBackground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// Only import ChatBubble, NOT ChatModal
import ChatBubble from "./components/ChatBubble";
import VisitorTracker from "./components/VisitorTracker";

export const metadata: Metadata = {
  title: "Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative bg-transparent">
         <VisitorTracker />
        <GlobalBackground />

        <div className="relative z-10 flex flex-col min-h-dvh">
          <Navbar />

          <main className="flex-1 pt-0">{children}</main>

          <Footer />

          {/* Global floating chat button */}
          <ChatBubble />
        </div>
      </body>
    </html>
  );
}
