import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatbotFab from "./ChatbotFab";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-linear-to-b from-[#eef1fb] to-[#f7f8fd] font-sans text-ink antialiased transition-colors dark:from-slate-950 dark:to-[#0b0d1f] dark:text-slate-100">
      <Navbar />
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 pb-20">
        <Outlet />
      </main>
      <Footer />
      <ChatbotFab />
    </div>
  );
}