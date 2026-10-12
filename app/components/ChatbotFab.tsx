import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { MessageCircle } from "lucide-react";

export default function ChatbotFab() {
  const { pathname } = useLocation();
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      setScrolling(true);
      clearTimeout(timer);
      timer = setTimeout(() => setScrolling(false), 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  if (pathname === "/clinical-rag") return null;

  return (
    <Link
      to="/clinical-rag"
      aria-label="Open the clinical assistant"
      className={`group fixed bottom-6 right-6 z-50 flex items-center rounded-full bg-blue-600 p-3.5 text-white shadow-[0_10px_25px_rgba(37,99,235,0.4)] transition-all duration-300 animate-float hover:scale-110 motion-reduce:animate-none ${
        scrolling ? "scale-110 pr-5" : ""
      } hover:pr-5`}
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-blue-600 animate-pulse-ring motion-reduce:animate-none" />
      <MessageCircle size={26} />
      <span
        className={`overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 group-hover:ml-2 group-hover:max-w-40 ${
          scrolling ? "ml-2 max-w-40" : "max-w-0"
        }`}
      >
        Ask about cataracts
      </span>
    </Link>
  );
}